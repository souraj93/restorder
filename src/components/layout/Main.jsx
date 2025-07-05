"use client";
import { useUserStore } from "@/store/UserStore";
import React from "react";
const Main = ({ children }) => {
  const userData = useUserStore((state) => state.user);
  
  return (
    <main className={`max-w-4xl mx-auto bg-${!userData?.dark ? 'black' : 'white'} text-white`}>
      {children}
    </main>
  );
};
export default Main;
