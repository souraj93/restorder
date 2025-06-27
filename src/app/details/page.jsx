"use client";

import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
// import PlusMinus from '@/components/ui/PlusMinus';
import { useCartProductsStore } from '@/store/CartProductStore';
import { AddToCart } from '@/components/ui/addToCart';

const menuItem = {
  name: 'Paneer Butter Masala',
  description: 'A rich and creamy tomato-based curry with tender paneer cubes.',
  basePrice: 220,
  images: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4WgHKAVcjSG9IXDRbB5prngjkm8IH9dwcA&s',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kolkata_mutton_biryani.jpg/1200px-Kolkata_mutton_biryani.jpg'
  ]
};

export default function MenuDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuData, setMenuData] = useState(menuItem);

  const addToCart = useCartProductsStore((state) => state.addToCart);

  const cartData = useCartProductsStore((state) => state.cartProducts);

  useEffect(() => {
    if (cartData?.length > 0) {
      // check if items in cart are available in the menuItems
      const cartItemIds = cartData.map((item) => item._id);
      if (cartItemIds.includes(menuItem._id)) {
        setMenuData((prev) => ({
          ...prev,
          inCartCount: cartData.filter((item) => item._id === menuItem._id)[0]?.inCartCount || 0,
        }));
      } else {
        setMenuData((prev) => ({
          ...prev,
          inCartCount: 0,
        }));
      }
    } else {
      setMenuData((prev) => ({
        ...prev,
        inCartCount: 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % menuItem.images.length);
    }, 3000); // Auto swipe every 3 seconds
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="max-w-md mx-auto h-screen menu-details">
      <Card className="rounded-2xl shadow-lg overflow-hidden">
        <Carousel className="w-full h-80">
          {menuItem.images.map((img, index) => (
            <CarouselItem key={index} active={index === currentImageIndex}>
              <img src={img} alt={`Image ${index + 1}`} className="w-full h-80 object-fill" />
            </CarouselItem>
          ))}
        </Carousel>
        <CardContent className="p-4 space-y-2 bg-[#000000] details">
          <AddToCart
            menuItem={menuItem}
            handleAddToCard={addToCart}
            inCartCount={menuData?.inCartCount}
            classes={"right-12"}
          />
          <h2 className="text-xl font-semibold">{menuItem.name}</h2>
          <p className="text-[#9898a4]">{menuItem.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">₹{menuItem.basePrice}</span>
            <button className="rounded-xl px-4 py-2 bg-green-600 hover:bg-green-700 text-white">
              Add to Cart
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
