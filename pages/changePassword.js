require("dotenv").config();
const { executeStep } = require("../utilities/actions");

exports.changePasswordPage = class changePasswordPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.changePassword = page.locator("//span[text()='Change Password']");
    this.oldPasswordlabel = page.locator("//label[text()='Old Password']");
    this.newPassword = page.locator("//label[text()='New Password']");
    this.ConfirmNewPassword = page.locator(
      "//label[text()='Confirm New Password']"
    );
    this.submitButton = page.locator("//div[text()='Submit']");
    this.PasswordGuidelines = page.locator(
      "//h3[text()='Password Guidelines']"
    );
  }
};
