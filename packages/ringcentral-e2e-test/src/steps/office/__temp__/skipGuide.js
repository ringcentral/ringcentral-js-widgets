/* global $ */
export default class skipGuide {
  static async skip({ driver: { page } }) {
    //display UserGuide and skip(by default)
      await $(page).waitFor('[class*=components-UserGuide]');
      await $(page).click('[class*=styles_secondaryButton]');
      await $(page).waitFor('[class*=components-TabNavigationView]');
    
  }

  static get steps() {
    return [
      this.skip,
    ];
  }
}