import { Publisher, Subjects, TicketCreatedEvent } from '@peterstorm.io/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

