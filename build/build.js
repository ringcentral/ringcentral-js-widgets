(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Component = function Component(options) {
    var _this = this;

    if (!options.template) {
        throw new Error('need a template');
    }
    // TODO: use Object.extend or somewhat (es6) for default options setting
    this.options = options || {};
    this.props = {};
    this.fetchPromise = null;
    this.beforeUpdate('mount');
    this.fetchTemplate(options.template).then(function (template) {
        return _this.bindDOM(template);
    }).then(function (template) {
        return _this.afterUpdate('mount');
    }).catch(function (err) {
        return console.error(err.stack);
    });
};
Component.prototype.fetchTemplate = function (src) {
    this.fetchPromise = fetch(src).then(function (response) {
        return response.text();
    }).then(function (body) {
        var template = document.createElement('template');
        template.innerHTML = body;
        var clone = document.importNode(template.content, true);
        return clone;
    }).catch(function (err) {
        return console.error(err.stack);
    });
    return this.fetchPromise;
};
Component.prototype.bindDOM = function (template) {
    var _this2 = this;

    this.props.dom = {};
    [].forEach.call(template.querySelectorAll('[data-info]'), function (doc) {
        var info = doc.getAttribute('data-info');
        _this2.props.dom[info] = doc;
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
            if (!_this2[action]) {
                console.warn('No such method:' + action + ' in ' + events + ', check data-event and widget methods definition');
                return;
            }
            doc.addEventListener(eventName, _this2[action].bind(_this2));
        });
    });
    return template;
};
Component.prototype.beforeUpdate = function (action) {
    if (this.options.beforeUpdate) return this.options.beforeUpdate.call(this, action, this.props);
    return true;
};
Component.prototype.afterUpdate = function (action) {
    if (this.options.afterUpdate) return this.options.afterUpdate.call(this, action, this.props);
    return true;
};
Component.prototype.remove = function () {
    while (this.props.targetDOM.firstChild) {
        this.props.targetDOM.removeChild(this.props.targetDOM.firstChild);
    }
};
Component.prototype.render = function (target, callback) {
    var _this3 = this;

    if (this.fetchPromise) return this.fetchPromise.then(function (template) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            target = target;
        } else {
            console.warn('first argument of render method should be selector string or dom');
        }
        _this3.props.targetDOM = target;
        _this3.props.targetDOM.appendChild(template);
    }).then(function () {
        if (callback && typeof callback === 'function') callback.call(_this3);
    }).catch(function (err) {
        return console.error('render err:' + err);
    });
};

function register(settings) {
    var beforeUpdate = settings.beforeUpdate;
    var afterUpdate = settings.afterUpdate;
    var methods = settings.methods;

    var Widget = function Widget(options) {
        var _this5 = this;

        Component.call(this, options);
        // bind methods
        if (methods) {
            Object.keys(methods).forEach(function (index) {
                var method = methods[index];
                var action = options.actions[index];
                var handler = options.handlers[index];
                // Method which has same name in options.actions will be treated as a UI->Helper method
                // Other method will be treated as handlers(Helper->UI)
                if (options.actions && action) {
                    var actionWrapper = function () {
                        var _this4 = this;

                        this.beforeUpdate(index);

                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        return Promise.resolve(method.call.apply(method, [this, action.bind(this)].concat(args))).then(function () {
                            for (var _len2 = arguments.length, result = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                result[_key2] = arguments[_key2];
                            }

                            return _this4.afterUpdate(index, result);
                        }) // result is an array
                        .catch(function (err) {
                            return console.error(err.stack);
                        });
                    }.bind(_this5);
                    Widget.prototype[index] = actionWrapper;
                } else if (options.handlers && handler) {
                    var handlerWrapper = function () {
                        var _this6 = this;

                        this.beforeUpdate(index);

                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        return Promise.resolve(method.call.apply(method, [this].concat(args))).then(function () {
                            for (var _len4 = arguments.length, result = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                result[_key4] = arguments[_key4];
                            }

                            return _this6.afterUpdate(index, result);
                        }).catch(function (err) {
                            return console.error(err.stack);
                        });
                    }.bind(_this5);
                    handler.call(_this5, handlerWrapper);
                }
            });
        }
        console.log(this);
    };
    Widget.prototype = Object.create(Component.prototype);
    Widget.prototype.constructor = Widget;
    Widget.prototype.beforeUpdate = function (action, options) {
        var defaultAction = Component.prototype.beforeUpdate.call(this, action, options);
        if (typeof defaultAction !== 'undefined' && !defaultAction) return options;
        if (!settings.beforeUpdate) return options;
        return settings.beforeUpdate.call(this, action, options);
    };
    Widget.prototype.afterUpdate = function (action, options) {
        var defaultAction = Component.prototype.afterUpdate.call(this, action, options);
        if (typeof defaultAction !== 'undefined' && !defaultAction) return options;
        if (!settings.afterUpdate) return options;
        return settings.afterUpdate.call(this, action, options);
    };
    return Widget;
}
exports.Component = Component;
exports.register = register;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var AuthPanel = (0, _component.register)({
    beforeUpdate: function beforeUpdate(action, options) {
        if (action === 'login') {
            this.props.dom.login.disabled = true;
            this.props.dom.error.textContent = '';
            this.interval = loading(this.props.dom.login, 'login');
        }
    },
    afterUpdate: function afterUpdate(action, options) {
        if (action === 'mount') {
            this.props.dom.key.value = localStorage.getItem('key');
            this.props.dom.secret.value = localStorage.getItem('secret');
            this.props.dom.username.value = localStorage.getItem('username');
            this.props.dom.extension.value = localStorage.getItem('extension');
            this.props.dom.password.value = localStorage.getItem('password');
        } else if (action === 'login') {
            this.props.dom.login.disabled = false;
            // stop loading animation
            if (this.interval) {
                this.interval.cancel();
                this.interval = null;
            }
            localStorage.setItem('server', this.props.dom.server.value || '');
            localStorage.setItem('key', this.props.dom.key.value || '');
            localStorage.setItem('secret', this.props.dom.secret.value || '');
            localStorage.setItem('username', this.props.dom.username.value || '');
            localStorage.setItem('extension', this.props.dom.extension.value || '');
            localStorage.setItem('password', this.props.dom.password.value || '');
        }
    },
    methods: {
        login: function login(finish) {
            return finish();
        }

    }
});

