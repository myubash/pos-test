import React from 'react';
import './FoodItem.css';


const FoodImage = React.memo(({ imageUrl, name }) => {
  return <img src={imageUrl} alt={name} className="food-image" />;
});

const FoodItem = ({ product, addDetail }) => {
  return (
    <div className="food-item"
      onClick={() =>
        addDetail(
          product.name,
          product.description,
          product.price,
          product._id,
          product.type,
          product.photos
        )
      }
    >
      <FoodImage imageUrl={product.photos} name={product.name} />
      <div className="food-details">
        <span className="food-name">{product.name}</span>
        <span className="food-price">Rp {product.price}</span>
      </div>
    </div>
  );
};

export default FoodItem;
