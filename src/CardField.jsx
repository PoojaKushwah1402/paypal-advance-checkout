/** @format */

import React, { useState } from "react";

import {
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
} from "@paypal/react-paypal-js";

export default function CardField({ createOrder, onApprove }) {
  // const [billingAddress, setBillingAddress] = useState({
  //   addressLine1: "",
  //   addressLine2: "",
  //   adminArea1: "",
  //   adminArea2: "",
  //   countryCode: "",
  //   postalCode: "",
  // });

  // async function createOrder(data) {
  //   console.log("***************************------*********8server", { data });
  //   return fetch(`${serverURL}/api/orders`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // Use the "body" parameter to optionally pass additional order information
  //     body: JSON.stringify({
  //       cart: [
  //         {
  //           sku: "1blwyeo8",
  //           quantity: 2,
  //         },
  //       ],
  //       card: {
  //         attributes: {
  //           verification: {
  //             method: "SCA_ALWAYS",
  //           },
  //         },
  //       },
  //       paymentSource: data.paymentSource,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((order) => {
  //       console.log("order", { order });
  //       return order.id;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // const getToken = async () => {
  //   const data = await fetch(`${serverURL}/api/token`);
  //   console.log("data", { data });
  // };

  // const capturePayment = async () => {
  //   const data = await fetch(
  //     `${serverURL}/api/orders/3FR32370VB617723N/capture`,
  //     {
  //       method: "POST",
  //     }
  //   );
  //   console.log("data", { data });
  // };

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     // getToken();
  //     capturePayment();
  //   });
  // }, []);

  // function onApprove(data) {
  //   console.log("onApprove*****-----------------------------", data);
  //   return fetch(`${serverURL}/api/orders/${data.orderID}/capture`, {
  //     method: "POST",
  //   })
  //     .then((response) => response.json())
  //     .then((orderData) => {
  //       console.log("orderData success", { orderData });
  //       // Successful capture!
  //     })
  //     .catch((err) => {});
  // }

  function onError(error) {
    // Do something with the error from the SDK
    console.log("*****************error");
  }

  return (
    <PayPalCardFieldsProvider
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}>
      <PayPalCardFieldsForm />

      {/* Custom client component to handle card fields submission */}
    </PayPalCardFieldsProvider>
  );
}
