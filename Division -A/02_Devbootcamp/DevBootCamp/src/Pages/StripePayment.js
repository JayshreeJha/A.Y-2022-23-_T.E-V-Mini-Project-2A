import React from "react";
import StripeCheckout from "react-stripe-checkout";

// sample function defined to compute total quantity of cart
// function computeQuantity(cart) {
//   return cart.reduce((count, itemInCart) => count + itemInCart.quantity, 0);
// }
// similar functions can be defined to compute total price, email of the user, etc.

class StripePaymentForm extends React.Component {
  onToken = () => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(
        "pk_test_51LoRJbSFJVQA73jsmRJSJ5bwscbE8EkvTbuG7QgC4kgqepoFgzQrc7ylztTVB27ENClRCfLL1CnPPJVU6j1n4eMw00KW5huN5L"
      ),
    }).then((res) => {
      res.json().then((data) => {
        console.log(`Payment token generated, ${data.name}`);
      });
    });
  };

  render() {
    return (
      <StripeCheckout
        amount="10.00"
        name="STRIPE_INTEGRATION"
        // functions defined above can be used to add more information while making the API call.
        // description={`Order of ${computeQuantity(cart)} items!`}
        image="LINKTOIMAGE"
        stripeKey="PUBLISHABLE_STRIPE_KEY"
        currency="INR"
        email="USER_EMAIL"
        token={
          "pk_test_51LoRJbSFJVQA73jsmRJSJ5bwscbE8EkvTbuG7QgC4kgqepoFgzQrc7ylztTVB27ENClRCfLL1CnPPJVU6j1n4eMw00KW5huN5L"
        }
      />
    );
  }
}

export default StripePaymentForm;
