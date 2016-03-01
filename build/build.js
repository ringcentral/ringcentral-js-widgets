(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Component = function Component(options) {
    var _this = this;

    if (!options.target) {
        throw new Error('need specifiy a target');
    }
    if (!options.template) {
        // TODO: maybe use default template
        throw new Error('need specifiy a template');
    }
    // TODO: use Object.extend or somewhat (es6) for default option setting
    this.options = options || {};
    this.targetDOM = document.querySelector(options.target);
    this.fetchTemplate(options.template).then(function () {
        return _this.bindDOM;
    }).then(function () {
        return _this.componentMounted;
    });
};
Component.prototype.fetchTemplate = function (src) {
    var _this2 = this;

    return fetch(src).then(function (response) {
        return response.text();
    }).then(function (body) {
        return _this2.targetDOM.innerHTML = body;
    });
};
Component.prototype.bindDOM = function () {
    var _this3 = this;

    this.dom = {};
    console.log(document.querySelectorAll('[data-info]'));
    [].forEach.call(document.querySelectorAll('[data-info]'), function (doc) {
        var info = doc.getAttribute('data-info');
        _this3.dom[info] = doc;
    });
    [].forEach.call(document.querySelectorAll('[data-event]'), function (doc) {
        var event = doc.getAttribute('data-event');
        var action = doc.getAttribute('data-action');
        doc.addEventListener(event, _this3[action].bind(_this3));
    });
};
Component.prototype.action = function () {};
Component.prototype.componentMounted = function () {};
exports.default = Component;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// prototypal inheritance, please see:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var AuthPanel = function AuthPanel(options) {
    _component2.default.call(this, options);
    console.log(this.dom);
};
AuthPanel.prototype = Object.create(_component2.default.prototype);
AuthPanel.prototype.constructor = AuthPanel;

AuthPanel.prototype.componentMounted = function () {
    _component2.default.componentMounted.call(this);
    this.dom.key.value = localStorage.getItem('key');
    this.dom.secret.value = localStorage.getItem('secret');
    this.dom.username.value = localStorage.getItem('username');
    this.dom.extension.value = localStorage.getItem('extension');
    this.dom.password.value = localStorage.getItem('password');
};
AuthPanel.prototype.beforeLogin = function () {
    localStorage.setItem('server', this.dom.server.value || '');
    localStorage.setItem('key', this.dom.key.value || '');
    localStorage.setItem('secret', this.dom.secret.value || '');
    localStorage.setItem('username', this.dom.username.value || '');
    localStorage.setItem('extension', this.dom.extension.value || '');
    localStorage.setItem('password', this.dom.password.value || '');
    this.dom.login.disabled = true;
    this.dom.error.textContent = '';
    this.interval = this.loading(this.dom.login, 'login');
    if (this.options.listeners.beforeLogin) {
        this.options.listeners.beforeLogin();
        // if (!this.options.listeners.afterLogin) {
        //     console.warn('you may encounter UI problems because you overrided one of login lifecycle.');
        // }
    }
};

AuthPanel.prototype.afterLogin = function () {
    this.dom.login.disabled = false;
    // stop loading animation
    if (this.interval) {
        this.interval.cancel();
        this.interval = null;
    }
    if (this.options.listeners.afterLogin) {
        this.options.listeners.afterLogin();
        // if (!this.options.listeners.beforeLogin) {
        //     console.warn('you may encounter UI problems because you overrided one of login lifecycle.');
        // }
    }
};

