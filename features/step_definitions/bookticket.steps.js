const puppeteer = require("puppeteer");
//const chai = require("chai");
//const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout, } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
  });
  
  After(async function () {
    if (this.browser) {
      await this.browser.close();
    }
  });

  Given("user is on {string} page", {timeout: 60000}, async function (string) {
    return await this.page.goto("https://qamid.tmweb.ru/client/index.php", {timeout: 60000});
  });

  When("user selects date", async function () {
    return await clickElement(this.page, "a:nth-child(2)");
  });

  When("user selects movie and time", async function () {
    return await clickElement(this.page, "li:nth-child(3)");
  });

  When("user selects one free seat", async function () {
    await clickElement(this.page, "div:nth-child(8) > span:nth-child(4)");
    return await clickElement(this.page, "button.acceptin-button");
  });

  When("user selects two free seats", async function () {
    await clickElement(this.page, "div:nth-child(7) > span:nth-child(3)");
    await clickElement(this.page, "div:nth-child(3) > span:nth-child(6)");
    return await clickElement(this.page, "button.acceptin-button");
  });

  When("user try to book unavailable seat", async function () {
    return await clickElement(this.page, "div:nth-child(5) > span:nth-child(8)");
  });

  Then("user sees the reservation button {string}", async function (string) {
    const actual = await getText(this.page, "button", string);
    const expected = await string;
    expect(actual).contain(expected);
  });

  Then("user sees text about chosen tickets {string}", async function (string) {
    const actual = await getText(this.page, "h2");
    const expected = await string;
    expect(actual).contain(expected);
  });

  Then("user sees the reservation button {string} is disabled", async function (string) {
    const button = await this.page.$eval("button.acceptin-button", (link) => link.getAttribute("disabled"));
    expect(button).equal(null);
  });
