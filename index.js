
let mainLink = "https://www.udemy.com/course/canva-master-course-graphic-design-for-beginners/?fbclid=IwY2xjawEkgwxleHRuA2FlbQIxMAABHZOzrFuuLWn0dkfav3b1hGHw3_OEdcEaaEaXh-0_aujA8kkd1qJ8gJYhqQ_aem_Q2fDtbWvOHroU44ZJXt8yA";

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.udemy.com/join/signup-popup/');

  // You may still need to manually solve the CAPTCHA
  await page.waitForTimeout(5000); // Wait to manually solve CAPTCHA


  function generateRandomGmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';

    // Generate a random length for the username (between 5 and 15 characters)
    const length = Math.floor(Math.random() * 11) + 5;

    // Generate the random username
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        username += chars[randomIndex];
    }

    // Return the full Gmail address
    return username + '@gmail.com';
}

  // Example usage
  let randomGmail = generateRandomGmail();



  await page.type('#form-group--1', 'omar'); // Replace with the actual selector and value
  await page.type('#form-group--3', `${randomGmail}`); // Replace with the actual selector and value
  await page.type('#form-group--5', '0123456456'); // Replace with the actual selector and value


 // Wait for the "Sign up" button to be visible (you might need to adjust the selector based on the page structure)
//  await page.waitForSelector('.helpers--auth-submit-button--W3Tqk');

// Click on the "Sign up" button
await page.click('.helpers--auth-submit-button--W3Tqk');


// Wait for a short moment to ensure the form submission process has started
await page.waitForTimeout(4000); // Adjust timing as needed

// Navigate to the Udemy homepage after form submission
await page.goto('https://www.udemy.com/');

await page.waitForTimeout(4000); // Adjust timing as needed


await page.click('.ud-btn-brand');

await page.waitForTimeout(4000); // Adjust timing as needed

await page.goto(`${mainLink}`);

await page.waitForTimeout(4000); // Adjust timing as needed


// Take a screenshot and save it to the current directory
await page.screenshot({ path: 'screenshot.png', fullPage: true });


await page.waitForSelector('.generic-purchase-section--buy-box-main--W9rN0 > div > div:nth-child(2) > div > div > div > span:nth-child(2)');

// Evaluate the page context to get the text content of the element
const textContent = await page.evaluate(() => {
  const element = document.querySelector(".generic-purchase-section--buy-box-main--W9rN0 > div > div:nth-child(2) > div > div > div > span:nth-child(2)");
  return element ? element.textContent : 'Element not found';
});

// Log the text content to the console
console.log(textContent);


  // await browser.close();
})();


// node index.js