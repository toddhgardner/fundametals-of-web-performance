PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS
  users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS
  cartItems (
    cartItemId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    productId TEXT NOT NULL,
    productTitle TEXT NOT NULL,
    FOREIGN KEY (userId)
      REFERENCES users (userId)
  );

CREATE TABLE IF NOT EXISTS
  products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    description TEXT,
    imagePath TEXT
  );

-- Seed initial data into product table
INSERT INTO products (name, description, imagePath)
  VALUES
  ('Fast Sloth Sticker', 'Get your hands on this awesome Request Metrics sloth sticker, featuring our chill mascot riding a rocket—perfect for your laptop or desk!', '/assets/img/fast-sloth-sticker.png'),
  ('Good Day to Debug Sticker', 'Channel your inner warrior with this epic Request Metrics sticker. Debug with honor.', '/assets/img/good-day-to-debug-sticker.png'),
  ('JavaScript Happens Sticker', 'Embrace the inevitable. You can&apos;t stop it. JavaScript will happen.', '/assets/img/js-happens-sticker.png'),
  ('Yo Dawg Sticker', 'Develop JavaScript like Xzibit. You always need more JavaScript.', '/assets/img/yo-dawg-sticker.png');


