import { RouteGenericInterface } from 'fastify';

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Status {
  IN_SCREENING = 'IN_SCREENING',
  ENROLLED = 'ENROLLED',
  FAILED = 'FAILED',
}

export interface Subject {
  id?: number;
  name: string;
  sex: Sex;
  diagnosisDate: Date;
  status: Status;
}

export interface GetSubjectsRequest extends RouteGenericInterface {
  Querystring: {
    skip?: number;
    take?: number;
    name?: string;
    sex?: Sex;
    diagnosisDate?: string;
    status?: Status;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
}

export interface CreateSubjectRequest extends RouteGenericInterface {
  Body: {
    name: string;
    sex: Sex;
    diagnosisDate: string;
    status: Status;
  };
}

export interface UpdateSubjectRequest extends RouteGenericInterface {
  Params: {
    id: number;
  };
  Body: {
    name?: string;
    sex?: Sex;
    diagnosisDate?: string;
    status?: Status;
  };
}

export interface DeleteSubjectRequest extends RouteGenericInterface {
  Params: {
    id: number;
  };
}
