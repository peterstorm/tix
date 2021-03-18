import { Publisher, Subjects, TicketUpdatedEvent } from '@peterstorm.io/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

