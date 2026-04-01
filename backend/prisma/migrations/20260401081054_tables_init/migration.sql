-- CreateEnum
CREATE TYPE "movie_language" AS ENUM ('english', 'nepali', 'hindi');

-- CreateEnum
CREATE TYPE "movie_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "show_status" AS ENUM ('upcoming', 'expired', 'cancelled');

-- CreateEnum
CREATE TYPE "seat_status" AS ENUM ('locked', 'available', 'booked');

-- CreateEnum
CREATE TYPE "ticket_status" AS ENUM ('unpaid', 'paid', 'refunded', 'cancelled', 'attended', 'absent');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "rated" TEXT NOT NULL,
    "released" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "cast" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "runtime" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "language" "movie_language" NOT NULL DEFAULT 'english',
    "poster" TEXT NOT NULL,
    "status" "movie_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imdbID" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Show" (
    "id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "status" "show_status" NOT NULL DEFAULT 'upcoming',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" SMALLINT NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,
    "seat_number" TEXT NOT NULL,
    "status" "seat_status" NOT NULL DEFAULT 'available',
    "locked_until" TIMESTAMP(3),
    "locked_by" TEXT,
    "ticket_id" TEXT,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "ticket_status" NOT NULL DEFAULT 'unpaid',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_amount" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdbID_key" ON "Movie"("imdbID");

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "Show"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_locked_by_fkey" FOREIGN KEY ("locked_by") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "Show"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
