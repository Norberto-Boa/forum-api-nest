import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/forum/prisma-question-comments-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/forum/prisma-questions-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/forum/prisma-answer-attachments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/forum/prisma-answer-comments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/forum/prisma-answers-repository';
import { PrismaQuestionAttachments } from './prisma/repositories/forum/prisma-question-attachments-repository';

@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachments,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachments,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
})
export class DatabaseModule {}
