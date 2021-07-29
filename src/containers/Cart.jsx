import React, { useEffect, useState } from 'react';
import { cartItems } from '../Helpers';
import Navbar from '../components/Navbar';
import Dialog from '../components/Dialog.jsx';
import CartItem from '../components/CartItem.jsx';
import '../styles/cart.css';

const Cart = () => {
  const [carts, setCarts] = useState();
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));

  useEffect(() => {
    cartItems(user).then((data) => setCarts(data));
  }, [user]);

  return (
    <div>
      {console.log(carts)}
      <Navbar />
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-center pt-5 pb-5">Your Cart Items</h1>
        <div className="cart-items">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
    </div>
  );
};

export default Cart;
