import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const BarcodeGenerator = ({
  iban,
  euros,
  cents,
  reference,
  dueDate,
}: {
  iban: string;
  euros: string;
  cents: string;
  reference: string;
  dueDate: string | number | Date;
}) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    const version = 5; // Assuming version 5 (for RF reference numbers)
    const ibanNumber = iban.replace(/\D/g, "").substring(2); // Remove FI and get numeric IBAN
    const euroAmount = euros.padStart(6, "0");
    const centAmount = cents.padStart(2, "0");
    const rfReference = reference.replace(/\D/g, "").padStart(23, "0"); // Numeric RF reference
    const formattedDueDate = dueDate ? formatDueDate(dueDate) : "000000"; // Format due date

    const barcodeData = `${version}${ibanNumber}${euroAmount}${centAmount}${rfReference}${formattedDueDate}`;

    JsBarcode(barcodeRef.current, barcodeData, {
      format: "CODE128",
      lineColor: "#000",
      width: 2,
      height: 60,
      displayValue: false,
    });
  }, [iban, euros, cents, reference, dueDate]);

  const formatDueDate = (date: string | number | Date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
  };

  return (
    <div>
      <svg ref={barcodeRef}></svg>
    </div>
  );
};

export default BarcodeGenerator;
