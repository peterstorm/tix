import {Subjects, Publisher, ExpirationCompleteEvent } from '@peterstorm.io/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
