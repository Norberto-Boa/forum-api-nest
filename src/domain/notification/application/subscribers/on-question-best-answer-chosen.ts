import type { EventHandler } from '@/core/events/event-handler';
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import type { SendNotificationService } from '../services/send-notification';
import { DomainEvents } from '@/core/events/domain-events';
import { QuestionBestAnswerChosen } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event';

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationService,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendBestAnswerChosenNotification.bind(this),
      QuestionBestAnswerChosen.name,
    );
  }

  private async sendBestAnswerChosenNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosen) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    );

    if (answer) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toValue(),
        content: `Resposta melhor escolhida`,
        title: `Resposta melhor escolhida em "${question.title.substring(0, 40).concat('...')}"`,
      });
    }
  }
}
