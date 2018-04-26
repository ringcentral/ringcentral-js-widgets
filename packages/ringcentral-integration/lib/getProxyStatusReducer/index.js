import proxyStatuses from '../../enums/proxyStatuses';

export default function getProxyStatusReducer(types) {
  return (state = proxyStatuses.pending, { type }) => {
    switch (type) {
      case types.proxyInit:
        return proxyStatuses.initializing;

      case types.proxyInitSuccess:
        return proxyStatuses.ready;

      default:
        return state;
    }
  };
}
