import React, { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import axios from 'axios';

function Order() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Pending');

  const handleCopy = (trackingNumber) => {
    navigator.clipboard.writeText(trackingNumber);
    alert(`Tracking number ${trackingNumber} copied to clipboard!`);
  };

  const handleTabChange = (status) => {
    setActiveTab(status);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');  // Or wherever you store the token
        const response = await axios.get('http://localhost:3003/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setOrders(response.data);  // Assuming setOrders updates state correctly
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, []);  // Run once on component mount

  return (
    <section className='mt-16'>
      <header className="h-24 py-5 border-b mx-7">
        <p className="font-semibold text-lg">My Orders</p>
        <p className="text-sm text-gray-400">Review your purchase history</p>
      </header>

      <div className="mt-5 px-8">
        <nav className="flex justify-around mb-4">
          {['Pending', 'Shipped', 'Delivered'].map(status => (
            <button
              key={status}
              className={`px-4 py-2 ${activeTab === status ? 'text-orange-400 border-b-2 border-orange-400' : 'hover:text-orange-400'}`}
              onClick={() => handleTabChange(status)}
            >
              {status}
            </button>
          ))}
        </nav>

        {orders.length === 0 ? (
          <p className="text-gray-400">You have no orders.</p>
        ) : (
          orders
            .filter(order => order.status === activeTab)
            .map(order => (
              <div key={order._id} className="border border-gray-300 rounded-lg mb-4 p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center">
                      <p className="font-semibold">Tracking No: {order.trackingNumber || 'Not available'}</p>
                      {order.trackingNumber && (
                        <FaCopy
                          className="ml-2 text-orange-400 cursor-pointer"
                          title="Copy Tracking Number"
                          onClick={() => handleCopy(order.trackingNumber)}
                        />
                      )}
                    </div>

                    <p className="text-sm text-gray-400">Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  
                  <p className={`font-semibold ${order.status === 'Delivered' ? 'text-green-500' : 'text-orange-400'}`}>
                    {order.status}
                  </p>
                </div>
                <div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-none">
                      <div className="flex items-center gap-3">
                        {/* Assuming `item.image` is correct based on your data structure */}
                        <img src={`http://localhost:3004/${item.image}`} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className='font-semibold text-xl'>{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-end items-end mt-4">
                  <p className="font-semibold">Total: {order.total}</p>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className={`${order.status !== 'Delivered' ? ' cursor-not-allowed opacity-50' : ''} p-2 bg-orange-400 text-white rounded`}
                    disabled={order.status !== 'Delivered'}
                  >
                    Order Received
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </section>
  );
}

export default Order;
