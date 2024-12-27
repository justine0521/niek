import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, setCartItems, updateCartItem } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:3003/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:3003/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      removeFromCart(productId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    updateCartItem(productId, { quantity: updatedCartItems.find((item) => item._id === productId).quantity });
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    updateCartItem(productId, { quantity: updatedCartItems.find((item) => item._id === productId).quantity });
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleCheckout = () => {
    if (selectedProducts.length > 0) {
      const selectedItems = cartItems.filter((item) => selectedProducts.includes(item._id));
      navigate('/checkout', { state: { selectedItems } });
    } else {
      alert('Please select at least one product to checkout.');
    }
  };

  return (
    <div className="container mx-auto mt-10 py-7">
      <h1 className="text-2xl font-bold mb-5 mx-3">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {cartItems.map((item) => {
            const imageUrl = item.imageName ? `http://localhost:3004/uploads/${item.imageName}` : '';

            console.log('Image URL:', imageUrl);

            return (
              <div key={item._id} className="bg-white flex gap-3 justify-between rounded-lg shadow-md p-4 mx-3">
                <div className='flex flex-wrap gap-3'>
                  <div className='h-20 w-20'>
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={item.name} 
                        onError={(e) => e.target.src = ''} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensure the image fits properly
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className='flex flex-col gap-1'>
                      <h2 className="text-lg font-bold">{item.name}</h2>
                      <p className='text-sm'>Size: {item.size}</p>

                      <div className="flex items-center gap-2">
                        <p className='text-sm'>Quantity: </p>
                        <button onClick={() => handleDecreaseQuantity(item._id)} className="bg-gray-300 px-2 rounded">-</button>
                        <p className="text-gray-400">{item.quantity}</p>
                        <button onClick={() => handleIncreaseQuantity(item._id)} className="bg-gray-300 px-2 rounded">+</button>
                      </div>
                    </div>

                    <div className='flex justify-between'>
                      <p className="font-bold">₱ {item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-rows-1'>
                  <div>
                    <input type="checkbox" checked={selectedProducts.includes(item._id)} onChange={() => handleProductSelect(item._id)} />
                  </div>

                  <button onClick={() => handleRemove(item._id)} className="text-xl text-red-500 hover:text-red-600">
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-end mx-3">
          <button onClick={handleCheckout} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
