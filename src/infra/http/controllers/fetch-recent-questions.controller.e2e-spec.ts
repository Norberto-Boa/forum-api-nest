import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/prisma/prisma.service';
import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import request from 'supertest';

describe('get recnt questions (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let user: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    user = await prisma.user.create({
      data: {
        name: 'JohnDoe',
        email: 'johndoe3@gmail.com',
        password: await hash('123456', 8),
      },
    });

    await app.init();
  });

  test('[GET] /questions', async () => {
    const accessToken = jwt.sign({ sub: user.id });

    await request(app.getHttpServer())
      .post('/questions')
      .set('authorization', `bearer ${accessToken}`)
      .send({
        title: 'Nova Pergunta1',
        content: 'Da me Conteudo',
      });

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('authorization', `bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      questions: expect.arrayContaining([
        expect.objectContaining({
          title: 'Nova Pergunta1',
        }),
      ]),
    });
  });
});
