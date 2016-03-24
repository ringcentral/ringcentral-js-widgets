'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : undefined;
function __commonjs(fn, module) {
    return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports;
}

var sdk = new RingCentral.SDK({
    appKey: '8mOtYiilT5OUPwwdeGgvpw',
    appSecret: 'cqNn89RmR2SR76Kpp8xJaAdNzNOqR8Qfmjb0B-gDOHTw',
    server: RingCentral.SDK.server.production
});

var services = {};
function register(name, service) {
    services[name] = service;
}
function getServices() {
    return services;
}

var LoginService = function (sdk) {
    var onLoginHandler = [];
    return {
        login: function login(username, extension, password) {
            return sdk.platform().login({
                'username': username,
                'extension': extension,
                'password': password
            });
        },
        logout: function logout() {
            return sdk.platform().logout();
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
        }

    };
}(sdk);
register('loginService', LoginService);

var CallLogService = function (sdk) {
    var period = 7 * 24 * 3600 * 1000;
    var dateFrom = new Date(Date.now() - period);
    return {
        getCallLogs: function getCallLogs() {
            return sdk.platform().get('/account/~/extension/~/call-log', { dateFrom: dateFrom.toISOString() }).then(function (response) {
                return response.json().records;
            });
        }
    };
}(sdk);

register('callLogService', CallLogService);

