import React, { useEffect, useState } from 'react';
import { cartItems } from '../Helpers';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem.jsx';
import CartBottom from '../components/CartBottom.jsx';
import '../styles/cart.css';
import { useParams } from 'react-router-dom';
const Cart = () => {
  const [carts, setCarts] = useState();
  const [change, setChange] = useState(0);
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));
  const params = useParams(':storename');
  useEffect(() => {
    cartItems(user, params.storename).then((data) => {
      setCarts(data);
    });
  }, [user, change]);

  const handleChange = () => {
    setChange(change + 1);
  };

  return (
    <div>
      <Navbar />
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {(carts && carts[0] && (
          <h1 className="text-center pt-5 pb-5">Your Cart Items</h1>
        )) || <h1 className="text-center pt-5 pb-5">Your Cart Is Empty!</h1>}

        <div className="cart-items">
          {carts &&
            carts[0] &&
            carts.map((cart) => {
              return (
                <CartItem
                  key={cart.item.id}
                  deleted={handleChange}
                  itemId={cart.item.id}
                  image={cart.item.image_data}
                  itemName={cart.item.name}
                  price={cart.item.price}
                  quantity={cart.quantity}
                  availability={cart.item.quantity}
                />
              );
            })}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {carts && carts[0] && (
          <CartBottom
            itemsCount={carts.reduce((accumulator, cart) => {
              accumulator = accumulator + cart.quantity;
              return accumulator;
            }, 0)}
            subTotal={carts.reduce((accumulator, cart) => {
              accumulator = accumulator + cart.item.price * cart.quantity;
              return accumulator;
            }, 0)}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
