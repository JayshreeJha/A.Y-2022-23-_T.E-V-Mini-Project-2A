import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);



  return (
    <>
      <nav className='navbar_pravah'>
        <Link to='/' className='navbar_logop' onClick={closeMobileMenu}>
          Pravah.Studio

        </Link>

        <ul className={click ? 'navbar_menu active' : 'navbar_menu'}>
          <li className='navbar_items'>
            <Link to='/' className='navbar_links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='navbar_items'

          >
            <Link
              to='/services'
              className='navbar_links'

            >
              Trending
            </Link>

          </li>
          <li className='navbar_items'>
            <Link
              to='/products'
              className='navbar_links'
            >
              Stream Now
            </Link>
          </li>
          <li className='navbar_items'>
            <Link
              to='/contact-us'
              className='navbar_links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li className='navbar_items ' >
            <Link
              to='/sign-up'
              className='navbar_links-mobile navbar_links'

              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
