
import SmallCallControl from './index';
export default class MuteCall extends SmallCallControl {
  static get steps() {
    return [
      this.mute,
    ];
  }
}
