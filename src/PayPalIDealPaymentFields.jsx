/** @format */

import React, { useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalIDealPaymentFields = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  useEffect(() => {
    if (!window.paypal || isPending) return;

    const paymentFields = window.paypal.PaymentFields({
      fundingSource: window.paypal.FUNDING.IDEAL,
      onInit: (data, actions) => {
        const form = document.querySelector("form.paypal-payment-form");

        form.addEventListener("submit", (e) => {
          const formData = new FormData(form);
          const paymentSource = formData.get("payment-option");
          console.log("actions", { actions });
          if (paymentSource === window.paypal.FUNDING.IDEAL) {
            e.preventDefault();

            actions.validate().then((valid) => {
              if (valid) {
                window.location.href = `/second-page.html?payment-option=${window.paypal.FUNDING.IDEAL}`;
              }
            });
          }
        });
      },
      fields: {
        name: {
          value: "John Doe",
        },
      },
      onclose: () => paymentFields.close(),
    });

    paymentFields.renderTo(window, "#ideal-container");

    return () => {
      paymentFields.close();
    };
  }, [isPending]);

  return <div id='ideal-container' />;
};

export default PayPalIDealPaymentFields;
