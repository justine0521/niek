import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { useOrders } from '../Context/OrdersContext';
import { useCart } from '../Context/CartContext';
import axios from 'axios';

import { FaPaypal, FaArrowLeftLong } from "react-icons/fa6";
import Gcash from '../images/g-cash.png'
import GcashQR from '../images/QR.jpg'

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems, totalPrice } = location.state || { selectedItems: [], totalPrice: 0 };

  const { isLoggedIn } = useAuth();
  const { addOrder } = useOrders();
  const { removeItemsFromCart } = useCart();
  const [error, setError] = useState({});
  const [shippingFee, setShippingFee] = useState(0);
  const [gCash, setGcash] = useState(false);
  const [gCashPaymentDone, setGcashPaymentDone] = useState(false);


  function handleGcashModal (){
    setGcash(true)
  }

  function handleGcashPaymentDone() {
    setGcashPaymentDone(true);
    setGcash(false);
  }

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    region: '',
    province: '',
    municipality: '',
    barangay: '',
    streetName: '',
    building: '',
    houseNumber: '',
    zip: '',
  });

  useEffect(() => {
    fetchShippingFee();
  }, []);

  const fetchShippingFee = async () => {
    try {
      const response = await axios.get('http://localhost:3004/api/shipping-fee');
      setShippingFee(response.data.fee);
    } catch (error) {
      console.error('Error fetching shipping fee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const validateForm = () => {
    const newError = {};

    if (!isNaN(formData.fullName)) {
      newError.fullName = 'Please enter a valid name';
    }

    if (formData.fullName === '') {
      newError.fullName = 'Please enter your Full Name';
    }

    if (!formData.contactNumber.trim() || !/^\d+$/.test(formData.contactNumber)) {
      newError.contactNumber = 'Please enter a valid Contact Number';
    }

    if (!formData.region.trim()) {
      newError.region = 'Please enter your Region';
    }

    if (!formData.province.trim()) {
      newError.province = 'Please enter your Province';
    }

    if (!formData.municipality.trim()) {
      newError.municipality = 'Please enter your Municipality';
    }

    if (!formData.barangay.trim()) {
      newError.barangay = 'Please enter your Barangay';
    }

    if (!formData.streetName.trim()) {
      newError.streetName = 'Please enter your Street';
    }

    if (!formData.building.trim()) {
      newError.building = 'Please enter your Building';
    }

    if (!formData.houseNumber.trim()) {
      newError.houseNumber = 'Please enter your House Number';
    }

    if (!formData.zip.trim() || !/^\d+$/.test(formData.zip)) {
      newError.zip = 'Please enter a valid Zip code';
    }

    if (formData.zip === '') {
      newError.zip = 'Please enter your Zip Code';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Please login before placing your order.');
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setGcash(true);

    const userId = localStorage.getItem('userId');

    const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const newOrder = {
      date: new Date().toISOString().split('T')[0],
      items: selectedItems.map(item => ({
        productId: item.id,  // Ensure item.id is the correct productId
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      })),
      total: totalPrice + shippingFee,
      status: 'Pending',
      trackingNumber: `${Math.random().toString(36).substr(2, 9)}`,
      shippingFee: shippingFee,
      totalPrice: totalPrice
    };

    const shippingAddress = {
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      region: formData.region,
      province: formData.province,
      municipality: formData.municipality,
      barangay: formData.barangay,
      streetName: formData.streetName,
      building: formData.building,
      houseNumber: formData.houseNumber,
      zip: formData.zip,
    };

    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token); // Log token
      console.log("Shipping Address:", shippingAddress); // Log shipping address
      console.log("New Order:", newOrder); // Log new order

      // Save the shipping address
      const addressResponse = await axios.post('http://localhost:3003/address', shippingAddress, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      // Save the order items
      const orderResponse = await axios.post('http://localhost:3003/orders', newOrder, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Address response:', addressResponse.data);
      console.log('Order response:', orderResponse.data);

      addOrder(newOrder);
      const selectedItemIds = selectedItems.map((item) => item.id);
      removeItemsFromCart(selectedItemIds);
      navigate('/orders');
      console.log('Order placed:', newOrder);
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      setError({ message: 'Internal server error', error });
    }
  };

  return (
    <section className="py-12 mt-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Checkout</h2>

        {!isLoggedIn && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-red-500 text-lg font-semibold mb-4">
              Please login before proceeding to checkout.
            </p>
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Go to Login Page
            </NavLink>
          </div>
        )}

        {isLoggedIn && (
          <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-5">
            <div className="bg-white p-8 rounded-lg shadow-md grid grid-cols-2 gap-4">
              <h3 className="text-lg font-semibold col-span-2">Address</h3>
              <div className="col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.fullName && <p className="text-red-500 text-xs mt-1">{error.fullName}</p>}
              </div>
              <div className="col-span-2">
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.contactNumber && <p className="text-red-500 text-xs mt-1">{error.contactNumber}</p>}
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  Region
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.region ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.region && <p className="text-red-500 text-xs mt-1">{error.region}</p>}
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.province ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.province && <p className="text-red-500 text-xs mt-1">{error.province}</p>}
              </div>
              <div>
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
                  Municipality
                </label>
                <input
                  type="text"
                  id="municipality"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.municipality ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.municipality && <p className="text-red-500 text-xs mt-1">{error.municipality}</p>}
              </div>
              <div>
                <label htmlFor="barangay" className="block text-sm font-medium text-gray-700">
                  Barangay
                </label>
                <input
                  type="text"
                  id="barangay"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.barangay ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.barangay && <p className="text-red-500 text-xs mt-1">{error.barangay}</p>}
              </div>
              <div>
                <label htmlFor="streetName" className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  type="text"
                  id="streetName"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.streetName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.streetName && <p className="text-red-500 text-xs mt-1">{error.streetName}</p>}
              </div>
              <div>
                <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                  Building
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.building ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.building && <p className="text-red-500 text-xs mt-1">{error.building}</p>}
              </div>
              <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
                  House Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.houseNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.houseNumber && <p className="text-red-500 text-xs mt-1">{error.houseNumber}</p>}
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${error.zip ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-orange-400 sm:text-sm`}
                />
                {error.zip && <p className="text-red-500 text-xs mt-1">{error.zip}</p>}
              </div>
            </div>

            <div className="max-w-md mx-auto h-fit bg-white p-8 rounded-lg shadow-md w-full mt-8 md:mt-0">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              {selectedItems.map((item, index) => (
                <div key={index} className="flex justify-between py-2">
                  <div className='flex flex-col '>
                    <span className='font-semibold text-lg'>{item.name}</span>
                    <span className='text-sm text-gray-500'>Size: {item.size}</span>
                    <span className='text-sm text-gray-500'>Quantity: {item.quantity}</span>
                  </div>

                  <span className='font-semibold'>₱ {item.price.toFixed(2)}</span>
                </div>
              ))}

              <div className="flex justify-between mt-3 font-semibold">
                <span>Shipping Fee</span>
                <span>₱ {shippingFee.toFixed(2)}</span>
              </div>

              {selectedItems.length > 0 && (
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₱ {selectedItems.reduce((total, item) => total + item.price, 0) + shippingFee}</span>
                </div>
              )}

              <button type="submit" className="mt-6 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200">
                Place Order
              </button>

              {error.message && <p className="text-red-500 text-center mt-4">{error.message}</p>}

              <p className='flex justify-center py-3 font-semibold'>Payment Method</p>

              <div className='flex flex-col gap-3'>
                <button onClick={handleGcashModal} className='w-full flex items-center justify-center font-semibold p-2 bg-blue-500 text-white text-lg rounded-md'>
                  <img src={Gcash} className='h-5'/>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {gCash && 
        <div className='fixed top-0 left-0 m-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <div className='bg-Blue w-96 h-96 mx-3 rounded-md flex flex-col items-center px-10 pb-5 relative'>
            <div className='flex items-center'>
              <FaArrowLeftLong onClick={() => setGcash(false)} className='absolute left-5 text-white text-xl cursor-pointer'/>
                    
              <p className='text-white font-mono py-3'>QR Code</p>
          </div>

          <div className='bg-white w-full h-full rounded-xl flex flex-col items-center px-5 pt-5'>
              <img src={GcashQR} alt="QR Code" className='h-56 mb-2'/>
              <p className='text-sm text-gray-600'>Transfer fees may apply.</p>

              <button onClick={handleGcashPaymentDone} className='bg-Blue my-2 py-1 px-2 rounded text-white'>Done</button>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export default Checkout;
