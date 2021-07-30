import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Navbar from '../components/Navbar.jsx';
import Dialog from '../components/Dialog.jsx';
import QuantityDialog from '../components/QuantityDialog.jsx';
import { storeIndex, AddItemToCart } from '../Helpers';
import '../styles/home.css';
import HomeCard from '../components/HomeCard.jsx';

const Home = () => {
  const [store, setStore] = useState();
  const [quantity, setQuantity] = useState(1);
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
            AddItemToCart(itemToQuantify.itemId, quantity, user)
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
                    <HomeCard
                      item={item}
                      storename={storename}
                      handleAdd={handleAdd}
                    />
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
