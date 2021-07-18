import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import '../styles/category.css';
import { storeCategories } from '../Helpers';
const Category = () => {
  const [catItems, setCatItems] = useState();
  const param = useParams();

  useEffect(() => {
    storeCategories(param.storename, param.id).then((data) =>
      setCatItems(data)
    );
  }, [param.id, param.storename]);

  return (
    <div>
      {/* console.log(catItems) && */}
      {catItems && (
        <div>
          {catItems[0] && (
            <h1 className="text-center mt-4">
              {catItems[0].category.name.toUpperCase()}
            </h1>
          )}

          <div className="grid mt-5 p-1">
            {catItems.map((item) => (
              <div className="s-card p-2">
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
                  <button className="btn bg-gradient-tertiary white">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
