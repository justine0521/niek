import React, { useState, useEffect } from 'react';
import axios from '../Services/axiosInstance'; 
import { IoClose } from 'react-icons/io5';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import ProductImage from '../components/ProductImage';

const ProductModal = ({ onClose, isOpen, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [sizeError, setSizeError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOrderPlaced(false);
      setQuantity(1);
      setSelectedSize('');
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      if (!selectedSize) {
        setSizeError('Please select a size');
        return;
      } else {
        setSizeError('');
      }

      const orderData = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        image: product.photos && product.photos.length > 0 ? product.photos[0] : '',
      };

      const response = await axios.post('/cart', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setOrderPlaced(true);
        addToCart(product);
        navigate('/cart');
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product.photos ? product.photos.length : 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product.photos ? product.photos.length : 1)) % (product.photos ? product.photos.length : 1));
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center -mt-14">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-5 mt-20 overflow-hidden">
        <div className="flex justify-end pt-3 px-3">
          <button onClick={onClose} className="text-gray-500 text-3xl"><IoClose /></button>
        </div>

        <div className="flex flex-col md:flex-row items-center mx-3 md:gap-10">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative">
              <ProductImage imageName={product.photos && product.photos.length > 0 ? product.photos[currentImageIndex] : ''} />
              
              {product.photos && product.photos.length > 1 && (
                <div className="flex justify-center items-center my-3">
                  <button onClick={handlePrevImage} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full focus:outline-none">
                    <GrFormPrevious />
                  </button>
                  <button onClick={handleNextImage} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full focus:outline-none ml-2">
                    <GrFormNext />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/2 p-5">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="text-sm text-gray-700 mr-4">Quantity:</label>
              <input type="number" id="quantity" className="border border-gray-300 rounded-sm px-3 py-1 text-sm w-16 focus:outline-none" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div className="flex items-center mb-6">
              <label htmlFor="size" className="text-sm text-gray-700 mr-4">Size:</label>
              <select id="size" className="border border-gray-300 rounded-sm px-3 py-1 text-sm focus:outline-none" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">Select Size</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
              </select>
              {sizeError && <p className="text-red-500 text-sm ml-2">{sizeError}</p>}
            </div>

            <button onClick={handlePlaceOrder} className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
              Place Order
            </button>

            {orderPlaced && (
              <div className="mt-4 text-green-500 text-center">
                Order placed successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
