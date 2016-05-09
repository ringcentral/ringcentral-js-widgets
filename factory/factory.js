import phoneService from '../services/phone-service'
import loginService from '../services/login-service'
import callLogService from '../services/call-log-service'
import accountService from '../services/account-service'
import rcContactService from '../services/rc-contact-service'
import contactSearchService from '../services/contact-search-service'
import rcContactSearchProvider from '../services/rc-contact-search-provider'
import rcMessageService from '../services/rc-message-service'
import rcMessageProvider from '../services/rc-message-provider'
import rcConferenceSerivce from '../services/rc-conference-service'
var dialPadSearchProviders = [rcContactSearchProvider]

var services = {}
services.rcPhone = {
    loadData: {
        method: function() {
            rcMessageService.subscribeToMessageUpdate();
            rcMessageService.syncMessages(this.props.cachedMessageHours);
            accountService.getAccountInfo();
            accountService.getPhoneNumber();
            rcContactService.syncCompanyContact();
            phoneService.registerSIP();
            callLogService.getCallLogs();
            phoneService.listen();
        }
    }
}
services['auth-panel'] = {
    login: {
        method: function() {
            console.log('login');
            return loginService.login(
                PhoneFormat.formatE164('US', this.props.username),
                this.props.extension,
                this.props.password
            )
        },
        after: function() {
            console.log(this);
            this.unmount()
        }
    }
}

function extend(base, mixin) {
    for (var action in mixin) {
        if (base[action]) {
            for (var hook in mixin[action]) {
                var origin = base[action][hook]
                base[action][hook] = function(...args) {
                    console.log(this);
                    origin && origin.call(this, ...args)
                    mixin[action][hook].call(this)
                }
            }
        } else {
            base[action] = mixin[action]
        }
    }
    return base
}

var Factory = function () {
    
}

Factory.prototype.create = function(type, mixin = {}) {
    return extend(services[type], mixin)
}

export default Factory
