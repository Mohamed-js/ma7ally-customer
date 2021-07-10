import React, { useEffect, useState } from 'react';
import '../styles/item.css';
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import StarRatings from 'react-star-ratings';
import 'react-slideshow-image/dist/styles.css';
import { storeItem } from '../Helpers';

const Item = () => {
  const [item, setItem] = useState();
  const itemId = useParams();

  useEffect(() => {
    storeItem(itemId.storename, itemId.id).then((data) => setItem(data));
  }, []);

  return (
    <div className="container flex-col">
      {item && (
        <div>
          <h1 className="text-center pt-5 pb-5">{item.name}</h1>
          <Slide>
            <div className="each-slide">
              <div>
                <img
                  className="full-img"
                  src={item.image_data}
                  alt={item.name}
                />
              </div>
            </div>
          </Slide>
          <div className="p-1">
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
              <button className="btn btn-block p-2 bg-gradient-secondary white">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
