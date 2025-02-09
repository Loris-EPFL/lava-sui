const puppeteer = require('puppeteer');
const fs = require('fs');

// Read the URLs from the queries.txt
fs.readFile('queries.txt', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading queries.txt:', err);
        return;
    }

    const urls = data.split('\n');
    const browser = await puppeteer.launch();

    for (const url of urls) {
        if (url) { // Check if not an empty line
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' }); // Wait until the network is idle
            const pageName = url.split('/').pop(); // Get the last part of the URL for naming

            // Save the PDF
            await page.pdf({
                path: `downloaded_pdfs/${pageName}.pdf`, // Save in the downloaded_pdfs directory
                format: 'A4',
                printBackground: true, // Print background graphics
            });

            console.log(`Downloaded PDF for: ${url}`);
            await page.close();
        }
    }
    await browser.close();
    console.log('Done downloading PDFs!');
});