(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var actions = {};
function register(name, action) {
    actions[name] = action;
}
function getActions() {
    return actions;
}
exports.register = register;
exports.getActions = getActions;

},{}],2:[function(require,module,exports){
'use strict';

var _action = require('../action');

var interaction = {
    show: {
        before: function before() {},
        method: function method(finish) {},
        after: function after(target) {
            target.classList.remove('display-none');
        }
    },
    hide: {
        before: function before() {},
        method: function method(finish) {},
        after: function after(target) {
            target.classList.add('display-none');
        }
    },
    diabled: {
        before: function before() {},
        method: function method(finish) {},
        after: function after(target, message) {
            var mask = document.createElement('div');
            mask.classList.add('rc-mask');
            var message = document.createElement('h4');
            message.classList.add('rc-mask-message');
            message.textContent = message;
            target.appendChild(mask);
            this.props.mask = mask;
            return mask;
        }
    },
    enable: {
        before: function before() {},
        method: function method(finish) {},
        after: function after() {
            if (this.props.mask && this.props.mask instanceof HTMLElement) {
                this.props.mask.parentNode.removeChild(this.props.mask);
            }
        }
    }
};
(0, _action.register)('interaction', interaction);

},{"../action":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function register(globalSettings) {
    if (!globalSettings.actions) console.warn('Widgets do not have actions defined, maybe you get some typo.');

    ['init', 'render', 'remove', 'error'].forEach(function (action) {
        globalSettings.actions[action] = Object.assign({
            before: function before() {},
            method: function method() {},
            after: function after() {},
            error: function error(e) {
                console.error(e);
                throw e;
            }
        }, globalSettings.actions[action]);
    });
    var Widget = function Widget(options) {
        var _this = this;

        var options = Object.assign({
            actions: {}
        }, options);
        var settings = {
            // For deep copy
            actions: Object.assign({}, globalSettings.actions)
        };
        this.props = {};
        this.custom = {};
        logger = initLogger(options.logLevel);

        Object.keys(settings.actions).forEach(function (index) {
            settings.actions[index] = bindScope(_this, settings.actions[index]);
        });
        Object.keys(options.actions).forEach(function (index) {
            options.actions[index] = bindScope(_this, options.actions[index]);
        });
        Object.keys(settings.actions).forEach(function (index) {
            _this[index] = generateActions(settings.actions[index], options.actions[index], index);
        });
        this.props.dom = generateDocument(this, options.template);
        this.props.template = options.template;
        this.render = generateActions({
            before: settings.actions.render.before,
            method: render.bind(this, settings.actions.render.method, this.props.template),
            after: settings.actions.render.after
        }, options.actions.render, 'render');
        this.remove = generateActions({
            before: settings.actions.remove.before,
            method: remove.bind(this, settings.actions.remove.method),
            after: settings.actions.remove.after
        }, options.actions.remove, 'remove');
        this.init();

        function remove(widgetRemove) {
            while (this.props.target.firstChild) {
                this.props.target.removeChild(this.props.target.firstChild);
            }
        }

        function render(widgetRender, template, finish, target, callback) {
            if (typeof target === 'string') {
                target = document.querySelector(target);
            } else if (target instanceof HTMLElement) {
                target = target;
            } else {
                logger.warn('first argument of render method should be selector string or dom');
            }
            target.appendChild(template);
            this.props.target = target;
            callback && typeof callback === 'function' && callback();
            if (widgetRender && typeof widgetRender === 'function') return widgetRender.call(this, finish);
        }
    };
    return Widget;
}

function bindScope(scope, action) {
    return {
        before: action.before ? action.before.bind(scope) : function () {}.bind(scope),
        method: action.method ? action.method.bind(scope) : function () {}.bind(scope),
        after: action.after ? action.after.bind(scope) : function () {}.bind(scope),
        error: action.error ? action.error.bind(scope) : function (err) {
            logger.error(err);
        }.bind(scope)
    };
}

function generateDocument(widget, template) {
    var dom = {};
    Array.from(template.querySelectorAll('[data-info]')).forEach(function (doc) {
        var info = doc.getAttribute('data-info');
        dom[info] = doc;
    });
    Array.from(template.querySelectorAll('[data-event]')).forEach(function (doc) {
        var events = doc.getAttribute('data-event');
        events.split('|').forEach(function (event) {
            var eventName;
            var action;
            event.split(':').forEach(function (token, index) {
                if (index === 0) eventName = token;else if (index === 1) action = token;
            });
            if (!widget[action]) {
                logger.warn('No such method:' + action + ' in ' + events + ', check data-event and widget methods definition');
                return;
            }
            doc.addEventListener(eventName, widget[action].bind(widget));
        });
    });
    return dom;
}

function generateActions(widgetAction, userAction, name) {
    if (!userAction) {
        userAction = {
            before: function before() {},
            method: function method() {},
            after: function after() {},
            error: function error(e) {
                logger.error(e);
                throw e;
            }
        };
        logger.warn('Widget action [%s] is not defined by users', name);
    }
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var before = function before() {
            var _ref;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            logger.info('[%s][before](' + (_ref = []).concat.apply(_ref, args) + ')', name);
            return wrapUserEvent.apply(undefined, [widgetAction.before, userAction.before].concat(args));
        };
        var method = function method(arg) {
            logger.info('[%s][method](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
            if (typeof arg === 'function') {
                return widgetAction.method.apply(widgetAction, [userAction.method].concat(_toConsumableArray(arg()))) || arg;
            }
            return widgetAction.method(userAction.method, arg) || arg;
        };
        var after = function after(arg) {
            logger.info('[%s][after](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
            if (typeof arg === 'function') {
                return wrapUserEvent.apply(undefined, [widgetAction.after, userAction.after].concat(_toConsumableArray(arg()))) || arg;
            }
            return wrapUserEvent(widgetAction.after, userAction.after, arg) || arg;
        };
        var error = function error(e) {
            return wrapUserEvent(widgetAction.error, userAction.error, e);
        };
        var finish = function finish(arg) {
            if (typeof arg === 'function') {
                // flatten one level
                return arg()[0] instanceof Array ? [].concat.apply([], arg()) : arg()[0];
            }
            return arg;
        };
        try {
            return nextAction(before.apply(undefined, _toConsumableArray(args)), [before, method, after, finish], error, 0);
        } catch (e) {
            error(e);
        }
    };
}

function wrapUserEvent(widget, user) {
    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
    }

    var _ref2;

    var continueDefault = !user || user.apply(undefined, args) || true;
    if (continueDefault || typeof continueDefault === 'undefined') return widget.apply(undefined, args) || function () {
        return args;
    };
    return (_ref2 = []).concat.apply(_ref2, args);
}

function isThenable(result) {
    if (result.then && typeof result.then === 'function') return true;
    return false;
}

function nextAction(result, actions, error, start) {
    if (start + 1 === actions.length) return result;
    if (isThenable(result)) {
        return actions.reduce(function (res, action, index) {
            if (index > start) return res.then(action);
            return res;
        }, result).catch(error);
    } else {
        return nextAction(actions[start + 1](result), actions, error, start + 1);
    }
}

function initLogger(level) {
    return {
        error: function error() {
            var _console;

            (_console = console).error.apply(_console, arguments);
        },
        warn: function warn() {
            var _console2;

            if (level > 0) (_console2 = console).warn.apply(_console2, arguments);
        },
        info: function info() {
            var _console3;

            if (level > 1) (_console3 = console).info.apply(_console3, arguments);
        },
        log: function log() {
            var _console4;

            if (level > 1) (_console4 = console).log.apply(_console4, arguments);
        }
    };
}
var logger;
exports.register = register;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loginService = require('./services/login-service');

var _loginService2 = _interopRequireDefault(_loginService);

var _callLogService = require('./services/call-log-service');

var _callLogService2 = _interopRequireDefault(_callLogService);

var _phoneService = require('./services/phone-service');

var _phoneService2 = _interopRequireDefault(_phoneService);

var _rcContactService = require('./services/rc-contact-service');

var _rcContactService2 = _interopRequireDefault(_rcContactService);

var _contactSearchService = require('./services/contact-search-service');

var _contactSearchService2 = _interopRequireDefault(_contactSearchService);

var _rcContactSearchProvider = require('./services/rc-contact-search-provider');

var _rcContactSearchProvider2 = _interopRequireDefault(_rcContactSearchProvider);

var _accountService = require('./services/account-service');

var _accountService2 = _interopRequireDefault(_accountService);

var _messageService = require('./services/message-service');

var _messageService2 = _interopRequireDefault(_messageService);

var _interaction = require('./actions/interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _w = require('./w');

var _w2 = _interopRequireDefault(_w);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// development only


// actions
// services
window.w = _w2.default;
exports.default = _w2.default;

},{"./actions/interaction":2,"./services/account-service":6,"./services/call-log-service":7,"./services/contact-search-service":8,"./services/login-service":9,"./services/message-service":10,"./services/phone-service":11,"./services/rc-contact-search-provider":12,"./services/rc-contact-service":13,"./w":16}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var services = {};
function register(name, service) {
    services[name] = service;
}
function getServices() {
    return services;
}
exports.register = register;
exports.getServices = getServices;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountService = function (sdk) {
    var info;
    var numbers;
    return {
        getAccountInfo: function getAccountInfo() {
            return sdk.platform().get('/account/~/extension/~').then(function (response) {
                console.debug(response.json());
                info = response.json();
                return info;
            }).catch(function (e) {
                console.error('Recent Calls Error: ' + e.message);
            });
        },

        getPhoneNumber: function getPhoneNumber() {
            return sdk.platform().get('/account/~/extension/~/phone-number').then(function (response) {
                console.debug(response.json());

                // info = response.json();
                return response.json();
            }).then(function (data) {
                numbers = data.records;
                return data.records;
            }).catch(function (e) {
                console.error('Recent Calls Error: ' + e.message);
            });
        },

        hasServiceFeature: function hasServiceFeature(name) {
            if (!info) return Error('Need to fetch account info by accountService.getAccountInfo');
            return info.serviceFeatures.filter(function (feature) {
                return feature.featureName.toLowerCase() === name.toLowerCase();
            }).length > 0;
        },

        listNumber: function listNumber(type) {
            console.debug(numbers);
            return numbers.filter(function (number) {
                return number.type === type;
            }).map(function (number) {
                return number.phoneNumber;
            });
        }
    };
}(_rcSdk2.default);

(0, _service.register)('accountService', accountService);
exports.default = accountService;

},{"../service":5,"./rc-sdk":14}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallLogService = function (sdk) {
    var period = 7 * 24 * 3600 * 1000;
    var dateFrom = new Date(Date.now() - period);
    return {
        getCallLogs: function getCallLogs() {
            return sdk.platform().get('/account/~/extension/~/call-log', { dateFrom: dateFrom.toISOString() }).then(function (response) {
                console.debug(response.json().records);
                return response.json().records;
            }).catch(function (e) {
                console.error('Recent Calls Error: ' + e.message);
            });
        }
    };
}(_rcSdk2.default);

(0, _service.register)('callLogService', CallLogService);
exports.default = CallLogService;

},{"../service":5,"./rc-sdk":14}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _service = require('../service');

