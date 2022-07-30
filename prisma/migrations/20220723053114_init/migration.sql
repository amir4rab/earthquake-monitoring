-- CreateTable
CREATE TABLE "Earthquake" (
    "id" CHAR(44) NOT NULL,
    "state" SMALLINT NOT NULL,
    "reg" SMALLINT NOT NULL,
    "mag" DOUBLE PRECISION NOT NULL,
    "dep" DOUBLE PRECISION NOT NULL,
    "long" VARCHAR(120) NOT NULL,
    "lat" VARCHAR(120) NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "nameEn" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "name" VARCHAR(64) NOT NULL,
    "nameFa" VARCHAR(64) NOT NULL,
    "index" SERIAL NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Earthquake_id_key" ON "Earthquake"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- AddForeignKey
ALTER TABLE "Earthquake" ADD CONSTRAINT "Earthquake_nameEn_fkey" FOREIGN KEY ("nameEn") REFERENCES "City"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
