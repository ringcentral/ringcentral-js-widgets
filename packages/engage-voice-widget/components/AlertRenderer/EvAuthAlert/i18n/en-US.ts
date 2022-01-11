import { messageTypes } from '../../../../enums';

export default {
  [messageTypes.NO_AGENT]:
    'This RC account has not being assigned any EV agent account and please contact your admin or supervisor.',
  [messageTypes.CONNECT_ERROR]: 'Authenticated error. Please retry later.',
  [messageTypes.UNEXPECTED_AGENT]:
    'This RC account has being assigned an unexpected EV agent account and please contact your admin or supervisor.',
  [messageTypes.INVALID_BROWSER]: 'WebSocket NOT supported by your browser.',
  [messageTypes.CONNECT_TIMEOUT]: 'Authorization timeout. Please retry later.',
  [messageTypes.OPEN_SOCKET_ERROR]: 'Connect socket error. Please retry later.',
  [messageTypes.EXISTING_LOGIN_ENGAGED]: 'Existing login engaged',
  [messageTypes.FORCE_LOGOUT]: 'Your logon session has been terminated',
};
