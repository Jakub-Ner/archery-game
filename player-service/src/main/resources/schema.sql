DROP TABLE IF EXISTS "user_skins" CASCADE;
DROP TABLE IF EXISTS "skin_purchase_history" CASCADE;
DROP TABLE IF EXISTS "transaction" CASCADE;
DROP TABLE IF EXISTS "statistics" CASCADE;
DROP TABLE IF EXISTS "skins" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "nickname" varchar UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password_hash" varchar NOT NULL,
  "role" varchar NOT NULL,
  "gems" integer NOT NULL DEFAULT 0
);

CREATE TABLE "skins" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "image_url" varchar NOT NULL,
  "price" integer NOT NULL
);

CREATE TABLE "user_skins" (
  "user_id" integer NOT NULL,
  "skin_id" integer NOT NULL,
  "is_selected" boolean DEFAULT false
);

CREATE TABLE "skin_purchase_history" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "skin_id" integer NOT NULL,
  "amount" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "transaction" (
  "transaction_id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "amount" integer NOT NULL,
  "price" float NOT NULL,
  "currency" varchar NOT NULL DEFAULT 'EUR',
  "payment_method" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "statistics" (
  "user_id" integer PRIMARY KEY,
  "games_played" integer DEFAULT 0,
  "best_score" integer DEFAULT 0,
  "average_score" float DEFAULT 0,
  "kills_per_death" float DEFAULT 0,
  "total_time_played" integer DEFAULT 0,
  "account_created_at" timestamp DEFAULT (now())
);

CREATE UNIQUE INDEX ON "user_skins" ("user_id", "skin_id");

ALTER TABLE "user_skins" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "user_skins" ADD FOREIGN KEY ("skin_id") REFERENCES "skins" ("id");

ALTER TABLE "skin_purchase_history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "skin_purchase_history" ADD FOREIGN KEY ("skin_id") REFERENCES "skins" ("id");

ALTER TABLE "transaction" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "statistics" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
