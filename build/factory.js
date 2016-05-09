'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function __commonjs(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sdk = new RingCentral.SDK({
    appKey: '8mOtYiilT5OUPwwdeGgvpw',
    appSecret: 'cqNn89RmR2SR76Kpp8xJaAdNzNOqR8Qfmjb0B-gDOHTw',
    server: RingCentral.SDK.server.production
});

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

var lzString = __commonjs(function (module) {
    // Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
    // This work is free. You can redistribute it and/or modify it
    // under the terms of the WTFPL, Version 2
    // For more information see LICENSE.txt or http://www.wtfpl.net/
    //
    // For more information, the home page:
    // http://pieroxy.net/blog/pages/lz-string/testing.html
    //
    // LZ-based compression algorithm, version 1.4.4
    var LZString = function () {

        // private property
        var f = String.fromCharCode;
        var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
        var baseReverseDic = {};

        function getBaseValue(alphabet, character) {
            if (!baseReverseDic[alphabet]) {
                baseReverseDic[alphabet] = {};
                for (var i = 0; i < alphabet.length; i++) {
                    baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                }
            }
            return baseReverseDic[alphabet][character];
        }

        var LZString = {
            compressToBase64: function compressToBase64(input) {
                if (input == null) return "";
                var res = LZString._compress(input, 6, function (a) {
                    return keyStrBase64.charAt(a);
                });
                switch (res.length % 4) {// To produce valid Base64
                    default: // When could this happen ?
                    case 0:
                        return res;
                    case 1:
                        return res + "===";
                    case 2:
                        return res + "==";
                    case 3:
                        return res + "=";
                }
            },

            decompressFromBase64: function decompressFromBase64(input) {
                if (input == null) return "";
                if (input == "") return null;
                return LZString._decompress(input.length, 32, function (index) {
                    return getBaseValue(keyStrBase64, input.charAt(index));
                });
            },

            compressToUTF16: function compressToUTF16(input) {
                if (input == null) return "";
                return LZString._compress(input, 15, function (a) {
                    return f(a + 32);
                }) + " ";
            },

            decompressFromUTF16: function decompressFromUTF16(compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 16384, function (index) {
                    return compressed.charCodeAt(index) - 32;
                });
            },

            //compress into uint8array (UCS-2 big endian format)
            compressToUint8Array: function compressToUint8Array(uncompressed) {
                var compressed = LZString.compress(uncompressed);
                var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character

                for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
                    var current_value = compressed.charCodeAt(i);
                    buf[i * 2] = current_value >>> 8;
                    buf[i * 2 + 1] = current_value % 256;
                }
                return buf;
            },

            //decompress from uint8array (UCS-2 big endian format)
            decompressFromUint8Array: function decompressFromUint8Array(compressed) {
                if (compressed === null || compressed === undefined) {
                    return LZString.decompress(compressed);
                } else {
                    var buf = new Array(compressed.length / 2); // 2 bytes per character
                    for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                        buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                    }

                    var result = [];
                    buf.forEach(function (c) {
                        result.push(f(c));
                    });
                    return LZString.decompress(result.join(''));
                }
            },

            //compress into a string that is already URI encoded
            compressToEncodedURIComponent: function compressToEncodedURIComponent(input) {
                if (input == null) return "";
                return LZString._compress(input, 6, function (a) {
                    return keyStrUriSafe.charAt(a);
                });
            },

            //decompress from an output of compressToEncodedURIComponent
            decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(input) {
                if (input == null) return "";
                if (input == "") return null;
                input = input.replace(/ /g, "+");
                return LZString._decompress(input.length, 32, function (index) {
                    return getBaseValue(keyStrUriSafe, input.charAt(index));
                });
            },

            compress: function compress(uncompressed) {
                return LZString._compress(uncompressed, 16, function (a) {
                    return f(a);
                });
            },
            _compress: function _compress(uncompressed, bitsPerChar, getCharFromInt) {
                if (uncompressed == null) return "";
                var i,
                    value,
                    context_dictionary = {},
                    context_dictionaryToCreate = {},
                    context_c = "",
                    context_wc = "",
                    context_w = "",
                    context_enlargeIn = 2,
                    // Compensate for the first entry which should not count
                context_dictSize = 3,
                    context_numBits = 2,
                    context_data = [],
                    context_data_val = 0,
                    context_data_position = 0,
                    ii;

                for (ii = 0; ii < uncompressed.length; ii += 1) {
                    context_c = uncompressed.charAt(ii);
                    if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                        context_dictionary[context_c] = context_dictSize++;
                        context_dictionaryToCreate[context_c] = true;
                    }

                    context_wc = context_w + context_c;
                    if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                        context_w = context_wc;
                    } else {
                        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                            if (context_w.charCodeAt(0) < 256) {
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = context_data_val << 1;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 8; i++) {
                                    context_data_val = context_data_val << 1 | value & 1;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            } else {
                                value = 1;
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = context_data_val << 1 | value;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = 0;
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 16; i++) {
                                    context_data_val = context_data_val << 1 | value & 1;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            delete context_dictionaryToCreate[context_w];
                        } else {
                            value = context_dictionary[context_w];
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        // Add wc to the dictionary.
                        context_dictionary[context_wc] = context_dictSize++;
                        context_w = String(context_c);
                    }
                }

                // Output the code for w.
                if (context_w !== "") {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = context_data_val << 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 8; i++) {
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = context_data_val << 1 | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 16; i++) {
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                }

                // Mark the end of the stream
                value = 2;
                for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }

                // Flush the last char
                while (true) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                        context_data.push(getCharFromInt(context_data_val));
                        break;
                    } else context_data_position++;
                }
                return context_data.join('');
            },

            decompress: function decompress(compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 32768, function (index) {
                    return compressed.charCodeAt(index);
                });
            },

            _decompress: function _decompress(length, resetValue, getNextValue) {
                var dictionary = [],
                    next,
                    enlargeIn = 4,
                    dictSize = 4,
                    numBits = 3,
                    entry = "",
                    result = [],
                    i,
                    w,
                    bits,
                    resb,
                    maxpower,
                    power,
                    c,
                    data = { val: getNextValue(0), position: resetValue, index: 1 };

                for (i = 0; i < 3; i += 1) {
                    dictionary[i] = i;
                }

                bits = 0;
                maxpower = Math.pow(2, 2);
                power = 1;
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }

                switch (next = bits) {
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 2:
                        return "";
                }
                dictionary[3] = c;
                w = c;
                result.push(c);
                while (true) {
                    if (data.index > length) {
                        return "";
                    }

                    bits = 0;
                    maxpower = Math.pow(2, numBits);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }

                    switch (c = bits) {
                        case 0:
                            bits = 0;
                            maxpower = Math.pow(2, 8);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }

                            dictionary[dictSize++] = f(bits);
                            c = dictSize - 1;
                            enlargeIn--;
                            break;
                        case 1:
                            bits = 0;
                            maxpower = Math.pow(2, 16);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            dictionary[dictSize++] = f(bits);
                            c = dictSize - 1;
                            enlargeIn--;
                            break;
                        case 2:
                            return result.join('');
                    }

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }

                    if (dictionary[c]) {
                        entry = dictionary[c];
                    } else {
                        if (c === dictSize) {
                            entry = w + w.charAt(0);
                        } else {
                            return null;
                        }
                    }
                    result.push(entry);

                    // Add w+entry[0] to the dictionary.
                    dictionary[dictSize++] = w + entry.charAt(0);
                    enlargeIn--;

                    w = entry;

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }
                }
            }
        };
        return LZString;
    }();

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return LZString;
        });
    } else if (typeof module !== 'undefined' && module != null) {
        module.exports = LZString;
    }
});

