import React from "react";
import CartProduct from "@/components/menu/CartProduct";
import { Card, CardBody } from "@nextui-org/react";

export default function ProductsList({
  cartProductsClient,
  subtotal,
  deletedFromCart,
}) {
  return (
    <div className="flex-grow px-4">
      {cartProductsClient?.length === 0 && (
        <div>No products in your shopping cart</div>
      )}
      {cartProductsClient?.length > 0 &&
        cartProductsClient.map((product, index) => (
          <CartProduct
            key={index}
            product={product}
            onRemove={!!deletedFromCart && (() => deletedFromCart(index))}
          />
        ))}
      <div className="py-2 px-2 flex justify-between items-center">
        <div>
          <div className="font-semibold pl-2 text-right">
            <span className="text-gray-500">Total: </span>₹{(subtotal).toFixed(2)}
          </div>
        </div>

      </div>
      <div className="p-2">
        <Card shadow="lg" disableAnimation="true" className="bg-green-50">
          <CardBody>
            <button className="text-center font-bold text-xl">Place Order</button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
