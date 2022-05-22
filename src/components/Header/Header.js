import React from 'react';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    const Logout = () => {
        dispatch({ type: 'LOGOUT' });
        window.location.reload();
    };

    return (
        <div className='flex p-4 bg-blue-300 rounded-lg justify-between mb-6'>
            <p className='font-mono text-lg font-bold border-2 p-2'>Account Details</p>
            <button onClick={() => Logout()} className='py-2 px-4 ease-in-out duration-300 bg-blue-200 focus:ring focus:ring-white hover:bg-sky-600 hover:text-white'> LogOut </button>
        </div>
    )
}

export default Header