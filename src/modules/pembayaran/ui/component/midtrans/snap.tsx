"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Notification } from "ts-midtrans-client";

interface SnapContainerProps {
  token: string;
}
const SnapContainer = ({ token }: SnapContainerProps) => {
  const [snapToken, setSnapToken] = useState(token);
  useEffect(() => {
    // Load the Snap.js script
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = "SB-Mid-client-9HLiFVLpP8ZJ2B1F";

    const script = document.createElement("script");
    script.src = midtransScriptUrl;
    script.setAttribute("data-client-key", midtransClientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setSnapToken(token);
  }, [token]);

  const handlePayButtonClick = () => {
    // Trigger snap popup. Replace TRANSACTION_TOKEN_HERE with your transaction token.
    window.snap.embed(snapToken, {
      embedId: "snap-container",
      onSuccess: function (result: Notification) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result: Notification) {
        /* You may add your own implementation here */
        alert("waiting for your payment!");
        console.log(result);
      },
      onError: function (result: Notification) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  };
  return (
    <div>
      <Button id="pay-button" onClick={handlePayButtonClick}>
        Pay!
      </Button>
      <div id="snap-container"></div>
    </div>
  );
};

export default SnapContainer;
