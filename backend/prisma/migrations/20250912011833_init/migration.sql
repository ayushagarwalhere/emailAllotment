/*
  Warnings:

  - You are about to drop the column `status` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - Added the required column `formName` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Branch" AS ENUM ('CS', 'DCS', 'EC', 'DEC', 'ME', 'EE', 'MS', 'MNC', 'EP', 'CH', 'CE');

-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('TEXT', 'MCQ', 'NUMBER', 'EMAIL');

-- DropIndex
DROP INDEX "public"."Question_question_key";

-- AlterTable
ALTER TABLE "public"."Form" DROP COLUMN "status",
ADD COLUMN     "formName" TEXT NOT NULL,
ADD COLUMN     "shareId" TEXT;

-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "answer",
ADD COLUMN     "type" "public"."Type" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "branch" "public"."Branch" NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "public"."Option" (
    "id" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "option" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "formId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Answer" (
    "id" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "submissionId" UUID NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Option_option_key" ON "public"."Option"("option");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_userId_key" ON "public"."Submission"("userId");

-- AddForeignKey
ALTER TABLE "public"."Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "public"."Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Answer" ADD CONSTRAINT "Answer_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "public"."Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
