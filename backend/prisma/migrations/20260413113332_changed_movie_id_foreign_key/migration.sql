-- DropForeignKey
ALTER TABLE "Show" DROP CONSTRAINT "Show_movie_id_fkey";

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION;
