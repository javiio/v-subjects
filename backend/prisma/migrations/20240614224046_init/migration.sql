-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_SCREENING', 'ENROLLED', 'FAILED');

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "diagnosisDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);
