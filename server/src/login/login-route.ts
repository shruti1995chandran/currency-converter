import { Router } from 'express';
import { LoginHandler } from './login-handler';

const loginRouter = Router();

loginRouter.get('/login', LoginHandler.login);

export { loginRouter };
