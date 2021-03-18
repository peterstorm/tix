import {OrderCreatedEvent, Publisher, Subjects} from "@peterstorm.io/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
