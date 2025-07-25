import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import type { TokenPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { CreateQuestionService } from '@/domain/forum/application/services/create-question';

const createQuestionBodySchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(10),
});

export type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const { title, content } = body;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: user.sub,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException('Error fetching recent questions');
    }

    return { question: result.value.question };
  }
}
