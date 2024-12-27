import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import {MdCategory, MdShop2, MdContacts} from 'react-icons/md'

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles} text-white`}>
        <NavLink to={'/'} className={({isActive}) => isActive ? "text-orange-400 relative flex-1 after:w-full after:h-[1px] after:bg-orange-400 after:absolute after:-bottom-3 after:right-0" : ""}>
            <div className='flex items-center justify-center gap-x-1'>
                <FaHome/> 
                Home 
            </div>
        </NavLink>

        <NavLink to={'/mens'} className={({isActive}) => isActive ? "text-orange-400 relative flex-1 after:w-full after:h-[1px] after:bg-orange-400 after:absolute after:-bottom-3 after:right-0" : ""}>
            <div className='flex items-center justify-center gap-x-1'>
            <MdCategory/> 
                Men's 
            </div>
        </NavLink>

        <NavLink to={'/womens'} className={({isActive}) => isActive ? "text-orange-400 relative flex-1 after:w-full after:h-[1px] after:bg-orange-400 after:absolute after:-bottom-3 after:right-0" : ""}>
            <div className='flex items-center justify-center gap-x-1'>
                <MdShop2/> 
                Women's 
            </div>
        </NavLink>

        <NavLink to={'/kids'} className={({isActive}) => isActive ? "text-orange-400 relative flex-1 after:w-full after:h-[1px] after:bg-orange-400 after:absolute after:-bottom-3 after:right-0" : ""}>
            <div className='flex items-center justify-center gap-x-1'>
                <MdContacts/> 
                Kid's
            </div>
        </NavLink>

    </nav>
  )
}

export default Navbar
