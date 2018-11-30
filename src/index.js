const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3030;

// Endpoints
app.get('/', async (req, res) => {
  res.status(200).send('pong');
});

// Start server
app.listen(port, () => {
  console.log(`Listening on localhost:${port}!`);
});
