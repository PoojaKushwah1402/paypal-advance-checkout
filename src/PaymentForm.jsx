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

function createOrder(data) {
  console.log("createOrder", { data });
}
function onApprove(data) {
  console.log("onApprove", { data });
}

const PaymentForm = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();

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
          <input type='hidden' name='payment-option' value={selectedMethod} />

          <div
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
          </div>

          <div className='paymentMethod '>
            <PayPalCardFieldsProvider
              createOrder={createOrder}
              onApprove={onApprove}
              onError={(err) => {
                console.log("err", err);
              }}>
              <PayPalCardFieldsForm />
            </PayPalCardFieldsProvider>
          </div>

          <button className='pay-btn' type='submit'>
            Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
