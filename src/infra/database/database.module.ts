import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/forum/prisma-question-comments-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/forum/prisma-questions-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/forum/prisma-answer-attachments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/forum/prisma-answer-comments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/forum/prisma-answers-repository';
import { PrismaQuestionAttachments } from './prisma/repositories/forum/prisma-question-attachments-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { PrismaStudentsRepository } from './prisma/repositories/forum/prisma-students-repository';

@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachments,
    PrismaQuestionCommentsRepository,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachments,
    PrismaQuestionCommentsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
