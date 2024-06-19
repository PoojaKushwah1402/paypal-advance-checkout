/** @format */

import React, { useState } from "react";
import "./style.css";

import {
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
} from "@paypal/react-paypal-js";

export default function CardField({ createOrder, onApprove }) {
  function onError(error) {
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
