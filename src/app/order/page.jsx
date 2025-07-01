"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";
import { useCartProductsStore } from "@/store/CartProductStore";
import { CookingProgress } from "@/components/ui/progress";
// import { MinuteCounter } from "@/components/ui/counter";
import { useUserStore } from "@/store/UserStore";
import toast from "react-hot-toast";
import ProductsList from "@/components/layout/cart-components/ProductsList";
import BackButton from "@/components/ui/backButton";

export default function OrderDetailsPage() {
  const [cartProductsClient, setCartProductsClient] = useState([]);

  const cartProducts = useCartProductsStore((state) => state.cartProducts);
  const user = useUserStore((state) => state.user);
  const deletedFromCart = useCartProductsStore(
    (state) => state.deletedFromCart
  );
  //The use of useEffect is to prevent the hydration problem:
  useEffect(() => {
    setCartProductsClient(cartProducts);
  }, [cartProducts]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += (p.product_price * p.inCartCount) || 0;
  }

  return (
    <section className="h-screen mt-4">
      <div className="text-center">
        <SectionHeaders mainHeader="Order #225" />
        <BackButton href="/menu" />
      </div>
      <div className="flex gap-2 justify-between flex-col mt-4 md:flex-row">
        <div className="mb-4">
        <CookingProgress currentStep={1} />
        </div>
        {/* <div className="text-gray-500 text-xs text-center my-4">
          Your order will be ready in 
          <div className="text-sm text-white"><MinuteCounter initialSeconds={300} /></div>
        </div> */}
        <ProductsList
          cartProductsClient={cartProductsClient}
          subtotal={subtotal}
          deletedFromCart={deletedFromCart}
          hideAddToCart={true}
        />
      </div>
    </section>
  );
}
