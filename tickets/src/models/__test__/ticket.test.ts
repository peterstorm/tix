import {Ticket} from "../ticket";


it('implements optimistic concurency control', async (done) => {
  const ticket = Ticket.build({
    title: 'conreef',
    price: 5,
    userId: 'wesfawsef'
  });
  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

});

it('increments version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'asefaf',
    price: 12,
    userId: '123123'
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save(); 
  expect(ticket.version).toEqual(1);
});
