"use client";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { useCartProductsStore } from "@/store/CartProductStore";
import Image from "next/image";
import PlusMinus from "@/components/ui/PlusMinus";

export default function CartProduct({ product, onRemove }) {
  console.log("CartProduct", product);
  const addToCart = useCartProductsStore((state) => state.addToCart);


  const handleAddToCard = async (menu, count) => {
    addToCart(menu, count);
  };

  return (
    <div className="border-b py-4 px-2 hover:bg-green-50 duration-150 ease-in-out">
      <div className="flex justify-between gap-4">
        <div className="w-24">
          <Image width={240} height={240} src={product.image} alt={""} />
        </div>
        <div className="grow">
          <h3 className="font-semibold">{product.name}</h3>
          <div className="flex justify-between gap-4 mt-2">
            <div className="text-sm font-semibold text-green-900 mt-2">
              Rs {(product.product_price * product.inCartCount).toFixed(2)}
            </div>
            <PlusMinus
              menuItem={product}
              handleAddToCard={handleAddToCard}
              inCartCount={product.inCartCount}
            />
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
