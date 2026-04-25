import express from 'express';
import seller from './role/seller.js'
import admin from './role/admin.js'
import user from './role/user.js'
import login from './auth/login.js'
import signup from './auth/signup.js'

const routes=express.Router();


routes.use('/',user);
routes.use('/sell',seller);
routes.use('/admin',admin);
routes.use('/signup',signup);
routes.use('/login',login);

export default routes;
