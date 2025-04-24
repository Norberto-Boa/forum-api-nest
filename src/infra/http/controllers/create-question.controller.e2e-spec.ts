import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/prisma/prisma.service';
import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import request from 'supertest';

describe('Create questions (E2E)', () => {
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

  test('[POST] /questions', async () => {
    const accessToken = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('authorization', `bearer ${accessToken}`)
      .send({
        title: 'Nova Pergunta1',
        content: 'Da me Conteudo',
      });

    expect(response.status).toBe(201);
  });

  test('[POST] /questions without title', async () => {
    const accessToken = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('authorization', `bearer ${accessToken}`)
      .send({
        title: '',
        content: 'Da me Conteudo',
      });

    expect(response.status).toBe(400);
  });

  test('[POST] /questions without user', async () => {
    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('authorization', `bearer 123456789876543234567`)
      .send({
        title: 'Nova Pergunta1',
        content: 'Da me Conteudo',
      });

    expect(response.status).toBe(401);
  });
});
