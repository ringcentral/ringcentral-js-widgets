import SmallCallControl from './index';
/* global $ */
export default class ClickLeftCallLogSectionInfo extends SmallCallControl {
  static get steps() {
    return [
      this.click,
    ];
  }
}