var LZString = lzString && (typeof lzString === 'undefined' ? 'undefined' : _typeof(lzString)) === 'object' && 'default' in lzString ? lzString['default'] : lzString;

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
        get companyContacts() {
            return companyContacts;
        },
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
        },
        cacheContacts: function () {
            var contact = null;
            var data = localStorage.getItem('rc-contacts');
            var fetch;
            // FIXME: temp disable it

            return function () {
                var fetch;
                // var fetch = new Promise((resolve, reject) => {
                // // Hack for delay the refreshing request
                //   setTimeout(() => {
                //     rcContactService.completeCompanyContact()
                //     .then(data => {
                //         if (data)
                //             localStorage.setItem('rc-contacts', LZString.compressToUTF16(JSON.stringify(data)))
                //         return resolve(data)
                //     })
                //   }, 100)
                // })
                if (contact) {
                    contact.then(function (value) {
                        completeCompanyContacts = companyContacts = value;
                    });
                    return contact;
                }
                data && (completeCompanyContacts = companyContacts = JSON.parse(LZString.decompressFromUTF16(data)));
                contact = data ? Promise.resolve(JSON.parse(LZString.decompressFromUTF16(data))) : fetch;
                return contact;
            };
        }()
    };
}(sdk);

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

var services = {};
services.rcPhone = {
    loadData: {
        method: function method() {
            rcMessageService.subscribeToMessageUpdate();
            rcMessageService.syncMessages(this.props.cachedMessageHours);
            accountService.getAccountInfo();
            accountService.getPhoneNumber();
            rcContactService.syncCompanyContact();
            PhoneService.registerSIP();
            CallLogService.getCallLogs();
            PhoneService.listen();
        }
    }
};
services['auth-panel'] = {
    login: {
        method: function method() {
            console.log('login');
            return LoginService.login(PhoneFormat.formatE164('US', this.props.username), this.props.extension, this.props.password);
        },
        after: function after() {
            console.log(this);
            this.unmount();
        }
    }
};

function extend(base, mixin) {
    for (var action in mixin) {
        if (base[action]) {
            for (var hook in mixin[action]) {
                var origin = base[action][hook];
                base[action][hook] = function () {
                    console.log(this);

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    origin && origin.call.apply(origin, [this].concat(args));
                    mixin[action][hook].call(this);
                };
            }
        } else {
            base[action] = mixin[action];
        }
    }
    return base;
}

var Factory = function Factory() {};

Factory.prototype.create = function (type) {
    var mixin = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return extend(services[type], mixin);
};

window.Factory = Factory;
//# sourceMappingURL=factory.js.map
