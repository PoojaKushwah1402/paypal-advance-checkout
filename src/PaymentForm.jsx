/**
 * eslint-disable react/prop-types
 *
 * @format
 */

import React, { lazy } from "react";
import {
  usePayPalScriptReducer,
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
} from "@paypal/react-paypal-js";
import "./style.css";

import { SubmitPayment } from "./Submit";
const serverURL = "http://localhost:4001";

function onError(error) {
  console.log("*****************error");
}
const details = {
  currency: "EUR",
  amount: 200,
};
const PaymentForm = ({ showSpinner, setIsSuccess }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [isPaying, setIsPaying] = React.useState(false);
  function onApprove(data) {
    console.log("onApprove*****-----------------------------", data);
    return fetch(`${serverURL}/api/orders/${data.orderID}/capture`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((orderData) => {
        console.log("orderData success", { orderData });
        setIsPaying(false);
        setIsSuccess(true);
        // Successful capture!
      })
      .catch((err) => {});
  }

  async function createOrder(data) {
    console.log("***************************------*********8server", { data });
    return fetch(`${serverURL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Use the "body" parameter to optionally pass additional order information
      body: JSON.stringify({
        cart: [
          {
            sku: "1blwyeo8",
            quantity: 2,
          },
        ],
        card: {
          attributes: {
            verification: {
              method: "SCA_ALWAYS",
            },
          },
        },
        paymentSource: data.paymentSource,
        details,
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        console.log("order", { order });
        return order.id;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      {showSpinner && isPending && <div className='spinner' />}
      <div>currency : {details.currency}</div>
      <div>amount : {details.amount}</div>

      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          textAlign: "center",
        }}>
        <form className='paypal-payment-form'>
          <PayPalCardFieldsProvider
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}>
            <div className='paymentMethod '>
              <PayPalCardFieldsForm />
            </div>
            {/* Custom client component to handle card fields submission */}
            <SubmitPayment isPaying={isPaying} setIsPaying={setIsPaying} />
          </PayPalCardFieldsProvider>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
