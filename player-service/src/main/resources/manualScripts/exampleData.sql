--EXAMPLE DATA

DELETE FROM "users";
DELETE FROM "skins";
DELETE FROM "user_skins";
DELETE FROM "skin_purchase_history";
DELETE FROM "transaction";
DELETE FROM "statistics";

INSERT INTO "users" (nickname, email, password_hash, role, gems)
VALUES
  ('ShadowHunter', 'shadowhunter@fantasy.com', 'hashShadowHunter123', 'USER', 120),
  ('DragonSlayer', 'dragonslayer@legend.com', 'hashDragonSlayer456', 'ADMIN', 350),
  ('ArcaneMage', 'arcanemage@magic.com', 'hashArcaneMage789', 'USER', 75)
ON CONFLICT (id) DO NOTHING;

INSERT INTO "skins" (name, image_url, price)
VALUES
  ('Campfire Ranger', '/assets/skins/camp.png', 500),
  ('Urban Avenger', '/assets/skins/female9.png', 700),
  ('Mystic Patryk', '/assets/skins/hermrocznypatrykm.png', 850),
  ('Summer Nomad', '/assets/skins/lato01m.png', 600),
  ('Thunderlord', '/assets/skins/mwladcablyskawic.png', 950),
  ('Pretty Warrior', '/assets/skins/pretty-woman.png', 400),
  ('Crystal Drake', '/assets/skins/smokkrysztalowyoptl.png', 1000)
ON CONFLICT (id) DO NOTHING;
--
INSERT INTO "user_skins" (user_id, skin_id, is_selected)
VALUES
  (1, 1, TRUE),
  (2, 2, TRUE),
  (3, 3, FALSE)
ON CONFLICT (user_id, skin_id) DO NOTHING;

INSERT INTO "skin_purchase_history" (user_id, skin_id, amount, created_at)
VALUES
  (1, 1, 1, now()),
  (2, 2, 2, now()),
  (3, 3, 1, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "transaction" (user_id, amount, price, currency, payment_method, created_at)
VALUES
  (1, 1, 900.0, 'EUR', 'CreditCard', now()),
  (2, 2, 2400.0, 'EUR', 'PayPal', now()),
  (3, 1, 650.0, 'EUR', 'BankTransfer', now())
ON CONFLICT (transaction_id) DO NOTHING;

INSERT INTO "statistics" (user_id, games_played, best_score, average_score, kills_per_death, total_time_played, account_created_at)
VALUES
  (1, 15, 800, 600.0, 2.5, 5400, now()),
  (2, 30, 1500, 1200.0, 3.0, 10800, now()),
  (3, 45, 1000, 850.0, 1.8, 13500, now())
ON CONFLICT (user_id) DO NOTHING;