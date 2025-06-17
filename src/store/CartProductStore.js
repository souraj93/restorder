// cartProducts.store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export function calctPrice(cartProduct, selectedSize, selectedExtras) {
  let price = cartProduct.basePrice;
  if (selectedSize) {
    price += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      price += extra.price;
    }
  }
  return price;
}

export const useCartProductsStore = create(
  persist(
    (set, get) => ({
      cartProducts: [],
      addToCart: (product, isInc) =>
        set((state) => {
          console.log("Adding to cart:", product, "Increment:", isInc);
          if (isInc === 1) {
            // Check if the product already exists in the cart
            const existingProductIndex = state.cartProducts.findIndex(
              (p) =>
                p._id === product._id
            );

            if (existingProductIndex !== -1) {
              // If it exists, increment the quantity
              const updatedCartProducts = [...state.cartProducts];
              updatedCartProducts[existingProductIndex].inCartCount += 1;
              return { cartProducts: updatedCartProducts };
            }
            // If it doesn't exist, add a new product to the cart
            return {
              cartProducts: [
                ...state.cartProducts,
                {
                  ...product,
                  // size: selectedSize,
                  // extras: selectedExtras,
                  inCartCount: 1,
                  product_price: calctPrice(product),
                },
              ],
            };
          } else if (isInc === -1) {
            // Decrement the quantity
            const existingProductIndex = state.cartProducts.findIndex(
              (p) =>
                p._id === product._id
            );

            if (existingProductIndex !== -1) {
              const updatedCartProducts = [...state.cartProducts];
              const existingProduct = updatedCartProducts[existingProductIndex];

              if (existingProduct.inCartCount > 1) {
                existingProduct.inCartCount -= 1;
              } else {
                // If quantity is 1, remove the product from the cart
                updatedCartProducts.splice(existingProductIndex, 1);
              }
              return { cartProducts: updatedCartProducts };
            }
          }
        }),

      clearCart: () => set({ cartProducts: [] }),
      deletedFromCart: (indexToRemove) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (product, index) => index !== indexToRemove
          ),
        })),
    }),

    {
      name: "cartProduct-storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
