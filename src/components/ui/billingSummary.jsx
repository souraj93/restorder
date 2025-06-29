"use client";

export function BillingSummary({ billDetails }) {

  return <>
    <h4 className="text-white mb-2">Billing Summary</h4>
    <div className="py-2 px-2 text-xs bg-[#2f2e33] rounded-lg">
      <div className="w-full flex justify-between mb-2">
        <span>Subtotal: </span><span>₹{billDetails.subTotal}</span>
      </div>
      <div className="w-full flex justify-between mb-2">
        <span>CGST(2.5%): </span><span>₹{billDetails.cgst}</span>
      </div>
      <div className="w-full flex justify-between mb-2">
        <span>SGST(2.5%): </span><span>₹{billDetails.sgst}</span>
      </div>
      <div className="w-full flex justify-between border-t-1 pt-2">
        <span>Total: </span>
        <span>₹{billDetails.total}</span>
      </div>
    </div>
  </>
}