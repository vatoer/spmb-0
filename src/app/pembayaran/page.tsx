import { createSnapTransaction } from "@/modules/gpn/midtrans";
import SnapContainer from "@/modules/pembayaran/ui/component/midtrans/snap";
import { SnapTransaction } from "ts-midtrans-client";

const PembayaranPage = async () => {
  let snapTransaction: SnapTransaction | null = null;
  let token: string | null = null;

  // step 1: check order id
  // step 2: check apakah sudah ada token dan redirect url
  // jika sudah ada, maka langsung redirect ke snap

  // get from database

  try {
    snapTransaction = await createSnapTransaction({
      transaction_details: {
        order_id: "order-102",
        gross_amount: 200000,
      },
    });
    if (!snapTransaction) {
      // throw new Error("Failed to create transaction");
    } else {
      token = snapTransaction.token;
    }
  } catch (error) {
    console.log(error);
  }

  console.log(snapTransaction);

  return (
    <div>
      <div>Pembayaran</div>
      {snapTransaction && <SnapContainer token={snapTransaction.token} />}
    </div>
  );
};

export default PembayaranPage;
