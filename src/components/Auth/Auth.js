import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import signinImage from '../../assets/signup.jpg'
import Input from './Input';

import * as api from '../../utils/axios';
import { signin, signup } from '../../store/actions/myProfile';

const initialState = { firstName: '', lastName: '', email: '', confirmPassword: '' };

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            try {
                const { data } = await api.signup(formData);

                dispatch(signup(data));
                navigate('/');

            } catch (error) {
                const msg = error?.response?.data.message;

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${msg}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } else {

            try {
                const { data } = await api.signin(formData);

                dispatch(signin(data));
                navigate('/');

            } catch (error) {
                const msg = error?.response?.data.message;

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${msg}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }

    return (
        <div className='min-h-screen flex flex-row'>
            <div className='basis-1/2 flex flex-col justify-center bg-[#005fff] p-[2rem]'>
                <div className='flex flex-col justify-start p-[2rem] shadow-lg rounded-lg ease-in-out duration-300 bg-white'>

                    <p className='text-[1.5rem] font-mono text-[#05245a] font-black'> {isSignup ? 'Sign Up' : 'Sign In'} </p>

                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <>
                                <Input name="firstName" type="text" placeholder="First Name" label="First Name" handleChange={handleChange} />
                                <Input name="lastName" type="text" placeholder="Last Name" label="Last Name" handleChange={handleChange} />
                            </>
                        )}

                        <Input name="email" type="email" placeholder="Email Address" label="Email Address" handleChange={handleChange} />
                        <Input name="password" type={showPassword ? "text" : "password"} placeholder="Password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />

                        {isSignup && (<Input name="confirmPassword" type="password" placeholder="Repeat Password" label="Confirm Password" handleChange={handleChange} />)}

                        <button type="submit" className='px-4 py-2 bg-[#005fff] text-white mt-5'>{isSignup ? "Sign Up" : "Sign In"}</button>
                    </form>

                    <div className=' mt-3'>
                        <p>
                            {isSignup ? "Already have an account?" : "Don't have an account?"}
                            <span className='ml-2 text-[#005fff] cursor-pointer' onClick={() => switchMode()}>
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='basis-1/2 flex box shadow-lg'>
                <img src={signinImage} alt="signinImage" className='w-full h-full' />
            </div>
        </div>
    )
}

export default Auth