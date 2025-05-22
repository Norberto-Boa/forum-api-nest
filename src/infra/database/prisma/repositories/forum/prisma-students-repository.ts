import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaStudentMapper } from '../../mappers/prisma-student-mapper';

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const students = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!students) {
      return null;
    }

    return PrismaStudentMapper.toDomain(students);
  }

  async create(students: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(students);

    await this.prisma.user.create({
      data,
    });
  }
}
