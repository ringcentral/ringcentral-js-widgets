// services
import LoginService from './services/login-service';
import CallLogService from './services/call-log-service';
import PhoneService from './services/phone-service';
import rcContactService from './services/rc-contact-service';
import contactSearchService from './services/contact-search-service';
import rcContactSearchProvider from './services/rc-contact-search-provider';
import accountService from './services/account-service';
import rcMessageService from './services/rc-message-service';
import rcMessageProvider from './services/rc-message-provider';
import messageSearchService from './services/message-search-service';

// actions
import interaction from './actions/interaction';
import w from './w';
// development only
window.w = w;
export default w;
