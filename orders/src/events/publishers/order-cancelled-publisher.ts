import {OrderCancelledEvent, Publisher, Subjects} from "@peterstorm.io/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