var contactSearchService = function () {
    var searchProviders = [];
    var queryCompletedHandlers = [];

    function createResult(item) {
        return {
            name: item.name,
            value: item.value,
            type: item.type
        };
    }
    return {
        query: function query(searchFunctions, filter) {
            return Promise.all(searchFunctions).then(function (results) {
                var searchResultsKeys = {};
                var searchResults = [];
                results.forEach(function (result) {
                    result.forEach(function (item) {
                        if (filter) {
                            if (filter(item)) {
                                var key = item.name + item.value;
                                if (!searchResultsKeys[key]) {
                                    var toAddItem = createResult(item);
                                    searchResultsKeys[key] = toAddItem;
                                    searchResults.push(toAddItem);
                                }
                            }
                        } else {
                            var key = item.name + item.value;
                            if (!searchResultsKeys[key]) {
                                var toAddItem = createResult(item);
                                searchResultsKeys[key] = toAddItem;
                                searchResults.push(toAddItem);
                            }
                        }
                    });
                });
                return searchResults;
            });
        }
    };
}();
(0, _service.register)('contactSearchService', contactSearchService);
exports.default = contactSearchService;

},{"../service":5}],9:[function(require,module,exports){
'use strict';

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginService = function (sdk) {
    var onLoginHandler = [];
    return {
        login: function login(username, extension, password) {
            return sdk.platform().login({
                'username': username,
                'extension': extension,
                'password': password
            }).then(function () {
                onLoginHandler.forEach(function (handler) {
                    return handler();
                });
            }).catch(function (err) {
                return console.error(err);
            });
        },
        checkLoginStatus: function checkLoginStatus() {
            return sdk.platform().loggedIn().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    onLoginHandler.forEach(function (handler) {
                        return handler();
                    });
                }
                return isLoggedIn;
            });
        },
        registerLoginHandler: function registerLoginHandler(handler) {
            onLoginHandler.push(handler);
        }
    };
}(_rcSdk2.default);
(0, _service.register)('loginService', LoginService);

},{"../service":5,"./rc-sdk":14}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageService = function (sdk) {
    return {
        sendSMSMessage: function sendSMSMessage(text, fromNumber, toNumber) {
            return sdk.platform().post('/account/~/extension/~/sms/', {
                from: { phoneNumber: fromNumber },
                to: [{ phoneNumber: toNumber }],
                text: text
            });
        }
    };
}(_rcSdk2.default);