AuthPanel.prototype.login = function () {
    this.beforeLogin();
    if (this.options.actions && this.options.actions.login) {
        // FIXME: The custom login may not be a Promise
        return this.options.actions.login(this.dom)
        // bind the lexical env to the function, otherwise will be 'window' scope
        .then(this.afterLogin.bind(this)).catch(function (err) {
            return console.error('login error:' + error);
        });
    }
};
AuthPanel.prototype.signup = function () {
    this.options.actions && this.options.signup && this.options.signup();
};
AuthPanel.prototype.close = function () {};
AuthPanel.prototype.loading = function (target, text) {
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
exports.default = AuthPanel;

},{"../component":1}],3:[function(require,module,exports){
'use strict';

var CallLog = function CallLog(options) {
    // TODO: choose a template engine
    if (!options.target) {
        throw new Error('need specifiy a target for auth panel');
    }
    this.sdk = options.sdk;
    this.webPhone = options.webPhone || new RingCentral.WebPhone({ audioHelper: true });

    this.targetDOM = document.querySelector(options.target);
    this.generateDOM();
    this.getLog(1, 10);
};

CallLog.prototype.generateDOM = function (state) {
    var _this = this;

    // hard code the dom composition
    this.element = {
        logPanel: dom('div', {
            className: 'rc-panel'
        }, null, {
            message: dom('div', {
                className: 'rc-message'
            })
        })
    };

    this.template = function (call) {
        var temp = dom('div', {
            className: 'rc-sub-panel rc-calllog'
        }, null, {
            name: dom('div', {
                className: 'rc-calllog-name',
                text: call.from.name || 'anonymous'
            }),
            type: dom('div', {
                className: 'rc-calllog-type',
                text: call.direction || 'unknown'
            }),
            time: dom('div', {
                className: 'rc-calllog-time',
                text: call.startTime || 'none'
            })
        });
        return temp;
    };

    Object.keys(this.element).forEach(function (index) {
        _this.targetDOM.appendChild(_this.element[index]);
    });

    function dom(type, attributes, listeners, children) {
        var element = document.createElement(type);
        attributes && Object.keys(attributes).forEach(function (index) {
            var attr = attributes[index];
            if (index === 'className') {
                element.className = attr;
            } else if (index === 'text') {
                element.textContent = attr;
            } else {
                // attribute
                element.setAttribute(index, attr);
            }
        });
        listeners && Object.keys(listeners).forEach(function (index) {
            var listener = listeners[index];
            element.addEventListener(index, listener);
        });
        children && Object.keys(children).forEach(function (index) {
            var child = children[index];
            element.appendChild(child);
            element[index] = child;
        });
        return element;
    }
};

CallLog.prototype.getLog = function (page, number) {
    var _this2 = this;

    this.interval = this.loading(this.element.logPanel.message, 'Loading call log');
    return this.sdk.platform().get('/account/~/extension/~/call-log', { page: page, perPage: number }).then(function (response) {
        if (_this2.interval) {
            _this2.interval.cancel('');
            _this2.interval = null;
        }
        calls = response.json().records;
        calls.forEach(function (call) {
            _this2.element.logPanel.appendChild(_this2.template(call));
        });
    }).catch(function (e) {
        console.error('Recent Calls Error: ' + e.message);
    });
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

},{}],4:[function(require,module,exports){
'use strict';

var CallPanel = function CallPanel(options) {
    if (!options.target) {
        new Error('need specifiy a target for call panel');
    }
    this.sdk = options.sdk;
    this.webPhone = options.webPhone || new RingCentral.WebPhone({ audioHelper: true });

    this.line = null;
    this.state = CallPanel.state.HIDDEN;
    this.target = options.target;
    this.bindPhoneListener();
    this.generateDOM();
    this.triggerView();

    this.afterCallStart = options.afterCallStart || function () {};
    this.afterCallEnd = options.afterCallEnd || function () {};
};
CallPanel.state = {
    'HIDDEN': 0,
    'CALLIN': 1,
    'CALLOUT': 2,
    'ONLINE': 3
};

// TODO: replace this method with template engine
CallPanel.prototype.generateDOM = function () {
    this.element = {
        panel: dom('div', {}, null, {
            callinPanel: dom('div', {
                className: 'rc-panel'
            }, null, {
                callinNumber: dom('div'),
                answerButton: dom('button', {
                    className: 'rc-button',
                    text: 'Answer'
                }, { click: this.answer.bind(this) }),
                ignoreButton: dom('button', {
                    className: 'rc-button',
                    text: 'Ignore'
                }, { click: this.ignore.bind(this) })
            }),
            calloutPanel: dom('div', {
                className: 'rc-panel'
            }, null, {
                cancelButton: dom('button', {
                    className: 'rc-button',
                    text: 'Cancel'
                }, { click: this.cancel.bind(this) })
            }),
            onlinePanel: dom('div', {
                className: 'rc-panel'
            }, null, {
                callTime: dom('h3'),
                hangupButton: dom('button', {
                    className: 'rc-button rc-button-important',
                    text: 'Hangup'
                }, { click: this.hangup.bind(this) }),
                recordButton: dom('button', {
                    className: 'rc-button',
                    text: 'Record'
                }, { click: this.record.bind(this) }),
                holdButton: dom('button', {
                    className: 'rc-button',
                    text: 'Hold'
                }, { click: this.hold.bind(this) }),
                muteButton: dom('button', {
                    className: 'rc-button',
                    text: 'Mute'
                }, { click: this.mute.bind(this) })
            })
        })
    };
    this.targetDOM = document.querySelector(this.target);
    this.targetDOM.appendChild(this.element.panel);

    function dom(type, attributes, listeners, children) {
        var element = document.createElement(type);
        attributes && Object.keys(attributes).forEach(function (index) {
            var attr = attributes[index];
            if (index === 'className') {
                element.className = attr;
            } else if (index === 'text') {
                element.textContent = attr;
            } else {
                // attribute
                element.setAttribute(index, attr);
            }
        });
        listeners && Object.keys(listeners).forEach(function (index) {
            var listener = listeners[index];
            element.addEventListener(index, listener);
        });
        children && Object.keys(children).forEach(function (index) {
            var child = children[index];
            element.appendChild(child);
            element[index] = child;
        });
        return element;
    }
};
CallPanel.prototype.bindPhoneListener = function () {
    var _this = this;

    this.webPhone.ua.on('sipIncomingCall', function (e) {
        console.log('call incoming');
        _this.line = e;
        _this.state = CallPanel.state.CALLIN;
        _this.triggerView();
    });
    this.webPhone.ua.on('outgoingCall', function (e) {
        console.log('call outgoing');
        _this.line = e;
        _this.state = CallPanel.state.CALLOUT;
        _this.triggerView();
    });
    this.webPhone.ua.on('callStarted', function (e) {
        console.log('call start');
        _this.state = CallPanel.state.ONLINE;
        _this.triggerView();
        _this.afterCallStart();
    });
    this.webPhone.ua.on('callRejected', function (e) {
        console.log('reject');
        _this.state = CallPanel.state.HIDDEN;
        _this.triggerView();
        _this.afterCallEnd();
    });
    this.webPhone.ua.on('callEnded', function (e) {
        console.log('end');
        _this.state = CallPanel.state.HIDDEN;
        _this.triggerView();
        _this.afterCallEnd();
    });
    this.webPhone.ua.on('callFailed', function (e) {
        console.log('end');
        _this.state = CallPanel.state.HIDDEN;
        _this.triggerView();
        _this.afterCallEnd();
    });
};
CallPanel.prototype.answer = function () {
    var _this2 = this;

    return this.webPhone.answer(this.line).then(function () {
        _this2.state = CallPanel.state.ONLINE;
        _this2.triggerView();
    }).catch(function (e) {
        console.error(e);
    });
};
CallPanel.prototype.ignore = function () {
    this.state = CallPanel.state.HIDDEN;
    this.triggerView();
};
CallPanel.prototype.cancel = function () {
    var _this3 = this;

    if (!this.line) return;
    return this.line.cancel().then(function () {
        _this3.state = CallPanel.state.HIDDEN;
        _this3.triggerView();
    }).catch(function (err) {
        return console.error(err);
    });
};
CallPanel.prototype.hangup = function () {
    var _this4 = this;

    if (!this.line) return;

    return this.webPhone.hangup(this.line).then(function () {
        _this4.state = CallPanel.state.HIDDEN;
        _this4.triggerView();
    }).catch(function (err) {
        return console.error(err);
    });
};
CallPanel.prototype.record = function () {
    var _this5 = this;

    if (this.line.isOnRecord()) {
        return this.line.record(false).then(function () {
            return _this5.element.panel.onlinePanel.recordButton.textContent = 'Record';
        }).catch(function (err) {
            console.err(err);
        });
    } else {
        return this.line.record(true).then(function () {
            return _this5.element.panel.onlinePanel.recordButton.textContent = 'Stop Record';
        }).catch(function (err) {
            console.err(err);
        });
    }
};
CallPanel.prototype.stopRecord = function () {};
CallPanel.prototype.hold = function () {
    var _this6 = this;

    if (this.line.isOnHold()) {
        return this.line.setHold(false).then(function () {
            console.log(_this6.line.isOnHold());
            _this6.element.panel.onlinePanel.holdButton.textContent = 'Hold';
        });
    } else {
        return this.line.setHold(true).then(function () {
            console.log(_this6.line.isOnHold());
            _this6.element.panel.onlinePanel.holdButton.textContent = 'Unhold';
        });
    }
};
CallPanel.prototype.mute = function () {
    var _this7 = this;

    if (this.line.isOnMute()) {
        return this.line.setMute(false, false).then(function () {
            console.log(_this7.line.isOnMute());
            _this7.element.panel.onlinePanel.muteButton.textContent = 'Mute';
        });
    } else {
        return this.line.setMute(true, false).then(function () {
            console.log(_this7.line.isOnMute());
            _this7.element.panel.onlinePanel.muteButton.textContent = 'Unmute';
        });
    }
};
CallPanel.prototype.answerIncomingCall = function () {
    var _this8 = this;

    return webPhone.answer(this.line).then(function () {
        _this8.state = CallPanel.state.ONLINE;
        _this8.triggerView();
    }).catch(function (e) {
        return console.error(e);
    });
};
CallPanel.prototype.triggerView = function () {
    this.element.panel.style.display = 'block';
    this.element.panel.callinPanel.style.display = 'none';
    this.element.panel.calloutPanel.style.display = 'none';
    this.element.panel.onlinePanel.style.display = 'none';
    if (this.callTimeInterval) {
        this.callTimeInterval.cancel();
        this.callTimeInterval = null;
    }
    if (this.state === CallPanel.state.CALLIN) {
        this.element.panel.callinPanel.callinNumber.textContent = this.line.contact.number;
        this.element.panel.callinPanel.style.display = 'block';
    } else if (this.state === CallPanel.state.CALLOUT) {
        this.element.panel.calloutPanel.style.display = 'block';
    } else if (this.state === CallPanel.state.ONLINE) {
        this.element.panel.onlinePanel.style.display = 'block';
        this.callTimeInterval = this.updateCallTime(this.line.timeCallStarted);
    } else if (this.state === CallPanel.state.HIDDEN) {
        this.element.panel.style.display = 'none';
    }
};
CallPanel.prototype.loading = function (target, text) {
    var _this9 = this;

    if (this.interval) return;
    var dotCount = 1;
    this.interval = window.setInterval(function () {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--) {
            dot += '.';
        }console.log(_this9.element.loginButton);
        target.loginButton.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500);
};
CallPanel.prototype.stopLoading = function () {
    if (this.interval) {
        window.clearInterval(this.interval);
        this.interval = null;
    }
};
CallPanel.prototype.updateCallTime = function (startTime) {
    var _this10 = this;

    // FIXME: it's not accurate
    if (!startTime) return;
    var currentTime = Date.now() - startTime;
    var callPanel = this;
    var callTimeInterval = window.setInterval(function () {
        var sec = currentTime % 60;
        var min = Math.floor(currentTime / 60);
        _this10.element.panel.onlinePanel.callTime.textContent = min + ":" + sec;
        currentTime++;
    }, 1000);
    return {
        cancel: function cancel() {
            if (!callTimeInterval) return;
            window.clearInterval(callTimeInterval);
            callPanel.element.panel.onlinePanel.callTime.textContent = "0:0";
            callTimeInterval = null;
        }
    };
};

},{}],5:[function(require,module,exports){
'use strict';

var DialPad = function DialPad(options) {
    // TODO: choose a template engine
    if (!options.target) {
        throw new Error('need specifiy a target for dial pad');
    }
    this.options = options || {};
    this.targetDOM = document.querySelector(options.target);
    this.bindDOM();
};
DialPad.prototype.bindDOM = function () {
    var _this = this;

    this.dom = {
        dial1: document.querySelector('[data-action=dial-1]'),
        dial2: document.querySelector('[data-action=dial-2]'),
        dial3: document.querySelector('[data-action=dial-3]'),
        dial4: document.querySelector('[data-action=dial-4]'),
        dial5: document.querySelector('[data-action=dial-5]'),
        dial6: document.querySelector('[data-action=dial-6]'),
        dial7: document.querySelector('[data-action=dial-7]'),
        dial8: document.querySelector('[data-action=dial-8]'),
        dial9: document.querySelector('[data-action=dial-9]'),
        dial0: document.querySelector('[data-action=dial-0]'),
        callout: document.querySelector('[data-action=callout]'),
        number: document.querySelector('[data-info=number]')
    };
    Object.keys(this.dom).forEach(function (index) {
        console.log(index);
        if (index.indexOf('dial') > -1) {
            var dial = _this.dom[index];
            var number = dial.getAttribute('data-value');
            dial.addEventListener('click', _this.dialing.bind(_this, number));
        }
        if (index === 'callout') {
            var callout = _this.dom[index];
            callout.addEventListener('click', _this.callout.bind(_this));
        }
    });
};

DialPad.prototype.dialing = function (number) {
    if (!this.dom || !this.dom.number) {
        throw Error('Dial pad need a number input');
    }
    this.dom.number.value += number;
};
DialPad.prototype.callout = function () {
    var _this2 = this;

    this.interval = this.loading(this.dom.callout, 'Call');

    var toNumber = this.dom.number;
    if (this.options.actions && this.options.actions.callout) {
        return this.options.actions.callout(this.dom, { toNumber: toNumber }).then(function (countryId) {
            console.log('SIP call to', toNumber, 'from', fromNumber + '\n');
            if (_this2.interval) {
                _this2.interval.cancel('Call');
                _this2.interval = null;
            }
        });
    }
};
DialPad.prototype.loading = function (target, text) {
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

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CallLog = exports.DialPad = exports.CallPanel = exports.AuthPanel = undefined;

var _authPanel = require('./components/auth-panel');

var _authPanel2 = _interopRequireDefault(_authPanel);

var _callPanel = require('./components/call-panel');

var _callPanel2 = _interopRequireDefault(_callPanel);

var _dialPad = require('./components/dial-pad');

var _dialPad2 = _interopRequireDefault(_dialPad);

var _callLog = require('./components/call-log');

var _callLog2 = _interopRequireDefault(_callLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AuthPanel = _authPanel2.default;
window.CallPanel = _callPanel2.default;
window.DialPad = _dialPad2.default;
window.CallLog = _callLog2.default;

exports.AuthPanel = _authPanel2.default;
exports.CallPanel = _callPanel2.default;
exports.DialPad = _dialPad2.default;
exports.CallLog = _callLog2.default;

},{"./components/auth-panel":2,"./components/call-log":3,"./components/call-panel":4,"./components/dial-pad":5}]},{},[6])


//# sourceMappingURL=build.js.map
