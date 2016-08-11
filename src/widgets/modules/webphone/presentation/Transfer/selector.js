export default (state, props, phone) => (
  {
    transfer: (...args) => phone.webphone.transfer(...args),
  }
);
