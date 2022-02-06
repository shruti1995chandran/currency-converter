import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { json } from 'body-parser';
import cors from 'cors';
import { Configuration } from './utility/config';
import { routes } from './routes';
import { jwtMiddleware } from './middleware/jwt-middleware';
import { requestLimiter } from './middleware/request-limiter';
import { Logger } from './utility/logger';
import { SuccessResponse, ErrorResponse } from './utility/response';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql-connection';
import { contextUser } from './middleware/context-user';

class App {
  public app: Express;
  private apolloServer: ApolloServer;
  constructor() {
    this.app = express();
    this.apolloServer = new ApolloServer({
      resolvers,
      typeDefs,
      context: contextUser,
    });
    const corsOption = {
      origin: Configuration.REACT_APP_URL,
      credentials: true,
    };
    this.app.use(cors(corsOption));
    this.addRoutes();
    this.addMiddleware(corsOption);
    this.setResponseMiddlewares();
  }

  private async addMiddleware(corsOption: { origin: string; credentials: boolean }): Promise<void> {
    this.app.use(cookieParser());
    this.app.use(json());

    this.app.use(jwtMiddleware);
    this.app.use(requestLimiter);
    this.apolloServer.start().then(() => {
      this.apolloServer.applyMiddleware({
        app: this.app,
        path: '/graphql',
        cors: corsOption,
      });
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

export const appInstance = new App();
