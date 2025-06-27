"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent
} from "@nextui-org/react";
import Buttons from "@/components/ui/Buttons";
import { usePathname } from "next/navigation";
import { useCartProductsStore } from "@/store/CartProductStore";
import ShoppingCart from "@/components/icons/ShoppingCart";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Menu", href: "/menu" },
    { title: "About", href: "/#about" },
    { title: "Contact", href: "/#contact" },
  ];
  const cartProducts = useCartProductsStore((state) => state.cartProducts);
  //The use of useEffect is to prevent the hydration problem:
  useEffect(() => {
    setCount(cartProducts.length);
  }, [cartProducts]);

  return (
    !pathname?.includes('/details') ?
    <header className="flex items-center justify-between font-poppins font-xl bg-[#0d0d0d] py-4 pl-2 pr-4">
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarBrand>
            <Link
              className="text-white font-semibold text-xl"
              href="/menu"
            >
              Cook My Food
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <Link href={"/cart"} className="relative">
          <ShoppingCart />
          {count > 0 && (
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs px-2 py-1 rounded-full leading-3">
              {count}
            </span>
          )}
        </Link>
      </Navbar>
    </header> : null
  );
}
