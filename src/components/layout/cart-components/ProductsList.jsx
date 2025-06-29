import React from "react";
import CartProduct from "@/components/menu/CartProduct";
import { Card, CardBody } from "@nextui-org/react";

export default function ProductsList({
  cartProductsClient,
  subtotal,
  deletedFromCart,
}) {
  return (
    <>
      <div className="flex-grow px-4 overflow-y-auto scrollbar-hide" style={{
        maxHeight: "calc(100vh - 80px)",
        paddingBottom: "120px"
    }}>
        {cartProductsClient?.length > 0 &&
          cartProductsClient.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              onRemove={!!deletedFromCart && (() => deletedFromCart(index))}
            />
          ))}
        <h4 className="text-white mb-2">Billing Summary</h4>
        <div className="py-2 px-2 text-xs bg-[#47465c] rounded-lg">
          <div className="w-full flex justify-between mb-2">
            <span>Subtotal: </span><span>₹{(subtotal).toFixed(2)}</span>
          </div>
          <div className="w-full flex justify-between mb-2">
            <span>CGST(2.5%): </span><span>₹{(Number((subtotal).toFixed(2)) * 0.025).toFixed(2)}</span>
          </div>
          <div className="w-full flex justify-between mb-2">
            <span>SGST(2.5%): </span><span>₹{(Number((subtotal).toFixed(2)) * 0.025).toFixed(2)}</span>
          </div>
          <div className="w-full flex justify-between border-t-1 pt-2">
            <span>Total: </span><span>₹{(Number((subtotal).toFixed(2)) + Number((Number((subtotal).toFixed(2)) * 0.05).toFixed(2))).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="p-2 fixed bottom-0 left-0 w-full ">
        <Card shadow="lg" disableAnimation="true" className="bg-red-500 text-white">
          <CardBody>
            <button className="text-center">Place Order (₹{(Number((subtotal).toFixed(2)) + Number((Number((subtotal).toFixed(2)) * 0.05).toFixed(2))).toFixed(2)})</button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
