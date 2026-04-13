/*
  Warnings:

  - You are about to drop the column `time` on the `Show` table. All the data in the column will be lost.
  - Changed the type of `date` on the `Show` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "time",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);
