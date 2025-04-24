import { AggregateRoot } from '../entities/aggregate-root';
import type { UniqueEntityID } from '../entities/unique-entity-id';
import type { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';
import { vi } from 'vitest';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  // eslint-disable-next-line no-use-before-define
  private aggregate: CustomAggregate;

  constructor(aggreagte: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggreagte;
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn();

    // Ouvindo os eventos
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Criar uma resposta
    const aggregate = CustomAggregate.create();

    // Check if event was created
    expect(aggregate.domainEvents).toHaveLength(1);

    // Dispatching event
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
