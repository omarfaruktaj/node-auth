import express, { Express, NextFunction, Request, Response } from 'express';
import applyMiddleware from './middleware';
import globalErrorHandler from './middleware/global-error-handler';
import apiRoutes from './routes';
import basicRoutes from './routes/basic-routes';
import { AppError } from './utils';

const app: Express = express();

app.disable('x-powered-by');

//Middlewares
applyMiddleware(app);

// base routes
app.use('/', basicRoutes);

// API routes
app.use('/api', apiRoutes);

// Handle undefined routes
app.all('/*splat', (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('The endpoint you requested does not exist.', 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
