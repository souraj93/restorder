import React from "react";
import Image from "next/image";
import PlusMinus from "@/components/ui/PlusMinus";
// import FlyingButton from "react-flying-item";
export default function MenuItemBox({ menuItem, handleAddToCard }) {
  const { name, description, image, basePrice, inCartCount } = menuItem;
  return (
    <div className="mx-auto  w-full p-4 rounded-lg flex flex-col bg-white shadow-[0_0px_5px_rgba(0,0,0,0.25)] hover:shadow-black/25 transition-all">
      <div className="h-36 w-full relative">
        <Image src={image} layout={"fill"} alt={""} className="rounded-lg" />
      </div>

      <h4 className="font-semibold my-2 text-sm">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      {/* <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}> */}
      {inCartCount > 0 ?
      <div className="flex justify-between items-center">
          <span className="font-semibold text-xs">
            Rs {basePrice.toFixed(2)}
          </span>
          <div className="">
            <PlusMinus
              menuItem={menuItem}
              handleAddToCard={handleAddToCard}
              inCartCount={inCartCount}
            />
          </div>
        </div>
        :
        <div className="flex justify-between items-center">
          <span className="font-semibold text-xs">
            Rs {basePrice.toFixed(2)}
          </span>
          <button
            onClick={() => handleAddToCard(menuItem, 1)}
            className="bg-primary text-white text-xs rounded-full px-4 py-2 mt-1 cursor-pointer"
          >
            Add
          </button>

        </div>
      }
      {/* </FlyingButton> */}
    </div>
  );
}