import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex sticky top-0 bg-transparent py-3 px-4 justify-end gap-10 font-bold text-orange-500 text-2xl shadow-md  w-full '>

        <Link to='/'>Search 🔎</Link>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/drinks'>Drinks</Link>
    </nav>
  )
}

export default Navbar