(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function register(globalSettings) {
    globalSettings = Object.assign({
        actions: {},
        handlers: {}
    }, globalSettings);
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
            actions: {},
            handlers: {}
        }, options);
        var settings = {
            // For deep copy
            actions: Object.assign({}, globalSettings.actions),
            handlers: Object.assign({}, globalSettings.handlers)
        };
        if (!options.template) {
            throw new Error('need a template');
        }
        logger = initLogger(options.logLevel);
        this.props = {};
        this.custom = {};
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
    [].forEach.call(template.querySelectorAll('[data-info]'), function (doc) {
        var info = doc.getAttribute('data-info');
        dom[info] = doc;
    });
    [].forEach.call(template.querySelectorAll('[data-event]'), function (doc) {
        var events = doc.getAttribute('data-event');
        // TODO: proper error messages
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
                return [].concat.apply([], arg());
            }
            return arg;
        };
        try {
            before = before.apply(undefined, _toConsumableArray(args));
            if (isThenable(before)) {
                return before.then(function () {
                    return method(arg);
                }).then(function (arg) {
                    return after(arg);
                }).then(function (arg) {
                    return finish(arg);
                }).catch(error);
            } else {
                method = method(before);
                if (isThenable(method)) {
                    return method.then(function (arg) {
                        return after(arg);
                    }).then(function (arg) {
                        return finish(arg);
                    }).catch(error);
                } else {
                    after = after(method);
                    if (isThenable(after)) {
                        return after.then(function (arg) {
                            return finish(arg);
                        }).catch(error);
                    } else {
                        return finish(after);
                    }
                }
            }
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

},{}],2:[function(require,module,exports){
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

var _accountService = require('./services/account-service');

var _accountService2 = _interopRequireDefault(_accountService);

var _w = require('./w');

var _w2 = _interopRequireDefault(_w);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// development only
window.w = _w2.default;
exports.default = _w2.default;

},{"./services/account-service":4,"./services/call-log-service":5,"./services/login-service":6,"./services/phone-service":7,"./w":10}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var services = {};
function register(name, service) {
    console.log(name);
    services[name] = service;
}
function getService() {
    return services;
}
exports.register = register;
exports.getService = getService;

},{}],4:[function(require,module,exports){
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
    return {
        getAccountInfo: function getAccountInfo() {
            return sdk.platform().get('/account/~/extension/~').then(function (response) {
                console.debug(response.json());
                info = response.json();
            }).catch(function (e) {
                console.error('Recent Calls Error: ' + e.message);
            });
        },
        hasServiceFeature: function hasServiceFeature(name) {
            if (!info) return Error('Need to fetch account info by accountService.getAccountInfo');
            return info.serviceFeatures.filter(function (feature) {
                return feature.featureName.toLowerCase() === name.toLowerCase();
            }).length > 0;
        }
    };
}(_rcSdk2.default);
(0, _service.register)('accountService', accountService);
exports.default = accountService;

},{"../service":3,"./rc-sdk":8}],5:[function(require,module,exports){
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
                return response.json().records;
            }).catch(function (e) {
                console.error('Recent Calls Error: ' + e.message);
            });
        }
    };
}(_rcSdk2.default);
(0, _service.register)('callLogService', CallLogService);
exports.default = CallLogService;

},{"../service":3,"./rc-sdk":8}],6:[function(require,module,exports){
'use strict';

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _service = require('../service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginService = function (sdk) {
    var onLoginHandler = [];
    return {
        login: function login(username, extension, password) {
            console.log('LoginService -> start login');
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

},{"../service":3,"./rc-sdk":8}],7:[function(require,module,exports){
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

},{"../service":3,"./rc-sdk":8,"./rc-webphone":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var webPhone = new RingCentral.WebPhone({
    audioHelper: {}
});

exports.default = webPhone;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('./component');

var _service = require('./service');

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
                // FIXME: script position
                var script = template.querySelector('script');
                document.body.appendChild(script);
                return template;
            }
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
    // initWidget(baseWidget).forEach(child => {
    //     baseWidget.props[child.name] = child.widget;
    // });
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
    // w.options = Object.assign(w.options, options);
    w.options.preload = options.preload || {};
    w.options.path = options.path || '';
    w.options.logLevel = options.logLevel || 0;
    preload(w.options.preload, callback);
};
w.customize = function (context, target, options) {
    context.custom[target] = options;
};
w.service = _service.getService;

exports.default = w;

},{"./component":1,"./service":3}]},{},[2])


//# sourceMappingURL=build.js.map
