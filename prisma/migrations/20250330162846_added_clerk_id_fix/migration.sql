-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_clerkUserId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
