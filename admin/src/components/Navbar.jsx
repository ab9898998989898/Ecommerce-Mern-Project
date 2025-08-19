import React from 'react'// Adjust the path as necessary
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <Link to='/'><img className='w-[max(10%,80px)]' src={assets.logo} alt="" /></Link>
        <button onClick={() => setToken('')} className='bg-gray-600 cursor-pointer text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>LogOut</button>
    </div>
  )
}

export default Navbar