var webPhone = new RingCentral.WebPhone({
    audioHelper: {}
});

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
            return sdk.platform().post('/client-info/sip-provision', {
                sipInfo: [{
                    transport: 'WSS'
                }]
            }).then(function (res) {
                return webPhone.register(res.json(), false).catch(function (e) {
                    return Promise.reject(err);
                });
            });
        },
        callout: function callout(fromNumber, toNumber) {
            // TODO: validate toNumber and fromNumber
            if (!sdk || !webPhone) {
                throw Error('Need to set up SDK and webPhone first.');
                return;
            }
            return sdk.platform().get('/restapi/v1.0/account/~/extension/~').then(function (res) {
                var info = res.json();
                if (info && info.regionalSettings && info.regionalSettings.homeCountry) {
                    return info.regionalSettings.homeCountry.id;
                }
                return null;
            }).then(function (countryId) {
                webPhone.call(toNumber, fromNumber, countryId);
            });
        },
        answer: function answer() {
            return webPhone.answer(line);
        },
        ignore: function ignore() {},
        cancel: function cancel() {
            return line.cancel();
        },
        hangup: function hangup() {
            return webPhone.hangup(line);
        },
        on: function on(name, handler) {
            handlers[name].push(handler);
        },
        listen: function listen() {
            webPhone.ua.on('incomingCall', function (e) {
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
}();
register('phoneService', PhoneService);

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
}(sdk);

register('rcContactService', rcContactService);

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
register('contactSearchService', contactSearchService);

var rcContactSearchProvider = function () {
    return {
        search: function search(text) {
            var results = [];
            if (text) {
                text = text.toLowerCase();
                rcContactService.companyContacts.map(function (contact) {
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

register('rcContactSearchProvider', rcContactSearchProvider);

var accountService = function (sdk) {
    var info;
    var numbers;
    return {
        getAccountInfo: function getAccountInfo() {
            return sdk.platform().get('/account/~/extension/~').then(function (response) {
                info = response.json();
                return info;
            }).catch(function (e) {
                return console.error('Recent Calls Error: ' + e.message);
            });
        },

        getPhoneNumber: function getPhoneNumber() {
            return sdk.platform().get('/account/~/extension/~/phone-number').then(function (response) {
                return response.json();
            }).then(function (data) {
                numbers = data.records;
                return data.records;
            }).catch(function (e) {
                return console.error('Recent Calls Error: ' + e.message);
            });
        },

        hasServiceFeature: function hasServiceFeature(name) {
            if (!info) return Error('Need to fetch account info by accountService.getAccountInfo');
            return info.serviceFeatures.filter(function (feature) {
                return feature.featureName.toLowerCase() === name.toLowerCase();
            }).length > 0;
        },

        listNumber: function listNumber(type) {
            return numbers.filter(function (number) {
                return number.type === type;
            }).map(function (number) {
                return number.phoneNumber;
            });
        }
    };
}(sdk);

register('accountService', accountService);

var rcSubscription = function () {

    var cacheKey = 'ringcentral-subscription';
    var subscription = sdk.createCachedSubscription(cacheKey).restore();
    var handlers = {};
    subscription.on(subscription.events.notification, function (msg) {
        for (var key in handlers) {
            if (handlers.hasOwnProperty(key)) {
                if (msg.event.indexOf(key) > -1) {
                    handlers[key].forEach(function (h) {
                        try {
                            h(msg);
                        } catch (e) {
                            console.error('Error occurs when invoking subscription notification handler for "' + msg.event + '": ' + e);
                        }
                    });
                }
            }
        }
    });

    return {
        subscribe: function subscribe(suffix, event, handler) {
            if (event && suffix) {
                if (!handlers.suffix) {
                    handlers[suffix] = [];
                }
                handlers[suffix].push(handler);
                subscription.addEventFilters(event).register();
            }
        }
    };
}();

register('rcSubscription', rcSubscription);

var rcMessageService = function (sdk) {

    var MESSAGES_MAX_AGE_HOURS = 7 * 24;
    var messages = {};
    var fetchingPromise = null;
    var syncToken = null;
    var messageUpdateHandlers = [];

    function fullSyncMessages() {
        return sdk.platform().get('/account/~/extension/~/message-sync', {
            dateFrom: new Date(Date.now() - MESSAGES_MAX_AGE_HOURS * 3600 * 1000).toISOString(),
            syncType: 'FSync'
        }).then(function (responses) {
            var jsonResponse = responses.json();
            syncToken = jsonResponse.syncInfo.syncToken;
            var results = jsonResponse.records;
            addMessageToList(results);
            fetchingPromise = null;
        });
    }

    function incrementalSyncMessages() {
        if (syncToken) {
            return sdk.platform().get('/account/~/extension/~/message-sync', {
                syncType: 'ISync',
                syncToken: syncToken
            }).then(function (responses) {
                var jsonResponse = responses.json();
                var results = jsonResponse.records;
                updateMessageList(results);
                messageUpdateHandlers.forEach(function (h) {
                    h(results);
                });
            });
        }
    }

    function concatMessages() {
        var results = [];
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                results = results.concat(messages[key]);
            }
        }
        return results;
    }

    function addMessageToList(results) {
        results.forEach(function (message) {
            if (!messages[message.type]) {
                messages[message.type] = [];
            }
            messages[message.type].push(message);
        });
    }

    function updateMessageList(results) {
        results.forEach(function (message) {
            var messageList = messages[message.type];
            if (!messageList) {
                if (message.availability === 'Alive') {
                    messages[message.type] = [];
                    messages[message.type].splice(0, 0, message);
                }
            } else {
                var index = 0;
                for (; index < messageList.length; index++) {
                    if (messageList[index].id === message.id) {
                        if (message.availability === 'Alive') {
                            messageList[index] = message;
                        } else {
                            messageList.splice(index, 1);
                        }
                        break;
                    }
                }
                if (index === messageList.length) {
                    if (message.availability === 'Alive') {
                        messageList.splice(0, 0, message);
                    }
                }
            }
        });
    }

    return {
        syncMessages: function syncMessages() {
            fetchingPromise = fullSyncMessages();
            return fetchingPromise;
        },
        getMessagesByType: function getMessagesByType(type) {
            if (!fetchingPromise) {
                if (messages[type]) {
                    return messages[type];
                } else {
                    return [];
                }
            } else {
                return fetchingPromise.then(function () {
                    return messages[type];
                });
            }
        },
        getAllMessages: function getAllMessages() {
            if (!fetchingPromise) {
                return concatMessages();
            } else {
                return fetchingPromise.then(function () {
                    return concatMessages();
                });
            }
        },
        subscribeToMessageUpdate: function subscribeToMessageUpdate() {
            rcSubscription.subscribe('message-store', '/restapi/v1.0/account/~/extension/~/message-store', function (msg) {
                incrementalSyncMessages();
            });
        },
        onMessageUpdated: function onMessageUpdated(handler) {
            if (handler) {
                messageUpdateHandlers.push(handler);
            }
        }
    };
}(sdk);

register('rcMessageService', rcMessageService);

var rcMessageProvider = function () {

    var messageUpdatedHandlers = [];
    rcMessageService.onMessageUpdated(function () {
        messageUpdatedHandlers.forEach(function (h) {
            try {
                h();
            } catch (e) {
                console.error(e);
            }
        });
    });

    function createResult(message) {
        var result = {};
        if (message.direction === 'Outbound') {
            if (message.type === 'Pager') {
                result.contact = message.to[0].extensionNumber;
            } else {
                result.contact = message.to[0].phoneNumber;
            }
        } else {
            if (message.type === 'Pager') {
                result.contact = message.from.extensionNumber;
            } else {
                result.contact = message.from.phoneNumber;
            }
        }
        //TODO: Use localization string instead of plain text
        if (message.type === 'SMS' || message.type === 'Pager') {
            result.subject = message.subject;
        } else if (message.type === 'VoiceMail') {
            result.subject = 'Voice Message';
        } else if (message.type === 'Fax') {
            result.subject = 'Fax';
        }
        result.readStatus = message.readStatus;
        result.type = message.type;
        result.id = message.id;
        result.time = message.lastModifiedTime;
        return result;
    }

    return {
        getTextMessages: function getTextMessages() {
            return Promise.resolve(rcMessageService.getMessagesByType('SMS')).then(function (messages) {
                var results = [];
                messages.forEach(function (message) {
                    results.push(createResult(message));
                });
                return results;
            });
        },
        //Return all messages of type 'VoiceMail' and 'Fax'. For SMS and Pager, only last message in a conversation
        // will be returned.
        getLastMessagesOfAllType: function getLastMessagesOfAllType() {
            return Promise.resolve(rcMessageService.getAllMessages()).then(function (messages) {
                var results = [];
                var added = {};
                messages.forEach(function (message) {
                    var result = createResult(message);
                    //Combine SMS/Pager messages in conversation
                    if (message.conversationId) {
                        if (!added[message.conversationId]) {
                            added[message.conversationId] = [];
                        }
                        added[message.conversationId].push(result);
                    } else {
                        results.push(result);
                    }
                });
                for (var key in added) {
                    if (added.hasOwnProperty(key)) {
                        results.push(added[key][0]);
                    }
                }
                return results;
            });
        },
        onMessageUpdated: function onMessageUpdated(handler) {
            messageUpdatedHandlers.push(handler);
        }
    };
}();
register('rcMessageProvider', rcMessageProvider);

var actions = {};
function register$1(name, action) {
    actions[name] = action;
}
function getActions() {
    return actions;
}

var interaction = {
    show: {
        before: function before() {},
        method: function method(finish) {},
        after: function after() {
            var target = arguments.length <= 0 || arguments[0] === undefined ? this.props.root : arguments[0];

            target.classList.remove('display-none');
        }
    },
    hide: {
        before: function before() {},
        method: function method(finish) {},
        after: function after() {
            var target = arguments.length <= 0 || arguments[0] === undefined ? this.props.root : arguments[0];

            target.classList.add('display-none');
        }
    },
    diabled: {
        before: function before() {},
        method: function method(finish) {},
        after: function after() {
            var target = arguments.length <= 0 || arguments[0] === undefined ? this.props.root : arguments[0];
            var message = arguments[1];

            var mask = document.createElement('div');
            // FIXME Decouple from rc
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
register$1('interaction', interaction);

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

function isThenable(result) {
    if (result.then && typeof result.then === 'function') return true;
    return false;
}

function isFunction(fn) {
    return typeof fn === 'function';
}

function ensureTail(string, tail) {
    if (string.endsWith(tail)) return string;
    return string + tail;
}

function toFunction(fn, defalut) {
    if (fn && isFunction(fn)) return fn;else if (defalut && isFunction(defalut)) return defalut;else return function () {};
}

function shallowCopy(target) {
    if (Array.isArray(target)) return target.slice(0);
    return Object.assign({}, target);
}

var logger;
var functionSet = {
    before: function before() {},
    method: function method() {},
    after: function after() {},
    error: function error(e) {
        logger.error(e);
        throw e;
    }
};
function register$2() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? settings : arguments[0];

    var actions = _ref.actions;
    var data = _ref.data;

    if (!actions) console.warn('Widgets do not have actions defined, maybe you get some typo.');
    ['init', 'render', 'remove', 'error'].forEach(function (action) {
        actions[action] = Object.assign(shallowCopy(functionSet), actions[action]);
    });
    return widget.bind(null, { actions: actions, data: data });
}

function widget(_ref2, options) {
    var _this = this;

    var actions = _ref2.actions;
    var _ref2$data = _ref2.data;
    var data = _ref2$data === undefined ? {} : _ref2$data;

    if (!options.internal) {
        return Error('You are trying to construct a widget manually, please use w()');
    }
    var defaultActions = shallowCopy(actions);
    this.props = {};
    this.custom = {};
    this.data = Object.assign(data, options.data);
    logger = initLogger(options.logLevel);

    Object.keys(defaultActions).forEach(function (index) {
        defaultActions[index] = bindScope(_this, defaultActions[index]);
    });
    Object.keys(options.actions).forEach(function (index) {
        options.actions[index] = bindScope(_this, options.actions[index]);
    });
    Object.keys(defaultActions).forEach(function (index) {
        _this[index] = generateActions(defaultActions[index], options.actions[index], index);
    });
    this.props.dom = generateDocument(this, options.template);
    this.props.root = getDocumentRoot(options.template);
    this.props.template = options.template;
    this.render = generateActions({
        before: defaultActions.render.before,
        method: render.bind(this, defaultActions.render.method, this.props.template),
        after: defaultActions.render.after
    }, options.actions.render, 'render');
    this.remove = generateActions({
        before: defaultActions.remove.before,
        method: remove.bind(this, defaultActions.remove.method),
        after: defaultActions.remove.after
    }, options.actions.remove, 'remove');
    this.init();

    function remove(widgetRemove, finish) {
        this.props.target.parentNode.removeChild(this.props.target);
        if (widgetRemove && isFunction(widgetRemove)) return widgetRemove.call(this, finish);
    }

    function render(widgetRender, template, finish, target, callback) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            target = target;
        } else {
            logger.warn('first argument of render method should be selector string or dom');
        }
        // the template can only have one root
        this.props.target = shallowCopy(Array.from(template.childNodes))[0];
        target.appendChild(template);
        callback && isFunction(callback) && callback();
        if (widgetRender && isFunction(widgetRender)) return widgetRender.call(this, finish);
    }
}

function bindScope(scope, action) {
    return {
        before: toFunction(action.before).bind(scope),
        method: toFunction(action.method).bind(scope),
        after: toFunction(action.after).bind(scope),
        error: toFunction(action.error, logger.error).bind(scope)
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
                logger.warn('No such method:' + action + ' in ' + events + ', check data-event and widget methods definition.');
                return;
            }
            doc.addEventListener(eventName, widget[action].bind(widget));
        });
    });
    return dom;
}

function getDocumentRoot(template) {
    // Assume the template only have one root
    return template.querySelector('*');
}

function generateActions(widgetAction) {
    var userAction = arguments.length <= 1 || arguments[1] === undefined ? shallowCopy(functionSet) : arguments[1];
    var name = arguments[2];

    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var before = function before() {
            var _ref3;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            logger.info('[' + name + '][before](' + (_ref3 = []).concat.apply(_ref3, args) + ')');
            return wrapUserEvent.apply(undefined, [widgetAction.before, userAction.before].concat(args));
        };
        var method = function method(arg) {
            logger.info('[' + name + '][before](' + (isFunction(arg) ? arg() : arg) + ')');
            if (isFunction(arg)) return widgetAction.method.apply(widgetAction, [userAction.method].concat(_toConsumableArray(arg()))) || arg;
            return widgetAction.method(userAction.method, arg) || arg;
        };
        var after = function after(arg) {
            logger.info('[' + name + '][after](' + (isFunction(arg) ? arg() : arg) + ')');
            if (isFunction(arg)) return wrapUserEvent.apply(undefined, [widgetAction.after, userAction.after].concat(_toConsumableArray(arg()))) || arg;
            return wrapUserEvent(widgetAction.after, userAction.after, arg) || arg;
        };
        var error = function error(e) {
            return wrapUserEvent(widgetAction.error, userAction.error, e);
        };
        var finish = function finish(arg) {
            if (isFunction(arg))
                // flatten one level
                return Array.isArray(arg()[0]) ? [].concat.apply([], arg()) : arg()[0];
            return arg;
        };
        try {
            return nextAction(before.apply(undefined, _toConsumableArray(args)), [before, method, after, finish], error);
        } catch (e) {
            error(e);
        }
    };
}

