export interface PendoGuideOptions {
  /**
   * The marketplace review link for the app, it will be used to open the review page when the user click the share review button
   */
  reviewLink?: string;
  /**
   * The guide names that need to be checked when the app is loaded
   */
  checkGuideNames?: string[];
}
