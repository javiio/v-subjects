import prisma from '../src/prisma/client';
import Fastify from 'fastify';
import supertest from 'supertest';
import cors from '@fastify/cors';
import { subjectRoutes } from '../src/routes/subjectRoutes';

const fastify = Fastify();

beforeAll(async () => {
  await fastify.register(cors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await fastify.register(subjectRoutes);
  await fastify.listen({ port: 3001 });
});

afterAll(async () => {
  await prisma.$disconnect();
  await fastify.close();
});

describe('Subjects Endpoints', () => {
  it('should create a new subject', async () => {
    const response = await supertest(fastify.server)
      .post('/subjects')
      .send({
        name: 'John Doe',
        sex: 'MALE',
        diagnosisDate: '2024-01-01T12:00:00Z',
        status: 'ENROLLED',
      })
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });

  it('should get subjects with pagination', async () => {
    const response = await supertest(fastify.server)
      .get('/subjects')
      .query({ skip: 0, take: 10 })
      .expect(200);

    expect(response.body).toHaveProperty('subjects');
    expect(response.body.subjects.length).toBeLessThanOrEqual(10);
  });

  it('should update a subject', async () => {
    const createResponse = await supertest(fastify.server)
      .post('/subjects')
      .send({
        name: 'Jane Doe',
        sex: 'FEMALE',
        diagnosisDate: '2024-01-01T12:00:00Z',
        status: 'ENROLLED',
      })
      .expect(200);

    const subjectId = createResponse.body.id;

    const updateResponse = await supertest(fastify.server)
      .put(`/subjects/${subjectId}`)
      .send({ name: 'Jane Smith' })
      .expect(200);

    expect(updateResponse.body.name).toBe('Jane Smith');
  });

  it('should delete a subject', async () => {
    const createResponse = await supertest(fastify.server)
      .post('/subjects')
      .send({
        name: 'Mark Doe',
        sex: 'MALE',
        diagnosisDate: '2024-01-01T12:00:00Z',
        status: 'ENROLLED',
      })
      .expect(200);

    const subjectId = createResponse.body.id;

    const response = await supertest(fastify.server)
      .delete(`/subjects/${subjectId}`)
      .expect(200);

    expect(response.body.message).toBe('Subject deleted');
  });
});
