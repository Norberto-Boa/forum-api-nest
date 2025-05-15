import { left, right, type Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { StudentsRepository } from '../repositories/students-repository';
import { StudentAlreadyExistsError } from './errors/student-already-exists-error';
import type { HashComparer } from '../cryptography/hash-comparer';
import type { Encrypter } from '../cryptography/encrypter';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface authenticateStudentServiceRequest {
  email: string;
  password: string;
}

type authenticateStudentServiceResponse = Either<
  StudentAlreadyExistsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class authenticateStudentService {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: authenticateStudentServiceRequest): Promise<authenticateStudentServiceResponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      return left(new WrongCredentialsError());
    }

    const doesPasswordMatch = await this.hashComparer.compare(
      password,
      student.password,
    );

    if (!doesPasswordMatch) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
