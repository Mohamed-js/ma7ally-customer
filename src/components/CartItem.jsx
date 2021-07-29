import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CartItem = () => {
  return (
    <div className="cart-item p-2 m-2">
      <div className="cart-item-img">
        <img
          src="https://res.cloudinary.com/atefcloud/image/upload/v1/agz5anty/d1c5101138364a5f1910b859a02231e5.webp"
          alt="Product"
          className="full-img"
        />
      </div>
      <div className="cart-item-info flex-col justify-between">
        <h4 className="name">Sparkle for dry hair</h4>
        <p className="price">
          Unit price: <span className="secondary">24$</span>
        </p>
        <p className="quantity">
          Units: <span className="secondary">3</span>
        </p>
        <p className="availability ">
          <span className="tertiary">
            <FontAwesomeIcon icon={faCheckCircle} />
          </span>{' '}
          Available for delivery.
        </p>
      </div>
    </div>
  );
};

export default CartItem;
