import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import Enum from 'ringcentral-integration/lib/Enum';
import RcUIModule from '../../lib/RcUIModule';
import getReducer from './getReducer';


@Module({
  name: 'VideoUI',
  deps: [
    'RCVideo',
    'Locale'
  ],
})
export default class VideoUI extends RcUIModule {
  constructor({
    ...options
  }) {
    super({
      ...options,
    });
    // this.rcv = RCV;
    this._reducer = getReducer(this.actionTypes);
  }

  get _actionTypes() {
    return new Enum(
      [
        // 'setVideoTopic',
      ],
      'rCVUI',
    );
  }

  // @proxify
  // async setVideoTopic(e) {
  //   const topic = e.currentTarget.value;
  //   if (this.topic !== topic) {
  //     console.log('set topic', topic);
  //     this.store.dispatch({
  //       type: this.actionTypes.setVideoTopic,
  //       topic,
  //     });
  //   }
  // }

  // @proxify
  // async onScheduleBtnClick() {
  //   console.log('schedule meeting');
  //   this._video.schedule();
  // }


  // get topic() {
  //   return this.state.topic;
  // }


  getUIProps() {
    return {
    };
  }

  getUIFunctions() {
    return {
    };
  }
}
