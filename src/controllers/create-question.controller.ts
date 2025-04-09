import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { TokenPayload } from 'src/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const { title, content } = body;

    const userExists = this.prisma.user.findUnique({
      where: {
        id: user.sub,
      },
    });

    if (!userExists) {
      throw new UnauthorizedException(
        'Must be a real user to create a question',
      );
    }

    const question = await this.prisma.question.create({
      data: {
        title,
        content,
        slug: this.convertToSlug(title),
        authorId: user.sub,
      },
    });

    return { question };
  }

  private convertToSlug(title: string): string {
    return title
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Remove whitespaces
      .replace(/[^\w-]+/g, '') // Get everything that isn't a word
      .replace(/_/g, '-') // Get all underscore and change to hifen
      .replace(/--+/g, '-') // Remove duplicates hifens
      .replace(/-$/g, ''); // ;
  }
}