function wrapUserEvent(widget, user) {
    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
    }

    var _ref4;

    var continueDefault = user != null && user.apply(undefined, args);
    if (continueDefault || typeof continueDefault === 'undefined') return widget.apply(undefined, args) || function () {
        return args;
    };
    return (_ref4 = []).concat.apply(_ref4, args);
}

function nextAction(result, actions, error) {
    var start = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

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

function transitionIn(effect, target) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options && options.before && options.before();
    target.classList.add(effect);
    target.classList.add(effect + '-in');
    target.classList.remove(effect + '-out');
    window.setTimeout(function () {
        return target.classList.remove(effect + '-in');
    }, 17);
    var after = function after() {
        options && options.after && options.after();
        target.removeEventListener('transitionend', after);
    };
    target.addEventListener('transitionend', after);
}
function transitionOut(effect, target) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options && options.before && options.before();
    target.classList.add(effect);
    target.classList.remove(effect + '-in');
    window.setTimeout(function () {
        return target.classList.add(effect + '-out');
    }, 17);
    var after = function after() {
        options && options.after && options.after();
        target.removeEventListener('transitionend', after);
    };
    target.addEventListener('transitionend', after);
}
function transitionInit(effect, target) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options && options.before && options.before();
    target.classList.add(effect + '-in');
    // window.setTimeout(() => target.classList.add(effect), 17)
    var after = function after() {
        options && options.after && options.after();
        target.removeEventListener('transitionend', after);
    };
    target.addEventListener('transitionend', after);
}
function transitionToggle(effect, target) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (target.classList.contains(effect + '-out') || target.classList.contains(effect + '-in')) transitionIn(effect, target, options);else transitionOut(effect, target, options);
}

