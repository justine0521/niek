import React from 'react';

const ProductImage = ({ imageName, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="product-image" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <img
        src={`http://localhost:3004/uploads/${imageName}`}
        alt="Product"
        className="w-full h-52 object-cover cursor-pointer transform hover:scale-110 transition-transform"
      />
    </div>
  );
};

export default ProductImage;
