import React, { useEffect, useState } from 'react';
import '../styles/item.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Slide } from 'react-slideshow-image';
import StarRatings from 'react-star-ratings';
import 'react-slideshow-image/dist/styles.css';
import { storeItem, AddItemToCart } from '../Helpers';
import Navbar from '../components/Navbar';
import Dialog from '../components/Dialog.jsx';
import QuantityDialog from '../components/QuantityDialog.jsx';

const Item = () => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [dialog, setDialog] = useState();
  const [quantityDialog, setQuantityDialog] = useState();
  const [itemToQuantify, setItemToquantify] = useState();
  const [item, setItem] = useState();
  const itemId = useParams();
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));

  const handleAdd = (itemId, itemName) => {
    if (user) {
      // Do something
      setQuantityDialog(true);
      setItemToquantify({ itemId: itemId, itemName: itemName });
    } else {
      setDialog(true);
    }
  };

  useEffect(() => {
    storeItem(itemId.storename, itemId.id).then((data) => setItem(data));
  }, [itemId.id, itemId.storename]);

  return (
    <div>
      {dialog && (
        <Dialog
          head="Attention..."
          headClass="bg-gradient white"
          body="You have to sign up first to be able to add items to your cart."
          btnName="Sign Up"
          btnClass="white bg-gradient"
          funcToDo={() => history.push(`/${itemId.storename}/signup/`)}
          cancel={() => setDialog(false)}
        />
      )}
      {quantityDialog && (
        <QuantityDialog
          head={itemToQuantify.itemName}
          headClass="bg-gradient white"
          btnClass="white bg-gradient-tertiary"
          btnName="ADD TO CART"
          setQuantity={setQuantity}
          funcToDo={() => {
            console.log(
              `Added item number ${itemToQuantify.itemId}, with quantity of ${quantity} ${user}.`
            );
            AddItemToCart(
              itemToQuantify.itemId,
              quantity,
              user,
              itemId.storename
            ).then((res) => console.log(res));
            setQuantity(1);
            setQuantityDialog(false);
          }}
          cancel={() => {
            setQuantityDialog(false);
            setQuantity(1);
          }}
        />
      )}
      <Navbar />
      <div className="container">
        {item && (
          <div className="item-holder m-auto pt-5">
            <div className="max-height slide-cont">
              <Slide>
                <div className="each-slide mt-5 max-height">
                  <div className="mt-5 max-height">
                    <img
                      className="full-img max-height"
                      src={item.image_data}
                      alt={item.name}
                    />
                  </div>
                </div>
              </Slide>
            </div>
            <div className="p-1 flex-col justify-content-center">
              <h2 className="p-1">{item.name}</h2>
              <hr className="hr-short" />

              <h3 className="p-1 pt-4">${item.price}</h3>
              <div className="p-1">
                <StarRatings
                  rating={3}
                  starRatedColor="#00cc88"
                  changeRating={2}
                  starDimension="17px"
                  starSpacing="2px"
                  numberOfStars={5}
                  name="rating"
                />
                <span className="reviews">8 Reviews</span>
              </div>
              <p className="p-1">{item.description}</p>
              <div className="m-1">
                <button
                  onClick={() => handleAdd(item.id, item.name)}
                  className="btn btn-block p-2 bg-gradient-secondary white">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
