import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { storeIndex } from '../Helpers';
import '../styles/home.css';

const Home = () => {
  const [store, setStore] = useState();
  const storename = useParams(':storename');

  useEffect(() => {
    storeIndex(storename.storename).then((data) => setStore(data));
  }, [storename]);

  return (
    <div>
      {/* {store && console.log(store) && ( */}
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
            <h3 className="p3">{category.name.toUpperCase()}</h3>
            <div className="long-grid mt-3 p-1">
              {/* eslint-disable-next-line */}
              {store.items.map((item) => {
                if (item.category_id === category.id) {
                  return (
                    <div className="card p-2">
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
                        <button className="btn bg-gradient-tertiary white">
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
