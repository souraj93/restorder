import React from "react";
import CartProduct from "@/components/menu/CartProduct";
import { Card, CardBody } from "@nextui-org/react";

export default function ProductsList({
  cartProductsClient,
  subtotal,
  deletedFromCart,
}) {
  return (
    <div className="border flex-grow">
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
      <div className="py-2 px-2 flex justify-end items-center">
        <div className="text-gray-500">
          {/* Subtotal:
          <br />
          Delivery:
          <br /> */}
          Total:
        </div>
        <div className="font-semibold pl-2 text-right">
          Rs {(subtotal).toFixed(2)}
          {/* <br />
          $5
          <br />${subtotal + 5} */}
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
