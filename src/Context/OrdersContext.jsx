import React, { createContext, useContext, useState } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
