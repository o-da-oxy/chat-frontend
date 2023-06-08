import { Builder, Capabilities } from 'selenium-webdriver';
import 'chromedriver';
import { expect } from 'chai';

describe('Home Page', function () {
  let driver: any;

  beforeEach(async function () {
    driver = await new Builder()
      .withCapabilities(Capabilities.chrome())
      .build();
    await driver.get('http://localhost:5173/');
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should display the title', async function () {
    const title = await driver.getTitle();
    expect(title).to.equal('ChatApp');
  });

  it('should display the description', async function () {
    const description = await driver.findElement({ className: 'description' }).getText();
    expect(description).to.equal('Make friends and improve your English!');
  });

  it('should display the "Get Started" button', async function () {
    const button = await driver.findElement({ className: 'get-started-button' });
    const buttonText = await button.getText();
    expect(buttonText).to.equal('Get Started!');
  });

  it('should navigate to login page when "Get Started" button is clicked', async function () {
    const button = await driver.findElement({ className: 'get-started-button' });
    await button.click();
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal('http://localhost:5173/login');
  });
});
