-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seat_no" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Results_seat_no_key" ON "Results"("seat_no");
