require("dotenv").config();
const { executeStep } = require("../utilities/actions");

exports.paymentsPage = class paymentsPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.paymentLink = page.locator("//span[text()='Payments']");
    this.headingOfPayments = page.locator("//h3[text()='Payments']");
    this.chargeSchedule = page.locator("//div[text()='Charge Schedule']");
    this.transcactionHistory = page.locator(
      "//div[text()='Transaction History']"
    );
    this.LeaseDateRange = page.locator("//th[text()='Lease Date Range']");
    this.Amount = page.locator("//th[text()='Amount']");
    //tc-28
    this.lease_Date_Range = page.locator('//th[text()="Lease Date Range"]');
    this.Amount = page.locator('//th[text()="Amount"]');
    this.lease_property_active = page.locator(
      '//div[@class="lease_property active"]'
    );
    this.lease_property_1 = page.locator('//div[@class="lease_property "][1]');
    this.lease_property_2 = page.locator('//div[@class="lease_property "][2]');
    //payment/transaction
    //tc-30
    this.paymentLink = page.locator('//span[text()="Payments"]');
    this.transactionhistory = page.locator(
      '//div[text()="Transaction History"]'
    );
    this.leaseIdInTransactionHistory = page.locator("//th[text()='Lease ID']");
    this.transactionId = page.locator('//th[text()="Transaction Id"]');
    this.leaseID = page.locator('(//span[text()="Lease ID:"])[1]');
    this.transactionDate = page.locator('//th[text()="Date"]');
    this.transactionTime = page.locator('//th[text()="Time"]');
    this.transactionAmount = page.locator('//th[text()="Amount"]');
    this.table_Body = page.locator('//tbody[@class="tbaodyclass"] tr');
    this.table_Switch = page.locator('//th[text()="Amount"]');
    this.row_count = page.locator(`//tr[@class='table-row']`);
    this.table_row = (index) =>
      page.locator(`//tr[@class='table-row'][${index}]`);
    this.charge_schedule = page.locator('//div[text()="Charge Schedule"]');
  }
  paymentOption = async () => {
    await this.page.waitForTimeout(5000);
    await executeStep(
      this.test,
      this.paymentLink,
      "click",
      `clicking on payment Link`
    );
  };
  transactionHistory = async () => {
    await this.page.waitForTimeout(5000);
    await executeStep(
      this.test,
      this.transcactionHistory,
      "click",
      `clicking on transcaction History`
    );
  };
  clickingOnPaymentLink = async () => {
    await executeStep(
      this.test,
      this.paymentLink,
      "click",
      `clicking on Payment link`
    );
  };
  clickingOnTransactionHistory = async () => {
    await executeStep(
      this.test,
      this.transactionhistory,
      "click",
      `clicking on Payment link`
    );
  };
};
