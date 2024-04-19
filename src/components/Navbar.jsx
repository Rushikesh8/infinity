import { Link } from 'react-router-dom';
import { Autocomplete, Group, Burger, rem, Container } from '@mantine/core';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const links = [
        { link: '/', label: 'Home' }
      ];
  const [opened, toggle ] = React.useState(false);
  const navigate = useNavigate()
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") || false
  const handleLogoutClick = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('isUserLoggedIn');
    navigate('/login')
  }
  return (
<nav class="border">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap ">Regulation</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className='flex items-center gap-x-4'>
        {links?.map((ele,idx) => {
            return <Link to={ele?.link} className='font-medium hover:text-teal-600'>{ele?.label}</Link>
        })}
    
    {isUserLoggedIn && <p className='font-medium hover:text-teal-600 hover:cursor-pointer' onClick={handleLogoutClick}>Logout</p>}
    </div>
    {/* <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col align-items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
        <li>
          <a href="#" class="block py-2 px-3 text-teal rounded md:bg-transparent " aria-current="page">Home</a>
        </li>
      </ul>
    </div> */}
  </div>
</nav>


  );
};
export default Navbar;