import Fastify from 'fastify';
import cors from '@fastify/cors';
import { subjectRoutes } from './routes/subjectRoutes';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(subjectRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    fastify.log.info(`Server running at port 3001`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
