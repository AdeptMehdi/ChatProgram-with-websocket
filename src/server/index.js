/**
 * @fileoverview Main entry point for the Express server.
 * Integrates Socket.io and serves the Astro application.
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { socketHandler } from './socket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // In production, restrict this to your domain
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

// Initialize socket handler
socketHandler(io);

// Middleware
app.use(express.json());

// Serve static files from the Astro build output (dist)
// Note: In development, Astro runs its own dev server.
// In production, we serve the built files.
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA-like behavior if needed
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export for testing
export { app, httpServer, io };
