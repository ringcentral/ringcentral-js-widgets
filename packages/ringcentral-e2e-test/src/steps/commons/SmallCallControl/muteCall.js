
import SmallCallControl from './index';
/* global $ */
export default class MuteCall extends SmallCallControl {
  static get steps() {
    return [
      this.mute,
    ];
  }
}
