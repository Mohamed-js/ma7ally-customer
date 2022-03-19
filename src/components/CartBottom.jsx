import React from 'react';
import { Link } from 'react-router-dom';
const CartBottom = ({ itemsCount, subTotal }) => {
  let unit = 'items';
  if (unit === 1) {
    unit = 'item';
  }
  return (
    <div className="m-auto max-width">
      <div className="cart-bottom-fader w-100 max-width"></div>
      <div className="cart-bottom p-3 pt-1 flex-col align-center justify-between fixed-bottom bg-white w-100 max-width">
        <p className="items-count">
          You have {itemsCount} {unit} in your cart.
        </p>
        <p className="total-payment mt-1">Subtotal {subTotal}$</p>
        <Link
          to="checkout"
          className="btn bg-gradient-tertiary p-2 m-2 w-100 max-width text-center white">
          CHECKOUT
        </Link>
      </div>
    </div>
  );
};

export default CartBottom;
