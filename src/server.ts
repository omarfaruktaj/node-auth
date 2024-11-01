import http from 'http';
import app from './app';
import connectDB from './config/database';
import { envConfig } from './config/env';

const server = http.createServer(app);

const main = async () => {
  try {
    await connectDB();
    server.listen(envConfig.PORT, () => {
      console.log(`Server is listening on port:${envConfig.PORT}.`);
      console.info(`Go to docs http://localhost:${envConfig.PORT}/docs`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);

  server.close(() => {
    console.log('Server is closed due to unhandled rejection');
    process.exit(1);
  });
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception thrown:', error);
  server.close(() => {
    console.log('Server is closed due to uncaught exception');
    process.exit(1);
  });
});
