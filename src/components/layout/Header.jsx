"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import Buttons from "@/components/ui/Buttons";
import { usePathname } from "next/navigation";
import { useCartProductsStore } from "@/store/CartProductStore";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { useUserStore } from "@/store/UserStore";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const menuItems = [
    { title: "Menu", href: "/menu" },
    // { title: "Contact", href: "/#contact" },
  ];
  const cartProducts = useCartProductsStore((state) => state.cartProducts);
  const userData = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  //The use of useEffect is to prevent the hydration problem:
  useEffect(() => {
    setCount(cartProducts.length);
  }, [cartProducts]);

  return (
    pathname?.includes('/menu') ?
    <header className={`flex items-center justify-between font-poppins font-xl bg-${!userData?.dark ? '[#0d0d0d]' : 'white'} pt-4 pb-2 pl-2 pr-4`}>
      <Navbar onMenuOpenChange={setIsMenuOpen} className={`bg-${!userData?.dark? "[#0d0d0d]" : "white"}`}>
        <NavbarContent>
          {/* <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          /> */}
          <NavbarBrand>
            <Link
              className={`text-${userData?.dark? "black" : "white"} font-semibold text-lg`}
              href="/menu"
            >
              [Restaurant]
            </Link>
          </NavbarBrand>
        </NavbarContent>
        {/* {menuItems.map((item) => (
          <NavbarContent
            className="hidden sm:flex gap-4"
            justify="center"
            key={item.title}
          >
            <NavbarItem>
              <Link
                color="foreground"
                href={item.href}
                className="font-extrabold hover:text-green-800 duration-150 ease-in-out"
              >
                {item.title}
              </Link>
            </NavbarItem>
          </NavbarContent>
        ))} */}
        {/* <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex gap-2">
            <Buttons />
          </NavbarItem>
        </NavbarContent> */}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={item.title}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          {/* <Buttons /> */}
        </NavbarMenu>

        <div className="flex items-center mx-2">
            <span className={`text-xs text-${userData?.dark? "black" : "white"} mr-2`}>Dark</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setUser({dark: !userData?.dark})}
                checked={userData?.dark}
                aria-label="Toggle dark/light mode"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-400 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
            <span className={`text-xs text-${userData?.dark? "black" : "white"} mr-2`}>Light</span>
          </div>
        <Link href={"/cart"} className={`relative text-${userData?.dark? "black" : "white"}`}>
          <ShoppingCart />
          {count > 0 && (
            <span className={`absolute -top-2 -right-4 bg-primary text-white text-xs px-2 py-1 rounded-full leading-3`}>
              {count}
            </span>
          )}
        </Link>
      </Navbar>
    </header> : null
  );
}
