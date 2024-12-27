import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from '../Modal/ProductModal';
import ProductImage from '../components/ProductImage';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3003/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-100 grid grid-rows-1 rounded-lg overflow-hidden shadow-md">
            <ProductImage imageName={product.photos[0]} onClick={() => handleOpenModal(product)}/>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <button onClick={() => handleOpenModal(product)} className="inline-block bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition">
                  See Details
                </button>
                <span className="font-bold">₱ {parseFloat(product.price).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (<ProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />)}

    </div>
  );
};

export default Product;
