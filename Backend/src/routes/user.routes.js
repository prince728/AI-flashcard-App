const express =  require('express');
const authUser = require('../controllers/auth.controller');
const { authUserMiddleware } = require('../middlewares/auth.middleware');

const AuthRouter =  express.Router();

AuthRouter.post('/register',authUser.userRegister);
AuthRouter.post('/login',authUser.userLogin);
AuthRouter.get('/getme', authUserMiddleware ,authUser.getMe);
AuthRouter.post('/logout', authUser.userLogout);
AuthRouter.put('/update', authUserMiddleware ,authUser.userUpdateProfile);
AuthRouter.delete('/delete', authUserMiddleware ,authUser.userDeleteProfile);


module.exports = AuthRouter;