import request from 'supertest';
import { app } from '../../app';
import {Ticket} from '../../models/ticket';
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
it('fetches the order', async () => {
  const ticketOne = await buildTicket();

  const userOne = global.signin();

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const order = await request(app)
    .get(`/api/orders/${response.body.order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(200);

  expect(order.body.id).toEqual(response.body.order.id);
});
