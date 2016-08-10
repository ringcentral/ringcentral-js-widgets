export default (state, props, phone) => (
  {
    flip: (...args) => phone.webphone.flip(...args),
    flipNumbers: state.common.user.forwardingNumbers
              .filter(number => number.features.indexOf('CallFlip') > -1),
  }
);
