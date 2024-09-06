const experss = require('express');
const { body } = require('express-validator');

const User = require('../Modals/users');
const isAuthen = require('../Middleware/checkAuth');
const userController = require('../Controllers/user');


const routes = experss.Router();

routes.post('/signup',  //checkEmail
                        body('email')
                        .isEmail()
                        .custom((value, { req }) => {
                        return User.findOne({ email: value }).then(userDoc => {
                            if (userDoc) {
                            return Promise.reject('E-Mail address already exists!');
                            }
                        });
                        })
                        .normalizeEmail(),
                        //checkPassword
                        body('password')
                        .trim()
                        .isLength({ min: 6 }),
                        //check name empty
                        body('name')
                        .trim()
                        .not()
                        .isEmpty(), userController.signup );

routes.post('/login', body('email')
                      .isEmail()
                      .normalizeEmail(),
                      body('password')
                      .trim()
                      .isLength({ min: 6 }), userController.login  );
routes.post('/mail', userController.sendMail );

routes.get('/history', userController.getHistory );

routes.get('/history/:detail', userController.getHistoryDetail );

routes.get('/bill/:userId', userController.getBill );

routes.post('/inovation/:userId', userController.getInovation );

routes.get('/invoice/:userId', userController.getInvoice );

module.exports = routes;