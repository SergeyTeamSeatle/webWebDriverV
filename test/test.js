const {Builder, By} = require("selenium-webdriver")
const chai = require('chai');
chai.should();
const until = require("selenium-webdriver").until
const act = require("../src/act")
const chrome = require('selenium-webdriver/chrome');
let chromeOpts = new chrome.Options();

const firefox = require('selenium-webdriver/firefox');
let firefoxOpts = new firefox.Options();

const startUrl = "https://chromedriver.chromium.org/home"
const locators = require("../data/locators.json")
const script = 'arguments[0].style.backgroundColor = "red"'
const windowSize = require("../test_conf.json").windowSize

const timeout = require("../test_conf.json").timeOut
const titles = require("../data/title_list.json")
const browsers = require("../data/brouser.json")

const testOrder = ["css", "xpath"]

async function getTitle(driver, by) {
    await driver.wait(until.elementLocated(by), 10000);
    let title = await driver.findElement(by)
    return title.getText()
}


async function checkTitle(driver, typeLocators, test) {
    await driver.get(startUrl);
    let titleText = await getTitle(driver, By[typeLocators](locators.title[typeLocators]))
    titleText.should.be.eql(titles.ChromeDriver.title, titles.ChromeDriver.errorMsg)
    let button = await driver.findElement(By[typeLocators](locators.buttonExtensions[typeLocators]))
    await button.click()
    let titleText2 = await getTitle(driver, By[typeLocators](locators.title[typeLocators]))
    titleText2.should.be.eql(titles.ChromeExtensions.title, titles.ChromeExtensions.errorMsg)
    let title2 = await driver.findElement(By[typeLocators](locators.title[typeLocators]))
    await driver.executeScript(script, title2)
    let encodedString = await driver.takeScreenshot();
    await act.screen(encodedString, test)
}


describe('selenium', function () {
    this.timeout(timeout);
    before(async function () {
        await act.screenFolder()
    })

    describe('function_experimental', function () {
        for (let browserIndex = 0; browserIndex < browsers.length; browserIndex++) {
            describe(browsers[browserIndex], function () {
                let driver
                before(async function () {
                    driver = await new Builder().forBrowser(browsers[browserIndex]).setChromeOptions(chromeOpts.headless()).setFirefoxOptions(firefoxOpts.headless()).build();
                    await driver.manage().window().setRect(windowSize);
                })
                after(async function () {
                    await driver.quit();
                })

                for (let testIndex = 0; testIndex < testOrder.length; testIndex++) {
                    it(testOrder[testIndex] + ' selectors_experimental', async function () {
                        await checkTitle(driver, testOrder[testIndex], this.test)
                    });
                }
            })
        }
    })

    describe('chrome', function () {
        let driver
        before(async function () {
            driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOpts.headless()).build();
            await driver.manage().window().setRect(windowSize);
        })
        after(async function () {
            await driver.quit();
        })
        it('css selectors', async function () {
            await driver.get(startUrl);
            await driver.wait(until.elementLocated(By.css(locators.title.css)), 10000);
            let title = await driver.findElement(By.css(locators.title.css))
            let titleText = await title.getText()
            titleText.should.be.eql(titles.ChromeDriver.title, titles.ChromeDriver.errorMsg)
            await driver.findElement(By.css(locators.buttonExtensions.css)).click()
            await driver.wait(until.elementLocated(By.css(locators.title.css)), 10000);
            let title2 = await driver.findElement(By.css(locators.title.css))
            let titleText2 = await title2.getText()
            titleText2.should.be.eql(titles.ChromeExtensions.title, titles.ChromeExtensions.errorMsg)
            await driver.executeScript(script, title2)
            let encodedString = await driver.takeScreenshot();
            await act.screen(encodedString, this.test)
        });
        it('xpath selectors', async function () {
            await driver.get(startUrl);
            await driver.wait(until.elementLocated(By.xpath(locators.title.xpath)), 10000);
            let title = await driver.findElement(By.xpath(locators.title.xpath))
            let titleText = await title.getText()
            titleText.should.be.eql(titles.ChromeDriver.title, titles.ChromeDriver.errorMsg)
            await driver.findElement(By.xpath(locators.buttonExtensions.xpath)).click()
            await driver.wait(until.elementLocated(By.xpath(locators.title.xpath)), 10000);
            let title2 = await driver.findElement(By.xpath(locators.title.xpath))
            let titleText2 = await title2.getText()
            titleText2.should.be.eql(titles.ChromeExtensions.title, titles.ChromeExtensions.errorMsg)
            await driver.executeScript(script, title2)
            let encodedString = await driver.takeScreenshot();
            await act.screen(encodedString, this.test)
        });
    });
    describe('firefox', function () {
        let driver
        before(async function () {
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(firefoxOpts.headless()).build();
            await driver.manage().window().setRect(windowSize);

        })
        after(async function () {
            await driver.quit();
        })
        it('css selectors', async function () {
            await driver.get(startUrl);
            await driver.wait(until.elementLocated(By.css(locators.title.css)), 10000);
            let title = await driver.findElement(By.css(locators.title.css))
            let titleText = await title.getText()
            titleText.should.be.eql(titles.ChromeDriver.title, titles.ChromeDriver.errorMsg)
            await driver.findElement(By.css(locators.buttonExtensions.css)).click()
            await driver.wait(until.elementLocated(By.css(locators.title.css)), 10000);
            let title2 = await driver.findElement(By.css(locators.title.css))
            let titleText2 = await title2.getText()
            titleText2.should.be.eql(titles.ChromeExtensions.title, titles.ChromeExtensions.errorMsg)
            await driver.executeScript(script, title2)
            let encodedString = await driver.takeScreenshot();
            await act.screen(encodedString, this.test)

        });
        it('xpath selectors', async function () {
            await driver.get(startUrl);
            await driver.wait(until.elementLocated(By.xpath(locators.title.xpath)), 10000);
            let title = await driver.findElement(By.xpath(locators.title.xpath))
            let titleText = await title.getText()
            titleText.should.be.eql(titles.ChromeDriver.title, titles.ChromeDriver.errorMsg)
            await driver.findElement(By.xpath(locators.buttonExtensions.xpath)).click()
            await driver.wait(until.elementLocated(By.xpath(locators.title.xpath)), 10000);
            let title2 = await driver.findElement(By.xpath(locators.title.xpath))
            let titleText2 = await title2.getText()
            titleText2.should.be.eql(titles.ChromeExtensions.title, titles.ChromeExtensions.errorMsg)
            await driver.executeScript(script, title2)
            let encodedString = await driver.takeScreenshot();
            await act.screen(encodedString, this.test)
        });
    });
});
