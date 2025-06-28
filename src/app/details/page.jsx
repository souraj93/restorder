"use client";

import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
// import PlusMinus from '@/components/ui/PlusMinus';
import { useCartProductsStore } from '@/store/CartProductStore';
import { AddToCart } from '@/components/ui/addToCart';
import { useRouter } from 'next/navigation';

const menuItem = {
  _id: "1",
  name: 'Bhapa Bhetki Thali',
  description: 'Plain rice served with Bhapa Bhetki, a traditional Bengali fish dish.',
  ingredients: '2 tbsp butter \n 1 tbsp oil\n 1 bay leaf\n 1–2 green cardamoms\n 1 inch cinnamon stick\n 4 medium tomatoes, chopped\n 1–2 green chilies \n 10–12 cashew nuts\n 1 tsp ginger-garlic paste\n 2 tbsp butter \n 1 tbsp oil\n 1 bay leaf\n 1–2 green cardamoms\n 1 inch cinnamon stick\n 4 medium tomatoes, chopped\n 1–2 green chilies \n 10–12 cashew nuts\n 1 tsp ginger-garlic paste',
  basePrice: 499,
  images: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4WgHKAVcjSG9IXDRbB5prngjkm8IH9dwcA&s',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kolkata_mutton_biryani.jpg/1200px-Kolkata_mutton_biryani.jpg'
  ]
};

export default function MenuDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuData, setMenuData] = useState(menuItem);
  const [menuCount,updateMenuCount] = useState(1);
  const router = useRouter();

  const [filters, setFilters] = useState([{
    label: 'Description',
    selected: true,
    color: 'bg-[#000000]',
    selectedColor: 'bg-red-500'
  }, {
    label: 'Ingredients',
    selected: false,
    color: 'bg-[#000000]',
    selectedColor: 'bg-red-500'
  }]);

  const addToCart = useCartProductsStore((state) => state.addToCart);

  const cartData = useCartProductsStore((state) => state.cartProducts);

  useEffect(() => {
    if (cartData?.length > 0) {
      // check if items in cart are available in the menuItems
      const cartItemIds = cartData.map((item) => item._id);
      if (cartItemIds.includes(menuItem._id)) {
        setMenuData(cartData.filter((item) => item._id === menuItem._id)[0]);
        updateMenuCount(cartData.filter((item) => item._id === menuItem._id)[0]?.inCartCount || 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % menuItem.images.length);
    }, 3000); // Auto swipe every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const updateFilter = (index) => {
    const localFilters = [...filters];
    localFilters.forEach((each, ind) => {
      if (index === ind) {
        each.selected = true;
      } else {
        each.selected = false;
      }
    });
    setFilters([...localFilters]);
  };

  const convertToHtml = (text) => {
    return text.replaceAll('\n', '<br />');
  };

  const manageCart = (item, count) =>{
    updateMenuCount(prevCount => {
      if (count === 1) {
        return prevCount + 1;
      } else {
        return prevCount - 1;
      }
    });
  };


  return (
    <div className="max-w-md mx-auto h-screen menu-details bg-[#47465c]">
      <Card className="rounded-2xl shadow-lg overflow-hidden bg-[#47465c] h-screen">
        <Carousel className="w-full h-80">
          {menuItem.images.map((img, index) => (
            <CarouselItem key={index} active={index === currentImageIndex}>
              <img src={img} alt={`Image ${index + 1}`} className="w-full h-80 object-fill" />
            </CarouselItem>
          ))}
        </Carousel>
        <CardContent className="p-4 space-y-2 bg-[#47465c] details">
          <AddToCart
            menuItem={menuItem}
            handleAddToCard={manageCart}
            inCartCount={menuCount}
            classes={"right-12"}
            buttonClasses={`text-xl`}
          />
          <h2 className="text-xl font-semibold">{menuItem.name}</h2>

          <div className='flex justify-between' style={{
              margin: "15px 0 25px"
            }}>
            <div>
              <span className="text-xs rounded-full px-4 py-2 border mr-2">Total Order: 50</span>
              <span className="text-xs rounded-full px-4 py-2 border">Veg</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
              </svg>
              <span className="text-yellow-400 font-semibold text-md">4.5</span>
            </div>
          </div>
          

          <div className="flex justify-center space-x-2 border-t-1 pt-4">
            {filters.map((filter, index) => (
              <button
                key={filter.label}
                className={`px-4 py-2 rounded-full ${filter.selected ? filter.selectedColor : filter.color} text-sm w-max text-white`}
                onClick={() => {
                  updateFilter(index)
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <p className="text-[#9898a4] text-lg overflow-y-auto border rounded-lg py-2 px-4" style={{
            marginTop: "20px",
            maxHeight: "160px"
          }} dangerouslySetInnerHTML={
            { __html: filters[0].selected ? menuItem.description : convertToHtml(menuItem.ingredients) }
          }></p>
          <div className='fixed bottom-0 left-0 w-full p-4 bg-[#47465c] border-t-1'>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">₹{menuItem.basePrice}</span>
              {menuCount ? <button className="rounded-xl px-6 py-3 bg-red-500 text-white" onClick={()=> {
                if (menuData.inCartCount !== menuCount) {
                  addToCart(menuItem,menuCount);
                }
                router.push('/menu');
              }
                }>
                Add Item {menuCount ? `| ₹${menuItem.basePrice*menuCount}` : ""}
              </button> : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
