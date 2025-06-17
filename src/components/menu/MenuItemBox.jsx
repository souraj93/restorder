import React from "react";
import Image from "next/image";
// import FlyingButton from "react-flying-item";
export default function MenuItemBox({ menuItem, handleAddToCard }) {
  const { name, description, image, basePrice, inCartCount } = menuItem;
  return (
    <div className="bg-gray-300 mx-auto  w-72 p-4 rounded-lg text-center flex flex-col justify-between items-center cursor-pointer hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="h-52 w-48 relative">
        <Image src={image} layout={"fill"} objectFit={"contain"} alt={""} />
      </div>

      <h4 className="font-semibold my-2 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      {/* <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}> */}
      {inCartCount > 0 ?
        <div className="flex items-center justify-center gap-4">
          <button
            className="bg-gray-200 text-xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300"
            onClick={() => {
              // Remove one item from cart
              handleAddToCard(menuItem, -1);
            }}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="text-lg font-bold w-8 text-center">{inCartCount}</span>
          <button
            className="bg-gray-200 text-xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300"
            onClick={() => {
              // Add one more item to cart
              handleAddToCard(menuItem, 1);
            }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        :
        <button
          onClick={() => handleAddToCard(menuItem, 1)}
          className="bg-primary text-white rounded-full px-6 py-2 mt-1"
        >
          Add to cart {basePrice} $
        </button>}
      {/* </FlyingButton> */}
    </div>
  );
}