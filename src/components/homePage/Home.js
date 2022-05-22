import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserDetails from '../userDetails/UserDetails';

const Home = () => {

    const [myDetails, setMyDetails] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = myDetails?.token;
        // JWT ...
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: 'LOGOUT' });

                navigate('/');
                setMyDetails(null);
                window.location.reload();
            };
        }

        setMyDetails(JSON.parse(localStorage.getItem('profile')))
    }, [myDetails?.token, dispatch, navigate]);




    return (
        <div className='bg-blue-100 h-screen'>
            <UserDetails />
        </div>
    )
}

export default Home;