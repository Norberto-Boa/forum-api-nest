import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAcccountController } from './controllers/create-account.controller'

@Module({
  imports: [],
  controllers: [CreateAcccountController],
  providers: [PrismaService],
})
export class AppModule {}