function loading(target, text) {
    var dotCount = 1;
    var interval = window.setInterval(function () {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--) {
            dot += '.';
        }target.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500);
    return {
        cancel: function cancel(text) {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
                if (typeof text !== 'undefined') target.textContent = text;
            }
        }
    };
}

exports.default = AuthPanel;

},{"../component":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var AutoComplete = (0, _component.register)({
    afterUpdate: function afterUpdate(action, options) {
        var _this = this;

        if (action === 'autoComplete') {
            var child;
            while (child = this.props.dom.candidates.firstChild) {
                this.props.dom.candidates.removeChild(child);
            }
            // options === candidates
            console.log(options);
            var candidates = options[0];
            candidates.forEach(function (can) {
                var btn = document.createElement('button');
                btn.textContent = can;
                btn.addEventListener('click', function (e) {
                    _this.props.dom.input.value = can;
                });
                _this.props.dom.candidates.appendChild(btn);
            });
        }
    },
    methods: {
        autoComplete: function autoComplete(finish) {
            this.props.prefix = this.props.dom.input.value;
            return finish();
        },
        input: function input(finish, _input) {
            this.props.dom.input.value += _input;
            var result = finish();
            // TODO: This autoComplete !== below autoComplete, seems weird for develoeprs
            this.autoComplete();
            return result;
        }
    }
});

exports.default = AutoComplete;

},{"../component":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var CallLogItem = (0, _component.register)({
    beforeUpdate: function beforeUpdate(action) {},
    afterUpdate: function afterUpdate(action) {},
    methods: {}
});

exports.default = CallLogItem;

},{"../component":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var _callLogItem = require('./call-log-item');

var _callLogItem2 = _interopRequireDefault(_callLogItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function switchTab(tab1, tab2) {
    if (tab1.classList.contains('active') === false) {
        tab1.classList.add('active');
        tab2.classList.remove('active');
    }
}

function switchTabByClick() {
    var callTab = this.props.dom.callTab;
    var missedCallTab = this.props.dom.missedCallTab;
    callTab.addEventListener('click', function () {
        switchTab.call(this, callTab, missedCallTab);
    });

    missedCallTab.addEventListener('click', function () {
        switchTab.call(this, missedCallTab, callTab);
    });
}

var CallLog = (0, _component.register)({

    afterUpdate: function afterUpdate(action, options) {
        if (action === 'mount') {
            switchTabByClick.call(this);
        }
    },
    methods: {
        logUpdated: function logUpdated(logItems) {

            var props = this.props;
            logItems.forEach(function (item) {

                var callLogItem = new _callLogItem2.default({
                    template: './template/call-log-item.html',
                    beforeUpdate: function beforeUpdate(action) {},
                    afterUpdate: function afterUpdate(action) {
                        if (action === 'mount') {
                            if (item.direction === 'Outbound') {
                                this.props.dom.contact.innerHTML = item.to.name;
                                this.props.dom.location.innerHTML = item.to.location;
                                this.props.dom.time.innerHTML = item.startTime;
                            } else {
                                this.props.dom.contact.innerHTML = item.from.name;
                                //this.props.dom.location.innerHTML = item.from.location;
                                this.props.dom.time.innerHTML = item.startTime;
                            }
                        }
                    }

                });

                callLogItem.render(props.dom.logs);
            });
        }

    }
});

exports.default = CallLog;

},{"../component":1,"./call-log-item":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var state = {
    'HIDDEN': 0,
    'CALLIN': 1,
    'CALLOUT': 2,
    'ONLINE': 3
};
var currentState = state.HIDDEN;
var CallPanel = (0, _component.register)({
    beforeUpdate: function beforeUpdate(action, options) {},
    afterUpdate: function afterUpdate(action, options) {
        if (action === 'mount') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'answer') {
            currentState = state.ONLINE;
            triggerView(this.props);
        } else if (action === 'ignore') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'cancel') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'hangup') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'record') {} else if (action === 'hold') {} else if (action === 'mute') {}
    },
    methods: {
        answer: function answer(finish) {
            return finish();
        },
        ignore: function ignore(finish) {
            return finish();
        },
        cancel: function cancel(finish) {
            return finish();
        },
        hangup: function hangup(finish) {
            return finish();
        },
        called: function called(event) {
            console.log('callin');
            currentState = state.CALLIN;
            triggerView(this.props);
        },
        callStarted: function callStarted(event) {
            console.log('call start');
            currentState = state.ONLINE;
            triggerView(this.props);
        },
        callRejected: function callRejected(event) {
            console.log('call reject');
            currentState = state.HIDDEN;
            triggerView(this.props);
        },
        callEnded: function callEnded(event) {
            console.log('end');
            currentState = state.HIDDEN;
            triggerView(this.props);
        },
        callFailed: function callFailed(event) {
            console.log('fail');
            currentState = state.HIDDEN;
            triggerView(this.props);
        }
    }
});

