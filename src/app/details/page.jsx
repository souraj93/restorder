"use client";

import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
// import PlusMinus from '@/components/ui/PlusMinus';
import { useCartProductsStore } from '@/store/CartProductStore';
import { AddToCart } from '@/components/ui/addToCart';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/backButton';
import { useUserStore } from '@/store/UserStore';

const menuItem = {
  _id: "1",
  name: 'Veg Spring Rolls',
  description: 'Crispy and delicious vegetable spring rolls served with a tangy dipping sauce.',
  ingredients: '2 cups mixed vegetables (carrot, cabbage, bell pepper)\n1 tsp soy sauce\n1 tsp ginger-garlic paste\n1/2 tsp black pepper\nSpring roll wrappers\nOil for frying',
  basePrice: 120,
  images: [
    'https://i.pinimg.com/736x/74/55/86/7455861056a201b44b68a5ef65e36583.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFXK5esIT1QUF4zgwz7QVYsz2FSOt5sZ-PZA&s',
    
  ],
  likedBy: 5
};

export default function MenuDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuData, setMenuData] = useState(menuItem);
  const [menuCount, updateMenuCount] = useState(1);
  // const [isLiked, likeMenu] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState([{
    label: 'Description',
    selected: true,
    color: 'bg-[#000000]',
    selectedColor: 'bg-primary'
  }, {
    label: 'Ingredients',
    selected: false,
    color: 'bg-[#000000]',
    selectedColor: 'bg-primary'
  }]);

  const addToCart = useCartProductsStore((state) => state.addToCart);
  const userData = useUserStore((state) => state.user);

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

  const manageCart = (item, count) => {
    updateMenuCount(prevCount => {
      if (count === 1) {
        return prevCount + 1;
      } else {
        return prevCount - 1;
      }
    });
  };


  return (
    <div className={`max-w-md mx-auto h-screen menu-details ${!userData?.dark ? 'bg-[#2f2e33] text-white' : 'bg-white text-black'} scrollbar-hide`}>
      <div className='flex justify-between'>
        <BackButton />
        {/* <button
        className="absolute top-4 right-4 z-20 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
        aria-label="Like"
        onClick={() => likeMenu(!isLiked)}
      >
        {isLiked ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-red-500">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>}
      </button> */}
      </div>
      <Card className={`rounded-2xl shadow-lg overflow-hidden ${!userData?.dark ? 'bg-[#2f2e33] text-white' : 'bg-white text-black'} h-screen relative`}>
        <Carousel className="w-full h-80" items={menuItem.images}>
          {/* {menuItem.images.map((img, index) => (
            <CarouselItem key={index} active={index === currentImageIndex}>
              <img src={img} alt={`Image ${index + 1}`} className="w-full h-80 object-fill" />
            </CarouselItem>
          ))} */}
        </Carousel>
        <AddToCart
            menuItem={menuItem}
            handleAddToCard={manageCart}
            inCartCount={menuCount}
            classes={`right-12 z-[100] top-[${menuCount ? '250' : '290'}px] p-1`}
            buttonClasses={`text-xl`}
          />
        <CardContent className={`p-4 space-y-2 ${!userData?.dark ? 'bg-[#2f2e33] text-white' : 'bg-white text-black'} details overflow-y-auto pb-[160px] scrollbar-hide`}>
          
          <h2 className="text-xl font-semibold">{menuItem.name}</h2>

          <div className='flex justify-between' style={{
            margin: "15px 0 25px"
          }}>
            <div>
              <span className={`text-xs rounded-full px-4 py-2 border ${!userData?.dark ? 'border-white' : 'border-black'} mr-2`}>Total Order: 50</span>
              <span className={`text-xs rounded-full px-4 py-2 border ${!userData?.dark ? 'border-white' : 'border-black'}`}>Veg</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
              </svg>
              <span className="text-yellow-400 font-semibold text-md">4.5</span>
            </div>
          </div>


          <div className={`flex justify-center space-x-2 border-t-1 ${!userData?.dark ? 'border-white' : ' border-black'} pt-4 pb-2`}>
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

          <p className={`border ${!userData?.dark ? 'text-white border-white' : 'text-black border-black'} text-sm overflow-y-auto rounded-lg py-2 px-4`} dangerouslySetInnerHTML={
            { __html: filters[0].selected ? menuItem.description : convertToHtml(menuItem.ingredients) }
          }></p>
        </CardContent>
        <div className={`fixed bottom-0 left-0 w-full p-4 ${!userData?.dark ? 'bg-[#2f2e33] text-white border-white' : 'bg-white text-black border-black'} border-t-1`} style={{
          zIndex: 99
        }}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">₹{menuItem.basePrice}</span>
            {menuCount ? <button className="rounded-xl px-6 py-3 bg-primary text-white" onClick={() => {
              if (menuData.inCartCount !== menuCount) {
                addToCart(menuItem, menuCount);
              }
              router.push('/menu');
            }
            }>
              Add Item {menuCount ? `| ₹${menuItem.basePrice * menuCount}` : ""}
            </button> : null}
          </div>
        </div>
      </Card>

    </div>
  );
}
