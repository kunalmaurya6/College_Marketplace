import express from 'express';
import seller from './role/seller.js'
import admin from './role/admin.js'
import user from './role/user.js'
import cart from './role/cart.js'
import auth from './auth/authRoute.js'
import chatApi from './chat/chatApi.js'

const routes = express.Router();

routes.use('/', user);
routes.use('/auth', auth);
routes.use('/chat', chatApi);
routes.use('/cart', cart);
routes.use('/sell', seller);
routes.use('/admin', admin);

export default routes;
