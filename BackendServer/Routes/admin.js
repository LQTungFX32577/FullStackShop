const experss = require('express');

const isAuth = require('../Middleware/checkAuth');
const adminController = require('../Controllers/admin');
const routes = experss.Router();

routes.get('/auth',isAuth, adminController.Authorization );

routes.get('/dashboard', adminController.getDashboard );

routes.get('/transaction/:page', adminController.getTransaction);

routes.get('/product', adminController.getProduct);

routes.get('/product-trash', adminController.getProductTrash );

routes.patch('/product-restore', adminController.ProductRestore );

routes.post('/addProduct',isAuth, adminController.AddProduct);

routes.patch('/product-edit/:editId',isAuth, adminController.EditProduct );

routes.post('/update-user',isAuth, adminController.UpdateUser);

routes.get('/edit-product/:editId', adminController.getEditProduct );

routes.post('/delete-product',isAuth, adminController.DeleteProduct );

routes.delete('/delete-product-force',isAuth, adminController.forceDeleteProduct );

routes.post('/status/:orderId', isAuth, adminController.status );

routes.post('/count', isAuth, adminController.countUpdate );

routes.get('/chatRoom', adminController.chatRoom );

routes.post('/Room', adminController.MessContent );






module.exports = routes;