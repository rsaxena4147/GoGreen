import express from 'express'
import { isAuth, login, register ,logout} from '../controllers/userController.js';
import authUser from '../middlerwares/authUser.js';
const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login)
userRouter.get('/logout',authUser,logout)
userRouter.get('/is-auth',authUser,isAuth)

export default userRouter;
