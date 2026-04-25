import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Seller from '../seller/Seller'
import { AddProduct, Listings, Messages,Profile } from '../seller/pages/pages'
import User from '../user/User'
import Home from '../user/home/Home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<User />} >
                <Route index element={<Home/>}/>
                <Route path='profile' element={<Profile />} />
            </Route>
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route path="/seller" element={<Seller />} >
                <Route index element={<Listings />} />
                <Route path="product" element={<AddProduct />} />
                <Route path="messages" element={<Messages />} />
                <Route path="profile" element={<Profile />} />
                {/* <Route path="logout" element={<Logout />} /> */}
            </Route>
        </Routes>
    )
}

export default AppRoutes
