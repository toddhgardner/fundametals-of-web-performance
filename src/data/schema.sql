--
-- Database Schema
-- Fundamentals of Web Performance
--
-- Simplified Database design for an online store with products, users, and carts.
--

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS
  products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    t TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    imagePath TEXT
  );

CREATE TABLE IF NOT EXISTS
  users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    t TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name TEXT
  );

CREATE TABLE IF NOT EXISTS
  cartItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    t TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
    FOREIGN KEY (productId) REFERENCES products (id)
  );

-- Seed initial data into product table
INSERT INTO products (slug, name, description, imagePath)
  VALUES
  (
    'fast-sloth-sticker',
    'Fast Sloth Sticker',
    'Get your hands on this awesome Request Metrics sloth sticker, featuring our chill mascot riding a rocket—perfect for your laptop or desk!',
    '/assets/img/fast-sloth-sticker.png'
  ),
  (
    'good-day-to-debug-sticker',
    'Good Day to Debug Sticker',
    'Channel your inner warrior with this epic Request Metrics sticker. Debug with honor.',
    '/assets/img/good-day-to-debug-sticker.png'
  ),
  (
    'js-happens-sticker',
    'JavaScript Happens Sticker',
    'Embrace the inevitable. You can&apos;t stop it. JavaScript will happen.',
    '/assets/img/js-happens-sticker.png'
  ),
  (
    'yo-dawg-sticker',
    'Yo Dawg Sticker',
    'Develop JavaScript like Xzibit. You always need more JavaScript.',
    '/assets/img/yo-dawg-sticker.png'
  );


