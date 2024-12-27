import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Logo from '../images/Nike-Logo/check-logo-orange.png';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/authContext';
import { FaUser, FaOpencart, FaShoppingBasket } from 'react-icons/fa';
import { MdMenu, MdClose, MdLogout } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { cartCount } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const navigate = useNavigate();

  const toggleDropDown = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDropdown = (dropdown) => {
    switch (dropdown) {
      case 'Account':
        navigate('/account');
        break;
      case 'Orders':
        navigate('/orders');
        break;
      case 'Logout':
        logout();
        navigate('/login');
        break;
      default:
        break;
    }
    setDropdownIndex(null);
  };

  return (
    <header className="fixed top-0 left-0 m-auto w-full max-w-screen-xl mx-auto px-6 bg-black z-10">
      <div className="px-4 flex justify-between items-center py-3 max-xs:px-2">
        <div>
          <NavLink to={'/'}>
            <img src={Logo} alt="Nike" className="h-10 w-24" />
          </NavLink>
        </div>
        <Navbar containerStyles={'hidden md:flex gap-x-5 xl:gap-x-10 medium-15'} />
        <Navbar
          containerStyles={`${menuOpened ? 'flex item-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-black rounded-3xl shadow-xl w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300' : 'flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-black rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]'}`}
        />
        <div className="flex justify-between sm:gap-x-2 bold-16 text-white">
          {!menuOpened ? (
            <MdMenu
              onClick={toggleMenu}
              className="md:hidden cursor-pointer hover:text-orange-400 hover:ring-orange-400 mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
            />
          ) : (
            <MdClose
              onClick={toggleMenu}
              className="md:hidden cursor-pointer hover:text-orange-400 hover:ring-orange-400 mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
            />
          )}
          <div className="flex justify-between sm:gap-x-6">
            <NavLink to={'/cart'} className="flex items-center">
              <FaOpencart className="p-1 h-8 w-8 ring-1 ring-orange-400 bg-orange-400 rounded-full" title="Cart" />
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-orange-400 text-white medium-14 -top-2">
                {cartCount || 0}
              </span>
            </NavLink>
            {isLoggedIn ? (
              <button
                onClick={() => toggleDropDown(1)}
                className="bg-orange-400 text-white rounded-full w-10 flex items-center justify-center"
              >
                <CiUser />
              </button>
            ) : (
              <NavLink
                to={'/login'}
                className="bg-orange-400 text-white rounded-full py-1 px-4 flex items-center justify-center gap-x-2 medium-16"
              >
                <CiUser />
                Login
              </NavLink>
            )}
            {dropdownIndex === 1 && (
              <div className="absolute top-0 right-5 mt-14 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleDropdown('Account')}
                  className="flex items-center px-4 py-2 text-md text-orange-400 hover:bg-gray-200 w-full"
                >
                  <FaUser className="mr-3" />
                  My Account
                </button>
                <button
                  onClick={() => handleDropdown('Orders')}
                  className="flex items-center px-4 py-2 text-md text-orange-400 hover:bg-gray-100 w-full"
                >
                  <FaShoppingBasket className="mr-3" />
                  My Orders
                </button>
                <button
                  onClick={() => handleDropdown('Logout')}
                  className="flex items-center px-4 py-2 text-md text-orange-400 hover:bg-gray-100 w-full"
                >
                  <MdLogout className="mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
