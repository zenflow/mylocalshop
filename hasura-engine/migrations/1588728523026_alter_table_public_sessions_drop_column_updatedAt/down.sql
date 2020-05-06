ALTER TABLE "public"."sessions" ADD COLUMN "updatedAt" timestamptz;
ALTER TABLE "public"."sessions" ALTER COLUMN "updatedAt" DROP NOT NULL;
ALTER TABLE "public"."sessions" ALTER COLUMN "updatedAt" SET DEFAULT now();
