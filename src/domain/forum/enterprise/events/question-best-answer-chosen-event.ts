import type { DomainEvent } from '@/core/events/domain-event';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Question } from '../entities/question';

export class QuestionBestAnswerChosen implements DomainEvent {
  public ocurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityID;

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id;
  }
}
