import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const HomeCard = ({ item, storename, handleAdd }) => {
  return (
    <div key={item.id} className="card p-2">
      <Link to={`${storename.storename}/item/${item.id}`}>
        <h3 className="text-center pt-2">{item.name}</h3>
        <p className="text-center secondary">
          {item.size} {item.unit}
        </p>
        <div className="item-img m-2">
          <img src={item.image_data} alt={item.name} className="full-img" />
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
};

export default HomeCard;
