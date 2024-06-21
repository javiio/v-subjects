import { FastifyInstance } from 'fastify';
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController';
import {
  CreateSubjectSchema,
  UpdateSubjectSchema,
  DeleteSubjectSchema,
  GetSubjectsSchema,
} from '../schemas/subjectSchemas';

export const subjectRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/subjects', { schema: GetSubjectsSchema }, getSubjects);
  fastify.post('/subjects', { schema: CreateSubjectSchema }, createSubject);
  fastify.put('/subjects/:id', { schema: UpdateSubjectSchema }, updateSubject);
  fastify.delete('/subjects/:id', { schema: DeleteSubjectSchema }, deleteSubject);
};
