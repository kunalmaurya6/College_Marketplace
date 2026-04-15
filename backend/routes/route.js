import express from 'express';
import product from './role/product.js'
import admin from './role/admin.js'
import user from './role/user.js'
import login from './auth/login.js'
import signup from './auth/signup.js'

const routes=express.Router();


routes.use('/',user);
routes.use('/product',product);
routes.use('/admin',admin);
routes.use('/signup',signup);
routes.use('/login',login);

export default routes;
