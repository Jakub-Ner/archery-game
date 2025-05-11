DELETE FROM "skins";

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