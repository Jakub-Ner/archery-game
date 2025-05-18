-- trzeba usunac aby moc wpisac skiny - zeby mialy dobre id(od 1)
DROP TABLE IF EXISTS "skins" CASCADE;

CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "nickname" varchar UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password_hash" varchar NOT NULL,
  "role" varchar NOT NULL,
  "gems" integer NOT NULL DEFAULT 1000
);

CREATE TABLE IF NOT EXISTS "skins" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "image_url" varchar NOT NULL,
  "price" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_skins" (
  "user_id" integer NOT NULL,
  "skin_id" integer NOT NULL,
  "is_selected" boolean DEFAULT false,
  UNIQUE ("user_id", "skin_id"),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
  FOREIGN KEY ("skin_id") REFERENCES "skins" ("id")
);

CREATE TABLE IF NOT EXISTS "skin_purchase_history" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "skin_id" integer NOT NULL,
  "amount" integer NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
  FOREIGN KEY ("skin_id") REFERENCES "skins" ("id")
);

CREATE TABLE IF NOT EXISTS "transaction" (
  "transaction_id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "amount" integer NOT NULL,
  "price" float NOT NULL,
  "currency" varchar NOT NULL DEFAULT 'EUR',
  "payment_method" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

CREATE TABLE IF NOT EXISTS "statistics" (
  "user_id" integer PRIMARY KEY,
  "games_played" integer DEFAULT 0,
  "best_score" integer DEFAULT 0,
  "average_score" float DEFAULT 0,
  "kills_per_death" float DEFAULT 0,
  "total_time_played" integer DEFAULT 0,
  "account_created_at" timestamp DEFAULT (now()),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);
