"use client";

import { useUserStore } from "@/store/UserStore";

export function BillingSummary({ billDetails }) {
  const userData = useUserStore((state) => state.user);

  return <>
    <h4 className={`text-${!userData?.dark ? "white" : "black"} mb-2`}>Billing Summary</h4>
    <div className={`px-2 py-3 text-xs bg-${!userData?.dark ? "[#2f2e33] text-white" : "white text-black"} rounded-lg`}
    style={{
      boxShadow: userData?.dark ? '2px 2px 7px 0px rgba(0,0,0,0.7)' : 'none'
    }}>
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