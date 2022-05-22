import React from 'react';
import AllUsers from '../allUsers/AllUsers';
import Header from '../Header/Header';
import UserTemplate from '../userTemplate/UserTemplate';



const UserDetails = () => {

    const myDetails = JSON.parse(localStorage.getItem('profile'));
    const user = myDetails?.result;

    return (
        <div className='max-w-[80%] mx-auto'>

            <Header />
            <UserTemplate user={user} />
            <AllUsers />

        </div>
    )
}

export default UserDetails