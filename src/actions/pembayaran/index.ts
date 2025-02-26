"use server";

import { dbSpmb } from "@/lib/db-spmb";
import { getSnapTransactionStatus } from "@/modules/gpn/midtrans";

const bayar = async (fakturId: string, pembayarandId?: string) => {
  // jika pembayaranId tidak ada, maka buat pembayaran baru
  // jika pembayaranId ada, cek di database apakah sudah ada transaksi
  // jika sudah ada transaksi, maka cek status transaksi
  // jika status transaksi sudah selesai, maka tidak perlu membuat transaksi baru

  const pembayaran = await dbSpmb.pembayaran.findFirst({
    where: {
      fakturId,
      ...(pembayarandId && { id: pembayarandId }),
    },
  });

  if (pembayaran && pembayaran.metodePembayaran === "gpn") {
    // cek ulang di gpn

    try {
      const snap = await getSnapTransactionStatus(pembayaran.id);
      console.log(snap);
    } catch (error) {
      console.log(error);
      return null;
    }

    // switch (pembayaran.status) {
    //   case "settlement":
    //     return "Pembayaran sudah selesai";
    //   case "pending":
    //     return "Pembayaran sedang dalam proses";
    //   case "expire":
    //     return "Pembayaran sudah kadaluarsa";
    //   case "cancel":
    //     return "Pembayaran dibatalkan";
    //   default:
    //     break;
    // }
  }

  return null;
};
