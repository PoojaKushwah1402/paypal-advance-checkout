/**
 * eslint-disable react/prop-types
 *
 * @format
 */

import React, { lazy } from "react";
import {
  usePayPalScriptReducer,
  PayPalMarks,
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import "./style.css";
import PayPalIDealPaymentFields from "./PayPalIDealPaymentFields";
import PayPalBanContactPaymentFields from "./BanContact";
import CardField from "./CardField";
import { SubmitPayment } from "./Submit";
const serverURL = "http://localhost:4001";

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

function onApprove(data) {
  console.log("onApprove*****-----------------------------", data);
  return fetch(`${serverURL}/api/orders/${data.orderID}/capture`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((orderData) => {
      console.log("orderData success", { orderData });
      // Successful capture!
    })
    .catch((err) => {});
}

const PaymentForm = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [isPaying, setIsPaying] = React.useState(false);

  const [selectedMethod, setSelectedMethod] = React.useState("paypal");

  const setPaymentMethod = (method) => setSelectedMethod(method);

  return (
    <>
      {showSpinner && isPending && <div className='spinner' />}

      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          textAlign: "center",
        }}>
        <form className='paypal-payment-form'>
          {/* <input type='hidden' name='payment-option' value={selectedMethod} /> */}

          {/* <div
            onClick={() => setPaymentMethod("ideal")}
            className={`paymentMethod ${
              selectedMethod === "ideal" ? " active" : ""
            }`}>
            <PayPalMarks fundingSource='ideal' />
            {selectedMethod === "ideal" ? <PayPalIDealPaymentFields /> : ""}
          </div>
          <div
            onClick={() => setPaymentMethod("paypal")}
            className={`paymentMethod ${
              selectedMethod === "paypal" ? " active" : ""
            }`}>
            <PayPalMarks fundingSource='paypal' />
          </div>
          <div
            onClick={() => setPaymentMethod("bancontact")}
            className={`paymentMethod ${
              selectedMethod === "bancontact" ? " active" : ""
            }`}>
            <PayPalMarks fundingSource='bancontact' />
            {selectedMethod === "bancontact" ? (
              <PayPalBanContactPaymentFields />
            ) : (
              ""
            )}
          </div> */}

          <div className='paymentMethod '>
            {/* <PayPalCardFieldsProvider
              createOrder={createOrder}
              onApprove={onApprove}
              onError={(err) => {
                console.log("err", err);
              }}>
              <PayPalCardFieldsForm />
            </PayPalCardFieldsProvider> */}
            <CardField />
          </div>

          {/* <button className='pay-btn' type='submit'>
            Pay
          </button> */}
          <SubmitPayment isPaying={isPaying} setIsPaying={setIsPaying} />
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
