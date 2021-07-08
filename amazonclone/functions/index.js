/* eslint-disable no-unused-vars */

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
    "sk_test_51JAmrZHsNUk0QSoktqyLcxcJJZMBscLdKgl8zySo9"+
"G16XILBhwU44v0zETyw6A7CtwoT1kir9zdT0DwSXDOpK4s100tclFEvWT"
);

// API

// App config
const app = express();
// Middlewares
app.use(cors({origin: true}));
app.use(express.json());
// API routes
// dummy route
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log("Payment Request Received, for this amount",  total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, 
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntents.clientSecret,
        })
});

// Listen command
exports.api = functions.https.onRequest(app);

