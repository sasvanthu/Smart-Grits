import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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
  console.log(`Frontend production server is running on port ${port}`);
});
