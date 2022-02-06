//Add in all routes here.
import { Router } from 'express';
import { loginRouter } from './login/login-route';
export const routes: Router[] = [loginRouter];
