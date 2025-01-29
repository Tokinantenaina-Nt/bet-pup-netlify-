const puppeteer = require('puppeteer');

   exports.handler = async (event, context) => {
     try {
       // Lancer un navigateur
       const browser = await puppeteer.launch({
         headless: true,
         args: ['--no-sandbox', '--disable-setuid-sandbox'],
       });

       // Ouvrir une nouvelle page
       const page = await browser.newPage();

       // Naviguer vers une URL
       await page.goto('https://www.example.com');

       // Prendre une capture d'écran
       const screenshot = await page.screenshot({ encoding: 'base64' });

       // Fermer le navigateur
       await browser.close();

       return {
         statusCode: 200,
         body: JSON.stringify({ screenshot }),
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