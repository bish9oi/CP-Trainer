// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Expose node_modules so that Monaco Editor files can be loaded by the browser
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Parse JSON request bodies
app.use(bodyParser.json());

// Mount API routes at /api
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
