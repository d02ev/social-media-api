/*
  Warnings:

  - The primary key for the `connections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followed_user_id` on the `connections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[follower_user_id]` on the table `connections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `follower_user_id` to the `connections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_followed_user_id_fkey";

-- DropIndex
DROP INDEX "connections_followed_user_id_key";

-- AlterTable
ALTER TABLE "connections" DROP CONSTRAINT "connections_pkey",
DROP COLUMN "followed_user_id",
ADD COLUMN     "follower_user_id" UUID NOT NULL,
ADD CONSTRAINT "connections_pkey" PRIMARY KEY ("follower_user_id", "following_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "connections_follower_user_id_key" ON "connections"("follower_user_id");

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_follower_user_id_fkey" FOREIGN KEY ("follower_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
