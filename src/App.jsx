import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Account from './Profile/Account';
import Orders from './Profile/Orders';
import axios from 'axios';
import Category from './pages/Category';

function App() {
  const [products, setProducts] = useState([]);

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

  return (
    <main className='bg-gray-200 text-black'>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />

          <Route path='/' element={<Home />} />
          <Route path='/mens' element={<Category category="men" products={products.filter(product => product.category === 'men')} />} />
          <Route path='/womens' element={<Category category="women" products={products.filter(product => product.category === 'women')} />} />
          <Route path='/kids' element={<Category category="kids" products={products.filter(product => product.category === 'kids')} />} />

          <Route path='/product/:productId' element={<Product />} />

          <Route path='/cart' element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path='/account' element={<Account />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
