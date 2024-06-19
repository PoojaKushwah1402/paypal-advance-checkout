/** @format */

import React from "react";

import "./App.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentForm from "./PaymentForm";

function App() {
  const initialOptions = {
    clientId:
      // "AduyjUJ0A7urUcWtGCTjanhRBSzOSn9_GKUzxWDnf51YaV1eZNA0ZAFhebIV_Eq-daemeI7dH05KjLWm",
      "AdjMKxACEf4wrl11DNB0c3nmvJQ5tCcRa4gjT1xm9zb5WoGIpeATK0UjQNnCBN_IR9lHsw94D7AxdRTl",
    enableFunding: "paylater,venmo,ideal,bancontact",
    components: "card-fields,buttons,payment-fields,funding-eligibility,marks",
    currency: "EUR",
  };

  return (
    <div style={{ border: "2px solid black", width: "500px", padding: "5px" }}>
      <>
        <PayPalScriptProvider options={initialOptions} deferLoading={false}>
          <PaymentForm showSpinner={false} />
        </PayPalScriptProvider>
      </>
    </div>
  );
}

export default App;