var triggerView = function triggerView(props) {
    props.dom['callin-panel'].style.display = 'none';
    props.dom['callout-panel'].style.display = 'none';
    props.dom['online-panel'].style.display = 'none';
    if (currentState === state.CALLIN) {
        props.dom['callin-panel'].style.display = 'block';
    } else if (currentState === state.CALLOUT) {
        props.dom['callout-panel'].style.display = 'block';
    } else if (currentState === state.ONLINE) {
        props.dom['online-panel'].style.display = 'block';
        // this.callTimeInterval = this.updateCallTime(this.line.timeCallStarted);
    }
};
var loading = function loading(target, text) {
    var dotCount = 1;
    var interval = window.setInterval(function () {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--) {
            dot += '.';
        }target.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500);
    return {
        cancel: function cancel(text) {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
                if (typeof text !== 'undefined') target.textContent = text;
            }
        }
    };
};
// var prototype.updateCallTime = function(startTime) {
//     // FIXME: it's not accurate
//     if (!startTime)
//         return;
//     var currentTime = Date.now() - startTime;
//     var callPanel = this;
//     var callTimeInterval = window.setInterval(() => {
//         var sec = currentTime % 60;
//         var min = Math.floor(currentTime / 60);
//         this.element.panel.onlinePanel.callTime.textContent = min + ":" + sec;
//         currentTime++;
//     }, 1000);
//     return {
//         cancel: function() {
//             if (!callTimeInterval)
//                 return;
//             window.clearInterval(callTimeInterval);
//             callPanel.element.panel.onlinePanel.callTime.textContent = "0:0";
//             callTimeInterval = null;
//         }
//     }
// };
exports.default = CallPanel;

},{"../component":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var _autoComplete = require('./auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialPad = (0, _component.register)({
    beforeUpdate: function beforeUpdate(action, options) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
                console.log('div before callout');
                this.interval = loading(this.props.dom.callout, 'Call');
            }
        return options;
    },
    afterUpdate: function afterUpdate(action, options) {
        var _this = this;

        if (action === 'mount') {
            var dialPad = this;
            var autoComplete = new _autoComplete2.default({
                template: '../template/auto-complete.html',
                actions: {
                    autoComplete: function autoComplete() {
                        var r = dialPad.getCandidates();
                        return r;
                    },
                    input: function input() {}
                },
                handlers: {},
                beforeUpdate: function beforeUpdate(action) {},
                afterUpdate: function afterUpdate(action) {}
            });
            autoComplete.render(this.props.dom.number, function () {
                // TODO: The manual binding is annoying, can be done by Component?
                _this.props.autoComplete = autoComplete;
            });
        } else if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
                if (this.interval) {
                    this.interval.cancel('Call');
                    this.interval = null;
                }
            }
        return options;
    },
    methods: {
        dialing: function dialing(finish, event) {
            var button = event.target;
            var ac = this.props.autoComplete;
            ac.input(button.getAttribute('data-value'));
            return finish();
        },
        callout: function callout(finish) {
            var ac = this.props.autoComplete;
            this.props.toNumber = ac.props.dom.input.value;
            this.props.fromNumber = localStorage.getItem('username');
            return finish();
        },
        getCandidates: function getCandidates(finish) {
            return finish();
        }
    }
});

