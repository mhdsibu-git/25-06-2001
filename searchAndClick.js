const puppeteer = require('puppeteer');

async function searchAndClickFirstLink(query) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to Google
  await page.goto('https://www.google.com');

  // Enter the search query and submit the form
  await page.type('input[name=q]', query);
  await page.keyboard.press('Enter');

  // Wait for the results page to load and display the results
  const resultsSelector = 'h3';
  await page.waitForSelector(resultsSelector);

  // Click the first link in the search results
  await page.evaluate(resultsSelector => {
    const firstResult = document.querySelector(resultsSelector);
    if (firstResult) {
      firstResult.click();
    }
  }, resultsSelector);

  // Wait for the new page to load
  await page.waitForNavigation();

  // Do something with the new page, or close the browser
  // ...

  await browser.close();
}

// Example usage
searchAndClickFirstLink('something');
