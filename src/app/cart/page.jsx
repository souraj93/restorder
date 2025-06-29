"use client";

import AddressInputs from "@/components/layout/cart-components/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";
import { useCartProductsStore } from "@/store/CartProductStore";
import { useUserStore } from "@/store/UserStore";
import toast from "react-hot-toast";
import ProductsList from "@/components/layout/cart-components/ProductsList";
import BackButton from "@/components/ui/backButton";

export default function CartPage() {
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

  useEffect(() => {
    if (window.location.href.includes("canceled=1")) {
      toast.error("Payment failed 😔");
    }
  }, []);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += (p.product_price*p.inCartCount) || 0;
  }

  if (cartProductsClient?.length === 0) {
    return (
      <section className="mt-4 text-center h-screen">
        <SectionHeaders mainHeader="Cart" />
        <BackButton />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="h-screen mt-4">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
        <BackButton />
      </div>
      <div className="flex gap-2 justify-between flex-col mt-4 md:flex-row">
        <ProductsList
          cartProductsClient={cartProductsClient}
          subtotal={subtotal}
          deletedFromCart={deletedFromCart}
        />
        {/* <div className="bg-gray-100 p-4 rounded-lg">
          <AddressInputs
            disabled={false}
            user={user}
            total={subtotal + 5}
            cartProductsClient={cartProductsClient}
          />
        </div> */}
      </div>
    </section>
  );
}
