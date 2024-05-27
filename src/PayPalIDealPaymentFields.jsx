/** @format */

import React, { useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalIDealPaymentFields = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  useEffect(() => {
    if (!window.paypal) return;

    const paymentFields = window.paypal
      .PaymentFields({
        fundingSource: window.paypal.FUNDING.IDEAL,
        onInit: (data, actions) => {
          const form = document.querySelector("form.paypal-payment-form");

          form.addEventListener("submit", (e) => {
            const formData = new FormData(form);
            const paymentSource = formData.get("payment-option");

            if (paymentSource === window.paypal.FUNDING.IDEAL) {
              e.preventDefault();

              actions.validate().then((valid) => {
                if (valid) {
                  console.log("valid----", { valid, paymentSource });
                  // window.location.href = `/second-page.html?payment-option=${window.paypal.FUNDING.IDEAL}`;
                }
              });
            }
          });
        },
        fields: {},
        onClose: () => {},
      })
      .renderTo(window, "#ideal-container");
  }, [isPending]);
  return <div id='ideal-container' />;
};

export default PayPalIDealPaymentFields;
