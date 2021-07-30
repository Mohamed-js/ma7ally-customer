import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { delCartItem } from '../Helpers';

const CartItem = ({
  deleted,
  itemId,
  itemName,
  price,
  quantity,
  availability,
  image,
}) => {
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));
  const handleClick = (id) => {
    delCartItem(user, id);
    deleted();
  };

  return (
    <div className="cart-item p-2 m-2">
      <div className="cart-item-img flex-col justify-center">
        <img src={image} alt={itemName} className="full-img" />
      </div>
      <div className="cart-item-info m-1 flex-col justify-between">
        <button
          onClick={() => {
            handleClick(itemId);
          }}
          className="remove-item m-1 btn p-1">
          X
        </button>
        <h4 className="name">{itemName}</h4>
        <p className="price">
          Unit price: <span className="secondary">{price}$</span>
        </p>
        <p className="quantity">
          Units: <span className="secondary">{quantity}</span>
        </p>
        {availability > 0 && (
          <p className="availability ">
            <span className="tertiary">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>{' '}
            Available for delivery.
          </p>
        )}
        {availability === 0 && (
          <p className="availability ">
            <span className="danger">
              <FontAwesomeIcon icon={faExclamationCircle} />
            </span>{' '}
            Maybe not available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
