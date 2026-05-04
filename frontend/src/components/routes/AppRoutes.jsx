import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Seller from '../seller/Seller'
import { AddProduct, Listings, Messages, Profile, ProductView, Admin } from '../seller/pages/pages'
import User from '../user/User'
import Home from '../user/home/Home'
import Favorites from '../user/home/Favorites'
import Cart from '../user/home/Cart'
import NotFound from '../utils/NotFound'
import AuthPage from '../auth/AuthPage'
import ProtectedRoute from '../auth/ProtectedRoute'
import AdminRoute from '../auth/AdminRoute'
import Chat from '../chat/Chat'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<Admin/>}/>
                </Route>

                <Route path="/product" element={<ProductView />} />
                <Route path="/chat" element={<Chat />} />

                <Route path='/' element={<User />} >
                    <Route index element={<Home/>}/>
                    <Route path='favorites' element={<Favorites />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='profile' element={<Profile />} />
                </Route>

                <Route path="/seller" element={<Seller />} >
                    <Route index element={<Listings />} />
                    <Route path="product" element={<AddProduct />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
        
    )
}

export default AppRoutes
