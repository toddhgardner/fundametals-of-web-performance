/**
 * API Routes
 * Fundamentals of Web Performance
 *
 * This is an example API for interacting with the Store Data.
 */

const { Router } = require("express");
const bodyParser = require("body-parser");

const { getRandom } = require("../lib/getRandom");
const cartQuery = require("../data/cartQuery");
const usersQuery = require("../data/usersQuery");
const productsQuery = require("../data/productsQuery");

const jsonParser = bodyParser.json();
const apiRouter = new Router();

/**
 * Product API
 * RESTful API Endpoints
 */
apiRouter.get("/products", async (req, res, next) => {
  const products = await productsQuery.getAll();
  products[getRandom(0, (products.length - 1))].isPromo = true;
  res.json(products);
  next();
})

/**
 * User API
 * RESTful API Endpoints
 */
apiRouter.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const user = await usersQuery.getById({ userId });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return next();
  }
  res.json(user);
  next();
});
apiRouter.post("/users", jsonParser, async (req, res, next) => {
  const { name } = req.body;
  const result = await usersQuery.create({ name });
  res.set("Location", `${req.get("origin")}${req.originalUrl}/${result.lastInsertRowid}`);
  res.sendStatus(201);
  next();
});

/**
 * Cart API
 * RESTful API Endpoints
 */
apiRouter.get("/users/:userId/cart", async (req, res, next) => {
  const { userId } = req.params;
  const user = await usersQuery.getById({ userId });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return next();
  }
  const data = await cartQuery.getByUser({ userId });
  res.json(data);
  next();
});
apiRouter.post("/users/:userId/cart", jsonParser, async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.body;
  await cartQuery.insert({ userId, productId });
  res.status(201);
  const data = await cartQuery.getByUser({ userId });
  res.json(data);
  next();
});
apiRouter.delete("/users/:userId/cart", async (req, res, next) => {
  const { userId } = req.params;
  await cartQuery.deleteAll({ userId });
  res.status(200);
  const data = await cartQuery.getByUser({ userId });
  res.json(data);
  next();
});
apiRouter.delete("/users/:userId/cart/:cartItemId", async (req, res, next) => {
  const { userId, cartItemId } = req.params;
  await cartQuery.delete({ userId, cartItemId });
  res.status(200);
  const data = await cartQuery.getByUser({ userId });
  res.json(data);
  next();
});

module.exports = apiRouter;
