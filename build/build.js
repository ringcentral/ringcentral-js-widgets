'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var rcSubscription = function () {

    var cacheKey = 'ringcentral-subscription';
    var subscription = sdk.createCachedSubscription(cacheKey).restore();
    var handlers = {};
    subscription.on(subscription.events.notification, function (msg) {
        console.log('update from pubnub');
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
                if (!handlers[suffix]) {
                    handlers[suffix] = [];
                }
                handlers[suffix].push(handler);
                subscription.addEventFilters(event).register();
            }
        }
    };
}();

register('rcSubscription', rcSubscription);

var CallLogService = function (sdk) {
    var period = 7 * 24 * 3600 * 1000;
    var dateFrom = new Date(Date.now() - period);
    return {
        getCallLogs: function getCallLogs() {
            return sdk.platform().get('/account/~/extension/~/call-log', { dateFrom: dateFrom.toISOString() }).then(function (response) {
                return response.json().records;
            });
        },
        getCallLogsByNumber: function getCallLogsByNumber(phoneNumber, hourFrom, hourTo) {
            return sdk.platform().get('/account/~/extension/~/call-log', {
                dateFrom: new Date(Date.now() - hourFrom * 3600 * 1000).toISOString(),
                dateTo: new Date(Date.now() - (hourTo || 0) * 3600 * 1000).toISOString(),
                phoneNumber: phoneNumber
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data.records;
            }).then(function (records) {
                return records.reverse();
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
    var completeCompanyContacts = null;

    var fetchingCompanyContacts = null;
    var fetchingCompleteCompanyContacts = null;

    function Contact() {
        this.firstName = null;
        this.lastName = null;
        this.displayName = null;
        this.extension = null;
        this.email = null;
        this.type = null;
        this.id = null;
        this.phoneNumber = [];
    }

    function createContact(extension) {
        var contact = new Contact();
        contact.extension = extension.extensionNumber;
        contact.firstName = extension.contact.firstName;
        contact.lastName = extension.contact.lastName;
        contact.displayName = contact.firstName + ' ' + contact.lastName;
        contact.email = extension.contact.email;
        contact.type = 'rc';
        contact.id = extension.id;
        contact.profileImage = extension.profileImage.uri;
        return contact;
    }

    function addToCompanyContact(response) {
        var records = response.json().records.filter(function (extension) {
            return extension.status === 'Enabled' && ['DigitalUser', 'User'].indexOf(extension.type) >= 0;
        }).map(function (extension) {
            return createContact(extension);
        });
        companyContacts.push.apply(companyContacts, records);
    }

    function fetchCompanyContactByPage(page) {
        return sdk.platform().get('/account/~/extension/', { perPage: 250, page: page });
    }

    function fetchCompanyDirectNumbersByPage(page) {
        return sdk.platform().get('/account/~/phone-number', { perPage: 250, page: page });
    }

    function fetchCompanyContacts() {
        var page = 1;
        fetchingCompanyContacts = fetchCompanyContactByPage(page).then(function (response) {
            var respObj = response.json();
            if (respObj.paging && respObj.paging.totalPages > page) {
                var promises = [];
                while (respObj.paging.totalPages > page) {
                    page++;
                    promises.push(fetchCompanyContactByPage(page));
                }

                return Promise.all(promises).then(function (responses) {
                    responses.forEach(function (response) {
                        addToCompanyContact(response);
                    });
                    fetchingCompanyContacts = null;
                    return companyContacts;
                });
            } else {
                addToCompanyContact(response);
                return companyContacts;
            }
        }).catch(function (e) {
            console.error(e);
        });
        return fetchingCompanyContacts;
    }

    function fetchCompanyDirectNumbers() {
        var page = 1;
        return fetchCompanyDirectNumbersByPage(page).then(function (response) {
            var respObj = response.json();
            if (respObj.paging && respObj.paging.totalPages > page) {
                var promises = [];
                while (respObj.paging.totalPages > page) {
                    page++;
                    promises.push(fetchCompanyDirectNumbersByPage(page));
                }

                return Promise.all(promises).then(function (responses) {
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
        asyncGetCompanyContact: function asyncGetCompanyContact() {
            if (fetchingCompanyContacts) {
                return fetchingCompanyContacts;
            } else {
                return Promise.resolve(companyContacts);
            }
        },
        syncCompanyContact: function syncCompanyContact() {
            companyContacts.length = 0;
            fetchCompanyContacts();
            fetchCompanyDirectNumbers();
        },
        completeCompanyContact: function completeCompanyContact() {
            if (completeCompanyContacts) return Promise.resolve(completeCompanyContacts);
            if (fetchingCompleteCompanyContacts) return fetchingCompleteCompanyContacts;
            fetchingCompleteCompanyContacts = fetchCompanyContacts().then(fetchCompanyDirectNumbers);
            return fetchingCompleteCompanyContacts.then(function () {
                completeCompanyContacts = companyContacts;
                fetchingCompleteCompanyContacts = null;
                return companyContacts;
            });
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
            type: item.type,
            id: item.id
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
        },
        searchAll: function searchAll() {
            return rcContactService.completeCompanyContact().then(function (companyContacts) {
                return companyContacts.map(function (contact) {
                    return {
                        name: contact.displayName,
                        type: 'rc',
                        id: contact.id
                    };
                });
            }).catch(function (e) {
                return console.error(e);
            });
        }
    };
}();

register('rcContactSearchProvider', rcContactSearchProvider);

var accountService = function (sdk) {
    var info;
    var numbers;
    var fetchNumbers = null;

    function getNumbersByType(numbers, type) {
        if (!numbers) return Error('Need to fetch numbers first using accountService.getPhoneNumber');
        return numbers.filter(function (number) {
            return number.type === type;
        });
    }

    function getNumbersByFeatures(numbers, features) {
        if (!Array.isArray(features)) features = [features];
        // if has duplicate features
        return numbers.filter(function (number) {
            return features.filter(function (f) {
                return number.features.indexOf(f) > -1;
            }).length > 0;
        });
    }

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
            fetchNumbers = sdk.platform().get('/account/~/extension/~/phone-number').then(function (response) {
                var data = response.json();
                numbers = data.records;
                fetchNumbers = null;
                return data.records;
            }).catch(function (e) {
                return console.error('Recent Calls Error: ' + e.message);
            });
            return fetchNumbers;
        },

        hasServiceFeature: function hasServiceFeature(name) {
            if (!info) return Error('Need to fetch account info by accountService.getAccountInfo');
            return info.serviceFeatures.filter(function (feature) {
                return feature.featureName.toLowerCase() === name.toLowerCase();
            }).length > 0;
        },

        listNumber: function listNumber(type) {
            var features = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            if (fetchNumbers) {
                return fetchNumbers.then(function () {
                    return getNumbersByFeatures(getNumbersByType(numbers, type), features).map(function (number) {
                        return number.phoneNumber;
                    });
                });
            } else {
                return getNumbersByFeatures(getNumbersByType(numbers, type), features).map(function (number) {
                    return number.phoneNumber;
                });
            }
        }
    };
}(sdk);

register('accountService', accountService);

var rcMessageService = function (sdk) {
    var messages = {};
    var fetchingPromise = null;
    var syncToken = null;
    var messageUpdateHandlers = [];

    function fullSyncMessages(hour) {
        return sdk.platform().get('/account/~/extension/~/message-sync', {
            dateFrom: new Date(Date.now() - hour * 3600 * 1000).toISOString(),
            syncType: 'FSync'
        }).then(function (responses) {
            var jsonResponse = responses.json();
            syncToken = jsonResponse.syncInfo.syncToken;
            var results = jsonResponse.records;
            addMessageToList(results);
            fetchingPromise = null;
            return results;
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
                syncToken = jsonResponse.syncInfo.syncToken;
                updateMessageList(results);
                messageUpdateHandlers.forEach(function (h) {
                    return h(results);
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
        syncMessages: function syncMessages(hour) {
            fetchingPromise = fullSyncMessages(hour);
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
            return !fetchingPromise ? concatMessages() : fetchingPromise.then(concatMessages);
        },
        subscribeToMessageUpdate: function subscribeToMessageUpdate() {
            rcSubscription.subscribe('message-store', '/restapi/v1.0/account/~/extension/~/message-store', incrementalSyncMessages);
        },
        onMessageUpdated: function onMessageUpdated(handler) {
            if (handler) {
                messageUpdateHandlers.push(handler);
            }
        },
        sendSMSMessage: function sendSMSMessage(text, fromNumber, toNumber) {
            return sdk.platform().post('/account/~/extension/~/sms/', {
                from: { phoneNumber: fromNumber },
                to: [{ phoneNumber: toNumber }],
                text: text
            }).then(function (response) {
                return response.json();
            });
        },
        sendPagerMessage: function sendPagerMessage(text, fromNumber, toNumber) {
            console.log(fromNumber);
            return sdk.platform().post('/account/~/extension/~/company-pager/', {
                from: { extensionNumber: fromNumber },
                to: [{ extensionNumber: toNumber }],
                text: text
            }).then(function (response) {
                return response.json();
            });
        },
        getConversation: function getConversation(conversationId, hourFrom, hourTo) {
            return sdk.platform().get('/account/~/extension/~/message-store', {
                dateFrom: new Date(Date.now() - hourFrom * 3600 * 1000).toISOString(),
                dateTo: new Date(Date.now() - (hourTo || 0) * 3600 * 1000).toISOString(),
                conversationId: conversationId
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data.records;
            }).then(function (records) {
                return records.reverse();
            });
        },
        getMessagesByNumber: function getMessagesByNumber(phoneNumber, hourFrom, hourTo) {
            return sdk.platform().get('/account/~/extension/~/message-store', {
                dateFrom: new Date(Date.now() - hourFrom * 3600 * 1000).toISOString(),
                dateTo: new Date(Date.now() - (hourTo || 0) * 3600 * 1000).toISOString(),
                phoneNumber: phoneNumber
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data.records;
            }).then(function (records) {
                return records.reverse();
            });
        }
    };
}(sdk);

register('rcMessageService', rcMessageService);

var conversationService = function (sdk) {
    var cachedHour = 24 * 7;
    function groupMessageToContact(msgs, contacts) {
        var relatedContacts = contacts.filter(function (contact) {
            var knownContactsIndex = [];
            var contactNums = contact.phoneNumber.concat(contact.extension);
            var contactMsgs = msgs.filter(function (msg, index) {
                var msgNumber = msg.direction === 'Inbound' ? msg.from : msg.to;
                var contain = contactNums.indexOf(msgNumber) > -1;
                contact.msg = contact.msg || [];
                var alreadyExist = contact.msg.find(function (contactMsg) {
                    return contactMsg.id == msg.id;
                });
                if (contain && !alreadyExist) {

                    contact.msg.push(msg);
                    knownContactsIndex.push(index);
                }
                return contain;
            });
            knownContactsIndex.reverse().forEach(function (index) {
                return msgs.splice(index, 1);
            });
            return contactMsgs.length > 0;
        });
        msgs.forEach(function (msg) {
            var msgNumber = msg.direction === 'Inbound' ? msg.from : msg.to;
            var contact = relatedContacts.filter(function (contact) {
                return contact.id === msgNumber;
            })[0];
            if (contact) {
                contact.msg.push(msg);
            } else {
                relatedContacts.push(fakeContact(msg));
            }
        });
        return relatedContacts;
    }

    function groupContactToMessage(msgs, contacts) {
        return msgs.map(function (msg) {
            var unknownContact = true;
            contacts.forEach(function (contact) {
                var contactNums = contact.phoneNumber.concat(contact.extension);
                var msgNumber = msg.direction === 'Inbound' ? msg.from : msg.to;
                var contain = contactNums.indexOf(msgNumber) > -1;
                if (contain) {
                    msg.contact = contact;
                    unknownContact = false;
                }
            });
            // if (unknownContact) {
            //     console.log(msg);
            //     var fake = fakeContact(msg)
            //     msg.contact = fake
            //     contacts.push(fake)
            // }
            return msg;
        });
    }

    function combineAdjacentMessage(contents) {
        // group related SMS message
        var savedContent;
        var result = [];
        for (var i = contents.length - 1; i > 0; --i) {
            var content = contents[i];
            // if (content.type !== 'SMS') {
            //     if (savedContent) {
            //         result.push(savedContent)
            //         savedContent = null
            //     }
            //     result.push(content)
            //     continue
            // }
            if (savedContent && savedContent.type === content.type && savedContent.contact.id === content.contact.id) {
                savedContent.others.push(content);
            } else {
                savedContent && result.push(savedContent);
                content.others = [];
                savedContent = content;
            }
        }
        savedContent && result.push(savedContent);
        return result;
    }

    function combine() {
        for (var _len = arguments.length, targets = Array(_len), _key = 0; _key < _len; _key++) {
            targets[_key] = arguments[_key];
        }

        return targets.reduce(function (result, target) {
            return result.concat(target);
        }, []);
    }

    function sortTime(target) {
        return target.slice().sort(function (a, b) {
            return Date.parse(a.time) - Date.parse(b.time);
        });
    }
    function containSameVal(array1, array2) {
        return array1.filter(function (n) {
            return array2.indexOf(n) != -1;
        }).length > 0;
    }
    function uniqueArray(target) {
        var seen = {};
        return target.filter(function (item) {
            return seen.hasOwnProperty(item) ? false : seen[item] = true;
        });
    }

    function fakeContact(msg) {
        var phoneNumber = msg.direction === 'Inbound' ? msg.from : msg.to;
        return {
            displayName: phoneNumber,
            id: phoneNumber,
            phoneNumber: [phoneNumber],
            extension: null,
            msg: [msg]
        };
    }

    function adaptMessage(msg) {
        return {
            id: msg.id,
            from: msg.from.extensionNumber || msg.from.phoneNumber,
            to: msg.to.phoneNumber || msg.to.extensionNumber || msg.to[0].extensionNumber || msg.to[0].phoneNumber,
            direction: msg.direction,
            type: msg.type,
            time: msg.creationTime || msg.startTime,
            lastModifiedTime: msg.lastModifiedTime || msg.startTime,
            subject: msg.recording || msg.subject || msg.action || msg.attachments[0],
            status: {
                sendConfirmed: false,
                receiveConfirmed: false
            }
        };
    }
    function getMessagesByNumber(contact, offset) {
        return Promise.all(contact.phoneNumber.map(function (number) {
            return rcMessageService.getMessagesByNumber(
            // FIXME
            number, cachedHour + offset, cachedHour);
        })).then(function (result) {
            return combine.apply(undefined, _toConsumableArray(result));
        });
    }
    function getCallLogsByNumber(contact, offset) {
        return Promise.all(contact.phoneNumber.map(function (number) {
            return CallLogService.getCallLogsByNumber(number, cachedHour + offset, cachedHour);
        })).then(function (result) {
            return combine.apply(undefined, _toConsumableArray(result));
        });
    }
    function uniqId(target) {
        var seen = {};
        return target.filter(function (item) {
            return seen.hasOwnProperty(item.id) ? false : seen[item.id] = true;
        });
    }
    function combineContent() {
        for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            sources[_key2] = arguments[_key2];
        }

        return sortTime(combine.apply(undefined, _toConsumableArray(sources.map(function (source) {
            return source.map(adaptMessage);
        }))));
    }
    return {
        get cachedHour() {
            return cachedHour;
        },
        syncContent: function syncContent(contacts) {
            for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                sources[_key3 - 1] = arguments[_key3];
            }

            var contents = combineContent.apply(undefined, sources);
            var relatedContacts = groupMessageToContact(contents.slice(), contacts);
            contents = groupContactToMessage(contents, relatedContacts);
            return contents;
        },
        organizeContent: function organizeContent(contacts) {
            for (var _len4 = arguments.length, sources = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                sources[_key4 - 1] = arguments[_key4];
            }

            var contents = combineContent.apply(undefined, sources);
            var relatedContacts = groupMessageToContact(contents.slice(), contacts);
            contents = groupContactToMessage(contents, relatedContacts);
            contents = combineAdjacentMessage(contents);
            return contents;
        },
        getConversations: function getConversations(contacts) {
            for (var _len5 = arguments.length, sources = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                sources[_key5 - 1] = arguments[_key5];
            }

            var contents = combineContent.apply(undefined, sources);
            var relatedContacts = groupMessageToContact(contents, contacts).map(function (contact) {
                contact.syncHour = cachedHour;
                return contact;
            }).map(function (contact) {
                contact.phoneNumber = uniqueArray(contact.phoneNumber.concat(contact.extension));
                return contact;
            }).reduce(function (map, contact) {
                map[contact.id] = contact;
                return map;
            }, {});
            return relatedContacts;
        },
        loadContent: function loadContent(contact, offset) {
            return Promise.all([getCallLogsByNumber(contact, offset), getMessagesByNumber(contact, offset)]).then(function (result) {
                return combineContent.apply(undefined, _toConsumableArray(result));
            }).then(function (contents) {
                contact.msg = contents.concat(contact.msg);
                cachedHour += offset;
                return contents;
            });
        },
        onConversationUpdate: function onConversationUpdate(handler) {
            rcMessageService.onMessageUpdated(function (msgs) {
                try {
                    var msgs = sortTime(msgs.map(adaptMessage));
                    handler(msgs);
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            });
        },
        adaptMessage: adaptMessage
    };
}(sdk);

register('conversationService', conversationService);

var rcMessageProvider = function () {
    var messageUpdatedHandlers = [];
    var conversations = {};
    var cachedHour = 0;

    rcMessageService.onMessageUpdated(function (results) {
        messageUpdatedHandlers.forEach(function (h) {
            try {
                h(results.slice());
            } catch (e) {
                console.error(e);
            }
        });
    });

    function createResult(message) {
        return {
            id: message.id,
            time: message.lastModifiedTime,
            readStatus: message.readStatus,
            type: getType(message),
            contact: getNumber(message.type, getDirection(message, 'Outbound')),
            subject: message.subject || null,
            convId: message.conversation ? message.conversation.id : null,
            author: getNumber(message, getDirection(message, 'Inbound'))
        };

        function getDirection(message, dir) {
            return message.direction === dir ? message.to[0] : message.from;
        }

        function getNumber(message, info) {
            return message.type === 'Pager' ? info.extensionNumber : info.phoneNumber;
        }

        function getType(message) {
            return message.type === 'Fax' || message.type === 'VoiceMail' ? 'Text' : message.type;
        }
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

        getLastMessagesOfAllType: function getLastMessagesOfAllType() {
            var results = [];
            return this.getMessagesOfAllType().then(function (msgs) {
                for (var key in msgs) {
                    if (msgs.hasOwnProperty(key)) {
                        if (key === 'anonymous') results = results.concat(msgs.anonymous[0]);else results.push(msgs[key][0]);
                    }
                }
                return results;
            });
        },
        // Return all messages of type 'VoiceMail' and 'Fax'. For SMS and Pager, only last message in a conversation
        // will be returned.
        getMessagesOfAllType: function getMessagesOfAllType() {
            return Promise.resolve(rcMessageService.getAllMessages()).then(function (messages) {
                var results = [];
                var target = {};
                messages.forEach(function (message) {
                    var result = createResult(message);
                    //Combine SMS/Pager messages in conversation
                    if (message.conversation && message.conversation.id) {
                        target[message.conversation.id] = target[message.conversation.id] || [];
                        target[message.conversation.id].push(result);
                        conversations[message.conversation.id] = conversations[message.conversation.id] || [];
                        conversations[message.conversation.id].push(message);
                    } else {
                        target['anonymous'] = target['anonymous'] || [];
                        target['anonymous'].push(result);
                    }
                });
                return target;
            });
        },

        getConversation: function getConversation(convId, hourFrom) {
            if (conversations[convId] && (!hourFrom || hourFrom < cachedHour)) {
                return Promise.resolve(conversations[convId].reverse());
            } else {
                return rcMessageService.getConversation(convId, hourFrom, cachedHour).then(function (result) {
                    cachedHour = hourFrom;
                    return result;
                });
            }
        },

        onMessageUpdated: function onMessageUpdated(handler) {
            messageUpdatedHandlers.push(handler);
        }
    };
}();
register('rcMessageProvider', rcMessageProvider);

var rcConferenceSerivce = function () {
    var fetchingConferenceInfo = null;

    function fetchConferenceInfo() {
        fetchingConferenceInfo = sdk.platform().get('/account/~/extension/~/conferencing').then(function (responses) {
            var jsonResponse = responses.json();
            var conferenceInfo = {};
            conferenceInfo.hostCode = jsonResponse.hostCode;
            conferenceInfo.phoneNumber = jsonResponse.phoneNumber;
            conferenceInfo.participantCode = jsonResponse.participantCode;
            fetchingConferenceInfo = null;
            return conferenceInfo;
        });
        return fetchingConferenceInfo;
    }

    return {
        getConferenceInfo: function getConferenceInfo() {
            if (fetchingConferenceInfo) {
                return fetchingConferenceInfo;
            } else {
                return fetchConferenceInfo();
            }
        }
    };
}();

register('rcConferenceSerivce', rcConferenceSerivce);

function ContactDetailObject() {
    this.id = null;
    this.displayName = null;
    this.extension = null;
    this.type = null;
    this.emails = [];
    this.phoneNumbers = [];
}

function getRCContactForContactDetailWidget(contactId) {
    for (var i = 0; i < rcContactService.companyContacts.length; i++) {
        var contact = rcContactService.companyContacts[i];
        if (contact.id === contactId) {
            var result = new ContactDetailObject();
            result.displayName = contact.displayName;
            result.extension = contact.extension;
            result.id = contact.id;
            result.type = 'rc';
            contact.phoneNumber.forEach(function (number) {
                result.phoneNumbers.push(number);
            });
            result.emails.push(contact.email);
            return result;
        }
    }
}

var contactDetailWidgetAdapter = function () {
    var contactProviders = {};

    contactProviders['rc'] = getRCContactForContactDetailWidget;

    return {
        getContact: function getContact(contactId, contactType) {
            var provider = contactProviders[contactType];
            if (provider) {
                return Promise.resolve(provider(contactId)).then(function (result) {
                    return result;
                });
            } else {
                throw Error("No provider is associated with specified contactType '" + contactType + "'");
            }
        }
    };
}();
register('contactDetailWidgetAdapter', contactDetailWidgetAdapter);

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
            var target = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            target.classList.remove('display-none');
        }
    },
    hide: {
        before: function before() {},
        method: function method(finish) {},
        after: function after() {
            var target = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            target.classList.add('display-none');
        }
    },
    diabled: {
        before: function before() {},
        method: function method(finish) {},
        after: function after() {
            var target = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];
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
    if (result && result.then && typeof result.then === 'function') return true;
    return false;
}

function isFunction(fn) {
    return typeof fn === 'function';
}

function toFunction(fn, defalut) {
    if (fn && isFunction(fn)) return fn;else if (defalut && isFunction(defalut)) return defalut;else return function () {};
}

function shallowCopy(target) {
    if (Array.isArray(target)) return target.slice(0);
    return Object.assign({}, target);
}

function find(array, prop, value) {
    return array.find(function (item) {
        return item[prop] === value;
    });
}

function bind6Args(fn, ctx) {
    return function (a, b, c, d, e, f) {
        return fn.call(ctx, a, b, c, d, e, f);
    };
}

var fragments = [];

// Create a fragment with a custom tag as wrapper
function createFragment(name, template) {
    var frag;
    if (frag = find(fragments, 'name', name)) return frag.fragment.cloneNode(true);

    frag = document.createDocumentFragment();
    var customTag = document.createElement(name);
    var wrapper = document.createElement('div');
    wrapper.innerHTML = template;

    frag.appendChild(customTag);
    customTag.appendChild([].concat(_toConsumableArray(wrapper.childNodes)).find(function (node) {
        return node.nodeType === 1;
    }));

    fragments.push({
        name: name,
        fragment: frag.cloneNode(true)
    });
    return frag;
}

var lifecycle = {
    destroy: function destroy() {
        this.unmount();
        // TODO: find out better way to destroy it
        for (var property in this) {
            this[property] = null;
        }
    },
    unmount: function unmount() {
        if (!this._mounted || !this.root || !this.root.parentNode) return;
        this.root.parentNode.removeChild(this.root);
        this._mounted = false;
    },
    mount: function mount(target, prepend) {
        if (this._mounted) return;

        typeof target === 'string' && (target = document.querySelector(target));

        if (this.target) {
            // Already mounted and unmounted before
            if (prepend) target.insertBefore(this.root, target.firstChild);else target.appendChild(this.root);
        } else {
            // First time mount
            this.children.forEach(function (child) {
                return child.widget.mount(child.target);
            });
            // templates can only have one root
            if (prepend) target.insertBefore(this.root, target.firstChild);else target.appendChild(this.root);
            this._mounted = true;
        }
        return this;
    }
};

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

    if (!actions) console.warn('Widgets do not have actions defined, maybe you get some typo.');['init', 'mount', 'unmount', 'destroy', 'error'].forEach(function (action) {
        actions[action] = Object.assign(shallowCopy(functionSet), actions[action]);
    });
    return Widget.bind(null, { actions: actions, data: data });
}

function Widget(_ref2, options) {
    var _this = this;

    var actions = _ref2.actions;
    var _ref2$data = _ref2.data;
    var data = _ref2$data === undefined ? {} : _ref2$data;

    if (!options.internal) {
        return Error('You are trying to construct a widget manually, please use w()');
    }
    logger = initLogger(options.logLevel);

    this.refs = {};
    this.props = {};
    this.custom = {};
    this.children = [];
    this.data = Object.assign(data, options.data);
    this._mounted = false;
    this.fragment = createFragment(options.is, options.template);
    this.root = getDocumentRoot(options.is, this.fragment);
    this.dom = undefined;

    var actions = shallowCopy(actions);
    options.actions = shallowCopy(options.actions);

    var ctx = this;

    Object.keys(options.actions).forEach(function (index) {
        return bindToTarget(options.actions, index);
    });
    Object.keys(actions).forEach(function (index) {
        return bindToTarget(actions, index);
    });

    for (var prop in actions) {
        if (actions.hasOwnProperty(prop)) this[prop] = generateActions(actions[prop], options.actions[prop], prop);
    }

    ['mount', 'unmount', 'destroy'].forEach(function (action) {
        _this[action] = generateActions({
            before: actions[action].before,
            method: extendLifecycle(lifecycle[action].bind(_this), actions[action].method),
            after: actions[action].after
        }, options.actions[action], action);
    });

    function bindToTarget(target, index) {
        target[index] = bindScope(ctx, target[index]);
    }
    this.dom = generateDocument(this, this.fragment);
    this.init();
}

function extendLifecycle(base, extend) {
    return function (finish) {
        for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            args[_key6 - 1] = arguments[_key6];
        }

        base.apply(undefined, args);
        if (extend && isFunction(extend)) return extend.call(this, finish);
    };
}

function bindScope(scope, action) {
    return {
        before: bind6Args(toFunction(action.before), scope),
        method: bind6Args(toFunction(action.method), scope),
        after: bind6Args(toFunction(action.after), scope),
        error: bind6Args(toFunction(action.error, logger.error), scope)
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

function getDocumentRoot(name, fragment) {
    return fragment.querySelector(name);
}

function generateActions(widgetAction) {
    var userAction = arguments.length <= 1 || arguments[1] === undefined ? shallowCopy(functionSet) : arguments[1];
    var name = arguments[2];

    return function (a, b, c, d, e, f) {
        var before = function before(a, b, c, d, e, f) {
            userAction.before(a, b, c, d, e, f);
            widgetAction.before(a, b, c, d, e, f);
            // Something like Monad
            return {
                __custom: true,
                data: [a, b, c, d, e, f].filter(function (item) {
                    return item != null;
                })
            };
        };
        var method = function method(arg) {
            return widgetAction.method.apply(widgetAction, [userAction.method].concat(_toConsumableArray(arg.data))) || arg;
        };
        var after = function after(arg) {
            if (arg.__custom) {
                arg = arg.data;
                userAction.after.apply(userAction, _toConsumableArray(arg));
                return widgetAction.after.apply(widgetAction, _toConsumableArray(arg)) || arg;
            } else {
                userAction.after(arg);
                return widgetAction.after(arg) || arg;
            }
        };
        var error = function error(e) {
            widgetAction.error(e);
            userAction.error(e);
        };
        var finish = function finish(arg) {
            if (arg.__custom) {
                arg = arg.data;
            }
            // if (isFunction(arg))
            //     // flatten one level
            //     return Array.isArray(arg()[0]) ? [].concat.apply([], arg()) : arg()[0]
            return arg;
        };
        // try {
        return chainActions(before(a, b, c, d, e, f), [before, method, after, finish], error);
        // } catch (e) {
        // error(e)
        // }
    };
}

// function wrapUserAction(widget, user, ...args) {
//     var continueDefault = (user != null && user(...args))
//     if (continueDefault || typeof continueDefault === 'undefined')
//         return widget(...args) || (() => args)
//     return [].concat(...args)
// }

function chainActions(result, actions, error) {
    var start = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    if (start + 1 === actions.length) return result;
    if (isThenable(result)) {
        return actions.reduce(function (res, action, index) {
            if (index > start) return res.then(action);
            return res;
        }, result).catch(error);
    } else {
        return chainActions(actions[start + 1](result), actions, error, start + 1);
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

var polyglot$1 = __commonjs(function (module, exports, global) {
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

var require$$0 = polyglot$1 && (typeof polyglot$1 === 'undefined' ? 'undefined' : _typeof(polyglot$1)) === 'object' && 'default' in polyglot$1 ? polyglot$1['default'] : polyglot$1;

var index = __commonjs(function (module) {
    // Added for convenience in the Node environment.
    // The meat and potatoes exist in ./lib/polyglot.js.
    module.exports = require$$0;
});

var Polyglot = index && (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' && 'default' in index ? index['default'] : index;

var polyglots = {};
var polyglot = new Polyglot();
function loadLocale(name, file) {
    fetch(file).then(function (response) {
        return response.json();
    }).then(function (data) {
        return polyglots[name] = new Polyglot({ phrases: data });
    });
}
function translate(locale) {
    return function (string) {
        return polyglots[locale] ? polyglots[locale].t(string) : '';
    };
}

var importedScripts = [];
var importedStyles = [];
function insertScript(script) {
    var tag = document.createElement('script');
    tag.text = script;
    document.body.appendChild(tag);
    document.body.removeChild(tag);
}
function insertStyle(style) {
    var tag = document.createElement('style');
    tag.innerHTML = style;
    document.head.appendChild(tag);
}
function importStyle(src) {
    var style = document.createElement('style');
    style.src = src;
    document.head.appendChild(style);
}
function importScript(src) {
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

function insert(name, input) {
    input.imports.scripts.forEach(importScript);
    input.imports.styles.forEach(importStyle);
    if (input.script && importedScripts.indexOf(name) === -1) {
        importedScripts.push(name);
        insertScript(input.script);
    }
    if (input.style && importedStyles.indexOf(name) === -1) {
        importedStyles.push(name);
        insertStyle(input.style);
    }
}

// function fetchWidget(file) {
//     return fetch(w.options.path + ensureTail(file, '.html'))
//         .then(response => response.text())
//         .then(body => {
//             var template = document.createElement('template')
//             template.innerHTML = body
//             var clone = document.importNode(template.content, true)
//             return clone
//         })
// }

// function parseDocument(template) {
//     return Promise.all(Array.from(template.querySelectorAll('*'))
//         .filter(doc => doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement)
//         .reduce((result, doc) => {
//             return result.concat(preload({
//                 [doc.tagName.toLowerCase()]: doc.tagName.toLowerCase()
//             }))
//         }, []))
// }

function initNestedWidget(widget) {
    // TODO: perf hit
    var docs = widget.root.querySelectorAll('*');
    Array.from(docs).forEach(function (doc) {
        if (doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement) {
            if (typeof doc.getAttribute('dynamic') !== 'undefine' && doc.getAttribute('dynamic') !== null) {
                return;
            }
            var name = doc.tagName.toLowerCase();
            var child = w(name, widget.custom[name]);
            // child.mount(doc)
            widget.children.push({
                target: doc,
                widget: child
            });
            widget.refs[name] = child;
            var childName = doc.getAttribute('data-info');
            if (childName) widget.refs[name] = child;
        }
    });
    return widget;
}

// function preload(widgets, callback) {
//     return Promise.all(
//         Object.keys(widgets).reduce(
//             (result, name) => {
//                 if (!w.templates[name])
//                     w.templates[name] = {}
//                 if (!w.templates[name].fetch)
//                     w.templates[name].fetch = fetchWidget(widgets[name])
//                 return result.concat(
//                     w.templates[name].fetch
//                     .then(template => {
//                         if (!w.templates[name].template) {
//                             w.templates[name].template = template
//                             var scripts = template.querySelectorAll('script')
//                             var style = template.querySelector('style')
//                             Array.from(scripts).forEach(script => {
//                                 if (script.src && script.src.indexOf('http') !== 0)
//                                     script.src = w.options.path + script.getAttribute('src')
//                                 document.body.appendChild(script)
//                                 document.body.removeChild(script)
//                             })
//                             if (style)
//                                 document.head.appendChild(style)
//                         }
//                         return template
//                     })
//                     .then(parseDocument)
//                     .catch(err => console.error('Widgets preload error:' + err)))
//             }, [])
//     ).then(callback)
// }

// Public API
// function w(name, options = {}) {
//     if (!w.templates[name] || !w.templates[name].widget)
//         throw Error('you need to preload widget:' + name + ' before init it')
//     return initNestedWidget(new w.templates[name].widget({
//         template: w.templates[name].template.cloneNode(true),
//         actions: options.actions || {},
//         data: options.data || {},
//         logLevel: w.options.logLevel,
//         internal: true // for check it's called by internal
//     }))
// }

var WIDGETS = __w_widgets;
function w(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var widgetInfo = WIDGETS[name];
    // template
    // var template = document.createElement('template')
    // template.innerHTML = widget.template
    // var clone = document.importNode(template.content, true)
    w.templates[name] = w.templates[name] || {};
    w.templates[name].template = widgetInfo.template;

    // widget.imports.scripts.forEach(src => {
    //     var script = document.createElement('script')
    //     script.src = src
    //     document.body.appendChild(script)
    // })

    //  widget.imports.scripts.forEach(src => {
    //     var style = document.createElement('style')
    //     style.src = src
    //     document.head.appendChild(style)
    // })

    // // script
    // if (widget.script) {
    //     console.log(widget.script)
    //     var script = document.createElement('script')
    //     script.text = widget.script
    //     document.body.appendChild(script)
    //     document.body.removeChild(script)
    // }

    // // style
    // if (widget.style) {
    //     var style = document.createElement('style')
    //     style.innerHTML = widget.style
    //     document.head.appendChild(style)
    // }
    insert(name, widgetInfo);

    return initNestedWidget(new w.templates[name].widget({
        is: name,
        template: w.templates[name].template,
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
    w.options.locale = options.locale || {};
    Promise.all([preload(w.options.preload), Object.keys(w.options.locale).forEach(function (index) {
        var locale = w.options.locale[index];
        loadLocale(index, locale);
    })]).then(callback);
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
w.locale = loadLocale;
w.translate = translate;
w.t = translate;

// development only
window.w = w;
// export default w;
//# sourceMappingURL=build.js.map
