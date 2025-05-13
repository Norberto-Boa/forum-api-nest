import { Module } from '@nestjs/common';
import { CreateAcccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateQuestionService } from '@/domain/forum/application/services/create-question';
import { FetchRecentQuestionsService } from '@/domain/forum/application/services/fetch-recent-questions';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAcccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [CreateQuestionService, FetchRecentQuestionsService],
})
export class HttpModule {}
