import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { cartItems, addOrder } from '../Helpers';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem.jsx';
import '../styles/checkout.css';

const Checkout = () => {
  const [carts, setCarts] = useState();
  const history = useHistory();
  const params = useParams(':storename');
  const [orderInfo, SetOrderInfo] = useState({ storename: params.storename });
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));

  const handleChange = (e) => {
    SetOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(user, orderInfo).then((res) => {
      if (res.message === 'Order placed successfully!') {
        history.push(`/${params.storename}`);
      }
    });
  };

  useEffect(() => {
    cartItems(user, params.storename).then((data) => {
      if (!data.length) {
        history.goBack();
      }
      setCarts(data);
    });
  }, [user, history]);
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="p-2">
        <h1 className="text-center">Checkout</h1>
      </div>
      <div className="p-2">
        <form onSubmit={handleSubmit} className="max-width m-auto">
          <div className="devider">
            <div className="shipping-address p-2  mb-2 o-summary">
              <h3 className="text-center mb-2">Order Summary</h3>
              <div className="cart-items">
                {carts &&
                  carts[0] &&
                  carts.map((cart) => {
                    return (
                      <CartItem
                        orderpage={true}
                        key={cart.item.id}
                        itemId={cart.item.id}
                        image={cart.item.image_data}
                        itemName={cart.item.name}
                        price={cart.item.price}
                        quantity={cart.quantity}
                      />
                    );
                  })}
              </div>
            </div>
            <div>
              {/* Shipping Address */}
              <div className="shipping-address p-2">
                <h3 className="text-center mb-2">Shipping Address</h3>
                <textarea
                  onChange={handleChange}
                  name="address"
                  className="form-input"
                  cols="30"
                  rows="7"
                  placeholder="Address"
                  required
                />
                <input
                  onChange={handleChange}
                  className="form-input"
                  name="city"
                  type="text"
                  placeholder="City"
                  required
                />
                <input
                  onChange={handleChange}
                  className="form-input p-4"
                  name="country"
                  type="text"
                  placeholder="Country"
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="shipping-address p-2 mt-2">
                <h3 className="text-center mb-2">Contact Info</h3>
                <input
                  onChange={handleChange}
                  className="form-input"
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  required
                />
                <input
                  onChange={handleChange}
                  className="form-input p-4"
                  name="phone2"
                  type="text"
                  placeholder="Phone Number - (Optional)"
                />
              </div>

              {/* Payment Method */}
              <div className="shipping-address p-2 mt-2 mb-2">
                <h3 className="text-center mb-2">Payment Method</h3>
                <div className="">
                  <span htmlFor="payment-method m-2">Cash on delivery</span>
                  <input
                    onChange={handleChange}
                    className="m-2"
                    type="radio"
                    name="payment_method"
                    id="payment_method"
                    value="Cash on delivery"
                    required
                  />
                </div>
              </div>
              <div className="p-2 mt-2 mb-2">
                <div className="place-order">
                  <p className="total m-1 mt-5">
                    Total Payment:{' '}
                    <span className="tertiary">
                      {carts &&
                        carts.reduce((accumulator, cart) => {
                          accumulator =
                            accumulator + cart.item.price * cart.quantity;
                          return accumulator;
                        }, 0)}
                      $
                    </span>
                  </p>
                  <button
                    type="submit"
                    className="btn white bg-gradient-tertiary w-100 p-3">
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
