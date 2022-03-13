import * as Selenium from "selenium-webdriver";
import * as Chrome from "selenium-webdriver/chrome";
import * as ChromeDriver from "chromedriver";

export abstract class Webdriver {
  protected static driver: Selenium.ThenableWebDriver;

  static async boot() {
    let path = ChromeDriver.path;
    let service = new Chrome.ServiceBuilder(path).build();
    Chrome.setDefaultService(service);

    this.driver = new Selenium.Builder()
      .withCapabilities(Selenium.Capabilities.chrome())
      .build();

    this.driver.manage().window().maximize();

    this.initProccess();
  }

  private static async initProccess() {
    this.driver.get("http://www.google.com");

    this.wait();
  }

  /**
   * Wating for page is loaded.
   * @returns
   */
  private static async wait() {
    return this.driver.wait(async () => {
      await this.driver.executeAsyncScript(
        "return document.readyState",
        async (readyState: string) => {
          return readyState === "complete";
        }
      );
    });
  }
}
