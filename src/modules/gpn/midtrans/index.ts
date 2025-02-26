"use server";

import { snapInstance } from "@/lib/midtrans";
import { MidtransError, Parameter, SnapTransaction } from "ts-midtrans-client";

export const createSnapTransaction = async (
  data: Parameter
): Promise<SnapTransaction | null> => {
  // check if transaction already exists

  // disini perlu diperhatikan bahwa jika transaksi belum ada akan raise error
  // sehingga perlu dihandle dengan try catch
  // jika sudah ada transaksi, maka tidak perlu membuat transaksi baru
  try {
    const transactionStatus = await getSnapTransactionStatus(
      data.transaction_details.order_id
    );
    return null;
  } catch (error) {
    console.log(error);
  }

  // belum ada transaksi
  // bisa lanjutkan pembuatan transaksi
  try {
    console.log("Creating transaction...");
    const response = await snapInstance.createTransaction(data);
    return response;
  } catch (error) {
    if (error instanceof MidtransError) {
      // @see https://docs.midtrans.com/reference/sample-response#validation-error
      if (error.httpStatusCode === 400) {
        console.log(error.message);
        throw new Error("Invalid request, please check your request body");
      } else if (error.httpStatusCode === 401) {
        throw new Error("Terjadi kesalahan pada server, silakan hubungi admin");
      } else if (error.httpStatusCode === 500) {
        throw new Error(
          "Terjadi gangguan pada server Pembayaran (pihak ke-3), silahkan coba lagi"
        );
      }
      throw new Error(error.message);
    } else {
      console.log(error);
      throw new Error("Failed to create transaction, please try again later");
    }
  }
};

export const getSnapTransactionStatus = async (orderId: string) => {
  try {
    const response = await snapInstance.getTransaction().status(orderId);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
