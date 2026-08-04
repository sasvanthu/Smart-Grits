import cluster from 'node:cluster';
import os from 'node:os';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const app = express();
  // Railway dynamically assigns a PORT environment variable to the process.
  const port = process.env.PORT || 5173;

  // Serve static files from the Vite build directory
  app.use(express.static(join(__dirname, 'dist')));

  // SPA Fallback: Any unknown paths are directed to index.html so React Router can handle them
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Frontend production server worker ${process.pid} is running on port ${port}`);
  });
}
