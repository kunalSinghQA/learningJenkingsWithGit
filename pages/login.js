require("dotenv").config();
const { executeStep } = require("../utilities/actions");
const data = require("../data/data.json");
exports.Login = class Login {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.frame = page.frameLocator('//iframe[@id="ifmail"]');
    this.email = page.locator("//input[@name='emailid']");
    this.rememberMeCheckbox = page.locator("//label[@class='rememberme']");
    this.IagreeTermsCheckBox = page.locator(
      "//label[@class='rememberme privacy_policy']"
    );
    this.confirmButton = page.locator("//button[@class='signinbtn']");
    this.password = page.locator("//input[@name='password']");
    this.signInButton = page.locator("//button[@class='signinbtn']");
    this.yopmailInputBox = page.locator(
      '//input[@placeholder="Enter your inbox here"]'
    );
    this.arrowbutton = page.locator(
      '//button[@title="Check Inbox @yopmail.com"]'
    );
    this.mailTextDiv = this.frame.locator("//div[@id='mail']/div");
    this.otpInputField = page.locator(
      '//input[@placeholder="Please Enter the Email OTP"]'
    );
    this.closeButton = page.locator("//span[@class='successtenantbtn']");
    this.modalPopup = page.locator('//div[@class="modal-body "] ');
    this.dashboardText = page.locator('//div[@class="Dashboard"] ');
    this.userText = page.locator("//span[@class='user-text']");
    this.userName = page.locator("//span[@class='user-name']");
    this.howardHoughsLogo = page.locator("//img[@class='logo']");
    this.welcometoHowardHughesText = page.locator("//h3[@class='mainHeader']");
    this.signInToManageText = page.locator("//h3[@class='content1']");
    // this.emailIdLable = page.locator("//label[text()='Email Id']");
    this.emailIncorrectMessage = page.locator(
      "//div[text()='*Entered email incorrect']"
    );
    this.errorMessagePleaseAgree = page.locator("//div[@class='error']");
    this.passwordLable = page.locator("//label[@class='password-label1']");
    this.forgotPassword = page.locator("//span[@class='forgot']");
    this.passwordErrorMessage = page.locator(
      "//div[text()='Incorrect password']"
    );
    this.passwordFeild = page.locator("//input[@name='password']");
    this.incorrectPassword = page.locator("//div[text()='Incorrect password']");
    //
    this.rememberMeCheckbox = page.locator("//label[@class='rememberme']");
    this.otpInputField = page.locator(
      '//input[@placeholder="Please Enter the Email OTP"]'
    );
    this.otpTimer = page.locator("//span[@class='extimmer']");
    this.resendOtplink = page.locator("//span[@class='resendotp  ']");
    this.otpConfirmButton = page.locator("//button[@class='signinbtn']");
    this.otpSentText = page.locator("//p[@class='otpsucess']");
    this.resendOtpDisabled = page.locator(
      "//span[@class='resendotp disabletop']"
    );
    this.otpResendText = page.locator("//span[text()='OTP Resent']");
    this.otpInputField = page.locator("//input[@name='code']");
    this.incorrectOtpMessage = page.locator(
      "//div[text()='*Entered OTP incorrect']"
    );
    this.spinner = page.locator("//span[@class='spinner']");
    this.leaseId = page.locator("(//span[text()='Lease ID:'])[1]");
    this.property = page.locator("(//p[@class='leaseagre_prop'])[1]");
    this.recentTransactionList = page.locator(
      "(//div[@class='upcomepay '])[1]"
    );

    this.authorisiedButton = page.locator(
      "(//button[@class='upcomingpaybtn'])[1]"
    );
    this.rentpaymentPopupScreen = page.locator("//div[@class='modal-dialog']");
    this.rentpaymentPopupScreenCrossMark = page.locator(
      "//img[@alt='popup_close']"
    );
    this.rentpaymentPopupScreenLeaseId = page.locator(
      "//th[text()='Lease ID']"
    );
    this.rentpaymentPopupScreenLeaseDate = page.locator("//th[text()='Date']");
    this.rentpaymentPopupScreenLeaseTransactionAmount = page.locator(
      "//th[text()='Transaction Amount']"
    );
    this.paymentmethod = page.locator("//p[text()='MetaMask Wallet']");
    this.authorisePaymentButton = page.locator(
      "(//button[text()='Authorize Payment'])[2]"
    );
  }
  launchApplication = async () => {
    await executeStep(
      this.test,
      await this.page,
      "navigate",
      `Navigating to ${process.env.BASE_URL}`,
      [process.env.BASE_URL]
    );
  };
  loginwithInvalidEmailAddress = async () => {
    await executeStep(
      this.test,
      this.email,
      "fill",
      `Entering email: ${process.env.INCORRECT_USER_NAME}`,
      [process.env.INCORRECT_USER_NAME]
    );
    await executeStep(
      this.test,
      this.IagreeTermsCheckBox,
      "click",
      `clicking on IagreeTermsCheckBox button`
    );

    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
  };
  loginWithoutEnteringEmail = async () => {
    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
  };
  ClickOnForgotPassword = async () => {
    await executeStep(
      this.test,
      this.forgotPassword,
      "click",
      `clicking on forgot password`
    );
  };
  launchEmailPage = async () => {
    await executeStep(
      this.test,
      await this.page,
      "navigate",
      `Navigating to  ${process.env.YOPMAIL_URL}`,
      [process.env.YOPMAIL_URL]
    );
  };
  openNewPageForEmail = async (yopmailUserName) => {
    await executeStep(
      this.test,
      this.yopmailInputBox,
      "click",
      `clicking on yopmail email input box`
    );
    await executeStep(
      this.test,
      this.yopmailInputBox,
      "fill",
      `filling emial in yopmail emial input box`,
      yopmailUserName
    );
    await executeStep(
      this.test,
      this.arrowbutton,
      "click",
      `clicking on arrow button in email input box`
    );
  };
  expireTime2Min = async () => {
    await this.page.waitForTimeout(120000);
  };
  clickingOnResendOtp = async () => {
    await executeStep(
      this.test,
      this.resendOtplink,
      "click",
      "clicking on resend otp "
    );
  };
  loginWithValidEmail = async () => {
    await executeStep(
      this.test,
      this.email,
      "fill",
      `Entering email: ${process.env.USER_NAME}`,
      [process.env.USER_NAME]
    );
    await executeStep(
      this.test,
      this.rememberMeCheckbox,
      "check",
      `Checking on remeber me checkbox`
    );
    await executeStep(
      this.test,
      this.IagreeTermsCheckBox,
      "check",
      `Checking on I agree Terms and Conditions checkbox`
    );
    await this.page.waitForTimeout(3000);
    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
  };
  signinWithValidEmailWithoutClickOnIagreeCheckbox = async () => {
    await executeStep(
      this.test,
      this.email,
      "fill",
      `Entering email: ${process.env.USER_NAME}`,
      [process.env.USER_NAME]
    );
    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
  };
  signinWithoutEnteringPassword = async () => {
    await executeStep(
      this.test,
      this.signInButton,
      "click",
      `clicking on signin button`
    );
  };
  //tc-12
  signinwithInvalidPassword = async () => {
    await executeStep(
      this.test,
      this.password,
      "fill",
      `Entering password: ${process.env.Invalid_Password}`,
      [process.env.Invalid_Password]
    );

    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
  };

  toCheckHiddenPassword = async () => {
    await executeStep(
      this.test,
      this.password,
      "fill",
      `filling password: ${process.env.PASSWORD}`,
      [process.env.PASSWORD]
    );
    await executeStep(
      this.test,
      this.signInButton,
      "click",
      "clicking on password submit"
    );
  };
  withoutEnteringOtp = async () => {
    await executeStep(
      this.test,
      this.otpConfirmButton,
      "click",
      `clicking on otp confirm button`
    );
  };
  signInWithValidCredentials = async () => {
    await executeStep(this.test, this.email, "fill", `Entering email`, [
      process.env.USER_NAME,
    ]);
    await executeStep(
      this.test,
      this.rememberMeCheckbox,
      "check",
      `Checking on remeber me checkbox`
    );
    await executeStep(
      this.test,
      this.IagreeTermsCheckBox,
      "check",
      `Checking on remeber me checkbox`
    );
    await this.page.waitForTimeout(2000);
    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
    await this.page.waitForTimeout(2000);
    await executeStep(
      this.test,
      this.passwordFeild,
      "fill",
      `Entering password`,
      [process.env.PASSWORD]
    );
    await executeStep(
      this.test,
      this.signInButton,
      "click",
      `clicking on signin button`
    );
  };
  fillingResetPassword = async (resetPwd) => {
    await executeStep(
      this.test,
      this.password,
      "fill",
      "filling the reset password",
      [resetPwd]
    );
    await executeStep(
      this.test,
      this.signInButton,
      "click",
      "clicking on password submit"
    );
  };
  fillingInvalidOTP = async () => {
    await executeStep(
      this.test,
      this.otpInputField,
      "fill",
      "filling the invalid otp",
      [process.env.invalidOTP]
    );
    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
  };
  fillingOTP = async (otp) => {
    await executeStep(
      this.test,
      this.otpInputField,
      "fill",
      "filling the otp ",
      [otp]
    );
    await executeStep(
      this.test,
      this.confirmButton,
      "click",
      `clicking on confirm button`
    );
  };
  closingThePopupwindow = async () => {
    await executeStep(this.test, this.closeButton, "click", `closing on popup`);
    await this.page.waitForTimeout(5000);
  };
  EmailInnerText = async () => {
    const otpInnerText = await this.mailTextDiv.innerText();
    return otpInnerText;
  };
};
