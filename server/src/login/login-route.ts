import { Router } from 'express';
import { LoginHandler } from './login-handler';

const router = Router();

router.get('/login', LoginHandler.login);

export { router };
