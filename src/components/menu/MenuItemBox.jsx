import React from "react";
import Image from "next/image";
import PlusMinus from "@/components/ui/PlusMinus";
// import FlyingButton from "react-flying-item";
export default function MenuItemBox({ menuItem, handleAddToCard }) {
  const { name, description, image, basePrice, inCartCount } = menuItem;
  return (
    <div className="mx-auto h-36  w-full rounded-lg flex flex-col bg-white shadow-[0_0px_5px_rgba(0,0,0,0.25)] hover:shadow-black/25 transition-all relative" 
    // style={{
    //   backgroundImage: `url(${image})`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    //   backdropFilter: 'blur(5px)',
    //   WebkitBackdropFilter: 'blur(5px)',
    //   borderRadius: '0.5rem'
    // }}
    >
      <div className="h-full w-full relative">
        <Image src={image} layout={"fill"} alt={""} className="rounded-lg" />
      </div>

      <div className="absolute left-0 bottom-0 bg-black/50 rounded-lg p-1 w-full">
      {/* <h4 className="font-semibold mb-1 text-xs">{name}</h4> */}
      {/* <p className="text-gray-500 text-sm line-clamp-3 mb-2">{description}</p> */}
      {/* <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}> */}
      {inCartCount > 0 ?
      <div className="flex justify-between items-center relative">
        <div>
          <h4 className="font-semibold text-xs"
          style={{
            paddingRight: '30px'
          }}
          >{name}</h4>
          <span className="font-semibold text-xs">
            Rs {basePrice.toFixed(2)}
          </span>
        </div>
          <div className="">
            <PlusMinus
              menuItem={menuItem}
              handleAddToCard={handleAddToCard}
              inCartCount={inCartCount}
              isVertical={true}
            />
          </div>
        </div>
        :
        <div className="flex justify-between items-center relative">
          <div>
          <h4 className="font-semibold text-xs"
          style={{
            paddingRight: '30px'
          }}
          >{name}</h4>
          <span className="text-xs">
            Rs {basePrice.toFixed(2)}
          </span>
          </div>
          <button
            onClick={() => handleAddToCard(menuItem, 1)}
            className="bg-red-500 text-white text-sm rounded-full absolute right-1 -top-4"
            style={{
              padding: "0 6px"
            }}
          >
            +
          </button>

        </div>
      }
      </div>
      {/* </FlyingButton> */}
    </div>
  );
}