(0, _service.register)('messageService', messageService);
exports.default = messageService;

},{"../service":5,"./rc-sdk":14}],11:[function(require,module,exports){
'use strict';

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _rcWebphone = require('./rc-webphone');

var _rcWebphone2 = _interopRequireDefault(_rcWebphone);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhoneService = function () {
    var line;
    var handlers = {
        called: [],
        callStarted: [],
        callRejected: [],
        callEnded: [],
        callFailed: []
    };
    return {
        registerSIP: function registerSIP() {
            return _rcSdk2.default.platform().post('/client-info/sip-provision', {
                sipInfo: [{
                    transport: 'WSS'
                }]
            }).then(function (res) {
                return _rcWebphone2.default.register(res.json(), false).catch(function (e) {
                    return Promise.reject(err);
                });
            });
        },
        callout: function callout(fromNumber, toNumber) {
            // TODO: validate toNumber and fromNumber
            if (!_rcSdk2.default || !_rcWebphone2.default) {
                throw Error('Need to set up SDK and webPhone first.');
                return;
            }
            return _rcSdk2.default.platform().get('/restapi/v1.0/account/~/extension/~').then(function (res) {
                var info = res.json();
                if (info && info.regionalSettings && info.regionalSettings.homeCountry) {
                    return info.regionalSettings.homeCountry.id;
                }
                return null;
            }).then(function (countryId) {
                _rcWebphone2.default.call(toNumber, fromNumber, countryId);
            });
        },
        answer: function answer() {
            return _rcWebphone2.default.answer(line);
        },
        ignore: function ignore() {},
        cancel: function cancel() {
            return line.cancel();
        },
        hangup: function hangup() {
            return _rcWebphone2.default.hangup(line);
        },
        on: function on(name, handler) {
            handlers[name].push(handler);
        },
        listen: function listen() {
            _rcWebphone2.default.ua.on('incomingCall', function (e) {
                line = e;
                handlers.called.forEach(function (h) {
                    return h(e);
                });
            });
            _rcWebphone2.default.ua.on('callStarted', function (e) {
                handlers.callStarted.forEach(function (h) {
                    return h(e);
                });
            });
            _rcWebphone2.default.ua.on('callRejected', function (e) {
                handlers.callRejected.forEach(function (h) {
                    return h(e);
                });
            });
            _rcWebphone2.default.ua.on('callEnded', function (e) {
                handlers.callEnded.forEach(function (h) {
                    return h(e);
                });
            });
            _rcWebphone2.default.ua.on('callFailed', function (e) {
                handlers.callFailed.forEach(function (h) {
                    return h(e);
                });
            });
        }
    };
}();
(0, _service.register)('phoneService', PhoneService);

},{"../service":5,"./rc-sdk":14,"./rc-webphone":15}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rcContactService = require('./rc-contact-service');

var _rcContactService2 = _interopRequireDefault(_rcContactService);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rcContactSearchProvider = function () {
    return {
        search: function search(text) {
            var results = [];
            if (text) {
                text = text.toLowerCase();
                _rcContactService2.default.companyContacts.map(function (contact) {
                    if (contact.displayName && contact.displayName.toLowerCase().indexOf(text) >= 0) {
                        results.push({
                            name: contact.displayName,
                            value: contact.extension,
                            type: 'rc',
                            id: contact.id
                        });
                        contact.phoneNumber.forEach(function (phone) {
                            results.push({
                                name: contact.displayName,
                                value: phone,
                                type: 'rc',
                                id: contact.id
                            });
                        });
                    } else {
                        if (contact.extension && contact.extension.indexOf(text) >= 0) {
                            results.push({
                                name: contact.displayName,
                                value: contact.extension,
                                type: 'rc',
                                id: contact.id
                            });
                        }

                        contact.phoneNumber.forEach(function (phone) {
                            if (phone.indexOf(text) >= 0) {
                                results.push({
                                    name: contact.displayName,
                                    value: phone,
                                    type: 'rc',
                                    id: contact.id
                                });
                            }
                        });
                    }
                });
            }

            return results;
        }
    };
}();

(0, _service.register)('rcContactSearchProvider', rcContactSearchProvider);
exports.default = rcContactSearchProvider;

},{"../service":5,"./rc-contact-service":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rcContactService = function (sdk) {
    var companyContacts = [];

    function Contact() {
        this.firstName = null;
        this.lastName = null;
        this.displayName = null;
        this.extension = null;
        this.phoneNumber = [];
    }

    function createContact(extension) {
        var contact = new Contact();
        contact.extension = extension.extensionNumber;
        contact.firstName = extension.contact.firstName;
        contact.lastName = extension.contact.lastName;
        contact.displayName = contact.firstName + ' ' + contact.lastName;
        contact.type = 'rc';
        contact.id = extension.id;
        return contact;
    }

    function fetchCompanyContactByPage(page) {
        return sdk.platform().get('/account/~/extension/', { perPage: 250, page: page });
    }

    function fetchCompanyDirectNumbersByPage(page) {
        return sdk.platform().get('/account/~/phone-number', { perPage: 250, page: page });
    }

    function fetchCompanyContacts() {
        var page = 1;
        fetchCompanyContactByPage(page).then(function (response) {
            var respObj = response.json();
            if (respObj.paging && respObj.paging.totalPages > page) {
                var promises = [];
                while (respObj.paging.totalPages > page) {
                    page++;
                    promises.push(fetchCompanyContactByPage(page));
                }

                Promise.all(promises).then(function (responses) {
                    responses.forEach(function (response) {
                        var records = response.json().records.filter(function (extension) {
                            return extension.status === 'Enabled' && ['DigitalUser', 'User'].indexOf(extension.type) >= 0;
                        }).map(function (extension) {
                            return createContact(extension);
                        });
                        companyContacts.push.apply(companyContacts, records);
                    });

                    fetchCompanyDirectNumbers();
                });
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    function fetchCompanyDirectNumbers() {
        var page = 1;
        fetchCompanyDirectNumbersByPage(page).then(function (response) {
            var respObj = response.json();
            if (respObj.paging && respObj.paging.totalPages > page) {
                var promises = [];
                while (respObj.paging.totalPages > page) {
                    page++;
                    promises.push(fetchCompanyDirectNumbersByPage(page));
                }

                Promise.all(promises).then(function (responses) {
                    var numbers = {};
                    responses.forEach(function (response) {
                        var resp = response.json();
                        resp.records.forEach(function (el) {
                            if (el.extension && el.extension.extensionNumber) {
                                if (!numbers[el.extension.extensionNumber]) {
                                    numbers[el.extension.extensionNumber] = [];
                                }

                                numbers[el.extension.extensionNumber].push(el);
                            }
                        });
                    });
                    companyContacts.forEach(function (contact) {
                        var phones = numbers[contact.extension];
                        if (phones) {
                            phones.forEach(function (phone) {
                                contact.phoneNumber.push(phone.phoneNumber);
                            });
                        }
                    });
                });
            }
        });
    }

    return {
        companyContacts: companyContacts,
        syncCompanyContact: function syncCompanyContact() {
            companyContacts.length = 0;
            fetchCompanyContacts();
        }
    };
}(_rcSdk2.default);

(0, _service.register)('rcContactService', rcContactService);
exports.default = rcContactService;

},{"../service":5,"./rc-sdk":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sdk = new RingCentral.SDK({
    appKey: '8mOtYiilT5OUPwwdeGgvpw',
    appSecret: 'cqNn89RmR2SR76Kpp8xJaAdNzNOqR8Qfmjb0B-gDOHTw',
    server: RingCentral.SDK.server.production
});

exports.default = sdk;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var webPhone = new RingCentral.WebPhone({
    audioHelper: {}
});

exports.default = webPhone;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('./component');

var _service = require('./service');

var _action = require('./action');

function fetchWidget(filePath) {
    return fetch(w.options.path + filePath + (filePath.endsWith('.html') ? '' : '.html')).then(function (response) {
        return response.text();
    }).then(function (body) {
        var template = document.createElement('template');
        template.innerHTML = body;
        var clone = document.importNode(template.content, true);
        return clone;
    });
}

function parseDocument(template) {
    var docs = template.querySelectorAll('*');
    return Promise.all(Array.from(docs).reduce(function (result, doc) {
        if (doc.localName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement) {
            var temp = {};
            temp[doc.localName] = doc.localName;
            return result.concat(preload(temp));
        }
        return result;
    }, []));
}

function initNestedWidget(widget) {
    var template = widget.props.template;
    var docs = template.querySelectorAll('*');
    Array.from(docs).forEach(function (doc) {
        if (doc.localName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement) {
            if (typeof doc.getAttribute('dynamic') !== 'undefine' && doc.getAttribute('dynamic') !== null) {
                return;
            }
            var child = w(doc.localName, widget.custom[doc.localName]);
            child.render(doc);
            // FIXME: When multiple child element, has problems
            var childName = doc.getAttribute('data-info');
            if (childName) widget.props[childName] = child;
        }
    });
}

function preload(widgets, callback) {
    return Promise.all(Object.keys(widgets).reduce(function (result, name) {
        if (!w.templates[name]) {
            w.templates[name] = {};
        }
        if (!w.templates[name].fetch) {
            w.templates[name].fetch = fetchWidget(widgets[name]);
        }
        return result.concat(w.templates[name].fetch.then(function (template) {
            if (!w.templates[name].template) {
                w.templates[name].template = template;
                var script = template.querySelector('script');
                document.body.appendChild(script);
                document.body.removeChild(script);
            }
            return template;
        }).then(parseDocument).catch(function (err) {
            return console.error('Widgets preload error:' + err);
        }));
    }, [])).then(callback);
}

// Public API
function w(name, options) {
    options = options || {};
    var baseWidget;
    if (!w.templates[name] || !w.templates[name].widget) {
        throw Error('you need to preload widget:' + name + ' before init it');
    }
    baseWidget = new w.templates[name].widget({
        template: w.templates[name].template.cloneNode(true),
        actions: options.actions || {},
        handlers: options.handlers || {},
        logLevel: w.options.logLevel
    });
    initNestedWidget(baseWidget);
    return baseWidget;
}
w.templates = {};
w.options = {};
w.register = function (constructor) {
    var settings = new constructor();
    Object.keys(w.templates).forEach(function (index) {
        var template = w.templates[index];
        if (template.template && !template.widget) template.widget = (0, _component.register)(settings);
    });
};
w.config = function (options, callback) {
    w.options.preload = options.preload || {};
    w.options.path = options.path || '';
    w.options.logLevel = options.logLevel || 0;
    preload(w.options.preload, callback);
};
w.customize = function (context, target, options) {
    context.custom[target] = options;
};
w.service = _service.getServices;
w.action = function (name) {
    return Object.assign([], (0, _action.getActions)()[name]);
};

exports.default = w;

},{"./action":1,"./component":3,"./service":5}]},{},[4])


//# sourceMappingURL=build.js.map
