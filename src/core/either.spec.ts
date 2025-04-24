import { left, right, type Either } from './either';

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  } else {
    return left('Failed');
  }
}

test('succes result', () => {
  const result = doSomething(true);

  expect(result.isLeft()).toBe(false);
  expect(result.isRight()).toBe(true);
});

test('succes result', () => {
  const result = doSomething(false);

  expect(result.isLeft()).toBe(true);
  expect(result.isRight()).toBe(false);
});
