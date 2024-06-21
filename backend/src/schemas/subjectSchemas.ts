const subjectProperties = {
	name: { type: 'string' },
	sex: { type: 'string', enum: ['MALE', 'FEMALE'] },
	diagnosisDate: { type: 'string', format: 'date-time' },
	status: { type: 'string', enum: ['IN_SCREENING', 'ENROLLED', 'FAILED'] },
};

const Subject = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    ...subjectProperties,
  },
  required: ['name', 'sex', 'diagnosisDate', 'status'],
};

const CreateSubjectSchema = {
  body: Subject,
  response: {
    200: Subject,
  },
};

const UpdateSubjectSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: subjectProperties,
  },
  response: {
    200: Subject,
  },
};

const DeleteSubjectSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

const GetSubjectsSchema = {
  querystring: {
    type: 'object',
    properties: {
			...subjectProperties,
      skip: { type: 'number', default: 0 },
      take: { type: 'number', default: 10 },
      sortBy: { type: 'string' },
      sortOrder: { type: 'string', enum: ['asc', 'desc'] },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        subjects: {
          type: 'array',
          items: Subject,
        },
        total: { type: 'number' },
      },
    },
  },
};

export { CreateSubjectSchema, UpdateSubjectSchema, DeleteSubjectSchema, GetSubjectsSchema };
