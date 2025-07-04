"use client";
import React, { useEffect, useState } from "react";
import CartProduct from "@/components/menu/CartProduct";
import { Card, CardBody } from "@nextui-org/react";
import {BillingSummary} from "@/components/ui/billingSummary";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";

export default function ProductsList({
  cartProductsClient,
  subtotal = 0,
  deletedFromCart,
  hideAddToCart,
  isRating = false
}) {
  const userData = useUserStore((state) => state.user);

  const router = useRouter();

  const [billDetails, setBillDetails] = useState({
    subTotal: 0,
    cgst: 0,
    sgst: 0,
    total: 0
  });

  useEffect(() => {
    if (subtotal) {
      setBillDetails({
        subTotal: (subtotal).toFixed(2),
        cgst: (Number((subtotal).toFixed(2)) * 0.025).toFixed(2),
        sgst: (Number((subtotal).toFixed(2)) * 0.025).toFixed(2),
        total: (Number((subtotal).toFixed(2)) + Number((Number((subtotal).toFixed(2)) * 0.05).toFixed(2))).toFixed(2)
      });
    }
  }, [subtotal]);

  return (
    <>
      <div className={`flex-grow px-4 pt-4 overflow-y-auto scrollbar-hide bg-${!userData?.dark ? "[#0d0d0d]" : "white"}`} style={{
        maxHeight: !hideAddToCart ? "calc(100vh - 80px)" : '',
        paddingBottom: !hideAddToCart ? "120px" : '20px'
      }}>
        {cartProductsClient?.length > 0 &&
          cartProductsClient.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              onRemove={!!deletedFromCart && (() => deletedFromCart(index))}
              hideAddToCart={hideAddToCart}
              isRating={isRating}
            />
          ))}
        <BillingSummary billDetails={billDetails} />
      </div>
      {!hideAddToCart ?
        <div className="p-2 fixed bottom-0 left-0 w-full ">
          <Card shadow="lg" disableAnimation="true" className="bg-primary text-white">
            <CardBody>
              <button className="text-center" onClick={() => router.push('/order')}>Place Order (₹{(Number((subtotal).toFixed(2)) + Number((Number((subtotal).toFixed(2)) * 0.05).toFixed(2))).toFixed(2)})</button>
            </CardBody>
          </Card>
        </div> : null}
    </>
  );
}
