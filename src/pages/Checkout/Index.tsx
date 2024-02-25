import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

type Props = {};

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Checkout({}: Props) {
  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        checkout
        <PaymentElement />
        <button>Submit</button>
      </Elements>
    </div>
  );
}

export default Checkout;
