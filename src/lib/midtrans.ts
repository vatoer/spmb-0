// Example usage in a user's project
import Midtrans from "ts-midtrans-client";

const { Snap, CoreApi, Iris, MidtransError, SnapBiConfig, SnapBi } = Midtrans;

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true"; // Convert to boolean

if (!SERVER_KEY) {
  throw new Error(
    "SERVER_KEY is not defined. Please set the SERVER_KEY environment variable."
  );
}

if (!CLIENT_KEY) {
  throw new Error(
    "CLIENT_KEY is not defined. Please set the CLIENT_KEY environment variable."
  );
}

if (typeof IS_PRODUCTION !== "boolean") {
  throw new Error(
    "MIDTRANS_IS_PRODUCTION is not defined or not a boolean. Please set the MIDTRANS_IS_PRODUCTION environment variable to 'true' or 'false'."
  );
}

console.log("Midtrans initialized with the following configuration:");
console.log("SERVER_KEY:", SERVER_KEY);
console.log("CLIENT_KEY:", CLIENT_KEY);
console.log("IS_PRODUCTION:", IS_PRODUCTION);

// Example usage of the imported modules
export const snapInstance = new Snap({
  isProduction: IS_PRODUCTION,
  serverKey: SERVER_KEY,
  clientKey: CLIENT_KEY,
});
