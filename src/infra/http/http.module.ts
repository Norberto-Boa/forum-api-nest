import { Module } from '@nestjs/common';
import { CreateAcccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateQuestionService } from '@/domain/forum/application/services/create-question';
import { FetchRecentQuestionsService } from '@/domain/forum/application/services/fetch-recent-questions';
import { AuthenticateStudentService } from '@/domain/forum/application/services/authenticate-student';
import { RegisterStudentService } from '@/domain/forum/application/services/register-student';
import { CryptographModule } from '../cryptograph/cryptograph.module';

@Module({
  imports: [DatabaseModule, CryptographModule],
  controllers: [
    CreateAcccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionService,
    FetchRecentQuestionsService,
    AuthenticateStudentService,
    RegisterStudentService,
  ],
})
export class HttpModule {}
