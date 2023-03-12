const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Broadcast function sends a message to all connected clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each
<div id="file-upload-container">
  <label for="file-input">Select a file:</label>
  <input type="file" id="file-input" name="file-input" />
  <button id="upload-button">Upload</button>
</div>
