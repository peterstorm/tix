import {PaymentCreatedEvent, Publisher, Subjects} from "@peterstorm.io/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