var polyglot = __commonjs(function (module, exports, global) {
    //     (c) 2012 Airbnb, Inc.
    //
    //     polyglot.js may be freely distributed under the terms of the BSD
    //     license. For all licensing information, details, and documention:
    //     http://airbnb.github.com/polyglot.js
    //
    //
    // Polyglot.js is an I18n helper library written in JavaScript, made to
    // work both in the browser and in Node. It provides a simple solution for
    // interpolation and pluralization, based off of Airbnb's
    // experience adding I18n functionality to its Backbone.js and Node apps.
    //
    // Polylglot is agnostic to your translation backend. It doesn't perform any
    // translation; it simply gives you a way to manage translated phrases from
    // your client- or server-side JavaScript application.
    //

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return factory(root);
            });
        } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
            module.exports = factory(root);
        } else {
            root.Polyglot = factory(root);
        }
    })(__commonjs_global, function (root) {
        'use strict';

        var replace = String.prototype.replace;

        // ### Polyglot class constructor
        function Polyglot(options) {
            options = options || {};
            this.phrases = {};
            this.extend(options.phrases || {});
            this.currentLocale = options.locale || 'en';
            this.allowMissing = !!options.allowMissing;
            this.warn = options.warn || warn;
        }

        // ### Version
        Polyglot.VERSION = '1.0.0';

        // ### polyglot.locale([locale])
        //
        // Get or set locale. Internally, Polyglot only uses locale for pluralization.
        Polyglot.prototype.locale = function (newLocale) {
            if (newLocale) this.currentLocale = newLocale;
            return this.currentLocale;
        };

        // ### polyglot.extend(phrases)
        //
        // Use `extend` to tell Polyglot how to translate a given key.
        //
        //     polyglot.extend({
        //       "hello": "Hello",
        //       "hello_name": "Hello, %{name}"
        //     });
        //
        // The key can be any string.  Feel free to call `extend` multiple times;
        // it will override any phrases with the same key, but leave existing phrases
        // untouched.
        //
        // It is also possible to pass nested phrase objects, which get flattened
        // into an object with the nested keys concatenated using dot notation.
        //
        //     polyglot.extend({
        //       "nav": {
        //         "hello": "Hello",
        //         "hello_name": "Hello, %{name}",
        //         "sidebar": {
        //           "welcome": "Welcome"
        //         }
        //       }
        //     });
        //
        //     console.log(polyglot.phrases);
        //     // {
        //     //   'nav.hello': 'Hello',
        //     //   'nav.hello_name': 'Hello, %{name}',
        //     //   'nav.sidebar.welcome': 'Welcome'
        //     // }
        //
        // `extend` accepts an optional second argument, `prefix`, which can be used
        // to prefix every key in the phrases object with some string, using dot
        // notation.
        //
        //     polyglot.extend({
        //       "hello": "Hello",
        //       "hello_name": "Hello, %{name}"
        //     }, "nav");
        //
        //     console.log(polyglot.phrases);
        //     // {
        //     //   'nav.hello': 'Hello',
        //     //   'nav.hello_name': 'Hello, %{name}'
        //     // }
        //
        // This feature is used internally to support nested phrase objects.
        Polyglot.prototype.extend = function (morePhrases, prefix) {
            var phrase;

            for (var key in morePhrases) {
                if (morePhrases.hasOwnProperty(key)) {
                    phrase = morePhrases[key];
                    if (prefix) key = prefix + '.' + key;
                    if ((typeof phrase === 'undefined' ? 'undefined' : _typeof(phrase)) === 'object') {
                        this.extend(phrase, key);
                    } else {
                        this.phrases[key] = phrase;
                    }
                }
            }
        };

        // ### polyglot.unset(phrases)
        // Use `unset` to selectively remove keys from a polyglot instance.
        //
        //     polyglot.unset("some_key");
        //     polyglot.unset({
        //       "hello": "Hello",
        //       "hello_name": "Hello, %{name}"
        //     });
        //
        // The unset method can take either a string (for the key), or an object hash with
        // the keys that you would like to unset.
        Polyglot.prototype.unset = function (morePhrases, prefix) {
            var phrase;

            if (typeof morePhrases === 'string') {
                delete this.phrases[morePhrases];
            } else {
                for (var key in morePhrases) {
                    if (morePhrases.hasOwnProperty(key)) {
                        phrase = morePhrases[key];
                        if (prefix) key = prefix + '.' + key;
                        if ((typeof phrase === 'undefined' ? 'undefined' : _typeof(phrase)) === 'object') {
                            this.unset(phrase, key);
                        } else {
                            delete this.phrases[key];
                        }
                    }
                }
            }
        };

        // ### polyglot.clear()
        //
        // Clears all phrases. Useful for special cases, such as freeing
        // up memory if you have lots of phrases but no longer need to
        // perform any translation. Also used internally by `replace`.
        Polyglot.prototype.clear = function () {
            this.phrases = {};
        };

        // ### polyglot.replace(phrases)
        //
        // Completely replace the existing phrases with a new set of phrases.
        // Normally, just use `extend` to add more phrases, but under certain
        // circumstances, you may want to make sure no old phrases are lying around.
        Polyglot.prototype.replace = function (newPhrases) {
            this.clear();
            this.extend(newPhrases);
        };

        // ### polyglot.t(key, options)
        //
        // The most-used method. Provide a key, and `t` will return the
        // phrase.
        //
        //     polyglot.t("hello");
        //     => "Hello"
        //
        // The phrase value is provided first by a call to `polyglot.extend()` or
        // `polyglot.replace()`.
        //
        // Pass in an object as the second argument to perform interpolation.
        //
        //     polyglot.t("hello_name", {name: "Spike"});
        //     => "Hello, Spike"
        //
        // If you like, you can provide a default value in case the phrase is missing.
        // Use the special option key "_" to specify a default.
        //
        //     polyglot.t("i_like_to_write_in_language", {
        //       _: "I like to write in %{language}.",
        //       language: "JavaScript"
        //     });
        //     => "I like to write in JavaScript."
        //
        Polyglot.prototype.t = function (key, options) {
            var phrase, result;
            options = options == null ? {} : options;
            // allow number as a pluralization shortcut
            if (typeof options === 'number') {
                options = { smart_count: options };
            }
            if (typeof this.phrases[key] === 'string') {
                phrase = this.phrases[key];
            } else if (typeof options._ === 'string') {
                phrase = options._;
            } else if (this.allowMissing) {
                phrase = key;
            } else {
                this.warn('Missing translation for key: "' + key + '"');
                result = key;
            }
            if (typeof phrase === 'string') {
                options = clone(options);
                result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
                result = interpolate(result, options);
            }
            return result;
        };

        // ### polyglot.has(key)
        //
        // Check if polyglot has a translation for given key
        Polyglot.prototype.has = function (key) {
            return key in this.phrases;
        };

        // #### Pluralization methods
        // The string that separates the different phrase possibilities.
        var delimeter = '||||';

        // Mapping from pluralization group plural logic.
        var pluralTypes = {
            chinese: function chinese(n) {
                return 0;
            },
            german: function german(n) {
                return n !== 1 ? 1 : 0;
            },
            french: function french(n) {
                return n > 1 ? 1 : 0;
            },
            russian: function russian(n) {
                return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
            },
            czech: function czech(n) {
                return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
            },
            polish: function polish(n) {
                return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
            },
            icelandic: function icelandic(n) {
                return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
            }
        };

        // Mapping from pluralization group to individual locales.
        var pluralTypeToLanguages = {
            chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
            german: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
            french: ['fr', 'tl', 'pt-br'],
            russian: ['hr', 'ru'],
            czech: ['cs'],
            polish: ['pl'],
            icelandic: ['is']
        };

        function langToTypeMap(mapping) {
            var type,
                langs,
                l,
                ret = {};
            for (type in mapping) {
                if (mapping.hasOwnProperty(type)) {
                    langs = mapping[type];
                    for (l in langs) {
                        ret[langs[l]] = type;
                    }
                }
            }
            return ret;
        }

        // Trim a string.
        var trimRe = /^\s+|\s+$/g;
        function trim(str) {
            return replace.call(str, trimRe, '');
        }

        // Based on a phrase text that contains `n` plural forms separated
        // by `delimeter`, a `locale`, and a `count`, choose the correct
        // plural form, or none if `count` is `null`.
        function choosePluralForm(text, locale, count) {
            var ret, texts, chosenText;
            if (count != null && text) {
                texts = text.split(delimeter);
                chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
                ret = trim(chosenText);
            } else {
                ret = text;
            }
            return ret;
        }

        function pluralTypeName(locale) {
            var langToPluralType = langToTypeMap(pluralTypeToLanguages);
            return langToPluralType[locale] || langToPluralType.en;
        }

        function pluralTypeIndex(locale, count) {
            return pluralTypes[pluralTypeName(locale)](count);
        }

        // ### interpolate
        //
        // Does the dirty work. Creates a `RegExp` object for each
        // interpolation placeholder.
        var dollarRegex = /\$/g;
        var dollarBillsYall = '$$$$';
        function interpolate(phrase, options) {
            for (var arg in options) {
                if (arg !== '_' && options.hasOwnProperty(arg)) {
                    // Ensure replacement value is escaped to prevent special $-prefixed
                    // regex replace tokens. the "$$$$" is needed because each "$" needs to
                    // be escaped with "$" itself, and we need two in the resulting output.
                    var replacement = options[arg];
                    if (typeof replacement === 'string') {
                        replacement = replace.call(options[arg], dollarRegex, dollarBillsYall);
                    }
                    // We create a new `RegExp` each time instead of using a more-efficient
                    // string replace so that the same argument can be replaced multiple times
                    // in the same phrase.
                    phrase = replace.call(phrase, new RegExp('%\\{' + arg + '\\}', 'g'), replacement);
                }
            }
            return phrase;
        }

        // ### warn
        //
        // Provides a warning in the console if a phrase key is missing.
        function warn(message) {
            root.console && root.console.warn && root.console.warn('WARNING: ' + message);
        }

        // ### clone
        //
        // Clone an object.
        function clone(source) {
            var ret = {};
            for (var prop in source) {
                ret[prop] = source[prop];
            }
            return ret;
        }

        return Polyglot;
    });
});

