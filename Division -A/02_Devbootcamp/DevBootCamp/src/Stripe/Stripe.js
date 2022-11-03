import React from "react";
// Components
import HomePage from "./HomePage";
// Styles
import "./stripe.css";
// Stripe Imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// the key is located in the .env file
// const stripePromise = loadStripe(process.env.PUB_KEY);
const stripePromise = loadStripe(
  "pk_test_51LoRJbSFJVQA73jsmRJSJ5bwscbE8EkvTbuG7QgC4kgqepoFgzQrc7ylztTVB27ENClRCfLL1CnPPJVU6j1n4eMw00KW5huN5L"
);

function Stripe(props) {
  return (
    <Elements stripe={stripePromise}>
      <HomePage amount={props.amount} feedback={props.feedback} />
    </Elements>
  );
}

export default Stripe;
