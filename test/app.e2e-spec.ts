import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Moviestore (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Submit movie rating, with rating 1-5', async () => {
    await request(app.getHttpServer())
      .patch('/movies/1/rating')
      .send({
        rating: 5.0,
      })
      .expect(202);
  });

  it('Fetch movie list, with average rating', () =>
    request(app.getHttpServer())
      .get('/movies')
      .expect(200));

  afterAll(() => app.close());
});
