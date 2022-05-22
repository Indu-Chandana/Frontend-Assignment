import React from 'react';
import { EyeOffIcon, EyeIcon } from '@heroicons/react/outline';

const Input = (props) => {
    const { name, type, placeholder, handleChange, label, handleShowPassword } = props
    return (
        <div className='flex flex-col my-[1rem]'>
            <label
                htmlFor={name}
                className="mb-[0.45rem]  text-[#3d4f58] text-[15px] font-serif tracking-widest leading-loose after:content-['*'] after:ml-0.5 after:text-red-500"
            >
                {label}
            </label>
            {name === 'password' ? (
                <div className='flex items-center bg-white border shadow-sm border-slate-300 hover:border-blue-400  w-[80%] rounded-md sm:text-sm '>
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        onChange={handleChange}
                        className='flex-grow outline-none bg-transparent py-2 pl-3'
                    />
                    {type === "password" ? <EyeIcon onClick={handleShowPassword} className='h-5 cursor-pointer hover:text-blue-400 text-[#005fff] px-3 ' /> : <EyeOffIcon className='h-5 cursor-pointer hover:text-blue-400 text-[#005fff] px-3' onClick={handleShowPassword} />}
                </div>
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className=' px-3 py-2 bg-white border shadow-sm border-slate-300  focus:outline-none focus:border-sky-500 hover:border-blue-400 focus:ring-sky-500 block w-[80%] rounded-md sm:text-sm focus:ring-1'
                    required

                />
            )}



        </div>
    )
}

export default Input