import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import ProductModal from '../Modal/ProductModal';
import { useCart } from '../Context/CartContext';
import ProductImage from '../components/ProductImage';

const Category = ({ category, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const handlePlaceOrder = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {category === 'men' && "Men's Shoes"}
          {category === 'women' && "Women's Shoes"}
          {category === 'kids' && "Kid's Shoes"}
        </h2>

        <div className='flex justify-end items-center py-10'>
          <input type="text" size={30} className='p-1 border-2 border-orange-400 outline-none'/>
          <button className='flex items-center p-1 bg-orange-400 text-white border-2 border-orange-400'>
            <IoMdSearch /> 
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <ProductImage
                  imageName={product.photos[0]}
                  onClick={() => handlePlaceOrder(product)} // Pass product to handlePlaceOrder
                />
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className='flex justify-between items-center'>
                    <button onClick={() => handlePlaceOrder(product)} className="inline-block bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition">
                      See Details
                    </button>
                    <span className="font-bold">₱ {parseFloat(product.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {selectedProduct && <ProductModal isOpen={!!selectedProduct} onClose={handleCloseModal} product={selectedProduct} />}
      </div>
    </section>
  );
};

export default Category;
