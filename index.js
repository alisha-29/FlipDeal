const express = require('express');
const { resolve } = require('path');
// const cors = require('cors');

const app = express();
const port = 3000;
// app.use(cors());

app.use(express.static('static'));

let taxRate = 5;
let discountedPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = newItemPrice + cartTotal;
  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  let finalPrice = isMember
    ? cartTotal - (cartTotal * discountPercentage) / 100
    : cartTotal;

  res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  if (isNaN(cartTotal)) {
    return res.status(400).send('Invalid cartTotal value');
  }

  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let deliveryTime;
  if (shippingMethod === 'Standard') {
    deliveryTime = Math.ceil(distance / 50);
  } else if (shippingMethod === 'Express') {
    deliveryTime = Math.ceil(distance / 100);
  }

  res.send(deliveryTime.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let price = weight * distance * 0.1;
  res.send(price.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let points = purchaseAmount * loyaltyRate;
  res.send(points.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
