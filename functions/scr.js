const puppeteer = require('puppeteer');

exports.handler = async (event, context) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Nécessaire pour Netlify
    });

    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    const screenshot = await page.screenshot({ encoding: 'base64' });

    await browser.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ screenshot }), // Retourne l'image en base64
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};