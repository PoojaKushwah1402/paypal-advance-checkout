/** @format */

import React, { useState } from "react";
import "./style.css";

import { usePayPalCardFields } from "@paypal/react-paypal-js";

export const SubmitPayment = ({ isPaying, setIsPaying }) => {
  const { cardFieldsForm, fields } = usePayPalCardFields();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);

    cardFieldsForm.submit().catch((err) => {
      setIsPaying(false);
    });
  };

  return (
    <button
      className={isPaying ? "pay-btn" : "pay-btn btn-primary"}
      style={{ float: "right" }}
      onClick={handleClick}>
      {isPaying ? <div className='spinner' /> : "Pay"}
    </button>
  );
};
