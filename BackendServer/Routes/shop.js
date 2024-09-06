const experss = require('express');

const shopController = require('../Controllers/shop');
const isAuth = require('../Middleware/checkAuth');
const routes = experss.Router();

routes.get('/products', shopController.getProducts );

routes.patch('/addProducts',isAuth, shopController.addProduct );

routes.get('/getCart',isAuth, shopController.getCarts );

routes.post('/checkout', isAuth, shopController.checkOut );

routes.post('/credit', isAuth, shopController.getCredit );


module.exports = routes;    