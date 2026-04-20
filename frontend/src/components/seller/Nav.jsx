import React from 'react'
import logo from '../../assets/logo.png'

const Nav = () => {
    return (
        <div className='w-full h-[10vh] p-5 flex justify-between items-center'>
            <div className='w-[25%] h-[90%] overflow-hidden bg-red-500'><img src={logo} alt="logo" className='w-full h-full object-contain'/></div>
            <div className='flex gap-5'>
                <div className='w-[50px] h-[50px] text-[20px] rounded-full flex justify-center items-center'><i className="fa-regular fa-bell"></i></div>
                <div className='w-[50px] h-[50px] text-[20px] bg-gray-200 rounded-full flex justify-center items-center'><i className="fa-solid fa-user"></i></div>
            </div>
        </div>
    )
}

export default Nav
