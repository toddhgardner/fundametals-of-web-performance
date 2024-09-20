/**
 * API Routes
 * Fundamentals of Web Performance
 *
 * This is an example API that has both RESTful and bespoke endpoints for
 * performing operations. The goal is to demonstrate the performance costs of
 * strict RESTful behavior in causing sequential requests.
 *
 * This can either be mounted as its own server, or as routes for a common
 * webserver to illustrate the difference between domain hosting.
 */
const { Router } = require("express");
const bodyParser = require("body-parser");
const cartItems = require("../data/cartItems");
const users = require("../data/users");

const jsonParser = bodyParser.json();
const apiRouter = new Router();

/**
 * RESTful API Endpoints
 * User Routes
 */
apiRouter.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const user = users.getById({ userId });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return next();
  }
  res.json(user);
});
apiRouter.post("/users", jsonParser, (req, res, next) => {
  const { name } = req.body;
  const result = users.create({ name });
  res.set("Location", `${req.protocol}://${req.host}${req.originalUrl}/${result.lastInsertRowid}`);
  res.sendStatus(201);
});

/**
 * RESTful API Endpoints
 * Cart Routes
 */
apiRouter.get("/cart/:userId", (req, res, next) => {
  const { userId } = req.params;
  const user = users.getById({ userId });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const data = cartItems.getByUser({ userId });
  res.json(data);
});

/**
 * Bespoke API Endpoints that do actions expected by the UI
 */
apiRouter.post("/cart/:userId", jsonParser, (req, res, next) => {
  const { userId } = req.params;
  const { productId, productTitle } = req.body;
  cartItems.update({ userId, productId, productTitle });
  res.json(cartItems.getByUser({ userId }));
});
apiRouter.delete("/cart/:userId/:cartItemId", (req, res, next) => {
  const { userId, cartItemId } = req.params;
  cartItems.delete({ userId, cartItemId });
  res.json(cartItems.getByUser({ userId }));
});
apiRouter.delete("/cart/:userId", (req, res, next) => {
  const { userId } = req.params;
  cartItems.deleteAll({ userId });
  res.json(cartItems.getByUser({ userId }));
});


module.exports = apiRouter;
