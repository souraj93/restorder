"use client";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { useCartProductsStore } from "@/store/CartProductStore";
import Image from "next/image";
import PlusMinus from "@/components/ui/PlusMinus";

export default function CartProduct({ product, onRemove, hideAddToCart }) {
  const addToCart = useCartProductsStore((state) => state.addToCart);


  const handleAddToCard = async (menu, count) => {
    addToCart(menu, count);
  };

  return (
    <div className=" py-1 px-2 bg-[#2f2e33] rounded-lg mb-2">
      <div className="flex justify-between items-center gap-4">
        <div className="w-20">
          <Image width={240} height={240} src={product.image} alt={""} className="rounded-lg" />
        </div>
        <div className="grow">

          <div className={`${!hideAddToCart ? 'flex justify-between items-center' : ''} gap-4`}>
            <div>
              <h3 className="text-xs">{product.name}</h3>

              <div className="flex justify-between items-center">
                <div className="text-xs text-white font-semibold mt-1">
                  ₹{(product.basePrice * product.inCartCount).toFixed(2)}
                </div>
                {hideAddToCart ? 
                <div className="text-xs text-gray-500 mt-1">
                  Quantity: {product.inCartCount}
                </div>
                : null}
              </div>
            </div>
            {!hideAddToCart ?
            <PlusMinus
              menuItem={product}
              handleAddToCard={handleAddToCard}
              inCartCount={product.inCartCount}
              isVertical={true}
              classes={'relative top-0 p-1'}
              buttonClasses={'text-sm '}
            /> : null}
            {/* {!!onRemove && (
            <div>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => onRemove()} />
              </span>
            </div>
          )} */}
          </div>


        </div>
      </div>
    </div>
  );
}
