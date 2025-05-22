import { left, right, type Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { StudentsRepository } from '../repositories/students-repository';
import { StudentAlreadyExistsError } from './errors/student-already-exists-error';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface AuthenticateStudentServiceRequest {
  email: string;
  password: string;
}

type AuthenticateStudentServiceResponse = Either<
  StudentAlreadyExistsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateStudentService {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentServiceRequest): Promise<AuthenticateStudentServiceResponse> {
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
