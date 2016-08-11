import flipSelector from '../Flip/selector';
import transferSelector from '../Transfer/selector';
import callInfoSelector from '../CallInfo/selector';


export default (state, props, phone) => (
  {
    // TODO: for function, memorized it
    bye: () => phone.webphone.bye(),
    park: (...args) => phone.webphone.park(...args),
    record: (...args) => phone.webphone.record(...args),
    hold: (...args) => phone.webphone.hold(...args),
    mute: (...args) => phone.webphone.mute(...args),
    dtmf: (...args) => phone.webphone.dtmf(...args),
    operationStatus: state.common.webphone.operation.status,
    disabledOperation: state.common.webphone.operation.disabled,
    webphoneStatus: state.common.webphone.status,

    flip: flipSelector(state, props, phone),
    Transfer: transferSelector(state, props, phone),
    callInfo: callInfoSelector(state, props, phone),
  }
);
