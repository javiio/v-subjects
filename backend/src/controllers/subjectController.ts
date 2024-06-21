import { Prisma } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../prisma/client';
import type {
  GetSubjectsRequest,
  CreateSubjectRequest,
  UpdateSubjectRequest,
  DeleteSubjectRequest,
} from '../types';

export const getSubjects = async (request: FastifyRequest<GetSubjectsRequest>, reply: FastifyReply) => {
  try {
    const {
      skip = 0,
      take = 10,
      name,
      sex,
      diagnosisDate,
      status,
      sortBy = 'id',
      sortOrder = 'desc',
    } = request.query;

    const where = {
      name: name ? { contains: name, mode: Prisma.QueryMode.insensitive } : undefined,
      sex: sex ?? undefined,
      diagnosisDate: diagnosisDate ? {
        gte: new Date(new Date(diagnosisDate).setUTCHours(0, 0, 0, 0)),
        lt: new Date(new Date(diagnosisDate).setUTCHours(24, 0, 0, 0))
      } : undefined,
      status: status ?? undefined,
    };

    const [subjects, total] = await prisma.$transaction([
      prisma.subject.findMany({
        skip,
        take,
        where,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.subject.count({
        where,
      }),
    ]);
    reply.send({ subjects, total });
  } catch (err: any) {
    reply.status(500).send(err.message);
  }
};

export const createSubject = async (request: FastifyRequest<CreateSubjectRequest>, reply: FastifyReply) => {
  try {
    const subject = await prisma.subject.create({ data: request.body });
    reply.send(subject);
  } catch (err: any) {
    reply.status(500).send(err.message);
  }
};

export const updateSubject = async (request: FastifyRequest<UpdateSubjectRequest>, reply: FastifyReply) => {
  try {
    const { id } = request.params as any;
    const subject = await prisma.subject.update({
      where: { id: parseInt(id) },
      data: request.body,
    });
    reply.send(subject);
  } catch (err: any) {
    reply.status(500).send(err.message);
  }
};

export const deleteSubject = async (request: FastifyRequest<DeleteSubjectRequest>, reply: FastifyReply) => {
  try {
    const { id } = request.params as any;
    await prisma.subject.delete({ where: { id: parseInt(id) } });
    reply.send({ message: 'Subject deleted' });
  } catch (err: any) {
    reply.status(500).send(err.message);
  }
};
