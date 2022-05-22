import React, { useState } from 'react';
import { PencilAltIcon, CheckIcon } from '@heroicons/react/outline';
import Swal from 'sweetalert2';

import * as api from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/actions/myProfile';

const UserTemplate = ({ user }) => {

    const [editUser, setEditUser] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '' });
    const myDetails = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const editUserData = async (id) => {
        setEditUser(true);

        try {
            const { data } = await api.getUser(id);
            setUserData(data);
        } catch (error) {
            console.log(error?.response);
        }
    }

    const editNewData = async (id) => {

        if (myDetails?.result?._id === id) {

            try {
                // admin
                console.log('editNewData', id, userData);
                const res = await api.updateUser(id, userData)

                if (res.status === 200) {
                    const data = res.data
                    const newData = { result: data, token: myDetails.token }

                    dispatch(updateUser(newData));

                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setEditUser(false);
                }
            } catch (error) {
                console.log(error?.response);
            }

        } else {

            try {
                console.log('editNewData', id, userData);
                const res = await api.updateUser(id, userData)

                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    window.location.reload();
                }
            } catch (error) {
                console.log(error?.response);
            }
        }

    }

    return (
        <div>
            {editUser ? (
                <div className='flex px-3 py-3  items-center mt-3 rounded-sm hover:shadow-sm bg-cyan-200'>
                    <div className='flex flex-grow items-center'>

                        <p className='font-semibold text-lg mr-4 font-sans'>Name:</p>
                        <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className='flex w-[30%] px-2'
                        />

                        <p className='font-semibold text-lg mr-4 ml-20'>Email:</p>
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className='flex w-[30%] px-2 '
                        />


                    </div>
                    <CheckIcon onClick={() => editNewData(userData._id)} className=' h-10 p-2 rounded-full cursor-pointer ease-in-out duration-300 hover:bg-sky-800 hover:text-white bg-white text-sky-800 mr-6' />
                </div>
            ) : (
                <div className='flex px-3 py-3  items-center mt-3 rounded-sm hover:shadow-sm bg-cyan-200'>
                    <div className='flex flex-grow items-center'>

                        <div className='grid gap-4 grid-cols-2 w-[60%]'>
                            <div className='flex'>
                                <p className='font-semibold text-lg mr-4 font-sans'>Name:</p>
                                <p>{user?.name}</p>
                            </div>

                            <div className='flex'>
                                <p className='font-semibold text-lg mr-4'>Email:</p>
                                <p>{user?.email}</p>
                            </div>

                        </div>



                    </div>
                    <PencilAltIcon onClick={() => editUserData(user._id)} className=' h-10 p-2 rounded-full cursor-pointer ease-in-out duration-300 hover:bg-sky-800 hover:text-white bg-white text-sky-800 mr-6' />
                </div>
            )}
        </div>
    )
}

export default UserTemplate