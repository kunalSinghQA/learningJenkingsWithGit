require("dotenv").config();
const { executeStep } = require("../utilities/actions");

exports.dashboardPage = class dashboardPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.leaseIdNo = page.locator("(//span[text()='Lease ID:']//parent::p)[1]");
    this.upcomingPayments = page.locator("(//div[@class='upcomepay '])[1]");
    this.nextpayment = page.locator("//p[text()='Your Next Payment']");
    this.propertyName = page.locator("//p[@class='leaseagre_prop']");
    this.propertyAddress = page.locator("//p[@class='assetadetais']");
    this.propertyImage1 = page.locator("//img[@class='slidepoint'][1]");
    this.propertyImage2 = page.locator("//img[@class='slidepoint'][2]");
    this.propertyImage3 = page.locator("//img[@class='slidepoint'][3]");

    this.propertyImage4 = page.locator("//img[@class='slidepoint'][4]");
    this.leaseAgreementDate = page.locator("//div[@class='leaseagre']");
    this.blockTransactionId = page.locator("//div[@class='blockid-com']");
    this.status = page.locator("//div[@class='activestatus']");
    this.blockExplorerLink = page.locator(
      "//a[text()='View On Block Explorer']"
    );
    this.authorizePaymentbutton = page.locator(
      "//button[text()='Authorize Payment']"
    );
    this.notificationBellIcon = page.locator(
      "//img[@alt='notification_image']"
    );
    this.leaseInnerNotification = page.locator(
      "(//div[@class='notification_inner'])[1]"
    );
    this.leaseNotification = page.locator(
      "(//h4[text()='Lease agreement has been initiated for the property Woodlands Landscape Maint.'])[1]"
    );
    this.notificationPopupCloseIcon = page.locator("//img[@alt='popup_close']");
    this.successNotificationPopup = page.locator(
      "//div[@class='metamask_head']"
    );
    this.getTextMaticBtn = page.locator("//button[text()='Get Test Matic']");
    this.TestUSDCBtn = page.locator("//button[text()='Test USDC']");
    this.ConnectMetamaskBtn = page.locator(
      "//button[text()='Connect Metamask']"
    );
    this.logoutOption = page.locator("//span[text()='logout']");
    this.acceptLeaseRequestBtn = page.locator(
      "//span[@class='successtenantbtn']"
    );
    this.successLogo = page.locator("//img[@alt='succesicon']");
    this.successText = page.locator("//h3[text()='Success']");
    this.leaseSubheaderText = page.locator(
      "//p[text()='Lease agreement executed on blockchain successfully']"
    );
    this.propertyName = page.locator("//p[text()='Property Name']");
    this.landlordName = page.locator("//p[text()='Landlord Name']");
    this.leaseId = page.locator("//p[text()='Lease ID']");
    this.agreementStartDate = page.locator(
      "//p[text()='Agreement Start Date']"
    );
    this.agreementEndDate = page.locator("//p[text()='Agreement End Date']");
    this.blockTransactionId = page.locator(
      "//p[text()='Block Transaction ID']"
    );
    this.timeStamp = page.locator("//p[text()='Timestamp']");
    this.closeSuccessPopupBtn = page.locator(
      "//button[@class='successtenantbtn']"
    );
    //tc-53
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

  clickOnBellIcon = async () => {
    await executeStep(
      this.test,
      this.notificationBellIcon,
      "click",
      `clicking on the notification bell icon`
    );
  };

  clickingOnNotification = async () => {
    await executeStep(
      this.test,
      this.notificationBellIcon,
      "click",
      `clicking on the notification bell icon`
    );
    await executeStep(
      this.test,
      this.leaseNotification,
      "click",
      `clicking on the content in the notification`
    );
  };
  closeSuccessNotification = async () => {
    await executeStep(this.test, this.leaseInnerNotification, "click");
    await executeStep(
      this.test,
      this.closeSuccessPopupBtn,
      "click",
      `clicking on popup close icon in notification `
    );
  };

  clickOnAcceptLeaseRequest = async () => {
    await executeStep(
      this.test,
      this.acceptLeaseRequestBtn,
      "click",
      `clicking on the Accept Lease Request Button`
    );
    await this.page.waitForTimeout(4000);
  };
  clickingOnAuthorisingButton = async () => {
    await executeStep(
      this.test,
      this.authorisiedButton,
      "click",
      `clicking on authorizePaymentbutton button`
    );
  };
};
