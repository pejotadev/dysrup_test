import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload(false);
  }
  return (
    <>
    <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/dashboard" className="flex items-center">
                <img src="https://dysrup.com.br/wp-content/uploads/2022/11/logo-dysryp-colorida.png" className="mr-3 h-6 sm:h-9" alt="Dysrup Logo" /> 
            </Link>
            <div className="flex items-center lg:order-2">
                <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={logout}>Log out</a>
                
            </div>
        </div>
    </nav>
</header>
    </>
  )
}

export default Header