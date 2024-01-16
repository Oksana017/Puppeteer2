const { clickElement, getText } = require("./lib/commands.js");

  let page;
  
    beforeEach(async () => {
      page = await browser.newPage();
      await page.goto("https://qamid.tmweb.ru/client/index.php");
      await clickElement(page, "a:nth-child(2)");
      await clickElement(page, "li:nth-child(3)");
    });
  
    afterEach(() => {
      page.close();
    });
  
describe("Happy Path", () => {
    test("Should book one ticket", async () => {
      await clickElement(page, "div:nth-child(8) > span:nth-child(4)");
      await clickElement(page, "button.acceptin-button");
      const confirmBtn = await getText(page, "button");
      expect(confirmBtn).toContain("Получить код бронирования");
    });

    test("Should book two tickets", async () => {
      await clickElement(page, "div:nth-child(7) > span:nth-child(3)");
      await clickElement(page, "div:nth-child(3) > span:nth-child(6)");
      await clickElement(page, "button.acceptin-button");
      const actual = await getText(page, "h2");
      expect(actual).toContain("Вы выбрали билеты:");
    });
});  
  
describe("Sad Path", () => {
    test("Should not book unavailable seat", async () => {
      await clickElement(page, "div:nth-child(5) > span:nth-child(8)");
      const actual = await page.$eval("button.acceptin-button", (link) => link.getAttribute("disabled"));
      expect(actual).toEqual(null);
    });
}); 