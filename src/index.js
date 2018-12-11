const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3030;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Endpoints
app.get('/', async (req, res) => {
  const url = ''; // Add image url

  const width = 1200;
  const height = 630;

  const renderUrl = `http://localhost:${port}/og_image?url=${url}&width=${width}&height=${height}`;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  // adjustments for this page (so we hit the desktop breakpoint)
  await page.setViewport({ width, height });

  await page.goto(renderUrl);

  console.log(await page.viewport());

  const imageBuffer = await page.screenshot();
  browser.close();

  res.set('Content-Type', 'image/png');
  res.send(imageBuffer);
});

app.get('/og_image', async (req, res) => {
  const { url, width, height } = req.query;
  res.render('og_image', {
    url,
    width,
    height,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on localhost:${port}!`);
});
