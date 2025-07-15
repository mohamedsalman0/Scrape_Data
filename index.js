// Importing the necessary libraries
const puppeteer = require('puppeteer');

// Function to get the content of a web page
async function getPageContent() {
    // Launching a Puppeteer browser instance
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox']
    });

    // Opening a new page in the browser
    const page = (await browser.pages())[0];

    // Navigating to the specified URL
    await page.goto('https://google.com/');

    // Extracting the inner text of all elements on the page
    const extractedText = await page.$eval('*', (el) => el.innerText);
    
    // Printing the extracted text to the console
    console.log(extractedText);

    // Closing the browser instance
    await browser.close();
}

// Calling the getPageContent function
getPageContent();