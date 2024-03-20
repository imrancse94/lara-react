import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { removeAllCookie } from '@/helpers';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);

    const sidebarEvent = () => {
        const elements = document.querySelectorAll('.mobile-element')
        setProfileMenuOpen(false);
        
        elements.forEach(element=>{

            if (element.style.display === "none") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        })
    }

    const sidebarOff = () => {
        const elements = document.querySelectorAll('.mobile-element')
        
        elements.forEach(element=>{

            element.style.display = "none";
        })
    }

    const logout = () => {
        setAuth({})
        removeAllCookie()
    }
    
    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
        <div
            className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
        >

            <button
            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={sidebarEvent}
            aria-label="Menu"
            >
            <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
                ></path>
            </svg>
            </button>

            <div className="flex justify-center flex-1 lg:mr-32">
            <div
                className="relative w-full max-w-xl mr-6 focus-within:text-purple-500"
            >
                <div className="absolute inset-y-0 flex items-center pl-2">
               
                </div>
                
            </div>
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">

            <li className="flex">
                <button
                className="rounded-md focus:outline-none focus:shadow-outline-purple"
                aria-label="Toggle color mode"
                >
                <template x-if="!dark">
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path
                        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path>
                    </svg>
                </template>
                <template x-if="dark">
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                    ></path>
                    </svg>
                </template>
                </button>
            </li>

           

            <li className="relative">
                <button
                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                onClick={() => {setProfileMenuOpen(!isProfileMenuOpen); sidebarOff()}}
                
                aria-label="Account"
                aria-haspopup="true"
                >
                <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                    alt=""
                    aria-hidden="true"
                />
                </button>
                
                {isProfileMenuOpen && <ul
                    x-transition:leave="transition ease-in duration-150"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                   
                    className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                    aria-label="submenu"
                >
                    <li className="flex">
                    <button
                        className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        type="button"
                        onClick={logout}
                    >
                        <svg
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                        </svg>
                        <span>Log out</span>
                    </button>
                    </li>
                </ul>}
                
            </li>
            </ul>
        </div>
        </header>
    );
}

export default Header;