var require$$0 = polyglot && (typeof polyglot === 'undefined' ? 'undefined' : _typeof(polyglot)) === 'object' && 'default' in polyglot ? polyglot['default'] : polyglot;

var index = __commonjs(function (module) {
    // Added for convenience in the Node environment.
    // The meat and potatoes exist in ./lib/polyglot.js.
    module.exports = require$$0;
});

function fetchWidget(file) {
    return fetch(w.options.path + ensureTail(file, '.html')).then(function (response) {
        return response.text();
    }).then(function (body) {
        var template = document.createElement('template');
        template.innerHTML = body;
        var clone = document.importNode(template.content, true);
        return clone;
    });
}

function parseDocument(template) {
    return Promise.all(Array.from(template.querySelectorAll('*')).filter(function (doc) {
        return doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement;
    }).reduce(function (result, doc) {
        return result.concat(preload(_defineProperty({}, doc.tagName.toLowerCase(), doc.tagName.toLowerCase())));
    }, []));
}

function initNestedWidget(widget) {
    var template = widget.props.template;
    var docs = template.querySelectorAll('*');
    Array.from(docs).forEach(function (doc) {
        if (doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement) {
            if (typeof doc.getAttribute('dynamic') !== 'undefine' && doc.getAttribute('dynamic') !== null) {
                return;
            }
            var name = doc.tagName.toLowerCase();
            var child = w(name, widget.custom[name]);
            child.render(doc);
            var childName = doc.getAttribute('data-info');
            if (childName) widget.props[childName] = child;
        }
    });
    return widget;
}

