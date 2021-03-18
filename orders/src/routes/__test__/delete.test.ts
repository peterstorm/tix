import request from 'supertest';
import { app } from '../../app';
import {Order, OrderStatus} from '../../models/order';
import {Ticket} from '../../models/ticket';
import {natsWrapper} from '../../nats-wrapper';
import mongoose from 'mongoose';

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  return ticket;
}
it('marks and orders as cancelled', async () => {
  const ticketOne = await buildTicket();

  const userOne = global.signin();

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${response.body.order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(204);

  const updatedOrder = await Order.findById(response.body.order.id)
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('it emits an order cancelled event', async () => {
  const ticketOne = await buildTicket();

  const userOne = global.signin();

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${response.body.order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

});
