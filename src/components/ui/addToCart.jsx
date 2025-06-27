"use client";
import React from 'react';
import PlusMinus from './PlusMinus';

export function AddToCart(props) {
  const { inCartCount, menuItem, handleAddToCard, classes } = props;
  return <>
    {inCartCount > 0 ?
      <div className="">
        <PlusMinus
          menuItem={menuItem}
          handleAddToCard={handleAddToCard}
          inCartCount={inCartCount}
          isVertical={true}
          classes={classes}
        />
      </div> :
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCard(menuItem, 1)
        }}
        className={`bg-red-500 text-white text-md rounded-full absolute right-1 -top-4 ${classes}`}
        style={{
          padding: "0 7px"
        }}
      >
        +
      </button>}
  </>
}