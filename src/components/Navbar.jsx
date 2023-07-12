import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex '>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/tocook'>To Cook</Link>
    </nav>
  )
}

export default Navbar