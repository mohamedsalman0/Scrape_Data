// Importing the necessary libraries
const functions = require('@google-cloud/functions-framework');
const puppeteer = require('puppeteer');

// Function to get the content of a web page
async function getPageContent(name) {

    // Launching a Puppeteer browser instance
    const browser = await puppeteer.launch({
        args : [
            '--no-sandbox'
          ]
    });

    // Opening a new page in the browser
    const page = (await browser.pages())[0];

    // Navigating to the specified URL
    await page.goto(name);

    // Extracting the inner text of all elements on the page
    const extractedText = await page.$eval('*', (el) => el.innerText);

    // Closing the browser instance
    await browser.close();

    // Returning the extracted text
    return extractedText;

};

// Exporting the function as a Google Cloud Function
exports.getPageContent = async function(req, res) {

    // Retrieving the 'name' parameter from the request body or query string
    let name = req.body.name || req.query.name;

    // Setting the response status code to 200 and sending the page content
    res.status(200).send(await getPageContent(name));
  }
