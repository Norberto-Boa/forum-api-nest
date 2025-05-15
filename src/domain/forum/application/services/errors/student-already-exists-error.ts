import type { UseCaseError } from '@/core/errors/use-case-error';

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identify: string) {
    super(`Student "${identify}" with same email already exists`);
  }
}
