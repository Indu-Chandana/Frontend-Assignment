import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import * as api from '../../utils/axios';
import UserTemplate from '../userTemplate/UserTemplate';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    const myDetails = JSON.parse(localStorage.getItem('profile'));
    const isAdmin = myDetails?.result.isAdmin;

    useEffect(() => {

        if (isAdmin === 'true') {
            try {
                getAllUserData(myDetails);
            } catch (error) {
                console.log(error?.response);
            }
        }

    }, [isAdmin, myDetails]);

    const getAllUserData = async (myDetails) => {

        const { data } = await api.getAllUsers();
        const allUsers = _.cloneDeep(data)
        const otherUsers = allUsers.filter((user) => user?._id !== myDetails?.result?._id)
        setAllUsers(otherUsers);

    }

    return (
        <>
            {allUsers.map((user) => (

                <div key={user._id}>
                    <UserTemplate user={user} />
                </div>

            ))}
        </>
    )
}

export default AllUsers