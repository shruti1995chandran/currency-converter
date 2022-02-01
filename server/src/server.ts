import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { json } from 'body-parser';
import cors from 'cors';
import { Configuration } from './utility/config';
import { routes } from './routes';
import { jwtMiddleware } from './middleware/jwtMiddleware';
import { Logger } from './utility/logger';
import { SuccessResponse, ErrorResponse } from './utility/response';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import { contextUser } from './middleware/contextuser';

class App {
  public app: Express;
  private apolloServer: ApolloServer;
  constructor() {
    this.app = express();
    this.apolloServer = new ApolloServer({ schema, context: contextUser });
    this.addRoutes();
    this.addMiddleware();
    this.setResponseMiddlewares();
  }

  private addMiddleware(): void {
    this.app.use(cookieParser());
    this.app.use(json());
    const corsOption = {
      origin: Configuration.REACT_APP_URL,
      credentials: true,
    };
    this.app.use(cors(corsOption));
    this.app.use(jwtMiddleware);
    this.apolloServer.start().then((res) => {
      this.apolloServer.applyMiddleware({ app: this.app, path: '/graphql', cors: corsOption });
    });
  }

  private addRoutes(): void {
    for (const route of routes) {
      this.app.use('/', route);
    }
  }

  private setResponseMiddlewares(): void {
    this.app.use(this.responseInterceptors);
  }

  private responseInterceptors(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: SuccessResponse<any> | ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.status(data.status);
    res.send(data.body);
    Logger.info(res);
  }
}

export const app = new App();
