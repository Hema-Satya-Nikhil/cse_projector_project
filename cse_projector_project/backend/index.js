import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './server.js';

dotenv.config();

const INITIAL_PORT = parseInt(process.env.PORT, 10) || 5000;
const MAX_PORT_SHIFT = parseInt(process.env.PORT_FALLBACK_TRIES || "5", 10);

const start = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    const listenOnPort = (port, attempt = 0) => {
      const logServerStarted = () => {
        process.env.PORT = String(port);
        console.log(`🚀 Server running on port ${port}`);
        console.log(`📡 API: http://localhost:${port}/api`);
        console.log('💻 Developer: Satya Nikhil (CSE Department)');
      };

      const handleError = (error) => {
        if (error.code === 'EADDRINUSE' && attempt < MAX_PORT_SHIFT) {
          const nextPort = port + 1;
          console.warn(`⚠️ Port ${port} in use. Retrying on ${nextPort}...`);
          server.removeListener('error', handleError);
          listenOnPort(nextPort, attempt + 1);
        } else {
          console.error(`❌ Failed to bind on port ${port}:`, error);
          process.exit(1);
        }
      };

      server.once('error', handleError);
      server.listen(port, () => {
        server.removeListener('error', handleError);
        logServerStarted();
      });
    };

    listenOnPort(INITIAL_PORT);

    const shutdown = (signal) => {
      console.log(`
${signal} received. Closing server...`);
      server.close(() => {
        console.log('🛑 HTTP server closed gracefully');
        process.exit(0);
      });
    };

    process.once('SIGINT', () => shutdown('SIGINT'));
    process.once('SIGTERM', () => shutdown('SIGTERM'));

    process.on('unhandledRejection', (err) => {
      console.error('Unhandled promise rejection:', err);
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught exception:', err);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
