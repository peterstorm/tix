import mongoose from 'mongoose';
import {natsWrapper} from "../../../nats-wrapper";
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../../models/ticket';
import {TicketUpdatedListener} from '../ticket-updated-lister';
import {TicketUpdatedEvent} from '@peterstorm.io/common';

const setup = async () => {

  const listener = new TicketUpdatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();

  const data: TicketUpdatedEvent['data'] = {
    version: ticket.version + 1,
    title: 'concert metallica',
    price: 500, 
    id: ticket.id,
    userId: 'awefawef'
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn() 
  };
  return { listener, data, msg, ticket };
};

it('finds, updates and saves ticket', async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);

});

it('acks the message', async () => {
  const { data, listener, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version', async () => {
  const { msg, data, listener } = await setup();
  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {
  }

  expect(msg.ack).not.toHaveBeenCalled();
});