function loading(target, text) {
    var dotCount = 1;
    var interval = window.setInterval(function () {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--) {
            dot += '.';
        }target.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500);
    return {
        cancel: function cancel(text) {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
                if (typeof text !== 'undefined') target.textContent = text;
            }
        }
    };
}
exports.default = DialPad;

},{"../component":1,"./auto-complete":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallLogService = function (sdk) {

    var callLogUpdatedHandlers = [];

    return {

        getCallLogs: function getCallLogs() {

            sdk.platform().get('/account/~/extension/~/call-log', { page: 1, perPage: 10 }).then(function (response) {
                var records = response.json().records;
                callLogUpdatedHandlers.forEach(function (fun) {
                    return fun(records);
                });
            }).catch(function (e) {
                console.error('Recent Calls Error: ' + e.message);
            });
        },

        registerCallLogUpdatedHandler: function registerCallLogUpdatedHandler(handler) {
            callLogUpdatedHandlers.push(handler);
        }
    };
}(_rcSdk2.default);

exports.default = CallLogService;

},{"./rc-sdk":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sdk = new RingCentral.SDK({
    appKey: 'eac8797af1b3502F2CEAAEECAC3Ed378AA7858A386656f28A008b0c638A754B1',
    appSecret: 'c082702E4ea4DA18c4b1377917778a8aafabCA3Be579B78B66d17C36874b27F4',
    server: RingCentral.SDK.server.production
});
var webPhone = new RingCentral.WebPhone({
    audioHelper: {
        incoming: '../demo/audio/incoming.ogg',
        outgoing: '../demo/audio/outgoing.ogg'
    }
});;
var rcHelper = function (sdk, webPhone) {
    var line;
    var handlers = {
        called: [],
        callStarted: [],
        callRejected: [],
        callEnded: [],
        callFailed: []
    };
    return {
        login: function login(props) {
            console.log('helper login');
            var dom = props.dom;
            return sdk.platform().login({
                username: dom.username.value,
                extension: dom.extension.value,
                password: dom.password.value
            }).then(function () {
                return registerSIP();
            });

            function registerSIP() {
                console.log('register');
                return sdk.platform().post('/client-info/sip-provision', {
                    sipInfo: [{
                        transport: 'WSS'
                    }]
                }).then(function (res) {
                    var data = res.json();
                    console.log("Sip Provisioning Data from RC API: " + JSON.stringify(data));
                    console.log(data.sipFlags.outboundCallsEnabled);
                    var checkFlags = false;
                    return webPhone.register(data, checkFlags).then(function () {
                        console.log('Registered');
                    }).catch(function (e) {
                        return Promise.reject(err);
                    });
                }).catch(function (e) {
                    return console.error(e);
                });
            }
        },
        callout: function callout(props) {
            console.log('user callout');
            var toNumber = props.toNumber;
            var fromNumber = props.fromNumber;

            // TODO: validate toNumber and fromNumber
            if (!sdk || !webPhone) {
                throw Error('Need to set up SDK and webPhone first.');
                return;
            }
            return sdk.platform().get('/restapi/v1.0/account/~/extension/~').then(function (res) {
                console.log(res);
                var info = res.json();
                if (info && info.regionalSettings && info.regionalSettings.homeCountry) {
                    return info.regionalSettings.homeCountry.id;
                }
                return null;
            }).then(function (countryId) {
                webPhone.call(toNumber, fromNumber, countryId);
            }).catch(function (e) {
                return console.error(e);
            });
        },
        answer: function answer(props) {
            return webPhone.answer(line).catch(function (e) {
                console.error(e);
            });
        },
        ignore: function ignore(props) {},
        cancel: function cancel(props) {
            return line.cancel().catch(function (e) {
                console.error(e);
            });
        },
        hangup: function hangup(props) {
            return webPhone.hangup(line).catch(function (err) {
                return console.error(err);
            });
        },
        record: function record(props) {},
        hold: function hold(props) {},
        mute: function mute(props) {},
        called: function called(handler) {
            handlers.called.push(handler);
        },
        callStarted: function callStarted(handler) {
            handlers.callStarted.push(handler);
        },
        callRejected: function callRejected(handler) {
            handlers.callRejected.push(handler);
        },
        callEnded: function callEnded(handler) {
            handlers.callEnded.push(handler);
        },
        callFailed: function callFailed(handler) {
            handlers.callFailed.push(handler);
        },
        initPhoneListener: function initPhoneListener(props) {
            var _this = this;

            webPhone.ua.on('sipIncomingCall', function (e) {
                console.log(handlers);
                line = e;
                handlers.called.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callStarted', function (e) {
                console.log(handlers);
                console.log(_this);
                handlers.callStarted.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callRejected', function (e) {
                console.log(handlers);
                handlers.callRejected.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callEnded', function (e) {
                console.log(handlers);
                handlers.callEnded.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callFailed', function (e) {
                console.log(handlers);
                handlers.callFailed.forEach(function (h) {
                    return h(e);
                });
            });
        },
        getCandidates: function getCandidates(props) {
            // FIXME: because of nested component
            var prefix = props.autoComplete.props.prefix;
            var test = ['111', '222', '333'];
            return test.filter(function (item) {
                return item.indexOf(prefix) === 0;
            });
        }
    };
}(sdk, webPhone);
exports.default = rcHelper;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rcSdk = require('./rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

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

exports.default = LoginService;

},{"./rc-sdk":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CallLogService = exports.LoginService = exports.sdk = exports.rcHelper = exports.AutoComplete = exports.CallLogItem = exports.CallLog = exports.DialPad = exports.CallPanel = exports.AuthPanel = undefined;

var _authPanel = require('./components/auth-panel');

var _authPanel2 = _interopRequireDefault(_authPanel);

var _callPanel = require('./components/call-panel');

var _callPanel2 = _interopRequireDefault(_callPanel);

var _dialPad = require('./components/dial-pad');

var _dialPad2 = _interopRequireDefault(_dialPad);

var _callLog = require('./components/call-log');

var _callLog2 = _interopRequireDefault(_callLog);

var _callLogItem = require('./components/call-log-item');

var _callLogItem2 = _interopRequireDefault(_callLogItem);

var _autoComplete = require('./components/auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

var _helper = require('./helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _rcSdk = require('./helpers/rc-sdk');

var _rcSdk2 = _interopRequireDefault(_rcSdk);

var _loginService = require('./helpers/login-service');

var _loginService2 = _interopRequireDefault(_loginService);

var _callLogService = require('./helpers/call-log-service');

var _callLogService2 = _interopRequireDefault(_callLogService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AuthPanel = _authPanel2.default;
window.CallPanel = _callPanel2.default;
window.DialPad = _dialPad2.default;
window.CallLog = _callLog2.default;
window.CallLogItem = _callLogItem2.default;
window.AutoComplete = _autoComplete2.default;
window.rcHelper = _helper2.default;
window.sdk = _rcSdk2.default;
window.LoginService = _loginService2.default;
window.CallLogService = _callLogService2.default;

exports.AuthPanel = _authPanel2.default;
exports.CallPanel = _callPanel2.default;
exports.DialPad = _dialPad2.default;
exports.CallLog = _callLog2.default;
exports.CallLogItem = _callLogItem2.default;
exports.AutoComplete = _autoComplete2.default;
exports.rcHelper = _helper2.default;
exports.sdk = _rcSdk2.default;
exports.LoginService = _loginService2.default;
exports.CallLogService = _callLogService2.default;

},{"./components/auth-panel":2,"./components/auto-complete":3,"./components/call-log":5,"./components/call-log-item":4,"./components/call-panel":6,"./components/dial-pad":7,"./helpers/call-log-service":8,"./helpers/helper":9,"./helpers/login-service":10,"./helpers/rc-sdk":11}]},{},[12])


//# sourceMappingURL=build.js.map
