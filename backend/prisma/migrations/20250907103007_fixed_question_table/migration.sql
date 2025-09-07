/*
  Warnings:

  - You are about to drop the column `address` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[question]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Question_email_key";

-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "address",
DROP COLUMN "branch",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "answer" TEXT,
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "branch";

-- DropEnum
DROP TYPE "public"."Branch";

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_key" ON "public"."Question"("question");
