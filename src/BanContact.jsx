/** @format */

import React, { useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalBanContactPaymentFields = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  useEffect(() => {
    if (!window.paypal || isPending) return;

    const paymentFields = window.paypal
      .PaymentFields({
        fundingSource: window.paypal.FUNDING.BANCONTACT,
        style: {
          variables: {},
          rules: {},
        },
        onInit: (data, actions) => {
          const form = document.querySelector("form.paypal-payment-form");

          form.addEventListener("submit", (e) => {
            const formData = new FormData(form);
            const paymentSource = formData.get("payment-option");

            if (paymentSource === window.paypal.FUNDING.BANCONTACT) {
              e.preventDefault();

              actions.validate().then((valid) => {
                if (valid) {
                  console.log("valid----", { valid, paymentSource });
                  // window.location.href = `/second-page.html?payment-option=${window.paypal.FUNDING.BANCONTACT}`;
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
        onClose: () => {},
      })
      .renderTo(window, "#bancontact-container");
  }, [isPending]);

  return <div id='bancontact-container' />;
};

export default PayPalBanContactPaymentFields;
