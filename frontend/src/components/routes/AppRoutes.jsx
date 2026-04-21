import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Seller from '../seller/Seller'
import { AddProduct, Listings, Messages, Profile } from '../seller/pages/pages'

const AppRoutes = () => {
    return (
        <Routes>
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
