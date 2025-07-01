"use client";
import React from 'react';
import PlusMinus from './PlusMinus';

export function AddToCart(props) {
  const { inCartCount, menuItem, handleAddToCard, classes, buttonClasses } = props;
  return <>
    {inCartCount > 0 ?
        <PlusMinus
          menuItem={menuItem}
          handleAddToCard={handleAddToCard}
          inCartCount={inCartCount}
          isVertical={true}
          classes={classes}
          buttonClasses={buttonClasses}
        /> :
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCard(menuItem, 1)
        }}
        className={`bg-primary text-white text-md rounded-full absolute right-1 -top-4 ${classes} ${buttonClasses}`}
        style={{
          padding: `0 ${buttonClasses ? '8px' : '7px'}`,
          top: classes && classes.includes('top-[290px]') ? '290px' : ''
        }}
      >
        +
      </button>}
  </>
}