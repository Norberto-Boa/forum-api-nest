import { AuthenticateStudentService } from './authenticate-student';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateStudentService;

describe('Auhentication Service', () => {
  beforeEach(() => {
    fakeEncrypter = new FakeEncrypter();
    fakeHasher = new FakeHasher();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    sut = new AuthenticateStudentService(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate a studemy', async () => {
    const student = makeStudent({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    await inMemoryStudentsRepository.create(student);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it.skip('should hash student password upon registration', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryStudentsRepository.items[0].password).toEqual(
      '12345678-hashed',
    );
  });
});
