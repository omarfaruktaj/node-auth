import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const docsPath = path.join(__dirname, '../../docs/docs.yaml');

const apiDocs = YAML.load(docsPath);

const applyMiddleware = (app: Express) => {
  app.use(helmet());
  app.use(express.json());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      message: 'Too many requests, please try again later.',
    }),
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
};

export default applyMiddleware;
