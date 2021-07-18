import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import StarRatings from 'react-star-ratings';
import Navbar from '../components/Navbar.jsx';
import Dialog from '../components/Dialog.jsx';
import QuantityDialog from '../components/QuantityDialog.jsx';
import { storeIndex } from '../Helpers';
import '../styles/home.css';

const Home = () => {
  const [store, setStore] = useState();
  const [quantity, setQuantity] = useState();
  const history = useHistory();
  const [dialog, setDialog] = useState();
  const [quantityDialog, setQuantityDialog] = useState();
  const [itemToQuantify, setItemToquantify] = useState();
  const storename = useParams(':storename');
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));
  useEffect(() => {
    storeIndex(storename.storename).then((data) => setStore(data));
  }, [storename]);

  const handleAdd = (itemId, itemName) => {
    if (user) {
      // Do something
      setQuantityDialog(true);
      setItemToquantify({ itemId: itemId, itemName: itemName });
    } else {
      setDialog(true);
    }
  };

  return (
    <div>
      {dialog && (
        <Dialog
          head="Attention..."
          headClass="bg-gradient white"
          body="You have to sign up first to be able to add items to your cart."
          btnName="Sign Up"
          btnClass="white bg-gradient"
          funcToDo={() => history.push(`/signup/`)}
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
              `Added item number ${itemToQuantify.itemId}, with quantity of ${quantity}.`
            );
            setQuantityDialog(false);
          }}
          cancel={() => setQuantityDialog(false)}
        />
      )}
      <Navbar />
      {store && (
        <div
          className="cover flex-col align-center justify-center"
          style={{
            backgroundImage: `url("${store.store.image_data}")`,
          }}>
          <div>
            <h1 className="headline">{store.store.storename}</h1>
          </div>
        </div>
      )}
      {store &&
        store.categories.map((category) => (
          <div key={category.id} className="cat-holder p-2 pt-4">
            <h3 className="p3">
              {category.name.toUpperCase()}
              {/* eslint-disable-next-line */}
              <Link
                to={`${storename.storename}/category/${category.id}`}
                className="show-all secondary">{`show all >>`}</Link>
            </h3>

            <div className="long-grid mt-3 p-1">
              {/* eslint-disable-next-line */}
              {store.items.map((item) => {
                if (item.category_id === category.id) {
                  return (
                    <div className="card p-2">
                      <Link to={`${storename.storename}/item/${item.id}`}>
                        <h3 className="text-center pt-2">{item.name}</h3>
                        <p className="text-center secondary">
                          {item.size} {item.unit}
                        </p>
                        <div className="item-img m-2">
                          <img
                            src={item.image_data}
                            alt={item.name}
                            className="full-img"
                          />
                        </div>
                      </Link>
                      <div className="item-info flex-col justify-center mt-3">
                        <div className="m-1 mb-0">
                          <StarRatings
                            rating={3}
                            starRatedColor="#00cc88"
                            changeRating={2}
                            starDimension="17px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name="rating"
                          />
                          <p>EGP {item.price}</p>
                        </div>
                        <button
                          onClick={() => handleAdd(item.id, item.name)}
                          className="btn bg-gradient-tertiary white">
                          Add
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
