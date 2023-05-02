import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

import "./App.css";
import axios from "axios";

const publicKey =
  "pk_test_51N39egF3hZdgARAEIXBGRtVnbwnfoZJyUwfIPHf8UtmGIcxV9nYZ4Zv7FVfqfXTLtch0VfQB5xCShFeqSUCljkhR00KQ8wh9rv";

function App() {
  const [product] = useState({
    name: "headphone",
    price: 10,
  });
  const priceForStripe = product.price * 100;

  const payNow = async (token: string) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });

      if (response.status === 200) {
        console.log("Your payment was successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Product: {product.name}</h1>
      <h1>Price: {product.price}</h1>
      <StripeCheckout
        stripeKey={publicKey}
        label="Pay now"
        name="Pay with credit card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is ${product.price}`}
        token={payNow as any}
      />
      <button>Pay Now</button>
    </div>
  );
}

export default App;
