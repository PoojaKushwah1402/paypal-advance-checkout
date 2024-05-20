/** @format */

import React, { useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalBanContactPaymentFields = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  useEffect(() => {
    if (!window.paypal || isPending) return;

    window.paypal
      .PaymentFields({
        fundingSource: window.paypal.FUNDING.BANCONTACT,
        /* style object (optional) */
        style: {
          /* customize field attributes (optional) */
          variables: {},
          /* set custom rules to apply to fields classes (optional) */
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
                  window.location.href = `/second-page.html?payment-option=${window.paypal.FUNDING.BANCONTACT}`;
                }
              });
            }
          });
        },
        fields: {
          /* fields prefill info (optional) */
          name: {
            value: "John Doe",
          },
        },
      })
      .renderTo(window, "#bancontact-container");
  }, []);

  return <div id='bancontact-container' />;
};

export default PayPalBanContactPaymentFields;
