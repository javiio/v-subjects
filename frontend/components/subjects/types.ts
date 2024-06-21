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
  id: string;
  name: string;
  sex: Sex;
  diagnosisDate: Date;
  status: Status;
}
