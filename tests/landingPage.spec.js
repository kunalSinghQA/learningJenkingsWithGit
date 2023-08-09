const { test, expect, chromium } = require("@playwright/test");
const Sections = require("../pages/pageIndex");
const data = require("../data/data.json");
require("dotenv").config();

test("TC_Sign in_01,02,03,05,06,07,08,09,10,11,12,13 ", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new Sections.Login(page, test);
  await loginPage.launchApplication();
  await expect(
    loginPage.howardHoughsLogo,
    "Verifying howard Hughes Logo should be visible"
  ).toBeVisible();
  await expect(
    loginPage.welcometoHowardHughesText,
    "Verifying Sign in to Howard Hughes Text should have text"
  ).toBeVisible();
  await expect(loginPage.welcometoHowardHughesText).toHaveCSS(
    "font-family",
    "Helvetica, sans-serif"
  );
  await expect(
    loginPage.email,
    "verifying email input field should be visible"
  ).toBeVisible();
  await expect(
    loginPage.email,
    "verifying email input field should be visible"
  ).toBeEditable();
  await expect(
    loginPage.rememberMeCheckbox,
    "verifying remember me check box should be visible"
  ).toBeVisible();
  await expect(
    loginPage.IagreeTermsCheckBox,
    "verifying I agree trems check box should be visible"
  ).toBeVisible();
  await expect(
    loginPage.rememberMeCheckbox,
    "verifying rememberMe CheckBox should be unchecked"
  ).not.toBeChecked();
  await expect(
    loginPage.IagreeTermsCheckBox,
    "verifying IagreeTermsCheckBox should be unchecked"
  ).not.toBeChecked();
  await expect(
    loginPage.confirmButton,
    "verifying confirm Button should be visible"
  ).toBeVisible();
  await loginPage.loginWithoutEnteringEmail();
  await expect(loginPage.email).toHaveCSS("border-color", "rgb(185, 3, 3)");
  await expect(loginPage.errorMessagePleaseAgree).toHaveCSS(
    "color",
    "rgb(185, 3, 3)"
  );
  await loginPage.loginwithInvalidEmailAddress();
  await expect(loginPage.email).toHaveCSS("border-color", "rgb(185, 3, 3)");
  await expect(
    loginPage.IagreeTermsCheckBox,
    "verifying IagreeTermsCheckBox should be unchecked"
  ).toBeChecked();
  await loginPage.signinWithValidEmailWithoutClickOnIagreeCheckbox();
  await loginPage.loginWithValidEmail();
  await loginPage.signinWithoutEnteringPassword();
  await expect(
    loginPage.passwordFeild,
    "verifying password Feild border with red color"
  ).toHaveCSS("border-color", "rgb(185, 3, 3)");
  await loginPage.signinwithInvalidPassword();
  await expect(
    loginPage.passwordErrorMessage,
    "verifying incorrect Password should be visible"
  ).toBeVisible();
  await expect(
    loginPage.incorrectPassword,
    "verifying incorrect Password message should be visible"
  ).toHaveCSS("color", "rgb(185, 3, 3)");
  await expect(
    loginPage.passwordFeild,
    "verifying password Feild border with red color"
  ).toHaveCSS("border-color", "rgb(185, 3, 3)");
  await expect(loginPage.password).toHaveAttribute("type", "password");
  await loginPage.toCheckHiddenPassword();
  await expect(
    loginPage.otpSentText,
    "verifying otp sent  text is visible"
  ).toHaveText(data.otpData.otpsentText);
  await expect(
    loginPage.otpInputField,
    "verifying otp input feild  text is visible"
  ).toBeVisible();
  await expect(
    loginPage.otpTimer,
    "verifying otp time expires with red color"
  ).toHaveCSS("color", "rgb(185, 3, 3)");
  await expect(
    loginPage.resendOtplink,
    "verifying resend Otp link should be visible"
  ).toBeVisible();
  await expect(
    loginPage.otpConfirmButton,
    "verifying otp Confirm button should be visible"
  ).toBeVisible();
  await loginPage.withoutEnteringOtp();
  await expect(
    loginPage.otpInputField,
    "verifying incorrect otp message should be visible"
  ).toHaveAttribute("placeholder", "Please enter the correct Email OTP");
  await loginPage.fillingInvalidOTP();
  await expect(
    loginPage.otpInputField,
    "verifying password Feild border with red color"
  ).toHaveCSS("border", "1px solid rgb(185, 3, 3)");
  await expect(
    loginPage.incorrectOtpMessage,
    "verifying the incorrectOtpMessage be visible"
  ).toBeVisible();
  await loginPage.clickingOnResendOtp();
  await expect(loginPage.otpResendText).toBeVisible();
  await page.waitForSelector("text=OTP Resent", {
    timeout: 2000,
  });
  await expect(loginPage.otpResendText).toHaveCSS("color", "rgb(0, 118, 180)");
  await expect(loginPage.resendOtpDisabled).toHaveCSS(
    "color",
    "rgb(167, 167, 167)"
  );
  await expect(
    loginPage.otpTimer,
    "verifying otp time expires with red color"
  ).toHaveCSS("color", "rgb(185, 3, 3)");
  await loginPage.expireTime2Min();
  await expect(loginPage.resendOtplink).toBeVisible();
  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const newTab = await context2.newPage();
  const emailTab = new Sections.Login(newTab, test);
  await emailTab.launchEmailPage();
  await emailTab.openNewPageForEmail([data.masterData.yopmailUserName]);
  const emailOTPText = await emailTab.EmailInnerText();
  const otp = await emailOTPText
    .substr(emailOTPText.length - 7)
    .replaceAll(/\s/g, "");
  //closing second tabs
  await newTab.close();
  await context2.close();
  await browser2.close();
  await loginPage.fillingOTP(otp);
});
test.skip("TC_Sign in_14,15 To check the user is able to received password on clicking the Forogt Password", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new Sections.Login(page, test);
  await loginPage.launchApplication();
  await loginPage.loginWithValidEmail();
  await loginPage.ClickOnForgotPassword();
  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const newTab = await context2.newPage();
  const emailTab = new Sections.Login(newTab, test);
  await emailTab.launchEmailPage();
  await emailTab.openNewPageForEmail([data.masterData.yopmailUserName]);
  const resetPasswordText = await emailTab.EmailInnerText();
  const resetPwd = await resetPasswordText
    .substr(resetPasswordText.length - 10)
    .replaceAll(/\s/g, "");
  await loginPage.fillingResetPassword(resetPwd);
  await page.waitForTimeout(3000);
  //closing second tabs
  await newTab.close();
  await context2.close();
  await browser2.close();
  await expect(
    loginPage.otpSentText,
    "verifying otp sent  text is visible"
  ).toHaveText(data.otpData.otpsentText);
  await expect(
    loginPage.otpInputField,
    "verifying otp input feild  text is visible"
  ).toBeVisible();
  await expect(
    loginPage.otpTimer,
    "verifying otp time expires with red color"
  ).toHaveCSS("color", "rgb(185, 3, 3)");
  await expect(
    loginPage.resendOtplink,
    "verifying resend Otp link should be visible"
  ).toBeVisible();
  await expect(
    loginPage.otpConfirmButton,
    "verifying otp Confirm button should be visible"
  ).toBeVisible();
});
test.skip("TC_Sign in_17 To check the user able to login with the same OTP after 5 min", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new Sections.Login(page, test);
  await loginPage.launchApplication([process.env.BASE_URL]);
  await loginPage.signInWithValidCredentials();
  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const newTab = await context2.newPage();
  const emailTab = new Sections.Login(newTab, test);
  await emailTab.launchEmailPage();
  await emailTab.openNewPageForEmail([data.masterData.yopmailUserName]);
  const emailOTPText = await emailTab.EmailInnerText();
  const otp = await emailOTPText
    .substr(emailOTPText.length - 7)
    .replaceAll(/\s/g, "");
  //closing second tabs
  await newTab.close();
  await context2.close();
  await browser2.close();
  await page.waitForTimeout(300000);
  await loginPage.fillingOTP(otp);
});
test("TC_Sign in_26 To check user is able to check the notifications", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new Sections.Login(page, test);
  await loginPage.launchApplication([process.env.BASE_URL]);
  await loginPage.signInWithValidCredentials();
  //second tab
  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const newTab = await context2.newPage();
  const emailTab = new Sections.Login(newTab, test);
  await emailTab.launchEmailPage();
  await emailTab.openNewPageForEmail([data.masterData.yopmailUserName]);
  const emailOTPText = await emailTab.EmailInnerText();
  const otp = await emailOTPText
    .substr(emailOTPText.length - 7)
    .replaceAll(/\s/g, "");
  await loginPage.fillingOTP(otp);
  //closing second tabs
  await newTab.close();
  await context2.close();
  await browser2.close();
  const dashboard = new Sections.dashboardPage(page, test);
  await dashboard.clickOnBellIcon();
  await expect(dashboard.leaseInnerNotification).toBeVisible();
});
test('TC_Sign in_28 To check the "Payments" visibilty', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new Sections.Login(page, test);
  await loginPage.launchApplication([process.env.BASE_URL]);
  await loginPage.signInWithValidCredentials();
  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const newTab = await context2.newPage();
  const emailTab = new Sections.Login(newTab, test);
  await emailTab.launchEmailPage();
  await emailTab.openNewPageForEmail([data.masterData.yopmailUserName]);
  const emailOTPText = await emailTab.EmailInnerText();
  const otp = await emailOTPText
    .substr(emailOTPText.length - 7)
    .replaceAll(/\s/g, "");
  await loginPage.fillingOTP(otp);
  //closing second tabs
  await newTab.close();
  await context2.close();
  await browser2.close();
  const payments = new Sections.paymentsPage(page, test);
  await payments.clickingOnPaymentLink();
  await page.waitForTimeout(4000);
  await expect(
    payments.lease_Date_Range,
    "verifying the lease date range should be visible"
  ).toBeVisible();
  await expect(
    payments.Amount,
    "verifying the lease date range should be visible"
  ).toBeVisible();
  await payments.clickingOnTransactionHistory();
  await expect(
    payments.transactionId,
    "verifying the transaction id should be visible"
  ).toBeVisible();
  await expect(
    payments.leaseIdInTransactionHistory,
    "verifying the lease id should be visible"
  ).toBeVisible();
  await expect(
    payments.transactionDate,
    "verifying the transaction date should be visible"
  ).toBeVisible();
  await expect(
    payments.transactionTime,
    "verifying the transaction time should be visible"
  ).toBeVisible();
  await expect(
    payments.transactionAmount,
    "verifying the transaction amount should be visible"
  ).toBeVisible();
});
