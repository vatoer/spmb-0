import crypto from "crypto";
import { Notification as MidtransNotification } from "ts-midtrans-client";

const SERVER_KEY = "your-server-key-here";

function verifySignature(notification: MidtransNotification): boolean {
  const { order_id, status_code, gross_amount, signature_key } = notification;
  const rawSignature = order_id + status_code + gross_amount + SERVER_KEY;
  const expectedSignature = crypto
    .createHash("sha512")
    .update(rawSignature)
    .digest("hex");
  return expectedSignature === signature_key;
}

function isTransactionSuccessful(notification: MidtransNotification): boolean {
  return (
    notification.status_code === "200" &&
    notification.fraud_status.toLowerCase() === "accept" &&
    ["settlement", "capture"].includes(
      notification.transaction_status.toLowerCase()
    )
  );
}

function processMidtransNotification(notification: MidtransNotification) {
  if (!verifySignature(notification)) {
    throw new Error("Invalid signature key. Possible tampering detected.");
  }

  if (isTransactionSuccessful(notification)) {
    console.log(
      `Payment for Order ID ${notification.order_id} is successful and settled.`
    );
    // Update database status to 'paid'
  } else {
    console.log(
      `Payment for Order ID ${notification.order_id} is not successful.`
    );
    // Handle non-successful transaction accordingly
  }
}

// Example usage:
const exampleNotification: MidtransNotification = {
  transaction_type: "on-us",
  transaction_time: "2025-02-23 03:41:13",
  transaction_status: "settlement",
  transaction_id: "98606b17-6510-428e-b763-7cd2eb444855",
  status_message: "midtrans payment notification",
  status_code: "200",
  signature_key:
    "a3472505eff2cb268006f4bae12a6a7de64dbd3c7bd3367065e50e916f31659c1ac88988cd91ee7c2fb801a69bd735c30ea34bdf610a4bd647fa2a562d2ec3e5",
  settlement_time: "2025-02-23 03:53:44",
  payment_type: "qris",
  order_id: "ID-124",
  merchant_id: "G072963841",
  issuer: "gopay",
  gross_amount: "124000.00",
  fraud_status: "accept",
  expiry_time: "2025-02-23 03:56:13",
  currency: "IDR",
  acquirer: "gopay",
};

processMidtransNotification(exampleNotification);
