(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Component = function Component(options) {
    var _this = this;

    if (!options.template) {
        // TODO: maybe use default template
        throw new Error('need specifiy a template');
    }
    // TODO: use Object.extend or somewhat (es6) for default option setting
    this.options = options || {};
    this.props = {};
    this.fetchPromise = null;
    this.bindHandlers(options.handlers);
    this.beforeUpdate('mount');
    this.fetchTemplate(options.template).then(function (template) {
        return _this.bindDOM(template);
    }).then(function (template) {
        return _this.afterUpdate('mount');
    }).catch(function (err) {
        return console.error(err.stack);
    });
};
Component.prototype.bindHandlers = function (handlers) {
    var _this2 = this;

    if (handlers) {
        Object.keys(handlers).forEach(function (index) {
            var method = handlers[index];
            method(_this2[method.name]);
        });
    }
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
    var _this3 = this;

    this.props.dom = {};
    [].forEach.call(template.querySelectorAll('[data-info]'), function (doc) {
        var info = doc.getAttribute('data-info');
        _this3.props.dom[info] = doc;
    });
    [].forEach.call(template.querySelectorAll('[data-action]'), function (doc) {
        var event = doc.getAttribute('data-event');
        var action = doc.getAttribute('data-action');
        doc.addEventListener(event, _this3[action].bind(_this3));
    });
    return template;
};
Component.prototype.beforeUpdate = function (action) {
    if (this.options.beforeUpdate) return this.options.beforeUpdate(action, this.props);
    return true;
};
Component.prototype.afterUpdate = function (action) {
    if (this.options.afterUpdate) return this.options.afterUpdate(action, this.props);
    return true;
};
Component.prototype.remove = function () {
    while (this.props.targetDOM.firstChild) {
        this.props.targetDOM.removeChild(this.props.targetDOM.firstChild);
    }
};
Component.prototype.render = function (target, callback) {
    var _this4 = this;

    if (this.fetchPromise) return this.fetchPromise.then(function (template) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            target = target;
        } else {
            console.warn('first argument of render method should be selector string or dom');
        }
        _this4.props.targetDOM = target;
        _this4.props.targetDOM.appendChild(template);
    }).then(function () {
        if (callback && typeof callback === 'function') callback.call(_this4);
    }).catch(function (err) {
        return console.error('render err:' + err);
    });
};

