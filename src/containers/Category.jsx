import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import StarRatings from 'react-star-ratings';
import '../styles/category.css';
import { storeCategories, AddItemToCart } from '../Helpers';
import Navbar from '../components/Navbar';
import Dialog from '../components/Dialog.jsx';
import QuantityDialog from '../components/QuantityDialog.jsx';

const Category = () => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [dialog, setDialog] = useState();
  const [quantityDialog, setQuantityDialog] = useState();
  const [itemToQuantify, setItemToquantify] = useState();
  const [catItems, setCatItems] = useState();
  const param = useParams();
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
    storeCategories(param.storename, param.id).then((data) =>
      setCatItems(data)
    );
  }, [param.id, param.storename]);

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
              `Added item number ${itemToQuantify.itemId}, with quantity of ${quantity} ${user}.`
            );
            AddItemToCart(itemToQuantify.itemId, quantity, user).then((res) =>
              console.log(res)
            );
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
      <div>
        {catItems && (
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            {catItems[0] && (
              <h1 className="text-center mt-4">
                {catItems[0].category.name.toUpperCase()}
              </h1>
            )}

            <div className="grid mt-5 p-1">
              {catItems.map((item) => (
                <div key={item.id} className="s-card p-2">
                  <Link to={`/${param.storename}/item/${item.id}`}>
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
                        starSpacing="1px"
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
