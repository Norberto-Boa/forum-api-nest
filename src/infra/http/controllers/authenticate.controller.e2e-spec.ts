import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';

describe('Create account (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'JohnDoe',
        email: 'johndoe3@gmail.com',
        password: await hash('123456', 8),
      },
    });
    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe3@gmail.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