function register(settings) {
    var beforeUpdate = settings.beforeUpdate;
    var afterUpdate = settings.afterUpdate;
    var methods = settings.methods;

    var Widget = function Widget(options) {
        Component.call(this, options);
        Object.keys(methods).forEach(function (index) {
            var method = methods[index];
            Widget.prototype[method.name] = function () {
                var _this5 = this;

                this.beforeUpdate(method.name);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                Promise.resolve(method.call.apply(method, [this, options.actions[method.name]].concat(args))).then(function () {
                    return _this5.afterUpdate(method.name);
                }).catch(function (err) {
                    return console.error(err.stack);
                });
            };
        });
    };
    Widget.prototype = Object.create(Component.prototype);
    Widget.prototype.constructor = Widget;
    Widget.prototype.beforeUpdate = function (action, props) {
        var defaultAction = Component.prototype.beforeUpdate.call(this, action, props);
        if (defaultAction) {
            settings.beforeUpdate.call(this, action, props);
        }
    };
    Widget.prototype.afterUpdate = function (action, props) {
        var defaultAction = Component.prototype.afterUpdate.call(this, action, props);
        if (defaultAction) {
            settings.afterUpdate.call(this, action, props);
        }
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
    beforeUpdate: function beforeUpdate(action, props) {
        if (action === 'login') {
            this.props.dom.login.disabled = true;
            this.props.dom.error.textContent = '';
            this.interval = loading(this.props.dom.login, 'login');
        }
    },
    afterUpdate: function afterUpdate(action, props) {
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
            return finish(this.props);
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

var _component = require('../component');

// prototypal inheritance, please see:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var CallLog = function CallLog(options) {
    _component.Component.call(this, options);
};
CallLog.prototype = Object.create(_component.Component.prototype);
CallLog.prototype.constructor = CallLog;

CallLog.prototype.beforeUpdate = function (action, props) {
    var defaultAction = _component.Component.prototype.beforeUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'getLog') {
            this.interval = this.loading(this.dom.message, 'Loading call log');
        }
    }
};
CallLog.prototype.afterUpdate = function (action, props) {
    var defaultAction = _component.Component.prototype.afterUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'mount') {
            this.getLog(1, 10);
        } else if (action === 'getLog') {
            // var log = this.props.records;
            // var item = new CallLogItem();
            // ...
            if (this.interval) {
                this.interval.cancel('');
                this.interval = null;
            }
        }
    }
};
CallLog.prototype.getLog = function (page, number) {
    var _this = this;

    if (this.options.actions && this.options.actions.getLog) {
        this.beforeUpdate.bind(this, 'getLog');
        return this.sdk.platform().get('/account/~/extension/~/call-log', { page: page, perPage: number }).then(function (response) {
            _this.props.records = response.json().records;
        }).then(this.afterUpdate.bind(this, 'getLog')).catch(function (e) {
            console.error('Recent Calls Error: ' + e.message);
        });
    }
};
CallLog.prototype.loading = function (target, text) {
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

},{"../component":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var state;
var CallPanel = (0, _component.register)({
    beforeUpdate: function beforeUpdate(action, props) {},
    afterUpdate: function afterUpdate(action, props) {
        if (action === 'mount') {} else if (action === 'answer') {
            state = CallPanel.state.ONLINE;
            this.triggerView(this.props);
        } else if (action === 'ignore') {
            state = CallPanel.state.HIDDEN;
            this.triggerView(this.props);
        } else if (action === 'cancel') {
            state = CallPanel.state.HIDDEN;
            this.triggerView(this.props);
        } else if (action === 'hangup') {
            state = CallPanel.state.HIDDEN;
            this.triggerView(this.props);
        } else if (action === 'record') {} else if (action === 'hold') {} else if (action === 'mute') {}
    },
    methods: {
        answer: function answer() {
            if (this.options.actions && this.options.actions.answer) {
                this.beforeUpdate.bind(this, 'answer');
                // FIXME: The custom login may not be a Promise
                return this.options.actions.answer(this.props).then(this.afterUpdate.bind(this, 'answer')).catch(function (err) {
                    return console.error('login error:' + error);
                });
            }
        },
        ignore: function ignore() {
            if (this.options.actions && this.options.actions.ignore) {
                this.beforeUpdate.bind(this, 'ignore');
                // FIXME: The custom login may not be a Promise
                return this.options.actions.ignore(this.props).then(this.afterUpdate.bind(this, 'ignore')).catch(function (err) {
                    return console.error('login error:' + error);
                });
            }
        },
        cancel: function cancel() {
            if (this.options.actions && this.options.actions.cancel) {
                this.beforeUpdate.bind(this, 'cancel');
                // FIXME: The custom login may not be a Promise
                return this.options.actions.cancel(this.props).then(this.afterUpdate.bind(this, 'cancel')).catch(function (err) {
                    return console.error('login error:' + error);
                });
            }
        },

        hangup: function hangup() {
            if (this.options.actions && this.options.actions.hangup) {
                this.beforeUpdate.bind(this, 'hangup');
                // FIXME: The custom login may not be a Promise
                return this.options.actions.hangup(this.props).then(this.afterUpdate.bind(this, 'hangup')).catch(function (err) {
                    return console.error('login error:' + error);
                });
            }
        },

        called: function called(event) {
            state = CallPanel.state.CALLIN;
            this.triggerView();
        },

        callStarted: function callStarted(event) {
            state = CallPanel.state.ONLINE;
            this.triggerView();
        },

        callRejected: function callRejected(event) {
            console.log('call reject');
            state = CallPanel.state.HIDDEN;
            this.triggerView();
        },

        callEnded: function callEnded(event) {
            console.log('end');
            state = CallPanel.state.HIDDEN;
            this.triggerView();
        },

        callFailed: function callFailed(event) {
            console.log('fail');
            state = CallPanel.state.HIDDEN;
            this.triggerView();
        }
    }
});
CallPanel.state = {
    'HIDDEN': 0,
    'CALLIN': 1,
    'CALLOUT': 2,
    'ONLINE': 3
};

var triggerView = function triggerView(props) {
    props.dom['callin-panel'].style.display = 'none';
    props.dom['callout-panel'].style.display = 'none';
    props.dom['online-panel'].style.display = 'none';
    if (callTimeInterval) {
        callTimeInterval.cancel();
        callTimeInterval = null;
    }
    if (state === CallPanel.state.CALLIN) {
        props.dom['callin-panel'].style.display = 'block';
    } else if (state === CallPanel.state.CALLOUT) {
        props.dom['callout-panel'].style.display = 'block';
    } else if (state === CallPanel.state.ONLINE) {
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

},{"../component":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var DialPad = (0, _component.register)({
    beforeUpdate: function beforeUpdate(action, props) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
                console.log('div before callout');
                this.interval = loading(this.props.dom.callout, 'Call');
            }
    },
    afterUpdate: function afterUpdate(action, props) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
                if (this.interval) {
                    this.interval.cancel('Call');
                    this.interval = null;
                }
            }
    },
    methods: {
        dialing: function dialing(finish, event) {
            var button = event.target;
            this.props.dom.number.value += button.getAttribute('data-value');
        },
        callout: function callout(finish) {
            this.props.toNumber = this.props.dom.number.value;
            this.props.fromNumber = localStorage.getItem('username');
            return finish(this.props);
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

},{"../component":1}],6:[function(require,module,exports){
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
            webPhone.ua.on('sipIncomingCall', function (e) {
                line = e;
                handlers.called.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callStarted', function (e) {
                handlers.callStarted.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callRejected', function (e) {
                handlers.callRejected.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callEnded', function (e) {
                handlers.callEnded.forEach(function (h) {
                    return h(e);
                });
            });
            webPhone.ua.on('callFailed', function (e) {
                handlers.callFailed.forEach(function (h) {
                    return h(e);
                });
            });
        }
    };
}(sdk, webPhone);
exports.default = rcHelper;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rcHelper = exports.CallLog = exports.DialPad = exports.CallPanel = exports.AuthPanel = undefined;

var _authPanel = require('./components/auth-panel');

var _authPanel2 = _interopRequireDefault(_authPanel);

var _callPanel = require('./components/call-panel');

var _callPanel2 = _interopRequireDefault(_callPanel);

var _dialPad = require('./components/dial-pad');

var _dialPad2 = _interopRequireDefault(_dialPad);

var _callLog = require('./components/call-log');

var _callLog2 = _interopRequireDefault(_callLog);

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AuthPanel = _authPanel2.default;
window.CallPanel = _callPanel2.default;
window.DialPad = _dialPad2.default;
window.CallLog = _callLog2.default;
window.rcHelper = _helper2.default;

exports.AuthPanel = _authPanel2.default;
exports.CallPanel = _callPanel2.default;
exports.DialPad = _dialPad2.default;
exports.CallLog = _callLog2.default;
exports.rcHelper = _helper2.default;

},{"./components/auth-panel":2,"./components/call-log":3,"./components/call-panel":4,"./components/dial-pad":5,"./helper":6}]},{},[7])


//# sourceMappingURL=build.js.map
