import { expect, test } from 'vitest';
import { Slug } from './slug';

test('Should be able to create slug from a string', () => {
  const slug = Slug.createFromText('An Special Title');

  expect(slug.value).toEqual('an-special-title');
});
