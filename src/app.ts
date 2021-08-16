import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { appRoutes } from './routes';
import { EnvironmentUtil } from './utils/environment.util';
import { ErrorMessageUtil } from './utils/error-message.util';
import { ErrorResponseUtil } from './utils/error-response.util';
import { ErrorInterface } from './interfaces/error.interface';
import { messages } from './constants/messages.constant';

class App {
  public express: Application;

  public constructor() {
    this.express = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  private initializeMiddlewares(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  private initializeRoutes(): void {
    this.express.use(appRoutes);
  }

  private initializeErrorHandler(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.express.use((err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
      const isDev = !EnvironmentUtil.isProduction();
      const errorHandlerCodeSuffix = 'Z';

      if (!err.status) {
        err.status = 500;
      }

      if (isDev) {
        console.log('\nError:', err);
      }

      if (err.redirect) {
        const status = 404;

        const message = ErrorMessageUtil.parseErrorMessage(err.message) || messages.notFound;

        const errorResponse = ErrorResponseUtil.getErrorResponse(errorHandlerCodeSuffix, status, message, err.redirect);

        res.status(status).json(errorResponse);
      } else {
        const status = err.status;

        const message = ErrorMessageUtil.parseErrorMessage(err.message) || messages.serverError;

        const errorResponse = ErrorResponseUtil.getErrorResponse(errorHandlerCodeSuffix, status, message);

        res.status(err.status).json(errorResponse);
      }
    });
  }
}

export const app = new App().express;
