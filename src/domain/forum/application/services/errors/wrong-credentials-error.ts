import type { UseCaseError } from '@/core/errors/use-case-error';

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Email or password is incorrect');
  }
}