function preload(widgets, callback) {
    return Promise.all(Object.keys(widgets).reduce(function (result, name) {
        if (!w.templates[name]) w.templates[name] = {};
        if (!w.templates[name].fetch) w.templates[name].fetch = fetchWidget(widgets[name]);
        return result.concat(w.templates[name].fetch.then(function (template) {
            if (!w.templates[name].template) {
                w.templates[name].template = template;
                var script = template.querySelector('script');
                var style = template.querySelector('style');
                if (script) {
                    document.body.appendChild(script);
                    document.body.removeChild(script);
                }
                if (style) document.head.appendChild(style);
            }
            return template;
        }).then(parseDocument).catch(function (err) {
            return console.error('Widgets preload error:' + err);
        }));
    }, [])).then(callback);
}

// Public API
function w(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (!w.templates[name] || !w.templates[name].widget) throw Error('you need to preload widget:' + name + ' before init it');
    return initNestedWidget(new w.templates[name].widget({
        template: w.templates[name].template.cloneNode(true),
        actions: options.actions || {},
        data: options.data || {},
        logLevel: w.options.logLevel,
        internal: true // for check it's called by internal
    }));
}
w.templates = {};
w.options = {};
w.register = function (settings) {
    var settings = new settings();
    Object.keys(w.templates).forEach(function (index) {
        var template = w.templates[index];
        if (template.template && !template.widget) template.widget = register$2(settings);
    });
};
w.config = function (options, callback) {
    w.options.preload = options.preload || {};
    w.options.path = options.path || '';
    w.options.logLevel = options.logLevel || 0;
    preload(w.options.preload, callback);
};
w.customize = function (context, target, options) {
    // inherit parent's data
    options.data = Object.assign(context.data, options.data);
    context.custom[target] = options;
};
w.service = getServices;
w.action = function (name) {
    return Object.assign({}, getActions()[name]);
};
w.transition = function (effect) {
    return {
        init: function init(target, options) {
            return transitionInit(effect, target, options);
        },
        in: function _in(target, options) {
            return transitionIn(effect, target, options);
        },
        out: function out(target, options) {
            return transitionOut(effect, target, options);
        },
        toggle: function toggle(target, options) {
            return transitionToggle(effect, target, options);
        }
    };
};

// development only
window.w = w;
// export default w;
//# sourceMappingURL=build.js.map
