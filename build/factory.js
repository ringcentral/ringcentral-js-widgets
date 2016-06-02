/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcServices = __webpack_require__(1);
	
	var _rcServices2 = _interopRequireDefault(_rcServices);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function extend(base, mixin) {
	    // FIXME: avoid create function in for loop
	    Object.keys(mixin).forEach(function (action) {
	        if (base[action]) {
	            Object.keys(mixin[action]).forEach(function (hook) {
	                var origin = base[action][hook];
	                var mix = mixin[action][hook];
	                base[action][hook] = function () {
	                    var result;
	                    if (origin) {
	                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                            args[_key] = arguments[_key];
	                        }
	
	                        result = origin.call.apply(origin, [this].concat(args));
	                    }
	                    mix.call(this);
	                    return result;
	                };
	            });
	        } else {
	            base[action] = mixin[action];
	        }
	    });
	    return base;
	} // TODO: use dependency injection
	
	
	var Factory = function Factory() {};
	
	Factory.prototype.create = function (type) {
	    var mixin = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return extend(_rcServices2.default[type], mixin);
	};
	
	exports.default = Factory;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _rcSdk = __webpack_require__(2);
	
	var _phoneService = __webpack_require__(10);
	
	var _phoneService2 = _interopRequireDefault(_phoneService);
	
	var _loginService = __webpack_require__(49);
	
	var _loginService2 = _interopRequireDefault(_loginService);
	
	var _callLogService = __webpack_require__(50);
	
	var _callLogService2 = _interopRequireDefault(_callLogService);
	
	var _accountService = __webpack_require__(52);
	
	var _accountService2 = _interopRequireDefault(_accountService);
	
	var _rcContactService = __webpack_require__(53);
	
	var _rcContactService2 = _interopRequireDefault(_rcContactService);
	
	var _contactSearchService = __webpack_require__(55);
	
	var _contactSearchService2 = _interopRequireDefault(_contactSearchService);
	
	var _rcContactSearchProvider = __webpack_require__(56);
	
	var _rcContactSearchProvider2 = _interopRequireDefault(_rcContactSearchProvider);
	
	var _rcMessageService = __webpack_require__(57);
	
	var _rcMessageService2 = _interopRequireDefault(_rcMessageService);
	
	var _rcMessageProvider = __webpack_require__(58);
	
	var _rcMessageProvider2 = _interopRequireDefault(_rcMessageProvider);
	
	var _rcConferenceService = __webpack_require__(59);
	
	var _rcConferenceService2 = _interopRequireDefault(_rcConferenceService);
	
	var _rcConversationService = __webpack_require__(60);
	
	var _rcConversationService2 = _interopRequireDefault(_rcConversationService);
	
	var _blueimpMd = __webpack_require__(61);
	
	var _blueimpMd2 = _interopRequireDefault(_blueimpMd);
	
	var _rcConfig = __webpack_require__(9);
	
	var _rcConfig2 = _interopRequireDefault(_rcConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var dialPadSearchProviders = [_rcContactSearchProvider2.default];
	
	var services = {};
	services['rcPhone'] = {
	    init: {
	        after: function after() {
	            /// critical, inject app key & secret into service
	            (0, _rcSdk.injectSDK)({
	                key: this.props.key,
	                secret: this.props.secret,
	                sandbox: this.props.sandbox
	            });
	        }
	    },
	    loadData: {
	        method: function method() {
	            _rcMessageService2.default.subscribeToMessageUpdate();
	            // rcMessageService.syncMessages(this.props.cachedMessageHours);
	            _accountService2.default.getAccountInfo();
	            _accountService2.default.getPhoneNumber();
	            _rcContactService2.default.cacheContacts();
	            _phoneService2.default.init({
	                incomingAudio: _rcConfig2.default.incomingAudio,
	                outgoingAudio: _rcConfig2.default.outgoingAudio
	            });
	            _callLogService2.default.getCallLogs();
	        }
	    },
	    checkLogin: {
	        method: function method() {
	            return _loginService2.default.checkLoginStatus();
	        }
	    },
	    logout: {
	        method: function method() {
	            return _loginService2.default.logout();
	        }
	    }
	};
	services['auth-panel'] = {
	    login: {
	        method: function method() {
	            return _loginService2.default.login(this.props.username, this.props.extension, this.props.password);
	            // return loginService.oauth()
	        }
	    }
	};
	services['dial-pad'] = {
	    mount: {
	        after: function after() {
	            if (!_accountService2.default.hasServiceFeature("VoipCalling")) this.disable();
	        }
	    },
	    callout: {
	        method: function method() {
	            console.log('real call');
	            return _phoneService2.default.call(this.props.fromNumber, this.props.toNumber, {
	                remoteVideo: this.props.remoteVideo,
	                localVideo: this.props.localVideo
	            });
	        }
	    },
	    queryContacts: {
	        method: function method() {
	            var _this = this;
	
	            var dialPadSearchFunctions = dialPadSearchProviders.map(function (provider) {
	                return provider.search(_this.props.toNumber);
	            });
	            return _contactSearchService2.default.query(dialPadSearchFunctions);
	        }
	    },
	    getOutboundCallerID: {
	        method: function method() {
	            return _accountService2.default.getPhoneNumber().then(function () {
	                return _accountService2.default.listNumber("VoiceFax", 'CallerId');
	            });
	        }
	    }
	};
	
	services['conference'] = {
	    getConferenceInfo: {
	        method: function method() {
	            return _rcConferenceService2.default.getConferenceInfo();
	        }
	    }
	};
	services['call-log'] = {
	    init: {
	        method: function method() {
	            return _callLogService2.default.getCallLogs();
	        }
	    }
	};
	
	services['time-line'] = {
	    mount: {
	        after: function after() {
	            var _this2 = this;
	
	            _rcMessageService2.default.subscribeToMessageUpdate();
	            _rcMessageProvider2.default.onMessageUpdated(function (msg) {
	                _this2.updateTimeline(_rcConversationService2.default.syncContent(_this2.props.contacts, msg));
	                if (_this2.props.currentConv) {
	                    _this2.props.currentConv.confirmMessages();
	                    _this2.props.currentConv.addIncomingMessages();
	                }
	            });
	            return _rcContactService2.default.cacheContacts().then(function (contacts) {
	                return _this2.props.contacts = contacts;
	            });
	        }
	    },
	    fetchData: {
	        method: function method() {
	            return Promise.all([_rcContactService2.default.cacheContacts(), // first one must be the contacts
	            _rcMessageService2.default.syncMessages(_rcConversationService2.default.cachedHour), _callLogService2.default.getCallLogs()]).then(function (result) {
	                return _rcConversationService2.default.organizeContent.apply(_rcConversationService2.default, _toConsumableArray(result));
	            });
	        }
	    }
	};
	
	services['contacts'] = {
	    mount: {
	        after: function after() {
	            this.fetchContacts();
	        }
	    },
	    fetchRelatedContact: {
	        method: function method() {
	            var _this3 = this;
	
	            return Promise.all([_rcMessageService2.default.syncMessages(_rcConversationService2.default.cachedHour), _callLogService2.default.getCallLogs(), _rcContactService2.default.cacheContacts()]).then(function (result) {
	                var _result = _slicedToArray(result, 3);
	
	                var msgs = _result[0];
	                var logs = _result[1];
	                var contacts = _result[2];
	
	                _this3.props.contacts = contacts.reduce(function (result, contact) {
	                    result[contact.id] = contact;
	                    return result;
	                }, {});
	                return _rcConversationService2.default.getConversations(contacts, msgs, logs);
	            }).then(function (relateContacts) {
	                _this3.props.relateContacts = relateContacts;
	                return relateContacts;
	            }).then(function (relateContacts) {
	                return Object.keys(relateContacts).map(function (index) {
	                    // adapt to messages template format
	                    relateContacts[index].msg[0].contact = relateContacts[index].displayName;
	                    // for conversation-advance temaplate
	                    relateContacts[index].msg[0].contactId = index;
	                    return relateContacts[index].msg[0];
	                });
	            });
	        }
	    },
	    fetchContacts: {
	        method: function method() {
	            var _this4 = this;
	
	            // var dialPadSearchFunctions = dialPadSearchProviders.map(provider => {
	            //     return provider.searchAll();
	            // });
	            // return contactSearchService.query(dialPadSearchFunctions);
	            return _rcContactService2.default.cacheContacts().then(function (contacts) {
	                _this4.props.contacts = contacts.reduce(function (result, contact) {
	                    result[contact.id] = contact;
	                    return result;
	                }, {});
	                return contacts.map(function (contact) {
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
	    }
	};
	
	services['conversation-advanced'] = {
	    init: {
	        after: function after() {
	            this.props.hourOffset = 3 * 24;
	        }
	    },
	    mount: {
	        after: function after() {
	            var _this5 = this;
	
	            return _accountService2.default.getAccountInfo().then(function (info) {
	                return _this5.props.fromExtension = info.extensionNumber;
	            }).then(this.getOutboundCallerID);
	        }
	    },
	    send: {
	        method: function method() {
	            if (this.props.toNumber === this.props.toExtension) {
	                return _rcMessageService2.default.sendPagerMessage(this.props.message, this.props.fromExtension, this.props.toExtension);
	            } else {
	                return _rcMessageService2.default.sendSMSMessage(this.props.message, this.props.fromNumber, this.props.toNumber);
	            }
	        }
	    },
	    callout: {
	        method: function method() {
	            return _phoneService2.default.call(this.props.fromNumber, this.props.toNumber, {
	                remoteVideo: this.props.remoteVideo,
	                localVideo: this.props.localVideo
	            });
	        }
	    },
	    reachTop: {
	        method: function method() {
	            console.log('load content');
	            return _rcConversationService2.default.loadContent(this.props.contact, this.props.hourOffset);
	        }
	    },
	    getAvatar: {
	        method: function method() {
	            var _this6 = this;
	
	            if (!this.props.profileImage) return Promise.resolve('http://www.gravatar.com/avatar/' + (0, _blueimpMd2.default)(this.props.contact.id) + '?d=retro');
	            return _rcSdk.RC.sdk.platform().get(this.props.profileImage).then(function (r) {
	                return r.response();
	            }).then(function (r) {
	                // Real contact, no avatar
	                if (r.status === 204 || r.status === 404) {
	                    var hash = (0, _blueimpMd2.default)(_this6.props.contact.id);
	                    return 'http://www.gravatar.com/avatar/' + hash + '?d=retro';
	                } else {
	                    // Real contact, has avatar
	                    return;
	                    _this6.props.profileImage + ('?access_token=' + _rcContactService2.default.accessToken());
	                }
	            }).catch(function (e) {
	                // Real contact, no avatar
	                var hash = (0, _blueimpMd2.default)(_this6.props.contact.id);
	                return 'http://www.gravatar.com/avatar/' + hash + '?d=retro';
	            });
	        }
	    },
	    transformURL: {
	        method: function method() {
	            return this.props.transformee + ('?access_token=' + _rcContactService2.default.accessToken());
	        }
	    }
	};
	services['call-panel'] = {
	    init: {
	        after: function after() {
	            var _this7 = this;
	
	            _phoneService2.default.on('progress', function () {
	                if (!_this7._mounted) {
	                    _this7.mount(_this7.props.target);
	                }
	            });
	            _phoneService2.default.on('bye', function () {
	                _this7.unmount();
	            });
	            _phoneService2.default.on('terminated', function () {
	                _this7.unmount();
	            });
	            _phoneService2.default.on('rejected', function () {
	                _this7.unmount();
	            });
	            _phoneService2.default.on('failed', function () {
	                _this7.unmount();
	            });
	            _phoneService2.default.on('accepted', function () {
	                console.log('accept');
	                _this7.start();
	            });
	        }
	    },
	    mount: {
	        after: function after() {}
	    },
	    getContact: {
	        method: function method() {
	            var _this8 = this;
	
	            var dialPadSearchFunctions = dialPadSearchProviders.map(function (provider) {
	                return provider.search(_this8.props.name);
	            });
	            return _contactSearchService2.default.query(dialPadSearchFunctions);
	        }
	    },
	    hangup: {
	        method: function method() {
	            return _phoneService2.default.hangup();
	        }
	    },
	    hold: {
	        method: function method() {
	            return _phoneService2.default.hold(!this.props.isHold);
	        }
	    },
	    mute: {
	        method: function method() {
	            return _phoneService2.default.mute(!this.props.isMute);
	        }
	    },
	    flip: {
	        method: function method() {
	            return _phoneService2.default.flip(this.props.actionNumber);
	        }
	    },
	    forward: {
	        method: function method() {
	            return _phoneService2.default.forward(this.props.actionNumber);
	        }
	    },
	    transfer: {
	        method: function method() {
	            return _phoneService2.default.transfer(this.props.actionNumber);
	        }
	    },
	    record: {
	        method: function method() {
	            console.log(this.props.isRecord);
	            return _phoneService2.default.record(!this.props.isRecord);
	        }
	    },
	    park: {
	        method: function method() {
	            return _phoneService2.default.park();
	        }
	    },
	    queryContacts: {
	        method: function method() {
	            var _this9 = this;
	
	            var dialPadSearchFunctions = dialPadSearchProviders.map(function (provider) {
	                return provider.search(_this9.props.inputValue);
	            });
	            return _contactSearchService2.default.query(dialPadSearchFunctions);
	        }
	    }
	};
	services['call-panel-incoming'] = {
	    init: {
	        method: function method() {
	            var _this10 = this;
	
	            _phoneService2.default.on('invite', function (session) {
	                _this10.props.session = session;
	                _this10.setName(session.request.from.displayName);
	                _this10.mount(_this10.props.target);
	                _phoneService2.default.on('terminated', function () {
	                    _this10.unmount();
	                });
	                _phoneService2.default.on('failed', function () {
	                    _this10.unmount();
	                });
	            });
	        }
	    },
	    accept: {
	        method: function method() {
	            _phoneService2.default.accept({
	                remoteVideo: this.props.remoteVideo,
	                localVideo: this.props.localVideo
	            });
	        }
	    }
	};
	exports.default = services;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RC = exports.injectSDK = undefined;
	
	var _ringcentralBundle = __webpack_require__(3);
	
	var _ringcentralBundle2 = _interopRequireDefault(_ringcentralBundle);
	
	var _rcConfig = __webpack_require__(9);
	
	var _rcConfig2 = _interopRequireDefault(_rcConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var holder = {};
	
	// for dependency injection
	var sdk = function () {
	    return holder.sdk;
	}();
	
	var injectSDK = function injectSDK(_ref) {
	    var key = _ref.key;
	    var secret = _ref.secret;
	    var sandbox = _ref.sandbox;
	
	    holder.sdk = new _ringcentralBundle2.default({
	        appKey: key,
	        appSecret: secret,
	        server: sandbox ? _ringcentralBundle2.default.server.sandbox : _ringcentralBundle2.default.server.production
	    });
	};
	exports.injectSDK = injectSDK;
	exports.RC = holder;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Buffer) {(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["SDK"] = factory();
		else
			root["RingCentral"] = root["RingCentral"] || {}, root["RingCentral"]["SDK"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "/build/";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
	__webpack_require__(1);
	module.exports = __webpack_require__(2);
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	var _Utils = __webpack_require__(3);
	
	var Utils = _interopRequireWildcard(_Utils);
	
	var _Cache = __webpack_require__(12);
	
	var _Cache2 = _interopRequireDefault(_Cache);
	
	var _Externals = __webpack_require__(4);
	
	var Externals = _interopRequireWildcard(_Externals);
	
	var _Observable = __webpack_require__(13);
	
	var _Observable2 = _interopRequireDefault(_Observable);
	
	var _Queue = __webpack_require__(14);
	
	var _Queue2 = _interopRequireDefault(_Queue);
	
	var _Client = __webpack_require__(15);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	var _ApiResponse = __webpack_require__(16);
	
	var _ApiResponse2 = _interopRequireDefault(_ApiResponse);
	
	var _ClientMock = __webpack_require__(17);
	
	var _ClientMock2 = _interopRequireDefault(_ClientMock);
	
	var _Mock = __webpack_require__(19);
	
	var _Mock2 = _interopRequireDefault(_Mock);
	
	var _Registry = __webpack_require__(18);
	
	var _Registry2 = _interopRequireDefault(_Registry);
	
	var _Platform = __webpack_require__(20);
	
	var _Platform2 = _interopRequireDefault(_Platform);
	
	var _Auth = __webpack_require__(21);
	
	var _Auth2 = _interopRequireDefault(_Auth);
	
	var _PubnubFactory = __webpack_require__(22);
	
	var _PubnubFactory2 = _interopRequireDefault(_PubnubFactory);
	
	var _Subscription = __webpack_require__(24);
	
	var _Subscription2 = _interopRequireDefault(_Subscription);
	
	var _CachedSubscription = __webpack_require__(25);
	
	var _CachedSubscription2 = _interopRequireDefault(_CachedSubscription);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SDK = function () {
	
	    /**
	     * @namespace RingCentral
	     * @constructor
	     * @param {object} [options]
	     * @param {string} [options.server]
	     * @param {string} [options.cachePrefix]
	     * @param {string} [options.appSecret]
	     * @param {string} [options.appKey]
	     * @param {string} [options.appName]
	     * @param {string} [options.appVersion]
	     * @param {string} [options.pubnubFactory]
	     * @param {string} [options.client]
	     */
	
	    function SDK(options) {
	        _classCallCheck(this, SDK);
	
	        options = options || {};
	
	        this._cache = new _Cache2.default(Externals.localStorage, options.cachePrefix);
	
	        this._client = options.client || new _Client2.default();
	
	        this._platform = new _Platform2.default(this._client, this._cache, options.server, options.appKey, options.appSecret, options.appName, options.appVersion, SDK.version);
	
	        this._pubnubFactory = options.pubnubFactory || Externals.PUBNUB;
	    }
	
	    /**
	     * @return {Platform}
	     */
	
	
	    SDK.prototype.platform = function platform() {
	        return this._platform;
	    };
	
	    /**
	     * @return {Subscription}
	     */
	
	
	    SDK.prototype.createSubscription = function createSubscription() {
	        return new _Subscription2.default(this._pubnubFactory, this._platform);
	    };
	
	    /**
	     * @return {CachedSubscription}
	     */
	
	
	    SDK.prototype.createCachedSubscription = function createCachedSubscription(cacheKey) {
	        return new _CachedSubscription2.default(this._pubnubFactory, this._platform, this._cache, cacheKey);
	    };
	
	    /**
	     * @return {Cache}
	     */
	
	
	    SDK.prototype.cache = function cache() {
	        return this._cache;
	    };
	
	    SDK.handleAuthRedirect = function handleAuthRedirect(origin) {
	        window.opener.postMessage({ RCAuthorizationCode: window.location.search }, origin || window.location.origin);
	    };
	
	    return SDK;
	}();
	
	SDK.version = '2.0.6';
	SDK.server = {
	    sandbox: 'https://platform.devtest.ringcentral.com',
	    production: 'https://platform.ringcentral.com'
	};
	SDK.core = {
	    Cache: _Cache2.default,
	    Observable: _Observable2.default,
	    Utils: Utils,
	    Externals: Externals,
	    Queue: _Queue2.default
	};
	SDK.http = {
	    Client: _Client2.default,
	    ApiResponse: _ApiResponse2.default
	};
	SDK.platform = {
	    Auth: _Auth2.default,
	    Platform: _Platform2.default
	};
	SDK.subscription = {
	    Subscription: _Subscription2.default
	};
	SDK.mocks = {
	    Client: _ClientMock2.default,
	    Registry: _Registry2.default,
	    Mock: _Mock2.default
	};
	SDK.pubnub = {
	    PubnubMockFactory: _PubnubFactory2.default
	};
	
	
	module.exports = SDK;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.queryStringify = queryStringify;
	exports.parseQueryString = parseQueryString;
	exports.isFunction = isFunction;
	exports.isArray = isArray;
	exports.isObject = isObject;
	exports.isObjectObject = isObjectObject;
	exports.isPlainObject = isPlainObject;
	exports.poll = poll;
	exports.stopPolling = stopPolling;
	exports.isNodeJS = isNodeJS;
	exports.isBrowser = isBrowser;
	exports.delay = delay;
	
	var _Externals = __webpack_require__(4);
	
	/**
	 * TODO Replace with something better
	 * @see https://github.com/joyent/node/blob/master/lib/querystring.js
	 * @param {object} parameters
	 * @returns {string}
	 */
	function queryStringify(parameters) {
	
	    var array = [];
	
	    parameters = parameters || {};
	
	    Object.keys(parameters).forEach(function (k) {
	
	        var v = parameters[k];
	
	        if (isArray(v)) {
	            v.forEach(function (vv) {
	                array.push(encodeURIComponent(k) + '=' + encodeURIComponent(vv));
	            });
	        } else {
	            array.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
	        }
	    });
	
	    return array.join('&');
	}
	
	/**
	 * TODO Replace with something better
	 * @see https://github.com/joyent/node/blob/master/lib/querystring.js
	 * @param {string} queryString
	 * @returns {object}
	 */
	function parseQueryString(queryString) {
	
	    var argsParsed = {};
	
	    queryString.split('&').forEach(function (arg) {
	
	        arg = decodeURIComponent(arg);
	
	        if (arg.indexOf('=') == -1) {
	
	            argsParsed[arg.trim()] = true;
	        } else {
	
	            var pair = arg.split('='),
	                key = pair[0].trim(),
	                value = pair[1].trim();
	
	            if (key in argsParsed) {
	                if (key in argsParsed && !isArray(argsParsed[key])) argsParsed[key] = [argsParsed[key]];
	                argsParsed[key].push(value);
	            } else {
	                argsParsed[key] = value;
	            }
	        }
	    });
	
	    return argsParsed;
	}
	
	/**
	 * @param obj
	 * @return {boolean}
	 */
	function isFunction(obj) {
	    return typeof obj === "function";
	}
	
	/**
	 * @param obj
	 * @return {boolean}
	 */
	function isArray(obj) {
	    return Array.isArray ? Array.isArray(obj) : typeof obj === "array";
	}
	
	function isObject(o) {
	    return o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && !isArray(o);
	}
	
	function isObjectObject(o) {
	    return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
	}
	
	function isPlainObject(o) {
	    var ctor, prot;
	
	    if (isObjectObject(o) === false) return false;
	
	    // If has modified constructor
	    ctor = o.constructor;
	    if (typeof ctor !== 'function') return false;
	
	    // If has modified prototype
	    prot = ctor.prototype;
	    if (isObjectObject(prot) === false) return false;
	
	    // If constructor does not have an Object-specific method
	    if (prot.hasOwnProperty('isPrototypeOf') === false) {
	        return false;
	    }
	
	    // Most likely a plain Object
	    return true;
	}
	
	/**
	 * @param fn
	 * @param interval
	 * @param timeout
	 */
	function poll(fn, interval, timeout) {
	    //NodeJS.Timer|number
	
	    module.exports.stopPolling(timeout);
	
	    interval = interval || 1000;
	
	    var next = function next(delay) {
	
	        delay = delay || interval;
	
	        interval = delay;
	
	        return setTimeout(function () {
	
	            fn(next, delay);
	        }, delay);
	    };
	
	    return next();
	}
	
	function stopPolling(timeout) {
	    if (timeout) clearTimeout(timeout);
	}
	
	function isNodeJS() {
	    return typeof process !== 'undefined';
	}
	
	function isBrowser() {
	    return typeof window !== 'undefined';
	}
	
	function delay(timeout) {
	    return new _Externals.Promise(function (resolve, reject) {
	        setTimeout(function () {
	            resolve(null);
	        }, timeout);
	    });
	}
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	exports.localStorage = exports.PUBNUB = exports.Headers = exports.Response = exports.Request = exports.fetch = exports.Promise = undefined;
	
	var _es6Promise = __webpack_require__(5);
	
	var _es6Promise2 = _interopRequireDefault(_es6Promise);
	
	var _nodeFetch = __webpack_require__(10);
	
	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
	
	var _pubnub = __webpack_require__(11);
	
	var _pubnub2 = _interopRequireDefault(_pubnub);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function("return this;")();
	
	var Promise = exports.Promise = _es6Promise2.default && _es6Promise2.default.Promise || root.Promise;
	
	var fetch = exports.fetch = root.fetch || _nodeFetch2.default;
	var Request = exports.Request = root.Request || fetch.Request;
	var Response = exports.Response = root.Response || fetch.Response;
	var Headers = exports.Headers = root.Headers || fetch.Headers;
	
	var PUBNUB = exports.PUBNUB = root.PUBNUB || _pubnub2.default;
	
	var localStorage = exports.localStorage = typeof root.localStorage !== 'undefined' ? root.localStorage : {};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(setImmediate, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.2.0
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    function lib$es6$promise$asap$$asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    var lib$es6$promise$asap$$default = lib$es6$promise$asap$$asap;
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      var nextTick = process.nextTick;
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // setImmediate should be used instead instead
	      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
	      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
	        nextTick = setImmediate;
	      }
	      return function() {
	        nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertex() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertex();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFullfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$default(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);
	
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFullfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;
	
	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;
	
	        enumerator._init();
	
	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };
	
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;
	
	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;
	
	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }
	
	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	    var lib$es6$promise$promise$$counter = 0;
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise’s eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }
	
	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }
	
	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$default;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;
	
	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }
	
	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;
	
	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$default(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }
	
	        return child;
	      },
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(9)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate, (function() { return this; }()), __webpack_require__(8)(module)))
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(7).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate, __webpack_require__(6).clearImmediate))
	
	/***/ },
	/* 7 */
	/***/ function(module, exports) {
	
	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };
	
	
	/***/ },
	/* 8 */
	/***/ function(module, exports) {
	
	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}
	
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
	module.exports = function() { throw new Error("define cannot be used indirect"); };
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
	(function() {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.url = null
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }
	
	  Body.call(Response.prototype)
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function(input, init) {
	    var request
	    if (Request.prototype.isPrototypeOf(input) && !init) {
	      request = input
	    } else {
	      request = new Request(input, init)
	    }
	
	    return new Promise(function(resolve, reject) {
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return;
	      }
	
	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
	/* WEBPACK VAR INJECTION */(function(module) {// Version: 3.7.16
	/* =-====================================================================-= */
	/* =-====================================================================-= */
	/* =-=========================     JSON     =============================-= */
	/* =-====================================================================-= */
	/* =-====================================================================-= */
	
	(window['JSON'] && window['JSON']['stringify']) || (function () {
	    window['JSON'] || (window['JSON'] = {});
	
	    function toJSON(key) {
	        try      { return this.valueOf() }
	        catch(e) { return null }
	    }
	
	    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        gap,
	        indent,
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        },
	        rep;
	
	    function quote(string) {
	        escapable.lastIndex = 0;
	        return escapable.test(string) ?
	            '"' + string.replace(escapable, function (a) {
	                var c = meta[a];
	                return typeof c === 'string' ? c :
	                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	            }) + '"' :
	            '"' + string + '"';
	    }
	
	    function str(key, holder) {
	        var i,          // The loop counter.
	            k,          // The member key.
	            v,          // The member value.
	            length,
	            partial,
	            mind  = gap,
	            value = holder[key];
	
	        if (value && typeof value === 'object') {
	            value = toJSON.call( value, key );
	        }
	
	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }
	
	        switch (typeof value) {
	        case 'string':
	            return quote(value);
	
	        case 'number':
	            return isFinite(value) ? String(value) : 'null';
	
	        case 'boolean':
	        case 'null':
	            return String(value);
	
	        case 'object':
	
	            if (!value) {
	                return 'null';
	            }
	
	            gap += indent;
	            partial = [];
	
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	
	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }
	
	                v = partial.length === 0 ? '[]' :
	                    gap ? '[\n' + gap +
	                            partial.join(',\n' + gap) + '\n' +
	                                mind + ']' :
	                          '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }
	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    k = rep[i];
	                    if (typeof k === 'string') {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            } else {
	                for (k in value) {
	                    if (Object.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	
	            v = partial.length === 0 ? '{}' :
	                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
	                        mind + '}' : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }
	
	    if (typeof JSON['stringify'] !== 'function') {
	        JSON['stringify'] = function (value, replacer, space) {
	            var i;
	            gap = '';
	            indent = '';
	
	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }
	            } else if (typeof space === 'string') {
	                indent = space;
	            }
	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                     typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }
	            return str('', {'': value});
	        };
	    }
	
	    if (typeof JSON['parse'] !== 'function') {
	        // JSON is parsed on the server for security.
	        JSON['parse'] = function (text) {return eval('('+text+')')};
	    }
	}());
	/* =-====================================================================-= */
	/* =-====================================================================-= */
	/* =-=========================     UTIL     =============================-= */
	/* =-====================================================================-= */
	/* =-====================================================================-= */
	
	window['PUBNUB'] || (function() {
	var NOW             = 1
	,   READY           = false
	,   READY_BUFFER    = []
	,   PRESENCE_SUFFIX = '-pnpres'
	,   DEF_WINDOWING   = 10     // MILLISECONDS.
	,   DEF_TIMEOUT     = 10000  // MILLISECONDS.
	,   DEF_SUB_TIMEOUT = 310    // SECONDS.
	,   DEF_KEEPALIVE   = 60     // SECONDS (FOR TIMESYNC).
	,   SECOND          = 1000   // A THOUSAND MILLISECONDS.
	,   URLBIT          = '/'
	,   PARAMSBIT       = '&'
	,   PRESENCE_HB_THRESHOLD = 5
	,   PRESENCE_HB_DEFAULT  = 30
	,   SDK_VER         = '3.7.16'
	,   REPL            = /{([\w\-]+)}/g;
	
	/**
	 * UTILITIES
	 */
	function unique() { return'x'+ ++NOW+''+(+new Date) }
	function rnow()   { return+new Date }
	
	/**
	 * NEXTORIGIN
	 * ==========
	 * var next_origin = nextorigin();
	 */
	var nextorigin = (function() {
	    var max = 20
	    ,   ori = Math.floor(Math.random() * max);
	    return function( origin, failover ) {
	        return origin.indexOf('pubsub.') > 0
	            && origin.replace(
	             'pubsub', 'ps' + (
	                failover ? generate_uuid().split('-')[0] :
	                (++ori < max? ori : ori=1)
	            ) ) || origin;
	    }
	})();
	
	
	/**
	 * Build Url
	 * =======
	 *
	 */
	function build_url( url_components, url_params ) {
	    var url    = url_components.join(URLBIT)
	    ,   params = [];
	
	    if (!url_params) return url;
	
	    each( url_params, function( key, value ) {
	        var value_str = (typeof value == 'object')?JSON['stringify'](value):value;
	        (typeof value != 'undefined' &&
	            value != null && encode(value_str).length > 0
	        ) && params.push(key + "=" + encode(value_str));
	    } );
	
	    url += "?" + params.join(PARAMSBIT);
	    return url;
	}
	
	/**
	 * UPDATER
	 * =======
	 * var timestamp = unique();
	 */
	function updater( fun, rate ) {
	    var timeout
	    ,   last   = 0
	    ,   runnit = function() {
	        if (last + rate > rnow()) {
	            clearTimeout(timeout);
	            timeout = setTimeout( runnit, rate );
	        }
	        else {
	            last = rnow();
	            fun();
	        }
	    };
	
	    return runnit;
	}
	
	/**
	 * GREP
	 * ====
	 * var list = grep( [1,2,3], function(item) { return item % 2 } )
	 */
	function grep( list, fun ) {
	    var fin = [];
	    each( list || [], function(l) { fun(l) && fin.push(l) } );
	    return fin
	}
	
	/**
	 * SUPPLANT
	 * ========
	 * var text = supplant( 'Hello {name}!', { name : 'John' } )
	 */
	function supplant( str, values ) {
	    return str.replace( REPL, function( _, match ) {
	        return values[match] || _
	    } );
	}
	
	/**
	 * timeout
	 * =======
	 * timeout( function(){}, 100 );
	 */
	function timeout( fun, wait ) {
	    return setTimeout( fun, wait );
	}
	
	/**
	 * uuid
	 * ====
	 * var my_uuid = generate_uuid();
	 */
	function generate_uuid(callback) {
	    var u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
	    function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	    if (callback) callback(u);
	    return u;
	}
	
	function isArray(arg) {
	  return !!arg && typeof arg !== 'string' && (Array.isArray && Array.isArray(arg) || typeof(arg.length) === "number")
	  //return !!arg && (Array.isArray && Array.isArray(arg) || typeof(arg.length) === "number")
	}
	
	/**
	 * EACH
	 * ====
	 * each( [1,2,3], function(item) { } )
	 */
	function each( o, f) {
	    if ( !o || !f ) return;
	
	    if ( isArray(o) )
	        for ( var i = 0, l = o.length; i < l; )
	            f.call( o[i], o[i], i++ );
	    else
	        for ( var i in o )
	            o.hasOwnProperty    &&
	            o.hasOwnProperty(i) &&
	            f.call( o[i], i, o[i] );
	}
	
	/**
	 * MAP
	 * ===
	 * var list = map( [1,2,3], function(item) { return item + 1 } )
	 */
	function map( list, fun ) {
	    var fin = [];
	    each( list || [], function( k, v ) { fin.push(fun( k, v )) } );
	    return fin;
	}
	
	
	function pam_encode(str) {
	  return encodeURIComponent(str).replace(/[!'()*~]/g, function(c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}
	
	/**
	 * ENCODE
	 * ======
	 * var encoded_data = encode('path');
	 */
	function encode(path) { return encodeURIComponent(path) }
	
	/**
	 * Generate Subscription Channel List
	 * ==================================
	 * generate_channel_list(channels_object);
	 */
	function generate_channel_list(channels, nopresence) {
	    var list = [];
	    each( channels, function( channel, status ) {
	        if (nopresence) {
	            if(channel.search('-pnpres') < 0) {
	                if (status.subscribed) list.push(channel);
	            }
	        } else {
	            if (status.subscribed) list.push(channel);
	        }
	    });
	    return list.sort();
	}
	
	/**
	 * Generate Subscription Channel Groups List
	 * ==================================
	 * generate_channel_group_list(channels_groups object);
	 */
	function generate_channel_group_list(channel_groups, nopresence) {
	    var list = [];
	    each(channel_groups, function( channel_group, status ) {
	        if (nopresence) {
	            if(channel_group.search('-pnpres') < 0) {
	                if (status.subscribed) list.push(channel_group);
	            }
	        } else {
	            if (status.subscribed) list.push(channel_group);
	        }
	    });
	    return list.sort();
	}
	
	// PUBNUB READY TO CONNECT
	function ready() { timeout( function() {
	    if (READY) return;
	    READY = 1;
	    each( READY_BUFFER, function(connect) { connect() } );
	}, SECOND ); }
	
	function PNmessage(args) {
	    msg = args || {'apns' : {}},
	    msg['getPubnubMessage'] = function() {
	        var m = {};
	
	        if (Object.keys(msg['apns']).length) {
	            m['pn_apns'] = {
	                    'aps' : {
	                        'alert' : msg['apns']['alert'] ,
	                        'badge' : msg['apns']['badge']
	                    }
	            }
	            for (var k in msg['apns']) {
	                m['pn_apns'][k] = msg['apns'][k];
	            }
	            var exclude1 = ['badge','alert'];
	            for (var k in exclude1) {
	                delete m['pn_apns'][exclude1[k]];
	            }
	        }
	
	
	
	        if (msg['gcm']) {
	            m['pn_gcm'] = {
	                'data' : msg['gcm']
	            }
	        }
	
	        for (var k in msg) {
	            m[k] = msg[k];
	        }
	        var exclude = ['apns','gcm','publish', 'channel','callback','error'];
	        for (var k in exclude) {
	            delete m[exclude[k]];
	        }
	
	        return m;
	    };
	    msg['publish'] = function() {
	
	        var m = msg.getPubnubMessage();
	
	        if (msg['pubnub'] && msg['channel']) {
	            msg['pubnub'].publish({
	                'message' : m,
	                'channel' : msg['channel'],
	                'callback' : msg['callback'],
	                'error' : msg['error']
	            })
	        }
	    };
	    return msg;
	}
	
	function PN_API(setup) {
	    var SUB_WINDOWING =  +setup['windowing']   || DEF_WINDOWING
	    ,   SUB_TIMEOUT   = (+setup['timeout']     || DEF_SUB_TIMEOUT) * SECOND
	    ,   KEEPALIVE     = (+setup['keepalive']   || DEF_KEEPALIVE)   * SECOND
	    ,   TIME_CHECK    = setup['timecheck']     || 0
	    ,   NOLEAVE       = setup['noleave']       || 0
	    ,   PUBLISH_KEY   = setup['publish_key']
	    ,   SUBSCRIBE_KEY = setup['subscribe_key']
	    ,   AUTH_KEY      = setup['auth_key']      || ''
	    ,   SECRET_KEY    = setup['secret_key']    || ''
	    ,   hmac_SHA256   = setup['hmac_SHA256']
	    ,   SSL           = setup['ssl']            ? 's' : ''
	    ,   ORIGIN        = 'http'+SSL+'://'+(setup['origin']||'pubsub.pubnub.com')
	    ,   STD_ORIGIN    = nextorigin(ORIGIN)
	    ,   SUB_ORIGIN    = nextorigin(ORIGIN)
	    ,   CONNECT       = function(){}
	    ,   PUB_QUEUE     = []
	    ,   CLOAK         = true
	    ,   TIME_DRIFT    = 0
	    ,   SUB_CALLBACK  = 0
	    ,   SUB_CHANNEL   = 0
	    ,   SUB_RECEIVER  = 0
	    ,   SUB_RESTORE   = setup['restore'] || 0
	    ,   SUB_BUFF_WAIT = 0
	    ,   TIMETOKEN     = 0
	    ,   RESUMED       = false
	    ,   CHANNELS      = {}
	    ,   CHANNEL_GROUPS       = {}
	    ,   SUB_ERROR     = function(){}
	    ,   STATE         = {}
	    ,   PRESENCE_HB_TIMEOUT  = null
	    ,   PRESENCE_HB          = validate_presence_heartbeat(
	        setup['heartbeat'] || setup['pnexpires'] || 0, setup['error']
	    )
	    ,   PRESENCE_HB_INTERVAL = setup['heartbeat_interval'] || (PRESENCE_HB / 2) -1
	    ,   PRESENCE_HB_RUNNING  = false
	    ,   NO_WAIT_FOR_PENDING  = setup['no_wait_for_pending']
	    ,   COMPATIBLE_35 = setup['compatible_3.5']  || false
	    ,   xdr           = setup['xdr']
	    ,   params        = setup['params'] || {}
	    ,   error         = setup['error']      || function() {}
	    ,   _is_online    = setup['_is_online'] || function() { return 1 }
	    ,   jsonp_cb      = setup['jsonp_cb']   || function() { return 0 }
	    ,   db            = setup['db']         || {'get': function(){}, 'set': function(){}}
	    ,   CIPHER_KEY    = setup['cipher_key']
	    ,   UUID          = setup['uuid'] || ( !setup['unique_uuid'] && db && db['get'](SUBSCRIBE_KEY+'uuid') || '')
	    ,   USE_INSTANCEID = setup['instance_id'] || false
	    ,   INSTANCEID    = ''
	    ,   shutdown      = setup['shutdown']
	    ,   use_send_beacon = (typeof setup['use_send_beacon'] != 'undefined')?setup['use_send_beacon']:true
	    ,   sendBeacon    = (use_send_beacon)?setup['sendBeacon']:null
	    ,   _poll_timer
	    ,   _poll_timer2;
	
	    if (PRESENCE_HB === 2) PRESENCE_HB_INTERVAL = 1;
	
	    var crypto_obj    = setup['crypto_obj'] ||
	        {
	            'encrypt' : function(a,key){ return a},
	            'decrypt' : function(b,key){return b}
	        };
	
	    function _get_url_params(data) {
	        if (!data) data = {};
	        each( params , function( key, value ) {
	            if (!(key in data)) data[key] = value;
	        });
	        return data;
	    }
	
	    function _object_to_key_list(o) {
	        var l = []
	        each( o , function( key, value ) {
	            l.push(key);
	        });
	        return l;
	    }
	    function _object_to_key_list_sorted(o) {
	        return _object_to_key_list(o).sort();
	    }
	
	    function _get_pam_sign_input_from_params(params) {
	        var si = "";
	        var l = _object_to_key_list_sorted(params);
	
	        for (var i in l) {
	            var k = l[i]
	            si += k + "=" + pam_encode(params[k]) ;
	            if (i != l.length - 1) si += "&"
	        }
	        return si;
	    }
	
	    function validate_presence_heartbeat(heartbeat, cur_heartbeat, error) {
	        var err = false;
	
	        if (typeof heartbeat === 'undefined') {
	            return cur_heartbeat;
	        }
	
	        if (typeof heartbeat === 'number') {
	            if (heartbeat > PRESENCE_HB_THRESHOLD || heartbeat == 0)
	                err = false;
	            else
	                err = true;
	        } else if(typeof heartbeat === 'boolean'){
	            if (!heartbeat) {
	                return 0;
	            } else {
	                return PRESENCE_HB_DEFAULT;
	            }
	        } else {
	            err = true;
	        }
	
	        if (err) {
	            error && error("Presence Heartbeat value invalid. Valid range ( x > " + PRESENCE_HB_THRESHOLD + " or x = 0). Current Value : " + (cur_heartbeat || PRESENCE_HB_THRESHOLD));
	            return cur_heartbeat || PRESENCE_HB_THRESHOLD;
	        } else return heartbeat;
	    }
	
	    function encrypt(input, key) {
	        return crypto_obj['encrypt'](input, key || CIPHER_KEY) || input;
	    }
	    function decrypt(input, key) {
	        return crypto_obj['decrypt'](input, key || CIPHER_KEY) ||
	               crypto_obj['decrypt'](input, CIPHER_KEY) ||
	               input;
	    }
	
	    function error_common(message, callback) {
	        callback && callback({ 'error' : message || "error occurred"});
	        error && error(message);
	    }
	    function _presence_heartbeat() {
	
	        clearTimeout(PRESENCE_HB_TIMEOUT);
	
	        if (!PRESENCE_HB_INTERVAL || PRESENCE_HB_INTERVAL >= 500 ||
	            PRESENCE_HB_INTERVAL < 1 ||
	            (!generate_channel_list(CHANNELS,true).length  && !generate_channel_group_list(CHANNEL_GROUPS, true).length ) )
	        {
	            PRESENCE_HB_RUNNING = false;
	            return;
	        }
	
	        PRESENCE_HB_RUNNING = true;
	        SELF['presence_heartbeat']({
	            'callback' : function(r) {
	                PRESENCE_HB_TIMEOUT = timeout( _presence_heartbeat, (PRESENCE_HB_INTERVAL) * SECOND );
	            },
	            'error' : function(e) {
	                error && error("Presence Heartbeat unable to reach Pubnub servers." + JSON.stringify(e));
	                PRESENCE_HB_TIMEOUT = timeout( _presence_heartbeat, (PRESENCE_HB_INTERVAL) * SECOND );
	            }
	        });
	    }
	
	    function start_presence_heartbeat() {
	        !PRESENCE_HB_RUNNING && _presence_heartbeat();
	    }
	
	    function publish(next) {
	
	        if (NO_WAIT_FOR_PENDING) {
	            if (!PUB_QUEUE.length) return;
	        } else {
	            if (next) PUB_QUEUE.sending = 0;
	            if ( PUB_QUEUE.sending || !PUB_QUEUE.length ) return;
	            PUB_QUEUE.sending = 1;
	        }
	
	        xdr(PUB_QUEUE.shift());
	    }
	    function each_channel_group(callback) {
	        var count = 0;
	
	        each( generate_channel_group_list(CHANNEL_GROUPS), function(channel_group) {
	            var chang = CHANNEL_GROUPS[channel_group];
	
	            if (!chang) return;
	
	            count++;
	            (callback||function(){})(chang);
	        } );
	
	        return count;
	    }
	
	    function each_channel(callback) {
	        var count = 0;
	
	        each( generate_channel_list(CHANNELS), function(channel) {
	            var chan = CHANNELS[channel];
	
	            if (!chan) return;
	
	            count++;
	            (callback||function(){})(chan);
	        } );
	
	        return count;
	    }
	    function _invoke_callback(response, callback, err) {
	        if (typeof response == 'object') {
	            if (response['error']) {
	                var callback_data = {};
	
	                if (response['message']) {
	                    callback_data['message'] = response['message'];
	                }
	
	                if (response['payload']) {
	                    callback_data['payload'] = response['payload'];
	                }
	
	                err && err(callback_data);
	                return;
	
	            }
	            if (response['payload']) {
	                if (response['next_page'])
	                    callback && callback(response['payload'], response['next_page']);
	                else
	                    callback && callback(response['payload']);
	                return;
	            }
	        }
	        callback && callback(response);
	    }
	
	    function _invoke_error(response,err) {
	
	        if (typeof response == 'object' && response['error']) {
	                var callback_data = {};
	
	                if (response['message']) {
	                    callback_data['message'] = response['message'];
	                }
	
	                if (response['payload']) {
	                    callback_data['payload'] = response['payload'];
	                }
	                
	                err && err(callback_data);
	                return;
	        } else {
	            err && err(response);
	        }
	    }
	    function CR(args, callback, url1, data) {
	            var callback        = args['callback']      || callback
	            ,   err             = args['error']         || error
	            ,   jsonp           = jsonp_cb();
	
	            data = data || {};
	            
	            if (!data['auth']) {
	                data['auth'] = args['auth_key'] || AUTH_KEY;
	            }
	            
	            var url = [
	                    STD_ORIGIN, 'v1', 'channel-registration',
	                    'sub-key', SUBSCRIBE_KEY
	                ];
	
	            url.push.apply(url,url1);
	            
	            if (jsonp) data['callback']              = jsonp;
	            
	            xdr({
	                callback : jsonp,
	                data     : _get_url_params(data),
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : url
	            });
	
	    }
	
	    // Announce Leave Event
	    var SELF = {
	        'LEAVE' : function( channel, blocking, auth_key, callback, error ) {
	
	            var data   = { 'uuid' : UUID, 'auth' : auth_key || AUTH_KEY }
	            ,   origin = nextorigin(ORIGIN)
	            ,   callback = callback || function(){}
	            ,   err      = error    || function(){}
	            ,   url
	            ,   params
	            ,   jsonp  = jsonp_cb();
	
	            // Prevent Leaving a Presence Channel
	            if (channel.indexOf(PRESENCE_SUFFIX) > 0) return true;
	
	
	            if (COMPATIBLE_35) {
	                if (!SSL)         return false;
	                if (jsonp == '0') return false;
	            }
	
	            if (NOLEAVE)  return false;
	
	            if (jsonp != '0') data['callback'] = jsonp;
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            url = [
	                    origin, 'v2', 'presence', 'sub_key',
	                    SUBSCRIBE_KEY, 'channel', encode(channel), 'leave'
	                ];
	
	            params = _get_url_params(data);
	
	
	            if (sendBeacon) {
	                url_string = build_url(url, params);
	                if (sendBeacon(url_string)) {
	                    callback && callback({"status": 200, "action": "leave", "message": "OK", "service": "Presence"});
	                    return true;
	                }
	            }
	
	
	            xdr({
	                blocking : blocking || SSL,
	                timeout  : 2000,
	                callback : jsonp,
	                data     : params,
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : url
	            });
	            return true;
	        },
	        'LEAVE_GROUP' : function( channel_group, blocking, auth_key, callback, error ) {
	
	            var data   = { 'uuid' : UUID, 'auth' : auth_key || AUTH_KEY }
	            ,   origin = nextorigin(ORIGIN)
	            ,   url
	            ,   params
	            ,   callback = callback || function(){}
	            ,   err      = error    || function(){}
	            ,   jsonp  = jsonp_cb();
	
	            // Prevent Leaving a Presence Channel Group
	            if (channel_group.indexOf(PRESENCE_SUFFIX) > 0) return true;
	
	            if (COMPATIBLE_35) {
	                if (!SSL)         return false;
	                if (jsonp == '0') return false;
	            }
	
	            if (NOLEAVE)  return false;
	
	            if (jsonp != '0') data['callback'] = jsonp;
	
	            if (channel_group && channel_group.length > 0) data['channel-group'] = channel_group;
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            url = [
	                    origin, 'v2', 'presence', 'sub_key',
	                    SUBSCRIBE_KEY, 'channel', encode(','), 'leave'
	            ];
	
	            params = _get_url_params(data);
	
	            if (sendBeacon) {
	                url_string = build_url(url, params);
	                if (sendBeacon(url_string)) {
	                    callback && callback({"status": 200, "action": "leave", "message": "OK", "service": "Presence"});
	                    return true;
	                }
	            }
	
	            xdr({
	                blocking : blocking || SSL,
	                timeout  : 5000,
	                callback : jsonp,
	                data     : params,
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : url
	            });
	            return true;
	        },
	        'set_resumed' : function(resumed) {
	                RESUMED = resumed;
	        },
	        'get_cipher_key' : function() {
	            return CIPHER_KEY;
	        },
	        'set_cipher_key' : function(key) {
	            CIPHER_KEY = key;
	        },
	        'raw_encrypt' : function(input, key) {
	            return encrypt(input, key);
	        },
	        'raw_decrypt' : function(input, key) {
	            return decrypt(input, key);
	        },
	        'get_heartbeat' : function() {
	            return PRESENCE_HB;
	        },
	        
	        'set_heartbeat' : function(heartbeat, heartbeat_interval) {
	            PRESENCE_HB = validate_presence_heartbeat(heartbeat, PRESENCE_HB, error);
	            PRESENCE_HB_INTERVAL = heartbeat_interval || (PRESENCE_HB / 2) - 1;
	            if (PRESENCE_HB == 2) {
	                PRESENCE_HB_INTERVAL = 1;
	            }
	            CONNECT();
	            _presence_heartbeat();
	        },
	        
	        'get_heartbeat_interval' : function() {
	            return PRESENCE_HB_INTERVAL;
	        },
	        
	        'set_heartbeat_interval' : function(heartbeat_interval) {
	            PRESENCE_HB_INTERVAL = heartbeat_interval;
	            _presence_heartbeat();
	        },
	        
	        'get_version' : function() {
	            return SDK_VER;
	        },
	        'getGcmMessageObject' : function(obj) {
	            return {
	                'data' : obj
	            }
	        },
	        'getApnsMessageObject' : function(obj) {
	            var x =  {
	                'aps' : { 'badge' : 1, 'alert' : ''}
	            }
	            for (k in obj) {
	                k[x] = obj[k];
	            }
	            return x;
	        },
	        'newPnMessage' : function() {
	            var x = {};
	            if (gcm) x['pn_gcm'] = gcm;
	            if (apns) x['pn_apns'] = apns;
	            for ( k in n ) {
	                x[k] = n[k];
	            }
	            return x;
	        },
	
	        '_add_param' : function(key,val) {
	            params[key] = val;
	        },
	
	        'channel_group' : function(args, callback) {
	            var ns_ch       = args['channel_group']
	            ,   callback    = callback         || args['callback']
	            ,   channels    = args['channels'] || args['channel']
	            ,   cloak       = args['cloak']
	            ,   namespace
	            ,   channel_group
	            ,   url = []
	            ,   data = {}
	            ,   mode = args['mode'] || 'add';
	
	
	            if (ns_ch) {
	                var ns_ch_a = ns_ch.split(':');
	
	                if (ns_ch_a.length > 1) {
	                    namespace = (ns_ch_a[0] === '*')?null:ns_ch_a[0];
	
	                    channel_group = ns_ch_a[1];
	                } else {
	                    channel_group = ns_ch_a[0];
	                }
	            }
	
	            namespace && url.push('namespace') && url.push(encode(namespace));
	
	            url.push('channel-group');
	
	            if (channel_group && channel_group !== '*') {
	                url.push(channel_group);
	            }
	
	            if (channels ) {
	                if (isArray(channels)) {
	                    channels = channels.join(',');
	                }
	                data[mode] = channels;
	                data['cloak'] = (CLOAK)?'true':'false';
	            } else {
	                if (mode === 'remove') url.push('remove');
	            }
	
	            if (typeof cloak != 'undefined') data['cloak'] = (cloak)?'true':'false';
	
	            CR(args, callback, url, data);
	        },
	
	        'channel_group_list_groups' : function(args, callback) {
	            var namespace;
	
	            namespace = args['namespace'] || args['ns'] || args['channel_group'] || null;
	            if (namespace) {
	                args["channel_group"] = namespace + ":*";
	            }
	
	            SELF['channel_group'](args, callback);
	        },
	
	        'channel_group_list_channels' : function(args, callback) {
	            if (!args['channel_group']) return error('Missing Channel Group');
	            SELF['channel_group'](args, callback);
	        },
	
	        'channel_group_remove_channel' : function(args, callback) {
	            if (!args['channel_group']) return error('Missing Channel Group');
	            if (!args['channel'] && !args['channels'] ) return error('Missing Channel');
	
	            args['mode'] = 'remove';
	            SELF['channel_group'](args,callback);
	        },
	
	        'channel_group_remove_group' : function(args, callback) {
	            if (!args['channel_group']) return error('Missing Channel Group');
	            if (args['channel']) return error('Use channel_group_remove_channel if you want to remove a channel from a group.');
	
	            args['mode'] = 'remove';
	            SELF['channel_group'](args,callback);
	        },
	
	        'channel_group_add_channel' : function(args, callback) {
	           if (!args['channel_group']) return error('Missing Channel Group');
	           if (!args['channel'] && !args['channels'] ) return error('Missing Channel');
	            SELF['channel_group'](args,callback);
	        },
	
	        'channel_group_cloak' : function(args, callback) {
	            if (typeof args['cloak'] == 'undefined') {
	                callback(CLOAK);
	                return;
	            }
	            CLOAK = args['cloak'];
	            SELF['channel_group'](args,callback);
	        },
	
	        'channel_group_list_namespaces' : function(args, callback) {
	            var url = ['namespace'];
	            CR(args, callback, url);
	        },
	        'channel_group_remove_namespace' : function(args, callback) {
	            var url = ['namespace',args['namespace'],'remove'];
	            CR(args, callback, url);
	        },
	
	        /*
	            PUBNUB.history({
	                channel  : 'my_chat_channel',
	                limit    : 100,
	                callback : function(history) { }
	            });
	        */
	        'history' : function( args, callback ) {
	            var callback         = args['callback'] || callback
	            ,   count            = args['count']    || args['limit'] || 100
	            ,   reverse          = args['reverse']  || "false"
	            ,   err              = args['error']    || function(){}
	            ,   auth_key         = args['auth_key'] || AUTH_KEY
	            ,   cipher_key       = args['cipher_key']
	            ,   channel          = args['channel']
	            ,   channel_group    = args['channel_group']
	            ,   start            = args['start']
	            ,   end              = args['end']
	            ,   include_token    = args['include_token']
	            ,   string_msg_token = args['string_message_token'] || false
	            ,   params           = {}
	            ,   jsonp            = jsonp_cb();
	
	            // Make sure we have a Channel
	            if (!channel && !channel_group) return error('Missing Channel');
	            if (!callback)      return error('Missing Callback');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	
	            params['stringtoken'] = 'true';
	            params['count']       = count;
	            params['reverse']     = reverse;
	            params['auth']        = auth_key;
	
	            if (channel_group) {
	                params['channel-group'] = channel_group;
	                if (!channel) {
	                    channel = ','; 
	                }
	            }
	            if (jsonp) params['callback']              = jsonp;
	            if (start) params['start']                 = start;
	            if (end)   params['end']                   = end;
	            if (include_token) params['include_token'] = 'true';
	            if (string_msg_token) params['string_message_token'] = 'true';
	
	            // Send Message
	            xdr({
	                callback : jsonp,
	                data     : _get_url_params(params),
	                success  : function(response) {
	                    if (typeof response == 'object' && response['error']) {
	                        err({'message' : response['message'], 'payload' : response['payload']});
	                        return;
	                    }
	                    var messages = response[0];
	                    var decrypted_messages = [];
	                    for (var a = 0; a < messages.length; a++) {
	                        if (include_token) {
	                            var new_message = decrypt(messages[a]['message'],cipher_key);
	                            var timetoken = messages[a]['timetoken'];
	                            try {
	                                decrypted_messages['push']({"message" : JSON['parse'](new_message), "timetoken" : timetoken});
	                            } catch (e) {
	                                decrypted_messages['push'](({"message" : new_message, "timetoken" : timetoken}));
	                            }
	                        } else {
	                            var new_message = decrypt(messages[a],cipher_key);
	                            try {
	                                decrypted_messages['push'](JSON['parse'](new_message));
	                            } catch (e) {
	                                decrypted_messages['push']((new_message));
	                            }     
	                        }
	                    }
	                    callback([decrypted_messages, response[1], response[2]]);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : [
	                    STD_ORIGIN, 'v2', 'history', 'sub-key',
	                    SUBSCRIBE_KEY, 'channel', encode(channel)
	                ]
	            });
	        },
	
	        /*
	            PUBNUB.replay({
	                source      : 'my_channel',
	                destination : 'new_channel'
	            });
	        */
	        'replay' : function(args, callback) {
	            var callback    = callback || args['callback'] || function(){}
	            ,   auth_key    = args['auth_key'] || AUTH_KEY
	            ,   source      = args['source']
	            ,   destination = args['destination']
	            ,   stop        = args['stop']
	            ,   start       = args['start']
	            ,   end         = args['end']
	            ,   reverse     = args['reverse']
	            ,   limit       = args['limit']
	            ,   jsonp       = jsonp_cb()
	            ,   data        = {}
	            ,   url;
	
	            // Check User Input
	            if (!source)        return error('Missing Source Channel');
	            if (!destination)   return error('Missing Destination Channel');
	            if (!PUBLISH_KEY)   return error('Missing Publish Key');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	
	            // Setup URL Params
	            if (jsonp != '0') data['callback'] = jsonp;
	            if (stop)         data['stop']     = 'all';
	            if (reverse)      data['reverse']  = 'true';
	            if (start)        data['start']    = start;
	            if (end)          data['end']      = end;
	            if (limit)        data['count']    = limit;
	
	            data['auth'] = auth_key;
	
	            // Compose URL Parts
	            url = [
	                STD_ORIGIN, 'v1', 'replay',
	                PUBLISH_KEY, SUBSCRIBE_KEY,
	                source, destination
	            ];
	
	            // Start (or Stop) Replay!
	            xdr({
	                callback : jsonp,
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function() { callback([ 0, 'Disconnected' ]) },
	                url      : url,
	                data     : _get_url_params(data)
	            });
	        },
	
	        /*
	            PUBNUB.auth('AJFLKAJSDKLA');
	        */
	        'auth' : function(auth) {
	            AUTH_KEY = auth;
	            CONNECT();
	        },
	
	        /*
	            PUBNUB.time(function(time){ });
	        */
	        'time' : function(callback) {
	            var jsonp = jsonp_cb();
	
	            var data = { 'uuid' : UUID, 'auth' : AUTH_KEY }
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            xdr({
	                callback : jsonp,
	                data     : _get_url_params(data),
	                timeout  : SECOND * 5,
	                url      : [STD_ORIGIN, 'time', jsonp],
	                success  : function(response) { callback(response[0]) },
	                fail     : function() { callback(0) }
	            });
	        },
	
	        /*
	            PUBNUB.publish({
	                channel : 'my_chat_channel',
	                message : 'hello!'
	            });
	        */
	        'publish' : function( args, callback ) {
	            var msg      = args['message'];
	            if (!msg) return error('Missing Message');
	
	            var callback = callback || args['callback'] || msg['callback'] || function(){}
	            ,   channel  = args['channel'] || msg['channel']
	            ,   auth_key = args['auth_key'] || AUTH_KEY
	            ,   cipher_key = args['cipher_key']
	            ,   err      = args['error'] || msg['error'] || function() {}
	            ,   post     = args['post'] || false
	            ,   store    = ('store_in_history' in args) ? args['store_in_history']: true
	            ,   jsonp    = jsonp_cb()
	            ,   add_msg  = 'push'
	            ,   params
	            ,   url;
	
	            if (args['prepend']) add_msg = 'unshift'
	
	            if (!channel)       return error('Missing Channel');
	            if (!PUBLISH_KEY)   return error('Missing Publish Key');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	
	            if (msg['getPubnubMessage']) {
	                msg = msg['getPubnubMessage']();
	            }
	
	            // If trying to send Object
	            msg = JSON['stringify'](encrypt(msg, cipher_key));
	
	            // Create URL
	            url = [
	                STD_ORIGIN, 'publish',
	                PUBLISH_KEY, SUBSCRIBE_KEY,
	                0, encode(channel),
	                jsonp, encode(msg)
	            ];
	
	            params = { 'uuid' : UUID, 'auth' : auth_key }
	
	            if (!store) params['store'] ="0"
	
	            if (USE_INSTANCEID) params['instanceid'] = INSTANCEID;
	
	            // Queue Message Send
	            PUB_QUEUE[add_msg]({
	                callback : jsonp,
	                timeout  : SECOND * 5,
	                url      : url,
	                data     : _get_url_params(params),
	                fail     : function(response){
	                    _invoke_error(response, err);
	                    publish(1);
	                },
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                    publish(1);
	                },
	                mode     : (post)?'POST':'GET'
	            });
	
	            // Send Message
	            publish();
	        },
	
	        /*
	            PUBNUB.unsubscribe({ channel : 'my_chat' });
	        */
	        'unsubscribe' : function(args, callback) {
	            var channel       = args['channel']
	            ,   channel_group = args['channel_group']
	            ,   auth_key      = args['auth_key']    || AUTH_KEY
	            ,   callback      = callback            || args['callback'] || function(){}
	            ,   err           = args['error']       || function(){};
	
	            TIMETOKEN   = 0;
	            SUB_RESTORE = 1;   // REVISIT !!!!
	
	            if (channel) {
	
	                // Prepare LeaveChannel(s)
	                var leave_c = map( (
	                    channel.join ? channel.join(',') : ''+channel
	                ).split(','), function(channel) {
	                    if (!CHANNELS[channel]) return;
	                    return channel;
	                } ).join(',');
	
	                // Prepare Channel(s)
	                channel = map( (
	                    channel.join ? channel.join(',') : ''+channel
	                ).split(','), function(channel) {
	                    if (!CHANNELS[channel]) return;
	                    return channel + ',' + channel + PRESENCE_SUFFIX;
	                } ).join(',');
	
	                // Iterate over Channels
	                each(channel.split(','), function(ch) {
	                    if (!ch) return;
	                    CHANNELS[ch] = 0;
	                    if (ch in STATE) delete STATE[ch];
	                } );
	
	                var CB_CALLED = true;
	                if (READY) {
	                    CB_CALLED = SELF['LEAVE'](leave_c, 0 , auth_key, callback, err);
	                }
	                if (!CB_CALLED) callback({action : "leave"});
	            }
	
	            if (channel_group) {
	
	                // Prepare channel group(s)
	                var leave_gc = map( (
	                    channel_group.join ? channel_group.join(',') : ''+channel_group
	                ).split(','), function(channel_group) {
	                    if (!CHANNEL_GROUPS[channel_group]) return;
	                    return channel_group;
	                } ).join(',');
	
	                // Prepare channel group(s)
	                channel_group = map( (
	                    channel_group.join ? channel_group.join(',') : ''+channel_group
	                ).split(','), function(channel_group) {
	                    if (!CHANNEL_GROUPS[channel_group]) return;
	                    return channel_group + ',' + channel_group + PRESENCE_SUFFIX;
	                } ).join(',');
	
	                // Iterate over channel groups
	                each( channel_group.split(','), function(chg) {
	                    if (!chg) return;
	                    CHANNEL_GROUPS[chg] = 0;
	                    if (chg in STATE) delete STATE[chg];
	                } );
	
	                var CB_CALLED = true;
	                if (READY) {
	                    CB_CALLED = SELF['LEAVE_GROUP'](leave_gc, 0 , auth_key, callback, err);
	                }
	                if (!CB_CALLED) callback({action : "leave"});
	            }
	
	            // Reset Connection if Count Less
	            CONNECT();
	        },
	
	        /*
	            PUBNUB.subscribe({
	                channel  : 'my_chat'
	                callback : function(message) { }
	            });
	        */
	        'subscribe' : function( args, callback ) {
	            var channel         = args['channel']
	            ,   channel_group   = args['channel_group']
	            ,   callback        = callback            || args['callback']
	            ,   callback        = callback            || args['message']
	            ,   connect         = args['connect']     || function(){}
	            ,   reconnect       = args['reconnect']   || function(){}
	            ,   disconnect      = args['disconnect']  || function(){}
	            ,   SUB_ERROR       = args['error']       || SUB_ERROR || function(){}
	            ,   idlecb          = args['idle']        || function(){}
	            ,   presence        = args['presence']    || 0
	            ,   noheresync      = args['noheresync']  || 0
	            ,   backfill        = args['backfill']    || 0
	            ,   timetoken       = args['timetoken']   || 0
	            ,   sub_timeout     = args['timeout']     || SUB_TIMEOUT
	            ,   windowing       = args['windowing']   || SUB_WINDOWING
	            ,   state           = args['state']
	            ,   heartbeat       = args['heartbeat'] || args['pnexpires']
	            ,   heartbeat_interval = args['heartbeat_interval']
	            ,   restore         = args['restore'] || SUB_RESTORE;
	
	            AUTH_KEY            = args['auth_key']    || AUTH_KEY;
	
	            // Restore Enabled?
	            SUB_RESTORE = restore;
	
	            // Always Reset the TT
	            TIMETOKEN = timetoken;
	
	            // Make sure we have a Channel
	            if (!channel && !channel_group) {
	                return error('Missing Channel');
	            }
	
	            if (!callback)      return error('Missing Callback');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	
	            if (heartbeat || heartbeat === 0 || heartbeat_interval || heartbeat_interval === 0) {
	                SELF['set_heartbeat'](heartbeat, heartbeat_interval);
	            }
	
	            // Setup Channel(s)
	            if (channel) {
	                each( (channel.join ? channel.join(',') : ''+channel).split(','),
	                function(channel) {
	                    var settings = CHANNELS[channel] || {};
	
	                    // Store Channel State
	                    CHANNELS[SUB_CHANNEL = channel] = {
	                        name         : channel,
	                        connected    : settings.connected,
	                        disconnected : settings.disconnected,
	                        subscribed   : 1,
	                        callback     : SUB_CALLBACK = callback,
	                        'cipher_key' : args['cipher_key'],
	                        connect      : connect,
	                        disconnect   : disconnect,
	                        reconnect    : reconnect
	                    };
	
	                    if (state) {
	                        if (channel in state) {
	                            STATE[channel] = state[channel];
	                        } else {
	                            STATE[channel] = state;
	                        }
	                    }
	
	                    // Presence Enabled?
	                    if (!presence) return;
	
	                    // Subscribe Presence Channel
	                    SELF['subscribe']({
	                        'channel'  : channel + PRESENCE_SUFFIX,
	                        'callback' : presence,
	                        'restore'  : restore
	                    });
	
	                    // Presence Subscribed?
	                    if (settings.subscribed) return;
	
	                    // See Who's Here Now?
	                    if (noheresync) return;
	                    SELF['here_now']({
	                        'channel'  : channel,
	                        'data'     : _get_url_params({ 'uuid' : UUID, 'auth' : AUTH_KEY }),
	                        'callback' : function(here) {
	                            each( 'uuids' in here ? here['uuids'] : [],
	                            function(uid) { presence( {
	                                'action'    : 'join',
	                                'uuid'      : uid,
	                                'timestamp' : Math.floor(rnow() / 1000),
	                                'occupancy' : here['occupancy'] || 1
	                            }, here, channel ); } );
	                        }
	                    });
	                } );
	            }
	
	            // Setup Channel Groups
	            if (channel_group) {
	                each( (channel_group.join ? channel_group.join(',') : ''+channel_group).split(','),
	                function(channel_group) {
	                    var settings = CHANNEL_GROUPS[channel_group] || {};
	
	                    CHANNEL_GROUPS[channel_group] = {
	                        name         : channel_group,
	                        connected    : settings.connected,
	                        disconnected : settings.disconnected,
	                        subscribed   : 1,
	                        callback     : SUB_CALLBACK = callback,
	                        'cipher_key' : args['cipher_key'],
	                        connect      : connect,
	                        disconnect   : disconnect,
	                        reconnect    : reconnect
	                    };
	
	                    // Presence Enabled?
	                    if (!presence) return;
	
	                    // Subscribe Presence Channel
	                    SELF['subscribe']({
	                        'channel_group'  : channel_group + PRESENCE_SUFFIX,
	                        'callback' : presence,
	                        'restore'  : restore,
	                        'auth_key' : AUTH_KEY
	                    });
	
	                    // Presence Subscribed?
	                    if (settings.subscribed) return;
	
	                    // See Who's Here Now?
	                    if (noheresync) return;
	                    SELF['here_now']({
	                        'channel_group'  : channel_group,
	                        'data'           : _get_url_params({ 'uuid' : UUID, 'auth' : AUTH_KEY }),
	                        'callback' : function(here) {
	                            each( 'uuids' in here ? here['uuids'] : [],
	                            function(uid) { presence( {
	                                'action'    : 'join',
	                                'uuid'      : uid,
	                                'timestamp' : Math.floor(rnow() / 1000),
	                                'occupancy' : here['occupancy'] || 1
	                            }, here, channel_group ); } );
	                        }
	                    });
	                } );
	            }
	
	
	            // Test Network Connection
	            function _test_connection(success) {
	                if (success) {
	                    // Begin Next Socket Connection
	                    timeout( CONNECT, windowing);
	                }
	                else {
	                    // New Origin on Failed Connection
	                    STD_ORIGIN = nextorigin( ORIGIN, 1 );
	                    SUB_ORIGIN = nextorigin( ORIGIN, 1 );
	
	                    // Re-test Connection
	                    timeout( function() {
	                        SELF['time'](_test_connection);
	                    }, SECOND );
	                }
	
	                // Disconnect & Reconnect
	                each_channel(function(channel){
	                    // Reconnect
	                    if (success && channel.disconnected) {
	                        channel.disconnected = 0;
	                        return channel.reconnect(channel.name);
	                    }
	
	                    // Disconnect
	                    if (!success && !channel.disconnected) {
	                        channel.disconnected = 1;
	                        channel.disconnect(channel.name);
	                    }
	                });
	                
	                // Disconnect & Reconnect for channel groups
	                each_channel_group(function(channel_group){
	                    // Reconnect
	                    if (success && channel_group.disconnected) {
	                        channel_group.disconnected = 0;
	                        return channel_group.reconnect(channel_group.name);
	                    }
	
	                    // Disconnect
	                    if (!success && !channel_group.disconnected) {
	                        channel_group.disconnected = 1;
	                        channel_group.disconnect(channel_group.name);
	                    }
	                });
	            }
	
	            // Evented Subscribe
	            function _connect() {
	                var jsonp           = jsonp_cb()
	                ,   channels        = generate_channel_list(CHANNELS).join(',')
	                ,   channel_groups  = generate_channel_group_list(CHANNEL_GROUPS).join(',');
	
	                // Stop Connection
	                if (!channels && !channel_groups) return;
	
	                if (!channels) channels = ',';
	
	                // Connect to PubNub Subscribe Servers
	                _reset_offline();
	
	                var data = _get_url_params({ 'uuid' : UUID, 'auth' : AUTH_KEY });
	
	                if (channel_groups) {
	                    data['channel-group'] = channel_groups;
	                }
	
	
	                var st = JSON.stringify(STATE);
	                if (st.length > 2) data['state'] = JSON.stringify(STATE);
	
	                if (PRESENCE_HB) data['heartbeat'] = PRESENCE_HB;
	
	                if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	                start_presence_heartbeat();
	                SUB_RECEIVER = xdr({
	                    timeout  : sub_timeout,
	                    callback : jsonp,
	                    fail     : function(response) {
	                        if (response && response['error'] && response['service']) {
	                            _invoke_error(response, SUB_ERROR);
	                            _test_connection(1);
	                        } else {
	                            SELF['time'](function(success){
	                                !success && ( _invoke_error(response, SUB_ERROR));
	                                _test_connection(success);
	                            });
	                        }
	                    },
	                    data     : _get_url_params(data),
	                    url      : [
	                        SUB_ORIGIN, 'subscribe',
	                        SUBSCRIBE_KEY, encode(channels),
	                        jsonp, TIMETOKEN
	                    ],
	                    success : function(messages) {
	
	                        // Check for Errors
	                        if (!messages || (
	                            typeof messages == 'object' &&
	                            'error' in messages         &&
	                            messages['error']
	                        )) {
	                            SUB_ERROR(messages['error']);
	                            return timeout( CONNECT, SECOND );
	                        }
	
	                        // User Idle Callback
	                        idlecb(messages[1]);
	
	                        // Restore Previous Connection Point if Needed
	                        TIMETOKEN = !TIMETOKEN               &&
	                                    SUB_RESTORE              &&
	                                    db['get'](SUBSCRIBE_KEY) || messages[1];
	
	                        /*
	                        // Connect
	                        each_channel_registry(function(registry){
	                            if (registry.connected) return;
	                            registry.connected = 1;
	                            registry.connect(channel.name);
	                        });
	                        */
	
	                        // Connect
	                        each_channel(function(channel){
	                            if (channel.connected) return;
	                            channel.connected = 1;
	                            channel.connect(channel.name);
	                        });
	
	                        // Connect for channel groups
	                        each_channel_group(function(channel_group){
	                            if (channel_group.connected) return;
	                            channel_group.connected = 1;
	                            channel_group.connect(channel_group.name);
	                        });
	
	                        if (RESUMED && !SUB_RESTORE) {
	                                TIMETOKEN = 0;
	                                RESUMED = false;
	                                // Update Saved Timetoken
	                                db['set']( SUBSCRIBE_KEY, 0 );
	                                timeout( _connect, windowing );
	                                return;
	                        }
	
	                        // Invoke Memory Catchup and Receive Up to 100
	                        // Previous Messages from the Queue.
	                        if (backfill) {
	                            TIMETOKEN = 10000;
	                            backfill  = 0;
	                        }
	
	                        // Update Saved Timetoken
	                        db['set']( SUBSCRIBE_KEY, messages[1] );
	
	                        // Route Channel <---> Callback for Message
	                        var next_callback = (function() {
	                            var channels = '';
	                            var channels2 = '';
	
	                            if (messages.length > 3) {
	                                channels  = messages[3];
	                                channels2 = messages[2];
	                            } else if (messages.length > 2) {
	                                channels = messages[2];
	                            } else {
	                                channels =  map(
	                                    generate_channel_list(CHANNELS), function(chan) { return map(
	                                        Array(messages[0].length)
	                                        .join(',').split(','),
	                                        function() { return chan; }
	                                    ) }).join(',')
	                            }
	
	                            var list  = channels.split(',');
	                            var list2 = (channels2)?channels2.split(','):[];
	
	                            return function() {
	                                var channel  = list.shift()||SUB_CHANNEL;
	                                var channel2 = list2.shift();
	
	                                var chobj = {};
	
	                                if (channel2) {
	                                    if (channel && channel.indexOf('-pnpres') >= 0 
	                                        && channel2.indexOf('-pnpres') < 0) {
	                                        channel2 += '-pnpres';
	                                    }
	                                    chobj = CHANNEL_GROUPS[channel2] || CHANNELS[channel2] || {'callback' : function(){}};
	                                } else {
	                                    chobj = CHANNELS[channel];
	                                }
	
	                                var r = [
	                                    chobj
	                                    .callback||SUB_CALLBACK,
	                                    channel.split(PRESENCE_SUFFIX)[0]
	                                ];
	                                channel2 && r.push(channel2.split(PRESENCE_SUFFIX)[0]);
	                                return r;
	                            };
	                        })();
	
	                        var latency = detect_latency(+messages[1]);
	                        each( messages[0], function(msg) {
	                            var next = next_callback();
	                            var decrypted_msg = decrypt(msg,
	                                (CHANNELS[next[1]])?CHANNELS[next[1]]['cipher_key']:null);
	                            next[0] && next[0]( decrypted_msg, messages, next[2] || next[1], latency, next[1]);
	                        });
	
	                        timeout( _connect, windowing );
	                    }
	                });
	            }
	
	            CONNECT = function() {
	                _reset_offline();
	                timeout( _connect, windowing );
	            };
	
	            // Reduce Status Flicker
	            if (!READY) return READY_BUFFER.push(CONNECT);
	
	            // Connect Now
	            CONNECT();
	        },
	
	        /*
	            PUBNUB.here_now({ channel : 'my_chat', callback : fun });
	        */
	        'here_now' : function( args, callback ) {
	            var callback = args['callback'] || callback
	            ,   debug    = args['debug']
	            ,   err      = args['error']    || function(){}
	            ,   auth_key = args['auth_key'] || AUTH_KEY
	            ,   channel  = args['channel']
	            ,   channel_group = args['channel_group']
	            ,   jsonp    = jsonp_cb()
	            ,   uuids    = ('uuids' in args) ? args['uuids'] : true
	            ,   state    = args['state']
	            ,   data     = { 'uuid' : UUID, 'auth' : auth_key };
	
	            if (!uuids) data['disable_uuids'] = 1;
	            if (state) data['state'] = 1;
	
	            // Make sure we have a Channel
	            if (!callback)      return error('Missing Callback');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	
	            var url = [
	                    STD_ORIGIN, 'v2', 'presence',
	                    'sub_key', SUBSCRIBE_KEY
	                ];
	
	            channel && url.push('channel') && url.push(encode(channel));
	
	            if (jsonp != '0') { data['callback'] = jsonp; }
	
	            if (channel_group) {
	                data['channel-group'] = channel_group;
	                !channel && url.push('channel') && url.push(','); 
	            }
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            xdr({
	                callback : jsonp,
	                data     : _get_url_params(data),
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                debug    : debug,
	                url      : url
	            });
	        },
	
	        /*
	            PUBNUB.current_channels_by_uuid({ channel : 'my_chat', callback : fun });
	        */
	        'where_now' : function( args, callback ) {
	            var callback = args['callback'] || callback
	            ,   err      = args['error']    || function(){}
	            ,   auth_key = args['auth_key'] || AUTH_KEY
	            ,   jsonp    = jsonp_cb()
	            ,   uuid     = args['uuid']     || UUID
	            ,   data     = { 'auth' : auth_key };
	
	            // Make sure we have a Channel
	            if (!callback)      return error('Missing Callback');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	
	            if (jsonp != '0') { data['callback'] = jsonp; }
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            xdr({
	                callback : jsonp,
	                data     : _get_url_params(data),
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : [
	                    STD_ORIGIN, 'v2', 'presence',
	                    'sub_key', SUBSCRIBE_KEY,
	                    'uuid', encode(uuid)
	                ]
	            });
	        },
	
	        'state' : function(args, callback) {
	            var callback = args['callback'] || callback || function(r) {}
	            ,   err      = args['error']    || function(){}
	            ,   auth_key = args['auth_key'] || AUTH_KEY
	            ,   jsonp    = jsonp_cb()
	            ,   state    = args['state']
	            ,   uuid     = args['uuid'] || UUID
	            ,   channel  = args['channel']
	            ,   channel_group = args['channel_group']
	            ,   url
	            ,   data     = _get_url_params({ 'auth' : auth_key });
	
	            // Make sure we have a Channel
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	            if (!uuid) return error('Missing UUID');
	            if (!channel && !channel_group) return error('Missing Channel');
	
	            if (jsonp != '0') { data['callback'] = jsonp; }
	
	            if (typeof channel != 'undefined'
	                && CHANNELS[channel] && CHANNELS[channel].subscribed ) {
	                if (state) STATE[channel] = state;
	            }
	
	            if (typeof channel_group != 'undefined'
	                && CHANNEL_GROUPS[channel_group]
	                && CHANNEL_GROUPS[channel_group].subscribed
	                ) {
	                if (state) STATE[channel_group] = state;
	                data['channel-group'] = channel_group;
	
	                if (!channel) {
	                    channel = ',';
	                }
	            }
	
	            data['state'] = JSON.stringify(state);
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            if (state) {
	                url      = [
	                    STD_ORIGIN, 'v2', 'presence',
	                    'sub-key', SUBSCRIBE_KEY,
	                    'channel', channel,
	                    'uuid', uuid, 'data'
	                ]
	            } else {
	                url      = [
	                    STD_ORIGIN, 'v2', 'presence',
	                    'sub-key', SUBSCRIBE_KEY,
	                    'channel', channel,
	                    'uuid', encode(uuid)
	                ]
	            }
	
	            xdr({
	                callback : jsonp,
	                data     : _get_url_params(data),
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : url
	
	            });
	
	        },
	
	        /*
	            PUBNUB.grant({
	                channel  : 'my_chat',
	                callback : fun,
	                error    : fun,
	                ttl      : 24 * 60, // Minutes
	                read     : true,
	                write    : true,
	                auth_key : '3y8uiajdklytowsj'
	            });
	        */
	        'grant' : function( args, callback ) {
	            var callback        = args['callback'] || callback
	            ,   err             = args['error']    || function(){}
	            ,   channel         = args['channel']  || args['channels']
	            ,   channel_group   = args['channel_group']
	            ,   jsonp           = jsonp_cb()
	            ,   ttl             = args['ttl']
	            ,   r               = (args['read'] )?"1":"0"
	            ,   w               = (args['write'])?"1":"0"
	            ,   m               = (args['manage'])?"1":"0"
	            ,   auth_key        = args['auth_key'] || args['auth_keys'];
	
	            if (!callback)      return error('Missing Callback');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	            if (!PUBLISH_KEY)   return error('Missing Publish Key');
	            if (!SECRET_KEY)    return error('Missing Secret Key');
	
	            var timestamp  = Math.floor(new Date().getTime() / 1000)
	            ,   sign_input = SUBSCRIBE_KEY + "\n" + PUBLISH_KEY + "\n"
	                    + "grant" + "\n";
	
	            var data = {
	                'w'         : w,
	                'r'         : r,
	                'timestamp' : timestamp
	            };
	            if (args['manage']) {
	                data['m'] = m;
	            }
	            if (isArray(channel)) {
	                channel = channel['join'](',');
	            }
	            if (isArray(auth_key)) {
	                auth_key = auth_key['join'](',');
	            }
	            if (typeof channel != 'undefined' && channel != null && channel.length > 0) data['channel'] = channel;
	            if (typeof channel_group != 'undefined' && channel_group != null && channel_group.length > 0) {
	                data['channel-group'] = channel_group;
	            }
	            if (jsonp != '0') { data['callback'] = jsonp; }
	            if (ttl || ttl === 0) data['ttl'] = ttl;
	
	            if (auth_key) data['auth'] = auth_key;
	
	            data = _get_url_params(data)
	
	            if (!auth_key) delete data['auth'];
	
	            sign_input += _get_pam_sign_input_from_params(data);
	
	            var signature = hmac_SHA256( sign_input, SECRET_KEY );
	
	            signature = signature.replace( /\+/g, "-" );
	            signature = signature.replace( /\//g, "_" );
	
	            data['signature'] = signature;
	
	            xdr({
	                callback : jsonp,
	                data     : data,
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : [
	                    STD_ORIGIN, 'v1', 'auth', 'grant' ,
	                    'sub-key', SUBSCRIBE_KEY
	                ]
	            });
	        },
	
	        /*
	         PUBNUB.mobile_gw_provision ({
	         device_id: 'A655FBA9931AB',
	         op       : 'add' | 'remove',
	         gw_type  : 'apns' | 'gcm',
	         channel  : 'my_chat',
	         callback : fun,
	         error    : fun,
	         });
	         */
	
	        'mobile_gw_provision' : function( args ) {
	
	            var callback = args['callback'] || function(){}
	                ,   auth_key       = args['auth_key'] || AUTH_KEY
	                ,   err            = args['error'] || function() {}
	                ,   jsonp          = jsonp_cb()
	                ,   channel        = args['channel']
	                ,   op             = args['op']
	                ,   gw_type        = args['gw_type']
	                ,   device_id      = args['device_id']
	                ,   params
	                ,   url;
	
	            if (!device_id)     return error('Missing Device ID (device_id)');
	            if (!gw_type)       return error('Missing GW Type (gw_type: gcm or apns)');
	            if (!op)            return error('Missing GW Operation (op: add or remove)');
	            if (!channel)       return error('Missing gw destination Channel (channel)');
	            if (!PUBLISH_KEY)   return error('Missing Publish Key');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	
	            // Create URL
	            url = [
	                STD_ORIGIN, 'v1/push/sub-key',
	                SUBSCRIBE_KEY, 'devices', device_id
	            ];
	
	            params = { 'uuid' : UUID, 'auth' : auth_key, 'type': gw_type};
	
	            if (op == "add") {
	                params['add'] = channel;
	            } else if (op == "remove") {
	                params['remove'] = channel;
	            }
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            xdr({
	                callback : jsonp,
	                data     : params,
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : url
	            });
	
	        },
	
	        /*
	            PUBNUB.audit({
	                channel  : 'my_chat',
	                callback : fun,
	                error    : fun,
	                read     : true,
	                write    : true,
	                auth_key : '3y8uiajdklytowsj'
	            });
	        */
	        'audit' : function( args, callback ) {
	            var callback        = args['callback'] || callback
	            ,   err             = args['error']    || function(){}
	            ,   channel         = args['channel']
	            ,   channel_group   = args['channel_group']
	            ,   auth_key        = args['auth_key']
	            ,   jsonp           = jsonp_cb();
	
	            // Make sure we have a Channel
	            if (!callback)      return error('Missing Callback');
	            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
	            if (!PUBLISH_KEY)   return error('Missing Publish Key');
	            if (!SECRET_KEY)    return error('Missing Secret Key');
	
	            var timestamp  = Math.floor(new Date().getTime() / 1000)
	            ,   sign_input = SUBSCRIBE_KEY + "\n"
	                + PUBLISH_KEY + "\n"
	                + "audit" + "\n";
	
	            var data = {'timestamp' : timestamp };
	            if (jsonp != '0') { data['callback'] = jsonp; }
	            if (typeof channel != 'undefined' && channel != null && channel.length > 0) data['channel'] = channel;
	            if (typeof channel_group != 'undefined' && channel_group != null && channel_group.length > 0) {
	                data['channel-group'] = channel_group;
	            }
	            if (auth_key) data['auth']    = auth_key;
	
	            data = _get_url_params(data);
	
	            if (!auth_key) delete data['auth'];
	
	            sign_input += _get_pam_sign_input_from_params(data);
	
	            var signature = hmac_SHA256( sign_input, SECRET_KEY );
	
	            signature = signature.replace( /\+/g, "-" );
	            signature = signature.replace( /\//g, "_" );
	
	            data['signature'] = signature;
	            xdr({
	                callback : jsonp,
	                data     : data,
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) {
	                    _invoke_error(response, err);
	                },
	                url      : [
	                    STD_ORIGIN, 'v1', 'auth', 'audit' ,
	                    'sub-key', SUBSCRIBE_KEY
	                ]
	            });
	        },
	
	        /*
	            PUBNUB.revoke({
	                channel  : 'my_chat',
	                callback : fun,
	                error    : fun,
	                auth_key : '3y8uiajdklytowsj'
	            });
	        */
	        'revoke' : function( args, callback ) {
	            args['read']  = false;
	            args['write'] = false;
	            SELF['grant']( args, callback );
	        },
	        'set_uuid' : function(uuid) {
	            UUID = uuid;
	            CONNECT();
	        },
	        'get_uuid' : function() {
	            return UUID;
	        },
	        'isArray'  : function(arg) {
	            return isArray(arg);
	        },
	        'get_subscibed_channels' : function() {
	            return generate_channel_list(CHANNELS, true);
	        },
	        'presence_heartbeat' : function(args) {
	            var callback = args['callback'] || function() {}
	            var err      = args['error']    || function() {}
	            var jsonp    = jsonp_cb();
	            var data     = { 'uuid' : UUID, 'auth' : AUTH_KEY };
	
	            var st = JSON['stringify'](STATE);
	            if (st.length > 2) data['state'] = JSON['stringify'](STATE);
	
	            if (PRESENCE_HB > 0 && PRESENCE_HB < 320) data['heartbeat'] = PRESENCE_HB;
	
	            if (jsonp != '0') { data['callback'] = jsonp; }
	
	            var channels        = encode(generate_channel_list(CHANNELS, true)['join'](','));
	            var channel_groups  = generate_channel_group_list(CHANNEL_GROUPS, true)['join'](',');
	
	            if (!channels) channels = ',';
	            if (channel_groups) data['channel-group'] = channel_groups;
	
	            if (USE_INSTANCEID) data['instanceid'] = INSTANCEID;
	
	            xdr({
	                callback : jsonp,
	                data     : _get_url_params(data),
	                timeout  : SECOND * 5,
	                url      : [
	                    STD_ORIGIN, 'v2', 'presence',
	                    'sub-key', SUBSCRIBE_KEY,
	                    'channel' , channels,
	                    'heartbeat'
	                ],
	                success  : function(response) {
	                    _invoke_callback(response, callback, err);
	                },
	                fail     : function(response) { _invoke_error(response, err); }
	            });
	        },
	        'stop_timers': function () {
	            clearTimeout(_poll_timer);
	            clearTimeout(_poll_timer2);
	            clearTimeout(PRESENCE_HB_TIMEOUT);
	        },
	        'shutdown': function () {
	            SELF['stop_timers']();
	            shutdown && shutdown();
	        },
	
	        // Expose PUBNUB Functions
	        'xdr'           : xdr,
	        'ready'         : ready,
	        'db'            : db,
	        'uuid'          : generate_uuid,
	        'map'           : map,
	        'each'          : each,
	        'each-channel'  : each_channel,
	        'grep'          : grep,
	        'offline'       : function(){ _reset_offline(
	            1, { "message" : "Offline. Please check your network settings." })
	        },
	        'supplant'      : supplant,
	        'now'           : rnow,
	        'unique'        : unique,
	        'updater'       : updater
	    };
	
	    function _poll_online() {
	        _is_online() || _reset_offline( 1, {
	            "error" : "Offline. Please check your network settings. "
	        });
	        _poll_timer && clearTimeout(_poll_timer);
	        _poll_timer = timeout( _poll_online, SECOND );
	    }
	
	    function _poll_online2() {
	        if (!TIME_CHECK) return;
	        SELF['time'](function(success){
	            detect_time_detla( function(){}, success );
	            success || _reset_offline( 1, {
	                "error" : "Heartbeat failed to connect to Pubnub Servers." +
	                    "Please check your network settings."
	                });
	            _poll_timer2 && clearTimeout(_poll_timer2);
	            _poll_timer2 = timeout( _poll_online2, KEEPALIVE );
	        });
	    }
	
	    function _reset_offline(err, msg) {
	        SUB_RECEIVER && SUB_RECEIVER(err, msg);
	        SUB_RECEIVER = null;
	
	        clearTimeout(_poll_timer);
	        clearTimeout(_poll_timer2);
	    }
	    
	    if (!UUID) UUID = SELF['uuid']();
	    if (!INSTANCEID) INSTANCEID = SELF['uuid']();
	    db['set']( SUBSCRIBE_KEY + 'uuid', UUID );
	
	    _poll_timer  = timeout( _poll_online,  SECOND    );
	    _poll_timer2 = timeout( _poll_online2, KEEPALIVE );
	    PRESENCE_HB_TIMEOUT = timeout(
	        start_presence_heartbeat,
	        ( PRESENCE_HB_INTERVAL - 3 ) * SECOND
	    );
	
	    // Detect Age of Message
	    function detect_latency(tt) {
	        var adjusted_time = rnow() - TIME_DRIFT;
	        return adjusted_time - tt / 10000;
	    }
	
	    detect_time_detla();
	    function detect_time_detla( cb, time ) {
	        var stime = rnow();
	
	        time && calculate(time) || SELF['time'](calculate);
	
	        function calculate(time) {
	            if (!time) return;
	            var ptime   = time / 10000
	            ,   latency = (rnow() - stime) / 2;
	            TIME_DRIFT = rnow() - (ptime + latency);
	            cb && cb(TIME_DRIFT);
	        }
	    }
	
	    return SELF;
	}
	function crypto_obj() {
	
	    function SHA256(s) {
	        return CryptoJS['SHA256'](s)['toString'](CryptoJS['enc']['Hex']);
	    }
	
	    var iv = "0123456789012345";
	
	    var allowedKeyEncodings = ['hex', 'utf8', 'base64', 'binary'];
	    var allowedKeyLengths = [128, 256];
	    var allowedModes = ['ecb', 'cbc'];
	
	    var defaultOptions = {
	        'encryptKey': true,
	        'keyEncoding': 'utf8',
	        'keyLength': 256,
	        'mode': 'cbc'
	    };
	
	    function parse_options(options) {
	
	        // Defaults
	        options = options || {};
	        if (!options['hasOwnProperty']('encryptKey')) options['encryptKey'] = defaultOptions['encryptKey'];
	        if (!options['hasOwnProperty']('keyEncoding')) options['keyEncoding'] = defaultOptions['keyEncoding'];
	        if (!options['hasOwnProperty']('keyLength')) options['keyLength'] = defaultOptions['keyLength'];
	        if (!options['hasOwnProperty']('mode')) options['mode'] = defaultOptions['mode'];
	
	        // Validation
	        if (allowedKeyEncodings['indexOf'](options['keyEncoding']['toLowerCase']()) == -1) options['keyEncoding'] = defaultOptions['keyEncoding'];
	        if (allowedKeyLengths['indexOf'](parseInt(options['keyLength'], 10)) == -1) options['keyLength'] = defaultOptions['keyLength'];
	        if (allowedModes['indexOf'](options['mode']['toLowerCase']()) == -1) options['mode'] = defaultOptions['mode'];
	
	        return options;
	
	    }
	
	    function decode_key(key, options) {
	        if (options['keyEncoding'] == 'base64') {
	            return CryptoJS['enc']['Base64']['parse'](key);
	        } else if (options['keyEncoding'] == 'hex') {
	            return CryptoJS['enc']['Hex']['parse'](key);
	        } else {
	            return key;
	        }
	    }
	
	    function get_padded_key(key, options) {
	        key = decode_key(key, options);
	        if (options['encryptKey']) {
	            return CryptoJS['enc']['Utf8']['parse'](SHA256(key)['slice'](0, 32));
	        } else {
	            return key;
	        }
	    }
	
	    function get_mode(options) {
	        if (options['mode'] == 'ecb') {
	            return CryptoJS['mode']['ECB'];
	        } else {
	            return CryptoJS['mode']['CBC'];
	        }
	    }
	
	    function get_iv(options) {
	        return (options['mode'] == 'cbc') ? CryptoJS['enc']['Utf8']['parse'](iv) : null;
	    }
	
	    return {
	
	        'encrypt': function(data, key, options) {
	            if (!key) return data;
	            options = parse_options(options);
	            var iv = get_iv(options);
	            var mode = get_mode(options);
	            var cipher_key = get_padded_key(key, options);
	            var hex_message = JSON['stringify'](data);
	            var encryptedHexArray = CryptoJS['AES']['encrypt'](hex_message, cipher_key, {'iv': iv, 'mode': mode})['ciphertext'];
	            var base_64_encrypted = encryptedHexArray['toString'](CryptoJS['enc']['Base64']);
	            return base_64_encrypted || data;
	        },
	
	        'decrypt': function(data, key, options) {
	            if (!key) return data;
	            options = parse_options(options);
	            var iv = get_iv(options);
	            var mode = get_mode(options);
	            var cipher_key = get_padded_key(key, options);
	            try {
	                var binary_enc = CryptoJS['enc']['Base64']['parse'](data);
	                var json_plain = CryptoJS['AES']['decrypt']({'ciphertext': binary_enc}, cipher_key, {'iv': iv, 'mode': mode})['toString'](CryptoJS['enc']['Utf8']);
	                var plaintext = JSON['parse'](json_plain);
	                return plaintext;
	            }
	            catch (e) {
	                return undefined;
	            }
	        }
	    };
	}
	/**
	 * UTIL LOCALS
	 */
	
	var SWF             = 'https://pubnub.a.ssl.fastly.net/pubnub.swf'
	,   ASYNC           = 'async'
	,   UA              = navigator.userAgent
	,   PNSDK           = 'PubNub-JS-' + 'Web' + '/' + '3.7.16'
	,   XORIGN          = UA.indexOf('MSIE 6') == -1;
	
	/**
	 * CONSOLE COMPATIBILITY
	 */
	window.console || (window.console=window.console||{});
	console.log    || (
	    console.log   =
	    console.error =
	    ((window.opera||{}).postError||function(){})
	);
	
	/**
	 * LOCAL STORAGE OR COOKIE
	 */
	var db = (function(){
	    var store = {};
	    var ls = false;
	    try {
	        ls = window['localStorage'];
	    } catch (e) { }
	    var cookieGet = function(key) {
	        if (document.cookie.indexOf(key) == -1) return null;
	        return ((document.cookie||'').match(
	            RegExp(key+'=([^;]+)')
	        )||[])[1] || null;
	    };
	    var cookieSet = function( key, value ) {
	        document.cookie = key + '=' + value +
	            '; expires=Thu, 1 Aug 2030 20:00:00 UTC; path=/';
	    };
	    var cookieTest = (function() {
	        try {
	            cookieSet('pnctest', '1');
	            return cookieGet('pnctest') === '1';
	        } catch (e) {
	            return false;
	        }
	    }());
	    return {
	        'get' : function(key) {
	            try {
	                if (ls) return ls.getItem(key);
	                if (cookieTest) return cookieGet(key);
	                return store[key];
	            } catch(e) {
	                return store[key];
	            }
	        },
	        'set' : function( key, value ) {
	            try {
	                if (ls) return ls.setItem( key, value ) && 0;
	                if (cookieTest) cookieSet( key, value );
	                store[key] = value;
	            } catch(e) {
	                store[key] = value;
	            }
	        }
	    };
	})();
	
	function get_hmac_SHA256(data,key) {
	    var hash = CryptoJS['HmacSHA256'](data, key);
	    return hash.toString(CryptoJS['enc']['Base64']);
	}
	
	/**
	 * $
	 * =
	 * var div = $('divid');
	 */
	function $(id) { return document.getElementById(id) }
	
	/**
	 * ERROR
	 * =====
	 * error('message');
	 */
	function error(message) { console['error'](message) }
	
	/**
	 * SEARCH
	 * ======
	 * var elements = search('a div span');
	 */
	function search( elements, start) {
	    var list = [];
	    each( elements.split(/\s+/), function(el) {
	        each( (start || document).getElementsByTagName(el), function(node) {
	            list.push(node);
	        } );
	    });
	    return list;
	}
	
	/**
	 * BIND
	 * ====
	 * bind( 'keydown', search('a')[0], function(element) {
	 *     ...
	 * } );
	 */
	function bind( type, el, fun ) {
	    each( type.split(','), function(etype) {
	        var rapfun = function(e) {
	            if (!e) e = window.event;
	            if (!fun(e)) {
	                e.cancelBubble = true;
	                e.preventDefault  && e.preventDefault();
	                e.stopPropagation && e.stopPropagation();
	            }
	        };
	
	        if ( el.addEventListener ) el.addEventListener( etype, rapfun, false );
	        else if ( el.attachEvent ) el.attachEvent( 'on' + etype, rapfun );
	        else  el[ 'on' + etype ] = rapfun;
	    } );
	}
	
	/**
	 * UNBIND
	 * ======
	 * unbind( 'keydown', search('a')[0] );
	 */
	function unbind( type, el, fun ) {
	    if ( el.removeEventListener ) el.removeEventListener( type, false );
	    else if ( el.detachEvent ) el.detachEvent( 'on' + type, false );
	    else  el[ 'on' + type ] = null;
	}
	
	/**
	 * HEAD
	 * ====
	 * head().appendChild(elm);
	 */
	function head() { return search('head')[0] }
	
	/**
	 * ATTR
	 * ====
	 * var attribute = attr( node, 'attribute' );
	 */
	function attr( node, attribute, value ) {
	    if (value) node.setAttribute( attribute, value );
	    else return node && node.getAttribute && node.getAttribute(attribute);
	}
	
	/**
	 * CSS
	 * ===
	 * var obj = create('div');
	 */
	function css( element, styles ) {
	    for (var style in styles) if (styles.hasOwnProperty(style))
	        try {element.style[style] = styles[style] + (
	            '|width|height|top|left|'.indexOf(style) > 0 &&
	            typeof styles[style] == 'number'
	            ? 'px' : ''
	        )}catch(e){}
	}
	
	/**
	 * CREATE
	 * ======
	 * var obj = create('div');
	 */
	function create(element) { return document.createElement(element) }
	
	
	/**
	 * jsonp_cb
	 * ========
	 * var callback = jsonp_cb();
	 */
	function jsonp_cb() { return XORIGN || FDomainRequest() ? 0 : unique() }
	
	
	
	/**
	 * EVENTS
	 * ======
	 * PUBNUB.events.bind( 'you-stepped-on-flower', function(message) {
	 *     // Do Stuff with message
	 * } );
	 *
	 * PUBNUB.events.fire( 'you-stepped-on-flower', "message-data" );
	 * PUBNUB.events.fire( 'you-stepped-on-flower', {message:"data"} );
	 * PUBNUB.events.fire( 'you-stepped-on-flower', [1,2,3] );
	 *
	 */
	var events = {
	    'list'   : {},
	    'unbind' : function( name ) { events.list[name] = [] },
	    'bind'   : function( name, fun ) {
	        (events.list[name] = events.list[name] || []).push(fun);
	    },
	    'fire' : function( name, data ) {
	        each(
	            events.list[name] || [],
	            function(fun) { fun(data) }
	        );
	    }
	};
	
	/**
	 * XDR Cross Domain Request
	 * ========================
	 *  xdr({
	 *     url     : ['http://www.blah.com/url'],
	 *     success : function(response) {},
	 *     fail    : function() {}
	 *  });
	 */
	function xdr( setup ) {
	    if (XORIGN || FDomainRequest()) return ajax(setup);
	
	    var script    = create('script')
	    ,   callback  = setup.callback
	    ,   id        = unique()
	    ,   finished  = 0
	    ,   xhrtme    = setup.timeout || DEF_TIMEOUT
	    ,   timer     = timeout( function(){done(1, {"message" : "timeout"})}, xhrtme )
	    ,   fail      = setup.fail    || function(){}
	    ,   data      = setup.data    || {}
	    ,   success   = setup.success || function(){}
	    ,   append    = function() { head().appendChild(script) }
	    ,   done      = function( failed, response ) {
	            if (finished) return;
	            finished = 1;
	
	            script.onerror = null;
	            clearTimeout(timer);
	
	            (failed || !response) || success(response);
	
	            timeout( function() {
	                failed && fail();
	                var s = $(id)
	                ,   p = s && s.parentNode;
	                p && p.removeChild(s);
	            }, SECOND );
	        };
	
	    window[callback] = function(response) {
	        done( 0, response );
	    };
	
	    if (!setup.blocking) script[ASYNC] = ASYNC;
	
	    script.onerror = function() { done(1) };
	    script.src     = build_url( setup.url, data );
	
	    attr( script, 'id', id );
	
	    append();
	    return done;
	}
	
	/**
	 * CORS XHR Request
	 * ================
	 *  xdr({
	 *     url     : ['http://www.blah.com/url'],
	 *     success : function(response) {},
	 *     fail    : function() {}
	 *  });
	 */
	function ajax( setup ) {
	    var xhr, response
	    ,   finished = function() {
	            if (loaded) return;
	            loaded = 1;
	
	            clearTimeout(timer);
	
	            try       { response = JSON['parse'](xhr.responseText); }
	            catch (r) { return done(1); }
	
	            complete = 1;
	            success(response);
	        }
	    ,   complete = 0
	    ,   loaded   = 0
	    ,   xhrtme   = setup.timeout || DEF_TIMEOUT
	    ,   timer    = timeout( function(){done(1, {"message" : "timeout"})}, xhrtme )
	    ,   fail     = setup.fail    || function(){}
	    ,   data     = setup.data    || {}
	    ,   success  = setup.success || function(){}
	    ,   async    = !(setup.blocking)
	    ,   done     = function(failed,response) {
	            if (complete) return;
	            complete = 1;
	
	            clearTimeout(timer);
	
	            if (xhr) {
	                xhr.onerror = xhr.onload = null;
	                xhr.abort && xhr.abort();
	                xhr = null;
	            }
	
	            failed && fail(response);
	        };
	
	    // Send
	    try {
	        xhr = FDomainRequest()      ||
	              window.XDomainRequest &&
	              new XDomainRequest()  ||
	              new XMLHttpRequest();
	
	        xhr.onerror = xhr.onabort   = function(e){ done(
	            1, e || (xhr && xhr.responseText) || { "error" : "Network Connection Error"}
	        ) };
	        xhr.onload  = xhr.onloadend = finished;
	        xhr.onreadystatechange = function() {
	            if (xhr && xhr.readyState == 4) {
	                switch(xhr.status) {
	                    case 200:
	                        break;
	                    default:
	                        try {
	                            response = JSON['parse'](xhr.responseText);
	                            done(1,response);
	                        }
	                        catch (r) { return done(1, {status : xhr.status, payload : null, message : xhr.responseText}); }
	                        return;
	                }
	            }
	        }
	
	        var url = build_url(setup.url,data);
	
	        xhr.open( 'GET', url, async );
	        if (async) xhr.timeout = xhrtme;
	        xhr.send();
	    }
	    catch(eee) {
	        done(0);
	        XORIGN = 0;
	        return xdr(setup);
	    }
	
	    // Return 'done'
	    return done;
	}
	
	// Test Connection State
	function _is_online() {
	    if (!('onLine' in navigator)) return 1;
	    try       { return navigator['onLine'] }
	    catch (e) { return true }
	}
	
	
	function sendBeacon(url) {
	    if (!('sendBeacon' in navigator)) return false;
	
	    return navigator['sendBeacon'](url);
	}
	
	/* =-====================================================================-= */
	/* =-====================================================================-= */
	/* =-=========================     PUBNUB     ===========================-= */
	/* =-====================================================================-= */
	/* =-====================================================================-= */
	
	var PDIV          = $('pubnub') || 0
	,   CREATE_PUBNUB = function(setup) {
	
	    // Force JSONP if requested from user.
	    if (setup['jsonp'])  XORIGN = 0;
	    else                 XORIGN = UA.indexOf('MSIE 6') == -1;
	
	    var SUBSCRIBE_KEY = setup['subscribe_key'] || ''
	    ,   KEEPALIVE     = (+setup['keepalive']   || DEF_KEEPALIVE)   * SECOND
	    ,   UUID          = setup['uuid'] || db['get'](SUBSCRIBE_KEY+'uuid')||'';
	
	    var leave_on_unload = setup['leave_on_unload'] || 0;
	
	    setup['xdr']        = xdr;
	    setup['db']         = db;
	    setup['error']      = setup['error'] || error;
	    setup['_is_online'] = _is_online;
	    setup['jsonp_cb']   = jsonp_cb;
	    setup['hmac_SHA256']= get_hmac_SHA256;
	    setup['crypto_obj'] = crypto_obj();
	    setup['sendBeacon'] = sendBeacon;
	    setup['params']     = { 'pnsdk' : PNSDK }
	
	    var SELF = function(setup) {
	        return CREATE_PUBNUB(setup);
	    };
	
	    var PN = PN_API(setup);
	
	    for (var prop in PN) {
	        if (PN.hasOwnProperty(prop)) {
	            SELF[prop] = PN[prop];
	        }
	    }
	    SELF['css']         = css;
	    SELF['$']           = $;
	    SELF['create']      = create;
	    SELF['bind']        = bind;
	    SELF['head']        = head;
	    SELF['search']      = search;
	    SELF['attr']        = attr;
	    SELF['events']      = events;
	    SELF['init']        = SELF;
	    SELF['secure']      = SELF;
	    SELF['crypto_obj']  = crypto_obj(); // export to instance
	
	
	    // Add Leave Functions
	    bind( 'beforeunload', window, function() {
	        if (leave_on_unload) SELF['each-channel'](function(ch){ SELF['LEAVE']( ch.name, 0 ) });
	        return true;
	    } );
	
	    // Return without Testing
	    if (setup['notest']) return SELF;
	
	    bind( 'offline', window,   SELF['offline'] );
	    bind( 'offline', document, SELF['offline'] );
	
	    // Return PUBNUB Socket Object
	    return SELF;
	};
	CREATE_PUBNUB['init']   = CREATE_PUBNUB;
	CREATE_PUBNUB['secure'] = CREATE_PUBNUB;
	CREATE_PUBNUB['crypto_obj'] = crypto_obj(); // export to constructor
	
	// Bind for PUBNUB Readiness to Subscribe
	if (document.readyState === 'complete') {
	    timeout( ready, 0 );
	}
	else {
	    bind( 'load', window, function(){ timeout( ready, 0 ) } );
	}
	
	var pdiv = PDIV || {};
	
	// CREATE A PUBNUB GLOBAL OBJECT
	PUBNUB = CREATE_PUBNUB({
	    'notest'        : 1,
	    'publish_key'   : attr( pdiv, 'pub-key' ),
	    'subscribe_key' : attr( pdiv, 'sub-key' ),
	    'ssl'           : !document.location.href.indexOf('https') ||
	                      attr( pdiv, 'ssl' ) == 'on',
	    'origin'        : attr( pdiv, 'origin' ),
	    'uuid'          : attr( pdiv, 'uuid' )
	});
	
	// jQuery Interface
	window['jQuery'] && (window['jQuery']['PUBNUB'] = CREATE_PUBNUB);
	
	// For Modern JS + Testling.js - http://testling.com/
	typeof(module) !== 'undefined' && (module['exports'] = PUBNUB) && ready();
	
	var pubnubs = $('pubnubs') || 0;
	
	// LEAVE NOW IF NO PDIV.
	if (!PDIV) return;
	
	// PUBNUB Flash Socket
	css( PDIV, { 'position' : 'absolute', 'top' : -SECOND } );
	
	if ('opera' in window || attr( PDIV, 'flash' )) PDIV['innerHTML'] =
	    '<object id=pubnubs data='  + SWF +
	    '><param name=movie value=' + SWF +
	    '><param name=allowscriptaccess value=always></object>';
	
	// Create Interface for Opera Flash
	PUBNUB['rdx'] = function( id, data ) {
	    if (!data) return FDomainRequest[id]['onerror']();
	    FDomainRequest[id]['responseText'] = unescape(data);
	    FDomainRequest[id]['onload']();
	};
	
	function FDomainRequest() {
	    if (!pubnubs || !pubnubs['get']) return 0;
	
	    var fdomainrequest = {
	        'id'    : FDomainRequest['id']++,
	        'send'  : function() {},
	        'abort' : function() { fdomainrequest['id'] = {} },
	        'open'  : function( method, url ) {
	            FDomainRequest[fdomainrequest['id']] = fdomainrequest;
	            pubnubs['get']( fdomainrequest['id'], url );
	        }
	    };
	
	    return fdomainrequest;
	}
	FDomainRequest['id'] = SECOND;
	
	})();
	(function(){
	
	// ---------------------------------------------------------------------------
	// WEBSOCKET INTERFACE
	// ---------------------------------------------------------------------------
	var WS = PUBNUB['ws'] = function( url, protocols ) {
	    if (!(this instanceof WS)) return new WS( url, protocols );
	
	    var self     = this
	    ,   url      = self.url      = url || ''
	    ,   protocol = self.protocol = protocols || 'Sec-WebSocket-Protocol'
	    ,   bits     = url.split('/')
	    ,   setup    = {
	         'ssl'           : bits[0] === 'wss:'
	        ,'origin'        : bits[2]
	        ,'publish_key'   : bits[3]
	        ,'subscribe_key' : bits[4]
	        ,'channel'       : bits[5]
	    };
	
	    // READY STATES
	    self['CONNECTING'] = 0; // The connection is not yet open.
	    self['OPEN']       = 1; // The connection is open and ready to communicate.
	    self['CLOSING']    = 2; // The connection is in the process of closing.
	    self['CLOSED']     = 3; // The connection is closed or couldn't be opened.
	
	    // CLOSE STATES
	    self['CLOSE_NORMAL']         = 1000; // Normal Intended Close; completed.
	    self['CLOSE_GOING_AWAY']     = 1001; // Closed Unexpecttedly.
	    self['CLOSE_PROTOCOL_ERROR'] = 1002; // Server: Not Supported.
	    self['CLOSE_UNSUPPORTED']    = 1003; // Server: Unsupported Protocol.
	    self['CLOSE_TOO_LARGE']      = 1004; // Server: Too Much Data.
	    self['CLOSE_NO_STATUS']      = 1005; // Server: No reason.
	    self['CLOSE_ABNORMAL']       = 1006; // Abnormal Disconnect.
	
	    // Events Default
	    self['onclose']   = self['onerror'] =
	    self['onmessage'] = self['onopen']  =
	    self['onsend']    =  function(){};
	
	    // Attributes
	    self['binaryType']     = '';
	    self['extensions']     = '';
	    self['bufferedAmount'] = 0;
	    self['trasnmitting']   = false;
	    self['buffer']         = [];
	    self['readyState']     = self['CONNECTING'];
	
	    // Close if no setup.
	    if (!url) {
	        self['readyState'] = self['CLOSED'];
	        self['onclose']({
	            'code'     : self['CLOSE_ABNORMAL'],
	            'reason'   : 'Missing URL',
	            'wasClean' : true
	        });
	        return self;
	    }
	
	    // PubNub WebSocket Emulation
	    self.pubnub       = PUBNUB['init'](setup);
	    self.pubnub.setup = setup;
	    self.setup        = setup;
	
	    self.pubnub['subscribe']({
	        'restore'    : false,
	        'channel'    : setup['channel'],
	        'disconnect' : self['onerror'],
	        'reconnect'  : self['onopen'],
	        'error'      : function() {
	            self['onclose']({
	                'code'     : self['CLOSE_ABNORMAL'],
	                'reason'   : 'Missing URL',
	                'wasClean' : false
	            });
	        },
	        'callback'   : function(message) {
	            self['onmessage']({ 'data' : message });
	        },
	        'connect'    : function() {
	            self['readyState'] = self['OPEN'];
	            self['onopen']();
	        }
	    });
	};
	
	// ---------------------------------------------------------------------------
	// WEBSOCKET SEND
	// ---------------------------------------------------------------------------
	WS.prototype.send = function(data) {
	    var self = this;
	    self.pubnub['publish']({
	        'channel'  : self.pubnub.setup['channel'],
	        'message'  : data,
	        'callback' : function(response) {
	            self['onsend']({ 'data' : response });
	        }
	    });
	};
	
	// ---------------------------------------------------------------------------
	// WEBSOCKET CLOSE
	// ---------------------------------------------------------------------------
	WS.prototype.close = function() {
	    var self = this;
	    self.pubnub['unsubscribe']({ 'channel' : self.pubnub.setup['channel'] });
	    self['readyState'] = self['CLOSED'];
	    self['onclose']({});
	};
	
	})();
	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	var CryptoJS=CryptoJS||function(h,s){var f={},g=f.lib={},q=function(){},m=g.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
	r=g.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
	32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=f.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
	2),16)<<24-4*(b%8);return new r.init(d,c/2)}},n=l.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(d,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},
	u=g.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);c.sigBytes-=b}return new r.init(g,b)},clone:function(){var a=m.clone.call(this);
	a._data=this._data.clone();return a},_minBufferSize:0});g.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new t.HMAC.init(a,
	d)).finalize(c)}}});var t=f.algo={};return f}(Math);
	
	// SHA256
	(function(h){for(var s=CryptoJS,f=s.lib,g=f.WordArray,q=f.Hasher,f=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],f=f.SHA256=q.extend({_doReset:function(){this._hash=new g.init(m.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],g=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
	c[d+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&g^f&g);q=n;n=m;m=h;h=j+k|0;j=g;g=f;f=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+g|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
	d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(f);s.HmacSHA256=q._createHmacHelper(f)})(Math);
	
	// HMAC SHA256
	(function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(f,g){f=this._hasher=new f.init;"string"==typeof g&&(g=s.parse(g));var h=f.blockSize,m=4*h;g.sigBytes>m&&(g=f.finalize(g));g.clamp();for(var r=this._oKey=g.clone(),l=this._iKey=g.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
	this._hasher;f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();
	
	// Base64
	(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
	l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
	
	// BlockCipher
	(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
	_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
	f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
	m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
	E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
	4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
	(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
	l)}})();
	
	// Cipher
	CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
	finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
	c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
	e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
	this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
	1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
	decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
	b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
	
	// AES
	(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
	16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
	8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
	d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();
	
	// Mode ECB
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();
	
	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });
	
	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });
	
	    return ECB;
	}());// Moved to hmac-sha-256.js
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))
	
	/***/ },
	/* 12 */
	/***/ function(module, exports) {
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cache = function () {
	    function Cache(storage, prefix) {
	        _classCallCheck(this, Cache);
	
	        this.setPrefix(prefix);
	        this._storage = storage;
	    }
	
	    Cache.prototype.setPrefix = function setPrefix(prefix) {
	        this._prefix = prefix || Cache.defaultPrefix;
	        return this;
	    };
	
	    Cache.prototype.setItem = function setItem(key, data) {
	        this._storage[this._prefixKey(key)] = JSON.stringify(data);
	        return this;
	    };
	
	    Cache.prototype.removeItem = function removeItem(key) {
	        delete this._storage[this._prefixKey(key)];
	        return this;
	    };
	
	    Cache.prototype.getItem = function getItem(key) {
	        var item = this._storage[this._prefixKey(key)];
	        if (!item) return null;
	        return JSON.parse(item);
	    };
	
	    Cache.prototype.clean = function clean() {
	
	        for (var key in this._storage) {
	
	            if (!this._storage.hasOwnProperty(key)) continue;
	
	            if (key.indexOf(this._prefix) === 0) {
	                delete this._storage[key];
	            }
	        }
	
	        return this;
	    };
	
	    Cache.prototype._prefixKey = function _prefixKey(key) {
	        return this._prefix + key;
	    };
	
	    return Cache;
	}();
	
	Cache.defaultPrefix = 'rc-';
	exports.default = Cache;
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Observable = function () {
	    function Observable() {
	        _classCallCheck(this, Observable);
	
	        this.off();
	    }
	
	    Observable.prototype.hasListeners = function hasListeners(event) {
	        return event in this._listeners;
	    };
	
	    Observable.prototype.on = function on(events, callback) {
	        var _this = this;
	
	        if (typeof events == 'string') events = [events];
	        if (!events) throw new Error('No events to subscribe to');
	        if (typeof callback !== 'function') throw new Error('Callback must be a function');
	
	        events.forEach(function (event) {
	
	            if (!_this.hasListeners(event)) _this._listeners[event] = [];
	
	            _this._listeners[event].push(callback);
	        });
	
	        return this;
	    };
	
	    Observable.prototype.emit = function emit(event) {
	        var _this2 = this;
	
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }
	
	        var result = null;
	
	        if (!this.hasListeners(event)) return null;
	
	        this._listeners[event].some(function (callback) {
	
	            result = callback.apply(_this2, args);
	            return result === false;
	        });
	
	        return result;
	    };
	
	    Observable.prototype.off = function off(event, callback) {
	        var _this3 = this;
	
	        if (!event) {
	
	            this._listeners = {};
	        } else {
	
	            if (!callback) {
	
	                delete this._listeners[event];
	            } else {
	
	                if (!this.hasListeners(event)) return this;
	
	                this._listeners[event].forEach(function (cb, i) {
	
	                    if (cb === callback) delete _this3._listeners[event][i];
	                });
	            }
	        }
	
	        return this;
	    };
	
	    return Observable;
	}();
	
	exports.default = Observable;
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _Externals = __webpack_require__(4);
	
	var _Utils = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Queue = function () {
	    function Queue(cache, cacheId) {
	        _classCallCheck(this, Queue);
	
	        this._cache = cache;
	        this._cacheId = cacheId;
	        this._promise = null;
	    }
	
	    Queue.prototype.isPaused = function isPaused() {
	
	        var time = this._cache.getItem(this._cacheId);
	
	        return !!time && Date.now() - parseInt(time) < Queue._releaseTimeout;
	    };
	
	    Queue.prototype.pause = function pause() {
	        this._cache.setItem(this._cacheId, Date.now());
	        return this;
	    };
	
	    Queue.prototype.resume = function resume() {
	        this._cache.removeItem(this._cacheId);
	        return this;
	    };
	
	    Queue.prototype.poll = function poll() {
	        var _this = this;
	
	        if (this._promise) return this._promise;
	
	        this._promise = new _Externals.Promise(function (resolve, reject) {
	
	            (0, _Utils.poll)(function (next) {
	
	                if (_this.isPaused()) return next();
	
	                _this._promise = null;
	
	                _this.resume(); // this is actually not needed but why not
	
	                resolve(null);
	            }, Queue._pollInterval);
	        });
	
	        return this._promise;
	    };
	
	    return Queue;
	}();
	
	Queue._pollInterval = 250;
	Queue._releaseTimeout = 5000;
	exports.default = Queue;
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
	"use strict";
	
	exports.__esModule = true;
	exports.findHeaderName = findHeaderName;
	
	var _Externals = __webpack_require__(4);
	
	var _Utils = __webpack_require__(3);
	
	var _Observable2 = __webpack_require__(13);
	
	var _Observable3 = _interopRequireDefault(_Observable2);
	
	var _ApiResponse = __webpack_require__(16);
	
	var _ApiResponse2 = _interopRequireDefault(_ApiResponse);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Client = function (_Observable) {
	    _inherits(Client, _Observable);
	
	    function Client() {
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Client);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Observable.call.apply(_Observable, [this].concat(args))), _this), _this.events = {
	            beforeRequest: 'beforeRequest',
	            requestSuccess: 'requestSuccess',
	            requestError: 'requestError'
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    /**
	     * @param {Request} request
	     * @return {Promise<ApiResponse>}
	     */
	
	    Client.prototype.sendRequest = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request) {
	            var apiResponse;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            apiResponse = new _ApiResponse2.default(request);
	                            _context.prev = 1;
	
	
	                            //TODO Stop request if listeners return false
	                            this.emit(this.events.beforeRequest, apiResponse);
	
	                            _context.next = 5;
	                            return this._loadResponse(request);
	
	                        case 5:
	                            apiResponse._response = _context.sent;
	                            _context.next = 8;
	                            return apiResponse._init();
	
	                        case 8:
	                            if (apiResponse.ok()) {
	                                _context.next = 10;
	                                break;
	                            }
	
	                            throw new Error('Response has unsuccessful status');
	
	                        case 10:
	
	                            this.emit(this.events.requestSuccess, apiResponse);
	
	                            return _context.abrupt("return", apiResponse);
	
	                        case 14:
	                            _context.prev = 14;
	                            _context.t0 = _context["catch"](1);
	
	
	                            if (!_context.t0.apiResponse) _context.t0 = this.makeError(_context.t0, apiResponse);
	
	                            this.emit(this.events.requestError, _context.t0);
	
	                            throw _context.t0;
	
	                        case 19:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this, [[1, 14]]);
	        }));
	
	        function sendRequest(_x) {
	            return ref.apply(this, arguments);
	        }
	
	        return sendRequest;
	    }();
	
	    /**
	     * @param {Request} request
	     * @return {Promise<Response>}
	     * @private
	     */
	
	
	    Client.prototype._loadResponse = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(request) {
	            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            _context2.next = 2;
	                            return _Externals.fetch.call(null, request);
	
	                        case 2:
	                            return _context2.abrupt("return", _context2.sent);
	
	                        case 3:
	                        case "end":
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, this);
	        }));
	
	        function _loadResponse(_x2) {
	            return ref.apply(this, arguments);
	        }
	
	        return _loadResponse;
	    }();
	
	    /**
	     * Wraps the JS Error object with transaction information
	     * @param {Error|IApiError} e
	     * @param {ApiResponse} apiResponse
	     * @return {IApiError}
	     */
	
	
	    Client.prototype.makeError = function makeError(e, apiResponse) {
	
	        // Wrap only if regular error
	        if (!e.hasOwnProperty('apiResponse') && !e.hasOwnProperty('originalMessage')) {
	
	            e.apiResponse = apiResponse;
	            e.originalMessage = e.message;
	            e.message = apiResponse && apiResponse.error(true) || e.originalMessage;
	        }
	
	        return e;
	    };
	
	    /**
	     *
	     * @param {object} init
	     * @param {object} [init.url]
	     * @param {object} [init.body]
	     * @param {string} [init.method]
	     * @param {object} [init.query]
	     * @param {object} [init.headers]
	     * @return {Request}
	     */
	
	
	    Client.prototype.createRequest = function createRequest(init) {
	
	        init = init || {};
	        init.headers = init.headers || {};
	
	        // Sanity checks
	        if (!init.url) throw new Error('Url is not defined');
	        if (!init.method) init.method = 'GET';
	        if (init.method && Client._allowedMethods.indexOf(init.method.toUpperCase()) < 0) {
	            throw new Error('Method has wrong value: ' + init.method);
	        }
	
	        // Defaults
	        init.credentials = init.credentials || 'include';
	        init.mode = init.mode || 'cors';
	
	        // Append Query String
	        if (init.query) {
	            init.url = init.url + (init.url.indexOf('?') > -1 ? '&' : '?') + (0, _Utils.queryStringify)(init.query);
	        }
	
	        if (!findHeaderName('Accept', init.headers)) {
	            init.headers['Accept'] = _ApiResponse2.default._jsonContentType;
	        }
	
	        // Serialize body
	        if ((0, _Utils.isPlainObject)(init.body) || !init.body) {
	
	            var contentTypeHeaderName = findHeaderName(_ApiResponse2.default._contentType, init.headers);
	
	            if (!contentTypeHeaderName) {
	                contentTypeHeaderName = _ApiResponse2.default._contentType;
	                init.headers[contentTypeHeaderName] = _ApiResponse2.default._jsonContentType;
	            }
	
	            var contentType = init.headers[contentTypeHeaderName];
	
	            // Assign a new encoded body
	            if (contentType.indexOf(_ApiResponse2.default._jsonContentType) > -1) {
	                init.body = JSON.stringify(init.body);
	            } else if (contentType.indexOf(_ApiResponse2.default._urlencodedContentType) > -1) {
	                init.body = (0, _Utils.queryStringify)(init.body);
	            }
	        }
	
	        // Create a request with encoded body
	        var req = new _Externals.Request(init.url, init);
	
	        // Keep the original body accessible directly (for mocks)
	        req.originalBody = init.body;
	
	        return req;
	    };
	
	    return Client;
	}(_Observable3.default);
	
	Client._allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
	exports.default = Client;
	function findHeaderName(name, headers) {
	    name = name.toLowerCase();
	    return Object.keys(headers).reduce(function (res, key) {
	        if (res) return res;
	        if (name == key.toLowerCase()) return key;
	        return res;
	    }, null);
	}
	
	/**
	 * @name IApiError
	 * @property {string} stack
	 * @property {string} originalMessage
	 * @property {ApiResponse} apiResponse
	 */
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _Externals = __webpack_require__(4);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _Externals.Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _Externals.Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ApiResponse = function () {
	
	    /**
	     * @param {Request} request
	     * @param {Response} response
	     * @param {string} responseText
	     */
	
	    function ApiResponse(request, response, responseText) {
	        _classCallCheck(this, ApiResponse);
	
	        /** @type {Request} */
	        this._request = request;
	
	        /** @type {Response} */
	        this._response = response;
	
	        this._text = responseText;
	        this._json = null;
	        this._multipart = [];
	    }
	
	    ApiResponse.prototype._init = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            if (!(this._isMultipart() || this._isJson())) {
	                                _context.next = 4;
	                                break;
	                            }
	
	                            _context.next = 3;
	                            return this.response().text();
	
	                        case 3:
	                            this._text = _context.sent;
	
	                        case 4:
	                            return _context.abrupt('return', this);
	
	                        case 5:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	
	        function _init() {
	            return ref.apply(this, arguments);
	        }
	
	        return _init;
	    }();
	
	    /**
	     * @return {Response}
	     */
	
	
	    ApiResponse.prototype.response = function response() {
	        return this._response;
	    };
	
	    /**
	     * @return {Request}
	     */
	
	
	    ApiResponse.prototype.request = function request() {
	        return this._request;
	    };
	
	    /**
	     * @return {boolean}
	     */
	
	
	    ApiResponse.prototype.ok = function ok() {
	        return this._response && this._response.ok;
	    };
	
	    /**
	     * @return {string}
	     */
	
	
	    ApiResponse.prototype.text = function text() {
	        if (!this._isJson() && !this._isMultipart()) throw new Error('Response is not text');
	        return this._text;
	    };
	
	    /**
	     * @return {object}
	     */
	
	
	    ApiResponse.prototype.json = function json() {
	        if (!this._isJson()) throw new Error('Response is not JSON');
	        if (!this._json) {
	            this._json = this._text ? JSON.parse(this._text) : null;
	        }
	        return this._json;
	    };
	
	    /**
	     * @param [skipOKCheck]
	     * @return {string}
	     */
	
	
	    ApiResponse.prototype.error = function error(skipOKCheck) {
	
	        if (this.ok() && !skipOKCheck) return null;
	
	        var message = (this._response && this._response.status ? this._response.status + ' ' : '') + (this._response && this._response.statusText ? this._response.statusText : '');
	
	        try {
	
	            if (this.json().message) message = this.json().message;
	            if (this.json().error_description) message = this.json().error_description;
	            if (this.json().description) message = this.json().description;
	        } catch (e) {}
	
	        return message;
	    };
	
	    /**
	     * @return {ApiResponse[]}
	     */
	
	
	    ApiResponse.prototype.multipart = function multipart() {
	
	        if (!this._isMultipart()) throw new Error('Response is not multipart');
	
	        if (!this._multipart.length) {
	
	            // Step 1. Split multipart response
	
	            var text = this.text();
	
	            if (!text) throw new Error('No response body');
	
	            var boundary = this._getContentType().match(/boundary=([^;]+)/i)[1];
	
	            if (!boundary) throw new Error('Cannot find boundary');
	
	            var parts = text.toString().split(ApiResponse._boundarySeparator + boundary);
	
	            if (parts[0].trim() === '') parts.shift();
	            if (parts[parts.length - 1].trim() == ApiResponse._boundarySeparator) parts.pop();
	
	            if (parts.length < 1) throw new Error('No parts in body');
	
	            // Step 2. Parse status info
	
	            var statusInfo = ApiResponse.create(parts.shift(), this._response.status, this._response.statusText).json();
	
	            // Step 3. Parse all other parts
	
	            this._multipart = parts.map(function (part, i) {
	
	                var status = statusInfo.response[i].status;
	
	                return ApiResponse.create(part, status);
	            });
	        }
	
	        return this._multipart;
	    };
	
	    ApiResponse.prototype._isContentType = function _isContentType(contentType) {
	        return this._getContentType().indexOf(contentType) > -1;
	    };
	
	    ApiResponse.prototype._getContentType = function _getContentType() {
	        return this._response.headers.get(ApiResponse._contentType) || '';
	    };
	
	    ApiResponse.prototype._isMultipart = function _isMultipart() {
	        return this._isContentType(ApiResponse._multipartContentType);
	    };
	
	    ApiResponse.prototype._isUrlEncoded = function _isUrlEncoded() {
	        return this._isContentType(ApiResponse._urlencodedContentType);
	    };
	
	    ApiResponse.prototype._isJson = function _isJson() {
	        return this._isContentType(ApiResponse._jsonContentType);
	    };
	
	    /**
	     * Method is used to create ApiResponse object from string parts of multipart/mixed response
	     * @param {string} [text]
	     * @param {number} [status]
	     * @param {string} [statusText]
	     * @return {ApiResponse}
	     */
	
	
	    ApiResponse.create = function create(text, status, statusText) {
	
	        text = text || '';
	        status = status || 200;
	        statusText = statusText || 'OK';
	
	        text = text.replace(/\r/g, '');
	
	        var headers = new _Externals.Headers(),
	            headersAndBody = text.split(ApiResponse._bodySeparator),
	            headersText = headersAndBody.length > 1 ? headersAndBody.shift() : '';
	
	        text = headersAndBody.length > 0 ? headersAndBody.join(ApiResponse._bodySeparator) : null;
	
	        (headersText || '').split('\n').forEach(function (header) {
	
	            var split = header.trim().split(ApiResponse._headerSeparator),
	                key = split.shift().trim(),
	                value = split.join(ApiResponse._headerSeparator).trim();
	
	            if (key) headers.append(key, value);
	        });
	
	        return new ApiResponse(null, new _Externals.Response(text ? text : null, {
	            headers: headers,
	            status: status,
	            statusText: statusText
	        }), text);
	    };
	
	    return ApiResponse;
	}();
	
	ApiResponse._contentType = 'Content-Type';
	ApiResponse._jsonContentType = 'application/json';
	ApiResponse._multipartContentType = 'multipart/mixed';
	ApiResponse._urlencodedContentType = 'application/x-www-form-urlencoded';
	ApiResponse._headerSeparator = ':';
	ApiResponse._bodySeparator = '\n\n';
	ApiResponse._boundarySeparator = '--';
	exports.default = ApiResponse;
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _Registry = __webpack_require__(18);
	
	var _Registry2 = _interopRequireDefault(_Registry);
	
	var _Client = __webpack_require__(15);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Client = function (_HttpClient) {
	    _inherits(Client, _HttpClient);
	
	    function Client() {
	        _classCallCheck(this, Client);
	
	        var _this = _possibleConstructorReturn(this, _HttpClient.call(this));
	
	        _this._registry = new _Registry2.default();
	        return _this;
	    }
	
	    Client.prototype.registry = function registry() {
	        return this._registry;
	    };
	
	    Client.prototype._loadResponse = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request) {
	            var mock;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            mock = this._registry.find(request);
	                            _context.next = 3;
	                            return mock.getResponse(request);
	
	                        case 3:
	                            return _context.abrupt('return', _context.sent);
	
	                        case 4:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	
	        function _loadResponse(_x) {
	            return ref.apply(this, arguments);
	        }
	
	        return _loadResponse;
	    }();
	
	    return Client;
	}(_Client2.default);
	
	exports.default = Client;
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _Mock = __webpack_require__(19);
	
	var _Mock2 = _interopRequireDefault(_Mock);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Registry = function () {
	    function Registry() {
	        _classCallCheck(this, Registry);
	
	        this._mocks = [];
	    }
	
	    Registry.prototype.add = function add(mock) {
	        this._mocks.push(mock);
	        return this;
	    };
	
	    Registry.prototype.clear = function clear() {
	        this._mocks = [];
	        return this;
	    };
	
	    Registry.prototype.find = function find(request) {
	
	        //console.log('Registry is looking for', request);
	
	        var mock = this._mocks.shift();
	
	        if (!mock) throw new Error('No mock in registry for request ' + request.method + ' ' + request.url);
	
	        if (!mock.test(request)) throw new Error('Wrong request ' + request.method + ' ' + request.url + ' for expected mock ' + mock.method() + ' ' + mock.path());
	
	        return mock;
	    };
	
	    Registry.prototype.apiCall = function apiCall(method, path, response, status, statusText) {
	
	        this.add(new _Mock2.default(method, path, response, status, statusText));
	
	        return this;
	    };
	
	    Registry.prototype.authentication = function authentication() {
	
	        this.apiCall('POST', '/restapi/oauth/token', {
	            'access_token': 'ACCESS_TOKEN',
	            'token_type': 'bearer',
	            'expires_in': 3600,
	            'refresh_token': 'REFRESH_TOKEN',
	            'refresh_token_expires_in': 60480,
	            'scope': 'SMS RCM Foo Boo',
	            'expireTime': new Date().getTime() + 3600000
	        });
	
	        return this;
	    };
	
	    Registry.prototype.logout = function logout() {
	
	        this.apiCall('POST', '/restapi/oauth/revoke', {});
	
	        return this;
	    };
	
	    Registry.prototype.presenceLoad = function presenceLoad(id) {
	
	        this.apiCall('GET', '/restapi/v1.0/account/~/extension/' + id + '/presence', {
	            "uri": "https://platform.ringcentral.com/restapi/v1.0/account/123/extension/" + id + "/presence",
	            "extension": {
	                "uri": "https://platform.ringcentral.com/restapi/v1.0/account/123/extension/" + id,
	                "id": id,
	                "extensionNumber": "101"
	            },
	            "activeCalls": [],
	            "presenceStatus": "Available",
	            "telephonyStatus": "Ringing",
	            "userStatus": "Available",
	            "dndStatus": "TakeAllCalls",
	            "extensionId": id
	        });
	
	        return this;
	    };
	
	    Registry.prototype.subscribeGeneric = function subscribeGeneric(expiresIn) {
	
	        expiresIn = expiresIn || 15 * 60 * 60;
	
	        var date = new Date();
	
	        this.apiCall('POST', '/restapi/v1.0/subscription', {
	            'eventFilters': ['/restapi/v1.0/account/~/extension/~/presence'],
	            'expirationTime': new Date(date.getTime() + expiresIn * 1000).toISOString(),
	            'expiresIn': expiresIn,
	            'deliveryMode': {
	                'transportType': 'PubNub',
	                'encryption': false,
	                'address': '123_foo',
	                'subscriberKey': 'sub-c-foo',
	                'secretKey': 'sec-c-bar'
	            },
	            'id': 'foo-bar-baz',
	            'creationTime': date.toISOString(),
	            'status': 'Active',
	            'uri': 'https://platform.ringcentral.com/restapi/v1.0/subscription/foo-bar-baz'
	        });
	
	        return this;
	    };
	
	    Registry.prototype.subscribeOnPresence = function subscribeOnPresence(id, detailed) {
	
	        id = id || '1';
	
	        var date = new Date();
	
	        this.apiCall('POST', '/restapi/v1.0/subscription', {
	            'eventFilters': ['/restapi/v1.0/account/~/extension/' + id + '/presence' + (detailed ? '?detailedTelephonyState=true' : '')],
	            'expirationTime': new Date(date.getTime() + 15 * 60 * 60 * 1000).toISOString(),
	            'deliveryMode': {
	                'transportType': 'PubNub',
	                'encryption': true,
	                'address': '123_foo',
	                'subscriberKey': 'sub-c-foo',
	                'secretKey': 'sec-c-bar',
	                'encryptionAlgorithm': 'AES',
	                'encryptionKey': 'VQwb6EVNcQPBhE/JgFZ2zw=='
	            },
	            'creationTime': date.toISOString(),
	            'id': 'foo-bar-baz',
	            'status': 'Active',
	            'uri': 'https://platform.ringcentral.com/restapi/v1.0/subscription/foo-bar-baz'
	        });
	
	        return this;
	    };
	
	    Registry.prototype.tokenRefresh = function tokenRefresh(failure) {
	
	        if (!failure) {
	
	            this.apiCall('POST', '/restapi/oauth/token', {
	                'access_token': 'ACCESS_TOKEN_FROM_REFRESH',
	                'token_type': 'bearer',
	                'expires_in': 3600,
	                'refresh_token': 'REFRESH_TOKEN_FROM_REFRESH',
	                'refresh_token_expires_in': 60480,
	                'scope': 'SMS RCM Foo Boo'
	            });
	        } else {
	
	            this.apiCall('POST', '/restapi/oauth/token', {
	                'message': 'Wrong token',
	                'error_description': 'Wrong token',
	                'description': 'Wrong token'
	            }, 400);
	        }
	
	        return this;
	    };
	
	    return Registry;
	}();
	
	exports.default = Registry;
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _Externals = __webpack_require__(4);
	
	var _ApiResponse = __webpack_require__(16);
	
	var _ApiResponse2 = _interopRequireDefault(_ApiResponse);
	
	var _Utils = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _Externals.Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _Externals.Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mock = function () {
	    function Mock(method, path, json, status, statusText, delay) {
	        _classCallCheck(this, Mock);
	
	        this._method = method.toUpperCase();
	        this._path = path;
	        this._json = json || {};
	        this._delay = delay || 10;
	        this._status = status || 200;
	        this._statusText = statusText || 'OK';
	    }
	
	    Mock.prototype.path = function path() {
	        return this._path;
	    };
	
	    Mock.prototype.method = function method() {
	        return this._method;
	    };
	
	    Mock.prototype.test = function test(request) {
	
	        return request.url.indexOf(this._path) > -1 && request.method.toUpperCase() == this._method;
	    };
	
	    Mock.prototype.getResponse = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request) {
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.next = 2;
	                            return (0, _Utils.delay)(this._delay);
	
	                        case 2:
	                            return _context.abrupt('return', this.createResponse(this._json));
	
	                        case 3:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	
	        function getResponse(_x) {
	            return ref.apply(this, arguments);
	        }
	
	        return getResponse;
	    }();
	
	    Mock.prototype.createResponse = function createResponse(json, init) {
	
	        init = init || {};
	
	        init.status = init.status || this._status;
	        init.statusText = init.statusText || this._statusText;
	
	        var str = JSON.stringify(json),
	            res = new _Externals.Response(str, init);
	
	        res.headers.set(_ApiResponse2.default._contentType, _ApiResponse2.default._jsonContentType);
	
	        return res;
	    };
	
	    return Mock;
	}();
	
	exports.default = Mock;
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
	"use strict";
	
	exports.__esModule = true;
	
	var _Externals = __webpack_require__(4);
	
	var _Observable2 = __webpack_require__(13);
	
	var _Observable3 = _interopRequireDefault(_Observable2);
	
	var _Queue = __webpack_require__(14);
	
	var _Queue2 = _interopRequireDefault(_Queue);
	
	var _Auth = __webpack_require__(21);
	
	var _Auth2 = _interopRequireDefault(_Auth);
	
	var _Utils = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _Externals.Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _Externals.Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Platform = function (_Observable) {
	    _inherits(Platform, _Observable);
	
	    // 10 hours
	
	    function Platform(client, cache, server, appKey, appSecret, appName, appVersion, sdkVersion) {
	        _classCallCheck(this, Platform);
	
	        var _this = _possibleConstructorReturn(this, _Observable.call(this));
	
	        _this.events = {
	            beforeLogin: 'beforeLogin',
	            loginSuccess: 'loginSuccess',
	            loginError: 'loginError',
	            beforeRefresh: 'beforeRefresh',
	            refreshSuccess: 'refreshSuccess',
	            refreshError: 'refreshError',
	            beforeLogout: 'beforeLogout',
	            logoutSuccess: 'logoutSuccess',
	            logoutError: 'logoutError'
	        };
	
	
	        _this._server = server;
	        _this._appKey = appKey;
	        _this._appSecret = appSecret;
	
	        /** @type {Cache} */
	        _this._cache = cache;
	
	        /** @type {Client} */
	        _this._client = client;
	
	        _this._queue = new _Queue2.default(_this._cache, Platform._cacheId + '-refresh');
	
	        _this._auth = new _Auth2.default(_this._cache, Platform._cacheId);
	
	        _this._userAgent = (appName ? appName + (appVersion ? '/' + appVersion : '') + ' ' : '') + 'RCJSSDK/' + sdkVersion;
	
	        return _this;
	    }
	
	    /**
	     * @return {Auth}
	     */
	    // 1 week
	
	
	    Platform.prototype.auth = function auth() {
	        return this._auth;
	    };
	
	    /**
	     * @return {Client}
	     */
	
	
	    Platform.prototype.client = function client() {
	        return this._client;
	    };
	
	    /**
	     * @param {string} path
	     * @param {object} [options]
	     * @param {boolean} [options.addServer]
	     * @param {string} [options.addMethod]
	     * @param {boolean} [options.addToken]
	     * @return {string}
	     */
	
	
	    Platform.prototype.createUrl = function createUrl(path, options) {
	
	        path = path || '';
	        options = options || {};
	
	        var builtUrl = '',
	            hasHttp = path.indexOf('http://') != -1 || path.indexOf('https://') != -1;
	
	        if (options.addServer && !hasHttp) builtUrl += this._server;
	
	        if (path.indexOf(Platform._urlPrefix) == -1 && !hasHttp) builtUrl += Platform._urlPrefix + '/' + Platform._apiVersion;
	
	        builtUrl += path;
	
	        if (options.addMethod || options.addToken) builtUrl += path.indexOf('?') > -1 ? '&' : '?';
	
	        if (options.addMethod) builtUrl += '_method=' + options.addMethod;
	        if (options.addToken) builtUrl += (options.addMethod ? '&' : '') + 'access_token=' + this._auth.accessToken();
	
	        return builtUrl;
	    };
	
	    /**
	     * @param {string} options.redirectUri
	     * @param {string} options.state
	     * @param {string} options.brandId
	     * @param {string} options.display
	     * @param {string} options.prompt
	     * @param {object} [options]
	     * @return {string}
	     */
	
	
	    Platform.prototype.authUrl = function authUrl(options) {
	
	        options = options || {};
	
	        return this.createUrl(Platform._authorizeEndpoint + '?' + (0, _Utils.queryStringify)({
	            'response_type': 'code',
	            'redirect_uri': options.redirectUri || '',
	            'client_id': this._appKey,
	            'state': options.state || '',
	            'brand_id': options.brandId || '',
	            'display': options.display || '',
	            'prompt': options.prompt || ''
	        }), { addServer: true });
	    };
	
	    /**
	     * @param {string} url
	     * @return {Object}
	     */
	
	
	    Platform.prototype.parseAuthRedirectUrl = function parseAuthRedirectUrl(url) {
	
	        var qs = (0, _Utils.parseQueryString)(url.split('?').reverse()[0]),
	            error = qs.error_description || qs.error;
	
	        if (error) {
	            var e = new Error(error);
	            e.error = qs.error;
	            throw e;
	        }
	
	        return qs;
	    };
	
	    /**
	     * Convenience method to handle 3-legged OAuth
	     *
	     * Attention! This is an experimental method and it's signature and behavior may change without notice.
	     *
	     * @experimental
	     * @param {number} [options.width]
	     * @param {number} [options.height]
	     * @param {object} [options.login] additional options for login()
	     * @param {string} [options.origin]
	     * @param {string} [options.property] name of window.postMessage's event data property
	     * @param {string} [options.target] target for window.open()
	     * @param {string} options.url
	     * @return {Promise}
	     */
	
	
	    Platform.prototype.authWindow = function authWindow(options) {
	        var _this2 = this;
	
	        return new _Externals.Promise(function (resolve, reject) {
	
	            if (!(0, _Utils.isBrowser)()) throw new Error('This method can be used only in browser');
	
	            if (!options.url) throw new Error('Missing mandatory URL parameter');
	
	            options = options || {};
	            options.url = options.url || 400;
	            options.width = options.width || 400;
	            options.height = options.height || 600;
	            options.origin = options.origin || window.location.origin;
	            options.property = options.property || 'RCAuthorizationCode';
	            options.target = options.target || '_blank';
	
	            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	            var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	
	            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	
	            var left = width / 2 - options.width / 2 + dualScreenLeft;
	            var top = height / 2 - options.height / 2 + dualScreenTop;
	            var win = window.open(options.url, '_blank', options.target == '_blank' ? 'scrollbars=yes, status=yes, width=' + options.width + ', height=' + options.height + ', left=' + left + ', top=' + top : '');
	
	            if (window.focus) win.focus();
	
	            var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
	            var eventRemoveMethod = eventMethod == 'addEventListener' ? 'removeEventListener' : 'detachEvent';
	            var messageEvent = eventMethod == 'addEventListener' ? 'message' : 'onmessage';
	
	            var eventListener = function eventListener(e) {
	
	                if (e.origin != options.origin) return;
	                if (!e.data || !e.data[options.property]) return; // keep waiting
	
	                win.close();
	                window[eventRemoveMethod](messageEvent, eventListener);
	
	                try {
	
	                    var loginOptions = _this2.parseAuthRedirectUrl(e.data[options.property]);
	
	                    if (!loginOptions.code) throw new Error('No authorization code');
	
	                    resolve(loginOptions);
	                } catch (e) {
	                    reject(e);
	                }
	            };
	
	            window[eventMethod](messageEvent, eventListener, false);
	        });
	    };
	
	    /**
	     * @return {Promise<boolean>}
	     */
	
	
	    Platform.prototype.loggedIn = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.prev = 0;
	                            _context.next = 3;
	                            return this._ensureAuthentication();
	
	                        case 3:
	                            return _context.abrupt("return", true);
	
	                        case 6:
	                            _context.prev = 6;
	                            _context.t0 = _context["catch"](0);
	                            return _context.abrupt("return", false);
	
	                        case 9:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this, [[0, 6]]);
	        }));
	
	        function loggedIn() {
	            return ref.apply(this, arguments);
	        }
	
	        return loggedIn;
	    }();
	
	    /**
	     * @param {string} options.username
	     * @param {string} options.password
	     * @param {string} options.extension
	     * @param {string} options.code
	     * @param {string} options.redirectUri
	     * @param {string} options.endpointId
	     * @param {string} options.remember
	     * @param {string} options.accessTokenTtl
	     * @param {string} options.refreshTokenTtl
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.login = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(options) {
	            var body, apiResponse, json;
	            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            _context2.prev = 0;
	
	
	                            options = options || {};
	
	                            this.emit(this.events.beforeLogin);
	
	                            body = {};
	
	
	                            if (!options.code) {
	
	                                body.grant_type = 'password';
	                                body.username = options.username;
	                                body.password = options.password;
	                                body.extension = options.extension || '';
	                            } else if (options.code) {
	
	                                body.grant_type = 'authorization_code';
	                                body.code = options.code;
	                                body.redirect_uri = options.redirectUri;
	                                //body.client_id = this.getCredentials().key; // not needed
	                            }
	
	                            if (options.endpointId) body.endpoint_id = options.endpointId;
	                            if (options.accessTokenTtl) body.accessTokenTtl = options.accessTokenTtl;
	                            if (options.refreshTokenTtl) body.refreshTokenTtl = options.refreshTokenTtl;
	                            if (options.remember && !options.refreshTokenTtl) body.refreshTokenTtl = options.remember ? Platform._refreshTokenTtlRemember : Platform._refreshTokenTtl;
	
	                            _context2.next = 11;
	                            return this._tokenRequest(Platform._tokenEndpoint, body);
	
	                        case 11:
	                            apiResponse = _context2.sent;
	                            json = apiResponse.json();
	
	
	                            this._auth.setData(json);
	
	                            this.emit(this.events.loginSuccess, apiResponse);
	
	                            return _context2.abrupt("return", apiResponse);
	
	                        case 18:
	                            _context2.prev = 18;
	                            _context2.t0 = _context2["catch"](0);
	
	
	                            this._cache.clean();
	
	                            this.emit(this.events.loginError, _context2.t0);
	
	                            throw _context2.t0;
	
	                        case 23:
	                        case "end":
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, this, [[0, 18]]);
	        }));
	
	        function login(_x) {
	            return ref.apply(this, arguments);
	        }
	
	        return login;
	    }();
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.refresh = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	            var res, json;
	            return regeneratorRuntime.wrap(function _callee3$(_context3) {
	                while (1) {
	                    switch (_context3.prev = _context3.next) {
	                        case 0:
	                            _context3.prev = 0;
	
	
	                            this.emit(this.events.beforeRefresh);
	
	                            if (!this._queue.isPaused()) {
	                                _context3.next = 9;
	                                break;
	                            }
	
	                            _context3.next = 5;
	                            return this._queue.poll();
	
	                        case 5:
	                            if (this._isAccessTokenValid()) {
	                                _context3.next = 7;
	                                break;
	                            }
	
	                            throw new Error('Automatic authentification timeout');
	
	                        case 7:
	
	                            this.emit(this.events.refreshSuccess, null);
	
	                            return _context3.abrupt("return", null);
	
	                        case 9:
	
	                            this._queue.pause();
	
	                            // Make sure all existing AJAX calls had a chance to reach the server
	                            _context3.next = 12;
	                            return (0, _Utils.delay)(Platform._refreshDelayMs);
	
	                        case 12:
	                            if (this._auth.refreshToken()) {
	                                _context3.next = 14;
	                                break;
	                            }
	
	                            throw new Error('Refresh token is missing');
	
	                        case 14:
	                            if (this._auth.refreshTokenValid()) {
	                                _context3.next = 16;
	                                break;
	                            }
	
	                            throw new Error('Refresh token has expired');
	
	                        case 16:
	                            if (this._queue.isPaused()) {
	                                _context3.next = 18;
	                                break;
	                            }
	
	                            throw new Error('Queue was resumed before refresh call');
	
	                        case 18:
	                            _context3.next = 20;
	                            return this._tokenRequest(Platform._tokenEndpoint, {
	                                "grant_type": "refresh_token",
	                                "refresh_token": this._auth.refreshToken(),
	                                "access_token_ttl": this._auth.data().expires_in + 1,
	                                "refresh_token_ttl": this._auth.data().refresh_token_expires_in + 1
	                            });
	
	                        case 20:
	                            res = _context3.sent;
	                            json = res.json();
	
	                            if (json.access_token) {
	                                _context3.next = 24;
	                                break;
	                            }
	
	                            throw this._client.makeError(new Error('Malformed OAuth response'), res);
	
	                        case 24:
	
	                            this._auth.setData(json);
	                            this._queue.resume();
	
	                            this.emit(this.events.refreshSuccess, res);
	
	                            return _context3.abrupt("return", res);
	
	                        case 30:
	                            _context3.prev = 30;
	                            _context3.t0 = _context3["catch"](0);
	
	
	                            _context3.t0 = this._client.makeError(_context3.t0);
	
	                            if (Platform._clearCacheOnRefreshError) {
	                                this._cache.clean();
	                            }
	
	                            this.emit(this.events.refreshError, _context3.t0);
	
	                            throw _context3.t0;
	
	                        case 36:
	                        case "end":
	                            return _context3.stop();
	                    }
	                }
	            }, _callee3, this, [[0, 30]]);
	        }));
	
	        function refresh() {
	            return ref.apply(this, arguments);
	        }
	
	        return refresh;
	    }();
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.logout = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
	            var res;
	            return regeneratorRuntime.wrap(function _callee4$(_context4) {
	                while (1) {
	                    switch (_context4.prev = _context4.next) {
	                        case 0:
	                            _context4.prev = 0;
	
	
	                            this.emit(this.events.beforeLogout);
	
	                            this._queue.pause();
	
	                            _context4.next = 5;
	                            return this._tokenRequest(Platform._revokeEndpoint, {
	                                token: this._auth.accessToken()
	                            });
	
	                        case 5:
	                            res = _context4.sent;
	
	
	                            this._queue.resume();
	                            this._cache.clean();
	
	                            this.emit(this.events.logoutSuccess, res);
	
	                            return _context4.abrupt("return", res);
	
	                        case 12:
	                            _context4.prev = 12;
	                            _context4.t0 = _context4["catch"](0);
	
	
	                            this._queue.resume();
	
	                            this.emit(this.events.logoutError, _context4.t0);
	
	                            throw _context4.t0;
	
	                        case 17:
	                        case "end":
	                            return _context4.stop();
	                    }
	                }
	            }, _callee4, this, [[0, 12]]);
	        }));
	
	        function logout() {
	            return ref.apply(this, arguments);
	        }
	
	        return logout;
	    }();
	
	    /**
	     * @param {Request} request
	     * @param {object} [options]
	     * @param {boolean} [options.skipAuthCheck]
	     * @return {Promise<Request>}
	     */
	
	
	    Platform.prototype.inflateRequest = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(request, options) {
	            return regeneratorRuntime.wrap(function _callee5$(_context5) {
	                while (1) {
	                    switch (_context5.prev = _context5.next) {
	                        case 0:
	
	                            options = options || {};
	
	                            if (!options.skipAuthCheck) {
	                                _context5.next = 3;
	                                break;
	                            }
	
	                            return _context5.abrupt("return", request);
	
	                        case 3:
	                            _context5.next = 5;
	                            return this._ensureAuthentication();
	
	                        case 5:
	
	                            request.headers.set('X-User-Agent', this._userAgent);
	                            request.headers.set('Client-Id', this._appKey);
	                            request.headers.set('Authorization', this._authHeader());
	                            //request.url = this.createUrl(request.url, {addServer: true}); //FIXME Spec prevents this...
	
	                            return _context5.abrupt("return", request);
	
	                        case 9:
	                        case "end":
	                            return _context5.stop();
	                    }
	                }
	            }, _callee5, this);
	        }));
	
	        function inflateRequest(_x2, _x3) {
	            return ref.apply(this, arguments);
	        }
	
	        return inflateRequest;
	    }();
	
	    /**
	     * @param {Request} request
	     * @param {object} [options]
	     * @param {boolean} [options.skipAuthCheck]
	     * @return {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.sendRequest = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(request, options) {
	            return regeneratorRuntime.wrap(function _callee6$(_context6) {
	                while (1) {
	                    switch (_context6.prev = _context6.next) {
	                        case 0:
	                            _context6.prev = 0;
	                            _context6.next = 3;
	                            return this.inflateRequest(request, options);
	
	                        case 3:
	                            request = _context6.sent;
	                            _context6.next = 6;
	                            return this._client.sendRequest(request);
	
	                        case 6:
	                            return _context6.abrupt("return", _context6.sent);
	
	                        case 9:
	                            _context6.prev = 9;
	                            _context6.t0 = _context6["catch"](0);
	
	                            if (!(!_context6.t0.apiResponse || !_context6.t0.apiResponse.response() || _context6.t0.apiResponse.response().status != 401)) {
	                                _context6.next = 13;
	                                break;
	                            }
	
	                            throw _context6.t0;
	
	                        case 13:
	
	                            this._auth.cancelAccessToken();
	
	                            _context6.next = 16;
	                            return this.sendRequest(request, options);
	
	                        case 16:
	                            return _context6.abrupt("return", _context6.sent);
	
	                        case 17:
	                        case "end":
	                            return _context6.stop();
	                    }
	                }
	            }, _callee6, this, [[0, 9]]);
	        }));
	
	        function sendRequest(_x4, _x5) {
	            return ref.apply(this, arguments);
	        }
	
	        return sendRequest;
	    }();
	
	    /**
	     * General purpose function to send anything to server
	     * @param {string} options.url
	     * @param {object} [options.body]
	     * @param {string} [options.method]
	     * @param {object} [options.query]
	     * @param {object} [options.headers]
	     * @param {boolean} [options.skipAuthCheck]
	     * @return {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.send = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            return regeneratorRuntime.wrap(function _callee7$(_context7) {
	                while (1) {
	                    switch (_context7.prev = _context7.next) {
	                        case 0:
	
	                            //FIXME https://github.com/bitinn/node-fetch/issues/43
	                            options.url = this.createUrl(options.url, { addServer: true });
	
	                            _context7.next = 3;
	                            return this.sendRequest(this._client.createRequest(options), options);
	
	                        case 3:
	                            return _context7.abrupt("return", _context7.sent);
	
	                        case 4:
	                        case "end":
	                            return _context7.stop();
	                    }
	                }
	            }, _callee7, this);
	        }));
	
	        function send(_x6) {
	            return ref.apply(this, arguments);
	        }
	
	        return send;
	    }();
	
	    /**
	     * @param {string} url
	     * @param {object} [query]
	     * @param {object} [options]
	     * @param {object} [options.headers]
	     * @param {boolean} [options.skipAuthCheck]
	     * @return {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.get = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(url, query, options) {
	            return regeneratorRuntime.wrap(function _callee8$(_context8) {
	                while (1) {
	                    switch (_context8.prev = _context8.next) {
	                        case 0:
	                            options = options || {};
	                            options.method = 'GET';
	                            options.url = url;
	                            options.query = query;
	                            _context8.next = 6;
	                            return this.send(options);
	
	                        case 6:
	                            return _context8.abrupt("return", _context8.sent);
	
	                        case 7:
	                        case "end":
	                            return _context8.stop();
	                    }
	                }
	            }, _callee8, this);
	        }));
	
	        function get(_x8, _x9, _x10) {
	            return ref.apply(this, arguments);
	        }
	
	        return get;
	    }();
	
	    /**
	     * @param {string} url
	     * @param {object} body
	     * @param {object} [query]
	     * @param {object} [options]
	     * @param {object} [options.headers]
	     * @param {boolean} [options.skipAuthCheck]
	     * @return {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.post = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(url, body, query, options) {
	            return regeneratorRuntime.wrap(function _callee9$(_context9) {
	                while (1) {
	                    switch (_context9.prev = _context9.next) {
	                        case 0:
	                            options = options || {};
	                            options.method = 'POST';
	                            options.url = url;
	                            options.query = query;
	                            options.body = body;
	                            _context9.next = 7;
	                            return this.send(options);
	
	                        case 7:
	                            return _context9.abrupt("return", _context9.sent);
	
	                        case 8:
	                        case "end":
	                            return _context9.stop();
	                    }
	                }
	            }, _callee9, this);
	        }));
	
	        function post(_x11, _x12, _x13, _x14) {
	            return ref.apply(this, arguments);
	        }
	
	        return post;
	    }();
	
	    /**
	     * @param {string} url
	     * @param {object} [body]
	     * @param {object} [query]
	     * @param {object} [options]
	     * @param {object} [options.headers]
	     * @param {boolean} [options.skipAuthCheck]
	     * @return {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype.put = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(url, body, query, options) {
	            return regeneratorRuntime.wrap(function _callee10$(_context10) {
	                while (1) {
	                    switch (_context10.prev = _context10.next) {
	                        case 0:
	                            options = options || {};
	                            options.method = 'PUT';
	                            options.url = url;
	                            options.query = query;
	                            options.body = body;
	                            _context10.next = 7;
	                            return this.send(options);
	
	                        case 7:
	                            return _context10.abrupt("return", _context10.sent);
	
	                        case 8:
	                        case "end":
	                            return _context10.stop();
	                    }
	                }
	            }, _callee10, this);
	        }));
	
	        function put(_x15, _x16, _x17, _x18) {
	            return ref.apply(this, arguments);
	        }
	
	        return put;
	    }();
	
	    /**
	     * @param {string} url
	     * @param {string} [query]
	     * @param {object} [options]
	     * @param {object} [options.headers]
	     * @param {boolean} [options.skipAuthCheck]
	     * @return {Promise<ApiResponse>}
	     */
	
	
	    Platform.prototype['delete'] = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(url, query, options) {
	            return regeneratorRuntime.wrap(function _callee11$(_context11) {
	                while (1) {
	                    switch (_context11.prev = _context11.next) {
	                        case 0:
	                            options = options || {};
	                            options.method = 'DELETE';
	                            options.url = url;
	                            options.query = query;
	                            _context11.next = 6;
	                            return this.send(options);
	
	                        case 6:
	                            return _context11.abrupt("return", _context11.sent);
	
	                        case 7:
	                        case "end":
	                            return _context11.stop();
	                    }
	                }
	            }, _callee11, this);
	        }));
	
	        function _delete(_x19, _x20, _x21) {
	            return ref.apply(this, arguments);
	        }
	
	        return _delete;
	    }();
	
	    Platform.prototype._tokenRequest = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(path, body) {
	            return regeneratorRuntime.wrap(function _callee12$(_context12) {
	                while (1) {
	                    switch (_context12.prev = _context12.next) {
	                        case 0:
	                            _context12.next = 2;
	                            return this.send({
	                                url: path,
	                                skipAuthCheck: true,
	                                body: body,
	                                method: 'POST',
	                                headers: {
	                                    'Authorization': 'Basic ' + this._apiKey(),
	                                    'Content-Type': 'application/x-www-form-urlencoded'
	                                }
	                            });
	
	                        case 2:
	                            return _context12.abrupt("return", _context12.sent);
	
	                        case 3:
	                        case "end":
	                            return _context12.stop();
	                    }
	                }
	            }, _callee12, this);
	        }));
	
	        function _tokenRequest(_x22, _x23) {
	            return ref.apply(this, arguments);
	        }
	
	        return _tokenRequest;
	    }();
	
	    Platform.prototype._ensureAuthentication = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
	            return regeneratorRuntime.wrap(function _callee13$(_context13) {
	                while (1) {
	                    switch (_context13.prev = _context13.next) {
	                        case 0:
	                            if (!this._isAccessTokenValid()) {
	                                _context13.next = 2;
	                                break;
	                            }
	
	                            return _context13.abrupt("return", null);
	
	                        case 2:
	                            _context13.next = 4;
	                            return this.refresh();
	
	                        case 4:
	                            return _context13.abrupt("return", _context13.sent);
	
	                        case 5:
	                        case "end":
	                            return _context13.stop();
	                    }
	                }
	            }, _callee13, this);
	        }));
	
	        function _ensureAuthentication() {
	            return ref.apply(this, arguments);
	        }
	
	        return _ensureAuthentication;
	    }();
	
	    Platform.prototype._isAccessTokenValid = function _isAccessTokenValid() {
	
	        return this._auth.accessTokenValid() && !this._queue.isPaused();
	    };
	
	    Platform.prototype._apiKey = function _apiKey() {
	        var apiKey = this._appKey + ':' + this._appSecret;
	        return typeof btoa == 'function' ? btoa(apiKey) : new Buffer(apiKey).toString('base64');
	    };
	
	    Platform.prototype._authHeader = function _authHeader() {
	        var token = this._auth.accessToken();
	        return this._auth.tokenType() + (token ? ' ' + token : '');
	    };
	
	    return Platform;
	}(_Observable3.default);
	
	Platform._urlPrefix = '/restapi';
	Platform._apiVersion = 'v1.0';
	Platform._refreshTokenTtl = 10 * 60 * 60;
	Platform._refreshTokenTtlRemember = 7 * 24 * 60 * 60;
	Platform._tokenEndpoint = '/restapi/oauth/token';
	Platform._revokeEndpoint = '/restapi/oauth/revoke';
	Platform._authorizeEndpoint = '/restapi/oauth/authorize';
	Platform._refreshDelayMs = 100;
	Platform._cacheId = 'platform';
	Platform._clearCacheOnRefreshError = false;
	exports.default = Platform;
	
	/***/ },
	/* 21 */
	/***/ function(module, exports) {
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Auth = function () {
	    function Auth(cache, cacheId) {
	        _classCallCheck(this, Auth);
	
	        /** @type {Cache} */
	        this._cache = cache;
	        this._cacheId = cacheId;
	    } // 1 minute
	
	
	    Auth.prototype.accessToken = function accessToken() {
	        return this.data().access_token;
	    };
	
	    Auth.prototype.refreshToken = function refreshToken() {
	        return this.data().refresh_token;
	    };
	
	    Auth.prototype.tokenType = function tokenType() {
	        return this.data().token_type;
	    };
	
	    /**
	     * @return {{token_type: string, access_token: string, expires_in: number, refresh_token: string, refresh_token_expires_in: number}}
	     */
	
	
	    Auth.prototype.data = function data() {
	
	        return this._cache.getItem(this._cacheId) || {
	            token_type: '',
	            access_token: '',
	            expires_in: 0,
	            refresh_token: '',
	            refresh_token_expires_in: 0
	        };
	    };
	
	    /**
	     * @param {object} newData
	     * @return {Auth}
	     */
	
	
	    Auth.prototype.setData = function setData(newData) {
	
	        newData = newData || {};
	
	        var data = this.data();
	
	        Object.keys(newData).forEach(function (key) {
	            data[key] = newData[key];
	        });
	
	        data.expire_time = Date.now() + data.expires_in * 1000;
	        data.refresh_token_expire_time = Date.now() + data.refresh_token_expires_in * 1000;
	
	        this._cache.setItem(this._cacheId, data);
	
	        return this;
	    };
	
	    /**
	     * Check if there is a valid (not expired) access token
	     * @return {boolean}
	     */
	
	
	    Auth.prototype.accessTokenValid = function accessTokenValid() {
	
	        var authData = this.data();
	        return authData.token_type === Auth.forcedTokenType || authData.expire_time - Auth.refreshHandicapMs > Date.now();
	    };
	
	    /**
	     * Check if there is a valid (not expired) access token
	     * @return {boolean}
	     */
	
	
	    Auth.prototype.refreshTokenValid = function refreshTokenValid() {
	
	        return this.data().refresh_token_expire_time > Date.now();
	    };
	
	    /**
	     * @return {Auth}
	     */
	
	
	    Auth.prototype.cancelAccessToken = function cancelAccessToken() {
	
	        return this.setData({
	            access_token: '',
	            expires_in: 0
	        });
	    };
	
	    /**
	     * This method sets a special authentication mode used in Service Web
	     * @return {Auth}
	     */
	
	
	    Auth.prototype.forceAuthentication = function forceAuthentication() {
	
	        this.setData({
	            token_type: Auth.forcedTokenType,
	            access_token: '',
	            expires_in: 0,
	            refresh_token: '',
	            refresh_token_expires_in: 0
	        });
	
	        return this;
	    };
	
	    return Auth;
	}();
	
	//export interface IAuthData {
	//    remember?:boolean;
	//    token_type?:string;
	//    access_token?:string;
	//    expires_in?:number; // actually it's string
	//    expire_time?:number;
	//    refresh_token?:string;
	//    refresh_token_expires_in?:number; // actually it's string
	//    refresh_token_expire_time?:number;
	//    scope?:string;
	//}
	
	
	Auth.refreshHandicapMs = 60 * 1000;
	Auth.forcedTokenType = 'forced';
	exports.default = Auth;
	
	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _PubnubMock = __webpack_require__(23);
	
	var _PubnubMock2 = _interopRequireDefault(_PubnubMock);
	
	var _Externals = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PubnubMockFactory = function () {
	    function PubnubMockFactory() {
	        _classCallCheck(this, PubnubMockFactory);
	
	        this.crypto_obj = _Externals.PUBNUB.crypto_obj;
	    }
	
	    PubnubMockFactory.prototype.init = function init(options) {
	        return new _PubnubMock2.default(options);
	    };
	
	    return PubnubMockFactory;
	}();
	
	exports.default = PubnubMockFactory;
	
	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _Observable2 = __webpack_require__(13);
	
	var _Observable3 = _interopRequireDefault(_Observable2);
	
	var _Externals = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PubnubMock = function (_Observable) {
	    _inherits(PubnubMock, _Observable);
	
	    function PubnubMock(options) {
	        _classCallCheck(this, PubnubMock);
	
	        var _this = _possibleConstructorReturn(this, _Observable.call(this));
	
	        _this.options = options;
	        _this.crypto_obj = _Externals.PUBNUB.crypto_obj;
	        return _this;
	    }
	
	    PubnubMock.prototype.ready = function ready() {};
	
	    PubnubMock.prototype.subscribe = function subscribe(options) {
	        this.on('message-' + options.channel, options.message);
	    };
	
	    PubnubMock.prototype.unsubscribe = function unsubscribe(options) {
	        this.off('message-' + options.channel);
	    };
	
	    PubnubMock.prototype.receiveMessage = function receiveMessage(msg, channel) {
	        this.emit('message-' + channel, msg, 'env', channel);
	    };
	
	    return PubnubMock;
	}(_Observable3.default);
	
	exports.default = PubnubMock;
	
	/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _Observable2 = __webpack_require__(13);
	
	var _Observable3 = _interopRequireDefault(_Observable2);
	
	var _Client = __webpack_require__(15);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	var _Utils = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Subscription = function (_Observable) {
	    _inherits(Subscription, _Observable);
	
	    function Subscription(pubnubFactory, platform) {
	        _classCallCheck(this, Subscription);
	
	        var _this = _possibleConstructorReturn(this, _Observable.call(this));
	
	        _this.events = {
	            notification: 'notification',
	            removeSuccess: 'removeSuccess',
	            removeError: 'removeError',
	            renewSuccess: 'renewSuccess',
	            renewError: 'renewError',
	            subscribeSuccess: 'subscribeSuccess',
	            subscribeError: 'subscribeError'
	        };
	
	
	        _this._pubnubFactory = pubnubFactory;
	        _this._platform = platform;
	        _this._pubnub = null;
	        _this._timeout = null;
	        _this._subscription = {};
	
	        return _this;
	    }
	
	    Subscription.prototype.subscribed = function subscribed() {
	
	        return !!(this._subscription.id && this._subscription.deliveryMode && this._subscription.deliveryMode.subscriberKey && this._subscription.deliveryMode.address);
	    };
	
	    /**
	     * @return {boolean}
	     */
	
	
	    Subscription.prototype.alive = function alive() {
	        return this.subscribed() && Date.now() < this.expirationTime();
	    };
	
	    Subscription.prototype.expirationTime = function expirationTime() {
	        return new Date(this._subscription.expirationTime || 0).getTime() - Subscription._renewHandicapMs;
	    };
	
	    Subscription.prototype.setSubscription = function setSubscription(subscription) {
	
	        subscription = subscription || {};
	
	        this._clearTimeout();
	
	        this._subscription = subscription;
	
	        if (!this._pubnub) this._subscribeAtPubnub();
	
	        this._setTimeout();
	
	        return this;
	    };
	
	    Subscription.prototype.subscription = function subscription() {
	        return this._subscription;
	    };
	
	    /**
	     * Creates or updates subscription if there is an active one
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Subscription.prototype.register = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            if (!this.alive()) {
	                                _context.next = 6;
	                                break;
	                            }
	
	                            _context.next = 3;
	                            return this.renew();
	
	                        case 3:
	                            return _context.abrupt('return', _context.sent);
	
	                        case 6:
	                            _context.next = 8;
	                            return this.subscribe();
	
	                        case 8:
	                            return _context.abrupt('return', _context.sent);
	
	                        case 9:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	
	        function register() {
	            return ref.apply(this, arguments);
	        }
	
	        return register;
	    }();
	
	    Subscription.prototype.eventFilters = function eventFilters() {
	        return this._subscription.eventFilters || [];
	    };
	
	    /**
	     * @param {string[]} events
	     * @return {Subscription}
	     */
	
	
	    Subscription.prototype.addEventFilters = function addEventFilters(events) {
	        this.setEventFilters(this.eventFilters().concat(events));
	        return this;
	    };
	
	    /**
	     * @param {string[]} events
	     * @return {Subscription}
	     */
	
	
	    Subscription.prototype.setEventFilters = function setEventFilters(events) {
	        this._subscription.eventFilters = events;
	        return this;
	    };
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Subscription.prototype.subscribe = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	            var response, json;
	            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            _context2.prev = 0;
	
	
	                            this._clearTimeout();
	
	                            if (this.eventFilters().length) {
	                                _context2.next = 4;
	                                break;
	                            }
	
	                            throw new Error('Events are undefined');
	
	                        case 4:
	                            _context2.next = 6;
	                            return this._platform.post('/restapi/v1.0/subscription', {
	                                eventFilters: this._getFullEventFilters(),
	                                deliveryMode: {
	                                    transportType: 'PubNub'
	                                }
	                            });
	
	                        case 6:
	                            response = _context2.sent;
	                            json = response.json();
	
	
	                            this.setSubscription(json).emit(this.events.subscribeSuccess, response);
	
	                            return _context2.abrupt('return', response);
	
	                        case 12:
	                            _context2.prev = 12;
	                            _context2.t0 = _context2['catch'](0);
	
	
	                            _context2.t0 = this._platform.client().makeError(_context2.t0);
	
	                            this.reset().emit(this.events.subscribeError, _context2.t0);
	
	                            throw _context2.t0;
	
	                        case 17:
	                        case 'end':
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, this, [[0, 12]]);
	        }));
	
	        function subscribe() {
	            return ref.apply(this, arguments);
	        }
	
	        return subscribe;
	    }();
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Subscription.prototype.renew = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	            var response, json;
	            return regeneratorRuntime.wrap(function _callee3$(_context3) {
	                while (1) {
	                    switch (_context3.prev = _context3.next) {
	                        case 0:
	                            _context3.prev = 0;
	
	
	                            this._clearTimeout();
	
	                            if (this.subscribed()) {
	                                _context3.next = 4;
	                                break;
	                            }
	
	                            throw new Error('No subscription');
	
	                        case 4:
	                            if (this.eventFilters().length) {
	                                _context3.next = 6;
	                                break;
	                            }
	
	                            throw new Error('Events are undefined');
	
	                        case 6:
	                            _context3.next = 8;
	                            return this._platform.put('/restapi/v1.0/subscription/' + this._subscription.id, {
	                                eventFilters: this._getFullEventFilters()
	                            });
	
	                        case 8:
	                            response = _context3.sent;
	                            json = response.json();
	
	
	                            this.setSubscription(json).emit(this.events.renewSuccess, response);
	
	                            return _context3.abrupt('return', response);
	
	                        case 14:
	                            _context3.prev = 14;
	                            _context3.t0 = _context3['catch'](0);
	
	
	                            _context3.t0 = this._platform.client().makeError(_context3.t0);
	
	                            this.reset().emit(this.events.renewError, _context3.t0);
	
	                            throw _context3.t0;
	
	                        case 19:
	                        case 'end':
	                            return _context3.stop();
	                    }
	                }
	            }, _callee3, this, [[0, 14]]);
	        }));
	
	        function renew() {
	            return ref.apply(this, arguments);
	        }
	
	        return renew;
	    }();
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Subscription.prototype.remove = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
	            var response;
	            return regeneratorRuntime.wrap(function _callee4$(_context4) {
	                while (1) {
	                    switch (_context4.prev = _context4.next) {
	                        case 0:
	                            _context4.prev = 0;
	
	                            if (this.subscribed()) {
	                                _context4.next = 3;
	                                break;
	                            }
	
	                            throw new Error('No subscription');
	
	                        case 3:
	                            _context4.next = 5;
	                            return this._platform.delete('/restapi/v1.0/subscription/' + this._subscription.id);
	
	                        case 5:
	                            response = _context4.sent;
	
	
	                            this.reset().emit(this.events.removeSuccess, response);
	
	                            return _context4.abrupt('return', response);
	
	                        case 10:
	                            _context4.prev = 10;
	                            _context4.t0 = _context4['catch'](0);
	
	
	                            _context4.t0 = this._platform.client().makeError(_context4.t0);
	
	                            this.emit(this.events.removeError, _context4.t0);
	
	                            throw _context4.t0;
	
	                        case 15:
	                        case 'end':
	                            return _context4.stop();
	                    }
	                }
	            }, _callee4, this, [[0, 10]]);
	        }));
	
	        function remove() {
	            return ref.apply(this, arguments);
	        }
	
	        return remove;
	    }();
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    Subscription.prototype.resubscribe = function resubscribe() {
	
	        return this.reset().setEventFilters(this.eventFilters()).subscribe();
	    };
	
	    /**
	     * Remove subscription and disconnect from PUBNUB
	     * This method resets subscription at client side but backend is not notified
	     */
	
	
	    Subscription.prototype.reset = function reset() {
	        this._clearTimeout();
	        if (this.subscribed() && this._pubnub) this._pubnub.unsubscribe({ channel: this._subscription.deliveryMode.address });
	        this._subscription = {};
	        return this;
	    };
	
	    Subscription.prototype._getFullEventFilters = function _getFullEventFilters() {
	        var _this2 = this;
	
	        return this.eventFilters().map(function (event) {
	            return _this2._platform.createUrl(event);
	        });
	    };
	
	    Subscription.prototype._setTimeout = function _setTimeout() {
	        var _this3 = this;
	
	        this._clearTimeout();
	
	        if (!this.alive()) throw new Error('Subscription is not alive');
	
	        (0, _Utils.poll)(function (next) {
	
	            if (_this3.alive()) return next();
	
	            _this3.renew();
	        }, Subscription._pollInterval, this._timeout);
	
	        return this;
	    };
	
	    Subscription.prototype._clearTimeout = function _clearTimeout() {
	
	        (0, _Utils.stopPolling)(this._timeout);
	
	        return this;
	    };
	
	    Subscription.prototype._decrypt = function _decrypt(message) {
	
	        if (!this.subscribed()) throw new Error('No subscription');
	
	        if (this._subscription.deliveryMode.encryptionKey) {
	
	            var PUBNUB = this._pubnubFactory;
	
	            message = PUBNUB.crypto_obj.decrypt(message, this._subscription.deliveryMode.encryptionKey, {
	                encryptKey: false,
	                keyEncoding: 'base64',
	                keyLength: 128,
	                mode: 'ecb'
	            });
	        }
	
	        return message;
	    };
	
	    Subscription.prototype._notify = function _notify(message) {
	
	        this.emit(this.events.notification, this._decrypt(message));
	
	        return this;
	    };
	
	    Subscription.prototype._subscribeAtPubnub = function _subscribeAtPubnub() {
	
	        if (!this.alive()) throw new Error('Subscription is not alive');
	
	        var PUBNUB = this._pubnubFactory;
	
	        this._pubnub = PUBNUB.init({
	            ssl: true,
	            subscribe_key: this._subscription.deliveryMode.subscriberKey
	        });
	
	        this._pubnub.ready();
	
	        this._pubnub.subscribe({
	            channel: this._subscription.deliveryMode.address,
	            message: this._notify.bind(this),
	            connect: function connect() {}
	        });
	
	        return this;
	    };
	
	    return Subscription;
	}(_Observable3.default);
	
	//export interface ISubscription {
	//    id?:string;
	//    uri?: string;
	//    eventFilters?:string[];
	//    expirationTime?:string; // 2014-03-12T19:54:35.613Z
	//    expiresIn?:number;
	//    deliveryMode?: {
	//        transportType?:string;
	//        encryption?:boolean;
	//        address?:string;
	//        subscriberKey?:string;
	//        encryptionKey?:string;
	//        secretKey?:string;
	//    };
	//    creationTime?:string; // 2014-03-12T19:54:35.613Z
	//    status?:string; // Active
	//}
	
	
	Subscription._renewHandicapMs = 2 * 60 * 1000;
	Subscription._pollInterval = 10 * 1000;
	exports.default = Subscription;
	
	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {
	
	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _Subscription2 = __webpack_require__(24);
	
	var _Subscription3 = _interopRequireDefault(_Subscription2);
	
	var _Queue = __webpack_require__(14);
	
	var _Queue2 = _interopRequireDefault(_Queue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CachedSubscription = function (_Subscription) {
	    _inherits(CachedSubscription, _Subscription);
	
	    function CachedSubscription(pubnubFactory, platform, cache, cacheKey) {
	        _classCallCheck(this, CachedSubscription);
	
	        var _this = _possibleConstructorReturn(this, _Subscription.call(this, pubnubFactory, platform));
	
	        _this._cache = cache;
	        _this._cacheKey = cacheKey;
	        _this._renewQueue = new _Queue2.default(_this._cache, cacheKey + '-renew');
	        _this._resubscribeQueue = new _Queue2.default(_this._cache, cacheKey + '-resubscribe');
	
	        _this.events = _extends({}, _this.events, {
	            queuedRenewSuccess: 'queuedRenewSuccess',
	            queuedRenewError: 'queuedRenewError',
	            queuedResubscribeSuccess: 'queuedResubscribeSuccess',
	            queuedResubscribeError: 'queuedResubscribeError'
	        });
	
	        _this.on(_this.events.renewError, function () {
	            _this.resubscribe();
	        });
	
	        _this.on([_this.events.subscribeSuccess, _this.events.renewSuccess], function () {
	            _this._cache.setItem(_this._cacheKey, _this.subscription());
	        });
	
	        _this.on(_this.events.removeSuccess, function () {
	            _this._cache.removeItem(_this._cacheKey);
	        });
	
	        return _this;
	    }
	
	    /**
	     * TODO Combine with Platform.refresh and move elsewhere
	     * @param actionCb
	     * @param queue
	     * @param successEvent
	     * @param errorEvent
	     * @param errorMessage
	     * @return {*}
	     * @private
	     */
	
	
	    CachedSubscription.prototype._queue = function () {
	        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(actionCb, queue, successEvent, errorEvent, errorMessage) {
	            var res;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.prev = 0;
	
	                            if (!queue.isPaused()) {
	                                _context.next = 8;
	                                break;
	                            }
	
	                            _context.next = 4;
	                            return queue.poll();
	
	                        case 4:
	                            if (this.alive()) {
	                                _context.next = 6;
	                                break;
	                            }
	
	                            throw new Error(errorMessage);
	
	                        case 6:
	
	                            this.emit(successEvent, null);
	
	                            return _context.abrupt('return', null);
	
	                        case 8:
	
	                            queue.pause();
	
	                            _context.next = 11;
	                            return actionCb.call(this);
	
	                        case 11:
	                            res = _context.sent;
	
	
	                            queue.resume();
	
	                            this.emit(successEvent, res);
	
	                            return _context.abrupt('return', res);
	
	                        case 17:
	                            _context.prev = 17;
	                            _context.t0 = _context['catch'](0);
	
	
	                            this.emit(errorEvent, _context.t0);
	
	                            throw _context.t0;
	
	                        case 21:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this, [[0, 17]]);
	        }));
	
	        function _queue(_x, _x2, _x3, _x4, _x5) {
	            return ref.apply(this, arguments);
	        }
	
	        return _queue;
	    }();
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    CachedSubscription.prototype.renew = function renew() {
	
	        return this._queue(_Subscription.prototype.renew, this._renewQueue, this.events.queuedRenewSuccess, this.events.queuedRenewError, 'Subscription is not alive after renew timeout');
	    };
	
	    /**
	     * @returns {Promise<ApiResponse>}
	     */
	
	
	    CachedSubscription.prototype.resubscribe = function resubscribe() {
	
	        return this._queue(_Subscription.prototype.resubscribe, this._resubscribeQueue, this.events.queuedResubscribeSuccess, this.events.queuedResubscribeError, 'Subscription is not alive after resubscribe timeout');
	    };
	
	    /**
	     * @param {string[]} events
	     * @return {CachedSubscription}
	     */
	
	
	    CachedSubscription.prototype.restore = function restore(events) {
	
	        var cachedSubscriptionData = this._cache.getItem(this._cacheKey);
	
	        if (cachedSubscriptionData) {
	            try {
	                this.setSubscription(cachedSubscriptionData);
	            } catch (e) {}
	        } else {
	            this.setEventFilters(events);
	        }
	
	        return this;
	    };
	
	    return CachedSubscription;
	}(_Subscription3.default);
	
	exports.default = CachedSubscription;
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=ringcentral-bundle.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5).Buffer))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(6)
	var ieee754 = __webpack_require__(7)
	var isArray = __webpack_require__(8)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 7 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    key: '8mOtYiilT5OUPwwdeGgvpw',
	    secret: 'cqNn89RmR2SR76Kpp8xJaAdNzNOqR8Qfmjb0B-gDOHTw',
	
	    incomingAudio: '../src/assets/audio/incoming.ogg',
	    outgoingAudio: '../src/assets/audio/outgoing.ogg'
	};
	exports.default = config;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var _rcWebphone = __webpack_require__(11);
	
	var _rcWebphone2 = _interopRequireDefault(_rcWebphone);
	
	var _rcConfig = __webpack_require__(9);
	
	var _rcConfig2 = _interopRequireDefault(_rcConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PhoneService = function () {
	    var webPhone;
	    var session;
	    var handlers = {
	        invite: [],
	        accepted: [],
	        progress: [],
	        rejected: [],
	        terminated: [],
	        failed: [],
	        bye: [],
	        refer: []
	    };
	    function listen(session) {
	        session.on('accepted', function () {
	            console.log('accepted');
	            handlers['accepted'].forEach(function (handler) {
	                return handler(session);
	            });
	        });
	        session.on('progress', function () {
	            console.log('progress');
	            handlers['progress'].forEach(function (handler) {
	                return handler(session);
	            });
	        });
	        session.on('rejected', function () {
	            console.log('rejected');
	            handlers['rejected'].forEach(function (handler) {
	                return handler(session);
	            });
	        });
	        session.on('terminated', function () {
	            console.log('terminated');
	            handlers['terminated'].forEach(function (handler) {
	                return handler(session);
	            });
	        });
	        session.on('failed', function () {
	            console.log('failed');
	            handlers['failed'].forEach(function (handler) {
	                return handler(session);
	            });
	        });
	        session.on('bye', function () {
	            console.log('bye');
	            handlers['bye'].forEach(function (handler) {
	                return handler(session);
	            });
	        });
	        session.on('refer', function () {
	            console.log('refer');
	            handlers['refer'].forEach(function (handler) {
	                return handler(session);
	            });
	        });
	    }
	    return {
	        init: function init(options) {
	            return _rcSdk.RC.sdk.platform().post('/client-info/sip-provision', {
	                sipInfo: [{
	                    transport: 'WSS'
	                }]
	            }).then(function (res) {
	                console.log(res.json());
	                return new _rcWebphone2.default(res.json(), { // optional
	                    appKey: _rcConfig2.default.key,
	                    logLevel: 1,
	                    audioHelper: {
	                        enabled: true, // enables audio feedback when web phone is ringing or making a call
	                        incoming: options.incomingAudio, // path to audio file for incoming call
	                        outgoing: options.outgoingAudio // path to aduotfile for outgoing call
	                    }
	                });
	            }).then(function (p) {
	                webPhone = p;
	                webPhone.userAgent.on('invite', function (s) {
	                    session = s;
	                    handlers['invite'].forEach(function (handler) {
	                        return handler(session);
	                    });
	                    listen(session);
	                });
	            }).catch(function (e) {
	                return console.error(e);
	            });
	        },
	        on: function on(name, callback) {
	            handlers[name].push(callback);
	        },
	        call: function call(fromNumber, toNumber, options) {
	            console.log(webPhone);
	            session = webPhone.userAgent.invite(toNumber, {
	                media: {
	                    render: {
	                        remote: options.remoteVideo,
	                        local: options.localVideo
	                    }
	                },
	                fromNumber: fromNumber
	            });
	            listen(session);
	        },
	        accept: function accept(options) {
	            return session.accept({
	                media: {
	                    render: {
	                        remote: options.remoteVideo,
	                        local: options.localVideo
	                    }
	                }
	            });
	        },
	        hangup: function hangup() {
	            return session.bye();
	        },
	        hold: function hold(flag) {
	            console.log('real hold:' + flag);
	            if (flag) {
	                return session.hold().then(function () {
	                    return session;
	                });
	            }
	            return session.unhold().then(function () {
	                return session;
	            });
	        },
	        mute: function mute(flag) {
	            console.log('real mute:' + flag);
	            if (flag) session.mute();else session.unmute();
	            return session;
	        },
	        flip: function flip(number) {
	            return session.flip(number).then(function () {
	                return session;
	            });
	        },
	        forward: function forward(number) {
	            return session.forward(number).then(function () {
	                return session;
	            });
	        },
	        transfer: function transfer(number) {
	            return session.transfer(number).then(function () {
	                return session;
	            });
	        },
	        park: function park() {
	            return session.park().then(function () {
	                return session;
	            });
	        },
	        record: function record(flag) {
	            if (flag) {
	                return session.startRecord().then(function () {
	                    return session;
	                });
	            } else {
	                return session.stopRecord().then(function () {
	                    return session;
	                });
	            }
	        }
	    };
	}();
	exports.default = PhoneService;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ringcentralWebPhone = __webpack_require__(12);
	
	var _ringcentralWebPhone2 = _interopRequireDefault(_ringcentralWebPhone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _ringcentralWebPhone2.default;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(SIP) {
	            return factory(SIP);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object') {
	        module.exports = factory(require('sip.js'));
	        module.exports.default = module.exports; //ES6
	    } else {
	        root.RingCentral = root.RingCentral || {};
	        root.RingCentral.WebPhone = factory(root.SIP);
	    }
	}(this, function(SIP) {
	
	    var messages = {
	        park: {reqid: 1, command: 'callpark'},
	        startRecord: {reqid: 2, command: 'startcallrecord'},
	        stopRecord: {reqid: 3, command: 'stopcallrecord'},
	        flip: {reqid: 3, command: 'callflip', target: ''},
	        monitor: {reqid: 4, command: 'monitor'},
	        barge: {reqid: 5, command: 'barge'},
	        whisper: {reqid: 6, command: 'whisper'},
	        takeover: {reqid: 7, command: 'takeover'}
	    };
	
	    var responseTimeout = 10000;
	
	    function uuid() {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	            return v.toString(16);
	        });
	    }
	
	    function delay(ms) {
	        return new Promise(function(resolve, reject) {
	            setTimeout(resolve, ms);
	        });
	    }
	
	    function extend(dst, src) {
	        src = src || {};
	        dst = dst || {};
	        Object.keys(src).forEach(function(k) {
	            dst[k] = src[k];
	        });
	        return dst;
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @param options
	     * @constructor
	     */
	    function AudioHelper(options) {
	
	        options = options || {};
	
	        this._enabled = !!options.enabled;
	        this._incoming = options.incoming || '../audio/incoming.ogg';
	        this._outgoing = options.outgoing || '../audio/outgoing.ogg';
	        this._audio = {};
	
	    }
	
	    AudioHelper.prototype._playSound = function(url, val, volume) {
	
	        if (!this._enabled) return this;
	
	        if (!this._audio[url]) {
	            if (val) {
	                this._audio[url] = new Audio();
	                this._audio[url].src = url;
	                this._audio[url].loop = true;
	                this._audio[url].volume = volume;
	                this._audio[url].play();
	            }
	        } else {
	            if (val) {
	                this._audio[url].currentTime = 0;
	                this._audio[url].play();
	            } else {
	                this._audio[url].pause();
	            }
	        }
	
	        return this;
	
	    };
	
	    AudioHelper.prototype.playIncoming = function(val) {
	        return this._playSound(this._incoming, val, 0.5);
	    };
	
	    AudioHelper.prototype.playOutgoing = function(val) {
	        return this._playSound(this._outgoing, val, 1);
	    };
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @param {object} regData
	     * @param {object} [options]
	     * @param {string} [options.uuid]
	     * @param {string} [options.appKey]
	     * @param {string} [options.appName]
	     * @param {string} [options.appVersion]
	     * @param {string} [options.audioHelper]
	     * @param {string} [options.onSession] fired each time UserAgent starts working with session
	     * @constructor
	     */
	    function WebPhone(regData, options) {
	
	        regData = regData || {};
	        options = options || {};
	
	        this.sipInfo = regData.sipInfo[0] || regData.sipInfo;
	        this.sipFlags = regData.sipFlags;
	
	        var id = options.uuid || localStorage.getItem('rc-webPhone-uuid') || uuid(); //TODO Make configurable
	        localStorage.setItem('rc-webPhone-uuid', id);
	
	        this.endpointHeader = 'P-rc-endpoint-id: ' + id;
	
	        var configuration = {
	            uri: 'sip:' + this.sipInfo.username + '@' + this.sipInfo.domain,
	            wsServers: this.sipInfo.outboundProxy && this.sipInfo.transport
	                ? this.sipInfo.transport.toLowerCase() + '://' + this.sipInfo.outboundProxy
	                : this.sipInfo.wsServers,
	            authorizationUser: this.sipInfo.authorizationId,
	            password: this.sipInfo.password,
	            traceSip: true,
	            stunServers: this.sipInfo.stunServers || ['stun:74.125.194.127:19302'], //FIXME Hardcoded?
	            turnServers: [],
	            log: {
	                level: options.logLevel || 1 //FIXME LOG LEVEL 3
	            },
	            domain: this.sipInfo.domain,
	            autostart: true,
	            register: true,
	            iceGatheringTimeout: this.sipInfo.iceGatheringTimeout || 3000
	        };
	
	        this.appKey = options.appKey;
	        this.appName = options.appName;
	        this.appVersion = options.appVersion;
	        this.userAgentHeader = 'RC-User-Agent: ' +
	                               (options.appName ? (options.appName + (options.appVersion ? '/' + options.appVersion : '')) + ' ' : '') +
	                               'RCWEBPHONE/' + WebPhone.version;
	
	        this.clientIdHeader = 'Client-id:' + options.appKey;
	
	        this.userAgent = new SIP.UA(configuration).register({
	            extraHeaders: [
	                this.endpointHeader,
	                this.userAgentHeader,
	                this.clientIdHeader
	            ]
	        });
	
	        this.userAgent.endpointHeader = this.endpointHeader;
	        this.userAgent.userAgentHeader = this.userAgentHeader;
	        this.userAgent.clientIdHeader = this.clientIdHeader;
	        this.userAgent.sipInfo = this.sipInfo;
	
	        this.userAgent.__invite = this.userAgent.invite;
	        this.userAgent.invite = invite;
	
	        this.userAgent.on('invite', function(session) {
	            this.userAgent.audioHelper.playIncoming(true);
	            patchSession(session);
	        }.bind(this));
	
	        this.userAgent.audioHelper = new AudioHelper(options.audioHelper);
	
	        this.userAgent.onSession = options.onSession || null;
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    WebPhone.version = '0.3.1';
	    WebPhone.uuid = uuid;
	    WebPhone.delay = delay;
	    WebPhone.extend = extend;
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    function patchSession(session) {
	
	        if (session.__patched) return session;
	
	        session.__patched = true;
	
	        session.__sendRequest = session.sendRequest;
	        session.__receiveRequest = session.receiveRequest;
	        session.__receiveInviteResponse = session.receiveInviteResponse;
	        session.__receiveResponse = session.receiveResponse;
	        session.__sendReinvite = session.sendReinvite;
	        session.__accept = session.accept;
	        session.__hold = session.hold;
	        session.__unhold = session.unhold;
	        session.__dtmf = session.dtmf;
	
	        session.sendRequest = sendRequest;
	        session.receiveRequest = receiveRequest;
	        session.receiveInviteResponse = receiveInviteResponse;
	        session.receiveResponse = receiveResponse;
	        session.sendReinvite = sendReinvite;
	        session.accept = accept;
	        session.hold = hold;
	        session.unhold = unhold;
	        session.dtmf = dtmf;
	
	        session.blindTransfer = blindTransfer;
	        session.transfer = transfer;
	        session.park = park;
	        session.forward = forward;
	        session.startRecord = startRecord;
	        session.stopRecord = stopRecord;
	        session.flip = flip;
	
	        session.on('replaced', patchSession);
	        // session.on('connecting', onConnecting);
	
	        // Audio
	        session.on('accepted', stopPlaying);
	        session.on('rejected', stopPlaying);
	        session.on('bye', stopPlaying);
	        session.on('terminated', stopPlaying);
	        session.on('cancel', stopPlaying);
	        session.on('failed', stopPlaying);
	        session.on('replaced', stopPlaying);
	        session.mediaHandler.on('iceConnectionCompleted', stopPlaying);
	        session.mediaHandler.on('iceConnectionFailed', stopPlaying);
	
	        function stopPlaying() {
	            session.ua.audioHelper.playOutgoing(false);
	            session.ua.audioHelper.playIncoming(false);
	            session.removeListener('accepted', stopPlaying);
	            session.removeListener('rejected', stopPlaying);
	            session.removeListener('bye', stopPlaying);
	            session.removeListener('terminated', stopPlaying);
	            session.removeListener('cancel', stopPlaying);
	            session.removeListener('failed', stopPlaying);
	            session.removeListener('replaced', stopPlaying);
	            session.mediaHandler.removeListener('iceConnectionCompleted', stopPlaying);
	            session.mediaHandler.removeListener('iceConnectionFailed', stopPlaying);
	        }
	
	        if (session.ua.onSession) session.ua.onSession(session);
	
	        return session;
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @private
	     * @param {SIP.Session} session
	     * @param {object} command
	     * @param {object} [options]
	     * @return {Promise}
	     */
	    function sendReceive(session, command, options) {
	
	        options = options || {};
	
	        extend(command, options);
	
	        var cseq = null;
	
	        return new Promise(function(resolve, reject) {
	
	            session.sendRequest(SIP.C.INFO, {
	                body: JSON.stringify({
	                    request: command
	                }),
	                extraHeaders: [
	                    "Content-Type: application/json;charset=utf-8",
	                    session.ua.userAgentHeader,
	                    session.ua.endpointHeader,
	                    session.ua.clientIdHeader
	                ],
	                receiveResponse: function(response) {
	                    var timeout = null;
	                    if (response.status_code === 200) {
	                        cseq = response.cseq;
	                        var onInfo = function(request) {
	                            if (response.cseq === cseq) {
	
	                                var body = request && request.body || '{}';
	                                var obj;
	
	                                try {
	                                    obj = JSON.parse(body);
	                                } catch (e) {
	                                    obj = {};
	                                }
	
	                                if (obj.response && obj.response.command === command.command) {
	                                    if (obj.response.result) {
	                                        if (obj.response.result.code == 0) {
	                                            return resolve(obj.response.result);
	                                        } else {
	                                            return reject(obj.response.result);
	                                        }
	                                    }
	                                }
	                                timeout && clearTimeout(timeout);
	                                session.removeListener('RC_SIP_INFO', onInfo);
	                                resolve(null); //FIXME What to resolve
	                            }
	                        };
	
	                        timeout = setTimeout(function() {
	                            reject(new Error('Timeout: no reply'));
	                            session.removeListener('RC_SIP_INFO', onInfo);
	                        }, responseTimeout);
	                        session.on('RC_SIP_INFO', onInfo);
	                    }
	                    else {
	                        reject(new Error('The INFO response status code is: ' + response.status_code + ' (waiting for 200)'));
	                    }
	                }
	            });
	
	        });
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    function sendRequest(type, config) {
	        if (type == SIP.C.PRACK) {
	            type = SIP.C.ACK;
	        }
	        return this.__sendRequest(type, config);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * Fired each time a provisional (100-199) response is received.
	     * Early media is supported by SIP.js library
	     * But in case it is sent without 100rel support we play it manually
	     * STATUS_EARLY_MEDIA === 11, it will be set by SIP.js if 100rel is supported
	     *
	     * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1072388
	     * @param {SIP.Session} session
	     * @param response
	     * @param {funciton} cb
	     */
	    function patch100rel(session, response, cb) {
	
	        //Early media is supported by SIP.js library
	        //But in case it is sent without 100rel support we play it manually
	        //STATUS_EARLY_MEDIA === 11, it will be set by SIP.js if 100rel is supported
	        if (session.status !== SIP.Session.C.STATUS_EARLY_MEDIA && response.status_code === 183 && typeof(response.body) === 'string' && response.body.indexOf('\n') !== -1) {
	            if (!response.hasHeader('require')) response.setHeader('require', '100rel');
	        }
	
	        return cb.call(session, response);
	
	    }
	
	    /**
	     * @this {SIP.Session}
	     * @param response
	     * @return {*}
	     */
	    function receiveInviteResponse(response) {
	        return patch100rel(this, response, this.__receiveInviteResponse);
	    }
	
	    /**
	     * @this {SIP.Session}
	     * @param response
	     * @return {*}
	     */
	    function receiveResponse(response) {
	        return patch100rel(this, response, this.__receiveResponse);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @private
	     * @param {SIP.Session} session
	     * @param {boolean} flag
	     * @return {Promise}
	     */
	    function setRecord(session, flag) {
	
	        var message = !!flag
	            ? messages.startRecord
	            : messages.stopRecord;
	
	        if ((session.__onRecord && !flag) || (!session.__onRecord && flag)) {
	            return sendReceive(session, message)
	                .then(function(data) {
	                    session.__onRecord = !!flag;
	                    return data;
	                });
	        }
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @private
	     * @param {SIP.Session} session
	     * @param {boolean} flag
	     * @return {Promise}
	     */
	    function setHold(session, flag) {
	        return new Promise(function(resolve, reject) {
	
	            function onSucceeded() {
	                resolve();
	                session.removeListener('RC_CALL_REINVITE_FAILED', onFailed);
	            }
	
	            function onFailed(e) {
	                reject(e);
	                session.removeListener('RC_CALL_REINVITE_SUCCEEDED', onSucceeded);
	            }
	
	            session.once('RC_CALL_REINVITE_SUCCEEDED', onSucceeded);
	            session.once('RC_CALL_REINVITE_FAILED', onFailed);
	
	            if (flag) {
	                session.__hold();
	            } else {
	                session.__unhold();
	            }
	
	        });
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.UA}
	     * @param number
	     * @param options
	     * @return {SIP.Session}
	     */
	    function invite(number, options) {
	
	        var ua = this;
	
	        options = options || {};
	        options.extraHeaders = options.extraHeaders || [];
	
	        options.extraHeaders.push(ua.userAgentHeader);
	        options.extraHeaders.push(ua.endpointHeader);
	        options.extraHeaders.push(ua.clientIdHeader);
	
	        options.extraHeaders.push('P-Asserted-Identity: sip:' + (options.fromNumber || ua.sipInfo.username) + '@' + ua.sipInfo.domain); //FIXME Phone Number
	
	        //FIXME Backend should know it already
	        if (options.homeCountryId) { options.extraHeaders.push('P-rc-country-id: ' + options.homeCountryId); }
	
	        options.media = options.media || {};
	        options.media.constraints = options.media.constraints || {audio: true, video: false};
	
	        options.RTCConstraints = options.RTCConstraints || {optional: [{DtlsSrtpKeyAgreement: 'true'}]};
	
	        ua.audioHelper.playOutgoing(true);
	
	        return patchSession(ua.__invite(number, options));
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * Monkey patching sendReinvite for better Hold handling
	     * @this {SIP.Session}
	     * @return {*}
	     */
	    function sendReinvite() {
	        var session = this;
	        var res = session.__sendReinvite.apply(session, arguments);
	        var __reinviteSucceeded = session.reinviteSucceeded,
	            __reinviteFailed = session.reinviteFailed;
	        session.reinviteSucceeded = function() {
	            session.emit('RC_CALL_REINVITE_SUCCEEDED', session);
	            return __reinviteSucceeded.apply(session, arguments);
	        };
	        session.reinviteFailed = function() {
	            session.emit('RC_CALL_REINVITE_FAILED', session);
	            return __reinviteFailed.apply(session, arguments);
	        };
	        return res;
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @param request
	     * @return {*}
	     */
	    function receiveRequest(request) {
	        var session = this;
	        switch (request.method) {
	            case SIP.C.INFO:
	                session.emit('RC_SIP_INFO', request);
	                //SIP.js does not support application/json content type, so we monkey override its behaviour in this case
	                if (session.status === SIP.Session.C.STATUS_CONFIRMED || session.status === SIP.Session.C.STATUS_WAITING_FOR_ACK) {
	                    var contentType = request.getHeader('content-type');
	                    if (contentType.match(/^application\/json/i)) {
	                        request.reply(200);
	                        return session;
	                    }
	                }
	                break;
	            //Refresh invite should not be rejected with 488
	            case SIP.C.INVITE:
	                if (session.status === SIP.Session.C.STATUS_CONFIRMED) {
	                    if (request.call_id && session.dialog && session.dialog.id && request.call_id == session.dialog.id.call_id) {
	                        //TODO: check that SDP did not change
	                        session.logger.log('re-INVITE received');
	                        var localSDP = session.mediaHandler.peerConnection.localDescription.sdp;
	                        request.reply(200, null, ['Contact: ' + session.contact], localSDP, function() {
	                            session.status = SIP.Session.C.STATUS_WAITING_FOR_ACK;
	                            session.setInvite2xxTimer(request, localSDP);
	                            session.setACKTimer();
	                        });
	                        return session;
	                    }
	                    //else will be rejected with 488 by SIP.js
	                }
	                break;
	            //We need to analize NOTIFY messages sometimes, so we fire an event
	            case SIP.C.NOTIFY:
	                session.emit('RC_SIP_NOTIFY', request);
	                break;
	        }
	        return session.__receiveRequest.apply(session, arguments);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @param {object} options
	     * @return {Promise}
	     */
	    function accept(options) {
	
	        var session = this;
	
	        options = options || {};
	        options.extraHeaders = options.extraHeaders || [];
	
	        options.extraHeaders.push(session.ua.userAgentHeader);
	        options.extraHeaders.push(session.ua.endpointHeader);
	        options.extraHeaders.push(session.ua.clientIdHeader);
	
	        options.media = options.media || {};
	        options.media.constraints = options.media.constraints || {audio: true, video: false};
	
	        options.RTCConstraints = options.RTCConstraints || {optional: [{DtlsSrtpKeyAgreement: 'true'}]};
	
	        return new Promise(function(resolve, reject) {
	
	            function onAnswered() {
	                resolve(session);
	                session.removeListener('failed', onFail);
	            }
	
	            function onFail(e) {
	                reject(e);
	                session.removeListener('accepted', onAnswered);
	            }
	
	            //TODO More events?
	            session.once('accepted', onAnswered);
	            session.once('failed', onFail);
	
	            session.__accept(options);
	
	        });
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session} session
	     * @param {string} dtmf
	     * @param {number} duration
	     * @return {Promise}
	     */
	    function dtmf(dtmf, duration) {
	        var session = this;
	        duration = parseInt(duration) || 1000;
	        var peer = session.mediaHandler.peerConnection;
	        var stream = session.getLocalStreams()[0];
	        var dtmfSender = peer.createDTMFSender(stream.getAudioTracks()[0]);
	        if (dtmfSender !== undefined && dtmfSender.canInsertDTMF) {
	            return dtmfSender.insertDTMF(dtmf, duration);
	        }
	        throw new Error('Send DTMF failed: ' + (!dtmfSender ? 'no sender' : (!dtmfSender.canInsertDTMF ? 'can\'t insert DTMF' : 'Unknown')));
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session} session
	     * @return {Promise}
	     */
	    function hold() {
	        return setHold(this, true);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session} session
	     * @return {Promise}
	     */
	    function unhold() {
	        return setHold(this, false);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session} session
	     * @param {string} target
	     * @param {object} options
	     * @return {Promise}
	     */
	    function blindTransfer(target, options) {
	
	        options = options || {};
	
	        var session = this;
	        var extraHeaders = options.extraHeaders || [];
	        var originalTarget = target;
	
	        return new Promise(function(resolve, reject) {
	            //Blind Transfer is taken from SIP.js source
	
	            // Check Session Status
	            if (session.status !== SIP.Session.C.STATUS_CONFIRMED) {
	                throw new SIP.Exceptions.InvalidStateError(session.status);
	            }
	
	            // normalizeTarget allows instances of SIP.URI to pass through unaltered,
	            // so try to make one ahead of time
	            try {
	                target = SIP.Grammar.parse(target, 'Refer_To').uri || target;
	            } catch (e) {
	                session.logger.debug(".refer() cannot parse Refer_To from", target);
	                session.logger.debug("...falling through to normalizeTarget()");
	            }
	
	            // Check target validity
	            target = session.ua.normalizeTarget(target);
	            if (!target) {
	                throw new TypeError('Invalid target: ' + originalTarget);
	            }
	
	            extraHeaders.push('Contact: ' + session.contact);
	            extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());
	            extraHeaders.push('Refer-To: ' + target);
	            extraHeaders.push(session.ua.userAgentHeader);
	            extraHeaders.push(session.ua.endpointHeader);
	            extraHeaders.push(session.ua.clientIdHeader);
	
	            // Send the request
	            session.sendRequest(SIP.C.REFER, {
	                extraHeaders: extraHeaders,
	                body: options.body,
	                receiveResponse: function(response) {
	                    var timeout = null;
	                    if (response.status_code === 202) {
	                        var callId = response.call_id;
	
	                        var onNotify = function(request) {
	                            if (request.call_id === callId) {
	                                var body = request && request.body || '';
	                                switch (true) {
	                                    case /1[0-9]{2}/.test(body):
	                                        request.reply(200);
	                                        break;
	                                    case /2[0-9]{2}/.test(body):
	                                        session.terminate();
	                                        clearTimeout(timeout);
	                                        session.removeListener('RC_SIP_NOTIFY', onNotify);
	                                        resolve();
	                                        break;
	                                    default:
	                                        reject(body);
	                                        break;
	                                }
	                            }
	                        };
	
	                        timeout = setTimeout(function() {
	                            reject(new Error('Timeout: no reply'));
	                            session.removeListener('RC_SIP_NOTIFY', onNotify);
	                        }, responseTimeout);
	                        session.on('RC_SIP_NOTIFY', onNotify);
	                    }
	                    else {
	                        reject(new Error('The response status code is: ' + response.status_code + ' (waiting for 202)'));
	                    }
	                }
	            });
	
	        });
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @param {string} target
	     * @param {object} options
	     * @return {Promise}
	     */
	    function transfer(target, options) {
	
	        var session = this;
	
	        return (session.isOnHold() ? Promise.resolve(null) : session.hold())
	            .then(function() { return delay(300); })
	            .then(function() {
	                return session.blindTransfer(target, options);
	            });
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @param {string} target
	     * @param {object} acceptOptions
	     * @param {object} [transferOptions]
	     * @return {Promise}
	     */
	    function forward(target, acceptOptions, transferOptions) {
	
	        var interval = null,
	            session = this;
	
	        return session.accept(acceptOptions)
	            .then(function() {
	
	                return new Promise(function(resolve, reject) {
	                    interval = setInterval(function() {
	                        if (session.status === 12) {
	                            clearInterval(interval);
	                            session.mute();
	                            setTimeout(function() {
	                                resolve(session.transfer(target, transferOptions));
	                            }, 700);
	                        }
	                    }, 50);
	                });
	
	            });
	
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @return {Promise}
	     */
	    function startRecord() {
	        return setRecord(this, true);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @return {Promise}
	     */
	    function stopRecord() {
	        return setRecord(this, false);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @param target
	     * @return {Promise}
	     */
	    function flip(target) {
	        return sendReceive(this, messages.flip, {target: target});
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    /**
	     * @this {SIP.Session}
	     * @return {Promise}
	     */
	    function park() {
	        return sendReceive(this, messages.park);
	    }
	
	    /*--------------------------------------------------------------------------------------------------------------------*/
	
	    return WebPhone;
	
	}));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = __webpack_require__(14)(__webpack_require__(47));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @name SIP
	 * @namespace
	 */
	"use strict";
	
	module.exports = function (environment) {
	
	var pkg = __webpack_require__(15);
	
	var SIP = Object.defineProperties({}, {
	  version: {
	    get: function(){ return pkg.version; }
	  },
	  name: {
	    get: function(){ return pkg.title; }
	  }
	});
	
	__webpack_require__(16)(SIP, environment);
	SIP.LoggerFactory = __webpack_require__(17)(environment.console);
	SIP.EventEmitter = __webpack_require__(18)(environment.console);
	SIP.C = __webpack_require__(20)(SIP.name, SIP.version);
	SIP.Exceptions = __webpack_require__(21);
	SIP.Timers = __webpack_require__(22)(environment.timers);
	SIP.Transport = environment.Transport(SIP, environment.WebSocket);
	__webpack_require__(23)(SIP);
	__webpack_require__(24)(SIP);
	__webpack_require__(25)(SIP);
	__webpack_require__(26)(SIP);
	__webpack_require__(27)(SIP);
	__webpack_require__(28)(SIP);
	__webpack_require__(30)(SIP);
	__webpack_require__(31)(SIP);
	SIP.MediaHandler = __webpack_require__(32)(SIP.EventEmitter);
	__webpack_require__(33)(SIP);
	__webpack_require__(34)(SIP);
	__webpack_require__(35)(SIP, environment);
	__webpack_require__(37)(SIP);
	SIP.WebRTC = __webpack_require__(38)(SIP, environment);
	__webpack_require__(41)(SIP, environment);
	SIP.Hacks = __webpack_require__(42)(SIP);
	__webpack_require__(43)(SIP);
	SIP.DigestAuthentication = __webpack_require__(44)(SIP.Utils);
	SIP.Grammar = __webpack_require__(45)(SIP);
	
	return SIP;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"sip.js@0.7.3",
				"/Users/howard.zhang/Sites/ringcentral-js-widget/node_modules/ringcentral-web-phone"
			]
		],
		"_from": "sip.js@0.7.3",
		"_id": "sip.js@0.7.3",
		"_inCache": true,
		"_installable": true,
		"_location": "/sip.js",
		"_nodeVersion": "4.2.6",
		"_npmUser": {
			"email": "1212jtraceur@gmail.com",
			"name": "josephfrazier"
		},
		"_npmVersion": "2.4.1",
		"_phantomChildren": {},
		"_requested": {
			"name": "sip.js",
			"raw": "sip.js@0.7.3",
			"rawSpec": "0.7.3",
			"scope": null,
			"spec": "0.7.3",
			"type": "version"
		},
		"_requiredBy": [
			"/ringcentral-web-phone"
		],
		"_resolved": "https://registry.npmjs.org/sip.js/-/sip.js-0.7.3.tgz",
		"_shasum": "fc2ee6227d23a37a91976966f952d82c3da317b5",
		"_shrinkwrap": null,
		"_spec": "sip.js@0.7.3",
		"_where": "/Users/howard.zhang/Sites/ringcentral-js-widget/node_modules/ringcentral-web-phone",
		"author": {
			"email": "will@onsip.com",
			"name": "Will Mitchell"
		},
		"browser": {
			"./src/environment.js": "./src/environment_browser.js"
		},
		"bugs": {
			"url": "https://github.com/onsip/SIP.js/issues"
		},
		"contributors": [
			{
				"url": "http://sipjs.com/authors/"
			}
		],
		"dependencies": {
			"promiscuous": "^0.6.0",
			"ws": "^0.6.4"
		},
		"description": "A simple, intuitive, and powerful JavaScript signaling library",
		"devDependencies": {
			"beefy": "^2.1.5",
			"browserify": "^4.1.8",
			"grunt": "~0.4.0",
			"grunt-browserify": "^4.0.1",
			"grunt-cli": "~0.1.6",
			"grunt-contrib-copy": "^0.5.0",
			"grunt-contrib-jasmine": "~0.8.0",
			"grunt-contrib-jshint": ">0.5.0",
			"grunt-contrib-uglify": "~0.2.0",
			"grunt-peg": "~1.3.1",
			"grunt-trimtrailingspaces": "^0.4.0",
			"pegjs": "^0.8.0"
		},
		"directories": {},
		"dist": {
			"shasum": "fc2ee6227d23a37a91976966f952d82c3da317b5",
			"tarball": "https://registry.npmjs.org/sip.js/-/sip.js-0.7.3.tgz"
		},
		"engines": {
			"node": ">=0.8"
		},
		"gitHead": "d9ae93c04d6aad5df37fc999cbdbc7d9060a2f06",
		"homepage": "http://sipjs.com",
		"keywords": [
			"sip",
			"websocket",
			"webrtc",
			"library",
			"javascript"
		],
		"license": "MIT",
		"main": "src/index.js",
		"maintainers": [
			{
				"email": "eric.green@onsip.com",
				"name": "egreen_onsip"
			},
			{
				"email": "1212jtraceur@gmail.com",
				"name": "josephfrazier"
			}
		],
		"name": "sip.js",
		"optionalDependencies": {
			"promiscuous": "^0.6.0"
		},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/onsip/SIP.js.git"
		},
		"scripts": {
			"build": "grunt build",
			"prepublish": "cd src/Grammar && mkdir -p dist && pegjs --extra-options-file peg.json src/Grammar.pegjs dist/Grammar.js",
			"repl": "beefy test/repl.js --open",
			"test": "grunt travis --verbose"
		},
		"title": "SIP.js",
		"version": "0.7.3"
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview Utils
	 */
	
	module.exports = function (SIP, environment) {
	var Utils;
	
	Utils= {
	
	  Promise: environment.Promise,
	
	  defer: function defer () {
	    var deferred = {};
	    deferred.promise = new Utils.Promise(function (resolve, reject) {
	      deferred.resolve = resolve;
	      deferred.reject = reject;
	    });
	    return deferred;
	  },
	
	  promisify: function promisify (object, methodName, callbacksFirst) {
	    var oldMethod = object[methodName];
	    return function promisifiedMethod (arg, onSuccess, onFailure) {
	      return new Utils.Promise(function (resolve, reject) {
	        var oldArgs = [arg, resolve, reject];
	        if (callbacksFirst) {
	          oldArgs = [resolve, reject, arg];
	        }
	        oldMethod.apply(object, oldArgs);
	      }).then(onSuccess, onFailure);
	    };
	  },
	
	  augment: function (object, constructor, args, override) {
	    var idx, proto;
	
	    // Add public properties from constructor's prototype onto object
	    proto = constructor.prototype;
	    for (idx in proto) {
	      if (override || object[idx] === undefined) {
	        object[idx] = proto[idx];
	      }
	    }
	
	    // Construct the object as though it were just created by constructor
	    constructor.apply(object, args);
	  },
	
	  optionsOverride: function (options, winner, loser, isDeprecated, logger, defaultValue) {
	    if (isDeprecated && options[loser]) {
	      logger.warn(loser + ' is deprecated, please use ' + winner + ' instead');
	    }
	
	    if (options[winner] && options[loser]) {
	      logger.warn(winner + ' overriding ' + loser);
	    }
	
	    options[winner] = options[winner] || options[loser] || defaultValue;
	  },
	
	  str_utf8_length: function(string) {
	    return encodeURIComponent(string).replace(/%[A-F\d]{2}/g, 'U').length;
	  },
	
	  generateFakeSDP: function(body) {
	    if (!body) {
	      return;
	    }
	
	    var start = body.indexOf('o=');
	    var end = body.indexOf('\r\n', start);
	
	    return 'v=0\r\n' + body.slice(start, end) + '\r\ns=-\r\nt=0 0\r\nc=IN IP4 0.0.0.0';
	  },
	
	  isFunction: function(fn) {
	    if (fn !== undefined) {
	      return Object.prototype.toString.call(fn) === '[object Function]';
	    } else {
	      return false;
	    }
	  },
	
	  isDecimal: function (num) {
	    return !isNaN(num) && (parseFloat(num) === parseInt(num,10));
	  },
	
	  createRandomToken: function(size, base) {
	    var i, r,
	      token = '';
	
	    base = base || 32;
	
	    for( i=0; i < size; i++ ) {
	      r = Math.random() * base|0;
	      token += r.toString(base);
	    }
	
	    return token;
	  },
	
	  newTag: function() {
	    return SIP.Utils.createRandomToken(SIP.UA.C.TAG_LENGTH);
	  },
	
	  // http://stackoverflow.com/users/109538/broofa
	  newUUID: function() {
	    var UUID =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	    });
	
	    return UUID;
	  },
	
	  hostType: function(host) {
	    if (!host) {
	      return;
	    } else {
	      host = SIP.Grammar.parse(host,'host');
	      if (host !== -1) {
	        return host.host_type;
	      }
	    }
	  },
	
	  /**
	  * Normalize SIP URI.
	  * NOTE: It does not allow a SIP URI without username.
	  * Accepts 'sip', 'sips' and 'tel' URIs and convert them into 'sip'.
	  * Detects the domain part (if given) and properly hex-escapes the user portion.
	  * If the user portion has only 'tel' number symbols the user portion is clean of 'tel' visual separators.
	  * @private
	  * @param {String} target
	  * @param {String} [domain]
	  */
	  normalizeTarget: function(target, domain) {
	    var uri, target_array, target_user, target_domain;
	
	    // If no target is given then raise an error.
	    if (!target) {
	      return;
	    // If a SIP.URI instance is given then return it.
	    } else if (target instanceof SIP.URI) {
	      return target;
	
	    // If a string is given split it by '@':
	    // - Last fragment is the desired domain.
	    // - Otherwise append the given domain argument.
	    } else if (typeof target === 'string') {
	      target_array = target.split('@');
	
	      switch(target_array.length) {
	        case 1:
	          if (!domain) {
	            return;
	          }
	          target_user = target;
	          target_domain = domain;
	          break;
	        case 2:
	          target_user = target_array[0];
	          target_domain = target_array[1];
	          break;
	        default:
	          target_user = target_array.slice(0, target_array.length-1).join('@');
	          target_domain = target_array[target_array.length-1];
	      }
	
	      // Remove the URI scheme (if present).
	      target_user = target_user.replace(/^(sips?|tel):/i, '');
	
	      // Remove 'tel' visual separators if the user portion just contains 'tel' number symbols.
	      if (/^[\-\.\(\)]*\+?[0-9\-\.\(\)]+$/.test(target_user)) {
	        target_user = target_user.replace(/[\-\.\(\)]/g, '');
	      }
	
	      // Build the complete SIP URI.
	      target = SIP.C.SIP + ':' + SIP.Utils.escapeUser(target_user) + '@' + target_domain;
	
	      // Finally parse the resulting URI.
	      if (uri = SIP.URI.parse(target)) {
	        return uri;
	      } else {
	        return;
	      }
	    } else {
	      return;
	    }
	  },
	
	  /**
	  * Hex-escape a SIP URI user.
	  * @private
	  * @param {String} user
	  */
	  escapeUser: function(user) {
	    // Don't hex-escape ':' (%3A), '+' (%2B), '?' (%3F"), '/' (%2F).
	    return encodeURIComponent(decodeURIComponent(user)).replace(/%3A/ig, ':').replace(/%2B/ig, '+').replace(/%3F/ig, '?').replace(/%2F/ig, '/');
	  },
	
	  headerize: function(string) {
	    var exceptions = {
	      'Call-Id': 'Call-ID',
	      'Cseq': 'CSeq',
	      'Min-Se': 'Min-SE',
	      'Rack': 'RAck',
	      'Rseq': 'RSeq',
	      'Www-Authenticate': 'WWW-Authenticate'
	      },
	      name = string.toLowerCase().replace(/_/g,'-').split('-'),
	      hname = '',
	      parts = name.length, part;
	
	    for (part = 0; part < parts; part++) {
	      if (part !== 0) {
	        hname +='-';
	      }
	      hname += name[part].charAt(0).toUpperCase()+name[part].substring(1);
	    }
	    if (exceptions[hname]) {
	      hname = exceptions[hname];
	    }
	    return hname;
	  },
	
	  sipErrorCause: function(status_code) {
	    var cause;
	
	    for (cause in SIP.C.SIP_ERROR_CAUSES) {
	      if (SIP.C.SIP_ERROR_CAUSES[cause].indexOf(status_code) !== -1) {
	        return SIP.C.causes[cause];
	      }
	    }
	
	    return SIP.C.causes.SIP_FAILURE_CODE;
	  },
	
	  getReasonPhrase: function getReasonPhrase (code, specific) {
	    return specific || SIP.C.REASON_PHRASE[code] || '';
	  },
	
	  getReasonHeaderValue: function getReasonHeaderValue (code, reason) {
	    reason = SIP.Utils.getReasonPhrase(code, reason);
	    return 'SIP ;cause=' + code + ' ;text="' + reason + '"';
	  },
	
	  getCancelReason: function getCancelReason (code, reason) {
	    if (code && code < 200 || code > 699) {
	      throw new TypeError('Invalid status_code: ' + code);
	    } else if (code) {
	      return SIP.Utils.getReasonHeaderValue(code, reason);
	    }
	  },
	
	  buildStatusLine: function buildStatusLine (code, reason) {
	    code = code || null;
	    reason = reason || null;
	
	    // Validate code and reason values
	    if (!code || (code < 100 || code > 699)) {
	      throw new TypeError('Invalid status_code: '+ code);
	    } else if (reason && typeof reason !== 'string' && !(reason instanceof String)) {
	      throw new TypeError('Invalid reason_phrase: '+ reason);
	    }
	
	    reason = Utils.getReasonPhrase(code, reason);
	
	    return 'SIP/2.0 ' + code + ' ' + reason + '\r\n';
	  },
	
	  /**
	  * Generate a random Test-Net IP (http://tools.ietf.org/html/rfc5735)
	  * @private
	  */
	  getRandomTestNetIP: function() {
	    function getOctet(from,to) {
	      return Math.floor(Math.random()*(to-from+1)+from);
	    }
	    return '192.0.2.' + getOctet(1, 254);
	  },
	
	  // MD5 (Message-Digest Algorithm) http://www.webtoolkit.info
	  calculateMD5: function(string) {
	    function RotateLeft(lValue, iShiftBits) {
	      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	    }
	
	    function AddUnsigned(lX,lY) {
	      var lX4,lY4,lX8,lY8,lResult;
	      lX8 = (lX & 0x80000000);
	      lY8 = (lY & 0x80000000);
	      lX4 = (lX & 0x40000000);
	      lY4 = (lY & 0x40000000);
	      lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
	      if (lX4 & lY4) {
	        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	      }
	      if (lX4 | lY4) {
	        if (lResult & 0x40000000) {
	          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
	        } else {
	          return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
	        }
	      } else {
	        return (lResult ^ lX8 ^ lY8);
	      }
	    }
	
	    function F(x,y,z) {
	      return (x & y) | ((~x) & z);
	    }
	
	    function G(x,y,z) {
	      return (x & z) | (y & (~z));
	    }
	
	    function H(x,y,z) {
	      return (x ^ y ^ z);
	    }
	
	    function I(x,y,z) {
	      return (y ^ (x | (~z)));
	    }
	
	    function FF(a,b,c,d,x,s,ac) {
	      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
	      return AddUnsigned(RotateLeft(a, s), b);
	    }
	
	    function GG(a,b,c,d,x,s,ac) {
	      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
	      return AddUnsigned(RotateLeft(a, s), b);
	    }
	
	    function HH(a,b,c,d,x,s,ac) {
	      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
	      return AddUnsigned(RotateLeft(a, s), b);
	    }
	
	    function II(a,b,c,d,x,s,ac) {
	      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
	      return AddUnsigned(RotateLeft(a, s), b);
	    }
	
	    function ConvertToWordArray(string) {
	      var lWordCount;
	      var lMessageLength = string.length;
	      var lNumberOfWords_temp1=lMessageLength + 8;
	      var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
	      var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
	      var lWordArray=Array(lNumberOfWords-1);
	      var lBytePosition = 0;
	      var lByteCount = 0;
	      while ( lByteCount < lMessageLength ) {
	        lWordCount = (lByteCount-(lByteCount % 4))/4;
	        lBytePosition = (lByteCount % 4)*8;
	        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
	        lByteCount++;
	      }
	      lWordCount = (lByteCount-(lByteCount % 4))/4;
	      lBytePosition = (lByteCount % 4)*8;
	      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
	      lWordArray[lNumberOfWords-2] = lMessageLength<<3;
	      lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
	      return lWordArray;
	    }
	
	    function WordToHex(lValue) {
	      var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
	      for (lCount = 0;lCount<=3;lCount++) {
	        lByte = (lValue>>>(lCount*8)) & 255;
	        WordToHexValue_temp = "0" + lByte.toString(16);
	        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
	      }
	      return WordToHexValue;
	    }
	
	    function Utf8Encode(string) {
	      string = string.replace(/\r\n/g,"\n");
	      var utftext = "";
	
	      for (var n = 0; n < string.length; n++) {
	        var c = string.charCodeAt(n);
	
	        if (c < 128) {
	          utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	          utftext += String.fromCharCode((c >> 6) | 192);
	          utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	          utftext += String.fromCharCode((c >> 12) | 224);
	          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	          utftext += String.fromCharCode((c & 63) | 128);
	        }
	      }
	      return utftext;
	    }
	
	    var x=[];
	    var k,AA,BB,CC,DD,a,b,c,d;
	    var S11=7, S12=12, S13=17, S14=22;
	    var S21=5, S22=9 , S23=14, S24=20;
	    var S31=4, S32=11, S33=16, S34=23;
	    var S41=6, S42=10, S43=15, S44=21;
	
	    string = Utf8Encode(string);
	
	    x = ConvertToWordArray(string);
	
	    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	
	    for (k=0;k<x.length;k+=16) {
	      AA=a; BB=b; CC=c; DD=d;
	      a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
	      d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
	      c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
	      b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
	      a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
	      d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
	      c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
	      b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
	      a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
	      d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
	      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
	      b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
	      a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
	      d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
	      c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
	      b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
	      a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
	      d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
	      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
	      b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
	      a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
	      d=GG(d,a,b,c,x[k+10],S22,0x2441453);
	      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
	      b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
	      a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
	      d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
	      c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
	      b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
	      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
	      d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
	      c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
	      b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
	      a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
	      d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
	      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
	      b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
	      a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
	      d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
	      c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
	      b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
	      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
	      d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
	      c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
	      b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
	      a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
	      d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
	      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
	      b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
	      a=II(a,b,c,d,x[k+0], S41,0xF4292244);
	      d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
	      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
	      b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
	      a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
	      d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
	      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
	      b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
	      a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
	      d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
	      c=II(c,d,a,b,x[k+6], S43,0xA3014314);
	      b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
	      a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
	      d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
	      c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
	      b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
	      a=AddUnsigned(a,AA);
	      b=AddUnsigned(b,BB);
	      c=AddUnsigned(c,CC);
	      d=AddUnsigned(d,DD);
	    }
	
	    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
	
	    return temp.toLowerCase();
	  }
	};
	
	SIP.Utils = Utils;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var levels = {
	  'error': 0,
	  'warn': 1,
	  'log': 2,
	  'debug': 3
	};
	
	module.exports = function (console) {
	
	var LoggerFactory = function () {
	  var logger,
	    level = 2,
	    builtinEnabled = true,
	    connector = null;
	
	    this.loggers = {};
	
	    logger = this.getLogger('sip.loggerfactory');
	
	
	  Object.defineProperties(this, {
	    builtinEnabled: {
	      get: function(){ return builtinEnabled; },
	      set: function(value){
	        if (typeof value === 'boolean') {
	          builtinEnabled = value;
	        } else {
	          logger.error('invalid "builtinEnabled" parameter value: '+ JSON.stringify(value));
	        }
	      }
	    },
	
	    level: {
	      get: function() {return level; },
	      set: function(value) {
	        if (value >= 0 && value <=3) {
	          level = value;
	        } else if (value > 3) {
	          level = 3;
	        } else if (levels.hasOwnProperty(value)) {
	          level = levels[value];
	        } else {
	          logger.error('invalid "level" parameter value: '+ JSON.stringify(value));
	        }
	      }
	    },
	
	    connector: {
	      get: function() {return connector; },
	      set: function(value){
	        if(value === null || value === "" || value === undefined) {
	          connector = null;
	        } else if (typeof value === 'function') {
	          connector = value;
	        } else {
	          logger.error('invalid "connector" parameter value: '+ JSON.stringify(value));
	        }
	      }
	    }
	  });
	};
	
	LoggerFactory.prototype.print = function(target, category, label, content) {
	  if (typeof content === 'string') {
	    var prefix = [new Date(), category];
	    if (label) {
	      prefix.push(label);
	    }
	    content = prefix.concat(content).join(' | ');
	  }
	  target.call(console, content);
	};
	
	function Logger (logger, category, label) {
	  this.logger = logger;
	  this.category = category;
	  this.label = label;
	}
	
	Object.keys(levels).forEach(function (targetName) {
	  Logger.prototype[targetName] = function (content) {
	    this.logger[targetName](this.category, this.label, content);
	  };
	
	  LoggerFactory.prototype[targetName] = function (category, label, content) {
	    if (this.level >= levels[targetName]) {
	      if (this.builtinEnabled) {
	        this.print(console[targetName], category, label, content);
	      }
	
	      if (this.connector) {
	        this.connector(targetName, category, label, content);
	      }
	    }
	  };
	});
	
	LoggerFactory.prototype.getLogger = function(category, label) {
	  var logger;
	
	  if (label && this.level === 3) {
	    return new Logger(this, category, label);
	  } else if (this.loggers[category]) {
	    return this.loggers[category];
	  } else {
	    logger = new Logger(this, category);
	    this.loggers[category] = logger;
	    return logger;
	  }
	};
	
	return LoggerFactory;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var NodeEventEmitter = __webpack_require__(19).EventEmitter;
	
	module.exports = function (console) {
	
	// Don't use `new SIP.EventEmitter()` for inheriting.
	// Use Object.create(SIP.EventEmitter.prototoype);
	function EventEmitter () {
	  NodeEventEmitter.call(this);
	}
	
	EventEmitter.prototype = Object.create(NodeEventEmitter.prototype, {
	  constructor: {
	    value: EventEmitter,
	    enumerable: false,
	    writable: true,
	    configurable: true
	  }
	});
	
	EventEmitter.prototype.off = function off (eventName, listener) {
	  var warning = '';
	  warning += 'SIP.EventEmitter#off is deprecated and may be removed in future SIP.js versions.\n';
	  warning += 'Please use removeListener or removeAllListeners instead.\n';
	  warning += 'See here for more details:\n';
	  warning += 'http://nodejs.org/api/events.html#events_emitter_removelistener_event_listener';
	  console.warn(warning);
	
	  if (arguments.length < 2) {
	    return this.removeAllListeners.apply(this, arguments);
	  } else {
	    return this.removeListener(eventName, listener);
	  }
	};
	
	return EventEmitter;
	
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview SIP Constants
	 */
	
	/**
	 * SIP Constants.
	 * @augments SIP
	 */
	
	module.exports = function (name, version) {
	return {
	  USER_AGENT: name +'/'+ version,
	
	  // SIP scheme
	  SIP:  'sip',
	  SIPS: 'sips',
	
	  // End and Failure causes
	  causes: {
	    // Generic error causes
	    CONNECTION_ERROR:         'Connection Error',
	    REQUEST_TIMEOUT:          'Request Timeout',
	    SIP_FAILURE_CODE:         'SIP Failure Code',
	    INTERNAL_ERROR:           'Internal Error',
	
	    // SIP error causes
	    BUSY:                     'Busy',
	    REJECTED:                 'Rejected',
	    REDIRECTED:               'Redirected',
	    UNAVAILABLE:              'Unavailable',
	    NOT_FOUND:                'Not Found',
	    ADDRESS_INCOMPLETE:       'Address Incomplete',
	    INCOMPATIBLE_SDP:         'Incompatible SDP',
	    AUTHENTICATION_ERROR:     'Authentication Error',
	    DIALOG_ERROR:             'Dialog Error',
	
	    // Session error causes
	    WEBRTC_NOT_SUPPORTED:     'WebRTC Not Supported',
	    WEBRTC_ERROR:             'WebRTC Error',
	    CANCELED:                 'Canceled',
	    NO_ANSWER:                'No Answer',
	    EXPIRES:                  'Expires',
	    NO_ACK:                   'No ACK',
	    NO_PRACK:                 'No PRACK',
	    USER_DENIED_MEDIA_ACCESS: 'User Denied Media Access',
	    BAD_MEDIA_DESCRIPTION:    'Bad Media Description',
	    RTP_TIMEOUT:              'RTP Timeout'
	  },
	
	  supported: {
	    UNSUPPORTED:        'none',
	    SUPPORTED:          'supported',
	    REQUIRED:           'required'
	  },
	
	  SIP_ERROR_CAUSES: {
	    REDIRECTED: [300,301,302,305,380],
	    BUSY: [486,600],
	    REJECTED: [403,603],
	    NOT_FOUND: [404,604],
	    UNAVAILABLE: [480,410,408,430],
	    ADDRESS_INCOMPLETE: [484],
	    INCOMPATIBLE_SDP: [488,606],
	    AUTHENTICATION_ERROR:[401,407]
	  },
	
	  // SIP Methods
	  ACK:        'ACK',
	  BYE:        'BYE',
	  CANCEL:     'CANCEL',
	  INFO:       'INFO',
	  INVITE:     'INVITE',
	  MESSAGE:    'MESSAGE',
	  NOTIFY:     'NOTIFY',
	  OPTIONS:    'OPTIONS',
	  REGISTER:   'REGISTER',
	  UPDATE:     'UPDATE',
	  SUBSCRIBE:  'SUBSCRIBE',
	  REFER:      'REFER',
	  PRACK:      'PRACK',
	
	  /* SIP Response Reasons
	   * DOC: http://www.iana.org/assignments/sip-parameters
	   * Copied from https://github.com/versatica/OverSIP/blob/master/lib/oversip/sip/constants.rb#L7
	   */
	  REASON_PHRASE: {
	    100: 'Trying',
	    180: 'Ringing',
	    181: 'Call Is Being Forwarded',
	    182: 'Queued',
	    183: 'Session Progress',
	    199: 'Early Dialog Terminated',  // draft-ietf-sipcore-199
	    200: 'OK',
	    202: 'Accepted',  // RFC 3265
	    204: 'No Notification',  //RFC 5839
	    300: 'Multiple Choices',
	    301: 'Moved Permanently',
	    302: 'Moved Temporarily',
	    305: 'Use Proxy',
	    380: 'Alternative Service',
	    400: 'Bad Request',
	    401: 'Unauthorized',
	    402: 'Payment Required',
	    403: 'Forbidden',
	    404: 'Not Found',
	    405: 'Method Not Allowed',
	    406: 'Not Acceptable',
	    407: 'Proxy Authentication Required',
	    408: 'Request Timeout',
	    410: 'Gone',
	    412: 'Conditional Request Failed',  // RFC 3903
	    413: 'Request Entity Too Large',
	    414: 'Request-URI Too Long',
	    415: 'Unsupported Media Type',
	    416: 'Unsupported URI Scheme',
	    417: 'Unknown Resource-Priority',  // RFC 4412
	    420: 'Bad Extension',
	    421: 'Extension Required',
	    422: 'Session Interval Too Small',  // RFC 4028
	    423: 'Interval Too Brief',
	    428: 'Use Identity Header',  // RFC 4474
	    429: 'Provide Referrer Identity',  // RFC 3892
	    430: 'Flow Failed',  // RFC 5626
	    433: 'Anonymity Disallowed',  // RFC 5079
	    436: 'Bad Identity-Info',  // RFC 4474
	    437: 'Unsupported Certificate',  // RFC 4744
	    438: 'Invalid Identity Header',  // RFC 4744
	    439: 'First Hop Lacks Outbound Support',  // RFC 5626
	    440: 'Max-Breadth Exceeded',  // RFC 5393
	    469: 'Bad Info Package',  // draft-ietf-sipcore-info-events
	    470: 'Consent Needed',  // RFC 5360
	    478: 'Unresolvable Destination',  // Custom code copied from Kamailio.
	    480: 'Temporarily Unavailable',
	    481: 'Call/Transaction Does Not Exist',
	    482: 'Loop Detected',
	    483: 'Too Many Hops',
	    484: 'Address Incomplete',
	    485: 'Ambiguous',
	    486: 'Busy Here',
	    487: 'Request Terminated',
	    488: 'Not Acceptable Here',
	    489: 'Bad Event',  // RFC 3265
	    491: 'Request Pending',
	    493: 'Undecipherable',
	    494: 'Security Agreement Required',  // RFC 3329
	    500: 'Internal Server Error',
	    501: 'Not Implemented',
	    502: 'Bad Gateway',
	    503: 'Service Unavailable',
	    504: 'Server Time-out',
	    505: 'Version Not Supported',
	    513: 'Message Too Large',
	    580: 'Precondition Failure',  // RFC 3312
	    600: 'Busy Everywhere',
	    603: 'Decline',
	    604: 'Does Not Exist Anywhere',
	    606: 'Not Acceptable'
	  },
	
	  /* SIP Option Tags
	   * DOC: http://www.iana.org/assignments/sip-parameters/sip-parameters.xhtml#sip-parameters-4
	   */
	  OPTION_TAGS: {
	    '100rel':                   true,  // RFC 3262
	    199:                        true,  // RFC 6228
	    answermode:                 true,  // RFC 5373
	    'early-session':            true,  // RFC 3959
	    eventlist:                  true,  // RFC 4662
	    explicitsub:                true,  // RFC-ietf-sipcore-refer-explicit-subscription-03
	    'from-change':              true,  // RFC 4916
	    'geolocation-http':         true,  // RFC 6442
	    'geolocation-sip':          true,  // RFC 6442
	    gin:                        true,  // RFC 6140
	    gruu:                       true,  // RFC 5627
	    histinfo:                   true,  // RFC 7044
	    ice:                        true,  // RFC 5768
	    join:                       true,  // RFC 3911
	    'multiple-refer':           true,  // RFC 5368
	    norefersub:                 true,  // RFC 4488
	    nosub:                      true,  // RFC-ietf-sipcore-refer-explicit-subscription-03
	    outbound:                   true,  // RFC 5626
	    path:                       true,  // RFC 3327
	    policy:                     true,  // RFC 6794
	    precondition:               true,  // RFC 3312
	    pref:                       true,  // RFC 3840
	    privacy:                    true,  // RFC 3323
	    'recipient-list-invite':    true,  // RFC 5366
	    'recipient-list-message':   true,  // RFC 5365
	    'recipient-list-subscribe': true,  // RFC 5367
	    replaces:                   true,  // RFC 3891
	    'resource-priority':        true,  // RFC 4412
	    'sdp-anat':                 true,  // RFC 4092
	    'sec-agree':                true,  // RFC 3329
	    tdialog:                    true,  // RFC 4538
	    timer:                      true,  // RFC 4028
	    uui:                        true   // RFC 7433
	  }
	};
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview Exceptions
	 */
	
	/**
	 * SIP Exceptions.
	 * @augments SIP
	 */
	module.exports = {
	  ConfigurationError: (function(){
	    var exception = function(parameter, value) {
	      this.code = 1;
	      this.name = 'CONFIGURATION_ERROR';
	      this.parameter = parameter;
	      this.value = value;
	      this.message = (!this.value)? 'Missing parameter: '+ this.parameter : 'Invalid value '+ JSON.stringify(this.value) +' for parameter "'+ this.parameter +'"';
	    };
	    exception.prototype = new Error();
	    return exception;
	  }()),
	
	  InvalidStateError: (function(){
	    var exception = function(status) {
	      this.code = 2;
	      this.name = 'INVALID_STATE_ERROR';
	      this.status = status;
	      this.message = 'Invalid status: ' + status;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }()),
	
	  NotSupportedError: (function(){
	    var exception = function(message) {
	      this.code = 3;
	      this.name = 'NOT_SUPPORTED_ERROR';
	      this.message = message;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }()),
	
	  GetDescriptionError: (function(){
	    var exception = function(message) {
	      this.code = 4;
	      this.name = 'GET_DESCRIPTION_ERROR';
	      this.message = message;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }())
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview SIP TIMERS
	 */
	
	/**
	 * @augments SIP
	 */
	var
	  T1 = 500,
	  T2 = 4000,
	  T4 = 5000;
	module.exports = function (timers) {
	  var Timers = {
	    T1: T1,
	    T2: T2,
	    T4: T4,
	    TIMER_B: 64 * T1,
	    TIMER_D: 0  * T1,
	    TIMER_F: 64 * T1,
	    TIMER_H: 64 * T1,
	    TIMER_I: 0  * T1,
	    TIMER_J: 0  * T1,
	    TIMER_K: 0  * T4,
	    TIMER_L: 64 * T1,
	    TIMER_M: 64 * T1,
	    TIMER_N: 64 * T1,
	    PROVISIONAL_RESPONSE_INTERVAL: 60000  // See RFC 3261 Section 13.3.1.1
	  };
	
	  ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']
	  .forEach(function (name) {
	    // can't just use timers[name].bind(timers) since it bypasses jasmine's
	    // clock-mocking
	    Timers[name] = function () {
	      return timers[name].apply(timers, arguments);
	    };
	  });
	
	  return Timers;
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview SIP Message Parser
	 */
	
	/**
	 * Extract and parse every header of a SIP message.
	 * @augments SIP
	 * @namespace
	 */
	module.exports = function (SIP) {
	var Parser;
	
	function getHeader(data, headerStart) {
	  var
	    // 'start' position of the header.
	    start = headerStart,
	    // 'end' position of the header.
	    end = 0,
	    // 'partial end' position of the header.
	    partialEnd = 0;
	
	  //End of message.
	  if (data.substring(start, start + 2).match(/(^\r\n)/)) {
	    return -2;
	  }
	
	  while(end === 0) {
	    // Partial End of Header.
	    partialEnd = data.indexOf('\r\n', start);
	
	    // 'indexOf' returns -1 if the value to be found never occurs.
	    if (partialEnd === -1) {
	      return partialEnd;
	    }
	
	    if(!data.substring(partialEnd + 2, partialEnd + 4).match(/(^\r\n)/) && data.charAt(partialEnd + 2).match(/(^\s+)/)) {
	      // Not the end of the message. Continue from the next position.
	      start = partialEnd + 2;
	    } else {
	      end = partialEnd;
	    }
	  }
	
	  return end;
	}
	
	function parseHeader(message, data, headerStart, headerEnd) {
	  var header, idx, length, parsed,
	    hcolonIndex = data.indexOf(':', headerStart),
	    headerName = data.substring(headerStart, hcolonIndex).trim(),
	    headerValue = data.substring(hcolonIndex + 1, headerEnd).trim();
	
	  // If header-field is well-known, parse it.
	  switch(headerName.toLowerCase()) {
	    case 'via':
	    case 'v':
	      message.addHeader('via', headerValue);
	      if(message.getHeaders('via').length === 1) {
	        parsed = message.parseHeader('Via');
	        if(parsed) {
	          message.via = parsed;
	          message.via_branch = parsed.branch;
	        }
	      } else {
	        parsed = 0;
	      }
	      break;
	    case 'from':
	    case 'f':
	      message.setHeader('from', headerValue);
	      parsed = message.parseHeader('from');
	      if(parsed) {
	        message.from = parsed;
	        message.from_tag = parsed.getParam('tag');
	      }
	      break;
	    case 'to':
	    case 't':
	      message.setHeader('to', headerValue);
	      parsed = message.parseHeader('to');
	      if(parsed) {
	        message.to = parsed;
	        message.to_tag = parsed.getParam('tag');
	      }
	      break;
	    case 'record-route':
	      parsed = SIP.Grammar.parse(headerValue, 'Record_Route');
	
	      if (parsed === -1) {
	        parsed = undefined;
	        break;
	      }
	
	      length = parsed.length;
	      for (idx = 0; idx < length; idx++) {
	        header = parsed[idx];
	        message.addHeader('record-route', headerValue.substring(header.position, header.offset));
	        message.headers['Record-Route'][message.getHeaders('record-route').length - 1].parsed = header.parsed;
	      }
	      break;
	    case 'call-id':
	    case 'i':
	      message.setHeader('call-id', headerValue);
	      parsed = message.parseHeader('call-id');
	      if(parsed) {
	        message.call_id = headerValue;
	      }
	      break;
	    case 'contact':
	    case 'm':
	      parsed = SIP.Grammar.parse(headerValue, 'Contact');
	
	      if (parsed === -1) {
	        parsed = undefined;
	        break;
	      }
	
	      length = parsed.length;
	      for (idx = 0; idx < length; idx++) {
	        header = parsed[idx];
	        message.addHeader('contact', headerValue.substring(header.position, header.offset));
	        message.headers['Contact'][message.getHeaders('contact').length - 1].parsed = header.parsed;
	      }
	      break;
	    case 'content-length':
	    case 'l':
	      message.setHeader('content-length', headerValue);
	      parsed = message.parseHeader('content-length');
	      break;
	    case 'content-type':
	    case 'c':
	      message.setHeader('content-type', headerValue);
	      parsed = message.parseHeader('content-type');
	      break;
	    case 'cseq':
	      message.setHeader('cseq', headerValue);
	      parsed = message.parseHeader('cseq');
	      if(parsed) {
	        message.cseq = parsed.value;
	      }
	      if(message instanceof SIP.IncomingResponse) {
	        message.method = parsed.method;
	      }
	      break;
	    case 'max-forwards':
	      message.setHeader('max-forwards', headerValue);
	      parsed = message.parseHeader('max-forwards');
	      break;
	    case 'www-authenticate':
	      message.setHeader('www-authenticate', headerValue);
	      parsed = message.parseHeader('www-authenticate');
	      break;
	    case 'proxy-authenticate':
	      message.setHeader('proxy-authenticate', headerValue);
	      parsed = message.parseHeader('proxy-authenticate');
	      break;
	    case 'refer-to':
	    case 'r':
	      message.setHeader('refer-to', headerValue);
	      parsed = message.parseHeader('refer-to');
	      if (parsed) {
	        message.refer_to = parsed;
	      }
	      break;
	    default:
	      // Do not parse this header.
	      message.setHeader(headerName, headerValue);
	      parsed = 0;
	  }
	
	  if (parsed === undefined) {
	    return {
	      error: 'error parsing header "'+ headerName +'"'
	    };
	  } else {
	    return true;
	  }
	}
	
	/** Parse SIP Message
	 * @function
	 * @param {String} message SIP message.
	 * @param {Object} logger object.
	 * @returns {SIP.IncomingRequest|SIP.IncomingResponse|undefined}
	 */
	Parser = {};
	Parser.parseMessage = function(data, ua) {
	  var message, firstLine, contentLength, bodyStart, parsed,
	    headerStart = 0,
	    headerEnd = data.indexOf('\r\n'),
	    logger = ua.getLogger('sip.parser');
	
	  if(headerEnd === -1) {
	    logger.warn('no CRLF found, not a SIP message, discarded');
	    return;
	  }
	
	  // Parse first line. Check if it is a Request or a Reply.
	  firstLine = data.substring(0, headerEnd);
	  parsed = SIP.Grammar.parse(firstLine, 'Request_Response');
	
	  if(parsed === -1) {
	    logger.warn('error parsing first line of SIP message: "' + firstLine + '"');
	    return;
	  } else if(!parsed.status_code) {
	    message = new SIP.IncomingRequest(ua);
	    message.method = parsed.method;
	    message.ruri = parsed.uri;
	  } else {
	    message = new SIP.IncomingResponse(ua);
	    message.status_code = parsed.status_code;
	    message.reason_phrase = parsed.reason_phrase;
	  }
	
	  message.data = data;
	  headerStart = headerEnd + 2;
	
	  /* Loop over every line in data. Detect the end of each header and parse
	  * it or simply add to the headers collection.
	  */
	  while(true) {
	    headerEnd = getHeader(data, headerStart);
	
	    // The SIP message has normally finished.
	    if(headerEnd === -2) {
	      bodyStart = headerStart + 2;
	      break;
	    }
	    // data.indexOf returned -1 due to a malformed message.
	    else if(headerEnd === -1) {
	      logger.error('malformed message');
	      return;
	    }
	
	    parsed = parseHeader(message, data, headerStart, headerEnd);
	
	    if(parsed !== true) {
	      logger.error(parsed.error);
	      return;
	    }
	
	    headerStart = headerEnd + 2;
	  }
	
	  /* RFC3261 18.3.
	   * If there are additional bytes in the transport packet
	   * beyond the end of the body, they MUST be discarded.
	   */
	  if(message.hasHeader('content-length')) {
	    contentLength = message.getHeader('content-length');
	    message.body = data.substr(bodyStart, contentLength);
	  } else {
	    message.body = data.substring(bodyStart);
	  }
	
	  return message;
	};
	
	SIP.Parser = Parser;
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview SIP Message
	 */
	
	module.exports = function (SIP) {
	var
	  OutgoingRequest,
	  IncomingMessage,
	  IncomingRequest,
	  IncomingResponse;
	
	function getSupportedHeader (request) {
	  var allowUnregistered = request.ua.configuration.hackAllowUnregisteredOptionTags;
	  var optionTags = [];
	  var optionTagSet = {};
	
	  if (request.method === SIP.C.REGISTER) {
	    optionTags.push('path', 'gruu');
	  } else if (request.method === SIP.C.INVITE &&
	             (request.ua.contact.pub_gruu || request.ua.contact.temp_gruu)) {
	    optionTags.push('gruu');
	  }
	
	  if (request.ua.configuration.rel100 === SIP.C.supported.SUPPORTED) {
	    optionTags.push('100rel');
	  }
	  if (request.ua.configuration.replaces === SIP.C.supported.SUPPORTED) {
	    optionTags.push('replaces');
	  }
	
	  optionTags.push('outbound');
	
	  optionTags = optionTags.concat(request.ua.configuration.extraSupported);
	
	  optionTags = optionTags.filter(function(optionTag) {
	    var registered = SIP.C.OPTION_TAGS[optionTag];
	    var unique = !optionTagSet[optionTag];
	    optionTagSet[optionTag] = true;
	    return (registered || allowUnregistered) && unique;
	  });
	
	  return 'Supported: ' + optionTags.join(', ') + '\r\n';
	}
	
	/**
	 * @augments SIP
	 * @class Class for outgoing SIP request.
	 * @param {String} method request method
	 * @param {String} ruri request uri
	 * @param {SIP.UA} ua
	 * @param {Object} params parameters that will have priority over ua.configuration parameters:
	 * <br>
	 *  - cseq, call_id, from_tag, from_uri, from_displayName, to_uri, to_tag, route_set
	 * @param {Object} [headers] extra headers
	 * @param {String} [body]
	 */
	OutgoingRequest = function(method, ruri, ua, params, extraHeaders, body) {
	  var
	    to,
	    from,
	    call_id,
	    cseq,
	    to_uri,
	    from_uri;
	
	  params = params || {};
	
	  // Mandatory parameters check
	  if(!method || !ruri || !ua) {
	    return null;
	  }
	
	  this.logger = ua.getLogger('sip.sipmessage');
	  this.ua = ua;
	  this.headers = {};
	  this.method = method;
	  this.ruri = ruri;
	  this.body = body;
	  this.extraHeaders = (extraHeaders || []).slice();
	  this.statusCode = params.status_code;
	  this.reasonPhrase = params.reason_phrase;
	
	  // Fill the Common SIP Request Headers
	
	  // Route
	  if (params.route_set) {
	    this.setHeader('route', params.route_set);
	  } else if (ua.configuration.usePreloadedRoute){
	    this.setHeader('route', ua.transport.server.sip_uri);
	  }
	
	  // Via
	  // Empty Via header. Will be filled by the client transaction.
	  this.setHeader('via', '');
	
	  // Max-Forwards
	  this.setHeader('max-forwards', SIP.UA.C.MAX_FORWARDS);
	
	  // To
	  to_uri = params.to_uri || ruri;
	  to = (params.to_displayName || params.to_displayName === 0) ? '"' + params.to_displayName + '" ' : '';
	  to += '<' + (to_uri && to_uri.toRaw ? to_uri.toRaw() : to_uri) + '>';
	  to += params.to_tag ? ';tag=' + params.to_tag : '';
	  this.to = new SIP.NameAddrHeader.parse(to);
	  this.setHeader('to', to);
	
	  // From
	  from_uri = params.from_uri || ua.configuration.uri;
	  if (params.from_displayName || params.from_displayName === 0) {
	    from = '"' + params.from_displayName + '" ';
	  } else if (ua.configuration.displayName) {
	    from = '"' + ua.configuration.displayName + '" ';
	  } else {
	    from = '';
	  }
	  from += '<' + (from_uri && from_uri.toRaw ? from_uri.toRaw() : from_uri) + '>;tag=';
	  from += params.from_tag || SIP.Utils.newTag();
	  this.from = new SIP.NameAddrHeader.parse(from);
	  this.setHeader('from', from);
	
	  // Call-ID
	  call_id = params.call_id || (ua.configuration.sipjsId + SIP.Utils.createRandomToken(15));
	  this.call_id = call_id;
	  this.setHeader('call-id', call_id);
	
	  // CSeq
	  cseq = params.cseq || Math.floor(Math.random() * 10000);
	  this.cseq = cseq;
	  this.setHeader('cseq', cseq + ' ' + method);
	};
	
	OutgoingRequest.prototype = {
	  /**
	   * Replace the the given header by the given value.
	   * @param {String} name header name
	   * @param {String | Array} value header value
	   */
	  setHeader: function(name, value) {
	    this.headers[SIP.Utils.headerize(name)] = (value instanceof Array) ? value : [value];
	  },
	
	  /**
	   * Get the value of the given header name at the given position.
	   * @param {String} name header name
	   * @returns {String|undefined} Returns the specified header, undefined if header doesn't exist.
	   */
	  getHeader: function(name) {
	    var regexp, idx,
	      length = this.extraHeaders.length,
	      header = this.headers[SIP.Utils.headerize(name)];
	
	    if(header) {
	      if(header[0]) {
	        return header[0];
	      }
	    } else {
	      regexp = new RegExp('^\\s*' + name + '\\s*:','i');
	      for (idx = 0; idx < length; idx++) {
	        header = this.extraHeaders[idx];
	        if (regexp.test(header)) {
	          return header.substring(header.indexOf(':')+1).trim();
	        }
	      }
	    }
	
	    return;
	  },
	
	  /**
	   * Get the header/s of the given name.
	   * @param {String} name header name
	   * @returns {Array} Array with all the headers of the specified name.
	   */
	  getHeaders: function(name) {
	    var idx, length, regexp,
	      header = this.headers[SIP.Utils.headerize(name)],
	      result = [];
	
	    if(header) {
	      length = header.length;
	      for (idx = 0; idx < length; idx++) {
	        result.push(header[idx]);
	      }
	      return result;
	    } else {
	      length = this.extraHeaders.length;
	      regexp = new RegExp('^\\s*' + name + '\\s*:','i');
	      for (idx = 0; idx < length; idx++) {
	        header = this.extraHeaders[idx];
	        if (regexp.test(header)) {
	          result.push(header.substring(header.indexOf(':')+1).trim());
	        }
	      }
	      return result;
	    }
	  },
	
	  /**
	   * Verify the existence of the given header.
	   * @param {String} name header name
	   * @returns {boolean} true if header with given name exists, false otherwise
	   */
	  hasHeader: function(name) {
	    var regexp, idx,
	      length = this.extraHeaders.length;
	
	    if (this.headers[SIP.Utils.headerize(name)]) {
	      return true;
	    } else {
	      regexp = new RegExp('^\\s*' + name + '\\s*:','i');
	      for (idx = 0; idx < length; idx++) {
	        if (regexp.test(this.extraHeaders[idx])) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  },
	
	  toString: function() {
	    var msg = '', header, length, idx;
	
	    msg += this.method + ' ' + (this.ruri.toRaw ? this.ruri.toRaw() : this.ruri) + ' SIP/2.0\r\n';
	
	    for (header in this.headers) {
	      length = this.headers[header].length;
	      for (idx = 0; idx < length; idx++) {
	        msg += header + ': ' + this.headers[header][idx] + '\r\n';
	      }
	    }
	
	    length = this.extraHeaders.length;
	    for (idx = 0; idx < length; idx++) {
	      msg += this.extraHeaders[idx].trim() +'\r\n';
	    }
	
	    msg += getSupportedHeader(this);
	    msg += 'User-Agent: ' + this.ua.configuration.userAgentString +'\r\n';
	
	    if(this.body) {
	      length = SIP.Utils.str_utf8_length(this.body);
	      msg += 'Content-Length: ' + length + '\r\n\r\n';
	      msg += this.body;
	    } else {
	      msg += 'Content-Length: 0\r\n\r\n';
	    }
	
	    return msg;
	  }
	};
	
	/**
	 * @augments SIP
	 * @class Class for incoming SIP message.
	 */
	IncomingMessage = function(){
	  this.data = null;
	  this.headers = null;
	  this.method =  null;
	  this.via = null;
	  this.via_branch = null;
	  this.call_id = null;
	  this.cseq = null;
	  this.from = null;
	  this.from_tag = null;
	  this.to = null;
	  this.to_tag = null;
	  this.body = null;
	};
	
	IncomingMessage.prototype = {
	  /**
	  * Insert a header of the given name and value into the last position of the
	  * header array.
	  * @param {String} name header name
	  * @param {String} value header value
	  */
	  addHeader: function(name, value) {
	    var header = { raw: value };
	
	    name = SIP.Utils.headerize(name);
	
	    if(this.headers[name]) {
	      this.headers[name].push(header);
	    } else {
	      this.headers[name] = [header];
	    }
	  },
	
	  /**
	   * Get the value of the given header name at the given position.
	   * @param {String} name header name
	   * @returns {String|undefined} Returns the specified header, null if header doesn't exist.
	   */
	  getHeader: function(name) {
	    var header = this.headers[SIP.Utils.headerize(name)];
	
	    if(header) {
	      if(header[0]) {
	        return header[0].raw;
	      }
	    } else {
	      return;
	    }
	  },
	
	  /**
	   * Get the header/s of the given name.
	   * @param {String} name header name
	   * @returns {Array} Array with all the headers of the specified name.
	   */
	  getHeaders: function(name) {
	    var idx, length,
	      header = this.headers[SIP.Utils.headerize(name)],
	      result = [];
	
	    if(!header) {
	      return [];
	    }
	
	    length = header.length;
	    for (idx = 0; idx < length; idx++) {
	      result.push(header[idx].raw);
	    }
	
	    return result;
	  },
	
	  /**
	   * Verify the existence of the given header.
	   * @param {String} name header name
	   * @returns {boolean} true if header with given name exists, false otherwise
	   */
	  hasHeader: function(name) {
	    return(this.headers[SIP.Utils.headerize(name)]) ? true : false;
	  },
	
	  /**
	  * Parse the given header on the given index.
	  * @param {String} name header name
	  * @param {Number} [idx=0] header index
	  * @returns {Object|undefined} Parsed header object, undefined if the header is not present or in case of a parsing error.
	  */
	  parseHeader: function(name, idx) {
	    var header, value, parsed;
	
	    name = SIP.Utils.headerize(name);
	
	    idx = idx || 0;
	
	    if(!this.headers[name]) {
	      this.logger.log('header "' + name + '" not present');
	      return;
	    } else if(idx >= this.headers[name].length) {
	      this.logger.log('not so many "' + name + '" headers present');
	      return;
	    }
	
	    header = this.headers[name][idx];
	    value = header.raw;
	
	    if(header.parsed) {
	      return header.parsed;
	    }
	
	    //substitute '-' by '_' for grammar rule matching.
	    parsed = SIP.Grammar.parse(value, name.replace(/-/g, '_'));
	
	    if(parsed === -1) {
	      this.headers[name].splice(idx, 1); //delete from headers
	      this.logger.warn('error parsing "' + name + '" header field with value "' + value + '"');
	      return;
	    } else {
	      header.parsed = parsed;
	      return parsed;
	    }
	  },
	
	  /**
	   * Message Header attribute selector. Alias of parseHeader.
	   * @param {String} name header name
	   * @param {Number} [idx=0] header index
	   * @returns {Object|undefined} Parsed header object, undefined if the header is not present or in case of a parsing error.
	   *
	   * @example
	   * message.s('via',3).port
	   */
	  s: function(name, idx) {
	    return this.parseHeader(name, idx);
	  },
	
	  /**
	  * Replace the value of the given header by the value.
	  * @param {String} name header name
	  * @param {String} value header value
	  */
	  setHeader: function(name, value) {
	    var header = { raw: value };
	    this.headers[SIP.Utils.headerize(name)] = [header];
	  },
	
	  toString: function() {
	    return this.data;
	  }
	};
	
	/**
	 * @augments IncomingMessage
	 * @class Class for incoming SIP request.
	 */
	IncomingRequest = function(ua) {
	  this.logger = ua.getLogger('sip.sipmessage');
	  this.ua = ua;
	  this.headers = {};
	  this.ruri = null;
	  this.transport = null;
	  this.server_transaction = null;
	};
	IncomingRequest.prototype = new IncomingMessage();
	
	/**
	* Stateful reply.
	* @param {Number} code status code
	* @param {String} reason reason phrase
	* @param {Object} headers extra headers
	* @param {String} body body
	* @param {Function} [onSuccess] onSuccess callback
	* @param {Function} [onFailure] onFailure callback
	*/
	IncomingRequest.prototype.reply = function(code, reason, extraHeaders, body, onSuccess, onFailure) {
	  var rr, vias, length, idx, response,
	    to = this.getHeader('To'),
	    r = 0,
	    v = 0;
	
	  response = SIP.Utils.buildStatusLine(code, reason);
	  extraHeaders = (extraHeaders || []).slice();
	
	  if(this.method === SIP.C.INVITE && code > 100 && code <= 200) {
	    rr = this.getHeaders('record-route');
	    length = rr.length;
	
	    for(r; r < length; r++) {
	      response += 'Record-Route: ' + rr[r] + '\r\n';
	    }
	  }
	
	  vias = this.getHeaders('via');
	  length = vias.length;
	
	  for(v; v < length; v++) {
	    response += 'Via: ' + vias[v] + '\r\n';
	  }
	
	  if(!this.to_tag && code > 100) {
	    to += ';tag=' + SIP.Utils.newTag();
	  } else if(this.to_tag && !this.s('to').hasParam('tag')) {
	    to += ';tag=' + this.to_tag;
	  }
	
	  response += 'To: ' + to + '\r\n';
	  response += 'From: ' + this.getHeader('From') + '\r\n';
	  response += 'Call-ID: ' + this.call_id + '\r\n';
	  response += 'CSeq: ' + this.cseq + ' ' + this.method + '\r\n';
	
	  length = extraHeaders.length;
	  for (idx = 0; idx < length; idx++) {
	    response += extraHeaders[idx].trim() +'\r\n';
	  }
	
	  response += getSupportedHeader(this);
	  response += 'User-Agent: ' + this.ua.configuration.userAgentString +'\r\n';
	
	  if(body) {
	    length = SIP.Utils.str_utf8_length(body);
	    response += 'Content-Type: application/sdp\r\n';
	    response += 'Content-Length: ' + length + '\r\n\r\n';
	    response += body;
	  } else {
	    response += 'Content-Length: ' + 0 + '\r\n\r\n';
	  }
	
	  this.server_transaction.receiveResponse(code, response).then(onSuccess, onFailure);
	
	  return response;
	};
	
	/**
	* Stateless reply.
	* @param {Number} code status code
	* @param {String} reason reason phrase
	*/
	IncomingRequest.prototype.reply_sl = function(code, reason) {
	  var to, response,
	    v = 0,
	    vias = this.getHeaders('via'),
	    length = vias.length;
	
	  response = SIP.Utils.buildStatusLine(code, reason);
	
	  for(v; v < length; v++) {
	    response += 'Via: ' + vias[v] + '\r\n';
	  }
	
	  to = this.getHeader('To');
	
	  if(!this.to_tag && code > 100) {
	    to += ';tag=' + SIP.Utils.newTag();
	  } else if(this.to_tag && !this.s('to').hasParam('tag')) {
	    to += ';tag=' + this.to_tag;
	  }
	
	  response += 'To: ' + to + '\r\n';
	  response += 'From: ' + this.getHeader('From') + '\r\n';
	  response += 'Call-ID: ' + this.call_id + '\r\n';
	  response += 'CSeq: ' + this.cseq + ' ' + this.method + '\r\n';
	  response += 'User-Agent: ' + this.ua.configuration.userAgentString +'\r\n';
	  response += 'Content-Length: ' + 0 + '\r\n\r\n';
	
	  this.transport.send(response);
	};
	
	
	/**
	 * @augments IncomingMessage
	 * @class Class for incoming SIP response.
	 */
	IncomingResponse = function(ua) {
	  this.logger = ua.getLogger('sip.sipmessage');
	  this.headers = {};
	  this.status_code = null;
	  this.reason_phrase = null;
	};
	IncomingResponse.prototype = new IncomingMessage();
	
	SIP.OutgoingRequest = OutgoingRequest;
	SIP.IncomingRequest = IncomingRequest;
	SIP.IncomingResponse = IncomingResponse;
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview SIP URI
	 */
	
	/**
	 * @augments SIP
	 * @class Class creating a SIP URI.
	 *
	 * @param {String} [scheme]
	 * @param {String} [user]
	 * @param {String} host
	 * @param {String} [port]
	 * @param {Object} [parameters]
	 * @param {Object} [headers]
	 *
	 */
	module.exports = function (SIP) {
	var URI;
	
	URI = function(scheme, user, host, port, parameters, headers) {
	  var param, header, raw, normal;
	
	  // Checks
	  if(!host) {
	    throw new TypeError('missing or invalid "host" parameter');
	  }
	
	  // Initialize parameters
	  scheme = scheme || SIP.C.SIP;
	  this.parameters = {};
	  this.headers = {};
	
	  for (param in parameters) {
	    this.setParam(param, parameters[param]);
	  }
	
	  for (header in headers) {
	    this.setHeader(header, headers[header]);
	  }
	
	  // Raw URI
	  raw = {
	    scheme: scheme,
	    user: user,
	    host: host,
	    port: port
	  };
	
	  // Normalized URI
	  normal = {
	    scheme: scheme.toLowerCase(),
	    user: user,
	    host: host.toLowerCase(),
	    port: port
	  };
	
	  Object.defineProperties(this, {
	    _normal: {
	      get: function() { return normal; }
	    },
	
	    _raw: {
	      get: function() { return raw; }
	    },
	
	    scheme: {
	      get: function() { return normal.scheme; },
	      set: function(value) {
	        raw.scheme = value;
	        normal.scheme = value.toLowerCase();
	      }
	    },
	
	    user: {
	      get: function() { return normal.user; },
	      set: function(value) {
	        normal.user = raw.user = value;
	      }
	    },
	
	    host: {
	      get: function() { return normal.host; },
	      set: function(value) {
	        raw.host = value;
	        normal.host = value.toLowerCase();
	      }
	    },
	
	    aor: {
	      get: function() { return normal.user + '@' + normal.host; }
	    },
	
	    port: {
	      get: function() { return normal.port; },
	      set: function(value) {
	        normal.port = raw.port = value === 0 ? value : (parseInt(value,10) || null);
	      }
	    }
	  });
	};
	
	URI.prototype = {
	  setParam: function(key, value) {
	    if(key) {
	      this.parameters[key.toLowerCase()] = (typeof value === 'undefined' || value === null) ? null : value.toString().toLowerCase();
	    }
	  },
	
	  getParam: function(key) {
	    if(key) {
	      return this.parameters[key.toLowerCase()];
	    }
	  },
	
	  hasParam: function(key) {
	    if(key) {
	      return (this.parameters.hasOwnProperty(key.toLowerCase()) && true) || false;
	    }
	  },
	
	  deleteParam: function(parameter) {
	    var value;
	    parameter = parameter.toLowerCase();
	    if (this.parameters.hasOwnProperty(parameter)) {
	      value = this.parameters[parameter];
	      delete this.parameters[parameter];
	      return value;
	    }
	  },
	
	  clearParams: function() {
	    this.parameters = {};
	  },
	
	  setHeader: function(name, value) {
	    this.headers[SIP.Utils.headerize(name)] = (value instanceof Array) ? value : [value];
	  },
	
	  getHeader: function(name) {
	    if(name) {
	      return this.headers[SIP.Utils.headerize(name)];
	    }
	  },
	
	  hasHeader: function(name) {
	    if(name) {
	      return (this.headers.hasOwnProperty(SIP.Utils.headerize(name)) && true) || false;
	    }
	  },
	
	  deleteHeader: function(header) {
	    var value;
	    header = SIP.Utils.headerize(header);
	    if(this.headers.hasOwnProperty(header)) {
	      value = this.headers[header];
	      delete this.headers[header];
	      return value;
	    }
	  },
	
	  clearHeaders: function() {
	    this.headers = {};
	  },
	
	  clone: function() {
	    return new URI(
	      this._raw.scheme,
	      this._raw.user,
	      this._raw.host,
	      this._raw.port,
	      JSON.parse(JSON.stringify(this.parameters)),
	      JSON.parse(JSON.stringify(this.headers)));
	  },
	
	  toRaw: function() {
	    return this._toString(this._raw);
	  },
	
	  toString: function() {
	    return this._toString(this._normal);
	  },
	
	  _toString: function(uri) {
	    var header, parameter, idx, uriString, headers = [];
	
	    uriString  = uri.scheme + ':';
	    // add slashes if it's not a sip(s) URI
	    if (!uri.scheme.toLowerCase().match("^sips?$")) {
	      uriString += "//";
	    }
	    if (uri.user) {
	      uriString += SIP.Utils.escapeUser(uri.user) + '@';
	    }
	    uriString += uri.host;
	    if (uri.port || uri.port === 0) {
	      uriString += ':' + uri.port;
	    }
	
	    for (parameter in this.parameters) {
	      uriString += ';' + parameter;
	
	      if (this.parameters[parameter] !== null) {
	        uriString += '='+ this.parameters[parameter];
	      }
	    }
	
	    for(header in this.headers) {
	      for(idx in this.headers[header]) {
	        headers.push(header + '=' + this.headers[header][idx]);
	      }
	    }
	
	    if (headers.length > 0) {
	      uriString += '?' + headers.join('&');
	    }
	
	    return uriString;
	  }
	};
	
	
	/**
	  * Parse the given string and returns a SIP.URI instance or undefined if
	  * it is an invalid URI.
	  * @public
	  * @param {String} uri
	  */
	URI.parse = function(uri) {
	  uri = SIP.Grammar.parse(uri,'SIP_URI');
	
	  if (uri !== -1) {
	    return uri;
	  } else {
	    return undefined;
	  }
	};
	
	SIP.URI = URI;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview SIP NameAddrHeader
	 */
	
	/**
	 * @augments SIP
	 * @class Class creating a Name Address SIP header.
	 *
	 * @param {SIP.URI} uri
	 * @param {String} [displayName]
	 * @param {Object} [parameters]
	 *
	 */
	module.exports = function (SIP) {
	var NameAddrHeader;
	
	NameAddrHeader = function(uri, displayName, parameters) {
	  var param;
	
	  // Checks
	  if(!uri || !(uri instanceof SIP.URI)) {
	    throw new TypeError('missing or invalid "uri" parameter');
	  }
	
	  // Initialize parameters
	  this.uri = uri;
	  this.parameters = {};
	
	  for (param in parameters) {
	    this.setParam(param, parameters[param]);
	  }
	
	  Object.defineProperties(this, {
	    friendlyName: {
	      get: function() { return this.displayName || uri.aor; }
	    },
	
	    displayName: {
	      get: function() { return displayName; },
	      set: function(value) {
	        displayName = (value === 0) ? '0' : value;
	      }
	    }
	  });
	};
	NameAddrHeader.prototype = {
	  setParam: function (key, value) {
	    if(key) {
	      this.parameters[key.toLowerCase()] = (typeof value === 'undefined' || value === null) ? null : value.toString();
	    }
	  },
	  getParam: SIP.URI.prototype.getParam,
	  hasParam: SIP.URI.prototype.hasParam,
	  deleteParam: SIP.URI.prototype.deleteParam,
	  clearParams: SIP.URI.prototype.clearParams,
	
	  clone: function() {
	    return new NameAddrHeader(
	      this.uri.clone(),
	      this.displayName,
	      JSON.parse(JSON.stringify(this.parameters)));
	  },
	
	  toString: function() {
	    var body, parameter;
	
	    body  = (this.displayName || this.displayName === 0) ? '"' + this.displayName + '" ' : '';
	    body += '<' + this.uri.toString() + '>';
	
	    for (parameter in this.parameters) {
	      body += ';' + parameter;
	
	      if (this.parameters[parameter] !== null) {
	        body += '='+ this.parameters[parameter];
	      }
	    }
	
	    return body;
	  }
	};
	
	
	/**
	  * Parse the given string and returns a SIP.NameAddrHeader instance or undefined if
	  * it is an invalid NameAddrHeader.
	  * @public
	  * @param {String} name_addr_header
	  */
	NameAddrHeader.parse = function(name_addr_header) {
	  name_addr_header = SIP.Grammar.parse(name_addr_header,'Name_Addr_Header');
	
	  if (name_addr_header !== -1) {
	    return name_addr_header;
	  } else {
	    return undefined;
	  }
	};
	
	SIP.NameAddrHeader = NameAddrHeader;
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview SIP Transactions
	 */
	
	/**
	 * SIP Transactions module.
	 * @augments SIP
	 */
	module.exports = function (SIP) {
	var
	  C = {
	    // Transaction states
	    STATUS_TRYING:     1,
	    STATUS_PROCEEDING: 2,
	    STATUS_CALLING:    3,
	    STATUS_ACCEPTED:   4,
	    STATUS_COMPLETED:  5,
	    STATUS_TERMINATED: 6,
	    STATUS_CONFIRMED:  7,
	
	    // Transaction types
	    NON_INVITE_CLIENT: 'nict',
	    NON_INVITE_SERVER: 'nist',
	    INVITE_CLIENT: 'ict',
	    INVITE_SERVER: 'ist'
	  };
	
	function buildViaHeader (request_sender, transport, id) {
	  var via;
	  via = 'SIP/2.0/' + (request_sender.ua.configuration.hackViaTcp ? 'TCP' : transport.server.scheme);
	  via += ' ' + request_sender.ua.configuration.viaHost + ';branch=' + id;
	  if (request_sender.ua.configuration.forceRport) {
	    via += ';rport';
	  }
	  return via;
	}
	
	/**
	* @augments SIP.Transactions
	* @class Non Invite Client Transaction
	* @param {SIP.RequestSender} request_sender
	* @param {SIP.OutgoingRequest} request
	* @param {SIP.Transport} transport
	*/
	var NonInviteClientTransaction = function(request_sender, request, transport) {
	  var via;
	
	  this.type = C.NON_INVITE_CLIENT;
	  this.transport = transport;
	  this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
	  this.request_sender = request_sender;
	  this.request = request;
	
	  this.logger = request_sender.ua.getLogger('sip.transaction.nict', this.id);
	
	  via = buildViaHeader(request_sender, transport, this.id);
	  this.request.setHeader('via', via);
	
	  this.request_sender.ua.newTransaction(this);
	};
	NonInviteClientTransaction.prototype = Object.create(SIP.EventEmitter.prototype);
	
	NonInviteClientTransaction.prototype.stateChanged = function(state) {
	  this.state = state;
	  this.emit('stateChanged');
	};
	
	NonInviteClientTransaction.prototype.send = function() {
	  var tr = this;
	
	  this.stateChanged(C.STATUS_TRYING);
	  this.F = SIP.Timers.setTimeout(tr.timer_F.bind(tr), SIP.Timers.TIMER_F);
	
	  if(!this.transport.send(this.request)) {
	    this.onTransportError();
	  }
	};
	
	NonInviteClientTransaction.prototype.onTransportError = function() {
	  this.logger.log('transport error occurred, deleting non-INVITE client transaction ' + this.id);
	  SIP.Timers.clearTimeout(this.F);
	  SIP.Timers.clearTimeout(this.K);
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.request_sender.ua.destroyTransaction(this);
	  this.request_sender.onTransportError();
	};
	
	NonInviteClientTransaction.prototype.timer_F = function() {
	  this.logger.log('Timer F expired for non-INVITE client transaction ' + this.id);
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.request_sender.ua.destroyTransaction(this);
	  this.request_sender.onRequestTimeout();
	};
	
	NonInviteClientTransaction.prototype.timer_K = function() {
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.request_sender.ua.destroyTransaction(this);
	};
	
	NonInviteClientTransaction.prototype.receiveResponse = function(response) {
	  var
	    tr = this,
	    status_code = response.status_code;
	
	  if(status_code < 200) {
	    switch(this.state) {
	      case C.STATUS_TRYING:
	      case C.STATUS_PROCEEDING:
	        this.stateChanged(C.STATUS_PROCEEDING);
	        this.request_sender.receiveResponse(response);
	        break;
	    }
	  } else {
	    switch(this.state) {
	      case C.STATUS_TRYING:
	      case C.STATUS_PROCEEDING:
	        this.stateChanged(C.STATUS_COMPLETED);
	        SIP.Timers.clearTimeout(this.F);
	
	        if(status_code === 408) {
	          this.request_sender.onRequestTimeout();
	        } else {
	          this.request_sender.receiveResponse(response);
	        }
	
	        this.K = SIP.Timers.setTimeout(tr.timer_K.bind(tr), SIP.Timers.TIMER_K);
	        break;
	      case C.STATUS_COMPLETED:
	        break;
	    }
	  }
	};
	
	
	
	/**
	* @augments SIP.Transactions
	* @class Invite Client Transaction
	* @param {SIP.RequestSender} request_sender
	* @param {SIP.OutgoingRequest} request
	* @param {SIP.Transport} transport
	*/
	var InviteClientTransaction = function(request_sender, request, transport) {
	  var via,
	    tr = this;
	
	  this.type = C.INVITE_CLIENT;
	  this.transport = transport;
	  this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
	  this.request_sender = request_sender;
	  this.request = request;
	
	  this.logger = request_sender.ua.getLogger('sip.transaction.ict', this.id);
	
	  via = buildViaHeader(request_sender, transport, this.id);
	  this.request.setHeader('via', via);
	
	  this.request_sender.ua.newTransaction(this);
	
	  // Add the cancel property to the request.
	  //Will be called from the request instance, not the transaction itself.
	  this.request.cancel = function(reason) {
	    tr.cancel_request(tr, reason);
	  };
	};
	InviteClientTransaction.prototype = Object.create(SIP.EventEmitter.prototype);
	
	InviteClientTransaction.prototype.stateChanged = function(state) {
	  this.state = state;
	  this.emit('stateChanged');
	};
	
	InviteClientTransaction.prototype.send = function() {
	  var tr = this;
	  this.stateChanged(C.STATUS_CALLING);
	  this.B = SIP.Timers.setTimeout(tr.timer_B.bind(tr), SIP.Timers.TIMER_B);
	
	  if(!this.transport.send(this.request)) {
	    this.onTransportError();
	  }
	};
	
	InviteClientTransaction.prototype.onTransportError = function() {
	  this.logger.log('transport error occurred, deleting INVITE client transaction ' + this.id);
	  SIP.Timers.clearTimeout(this.B);
	  SIP.Timers.clearTimeout(this.D);
	  SIP.Timers.clearTimeout(this.M);
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.request_sender.ua.destroyTransaction(this);
	
	  if (this.state !== C.STATUS_ACCEPTED) {
	    this.request_sender.onTransportError();
	  }
	};
	
	// RFC 6026 7.2
	InviteClientTransaction.prototype.timer_M = function() {
	  this.logger.log('Timer M expired for INVITE client transaction ' + this.id);
	
	  if(this.state === C.STATUS_ACCEPTED) {
	    SIP.Timers.clearTimeout(this.B);
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.request_sender.ua.destroyTransaction(this);
	  }
	};
	
	// RFC 3261 17.1.1
	InviteClientTransaction.prototype.timer_B = function() {
	  this.logger.log('Timer B expired for INVITE client transaction ' + this.id);
	  if(this.state === C.STATUS_CALLING) {
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.request_sender.ua.destroyTransaction(this);
	    this.request_sender.onRequestTimeout();
	  }
	};
	
	InviteClientTransaction.prototype.timer_D = function() {
	  this.logger.log('Timer D expired for INVITE client transaction ' + this.id);
	  SIP.Timers.clearTimeout(this.B);
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.request_sender.ua.destroyTransaction(this);
	};
	
	InviteClientTransaction.prototype.sendACK = function(response) {
	  var tr = this;
	
	  this.ack = 'ACK ' + this.request.ruri + ' SIP/2.0\r\n';
	  this.ack += 'Via: ' + this.request.headers['Via'].toString() + '\r\n';
	
	  if(this.request.headers['Route']) {
	    this.ack += 'Route: ' + this.request.headers['Route'].toString() + '\r\n';
	  }
	
	  this.ack += 'To: ' + response.getHeader('to') + '\r\n';
	  this.ack += 'From: ' + this.request.headers['From'].toString() + '\r\n';
	  this.ack += 'Call-ID: ' + this.request.headers['Call-ID'].toString() + '\r\n';
	  this.ack += 'Content-Length: 0\r\n';
	  this.ack += 'CSeq: ' + this.request.headers['CSeq'].toString().split(' ')[0];
	  this.ack += ' ACK\r\n\r\n';
	
	  this.D = SIP.Timers.setTimeout(tr.timer_D.bind(tr), SIP.Timers.TIMER_D);
	
	  this.transport.send(this.ack);
	};
	
	InviteClientTransaction.prototype.cancel_request = function(tr, reason) {
	  var request = tr.request;
	
	  this.cancel = SIP.C.CANCEL + ' ' + request.ruri + ' SIP/2.0\r\n';
	  this.cancel += 'Via: ' + request.headers['Via'].toString() + '\r\n';
	
	  if(this.request.headers['Route']) {
	    this.cancel += 'Route: ' + request.headers['Route'].toString() + '\r\n';
	  }
	
	  this.cancel += 'To: ' + request.headers['To'].toString() + '\r\n';
	  this.cancel += 'From: ' + request.headers['From'].toString() + '\r\n';
	  this.cancel += 'Call-ID: ' + request.headers['Call-ID'].toString() + '\r\n';
	  this.cancel += 'CSeq: ' + request.headers['CSeq'].toString().split(' ')[0] +
	  ' CANCEL\r\n';
	
	  if(reason) {
	    this.cancel += 'Reason: ' + reason + '\r\n';
	  }
	
	  this.cancel += 'Content-Length: 0\r\n\r\n';
	
	  // Send only if a provisional response (>100) has been received.
	  if(this.state === C.STATUS_PROCEEDING) {
	    this.transport.send(this.cancel);
	  }
	};
	
	InviteClientTransaction.prototype.receiveResponse = function(response) {
	  var
	  tr = this,
	  status_code = response.status_code;
	
	  if(status_code >= 100 && status_code <= 199) {
	    switch(this.state) {
	      case C.STATUS_CALLING:
	        this.stateChanged(C.STATUS_PROCEEDING);
	        this.request_sender.receiveResponse(response);
	        if(this.cancel) {
	          this.transport.send(this.cancel);
	        }
	        break;
	      case C.STATUS_PROCEEDING:
	        this.request_sender.receiveResponse(response);
	        break;
	    }
	  } else if(status_code >= 200 && status_code <= 299) {
	    switch(this.state) {
	      case C.STATUS_CALLING:
	      case C.STATUS_PROCEEDING:
	        this.stateChanged(C.STATUS_ACCEPTED);
	        this.M = SIP.Timers.setTimeout(tr.timer_M.bind(tr), SIP.Timers.TIMER_M);
	        this.request_sender.receiveResponse(response);
	        break;
	      case C.STATUS_ACCEPTED:
	        this.request_sender.receiveResponse(response);
	        break;
	    }
	  } else if(status_code >= 300 && status_code <= 699) {
	    switch(this.state) {
	      case C.STATUS_CALLING:
	      case C.STATUS_PROCEEDING:
	        this.stateChanged(C.STATUS_COMPLETED);
	        this.sendACK(response);
	        this.request_sender.receiveResponse(response);
	        break;
	      case C.STATUS_COMPLETED:
	        this.sendACK(response);
	        break;
	    }
	  }
	};
	
	
	/**
	 * @augments SIP.Transactions
	 * @class ACK Client Transaction
	 * @param {SIP.RequestSender} request_sender
	 * @param {SIP.OutgoingRequest} request
	 * @param {SIP.Transport} transport
	 */
	var AckClientTransaction = function(request_sender, request, transport) {
	  var via;
	
	  this.transport = transport;
	  this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
	  this.request_sender = request_sender;
	  this.request = request;
	
	  this.logger = request_sender.ua.getLogger('sip.transaction.nict', this.id);
	
	  via = buildViaHeader(request_sender, transport, this.id);
	  this.request.setHeader('via', via);
	};
	AckClientTransaction.prototype = Object.create(SIP.EventEmitter.prototype);
	
	AckClientTransaction.prototype.send = function() {
	  if(!this.transport.send(this.request)) {
	    this.onTransportError();
	  }
	};
	
	AckClientTransaction.prototype.onTransportError = function() {
	  this.logger.log('transport error occurred, for an ACK client transaction ' + this.id);
	  this.request_sender.onTransportError();
	};
	
	
	/**
	* @augments SIP.Transactions
	* @class Non Invite Server Transaction
	* @param {SIP.IncomingRequest} request
	* @param {SIP.UA} ua
	*/
	var NonInviteServerTransaction = function(request, ua) {
	  this.type = C.NON_INVITE_SERVER;
	  this.id = request.via_branch;
	  this.request = request;
	  this.transport = request.transport;
	  this.ua = ua;
	  this.last_response = '';
	  request.server_transaction = this;
	
	  this.logger = ua.getLogger('sip.transaction.nist', this.id);
	
	  this.state = C.STATUS_TRYING;
	
	  ua.newTransaction(this);
	};
	NonInviteServerTransaction.prototype = Object.create(SIP.EventEmitter.prototype);
	
	NonInviteServerTransaction.prototype.stateChanged = function(state) {
	  this.state = state;
	  this.emit('stateChanged');
	};
	
	NonInviteServerTransaction.prototype.timer_J = function() {
	  this.logger.log('Timer J expired for non-INVITE server transaction ' + this.id);
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.ua.destroyTransaction(this);
	};
	
	NonInviteServerTransaction.prototype.onTransportError = function() {
	  if (!this.transportError) {
	    this.transportError = true;
	
	    this.logger.log('transport error occurred, deleting non-INVITE server transaction ' + this.id);
	
	    SIP.Timers.clearTimeout(this.J);
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.ua.destroyTransaction(this);
	  }
	};
	
	NonInviteServerTransaction.prototype.receiveResponse = function(status_code, response) {
	  var tr = this;
	  var deferred = SIP.Utils.defer();
	
	  if(status_code === 100) {
	    /* RFC 4320 4.1
	     * 'A SIP element MUST NOT
	     * send any provisional response with a
	     * Status-Code other than 100 to a non-INVITE request.'
	     */
	    switch(this.state) {
	      case C.STATUS_TRYING:
	        this.stateChanged(C.STATUS_PROCEEDING);
	        if(!this.transport.send(response))  {
	          this.onTransportError();
	        }
	        break;
	      case C.STATUS_PROCEEDING:
	        this.last_response = response;
	        if(!this.transport.send(response)) {
	          this.onTransportError();
	          deferred.reject();
	        } else {
	          deferred.resolve();
	        }
	        break;
	    }
	  } else if(status_code >= 200 && status_code <= 699) {
	    switch(this.state) {
	      case C.STATUS_TRYING:
	      case C.STATUS_PROCEEDING:
	        this.stateChanged(C.STATUS_COMPLETED);
	        this.last_response = response;
	        this.J = SIP.Timers.setTimeout(tr.timer_J.bind(tr), SIP.Timers.TIMER_J);
	        if(!this.transport.send(response)) {
	          this.onTransportError();
	          deferred.reject();
	        } else {
	          deferred.resolve();
	        }
	        break;
	      case C.STATUS_COMPLETED:
	        break;
	    }
	  }
	
	  return deferred.promise;
	};
	
	/**
	* @augments SIP.Transactions
	* @class Invite Server Transaction
	* @param {SIP.IncomingRequest} request
	* @param {SIP.UA} ua
	*/
	var InviteServerTransaction = function(request, ua) {
	  this.type = C.INVITE_SERVER;
	  this.id = request.via_branch;
	  this.request = request;
	  this.transport = request.transport;
	  this.ua = ua;
	  this.last_response = '';
	  request.server_transaction = this;
	
	  this.logger = ua.getLogger('sip.transaction.ist', this.id);
	
	  this.state = C.STATUS_PROCEEDING;
	
	  ua.newTransaction(this);
	
	  this.resendProvisionalTimer = null;
	
	  request.reply(100);
	};
	InviteServerTransaction.prototype = Object.create(SIP.EventEmitter.prototype);
	
	InviteServerTransaction.prototype.stateChanged = function(state) {
	  this.state = state;
	  this.emit('stateChanged');
	};
	
	InviteServerTransaction.prototype.timer_H = function() {
	  this.logger.log('Timer H expired for INVITE server transaction ' + this.id);
	
	  if(this.state === C.STATUS_COMPLETED) {
	    this.logger.warn('transactions', 'ACK for INVITE server transaction was never received, call will be terminated');
	  }
	
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.ua.destroyTransaction(this);
	};
	
	InviteServerTransaction.prototype.timer_I = function() {
	  this.stateChanged(C.STATUS_TERMINATED);
	  this.ua.destroyTransaction(this);
	};
	
	// RFC 6026 7.1
	InviteServerTransaction.prototype.timer_L = function() {
	  this.logger.log('Timer L expired for INVITE server transaction ' + this.id);
	
	  if(this.state === C.STATUS_ACCEPTED) {
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.ua.destroyTransaction(this);
	  }
	};
	
	InviteServerTransaction.prototype.onTransportError = function() {
	  if (!this.transportError) {
	    this.transportError = true;
	
	    this.logger.log('transport error occurred, deleting INVITE server transaction ' + this.id);
	
	    if (this.resendProvisionalTimer !== null) {
	      SIP.Timers.clearInterval(this.resendProvisionalTimer);
	      this.resendProvisionalTimer = null;
	    }
	
	    SIP.Timers.clearTimeout(this.L);
	    SIP.Timers.clearTimeout(this.H);
	    SIP.Timers.clearTimeout(this.I);
	
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.ua.destroyTransaction(this);
	  }
	};
	
	InviteServerTransaction.prototype.resend_provisional = function() {
	  if(!this.transport.send(this.last_response)) {
	    this.onTransportError();
	  }
	};
	
	// INVITE Server Transaction RFC 3261 17.2.1
	InviteServerTransaction.prototype.receiveResponse = function(status_code, response) {
	  var tr = this;
	  var deferred = SIP.Utils.defer();
	
	  if(status_code >= 100 && status_code <= 199) {
	    switch(this.state) {
	      case C.STATUS_PROCEEDING:
	        if(!this.transport.send(response)) {
	          this.onTransportError();
	        }
	        this.last_response = response;
	        break;
	    }
	  }
	
	  if(status_code > 100 && status_code <= 199 && this.state === C.STATUS_PROCEEDING) {
	    // Trigger the resendProvisionalTimer only for the first non 100 provisional response.
	    if(this.resendProvisionalTimer === null) {
	      this.resendProvisionalTimer = SIP.Timers.setInterval(tr.resend_provisional.bind(tr),
	        SIP.Timers.PROVISIONAL_RESPONSE_INTERVAL);
	    }
	  } else if(status_code >= 200 && status_code <= 299) {
	    switch(this.state) {
	      case C.STATUS_PROCEEDING:
	        this.stateChanged(C.STATUS_ACCEPTED);
	        this.last_response = response;
	        this.L = SIP.Timers.setTimeout(tr.timer_L.bind(tr), SIP.Timers.TIMER_L);
	
	        if (this.resendProvisionalTimer !== null) {
	          SIP.Timers.clearInterval(this.resendProvisionalTimer);
	          this.resendProvisionalTimer = null;
	        }
	        /* falls through */
	        case C.STATUS_ACCEPTED:
	          // Note that this point will be reached for proceeding tr.state also.
	          if(!this.transport.send(response)) {
	            this.onTransportError();
	            deferred.reject();
	          } else {
	            deferred.resolve();
	          }
	          break;
	    }
	  } else if(status_code >= 300 && status_code <= 699) {
	    switch(this.state) {
	      case C.STATUS_PROCEEDING:
	        if (this.resendProvisionalTimer !== null) {
	          SIP.Timers.clearInterval(this.resendProvisionalTimer);
	          this.resendProvisionalTimer = null;
	        }
	
	        if(!this.transport.send(response)) {
	          this.onTransportError();
	          deferred.reject();
	        } else {
	          this.stateChanged(C.STATUS_COMPLETED);
	          this.H = SIP.Timers.setTimeout(tr.timer_H.bind(tr), SIP.Timers.TIMER_H);
	          deferred.resolve();
	        }
	        break;
	    }
	  }
	
	  return deferred.promise;
	};
	
	/**
	 * @function
	 * @param {SIP.UA} ua
	 * @param {SIP.IncomingRequest} request
	 *
	 * @return {boolean}
	 * INVITE:
	 *  _true_ if retransmission
	 *  _false_ new request
	 *
	 * ACK:
	 *  _true_  ACK to non2xx response
	 *  _false_ ACK must be passed to TU (accepted state)
	 *          ACK to 2xx response
	 *
	 * CANCEL:
	 *  _true_  no matching invite transaction
	 *  _false_ matching invite transaction and no final response sent
	 *
	 * OTHER:
	 *  _true_  retransmission
	 *  _false_ new request
	 */
	var checkTransaction = function(ua, request) {
	  var tr;
	
	  switch(request.method) {
	    case SIP.C.INVITE:
	      tr = ua.transactions.ist[request.via_branch];
	      if(tr) {
	        switch(tr.state) {
	          case C.STATUS_PROCEEDING:
	            tr.transport.send(tr.last_response);
	            break;
	
	            // RFC 6026 7.1 Invite retransmission
	            //received while in C.STATUS_ACCEPTED state. Absorb it.
	          case C.STATUS_ACCEPTED:
	            break;
	        }
	        return true;
	      }
	      break;
	    case SIP.C.ACK:
	      tr = ua.transactions.ist[request.via_branch];
	
	      // RFC 6026 7.1
	      if(tr) {
	        if(tr.state === C.STATUS_ACCEPTED) {
	          return false;
	        } else if(tr.state === C.STATUS_COMPLETED) {
	          tr.state = C.STATUS_CONFIRMED;
	          tr.I = SIP.Timers.setTimeout(tr.timer_I.bind(tr), SIP.Timers.TIMER_I);
	          return true;
	        }
	      }
	
	      // ACK to 2XX Response.
	      else {
	        return false;
	      }
	      break;
	    case SIP.C.CANCEL:
	      tr = ua.transactions.ist[request.via_branch];
	      if(tr) {
	        request.reply_sl(200);
	        if(tr.state === C.STATUS_PROCEEDING) {
	          return false;
	        } else {
	          return true;
	        }
	      } else {
	        request.reply_sl(481);
	        return true;
	      }
	      break;
	    default:
	
	      // Non-INVITE Server Transaction RFC 3261 17.2.2
	      tr = ua.transactions.nist[request.via_branch];
	      if(tr) {
	        switch(tr.state) {
	          case C.STATUS_TRYING:
	            break;
	          case C.STATUS_PROCEEDING:
	          case C.STATUS_COMPLETED:
	            tr.transport.send(tr.last_response);
	            break;
	        }
	        return true;
	      }
	      break;
	  }
	};
	
	SIP.Transactions = {
	  C: C,
	  checkTransaction: checkTransaction,
	  NonInviteClientTransaction: NonInviteClientTransaction,
	  InviteClientTransaction: InviteClientTransaction,
	  AckClientTransaction: AckClientTransaction,
	  NonInviteServerTransaction: NonInviteServerTransaction,
	  InviteServerTransaction: InviteServerTransaction
	};
	
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @fileoverview SIP Dialog
	 */
	
	/**
	 * @augments SIP
	 * @class Class creating a SIP dialog.
	 * @param {SIP.RTCSession} owner
	 * @param {SIP.IncomingRequest|SIP.IncomingResponse} message
	 * @param {Enum} type UAC / UAS
	 * @param {Enum} state SIP.Dialog.C.STATUS_EARLY / SIP.Dialog.C.STATUS_CONFIRMED
	 */
	module.exports = function (SIP) {
	
	var RequestSender = __webpack_require__(29)(SIP);
	
	var Dialog,
	  C = {
	    // Dialog states
	    STATUS_EARLY:       1,
	    STATUS_CONFIRMED:   2
	  };
	
	// RFC 3261 12.1
	Dialog = function(owner, message, type, state) {
	  var contact;
	
	  this.uac_pending_reply = false;
	  this.uas_pending_reply = false;
	
	  if(!message.hasHeader('contact')) {
	    return {
	      error: 'unable to create a Dialog without Contact header field'
	    };
	  }
	
	  if(message instanceof SIP.IncomingResponse) {
	    state = (message.status_code < 200) ? C.STATUS_EARLY : C.STATUS_CONFIRMED;
	  } else {
	    // Create confirmed dialog if state is not defined
	    state = state || C.STATUS_CONFIRMED;
	  }
	
	  contact = message.parseHeader('contact');
	
	  // RFC 3261 12.1.1
	  if(type === 'UAS') {
	    this.id = {
	      call_id: message.call_id,
	      local_tag: message.to_tag,
	      remote_tag: message.from_tag,
	      toString: function() {
	        return this.call_id + this.local_tag + this.remote_tag;
	      }
	    };
	    this.state = state;
	    this.remote_seqnum = message.cseq;
	    this.local_uri = message.parseHeader('to').uri;
	    this.remote_uri = message.parseHeader('from').uri;
	    this.remote_target = contact.uri;
	    this.route_set = message.getHeaders('record-route');
	    this.invite_seqnum = message.cseq;
	    this.local_seqnum = message.cseq;
	  }
	  // RFC 3261 12.1.2
	  else if(type === 'UAC') {
	    this.id = {
	      call_id: message.call_id,
	      local_tag: message.from_tag,
	      remote_tag: message.to_tag,
	      toString: function() {
	        return this.call_id + this.local_tag + this.remote_tag;
	      }
	    };
	    this.state = state;
	    this.invite_seqnum = message.cseq;
	    this.local_seqnum = message.cseq;
	    this.local_uri = message.parseHeader('from').uri;
	    this.pracked = [];
	    this.remote_uri = message.parseHeader('to').uri;
	    this.remote_target = contact.uri;
	    this.route_set = message.getHeaders('record-route').reverse();
	
	    //RENDERBODY
	    if (this.state === C.STATUS_EARLY && (!owner.hasOffer)) {
	      this.mediaHandler = owner.mediaHandlerFactory(owner);
	    }
	  }
	
	  this.logger = owner.ua.getLogger('sip.dialog', this.id.toString());
	  this.owner = owner;
	  owner.ua.dialogs[this.id.toString()] = this;
	  this.logger.log('new ' + type + ' dialog created with status ' + (this.state === C.STATUS_EARLY ? 'EARLY': 'CONFIRMED'));
	  owner.emit('dialog', this);
	};
	
	Dialog.prototype = {
	  /**
	   * @param {SIP.IncomingMessage} message
	   * @param {Enum} UAC/UAS
	   */
	  update: function(message, type) {
	    this.state = C.STATUS_CONFIRMED;
	
	    this.logger.log('dialog '+ this.id.toString() +'  changed to CONFIRMED state');
	
	    if(type === 'UAC') {
	      // RFC 3261 13.2.2.4
	      this.route_set = message.getHeaders('record-route').reverse();
	    }
	  },
	
	  terminate: function() {
	    this.logger.log('dialog ' + this.id.toString() + ' deleted');
	    if (this.mediaHandler && this.state !== C.STATUS_CONFIRMED) {
	      this.mediaHandler.peerConnection.close();
	    }
	    delete this.owner.ua.dialogs[this.id.toString()];
	  },
	
	  /**
	  * @param {String} method request method
	  * @param {Object} extraHeaders extra headers
	  * @returns {SIP.OutgoingRequest}
	  */
	
	  // RFC 3261 12.2.1.1
	  createRequest: function(method, extraHeaders, body) {
	    var cseq, request;
	    extraHeaders = (extraHeaders || []).slice();
	
	    if(!this.local_seqnum) { this.local_seqnum = Math.floor(Math.random() * 10000); }
	
	    cseq = (method === SIP.C.CANCEL || method === SIP.C.ACK) ? this.invite_seqnum : this.local_seqnum += 1;
	
	    request = new SIP.OutgoingRequest(
	      method,
	      this.remote_target,
	      this.owner.ua, {
	        'cseq': cseq,
	        'call_id': this.id.call_id,
	        'from_uri': this.local_uri,
	        'from_tag': this.id.local_tag,
	        'to_uri': this.remote_uri,
	        'to_tag': this.id.remote_tag,
	        'route_set': this.route_set
	      }, extraHeaders, body);
	
	    request.dialog = this;
	
	    return request;
	  },
	
	  /**
	  * @param {SIP.IncomingRequest} request
	  * @returns {Boolean}
	  */
	
	  // RFC 3261 12.2.2
	  checkInDialogRequest: function(request) {
	    var self = this;
	
	    if(!this.remote_seqnum) {
	      this.remote_seqnum = request.cseq;
	    } else if(request.cseq < this.remote_seqnum) {
	        //Do not try to reply to an ACK request.
	        if (request.method !== SIP.C.ACK) {
	          request.reply(500);
	        }
	        if (request.cseq === this.invite_seqnum) {
	          return true;
	        }
	        return false;
	    } else if(request.cseq > this.remote_seqnum) {
	      this.remote_seqnum = request.cseq;
	    }
	
	    switch(request.method) {
	      // RFC3261 14.2 Modifying an Existing Session -UAS BEHAVIOR-
	      case SIP.C.INVITE:
	        if (this.uac_pending_reply === true) {
	          request.reply(491);
	        } else if (this.uas_pending_reply === true) {
	          var retryAfter = (Math.random() * 10 | 0) + 1;
	          request.reply(500, null, ['Retry-After:' + retryAfter]);
	          return false;
	        } else {
	          this.uas_pending_reply = true;
	          request.server_transaction.on('stateChanged', function stateChanged(){
	            if (this.state === SIP.Transactions.C.STATUS_ACCEPTED ||
	                this.state === SIP.Transactions.C.STATUS_COMPLETED ||
	                this.state === SIP.Transactions.C.STATUS_TERMINATED) {
	
	              this.removeListener('stateChanged', stateChanged);
	              self.uas_pending_reply = false;
	
	              if (self.uac_pending_reply === false) {
	                self.owner.onReadyToReinvite();
	              }
	            }
	          });
	        }
	
	        // RFC3261 12.2.2 Replace the dialog`s remote target URI if the request is accepted
	        if(request.hasHeader('contact')) {
	          request.server_transaction.on('stateChanged', function(){
	            if (this.state === SIP.Transactions.C.STATUS_ACCEPTED) {
	              self.remote_target = request.parseHeader('contact').uri;
	            }
	          });
	        }
	        break;
	      case SIP.C.NOTIFY:
	        // RFC6665 3.2 Replace the dialog`s remote target URI if the request is accepted
	        if(request.hasHeader('contact')) {
	          request.server_transaction.on('stateChanged', function(){
	            if (this.state === SIP.Transactions.C.STATUS_COMPLETED) {
	              self.remote_target = request.parseHeader('contact').uri;
	            }
	          });
	        }
	        break;
	    }
	
	    return true;
	  },
	
	  sendRequest: function(applicant, method, options) {
	    options = options || {};
	
	    var
	      extraHeaders = (options.extraHeaders || []).slice(),
	      body = options.body || null,
	      request = this.createRequest(method, extraHeaders, body),
	      request_sender = new RequestSender(this, applicant, request);
	
	    request_sender.send();
	
	    return request;
	  },
	
	  /**
	  * @param {SIP.IncomingRequest} request
	  */
	  receiveRequest: function(request) {
	    //Check in-dialog request
	    if(!this.checkInDialogRequest(request)) {
	      return;
	    }
	
	    this.owner.receiveRequest(request);
	  }
	};
	
	Dialog.C = C;
	SIP.Dialog = Dialog;
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * @fileoverview In-Dialog Request Sender
	 */
	
	/**
	 * @augments SIP.Dialog
	 * @class Class creating an In-dialog request sender.
	 * @param {SIP.Dialog} dialog
	 * @param {Object} applicant
	 * @param {SIP.OutgoingRequest} request
	 */
	/**
	 * @fileoverview in-Dialog Request Sender
	 */
	
	module.exports = function (SIP) {
	var RequestSender;
	
	RequestSender = function(dialog, applicant, request) {
	
	  this.dialog = dialog;
	  this.applicant = applicant;
	  this.request = request;
	
	  // RFC3261 14.1 Modifying an Existing Session. UAC Behavior.
	  this.reattempt = false;
	  this.reattemptTimer = null;
	};
	
	RequestSender.prototype = {
	  send: function() {
	    var self = this,
	      request_sender = new SIP.RequestSender(this, this.dialog.owner.ua);
	
	      request_sender.send();
	
	    // RFC3261 14.2 Modifying an Existing Session -UAC BEHAVIOR-
	    if (this.request.method === SIP.C.INVITE && request_sender.clientTransaction.state !== SIP.Transactions.C.STATUS_TERMINATED) {
	      this.dialog.uac_pending_reply = true;
	      request_sender.clientTransaction.on('stateChanged', function stateChanged(){
	        if (this.state === SIP.Transactions.C.STATUS_ACCEPTED ||
	            this.state === SIP.Transactions.C.STATUS_COMPLETED ||
	            this.state === SIP.Transactions.C.STATUS_TERMINATED) {
	
	          this.removeListener('stateChanged', stateChanged);
	          self.dialog.uac_pending_reply = false;
	
	          if (self.dialog.uas_pending_reply === false) {
	            self.dialog.owner.onReadyToReinvite();
	          }
	        }
	      });
	    }
	  },
	
	  onRequestTimeout: function() {
	    this.applicant.onRequestTimeout();
	  },
	
	  onTransportError: function() {
	    this.applicant.onTransportError();
	  },
	
	  receiveResponse: function(response) {
	    var self = this;
	
	    // RFC3261 12.2.1.2 408 or 481 is received for a request within a dialog.
	    if (response.status_code === 408 || response.status_code === 481) {
	      this.applicant.onDialogError(response);
	    } else if (response.method === SIP.C.INVITE && response.status_code === 491) {
	      if (this.reattempt) {
	        this.applicant.receiveResponse(response);
	      } else {
	        this.request.cseq.value = this.dialog.local_seqnum += 1;
	        this.reattemptTimer = SIP.Timers.setTimeout(
	          function() {
	            if (self.applicant.owner.status !== SIP.Session.C.STATUS_TERMINATED) {
	              self.reattempt = true;
	              self.request_sender.send();
	            }
	          },
	          this.getReattemptTimeout()
	        );
	      }
	    } else {
	      this.applicant.receiveResponse(response);
	    }
	  }
	};
	
	return RequestSender;
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * @fileoverview Request Sender
	 */
	
	/**
	 * @augments SIP
	 * @class Class creating a request sender.
	 * @param {Object} applicant
	 * @param {SIP.UA} ua
	 */
	module.exports = function (SIP) {
	var RequestSender;
	
	RequestSender = function(applicant, ua) {
	  this.logger = ua.getLogger('sip.requestsender');
	  this.ua = ua;
	  this.applicant = applicant;
	  this.method = applicant.request.method;
	  this.request = applicant.request;
	  this.credentials = null;
	  this.challenged = false;
	  this.staled = false;
	
	  // If ua is in closing process or even closed just allow sending Bye and ACK
	  if (ua.status === SIP.UA.C.STATUS_USER_CLOSED && (this.method !== SIP.C.BYE || this.method !== SIP.C.ACK)) {
	    this.onTransportError();
	  }
	};
	
	/**
	* Create the client transaction and send the message.
	*/
	RequestSender.prototype = {
	  send: function() {
	    switch(this.method) {
	      case "INVITE":
	        this.clientTransaction = new SIP.Transactions.InviteClientTransaction(this, this.request, this.ua.transport);
	        break;
	      case "ACK":
	        this.clientTransaction = new SIP.Transactions.AckClientTransaction(this, this.request, this.ua.transport);
	        break;
	      default:
	        this.clientTransaction = new SIP.Transactions.NonInviteClientTransaction(this, this.request, this.ua.transport);
	    }
	    this.clientTransaction.send();
	
	    return this.clientTransaction;
	  },
	
	  /**
	  * Callback fired when receiving a request timeout error from the client transaction.
	  * To be re-defined by the applicant.
	  * @event
	  */
	  onRequestTimeout: function() {
	    this.applicant.onRequestTimeout();
	  },
	
	  /**
	  * Callback fired when receiving a transport error from the client transaction.
	  * To be re-defined by the applicant.
	  * @event
	  */
	  onTransportError: function() {
	    this.applicant.onTransportError();
	  },
	
	  /**
	  * Called from client transaction when receiving a correct response to the request.
	  * Authenticate request if needed or pass the response back to the applicant.
	  * @param {SIP.IncomingResponse} response
	  */
	  receiveResponse: function(response) {
	    var cseq, challenge, authorization_header_name,
	      status_code = response.status_code;
	
	    /*
	    * Authentication
	    * Authenticate once. _challenged_ flag used to avoid infinite authentications.
	    */
	    if (status_code === 401 || status_code === 407) {
	
	      // Get and parse the appropriate WWW-Authenticate or Proxy-Authenticate header.
	      if (response.status_code === 401) {
	        challenge = response.parseHeader('www-authenticate');
	        authorization_header_name = 'authorization';
	      } else {
	        challenge = response.parseHeader('proxy-authenticate');
	        authorization_header_name = 'proxy-authorization';
	      }
	
	      // Verify it seems a valid challenge.
	      if (! challenge) {
	        this.logger.warn(response.status_code + ' with wrong or missing challenge, cannot authenticate');
	        this.applicant.receiveResponse(response);
	        return;
	      }
	
	      if (!this.challenged || (!this.staled && challenge.stale === true)) {
	        if (!this.credentials) {
	          this.credentials = this.ua.configuration.authenticationFactory(this.ua);
	        }
	
	        // Verify that the challenge is really valid.
	        if (!this.credentials.authenticate(this.request, challenge)) {
	          this.applicant.receiveResponse(response);
	          return;
	        }
	        this.challenged = true;
	
	        if (challenge.stale) {
	          this.staled = true;
	        }
	
	        if (response.method === SIP.C.REGISTER) {
	          cseq = this.applicant.cseq += 1;
	        } else if (this.request.dialog){
	          cseq = this.request.dialog.local_seqnum += 1;
	        } else {
	          cseq = this.request.cseq + 1;
	          this.request.cseq = cseq;
	        }
	        this.request.setHeader('cseq', cseq +' '+ this.method);
	
	        this.request.setHeader(authorization_header_name, this.credentials.toString());
	        this.send();
	      } else {
	        this.applicant.receiveResponse(response);
	      }
	    } else {
	      this.applicant.receiveResponse(response);
	    }
	  }
	};
	
	SIP.RequestSender = RequestSender;
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function (SIP) {
	
	var RegisterContext;
	
	RegisterContext = function (ua) {
	  var params = {},
	      regId = 1;
	
	  this.registrar = ua.configuration.registrarServer;
	  this.expires = ua.configuration.registerExpires;
	
	
	  // Contact header
	  this.contact = ua.contact.toString();
	
	  if(regId) {
	    this.contact += ';reg-id='+ regId;
	    this.contact += ';+sip.instance="<urn:uuid:'+ ua.configuration.instanceId+'>"';
	  }
	
	  // Call-ID and CSeq values RFC3261 10.2
	  this.call_id = SIP.Utils.createRandomToken(22);
	  this.cseq = 80;
	
	  this.to_uri = ua.configuration.uri;
	
	  params.to_uri = this.to_uri;
	  params.to_displayName = ua.configuration.displayName;
	  params.call_id = this.call_id;
	  params.cseq = this.cseq;
	
	  // Extends ClientContext
	  SIP.Utils.augment(this, SIP.ClientContext, [ua, 'REGISTER', this.registrar, {params: params}]);
	
	  this.registrationTimer = null;
	  this.registrationExpiredTimer = null;
	
	  // Set status
	  this.registered = false;
	
	  this.logger = ua.getLogger('sip.registercontext');
	};
	
	RegisterContext.prototype = {
	  register: function (options) {
	    var self = this, extraHeaders;
	
	    // Handle Options
	    this.options = options || {};
	    extraHeaders = (this.options.extraHeaders || []).slice();
	    extraHeaders.push('Contact: ' + this.contact + ';expires=' + this.expires);
	    extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());
	
	    // Save original extraHeaders to be used in .close
	    this.closeHeaders = this.options.closeWithHeaders ?
	      (this.options.extraHeaders || []).slice() : [];
	
	    this.receiveResponse = function(response) {
	      var contact, expires,
	        contacts = response.getHeaders('contact').length,
	        cause;
	
	      // Discard responses to older REGISTER/un-REGISTER requests.
	      if(response.cseq !== this.cseq) {
	        return;
	      }
	
	      // Clear registration timer
	      if (this.registrationTimer !== null) {
	        SIP.Timers.clearTimeout(this.registrationTimer);
	        this.registrationTimer = null;
	      }
	
	      switch(true) {
	        case /^1[0-9]{2}$/.test(response.status_code):
	          this.emit('progress', response);
	          break;
	        case /^2[0-9]{2}$/.test(response.status_code):
	          this.emit('accepted', response);
	
	          if(response.hasHeader('expires')) {
	            expires = response.getHeader('expires');
	          }
	
	          if (this.registrationExpiredTimer !== null) {
	            SIP.Timers.clearTimeout(this.registrationExpiredTimer);
	            this.registrationExpiredTimer = null;
	          }
	
	          // Search the Contact pointing to us and update the expires value accordingly.
	          if (!contacts) {
	            this.logger.warn('no Contact header in response to REGISTER, response ignored');
	            break;
	          }
	
	          while(contacts--) {
	            contact = response.parseHeader('contact', contacts);
	            if(contact.uri.user === this.ua.contact.uri.user) {
	              expires = contact.getParam('expires');
	              break;
	            } else {
	              contact = null;
	            }
	          }
	
	          if (!contact) {
	            this.logger.warn('no Contact header pointing to us, response ignored');
	            break;
	          }
	
	          if(!expires) {
	            expires = this.expires;
	          }
	
	          // Re-Register before the expiration interval has elapsed.
	          // For that, decrease the expires value. ie: 3 seconds
	          this.registrationTimer = SIP.Timers.setTimeout(function() {
	            self.registrationTimer = null;
	            self.register(self.options);
	          }, (expires * 1000) - 3000);
	          this.registrationExpiredTimer = SIP.Timers.setTimeout(function () {
	            self.logger.warn('registration expired');
	            if (self.registered) {
	              self.unregistered(null, SIP.C.causes.EXPIRES);
	            }
	          }, expires * 1000);
	
	          //Save gruu values
	          if (contact.hasParam('temp-gruu')) {
	            this.ua.contact.temp_gruu = SIP.URI.parse(contact.getParam('temp-gruu').replace(/"/g,''));
	          }
	          if (contact.hasParam('pub-gruu')) {
	            this.ua.contact.pub_gruu = SIP.URI.parse(contact.getParam('pub-gruu').replace(/"/g,''));
	          }
	
	          this.registered = true;
	          this.emit('registered', response || null);
	          break;
	        // Interval too brief RFC3261 10.2.8
	        case /^423$/.test(response.status_code):
	          if(response.hasHeader('min-expires')) {
	            // Increase our registration interval to the suggested minimum
	            this.expires = response.getHeader('min-expires');
	            // Attempt the registration again immediately
	            this.register(this.options);
	          } else { //This response MUST contain a Min-Expires header field
	            this.logger.warn('423 response received for REGISTER without Min-Expires');
	            this.registrationFailure(response, SIP.C.causes.SIP_FAILURE_CODE);
	          }
	          break;
	        default:
	          cause = SIP.Utils.sipErrorCause(response.status_code);
	          this.registrationFailure(response, cause);
	      }
	    };
	
	    this.onRequestTimeout = function() {
	      this.registrationFailure(null, SIP.C.causes.REQUEST_TIMEOUT);
	    };
	
	    this.onTransportError = function() {
	      this.registrationFailure(null, SIP.C.causes.CONNECTION_ERROR);
	    };
	
	    this.cseq++;
	    this.request.cseq = this.cseq;
	    this.request.setHeader('cseq', this.cseq + ' REGISTER');
	    this.request.extraHeaders = extraHeaders;
	    this.send();
	  },
	
	  registrationFailure: function (response, cause) {
	    this.emit('failed', response || null, cause || null);
	  },
	
	  onTransportClosed: function() {
	    this.registered_before = this.registered;
	    if (this.registrationTimer !== null) {
	      SIP.Timers.clearTimeout(this.registrationTimer);
	      this.registrationTimer = null;
	    }
	
	    if (this.registrationExpiredTimer !== null) {
	      SIP.Timers.clearTimeout(this.registrationExpiredTimer);
	      this.registrationExpiredTimer = null;
	    }
	
	    if(this.registered) {
	      this.unregistered(null, SIP.C.causes.CONNECTION_ERROR);
	    }
	  },
	
	  onTransportConnected: function() {
	    this.register(this.options);
	  },
	
	  close: function() {
	    var options = {
	      all: false,
	      extraHeaders: this.closeHeaders
	    };
	
	    this.registered_before = this.registered;
	    this.unregister(options);
	  },
	
	  unregister: function(options) {
	    var extraHeaders;
	
	    options = options || {};
	
	    if(!this.registered && !options.all) {
	      this.logger.warn('already unregistered');
	      return;
	    }
	
	    extraHeaders = (options.extraHeaders || []).slice();
	
	    this.registered = false;
	
	    // Clear the registration timer.
	    if (this.registrationTimer !== null) {
	      SIP.Timers.clearTimeout(this.registrationTimer);
	      this.registrationTimer = null;
	    }
	
	    if(options.all) {
	      extraHeaders.push('Contact: *');
	      extraHeaders.push('Expires: 0');
	    } else {
	      extraHeaders.push('Contact: '+ this.contact + ';expires=0');
	    }
	
	
	    this.receiveResponse = function(response) {
	      var cause;
	
	      switch(true) {
	        case /^1[0-9]{2}$/.test(response.status_code):
	          this.emit('progress', response);
	          break;
	        case /^2[0-9]{2}$/.test(response.status_code):
	          this.emit('accepted', response);
	          if (this.registrationExpiredTimer !== null) {
	            SIP.Timers.clearTimeout(this.registrationExpiredTimer);
	            this.registrationExpiredTimer = null;
	          }
	          this.unregistered(response);
	          break;
	        default:
	          cause = SIP.Utils.sipErrorCause(response.status_code);
	          this.unregistered(response,cause);
	      }
	    };
	
	    this.onRequestTimeout = function() {
	      // Not actually unregistered...
	      //this.unregistered(null, SIP.C.causes.REQUEST_TIMEOUT);
	    };
	
	    this.onTransportError = function() {
	      // Not actually unregistered...
	      //this.unregistered(null, SIP.C.causes.CONNECTION_ERROR);
	    };
	
	    this.cseq++;
	    this.request.cseq = this.cseq;
	    this.request.setHeader('cseq', this.cseq + ' REGISTER');
	    this.request.extraHeaders = extraHeaders;
	
	    this.send();
	  },
	
	  unregistered: function(response, cause) {
	    this.registered = false;
	    this.emit('unregistered', response || null, cause || null);
	  }
	
	};
	
	
	SIP.RegisterContext = RegisterContext;
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview MediaHandler
	 */
	
	/* MediaHandler
	 * @class PeerConnection helper Class.
	 * @param {SIP.Session} session
	 * @param {Object} [options]
	 */
	module.exports = function (EventEmitter) {
	var MediaHandler = function(session, options) {
	  // keep jshint happy
	  session = session;
	  options = options;
	};
	
	MediaHandler.prototype = Object.create(EventEmitter.prototype, {
	  isReady: {value: function isReady () {}},
	
	  close: {value: function close () {}},
	
	  /**
	   * @param {Object} [mediaHint] A custom object describing the media to be used during this session.
	   */
	  getDescription: {value: function getDescription (mediaHint) {
	    // keep jshint happy
	    mediaHint = mediaHint;
	  }},
	
	  /**
	  * Message reception.
	  * @param {String} type
	  * @param {String} description
	  */
	  setDescription: {value: function setDescription (description) {
	    // keep jshint happy
	    description = description;
	  }}
	});
	
	return MediaHandler;
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function (SIP) {
	var ClientContext;
	
	ClientContext = function (ua, method, target, options) {
	  var originalTarget = target;
	
	  // Validate arguments
	  if (target === undefined) {
	    throw new TypeError('Not enough arguments');
	  }
	
	  this.ua = ua;
	  this.logger = ua.getLogger('sip.clientcontext');
	  this.method = method;
	  target = ua.normalizeTarget(target);
	  if (!target) {
	    throw new TypeError('Invalid target: ' + originalTarget);
	  }
	
	  /* Options
	   * - extraHeaders
	   * - params
	   * - contentType
	   * - body
	   */
	  options = Object.create(options || Object.prototype);
	  options.extraHeaders = (options.extraHeaders || []).slice();
	
	  if (options.contentType) {
	    this.contentType = options.contentType;
	    options.extraHeaders.push('Content-Type: ' + this.contentType);
	  }
	
	  // Build the request
	  this.request = new SIP.OutgoingRequest(this.method,
	                                         target,
	                                         this.ua,
	                                         options.params,
	                                         options.extraHeaders);
	  if (options.body) {
	    this.body = options.body;
	    this.request.body = this.body;
	  }
	
	  /* Set other properties from the request */
	  this.localIdentity = this.request.from;
	  this.remoteIdentity = this.request.to;
	
	  this.data = {};
	};
	ClientContext.prototype = Object.create(SIP.EventEmitter.prototype);
	
	ClientContext.prototype.send = function () {
	  (new SIP.RequestSender(this, this.ua)).send();
	  return this;
	};
	
	ClientContext.prototype.cancel = function (options) {
	  options = options || {};
	
	  var cancel_reason = SIP.Utils.getCancelReason(options.status_code, options.reason_phrase);
	  this.request.cancel(cancel_reason);
	
	  this.emit('cancel');
	};
	
	ClientContext.prototype.receiveResponse = function (response) {
	  var cause = SIP.Utils.getReasonPhrase(response.status_code);
	
	  switch(true) {
	    case /^1[0-9]{2}$/.test(response.status_code):
	      this.emit('progress', response, cause);
	      break;
	
	    case /^2[0-9]{2}$/.test(response.status_code):
	      if(this.ua.applicants[this]) {
	        delete this.ua.applicants[this];
	      }
	      this.emit('accepted', response, cause);
	      break;
	
	    default:
	      if(this.ua.applicants[this]) {
	        delete this.ua.applicants[this];
	      }
	      this.emit('rejected', response, cause);
	      this.emit('failed', response, cause);
	      break;
	  }
	
	};
	
	ClientContext.prototype.onRequestTimeout = function () {
	  this.emit('failed', null, SIP.C.causes.REQUEST_TIMEOUT);
	};
	
	ClientContext.prototype.onTransportError = function () {
	  this.emit('failed', null, SIP.C.causes.CONNECTION_ERROR);
	};
	
	SIP.ClientContext = ClientContext;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function (SIP) {
	var ServerContext;
	
	ServerContext = function (ua, request) {
	  this.ua = ua;
	  this.logger = ua.getLogger('sip.servercontext');
	  this.request = request;
	  if (request.method === SIP.C.INVITE) {
	    this.transaction = new SIP.Transactions.InviteServerTransaction(request, ua);
	  } else {
	    this.transaction = new SIP.Transactions.NonInviteServerTransaction(request, ua);
	  }
	
	  if (request.body) {
	    this.body = request.body;
	  }
	  if (request.hasHeader('Content-Type')) {
	    this.contentType = request.getHeader('Content-Type');
	  }
	  this.method = request.method;
	
	  this.data = {};
	
	  this.localIdentity = request.to;
	  this.remoteIdentity = request.from;
	};
	
	ServerContext.prototype = Object.create(SIP.EventEmitter.prototype);
	
	ServerContext.prototype.progress = function (options) {
	  options = Object.create(options || Object.prototype);
	  options.statusCode || (options.statusCode = 180);
	  options.minCode = 100;
	  options.maxCode = 199;
	  options.events = ['progress'];
	  return this.reply(options);
	};
	
	ServerContext.prototype.accept = function (options) {
	  options = Object.create(options || Object.prototype);
	  options.statusCode || (options.statusCode = 200);
	  options.minCode = 200;
	  options.maxCode = 299;
	  options.events = ['accepted'];
	  return this.reply(options);
	};
	
	ServerContext.prototype.reject = function (options) {
	  options = Object.create(options || Object.prototype);
	  options.statusCode || (options.statusCode = 480);
	  options.minCode = 300;
	  options.maxCode = 699;
	  options.events = ['rejected', 'failed'];
	  return this.reply(options);
	};
	
	ServerContext.prototype.reply = function (options) {
	  options = options || {}; // This is okay, so long as we treat options as read-only in this method
	  var
	    statusCode = options.statusCode || 100,
	    minCode = options.minCode || 100,
	    maxCode = options.maxCode || 699,
	    reasonPhrase = SIP.Utils.getReasonPhrase(statusCode, options.reasonPhrase),
	    extraHeaders = options.extraHeaders || [],
	    body = options.body,
	    events = options.events || [],
	    response;
	
	  if (statusCode < minCode || statusCode > maxCode) {
	    throw new TypeError('Invalid statusCode: ' + statusCode);
	  }
	  response = this.request.reply(statusCode, reasonPhrase, extraHeaders, body);
	  events.forEach(function (event) {
	    this.emit(event, response, reasonPhrase);
	  }, this);
	
	  return this;
	};
	
	ServerContext.prototype.onRequestTimeout = function () {
	  this.emit('failed', null, SIP.C.causes.REQUEST_TIMEOUT);
	};
	
	ServerContext.prototype.onTransportError = function () {
	  this.emit('failed', null, SIP.C.causes.CONNECTION_ERROR);
	};
	
	SIP.ServerContext = ServerContext;
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function (SIP, environment) {
	
	var DTMF = __webpack_require__(36)(SIP);
	
	var Session, InviteServerContext, InviteClientContext,
	 C = {
	    //Session states
	    STATUS_NULL:                        0,
	    STATUS_INVITE_SENT:                 1,
	    STATUS_1XX_RECEIVED:                2,
	    STATUS_INVITE_RECEIVED:             3,
	    STATUS_WAITING_FOR_ANSWER:          4,
	    STATUS_ANSWERED:                    5,
	    STATUS_WAITING_FOR_PRACK:           6,
	    STATUS_WAITING_FOR_ACK:             7,
	    STATUS_CANCELED:                    8,
	    STATUS_TERMINATED:                  9,
	    STATUS_ANSWERED_WAITING_FOR_PRACK: 10,
	    STATUS_EARLY_MEDIA:                11,
	    STATUS_CONFIRMED:                  12
	  };
	
	/*
	 * @param {function returning SIP.MediaHandler} [mediaHandlerFactory]
	 *        (See the documentation for the mediaHandlerFactory argument of the UA constructor.)
	 */
	Session = function (mediaHandlerFactory) {
	  this.status = C.STATUS_NULL;
	  this.dialog = null;
	  this.earlyDialogs = {};
	  this.mediaHandlerFactory = mediaHandlerFactory || SIP.WebRTC.MediaHandler.defaultFactory;
	  // this.mediaHandler gets set by ICC/ISC constructors
	  this.hasOffer = false;
	  this.hasAnswer = false;
	
	  // Session Timers
	  this.timers = {
	    ackTimer: null,
	    expiresTimer: null,
	    invite2xxTimer: null,
	    userNoAnswerTimer: null,
	    rel1xxTimer: null,
	    prackTimer: null
	  };
	
	  // Session info
	  this.startTime = null;
	  this.endTime = null;
	  this.tones = null;
	
	  // Mute/Hold state
	  this.local_hold = false;
	  this.remote_hold = false;
	
	  this.pending_actions = {
	    actions: [],
	
	    length: function() {
	      return this.actions.length;
	    },
	
	    isPending: function(name){
	      var
	      idx = 0,
	      length = this.actions.length;
	
	      for (idx; idx<length; idx++) {
	        if (this.actions[idx].name === name) {
	          return true;
	        }
	      }
	      return false;
	    },
	
	    shift: function() {
	      return this.actions.shift();
	    },
	
	    push: function(name) {
	      this.actions.push({
	        name: name
	      });
	    },
	
	    pop: function(name) {
	      var
	      idx = 0,
	      length = this.actions.length;
	
	      for (idx; idx<length; idx++) {
	        if (this.actions[idx].name === name) {
	          this.actions.splice(idx,1);
	          length --;
	          idx--;
	        }
	      }
	    }
	   };
	
	  this.early_sdp = null;
	  this.rel100 = SIP.C.supported.UNSUPPORTED;
	};
	
	Session.prototype = {
	  dtmf: function(tones, options) {
	    var tone, dtmfs = [],
	        self = this;
	
	    options = options || {};
	
	    if (tones === undefined) {
	      throw new TypeError('Not enough arguments');
	    }
	
	    // Check Session Status
	    if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_WAITING_FOR_ACK) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }
	
	    // Check tones
	    if ((typeof tones !== 'string' && typeof tones !== 'number') || !tones.toString().match(/^[0-9A-D#*,]+$/i)) {
	      throw new TypeError('Invalid tones: '+ tones);
	    }
	
	    tones = tones.toString().split('');
	
	    while (tones.length > 0) { dtmfs.push(new DTMF(this, tones.shift(), options)); }
	
	    if (this.tones) {
	      // Tones are already queued, just add to the queue
	      this.tones =  this.tones.concat(dtmfs);
	      return this;
	    }
	
	    var sendDTMF = function () {
	      var dtmf, timeout;
	
	      if (self.status === C.STATUS_TERMINATED || !self.tones || self.tones.length === 0) {
	        // Stop sending DTMF
	        self.tones = null;
	        return this;
	      }
	
	      dtmf = self.tones.shift();
	
	      if (tone === ',') {
	        timeout = 2000;
	      } else {
	        dtmf.on('failed', function(){self.tones = null;});
	        dtmf.send(options);
	        timeout = dtmf.duration + dtmf.interToneGap;
	      }
	
	      // Set timeout for the next tone
	      SIP.Timers.setTimeout(sendDTMF, timeout);
	    };
	
	    this.tones = dtmfs;
	    sendDTMF();
	    return this;
	  },
	
	  bye: function(options) {
	    options = Object.create(options || Object.prototype);
	    var statusCode = options.statusCode;
	
	    // Check Session Status
	    if (this.status === C.STATUS_TERMINATED) {
	      this.logger.error('Error: Attempted to send BYE in a terminated session.');
	      return this;
	    }
	
	    this.logger.log('terminating Session');
	
	    if (statusCode && (statusCode < 200 || statusCode >= 700)) {
	      throw new TypeError('Invalid statusCode: '+ statusCode);
	    }
	
	    options.receiveResponse = function () {};
	
	    return this.
	      sendRequest(SIP.C.BYE, options).
	      terminated();
	  },
	
	  refer: function(target, options) {
	    options = options || {};
	    var extraHeaders = (options.extraHeaders || []).slice(),
	        withReplaces =
	          target instanceof SIP.InviteServerContext ||
	          target instanceof SIP.InviteClientContext,
	        originalTarget = target;
	
	    if (target === undefined) {
	      throw new TypeError('Not enough arguments');
	    }
	
	    // Check Session Status
	    if (this.status !== C.STATUS_CONFIRMED) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }
	
	    // transform `target` so that it can be a Refer-To header value
	    if (withReplaces) {
	      //Attended Transfer
	      // B.transfer(C)
	      target = '"' + target.remoteIdentity.friendlyName + '" ' +
	        '<' + target.dialog.remote_target.toString() +
	        '?Replaces=' + target.dialog.id.call_id +
	        '%3Bto-tag%3D' + target.dialog.id.remote_tag +
	        '%3Bfrom-tag%3D' + target.dialog.id.local_tag + '>';
	    } else {
	      //Blind Transfer
	      // normalizeTarget allows instances of SIP.URI to pass through unaltered,
	      // so try to make one ahead of time
	      try {
	        target = SIP.Grammar.parse(target, 'Refer_To').uri || target;
	      } catch (e) {
	        this.logger.debug(".refer() cannot parse Refer_To from", target);
	        this.logger.debug("...falling through to normalizeTarget()");
	      }
	
	      // Check target validity
	      target = this.ua.normalizeTarget(target);
	      if (!target) {
	        throw new TypeError('Invalid target: ' + originalTarget);
	      }
	    }
	
	    extraHeaders.push('Contact: '+ this.contact);
	    extraHeaders.push('Allow: '+ SIP.UA.C.ALLOWED_METHODS.toString());
	    extraHeaders.push('Refer-To: '+ target);
	
	    // Send the request
	    this.sendRequest(SIP.C.REFER, {
	      extraHeaders: extraHeaders,
	      body: options.body,
	      receiveResponse: function (response) {
	        if ( ! /^2[0-9]{2}$/.test(response.status_code) ) {
	          return;
	        }
	        // hang up only if we transferred to a SIP address
	        if (withReplaces || (target.scheme && target.scheme.match("^sips?$"))) {
	          this.terminate();
	        }
	      }.bind(this)
	    });
	    return this;
	  },
	
	  followRefer: function followRefer (callback) {
	    return function referListener (callback, request) {
	      // open non-SIP URIs if possible and keep session open
	      var referTo = request.parseHeader('refer-to');
	      var target = referTo.uri;
	      if (!target.scheme.match("^sips?$")) {
	        var targetString = target.toString();
	        if (typeof environment.open === "function") {
	          environment.open(targetString);
	        } else {
	          this.logger.warn("referred to non-SIP URI but `open` isn't in the environment: " + targetString);
	        }
	        return;
	      }
	
	      var extraHeaders = [];
	
	      /* Copy the Replaces query into a Replaces header */
	      /* TODO - make sure we don't copy a poorly formatted header? */
	      var replaces = target.getHeader('Replaces');
	      if (replaces !== undefined) {
	        extraHeaders.push('Replaces: ' + decodeURIComponent(replaces));
	      }
	
	      // don't embed headers into Request-URI of INVITE
	      target.clearHeaders();
	
	      /*
	        Harmless race condition.  Both sides of REFER
	        may send a BYE, but in the end the dialogs are destroyed.
	      */
	      var getReferMedia = this.mediaHandler.getReferMedia;
	      var mediaHint = getReferMedia ? getReferMedia.call(this.mediaHandler) : this.mediaHint;
	
	      SIP.Hacks.Chrome.getsConfusedAboutGUM(this);
	
	      var referSession = this.ua.invite(target, {
	        media: mediaHint,
	        params: {
	          to_displayName: referTo.friendlyName
	        },
	        extraHeaders: extraHeaders
	      });
	
	      callback.call(this, request, referSession);
	
	      this.terminate();
	    }.bind(this, callback);
	  },
	
	  sendRequest: function(method,options) {
	    options = options || {};
	    var self = this;
	
	    var request = new SIP.OutgoingRequest(
	      method,
	      this.dialog.remote_target,
	      this.ua,
	      {
	        cseq: options.cseq || (this.dialog.local_seqnum += 1),
	        call_id: this.dialog.id.call_id,
	        from_uri: this.dialog.local_uri,
	        from_tag: this.dialog.id.local_tag,
	        to_uri: this.dialog.remote_uri,
	        to_tag: this.dialog.id.remote_tag,
	        route_set: this.dialog.route_set,
	        statusCode: options.statusCode,
	        reasonPhrase: options.reasonPhrase
	      },
	      options.extraHeaders || [],
	      options.body
	    );
	
	    new SIP.RequestSender({
	      request: request,
	      onRequestTimeout: function() {
	        self.onRequestTimeout();
	      },
	      onTransportError: function() {
	        self.onTransportError();
	      },
	      receiveResponse: options.receiveResponse || function(response) {
	        self.receiveNonInviteResponse(response);
	      }
	    }, this.ua).send();
	
	    // Emit the request event
	    this.emit(method.toLowerCase(), request);
	
	    return this;
	  },
	
	  close: function() {
	    var idx;
	
	    if(this.status === C.STATUS_TERMINATED) {
	      return this;
	    }
	
	    this.logger.log('closing INVITE session ' + this.id);
	
	    // 1st Step. Terminate media.
	    if (this.mediaHandler){
	      this.mediaHandler.close();
	    }
	
	    // 2nd Step. Terminate signaling.
	
	    // Clear session timers
	    for(idx in this.timers) {
	      SIP.Timers.clearTimeout(this.timers[idx]);
	    }
	
	    // Terminate dialogs
	
	    // Terminate confirmed dialog
	    if(this.dialog) {
	      this.dialog.terminate();
	      delete this.dialog;
	    }
	
	    // Terminate early dialogs
	    for(idx in this.earlyDialogs) {
	      this.earlyDialogs[idx].terminate();
	      delete this.earlyDialogs[idx];
	    }
	
	    this.status = C.STATUS_TERMINATED;
	
	    delete this.ua.sessions[this.id];
	    return this;
	  },
	
	  createDialog: function(message, type, early) {
	    var dialog, early_dialog,
	      local_tag = message[(type === 'UAS') ? 'to_tag' : 'from_tag'],
	      remote_tag = message[(type === 'UAS') ? 'from_tag' : 'to_tag'],
	      id = message.call_id + local_tag + remote_tag;
	
	    early_dialog = this.earlyDialogs[id];
	
	    // Early Dialog
	    if (early) {
	      if (early_dialog) {
	        return true;
	      } else {
	        early_dialog = new SIP.Dialog(this, message, type, SIP.Dialog.C.STATUS_EARLY);
	
	        // Dialog has been successfully created.
	        if(early_dialog.error) {
	          this.logger.error(early_dialog.error);
	          this.failed(message, SIP.C.causes.INTERNAL_ERROR);
	          return false;
	        } else {
	          this.earlyDialogs[id] = early_dialog;
	          return true;
	        }
	      }
	    }
	    // Confirmed Dialog
	    else {
	      // In case the dialog is in _early_ state, update it
	      if (early_dialog) {
	        early_dialog.update(message, type);
	        this.dialog = early_dialog;
	        delete this.earlyDialogs[id];
	        for (var dia in this.earlyDialogs) {
	          this.earlyDialogs[dia].terminate();
	          delete this.earlyDialogs[dia];
	        }
	        return true;
	      }
	
	      // Otherwise, create a _confirmed_ dialog
	      dialog = new SIP.Dialog(this, message, type);
	
	      if(dialog.error) {
	        this.logger.error(dialog.error);
	        this.failed(message, SIP.C.causes.INTERNAL_ERROR);
	        return false;
	      } else {
	        this.to_tag = message.to_tag;
	        this.dialog = dialog;
	        return true;
	      }
	    }
	  },
	
	  /**
	  * Check if Session is ready for a re-INVITE
	  *
	  * @returns {Boolean}
	  */
	  isReadyToReinvite: function() {
	    return this.mediaHandler.isReady() &&
	      !this.dialog.uac_pending_reply &&
	      !this.dialog.uas_pending_reply;
	  },
	
	  /**
	   * Mute
	   */
	  mute: function(options) {
	    var ret = this.mediaHandler.mute(options);
	    if (ret) {
	      this.onmute(ret);
	    }
	  },
	
	  /**
	   * Unmute
	   */
	  unmute: function(options) {
	    var ret = this.mediaHandler.unmute(options);
	    if (ret) {
	      this.onunmute(ret);
	    }
	  },
	
	  /**
	   * Hold
	   */
	  hold: function() {
	
	    if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }
	
	    this.mediaHandler.hold();
	
	    // Check if RTCSession is ready to send a reINVITE
	    if (!this.isReadyToReinvite()) {
	      /* If there is a pending 'unhold' action, cancel it and don't queue this one
	       * Else, if there isn't any 'hold' action, add this one to the queue
	       * Else, if there is already a 'hold' action, skip
	       */
	      if (this.pending_actions.isPending('unhold')) {
	        this.pending_actions.pop('unhold');
	      } else if (!this.pending_actions.isPending('hold')) {
	        this.pending_actions.push('hold');
	      }
	      return;
	    } else if (this.local_hold === true) {
	        return;
	    }
	
	    this.onhold('local');
	
	    this.sendReinvite({
	      mangle: function(body){
	
	        // Don't receive media
	        // TODO - This will break for media streams with different directions.
	        if (!(/a=(sendrecv|sendonly|recvonly|inactive)/).test(body)) {
	          body = body.replace(/(m=[^\r]*\r\n)/g, '$1a=sendonly\r\n');
	        } else {
	          body = body.replace(/a=sendrecv\r\n/g, 'a=sendonly\r\n');
	          body = body.replace(/a=recvonly\r\n/g, 'a=inactive\r\n');
	        }
	
	        return body;
	      }
	    });
	  },
	
	  /**
	   * Unhold
	   */
	  unhold: function() {
	
	    if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }
	
	    this.mediaHandler.unhold();
	
	    if (!this.isReadyToReinvite()) {
	      /* If there is a pending 'hold' action, cancel it and don't queue this one
	       * Else, if there isn't any 'unhold' action, add this one to the queue
	       * Else, if there is already a 'unhold' action, skip
	       */
	      if (this.pending_actions.isPending('hold')) {
	        this.pending_actions.pop('hold');
	      } else if (!this.pending_actions.isPending('unhold')) {
	        this.pending_actions.push('unhold');
	      }
	      return;
	    } else if (this.local_hold === false) {
	      return;
	    }
	
	    this.onunhold('local');
	
	    this.sendReinvite();
	  },
	
	  /**
	   * isOnHold
	   */
	  isOnHold: function() {
	    return {
	      local: this.local_hold,
	      remote: this.remote_hold
	    };
	  },
	
	  /**
	   * In dialog INVITE Reception
	   * @private
	   */
	  receiveReinvite: function(request) {
	    var self = this;
	
	    if (!request.body) {
	      return;
	    }
	
	    if (request.getHeader('Content-Type') !== 'application/sdp') {
	      this.logger.warn('invalid Content-Type');
	      request.reply(415);
	      return;
	    }
	
	    this.mediaHandler.setDescription(request.body)
	    .then(this.mediaHandler.getDescription.bind(this.mediaHandler, this.mediaHint))
	    .then(function(body) {
	      request.reply(200, null, ['Contact: ' + self.contact], body,
	        function() {
	          self.status = C.STATUS_WAITING_FOR_ACK;
	          self.setInvite2xxTimer(request, body);
	          self.setACKTimer();
	
	          // Are we holding?
	          var hold = (/a=(sendonly|inactive)/).test(request.body);
	
	          if (self.remote_hold && !hold) {
	            self.onunhold('remote');
	          } else if (!self.remote_hold && hold) {
	            self.onhold('remote');
	          }
	        });
	    })
	    .catch(function onFailure (e) {
	      var statusCode;
	      if (e instanceof SIP.Exceptions.GetDescriptionError) {
	        statusCode = 500;
	      } else {
	        self.logger.error(e);
	        statusCode = 488;
	      }
	      request.reply(statusCode);
	    });
	  },
	
	  sendReinvite: function(options) {
	    options = options || {};
	
	    var
	      self = this,
	       extraHeaders = (options.extraHeaders || []).slice(),
	       eventHandlers = options.eventHandlers || {},
	       mangle = options.mangle || null;
	
	    if (eventHandlers.succeeded) {
	      this.reinviteSucceeded = eventHandlers.succeeded;
	    } else {
	      this.reinviteSucceeded = function(){
	        SIP.Timers.clearTimeout(self.timers.ackTimer);
	        SIP.Timers.clearTimeout(self.timers.invite2xxTimer);
	        self.status = C.STATUS_CONFIRMED;
	      };
	    }
	    if (eventHandlers.failed) {
	      this.reinviteFailed = eventHandlers.failed;
	    } else {
	      this.reinviteFailed = function(){};
	    }
	
	    extraHeaders.push('Contact: ' + this.contact);
	    extraHeaders.push('Allow: '+ SIP.UA.C.ALLOWED_METHODS.toString());
	    extraHeaders.push('Content-Type: application/sdp');
	
	    this.receiveResponse = this.receiveReinviteResponse;
	    //REVISIT
	    this.mediaHandler.getDescription(self.mediaHint)
	    .then(mangle)
	    .then(
	      function(body){
	        self.dialog.sendRequest(self, SIP.C.INVITE, {
	          extraHeaders: extraHeaders,
	          body: body
	        });
	      },
	      function() {
	        if (self.isReadyToReinvite()) {
	          self.onReadyToReinvite();
	        }
	        self.reinviteFailed();
	      }
	    );
	  },
	
	  receiveRequest: function (request) {
	    switch (request.method) {
	      case SIP.C.BYE:
	        request.reply(200);
	        if(this.status === C.STATUS_CONFIRMED) {
	          this.emit('bye', request);
	          this.terminated(request, SIP.C.causes.BYE);
	        }
	        break;
	      case SIP.C.INVITE:
	        if(this.status === C.STATUS_CONFIRMED) {
	          this.logger.log('re-INVITE received');
	          this.receiveReinvite(request);
	        }
	        break;
	      case SIP.C.INFO:
	        if(this.status === C.STATUS_CONFIRMED || this.status === C.STATUS_WAITING_FOR_ACK) {
	          var body, tone, duration,
	              contentType = request.getHeader('content-type'),
	              reg_tone = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/,
	              reg_duration = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;
	
	          if (contentType) {
	            if (contentType.match(/^application\/dtmf-relay/i)) {
	              if (request.body) {
	                body = request.body.split('\r\n', 2);
	                if (body.length === 2) {
	                  if (reg_tone.test(body[0])) {
	                    tone = body[0].replace(reg_tone,"$2");
	                  }
	                  if (reg_duration.test(body[1])) {
	                    duration = parseInt(body[1].replace(reg_duration,"$2"), 10);
	                  }
	                }
	              }
	
	              new DTMF(this, tone, {duration: duration}).init_incoming(request);
	            } else {
	              request.reply(415, null, ["Accept: application/dtmf-relay"]);
	            }
	          }
	        }
	        break;
	      case SIP.C.REFER:
	        if(this.status ===  C.STATUS_CONFIRMED) {
	          this.logger.log('REFER received');
	          request.reply(202, 'Accepted');
	          var
	            hasReferListener = this.listeners('refer').length,
	            notifyBody = hasReferListener ?
	              'SIP/2.0 100 Trying' :
	              // RFC 3515.2.4.2: 'the UA MAY decline the request.'
	              'SIP/2.0 603 Declined'
	          ;
	
	          this.sendRequest(SIP.C.NOTIFY, {
	            extraHeaders:[
	              'Event: refer',
	              'Subscription-State: terminated',
	              'Content-Type: message/sipfrag'
	            ],
	            body: notifyBody,
	            receiveResponse: function() {}
	          });
	
	          if (hasReferListener) {
	            this.emit('refer', request);
	          }
	        }
	        break;
	      case SIP.C.NOTIFY:
	        request.reply(200, 'OK');
	        this.emit('notify', request);
	        break;
	    }
	  },
	
	  /**
	   * Reception of Response for in-dialog INVITE
	   * @private
	   */
	  receiveReinviteResponse: function(response) {
	    var self = this,
	        contentType = response.getHeader('Content-Type');
	
	    if (this.status === C.STATUS_TERMINATED) {
	      return;
	    }
	
	    switch(true) {
	      case /^1[0-9]{2}$/.test(response.status_code):
	        break;
	      case /^2[0-9]{2}$/.test(response.status_code):
	        this.status = C.STATUS_CONFIRMED;
	
	        this.sendRequest(SIP.C.ACK,{cseq:response.cseq});
	
	        if(!response.body) {
	          this.reinviteFailed();
	          break;
	        } else if (contentType !== 'application/sdp') {
	          this.reinviteFailed();
	          break;
	        }
	
	        //REVISIT
	        this.mediaHandler.setDescription(response.body)
	        .then(
	          function onSuccess () {
	            self.reinviteSucceeded();
	          },
	          function onFailure () {
	            self.reinviteFailed();
	          }
	        );
	        break;
	      default:
	        this.reinviteFailed();
	    }
	  },
	
	  acceptAndTerminate: function(response, status_code, reason_phrase) {
	    var extraHeaders = [];
	
	    if (status_code) {
	      extraHeaders.push('Reason: ' + SIP.Utils.getReasonHeaderValue(status_code, reason_phrase));
	    }
	
	    // An error on dialog creation will fire 'failed' event
	    if (this.dialog || this.createDialog(response, 'UAC')) {
	      this.sendRequest(SIP.C.ACK,{cseq: response.cseq});
	      this.sendRequest(SIP.C.BYE, {
	        extraHeaders: extraHeaders
	      });
	    }
	
	    return this;
	  },
	
	  /**
	   * RFC3261 13.3.1.4
	   * Response retransmissions cannot be accomplished by transaction layer
	   *  since it is destroyed when receiving the first 2xx answer
	   */
	  setInvite2xxTimer: function(request, body) {
	    var self = this,
	        timeout = SIP.Timers.T1;
	
	    this.timers.invite2xxTimer = SIP.Timers.setTimeout(function invite2xxRetransmission() {
	      if (self.status !== C.STATUS_WAITING_FOR_ACK) {
	        return;
	      }
	
	      self.logger.log('no ACK received, attempting to retransmit OK');
	
	      request.reply(200, null, ['Contact: ' + self.contact], body);
	
	      timeout = Math.min(timeout * 2, SIP.Timers.T2);
	
	      self.timers.invite2xxTimer = SIP.Timers.setTimeout(invite2xxRetransmission, timeout);
	    }, timeout);
	  },
	
	  /**
	   * RFC3261 14.2
	   * If a UAS generates a 2xx response and never receives an ACK,
	   *  it SHOULD generate a BYE to terminate the dialog.
	   */
	  setACKTimer: function() {
	    var self = this;
	
	    this.timers.ackTimer = SIP.Timers.setTimeout(function() {
	      if(self.status === C.STATUS_WAITING_FOR_ACK) {
	        self.logger.log('no ACK received for an extended period of time, terminating the call');
	        SIP.Timers.clearTimeout(self.timers.invite2xxTimer);
	        self.sendRequest(SIP.C.BYE);
	        self.terminated(null, SIP.C.causes.NO_ACK);
	      }
	    }, SIP.Timers.TIMER_H);
	  },
	
	  /*
	   * @private
	   */
	  onReadyToReinvite: function() {
	    var action = this.pending_actions.shift();
	
	    if (!action || !this[action.name]) {
	      return;
	    }
	
	    this[action.name]();
	  },
	
	  onTransportError: function() {
	    if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_TERMINATED) {
	      this.failed(null, SIP.C.causes.CONNECTION_ERROR);
	    }
	  },
	
	  onRequestTimeout: function() {
	    if (this.status === C.STATUS_CONFIRMED) {
	      this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	    } else if (this.status !== C.STATUS_TERMINATED) {
	      this.failed(null, SIP.C.causes.REQUEST_TIMEOUT);
	      this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	    }
	  },
	
	  onDialogError: function(response) {
	    if (this.status === C.STATUS_CONFIRMED) {
	      this.terminated(response, SIP.C.causes.DIALOG_ERROR);
	    } else if (this.status !== C.STATUS_TERMINATED) {
	      this.failed(response, SIP.C.causes.DIALOG_ERROR);
	      this.terminated(response, SIP.C.causes.DIALOG_ERROR);
	    }
	  },
	
	  /**
	   * @private
	   */
	  onhold: function(originator) {
	    this[originator === 'local' ? 'local_hold' : 'remote_hold'] = true;
	    this.emit('hold', { originator: originator });
	  },
	
	  /**
	   * @private
	   */
	  onunhold: function(originator) {
	    this[originator === 'local' ? 'local_hold' : 'remote_hold'] = false;
	    this.emit('unhold', { originator: originator });
	  },
	
	  /*
	   * @private
	   */
	  onmute: function(options) {
	    this.emit('muted', {
	      audio: options.audio,
	      video: options.video
	    });
	  },
	
	  /*
	   * @private
	   */
	  onunmute: function(options) {
	    this.emit('unmuted', {
	      audio: options.audio,
	      video: options.video
	    });
	  },
	
	  failed: function(response, cause) {
	    if (this.status === C.STATUS_TERMINATED) {
	      return this;
	    }
	    this.emit('failed', response || null, cause || null);
	    return this;
	  },
	
	  rejected: function(response, cause) {
	    this.emit('rejected',
	      response || null,
	      cause || null
	    );
	    return this;
	  },
	
	  canceled: function() {
	    this.emit('cancel');
	    return this;
	  },
	
	  accepted: function(response, cause) {
	    cause = SIP.Utils.getReasonPhrase(response && response.status_code, cause);
	
	    this.startTime = new Date();
	
	    if (this.replacee) {
	      this.replacee.emit('replaced', this);
	      this.replacee.terminate();
	    }
	    this.emit('accepted', response, cause);
	    return this;
	  },
	
	  terminated: function(message, cause) {
	    if (this.status === C.STATUS_TERMINATED) {
	      return this;
	    }
	
	    this.endTime = new Date();
	
	    this.close();
	    this.emit('terminated',
	      message || null,
	      cause || null
	    );
	    return this;
	  },
	
	  connecting: function(request) {
	    this.emit('connecting', { request: request });
	    return this;
	  }
	};
	
	Session.desugar = function desugar(options) {
	  if (environment.HTMLMediaElement && options instanceof environment.HTMLMediaElement) {
	    options = {
	      media: {
	        constraints: {
	          audio: true,
	          video: options.tagName === 'VIDEO'
	        },
	        render: {
	          remote: options
	        }
	      }
	    };
	  }
	  return options || {};
	};
	
	
	Session.C = C;
	SIP.Session = Session;
	
	
	InviteServerContext = function(ua, request) {
	  var expires,
	    self = this,
	    contentType = request.getHeader('Content-Type'),
	    contentDisp = request.parseHeader('Content-Disposition');
	
	  // Check body and content type
	  if ((!contentDisp && contentType !== 'application/sdp') || (contentDisp && contentDisp.type === 'render')) {
	    this.renderbody = request.body;
	    this.rendertype = contentType;
	  } else if (contentType !== 'application/sdp' && (contentDisp && contentDisp.type === 'session')) {
	    request.reply(415);
	    //TODO: instead of 415, pass off to the media handler, who can then decide if we can use it
	    return;
	  }
	
	  //TODO: move this into media handler
	  SIP.Hacks.Firefox.cannotHandleExtraWhitespace(request);
	  SIP.Hacks.AllBrowsers.maskDtls(request);
	
	  SIP.Utils.augment(this, SIP.ServerContext, [ua, request]);
	  SIP.Utils.augment(this, SIP.Session, [ua.configuration.mediaHandlerFactory]);
	
	  this.status = C.STATUS_INVITE_RECEIVED;
	  this.from_tag = request.from_tag;
	  this.id = request.call_id + this.from_tag;
	  this.request = request;
	  this.contact = this.ua.contact.toString();
	
	  this.receiveNonInviteResponse = function () {}; // intentional no-op
	
	  this.logger = ua.getLogger('sip.inviteservercontext', this.id);
	
	  //Save the session into the ua sessions collection.
	  this.ua.sessions[this.id] = this;
	
	  //Get the Expires header value if exists
	  if(request.hasHeader('expires')) {
	    expires = request.getHeader('expires') * 1000;
	  }
	
	  //Set 100rel if necessary
	  function set100rel(h,c) {
	    if (request.hasHeader(h) && request.getHeader(h).toLowerCase().indexOf('100rel') >= 0) {
	      self.rel100 = c;
	    }
	  }
	  set100rel('require', SIP.C.supported.REQUIRED);
	  set100rel('supported', SIP.C.supported.SUPPORTED);
	
	  /* Set the to_tag before
	   * replying a response code that will create a dialog.
	   */
	  request.to_tag = SIP.Utils.newTag();
	
	  // An error on dialog creation will fire 'failed' event
	  if(!this.createDialog(request, 'UAS', true)) {
	    request.reply(500, 'Missing Contact header field');
	    return;
	  }
	
	  //Initialize Media Session
	  this.mediaHandler = this.mediaHandlerFactory(this, {
	    RTCConstraints: {"optional": [{'DtlsSrtpKeyAgreement': 'true'}]}
	  });
	
	  if (this.mediaHandler && this.mediaHandler.getRemoteStreams) {
	    this.getRemoteStreams = this.mediaHandler.getRemoteStreams.bind(this.mediaHandler);
	    this.getLocalStreams = this.mediaHandler.getLocalStreams.bind(this.mediaHandler);
	  }
	
	  function fireNewSession() {
	    var options = {extraHeaders: ['Contact: ' + self.contact]};
	
	    if (self.rel100 !== SIP.C.supported.REQUIRED) {
	      self.progress(options);
	    }
	    self.status = C.STATUS_WAITING_FOR_ANSWER;
	
	    // Set userNoAnswerTimer
	    self.timers.userNoAnswerTimer = SIP.Timers.setTimeout(function() {
	      request.reply(408);
	      self.failed(request, SIP.C.causes.NO_ANSWER);
	      self.terminated(request, SIP.C.causes.NO_ANSWER);
	    }, self.ua.configuration.noAnswerTimeout);
	
	    /* Set expiresTimer
	     * RFC3261 13.3.1
	     */
	    if (expires) {
	      self.timers.expiresTimer = SIP.Timers.setTimeout(function() {
	        if(self.status === C.STATUS_WAITING_FOR_ANSWER) {
	          request.reply(487);
	          self.failed(request, SIP.C.causes.EXPIRES);
	          self.terminated(request, SIP.C.causes.EXPIRES);
	        }
	      }, expires);
	    }
	
	    self.emit('invite',request);
	  }
	
	  if (!request.body || this.renderbody) {
	    SIP.Timers.setTimeout(fireNewSession, 0);
	  } else {
	    this.hasOffer = true;
	    this.mediaHandler.setDescription(request.body)
	    .then(
	      fireNewSession,
	      function onFailure (e) {
	        self.logger.warn('invalid SDP');
	        self.logger.warn(e);
	        request.reply(488);
	      }
	    );
	  }
	};
	
	InviteServerContext.prototype = {
	  reject: function(options) {
	    // Check Session Status
	    if (this.status === C.STATUS_TERMINATED) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }
	
	    this.logger.log('rejecting RTCSession');
	
	    SIP.ServerContext.prototype.reject.call(this, options);
	    return this.terminated();
	  },
	
	  terminate: function(options) {
	    options = options || {};
	
	    var
	    extraHeaders = (options.extraHeaders || []).slice(),
	    body = options.body,
	    dialog,
	    self = this;
	
	    if (this.status === C.STATUS_WAITING_FOR_ACK &&
	       this.request.server_transaction.state !== SIP.Transactions.C.STATUS_TERMINATED) {
	      dialog = this.dialog;
	
	      this.receiveRequest = function(request) {
	        if (request.method === SIP.C.ACK) {
	          this.request(SIP.C.BYE, {
	            extraHeaders: extraHeaders,
	            body: body
	          });
	          dialog.terminate();
	        }
	      };
	
	      this.request.server_transaction.on('stateChanged', function(){
	        if (this.state === SIP.Transactions.C.STATUS_TERMINATED) {
	          this.request = new SIP.OutgoingRequest(
	            SIP.C.BYE,
	            this.dialog.remote_target,
	            this.ua,
	            {
	              'cseq': this.dialog.local_seqnum+=1,
	              'call_id': this.dialog.id.call_id,
	              'from_uri': this.dialog.local_uri,
	              'from_tag': this.dialog.id.local_tag,
	              'to_uri': this.dialog.remote_uri,
	              'to_tag': this.dialog.id.remote_tag,
	              'route_set': this.dialog.route_set
	            },
	            extraHeaders,
	            body
	          );
	
	          new SIP.RequestSender(
	            {
	              request: this.request,
	              onRequestTimeout: function() {
	                self.onRequestTimeout();
	              },
	              onTransportError: function() {
	                self.onTransportError();
	              },
	              receiveResponse: function() {
	                return;
	              }
	            },
	            this.ua
	          ).send();
	          dialog.terminate();
	        }
	      });
	
	      this.emit('bye', this.request);
	      this.terminated();
	
	      // Restore the dialog into 'this' in order to be able to send the in-dialog BYE :-)
	      this.dialog = dialog;
	
	      // Restore the dialog into 'ua' so the ACK can reach 'this' session
	      this.ua.dialogs[dialog.id.toString()] = dialog;
	
	    } else if (this.status === C.STATUS_CONFIRMED) {
	      this.bye(options);
	    } else {
	      this.reject(options);
	    }
	
	    return this;
	  },
	
	  /*
	   * @param {Object} [options.media] gets passed to SIP.MediaHandler.getDescription as mediaHint
	   */
	  progress: function (options) {
	    options = options || {};
	    var
	      statusCode = options.statusCode || 180,
	      reasonPhrase = options.reasonPhrase,
	      extraHeaders = (options.extraHeaders || []).slice(),
	      iceServers,
	      stunServers = options.stunServers || null,
	      turnServers = options.turnServers || null,
	      body = options.body,
	      response;
	
	    if (statusCode < 100 || statusCode > 199) {
	      throw new TypeError('Invalid statusCode: ' + statusCode);
	    }
	
	    if (this.isCanceled || this.status === C.STATUS_TERMINATED) {
	      return this;
	    }
	
	    if (stunServers || turnServers) {
	      if (stunServers) {
	        iceServers = SIP.UA.configuration_check.optional['stunServers'](stunServers);
	        if (!iceServers) {
	          throw new TypeError('Invalid stunServers: '+ stunServers);
	        } else {
	          this.stunServers = iceServers;
	        }
	      }
	
	      if (turnServers) {
	        iceServers = SIP.UA.configuration_check.optional['turnServers'](turnServers);
	        if (!iceServers) {
	          throw new TypeError('Invalid turnServers: '+ turnServers);
	        } else {
	          this.turnServers = iceServers;
	        }
	      }
	
	      this.mediaHandler.updateIceServers({
	        stunServers: this.stunServers,
	        turnServers: this.turnServers
	      });
	    }
	
	    function do100rel() {
	      /* jshint validthis: true */
	      statusCode = options.statusCode || 183;
	
	      // Set status and add extra headers
	      this.status = C.STATUS_WAITING_FOR_PRACK;
	      extraHeaders.push('Contact: '+ this.contact);
	      extraHeaders.push('Require: 100rel');
	      extraHeaders.push('RSeq: ' + Math.floor(Math.random() * 10000));
	
	      // Save media hint for later (referred sessions)
	      this.mediaHint = options.media;
	
	      // Get the session description to add to preaccept with
	      this.mediaHandler.getDescription(options.media)
	      .then(
	        function onSuccess (body) {
	          if (this.isCanceled || this.status === C.STATUS_TERMINATED) {
	            return;
	          }
	
	          this.early_sdp = body;
	          this[this.hasOffer ? 'hasAnswer' : 'hasOffer'] = true;
	
	          // Retransmit until we get a response or we time out (see prackTimer below)
	          var timeout = SIP.Timers.T1;
	          this.timers.rel1xxTimer = SIP.Timers.setTimeout(function rel1xxRetransmission() {
	            this.request.reply(statusCode, null, extraHeaders, body);
	            timeout *= 2;
	            this.timers.rel1xxTimer = SIP.Timers.setTimeout(rel1xxRetransmission.bind(this), timeout);
	          }.bind(this), timeout);
	
	          // Timeout and reject INVITE if no response
	          this.timers.prackTimer = SIP.Timers.setTimeout(function () {
	            if (this.status !== C.STATUS_WAITING_FOR_PRACK) {
	              return;
	            }
	
	            this.logger.log('no PRACK received, rejecting the call');
	            SIP.Timers.clearTimeout(this.timers.rel1xxTimer);
	            this.request.reply(504);
	            this.terminated(null, SIP.C.causes.NO_PRACK);
	          }.bind(this), SIP.Timers.T1 * 64);
	
	          // Send the initial response
	          response = this.request.reply(statusCode, reasonPhrase, extraHeaders, body);
	          this.emit('progress', response, reasonPhrase);
	        }.bind(this),
	
	        function onFailure () {
	          this.request.reply(480);
	          this.failed(null, SIP.C.causes.WEBRTC_ERROR);
	          this.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	        }.bind(this)
	      );
	    } // end do100rel
	
	    function normalReply() {
	      /* jshint validthis:true */
	      response = this.request.reply(statusCode, reasonPhrase, extraHeaders, body);
	      this.emit('progress', response, reasonPhrase);
	    }
	
	    if (options.statusCode !== 100 &&
	        (this.rel100 === SIP.C.supported.REQUIRED ||
	         (this.rel100 === SIP.C.supported.SUPPORTED && options.rel100) ||
	         (this.rel100 === SIP.C.supported.SUPPORTED && (this.ua.configuration.rel100 === SIP.C.supported.REQUIRED)))) {
	      do100rel.apply(this);
	    } else {
	      normalReply.apply(this);
	    }
	    return this;
	  },
	
	  /*
	   * @param {Object} [options.media] gets passed to SIP.MediaHandler.getDescription as mediaHint
	   */
	  accept: function(options) {
	    options = Object.create(Session.desugar(options));
	    SIP.Utils.optionsOverride(options, 'media', 'mediaConstraints', true, this.logger, this.ua.configuration.media);
	    this.mediaHint = options.media;
	
	    // commented out now-unused hold-related variables for jshint. See below. JMF 2014-1-21
	    var
	      //idx, length, hasAudio, hasVideo,
	      self = this,
	      request = this.request,
	      extraHeaders = (options.extraHeaders || []).slice(),
	    //mediaStream = options.mediaStream || null,
	      iceServers,
	      stunServers = options.stunServers || null,
	      turnServers = options.turnServers || null,
	      sdpCreationSucceeded = function(body) {
	        var
	          response,
	          // run for reply success callback
	          replySucceeded = function() {
	            self.status = C.STATUS_WAITING_FOR_ACK;
	
	            self.setInvite2xxTimer(request, body);
	            self.setACKTimer();
	          },
	
	          // run for reply failure callback
	          replyFailed = function() {
	            self.failed(null, SIP.C.causes.CONNECTION_ERROR);
	            self.terminated(null, SIP.C.causes.CONNECTION_ERROR);
	          };
	
	        // Chrome might call onaddstream before accept() is called, which means
	        // mediaHandler.render() was called without a renderHint, so we need to
	        // re-render now that mediaHint.render has been set.
	        //
	        // Chrome seems to be in the right regarding this, see
	        // http://dev.w3.org/2011/webrtc/editor/webrtc.html#widl-RTCPeerConnection-onaddstream
	        self.mediaHandler.render();
	
	        extraHeaders.push('Contact: ' + self.contact);
	        extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());
	
	        if(!self.hasOffer) {
	          self.hasOffer = true;
	        } else {
	          self.hasAnswer = true;
	        }
	        response = request.reply(200, null, extraHeaders,
	                      body,
	                      replySucceeded,
	                      replyFailed
	                     );
	        if (self.status !== C.STATUS_TERMINATED) { // Didn't fail
	          self.accepted(response, SIP.Utils.getReasonPhrase(200));
	        }
	      },
	
	      sdpCreationFailed = function() {
	        if (self.status === C.STATUS_TERMINATED) {
	          return;
	        }
	        // TODO - fail out on error
	        self.request.reply(480);
	        //self.failed(response, SIP.C.causes.USER_DENIED_MEDIA_ACCESS);
	        self.failed(null, SIP.C.causes.WEBRTC_ERROR);
	        self.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	      };
	
	    // Check Session Status
	    if (this.status === C.STATUS_WAITING_FOR_PRACK) {
	      this.status = C.STATUS_ANSWERED_WAITING_FOR_PRACK;
	      return this;
	    } else if (this.status === C.STATUS_WAITING_FOR_ANSWER) {
	      this.status = C.STATUS_ANSWERED;
	    } else if (this.status !== C.STATUS_EARLY_MEDIA) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }
	
	    if ((stunServers || turnServers) &&
	        (this.status !== C.STATUS_EARLY_MEDIA && this.status !== C.STATUS_ANSWERED_WAITING_FOR_PRACK)) {
	      if (stunServers) {
	        iceServers = SIP.UA.configuration_check.optional['stunServers'](stunServers);
	        if (!iceServers) {
	          throw new TypeError('Invalid stunServers: '+ stunServers);
	        } else {
	          this.stunServers = iceServers;
	        }
	      }
	
	      if (turnServers) {
	        iceServers = SIP.UA.configuration_check.optional['turnServers'](turnServers);
	        if (!iceServers) {
	          throw new TypeError('Invalid turnServers: '+ turnServers);
	        } else {
	          this.turnServers = iceServers;
	        }
	      }
	
	      this.mediaHandler.updateIceServers({
	        stunServers: this.stunServers,
	        turnServers: this.turnServers
	      });
	    }
	
	    // An error on dialog creation will fire 'failed' event
	    if(!this.createDialog(request, 'UAS')) {
	      request.reply(500, 'Missing Contact header field');
	      return this;
	    }
	
	    SIP.Timers.clearTimeout(this.timers.userNoAnswerTimer);
	
	    // this hold-related code breaks FF accepting new calls - JMF 2014-1-21
	    /*
	    length = this.getRemoteStreams().length;
	
	    for (idx = 0; idx < length; idx++) {
	      if (this.mediaHandler.getRemoteStreams()[idx].getVideoTracks().length > 0) {
	        hasVideo = true;
	      }
	      if (this.mediaHandler.getRemoteStreams()[idx].getAudioTracks().length > 0) {
	        hasAudio = true;
	      }
	    }
	
	    if (!hasAudio && this.mediaConstraints.audio === true) {
	      this.mediaConstraints.audio = false;
	      if (mediaStream) {
	        length = mediaStream.getAudioTracks().length;
	        for (idx = 0; idx < length; idx++) {
	          mediaStream.removeTrack(mediaStream.getAudioTracks()[idx]);
	        }
	      }
	    }
	
	    if (!hasVideo && this.mediaConstraints.video === true) {
	      this.mediaConstraints.video = false;
	      if (mediaStream) {
	        length = mediaStream.getVideoTracks().length;
	        for (idx = 0; idx < length; idx++) {
	          mediaStream.removeTrack(mediaStream.getVideoTracks()[idx]);
	        }
	      }
	    }
	    */
	
	    if (this.status === C.STATUS_EARLY_MEDIA) {
	      sdpCreationSucceeded();
	    } else {
	      this.mediaHandler.getDescription(self.mediaHint)
	      .then(
	        sdpCreationSucceeded,
	        sdpCreationFailed
	      );
	    }
	
	    return this;
	  },
	
	  receiveRequest: function(request) {
	
	    // ISC RECEIVE REQUEST
	
	    function confirmSession() {
	      /* jshint validthis:true */
	      var contentType;
	
	      SIP.Timers.clearTimeout(this.timers.ackTimer);
	      SIP.Timers.clearTimeout(this.timers.invite2xxTimer);
	      this.status = C.STATUS_CONFIRMED;
	      this.unmute();
	
	      // TODO - this logic assumes Content-Disposition defaults
	      contentType = request.getHeader('Content-Type');
	      if (contentType !== 'application/sdp') {
	        this.renderbody = request.body;
	        this.rendertype = contentType;
	      }
	    }
	
	    switch(request.method) {
	    case SIP.C.CANCEL:
	      /* RFC3261 15 States that a UAS may have accepted an invitation while a CANCEL
	       * was in progress and that the UAC MAY continue with the session established by
	       * any 2xx response, or MAY terminate with BYE. SIP does continue with the
	       * established session. So the CANCEL is processed only if the session is not yet
	       * established.
	       */
	
	      /*
	       * Terminate the whole session in case the user didn't accept (or yet to send the answer) nor reject the
	       *request opening the session.
	       */
	      if(this.status === C.STATUS_WAITING_FOR_ANSWER ||
	         this.status === C.STATUS_WAITING_FOR_PRACK ||
	         this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK ||
	         this.status === C.STATUS_EARLY_MEDIA ||
	         this.status === C.STATUS_ANSWERED) {
	
	        this.status = C.STATUS_CANCELED;
	        this.request.reply(487);
	        this.canceled(request);
	        this.rejected(request, SIP.C.causes.CANCELED);
	        this.failed(request, SIP.C.causes.CANCELED);
	        this.terminated(request, SIP.C.causes.CANCELED);
	      }
	      break;
	    case SIP.C.ACK:
	      if(this.status === C.STATUS_WAITING_FOR_ACK) {
	        if (!this.hasAnswer) {
	          if(request.body && request.getHeader('content-type') === 'application/sdp') {
	            // ACK contains answer to an INVITE w/o SDP negotiation
	            SIP.Hacks.Firefox.cannotHandleExtraWhitespace(request);
	            SIP.Hacks.AllBrowsers.maskDtls(request);
	
	            this.hasAnswer = true;
	            this.mediaHandler.setDescription(request.body)
	            .then(
	              confirmSession.bind(this),
	              function onFailure (e) {
	                this.logger.warn(e);
	                this.terminate({
	                  statusCode: '488',
	                  reasonPhrase: 'Bad Media Description'
	                });
	                this.failed(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                this.terminated(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	              }.bind(this)
	            );
	          } else if (this.early_sdp) {
	            confirmSession.apply(this);
	          } else {
	            //TODO: Pass to mediahandler
	            this.failed(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	            this.terminated(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	          }
	        } else {
	          confirmSession.apply(this);
	        }
	      }
	      break;
	    case SIP.C.PRACK:
	      if (this.status === C.STATUS_WAITING_FOR_PRACK || this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK) {
	        //localMedia = session.mediaHandler.localMedia;
	        if(!this.hasAnswer) {
	          if(request.body && request.getHeader('content-type') === 'application/sdp') {
	            this.hasAnswer = true;
	            this.mediaHandler.setDescription(request.body)
	            .then(
	              function onSuccess () {
	                SIP.Timers.clearTimeout(this.timers.rel1xxTimer);
	                SIP.Timers.clearTimeout(this.timers.prackTimer);
	                request.reply(200);
	                if (this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK) {
	                  this.status = C.STATUS_EARLY_MEDIA;
	                  this.accept();
	                }
	                this.status = C.STATUS_EARLY_MEDIA;
	                //REVISIT
	                this.mute();
	              }.bind(this),
	              function onFailure (e) {
	                //TODO: Send to media handler
	                this.logger.warn(e);
	                this.terminate({
	                  statusCode: '488',
	                  reasonPhrase: 'Bad Media Description'
	                });
	                this.failed(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                this.terminated(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	              }.bind(this)
	            );
	          } else {
	            this.terminate({
	              statusCode: '488',
	              reasonPhrase: 'Bad Media Description'
	            });
	            this.failed(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	            this.terminated(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	          }
	        } else {
	          SIP.Timers.clearTimeout(this.timers.rel1xxTimer);
	          SIP.Timers.clearTimeout(this.timers.prackTimer);
	          request.reply(200);
	
	          if (this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK) {
	            this.status = C.STATUS_EARLY_MEDIA;
	            this.accept();
	          }
	          this.status = C.STATUS_EARLY_MEDIA;
	          //REVISIT
	          this.mute();
	        }
	      } else if(this.status === C.STATUS_EARLY_MEDIA) {
	        request.reply(200);
	      }
	      break;
	    default:
	      Session.prototype.receiveRequest.apply(this, [request]);
	      break;
	    }
	  },
	
	  onTransportError: function() {
	    if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_TERMINATED) {
	      this.failed(null, SIP.C.causes.CONNECTION_ERROR);
	    }
	  },
	
	  onRequestTimeout: function() {
	    if (this.status === C.STATUS_CONFIRMED) {
	      this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	    } else if (this.status !== C.STATUS_TERMINATED) {
	      this.failed(null, SIP.C.causes.REQUEST_TIMEOUT);
	      this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	    }
	  }
	
	};
	
	SIP.InviteServerContext = InviteServerContext;
	
	InviteClientContext = function(ua, target, options) {
	  options = Object.create(Session.desugar(options));
	  options.params = Object.create(options.params || Object.prototype);
	
	  var iceServers,
	    extraHeaders = (options.extraHeaders || []).slice(),
	    stunServers = options.stunServers || null,
	    turnServers = options.turnServers || null,
	    isMediaSupported = ua.configuration.mediaHandlerFactory.isSupported;
	
	  // Check WebRTC support
	  if (isMediaSupported && !isMediaSupported()) {
	    throw new SIP.Exceptions.NotSupportedError('Media not supported');
	  }
	
	  this.RTCConstraints = options.RTCConstraints || {};
	  this.inviteWithoutSdp = options.inviteWithoutSdp || false;
	
	  // Set anonymous property
	  this.anonymous = options.anonymous || false;
	
	  // Custom data to be sent either in INVITE or in ACK
	  this.renderbody = options.renderbody || null;
	  this.rendertype = options.rendertype || 'text/plain';
	
	  options.params.from_tag = this.from_tag;
	
	  /* Do not add ;ob in initial forming dialog requests if the registration over
	   *  the current connection got a GRUU URI.
	   */
	  this.contact = ua.contact.toString({
	    anonymous: this.anonymous,
	    outbound: this.anonymous ? !ua.contact.temp_gruu : !ua.contact.pub_gruu
	  });
	
	  if (this.anonymous) {
	    options.params.from_displayName = 'Anonymous';
	    options.params.from_uri = 'sip:anonymous@anonymous.invalid';
	
	    extraHeaders.push('P-Preferred-Identity: '+ ua.configuration.uri.toString());
	    extraHeaders.push('Privacy: id');
	  }
	  extraHeaders.push('Contact: '+ this.contact);
	  extraHeaders.push('Allow: '+ SIP.UA.C.ALLOWED_METHODS.toString());
	  if (!this.inviteWithoutSdp) {
	    extraHeaders.push('Content-Type: application/sdp');
	  } else if (this.renderbody) {
	    extraHeaders.push('Content-Type: ' + this.rendertype);
	    extraHeaders.push('Content-Disposition: render;handling=optional');
	  }
	
	  if (ua.configuration.rel100 === SIP.C.supported.REQUIRED) {
	    extraHeaders.push('Require: 100rel');
	  }
	  if (ua.configuration.replaces === SIP.C.supported.REQUIRED) {
	    extraHeaders.push('Require: replaces');
	  }
	
	  options.extraHeaders = extraHeaders;
	
	  SIP.Utils.augment(this, SIP.ClientContext, [ua, SIP.C.INVITE, target, options]);
	  SIP.Utils.augment(this, SIP.Session, [ua.configuration.mediaHandlerFactory]);
	
	  // Check Session Status
	  if (this.status !== C.STATUS_NULL) {
	    throw new SIP.Exceptions.InvalidStateError(this.status);
	  }
	
	  // Session parameter initialization
	  this.from_tag = SIP.Utils.newTag();
	
	  // OutgoingSession specific parameters
	  this.isCanceled = false;
	  this.received_100 = false;
	
	  this.method = SIP.C.INVITE;
	
	  this.receiveNonInviteResponse = this.receiveResponse;
	  this.receiveResponse = this.receiveInviteResponse;
	
	  this.logger = ua.getLogger('sip.inviteclientcontext');
	
	  if (stunServers) {
	    iceServers = SIP.UA.configuration_check.optional['stunServers'](stunServers);
	    if (!iceServers) {
	      throw new TypeError('Invalid stunServers: '+ stunServers);
	    } else {
	      this.stunServers = iceServers;
	    }
	  }
	
	  if (turnServers) {
	    iceServers = SIP.UA.configuration_check.optional['turnServers'](turnServers);
	    if (!iceServers) {
	      throw new TypeError('Invalid turnServers: '+ turnServers);
	    } else {
	      this.turnServers = iceServers;
	    }
	  }
	
	  ua.applicants[this] = this;
	
	  this.id = this.request.call_id + this.from_tag;
	
	  //Initialize Media Session
	  this.mediaHandler = this.mediaHandlerFactory(this, {
	    RTCConstraints: this.RTCConstraints,
	    stunServers: this.stunServers,
	    turnServers: this.turnServers
	  });
	
	  if (this.mediaHandler && this.mediaHandler.getRemoteStreams) {
	    this.getRemoteStreams = this.mediaHandler.getRemoteStreams.bind(this.mediaHandler);
	    this.getLocalStreams = this.mediaHandler.getLocalStreams.bind(this.mediaHandler);
	  }
	
	  SIP.Utils.optionsOverride(options, 'media', 'mediaConstraints', true, this.logger, this.ua.configuration.media);
	  this.mediaHint = options.media;
	};
	
	InviteClientContext.prototype = {
	  invite: function () {
	    var self = this;
	
	    //Save the session into the ua sessions collection.
	    //Note: placing in constructor breaks call to request.cancel on close... User does not need this anyway
	    this.ua.sessions[this.id] = this;
	
	    //Note: due to the way Firefox handles gUM calls, it is recommended to make the gUM call at the app level
	    // and hand sip.js a stream as the mediaHint
	    if (this.inviteWithoutSdp) {
	      //just send an invite with no sdp...
	      this.request.body = self.renderbody;
	      this.status = C.STATUS_INVITE_SENT;
	      this.send();
	    } else {
	      this.mediaHandler.getDescription(self.mediaHint)
	      .then(
	        function onSuccess(offer) {
	          if (self.isCanceled || self.status === C.STATUS_TERMINATED) {
	            return;
	          }
	          self.hasOffer = true;
	          self.request.body = offer;
	          self.status = C.STATUS_INVITE_SENT;
	          self.send();
	        },
	        function onFailure() {
	          if (self.status === C.STATUS_TERMINATED) {
	            return;
	          }
	          // TODO...fail out
	          //self.failed(null, SIP.C.causes.USER_DENIED_MEDIA_ACCESS);
	          //self.failed(null, SIP.C.causes.WEBRTC_ERROR);
	          self.failed(null, SIP.C.causes.WEBRTC_ERROR);
	          self.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	        }
	      );
	    }
	
	    return this;
	  },
	
	  receiveInviteResponse: function(response) {
	    var cause, //localMedia,
	      session = this,
	      id = response.call_id + response.from_tag + response.to_tag,
	      extraHeaders = [],
	      options = {};
	
	    if (this.status === C.STATUS_TERMINATED || response.method !== SIP.C.INVITE) {
	      return;
	    }
	
	    if (this.dialog && (response.status_code >= 200 && response.status_code <= 299)) {
	      if (id !== this.dialog.id.toString() ) {
	        if (!this.createDialog(response, 'UAC', true)) {
	          return;
	        }
	        this.earlyDialogs[id].sendRequest(this, SIP.C.ACK,
	                                          {
	                                            body: SIP.Utils.generateFakeSDP(response.body)
	                                          });
	        this.earlyDialogs[id].sendRequest(this, SIP.C.BYE);
	
	        /* NOTE: This fails because the forking proxy does not recognize that an unanswerable
	         * leg (due to peerConnection limitations) has been answered first. If your forking
	         * proxy does not hang up all unanswered branches on the first branch answered, remove this.
	         */
	        if(this.status !== C.STATUS_CONFIRMED) {
	          this.failed(response, SIP.C.causes.WEBRTC_ERROR);
	          this.terminated(response, SIP.C.causes.WEBRTC_ERROR);
	        }
	        return;
	      } else if (this.status === C.STATUS_CONFIRMED) {
	        this.sendRequest(SIP.C.ACK,{cseq: response.cseq});
	        return;
	      } else if (!this.hasAnswer) {
	        // invite w/o sdp is waiting for callback
	        //an invite with sdp must go on, and hasAnswer is true
	        return;
	      }
	    }
	
	    if (this.dialog && response.status_code < 200) {
	      /*
	        Early media has been set up with at least one other different branch,
	        but a final 2xx response hasn't been received
	      */
	      if (this.dialog.pracked.indexOf(response.getHeader('rseq')) !== -1 ||
	          (this.dialog.pracked[this.dialog.pracked.length-1] >= response.getHeader('rseq') && this.dialog.pracked.length > 0)) {
	        return;
	      }
	
	      if (!this.earlyDialogs[id] && !this.createDialog(response, 'UAC', true)) {
	        return;
	      }
	
	      if (this.earlyDialogs[id].pracked.indexOf(response.getHeader('rseq')) !== -1 ||
	          (this.earlyDialogs[id].pracked[this.earlyDialogs[id].pracked.length-1] >= response.getHeader('rseq') && this.earlyDialogs[id].pracked.length > 0)) {
	        return;
	      }
	
	      extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));
	      this.earlyDialogs[id].pracked.push(response.getHeader('rseq'));
	
	      this.earlyDialogs[id].sendRequest(this, SIP.C.PRACK, {
	        extraHeaders: extraHeaders,
	        body: SIP.Utils.generateFakeSDP(response.body)
	      });
	      return;
	    }
	
	    // Proceed to cancellation if the user requested.
	    if(this.isCanceled) {
	      if(response.status_code >= 100 && response.status_code < 200) {
	        this.request.cancel(this.cancelReason);
	        this.canceled(null);
	      } else if(response.status_code >= 200 && response.status_code < 299) {
	        this.acceptAndTerminate(response);
	        this.emit('bye', this.request);
	      } else if (response.status_code >= 300) {
	        cause = SIP.C.REASON_PHRASE[response.status_code] || SIP.C.causes.CANCELED;
	        this.rejected(response, cause);
	        this.failed(response, cause);
	        this.terminated(response, cause);
	      }
	      return;
	    }
	
	    switch(true) {
	      case /^100$/.test(response.status_code):
	        this.received_100 = true;
	        this.emit('progress', response);
	        break;
	      case (/^1[0-9]{2}$/.test(response.status_code)):
	        // Do nothing with 1xx responses without To tag.
	        if(!response.to_tag) {
	          this.logger.warn('1xx response received without to tag');
	          break;
	        }
	
	        // Create Early Dialog if 1XX comes with contact
	        if(response.hasHeader('contact')) {
	          // An error on dialog creation will fire 'failed' event
	          if (!this.createDialog(response, 'UAC', true)) {
	            break;
	          }
	        }
	
	        this.status = C.STATUS_1XX_RECEIVED;
	
	        if(response.hasHeader('require') &&
	           response.getHeader('require').indexOf('100rel') !== -1) {
	
	          // Do nothing if this.dialog is already confirmed
	          if (this.dialog || !this.earlyDialogs[id]) {
	            break;
	          }
	
	          if (this.earlyDialogs[id].pracked.indexOf(response.getHeader('rseq')) !== -1 ||
	              (this.earlyDialogs[id].pracked[this.earlyDialogs[id].pracked.length-1] >= response.getHeader('rseq') && this.earlyDialogs[id].pracked.length > 0)) {
	            return;
	          }
	
	          SIP.Hacks.Firefox.cannotHandleExtraWhitespace(response);
	          SIP.Hacks.AllBrowsers.maskDtls(response);
	
	          if (!response.body) {
	            extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));
	            this.earlyDialogs[id].pracked.push(response.getHeader('rseq'));
	            this.earlyDialogs[id].sendRequest(this, SIP.C.PRACK, {
	              extraHeaders: extraHeaders
	            });
	            this.emit('progress', response);
	
	          } else if (this.hasOffer) {
	            if (!this.createDialog(response, 'UAC')) {
	              break;
	            }
	            this.hasAnswer = true;
	            this.dialog.pracked.push(response.getHeader('rseq'));
	
	            this.mediaHandler.setDescription(response.body)
	            .then(
	              function onSuccess () {
	                extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));
	
	                session.sendRequest(SIP.C.PRACK, {
	                  extraHeaders: extraHeaders,
	                  receiveResponse: function() {}
	                });
	                session.status = C.STATUS_EARLY_MEDIA;
	                session.mute();
	                session.emit('progress', response);
	                /*
	                if (session.status === C.STATUS_EARLY_MEDIA) {
	                  localMedia = session.mediaHandler.localMedia;
	                  if (localMedia.getAudioTracks().length > 0) {
	                    localMedia.getAudioTracks()[0].enabled = false;
	                  }
	                  if (localMedia.getVideoTracks().length > 0) {
	                    localMedia.getVideoTracks()[0].enabled = false;
	                  }
	                }*/
	              },
	              function onFailure (e) {
	                session.logger.warn(e);
	                session.acceptAndTerminate(response, 488, 'Not Acceptable Here');
	                session.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	              }
	            );
	          } else {
	            var earlyDialog = this.earlyDialogs[id];
	            var earlyMedia = earlyDialog.mediaHandler;
	
	            earlyDialog.pracked.push(response.getHeader('rseq'));
	
	            earlyMedia.setDescription(response.body)
	            .then(earlyMedia.getDescription.bind(earlyMedia, session.mediaHint))
	            .then(function onSuccess(sdp) {
	              extraHeaders.push('Content-Type: application/sdp');
	              extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));
	              earlyDialog.sendRequest(session, SIP.C.PRACK, {
	                extraHeaders: extraHeaders,
	                body: sdp
	              });
	              session.status = C.STATUS_EARLY_MEDIA;
	              session.emit('progress', response);
	            })
	            .catch(function onFailure(e) {
	              if (e instanceof SIP.Exceptions.GetDescriptionError) {
	                earlyDialog.pracked.push(response.getHeader('rseq'));
	                if (session.status === C.STATUS_TERMINATED) {
	                  return;
	                }
	                // TODO - fail out on error
	                // session.failed(gum error);
	                session.failed(null, SIP.C.causes.WEBRTC_ERROR);
	                session.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	              } else {
	                earlyDialog.pracked.splice(earlyDialog.pracked.indexOf(response.getHeader('rseq')), 1);
	                // Could not set remote description
	                session.logger.warn('invalid SDP');
	                session.logger.warn(e);
	              }
	            });
	          }
	        } else {
	          this.emit('progress', response);
	        }
	        break;
	      case /^2[0-9]{2}$/.test(response.status_code):
	        var cseq = this.request.cseq + ' ' + this.request.method;
	        if (cseq !== response.getHeader('cseq')) {
	          break;
	        }
	
	        if (this.status === C.STATUS_EARLY_MEDIA && this.dialog) {
	          this.status = C.STATUS_CONFIRMED;
	          this.unmute();
	          /*localMedia = this.mediaHandler.localMedia;
	          if (localMedia.getAudioTracks().length > 0) {
	            localMedia.getAudioTracks()[0].enabled = true;
	          }
	          if (localMedia.getVideoTracks().length > 0) {
	            localMedia.getVideoTracks()[0].enabled = true;
	          }*/
	          options = {};
	          if (this.renderbody) {
	            extraHeaders.push('Content-Type: ' + this.rendertype);
	            options.extraHeaders = extraHeaders;
	            options.body = this.renderbody;
	          }
	          options.cseq = response.cseq;
	          this.sendRequest(SIP.C.ACK, options);
	          this.accepted(response);
	          break;
	        }
	        // Do nothing if this.dialog is already confirmed
	        if (this.dialog) {
	          break;
	        }
	
	        SIP.Hacks.Firefox.cannotHandleExtraWhitespace(response);
	        SIP.Hacks.AllBrowsers.maskDtls(response);
	
	        // This is an invite without sdp
	        if (!this.hasOffer) {
	          if (this.earlyDialogs[id] && this.earlyDialogs[id].mediaHandler.localMedia) {
	            //REVISIT
	            this.hasOffer = true;
	            this.hasAnswer = true;
	            this.mediaHandler = this.earlyDialogs[id].mediaHandler;
	            if (!this.createDialog(response, 'UAC')) {
	              break;
	            }
	            this.status = C.STATUS_CONFIRMED;
	            this.sendRequest(SIP.C.ACK, {cseq:response.cseq});
	
	            this.unmute();
	            /*
	            localMedia = session.mediaHandler.localMedia;
	            if (localMedia.getAudioTracks().length > 0) {
	              localMedia.getAudioTracks()[0].enabled = true;
	            }
	            if (localMedia.getVideoTracks().length > 0) {
	              localMedia.getVideoTracks()[0].enabled = true;
	            }*/
	            this.accepted(response);
	          } else {
	            if(!response.body) {
	              this.acceptAndTerminate(response, 400, 'Missing session description');
	              this.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	              break;
	            }
	            if (!this.createDialog(response, 'UAC')) {
	              break;
	            }
	            this.hasOffer = true;
	            this.mediaHandler.setDescription(response.body)
	            .then(this.mediaHandler.getDescription.bind(this.mediaHandler, this.mediaHint))
	            .then(function onSuccess(sdp) {
	              //var localMedia;
	              if(session.isCanceled || session.status === C.STATUS_TERMINATED) {
	                return;
	              }
	
	              sdp = SIP.Hacks.Firefox.hasMissingCLineInSDP(sdp);
	
	              session.status = C.STATUS_CONFIRMED;
	              session.hasAnswer = true;
	
	              session.unmute();
	              /*localMedia = session.mediaHandler.localMedia;
	              if (localMedia.getAudioTracks().length > 0) {
	                localMedia.getAudioTracks()[0].enabled = true;
	              }
	              if (localMedia.getVideoTracks().length > 0) {
	                localMedia.getVideoTracks()[0].enabled = true;
	              }*/
	              session.sendRequest(SIP.C.ACK,{
	                body: sdp,
	                extraHeaders:['Content-Type: application/sdp'],
	                cseq:response.cseq
	              });
	              session.accepted(response);
	            })
	            .catch(function onFailure(e) {
	              if (e instanceof SIP.Exceptions.GetDescriptionError) {
	                // TODO do something here
	                session.logger.warn("there was a problem");
	              } else {
	                session.logger.warn('invalid SDP');
	                session.logger.warn(e);
	                response.reply(488);
	              }
	            });
	          }
	        } else if (this.hasAnswer){
	          if (this.renderbody) {
	            extraHeaders.push('Content-Type: ' + session.rendertype);
	            options.extraHeaders = extraHeaders;
	            options.body = this.renderbody;
	          }
	          this.sendRequest(SIP.C.ACK, options);
	        } else {
	          if(!response.body) {
	            this.acceptAndTerminate(response, 400, 'Missing session description');
	            this.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	            break;
	          }
	          if (!this.createDialog(response, 'UAC')) {
	            break;
	          }
	          this.hasAnswer = true;
	          this.mediaHandler.setDescription(response.body)
	          .then(
	            function onSuccess () {
	              var options = {};//,localMedia;
	              session.status = C.STATUS_CONFIRMED;
	              session.unmute();
	              /*localMedia = session.mediaHandler.localMedia;
	              if (localMedia.getAudioTracks().length > 0) {
	                localMedia.getAudioTracks()[0].enabled = true;
	              }
	              if (localMedia.getVideoTracks().length > 0) {
	                localMedia.getVideoTracks()[0].enabled = true;
	              }*/
	              if (session.renderbody) {
	                extraHeaders.push('Content-Type: ' + session.rendertype);
	                options.extraHeaders = extraHeaders;
	                options.body = session.renderbody;
	              }
	              options.cseq = response.cseq;
	              session.sendRequest(SIP.C.ACK, options);
	              session.accepted(response);
	            },
	            function onFailure (e) {
	              session.logger.warn(e);
	              session.acceptAndTerminate(response, 488, 'Not Acceptable Here');
	              session.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	            }
	          );
	        }
	        break;
	      default:
	        cause = SIP.Utils.sipErrorCause(response.status_code);
	        this.rejected(response, cause);
	        this.failed(response, cause);
	        this.terminated(response, cause);
	    }
	  },
	
	  cancel: function(options) {
	    options = options || {};
	
	    // Check Session Status
	    if (this.status === C.STATUS_TERMINATED || this.status === C.STATUS_CONFIRMED) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }
	
	    this.logger.log('canceling RTCSession');
	
	    var cancel_reason = SIP.Utils.getCancelReason(options.status_code, options.reason_phrase);
	
	    // Check Session Status
	    if (this.status === C.STATUS_NULL ||
	        (this.status === C.STATUS_INVITE_SENT && !this.received_100)) {
	      this.isCanceled = true;
	      this.cancelReason = cancel_reason;
	    } else if (this.status === C.STATUS_INVITE_SENT ||
	               this.status === C.STATUS_1XX_RECEIVED ||
	               this.status === C.STATUS_EARLY_MEDIA) {
	      this.request.cancel(cancel_reason);
	    }
	
	    return this.canceled();
	  },
	
	  terminate: function(options) {
	    if (this.status === C.STATUS_TERMINATED) {
	      return this;
	    }
	
	    if (this.status === C.STATUS_WAITING_FOR_ACK || this.status === C.STATUS_CONFIRMED) {
	      this.bye(options);
	    } else {
	      this.cancel(options);
	    }
	
	    return this;
	  },
	
	  receiveRequest: function(request) {
	    // ICC RECEIVE REQUEST
	
	    // Reject CANCELs
	    if (request.method === SIP.C.CANCEL) {
	      // TODO; make this a switch when it gets added
	    }
	
	    if (request.method === SIP.C.ACK && this.status === C.STATUS_WAITING_FOR_ACK) {
	      SIP.Timers.clearTimeout(this.timers.ackTimer);
	      SIP.Timers.clearTimeout(this.timers.invite2xxTimer);
	      this.status = C.STATUS_CONFIRMED;
	      this.unmute();
	
	      this.accepted();
	    }
	
	    return Session.prototype.receiveRequest.apply(this, [request]);
	  },
	
	  onTransportError: function() {
	    if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_TERMINATED) {
	      this.failed(null, SIP.C.causes.CONNECTION_ERROR);
	    }
	  },
	
	  onRequestTimeout: function() {
	    if (this.status === C.STATUS_CONFIRMED) {
	      this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	    } else if (this.status !== C.STATUS_TERMINATED) {
	      this.failed(null, SIP.C.causes.REQUEST_TIMEOUT);
	      this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	    }
	  }
	
	};
	
	SIP.InviteClientContext = InviteClientContext;
	
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview DTMF
	 */
	
	/**
	 * @class DTMF
	 * @param {SIP.Session} session
	 */
	module.exports = function (SIP) {
	
	var DTMF,
	  C = {
	    MIN_DURATION:            70,
	    MAX_DURATION:            6000,
	    DEFAULT_DURATION:        100,
	    MIN_INTER_TONE_GAP:      50,
	    DEFAULT_INTER_TONE_GAP:  500
	  };
	
	DTMF = function(session, tone, options) {
	  var duration, interToneGap;
	
	  if (tone === undefined) {
	    throw new TypeError('Not enough arguments');
	  }
	
	  this.logger = session.ua.getLogger('sip.invitecontext.dtmf', session.id);
	  this.owner = session;
	  this.direction = null;
	
	  options = options || {};
	  duration = options.duration || null;
	  interToneGap = options.interToneGap || null;
	
	  // Check tone type
	  if (typeof tone === 'string' ) {
	    tone = tone.toUpperCase();
	  } else if (typeof tone === 'number') {
	    tone = tone.toString();
	  } else {
	    throw new TypeError('Invalid tone: '+ tone);
	  }
	
	  // Check tone value
	  if (!tone.match(/^[0-9A-D#*]$/)) {
	    throw new TypeError('Invalid tone: '+ tone);
	  } else {
	    this.tone = tone;
	  }
	
	  // Check duration
	  if (duration && !SIP.Utils.isDecimal(duration)) {
	    throw new TypeError('Invalid tone duration: '+ duration);
	  } else if (!duration) {
	    duration = DTMF.C.DEFAULT_DURATION;
	  } else if (duration < DTMF.C.MIN_DURATION) {
	    this.logger.warn('"duration" value is lower than the minimum allowed, setting it to '+ DTMF.C.MIN_DURATION+ ' milliseconds');
	    duration = DTMF.C.MIN_DURATION;
	  } else if (duration > DTMF.C.MAX_DURATION) {
	    this.logger.warn('"duration" value is greater than the maximum allowed, setting it to '+ DTMF.C.MAX_DURATION +' milliseconds');
	    duration = DTMF.C.MAX_DURATION;
	  } else {
	    duration = Math.abs(duration);
	  }
	  this.duration = duration;
	
	  // Check interToneGap
	  if (interToneGap && !SIP.Utils.isDecimal(interToneGap)) {
	    throw new TypeError('Invalid interToneGap: '+ interToneGap);
	  } else if (!interToneGap) {
	    interToneGap = DTMF.C.DEFAULT_INTER_TONE_GAP;
	  } else if (interToneGap < DTMF.C.MIN_INTER_TONE_GAP) {
	    this.logger.warn('"interToneGap" value is lower than the minimum allowed, setting it to '+ DTMF.C.MIN_INTER_TONE_GAP +' milliseconds');
	    interToneGap = DTMF.C.MIN_INTER_TONE_GAP;
	  } else {
	    interToneGap = Math.abs(interToneGap);
	  }
	  this.interToneGap = interToneGap;
	};
	DTMF.prototype = Object.create(SIP.EventEmitter.prototype);
	
	
	DTMF.prototype.send = function(options) {
	  var extraHeaders, body;
	
	  this.direction = 'outgoing';
	
	  // Check RTCSession Status
	  if (this.owner.status !== SIP.Session.C.STATUS_CONFIRMED &&
	    this.owner.status !== SIP.Session.C.STATUS_WAITING_FOR_ACK) {
	    throw new SIP.Exceptions.InvalidStateError(this.owner.status);
	  }
	
	  // Get DTMF options
	  options = options || {};
	  extraHeaders = options.extraHeaders ? options.extraHeaders.slice() : [];
	
	  extraHeaders.push('Content-Type: application/dtmf-relay');
	
	  body = "Signal= " + this.tone + "\r\n";
	  body += "Duration= " + this.duration;
	
	  this.request = this.owner.dialog.sendRequest(this, SIP.C.INFO, {
	    extraHeaders: extraHeaders,
	    body: body
	  });
	
	  this.owner.emit('dtmf', this.request, this);
	};
	
	/**
	 * @private
	 */
	DTMF.prototype.receiveResponse = function(response) {
	  var cause;
	
	  switch(true) {
	    case /^1[0-9]{2}$/.test(response.status_code):
	      // Ignore provisional responses.
	      break;
	
	    case /^2[0-9]{2}$/.test(response.status_code):
	      this.emit('succeeded', {
	        originator: 'remote',
	        response: response
	      });
	      break;
	
	    default:
	      cause = SIP.Utils.sipErrorCause(response.status_code);
	      this.emit('failed', response, cause);
	      break;
	  }
	};
	
	/**
	 * @private
	 */
	DTMF.prototype.onRequestTimeout = function() {
	  this.emit('failed', null, SIP.C.causes.REQUEST_TIMEOUT);
	  this.owner.onRequestTimeout();
	};
	
	/**
	 * @private
	 */
	DTMF.prototype.onTransportError = function() {
	  this.emit('failed', null, SIP.C.causes.CONNECTION_ERROR);
	  this.owner.onTransportError();
	};
	
	/**
	 * @private
	 */
	DTMF.prototype.onDialogError = function(response) {
	  this.emit('failed', response, SIP.C.causes.DIALOG_ERROR);
	  this.owner.onDialogError(response);
	};
	
	/**
	 * @private
	 */
	DTMF.prototype.init_incoming = function(request) {
	  this.direction = 'incoming';
	  this.request = request;
	
	  request.reply(200);
	
	  if (!this.tone || !this.duration) {
	    this.logger.warn('invalid INFO DTMF received, discarded');
	  } else {
	    this.owner.emit('dtmf', request, this);
	  }
	};
	
	DTMF.C = C;
	return DTMF;
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * @fileoverview SIP Subscriber (SIP-Specific Event Notifications RFC6665)
	 */
	
	/**
	 * @augments SIP
	 * @class Class creating a SIP Subscription.
	 */
	module.exports = function (SIP) {
	SIP.Subscription = function (ua, target, event, options) {
	  options = Object.create(options || Object.prototype);
	  this.extraHeaders = options.extraHeaders = (options.extraHeaders || []).slice();
	
	  this.id = null;
	  this.state = 'init';
	
	  if (!event) {
	    throw new TypeError('Event necessary to create a subscription.');
	  } else {
	    //TODO: check for valid events here probably make a list in SIP.C; or leave it up to app to check?
	    //The check may need to/should probably occur on the other side,
	    this.event = event;
	  }
	
	  if(typeof options.expires !== 'number'){
	    ua.logger.warn('expires must be a number. Using default of 3600.');
	    this.expires = 3600;
	  } else {
	    this.expires = options.expires;
	  }
	
	  options.extraHeaders.push('Event: ' + this.event);
	  options.extraHeaders.push('Expires: ' + this.expires);
	
	  if (options.body) {
	    this.body = options.body;
	  }
	
	  this.contact = ua.contact.toString();
	
	  options.extraHeaders.push('Contact: '+ this.contact);
	  options.extraHeaders.push('Allow: '+ SIP.UA.C.ALLOWED_METHODS.toString());
	
	  SIP.Utils.augment(this, SIP.ClientContext, [ua, SIP.C.SUBSCRIBE, target, options]);
	
	  this.logger = ua.getLogger('sip.subscription');
	
	  this.dialog = null;
	  this.timers = {N: null, sub_duration: null};
	  this.errorCodes  = [404,405,410,416,480,481,482,483,484,485,489,501,604];
	};
	
	SIP.Subscription.prototype = {
	  subscribe: function() {
	    var sub = this;
	
	     //these states point to an existing subscription, no subscribe is necessary
	    if (this.state === 'active') {
	      this.refresh();
	      return this;
	    } else if (this.state === 'notify_wait') {
	      return this;
	    }
	
	    SIP.Timers.clearTimeout(this.timers.sub_duration);
	    SIP.Timers.clearTimeout(this.timers.N);
	    this.timers.N = SIP.Timers.setTimeout(sub.timer_fire.bind(sub), SIP.Timers.TIMER_N);
	
	    this.send();
	
	    this.state = 'notify_wait';
	
	    return this;
	  },
	
	  refresh: function () {
	    if (this.state === 'terminated' || this.state === 'pending' || this.state === 'notify_wait') {
	      return;
	    }
	
	    this.dialog.sendRequest(this, SIP.C.SUBSCRIBE, {
	      extraHeaders: this.extraHeaders,
	      body: this.body
	    });
	  },
	
	  receiveResponse: function(response) {
	    var expires, sub = this,
	        cause = SIP.Utils.getReasonPhrase(response.status_code);
	
	    if ((this.state === 'notify_wait' && response.status_code >= 300) ||
	        (this.state !== 'notify_wait' && this.errorCodes.indexOf(response.status_code) !== -1)) {
	      this.failed(response, null);
	    } else if (/^2[0-9]{2}$/.test(response.status_code)){
	      expires = response.getHeader('Expires');
	      SIP.Timers.clearTimeout(this.timers.N);
	
	      if (this.createConfirmedDialog(response,'UAC')) {
	        this.id = this.dialog.id.toString();
	        this.ua.subscriptions[this.id] = this;
	        this.emit('accepted', response, cause);
	        // UPDATE ROUTE SET TO BE BACKWARDS COMPATIBLE?
	      }
	
	      if (expires && expires <= this.expires) {
	        // Preserve new expires value for subsequent requests
	        this.expires = expires;
	        this.timers.sub_duration = SIP.Timers.setTimeout(sub.refresh.bind(sub), expires * 900);
	      } else {
	        if (!expires) {
	          this.logger.warn('Expires header missing in a 200-class response to SUBSCRIBE');
	          this.failed(response, SIP.C.EXPIRES_HEADER_MISSING);
	        } else {
	          this.logger.warn('Expires header in a 200-class response to SUBSCRIBE with a higher value than the one in the request');
	          this.failed(response, SIP.C.INVALID_EXPIRES_HEADER);
	        }
	      }
	    } //Used to just ignore provisional responses; now ignores everything except errorCodes and 2xx
	  },
	
	  unsubscribe: function() {
	    var extraHeaders = [], sub = this;
	
	    this.state = 'terminated';
	
	    extraHeaders.push('Event: ' + this.event);
	    extraHeaders.push('Expires: 0');
	
	    extraHeaders.push('Contact: '+ this.contact);
	    extraHeaders.push('Allow: '+ SIP.UA.C.ALLOWED_METHODS.toString());
	
	    //makes sure expires isn't set, and other typical resubscribe behavior
	    this.receiveResponse = function(){};
	
	    this.dialog.sendRequest(this, this.method, {
	      extraHeaders: extraHeaders,
	      body: this.body
	    });
	
	    SIP.Timers.clearTimeout(this.timers.sub_duration);
	    SIP.Timers.clearTimeout(this.timers.N);
	    this.timers.N = SIP.Timers.setTimeout(sub.timer_fire.bind(sub), SIP.Timers.TIMER_N);
	  },
	
	  /**
	  * @private
	  */
	  timer_fire: function(){
	    if (this.state === 'terminated') {
	      this.terminateDialog();
	      SIP.Timers.clearTimeout(this.timers.N);
	      SIP.Timers.clearTimeout(this.timers.sub_duration);
	
	      delete this.ua.subscriptions[this.id];
	    } else if (this.state === 'pending' || this.state === 'notify_wait') {
	      this.close();
	    } else {
	      this.refresh();
	    }
	  },
	
	  /**
	  * @private
	  */
	  close: function() {
	    if(this.state !== 'notify_wait' && this.state !== 'terminated') {
	      this.unsubscribe();
	    }
	  },
	
	  /**
	  * @private
	  */
	  createConfirmedDialog: function(message, type) {
	    var dialog;
	
	    this.terminateDialog();
	    dialog = new SIP.Dialog(this, message, type);
	
	    if(!dialog.error) {
	      this.dialog = dialog;
	      return true;
	    }
	    // Dialog not created due to an error
	    else {
	      return false;
	    }
	  },
	
	  /**
	  * @private
	  */
	  terminateDialog: function() {
	    if(this.dialog) {
	      delete this.ua.subscriptions[this.id];
	      this.dialog.terminate();
	      delete this.dialog;
	    }
	  },
	
	  /**
	  * @private
	  */
	  receiveRequest: function(request) {
	    var sub_state, sub = this;
	
	    function setExpiresTimeout() {
	      if (sub_state.expires) {
	        SIP.Timers.clearTimeout(sub.timers.sub_duration);
	        sub_state.expires = Math.min(sub.expires,
	                                     Math.max(sub_state.expires, 0));
	        sub.timers.sub_duration = SIP.Timers.setTimeout(sub.refresh.bind(sub),
	                                                    sub_state.expires * 900);
	      }
	    }
	
	    if (!this.matchEvent(request)) { //checks event and subscription_state headers
	      request.reply(489);
	      return;
	    }
	
	    sub_state = request.parseHeader('Subscription-State');
	
	    request.reply(200, SIP.C.REASON_200);
	
	    SIP.Timers.clearTimeout(this.timers.N);
	
	    this.emit('notify', {request: request});
	
	    // if we've set state to terminated, no further processing should take place
	    // and we are only interested in cleaning up after the appropriate NOTIFY
	    if (this.state === 'terminated') {
	      if (sub_state.state === 'terminated') {
	        this.terminateDialog();
	        SIP.Timers.clearTimeout(this.timers.N);
	        SIP.Timers.clearTimeout(this.timers.sub_duration);
	
	        delete this.ua.subscriptions[this.id];
	      }
	      return;
	    }
	
	    switch (sub_state.state) {
	      case 'active':
	        this.state = 'active';
	        setExpiresTimeout();
	        break;
	      case 'pending':
	        if (this.state === 'notify_wait') {
	          setExpiresTimeout();
	        }
	        this.state = 'pending';
	        break;
	      case 'terminated':
	        SIP.Timers.clearTimeout(this.timers.sub_duration);
	        if (sub_state.reason) {
	          this.logger.log('terminating subscription with reason '+ sub_state.reason);
	          switch (sub_state.reason) {
	            case 'deactivated':
	            case 'timeout':
	              this.subscribe();
	              return;
	            case 'probation':
	            case 'giveup':
	              if(sub_state.params && sub_state.params['retry-after']) {
	                this.timers.sub_duration = SIP.Timers.setTimeout(sub.subscribe.bind(sub), sub_state.params['retry-after']);
	              } else {
	                this.subscribe();
	              }
	              return;
	            case 'rejected':
	            case 'noresource':
	            case 'invariant':
	              break;
	          }
	        }
	        this.close();
	        break;
	    }
	  },
	
	  failed: function(response, cause) {
	    this.close();
	    this.emit('failed', response, cause);
	    return this;
	  },
	
	  onDialogError: function(response) {
	    this.failed(response, SIP.C.causes.DIALOG_ERROR);
	  },
	
	  /**
	  * @private
	  */
	  matchEvent: function(request) {
	    var event;
	
	    // Check mandatory header Event
	    if (!request.hasHeader('Event')) {
	      this.logger.warn('missing Event header');
	      return false;
	    }
	    // Check mandatory header Subscription-State
	    if (!request.hasHeader('Subscription-State')) {
	      this.logger.warn('missing Subscription-State header');
	      return false;
	    }
	
	    // Check whether the event in NOTIFY matches the event in SUBSCRIBE
	    event = request.parseHeader('event').event;
	
	    if (this.event !== event) {
	      this.logger.warn('event match failed');
	      request.reply(481, 'Event Match Failed');
	      return false;
	    } else {
	      return true;
	    }
	  }
	};
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @fileoverview WebRTC
	 */
	
	module.exports = function (SIP, environment) {
	var WebRTC;
	
	WebRTC = {};
	
	WebRTC.MediaHandler = __webpack_require__(39)(SIP);
	WebRTC.MediaStreamManager = __webpack_require__(40)(SIP, environment);
	
	var _isSupported;
	
	WebRTC.isSupported = function () {
	  if (_isSupported !== undefined) {
	    return _isSupported;
	  }
	
	  WebRTC.MediaStream = environment.MediaStream;
	  WebRTC.getUserMedia = environment.getUserMedia;
	  WebRTC.RTCPeerConnection = environment.RTCPeerConnection;
	  WebRTC.RTCSessionDescription = environment.RTCSessionDescription;
	
	  if (WebRTC.RTCPeerConnection && WebRTC.RTCSessionDescription) {
	    if (WebRTC.getUserMedia) {
	      WebRTC.getUserMedia = SIP.Utils.promisify(environment, 'getUserMedia');
	    }
	    _isSupported = true;
	  }
	  else {
	    _isSupported = false;
	  }
	  return _isSupported;
	};
	
	return WebRTC;
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview MediaHandler
	 */
	
	/* MediaHandler
	 * @class PeerConnection helper Class.
	 * @param {SIP.Session} session
	 * @param {Object} [options]
	 * @param {SIP.WebRTC.MediaStreamManager} [options.mediaStreamManager]
	 *        The MediaStreamManager to acquire/release streams from/to.
	 *        If not provided, a default MediaStreamManager will be used.
	 */
	module.exports = function (SIP) {
	
	var MediaHandler = function(session, options) {
	  options = options || {};
	
	  this.logger = session.ua.getLogger('sip.invitecontext.mediahandler', session.id);
	  this.session = session;
	  this.localMedia = null;
	  this.ready = true;
	  this.mediaStreamManager = options.mediaStreamManager || new SIP.WebRTC.MediaStreamManager(this.logger);
	  this.audioMuted = false;
	  this.videoMuted = false;
	
	  // old init() from here on
	  var servers = this.prepareIceServers(options.stunServers, options.turnServers);
	  this.RTCConstraints = options.RTCConstraints || {};
	
	  this.initPeerConnection(servers, this.RTCConstraints);
	
	  function selfEmit(mh, event) {
	    if (mh.mediaStreamManager.on) {
	      mh.mediaStreamManager.on(event, function () {
	        mh.emit.apply(mh, [event].concat(Array.prototype.slice.call(arguments)));
	      });
	    }
	  }
	
	  selfEmit(this, 'userMediaRequest');
	  selfEmit(this, 'userMedia');
	  selfEmit(this, 'userMediaFailed');
	};
	
	MediaHandler.defaultFactory = function defaultFactory (session, options) {
	  return new MediaHandler(session, options);
	};
	MediaHandler.defaultFactory.isSupported = function () {
	  return SIP.WebRTC.isSupported();
	};
	
	MediaHandler.prototype = Object.create(SIP.MediaHandler.prototype, {
	// Functions the session can use
	  isReady: {writable: true, value: function isReady () {
	    return this.ready;
	  }},
	
	  close: {writable: true, value: function close () {
	    this.logger.log('closing PeerConnection');
	    this._remoteStreams = [];
	    // have to check signalingState since this.close() gets called multiple times
	    // TODO figure out why that happens
	    if(this.peerConnection && this.peerConnection.signalingState !== 'closed') {
	      this.peerConnection.close();
	
	      if(this.localMedia) {
	        this.mediaStreamManager.release(this.localMedia);
	      }
	    }
	  }},
	
	  /**
	   * @param {SIP.WebRTC.MediaStream | (getUserMedia constraints)} [mediaHint]
	   *        the MediaStream (or the constraints describing it) to be used for the session
	   */
	  getDescription: {writable: true, value: function getDescription (mediaHint) {
	    var self = this;
	    var acquire = self.mediaStreamManager.acquire;
	    if (acquire.length > 1) {
	      acquire = SIP.Utils.promisify(this.mediaStreamManager, 'acquire', true);
	    }
	    mediaHint = mediaHint || {};
	    if (mediaHint.dataChannel === true) {
	      mediaHint.dataChannel = {};
	    }
	    this.mediaHint = mediaHint;
	
	    /*
	     * 1. acquire streams (skip if MediaStreams passed in)
	     * 2. addStreams
	     * 3. createOffer/createAnswer
	     */
	
	    var streamPromise;
	    if (self.localMedia) {
	      self.logger.log('already have local media');
	      streamPromise = SIP.Utils.Promise.resolve(self.localMedia);
	    }
	    else {
	      self.logger.log('acquiring local media');
	      streamPromise = acquire.call(self.mediaStreamManager, mediaHint)
	        .then(function acquireSucceeded(streams) {
	          self.logger.log('acquired local media streams');
	          self.localMedia = streams;
	          self.session.connecting();
	          return streams;
	        }, function acquireFailed(err) {
	          self.logger.error('unable to acquire streams');
	          self.logger.error(err);
	          self.session.connecting();
	          throw err;
	        })
	        .then(this.addStreams.bind(this))
	      ;
	    }
	
	    return streamPromise
	      .then(function streamAdditionSucceeded() {
	        if (self.hasOffer('remote')) {
	          self.peerConnection.ondatachannel = function (evt) {
	            self.dataChannel = evt.channel;
	            self.emit('dataChannel', self.dataChannel);
	          };
	        } else if (mediaHint.dataChannel &&
	                   self.peerConnection.createDataChannel) {
	          self.dataChannel = self.peerConnection.createDataChannel(
	            'sipjs',
	            mediaHint.dataChannel
	          );
	          self.emit('dataChannel', self.dataChannel);
	        }
	
	        self.render();
	        return self.createOfferOrAnswer(self.RTCConstraints);
	      })
	    ;
	  }},
	
	  /**
	  * Message reception.
	  * @param {String} type
	  * @param {String} sdp
	  */
	  setDescription: {writable: true, value: function setDescription (sdp) {
	    var rawDescription = {
	      type: this.hasOffer('local') ? 'answer' : 'offer',
	      sdp: sdp
	    };
	
	    this.emit('setDescription', rawDescription);
	
	    var description = new SIP.WebRTC.RTCSessionDescription(rawDescription);
	    return SIP.Utils.promisify(this.peerConnection, 'setRemoteDescription')(description);
	  }},
	
	  /**
	   * If the Session associated with this MediaHandler were to be referred,
	   * what mediaHint should be provided to the UA's invite method?
	   */
	  getReferMedia: {writable: true, value: function getReferMedia () {
	    function hasTracks (trackGetter, stream) {
	      return stream[trackGetter]().length > 0;
	    }
	
	    function bothHaveTracks (trackGetter) {
	      /* jshint validthis:true */
	      return this.getLocalStreams().some(hasTracks.bind(null, trackGetter)) &&
	             this.getRemoteStreams().some(hasTracks.bind(null, trackGetter));
	    }
	
	    return {
	      constraints: {
	        audio: bothHaveTracks.call(this, 'getAudioTracks'),
	        video: bothHaveTracks.call(this, 'getVideoTracks')
	      }
	    };
	  }},
	
	  updateIceServers: {writeable:true, value: function (options) {
	    var servers = this.prepareIceServers(options.stunServers, options.turnServers);
	    this.RTCConstraints = options.RTCConstraints || this.RTCConstraints;
	
	    this.initPeerConnection(servers, this.RTCConstraints);
	
	    /* once updateIce is implemented correctly, this is better than above
	    //no op if browser does not support this
	    if (!this.peerConnection.updateIce) {
	      return;
	    }
	
	    this.peerConnection.updateIce({'iceServers': servers}, this.RTCConstraints);
	    */
	  }},
	
	// Functions the session can use, but only because it's convenient for the application
	  isMuted: {writable: true, value: function isMuted () {
	    return {
	      audio: this.audioMuted,
	      video: this.videoMuted
	    };
	  }},
	
	  mute: {writable: true, value: function mute (options) {
	    if (this.getLocalStreams().length === 0) {
	      return;
	    }
	
	    options = options || {
	      audio: this.getLocalStreams()[0].getAudioTracks().length > 0,
	      video: this.getLocalStreams()[0].getVideoTracks().length > 0
	    };
	
	    var audioMuted = false,
	        videoMuted = false;
	
	    if (options.audio && !this.audioMuted) {
	      audioMuted = true;
	      this.audioMuted = true;
	      this.toggleMuteAudio(true);
	    }
	
	    if (options.video && !this.videoMuted) {
	      videoMuted = true;
	      this.videoMuted = true;
	      this.toggleMuteVideo(true);
	    }
	
	    //REVISIT
	    if (audioMuted || videoMuted) {
	      return {
	        audio: audioMuted,
	        video: videoMuted
	      };
	      /*this.session.onmute({
	        audio: audioMuted,
	        video: videoMuted
	      });*/
	    }
	  }},
	
	  unmute: {writable: true, value: function unmute (options) {
	    if (this.getLocalStreams().length === 0) {
	      return;
	    }
	
	    options = options || {
	      audio: this.getLocalStreams()[0].getAudioTracks().length > 0,
	      video: this.getLocalStreams()[0].getVideoTracks().length > 0
	    };
	
	    var audioUnMuted = false,
	        videoUnMuted = false;
	
	    if (options.audio && this.audioMuted) {
	      audioUnMuted = true;
	      this.audioMuted = false;
	      this.toggleMuteAudio(false);
	    }
	
	    if (options.video && this.videoMuted) {
	      videoUnMuted = true;
	      this.videoMuted = false;
	      this.toggleMuteVideo(false);
	    }
	
	    //REVISIT
	    if (audioUnMuted || videoUnMuted) {
	      return {
	        audio: audioUnMuted,
	        video: videoUnMuted
	      };
	      /*this.session.onunmute({
	        audio: audioUnMuted,
	        video: videoUnMuted
	      });*/
	    }
	  }},
	
	  hold: {writable: true, value: function hold () {
	    this.toggleMuteAudio(true);
	    this.toggleMuteVideo(true);
	  }},
	
	  unhold: {writable: true, value: function unhold () {
	    if (!this.audioMuted) {
	      this.toggleMuteAudio(false);
	    }
	
	    if (!this.videoMuted) {
	      this.toggleMuteVideo(false);
	    }
	  }},
	
	// Functions the application can use, but not the session
	  getLocalStreams: {writable: true, value: function getLocalStreams () {
	    var pc = this.peerConnection;
	    if (pc && pc.signalingState === 'closed') {
	      this.logger.warn('peerConnection is closed, getLocalStreams returning []');
	      return [];
	    }
	    return (pc.getLocalStreams && pc.getLocalStreams()) ||
	      pc.localStreams || [];
	  }},
	
	  getRemoteStreams: {writable: true, value: function getRemoteStreams () {
	    var pc = this.peerConnection;
	    if (pc && pc.signalingState === 'closed') {
	      this.logger.warn('peerConnection is closed, getRemoteStreams returning this._remoteStreams');
	      return this._remoteStreams;
	    }
	    return(pc.getRemoteStreams && pc.getRemoteStreams()) ||
	      pc.remoteStreams || [];
	  }},
	
	  render: {writable: true, value: function render (renderHint) {
	    renderHint = renderHint || (this.mediaHint && this.mediaHint.render);
	    if (!renderHint) {
	      return false;
	    }
	    var streamGetters = {
	      local: 'getLocalStreams',
	      remote: 'getRemoteStreams'
	    };
	    Object.keys(streamGetters).forEach(function (loc) {
	      var streamGetter = streamGetters[loc];
	      var streams = this[streamGetter]();
	      SIP.WebRTC.MediaStreamManager.render(streams, renderHint[loc]);
	    }.bind(this));
	  }},
	
	// Internal functions
	  hasOffer: {writable: true, value: function hasOffer (where) {
	    var offerState = 'have-' + where + '-offer';
	    return this.peerConnection.signalingState === offerState;
	    // TODO consider signalingStates with 'pranswer'?
	  }},
	
	  prepareIceServers: {writable: true, value: function prepareIceServers (stunServers, turnServers) {
	    var idx, jdx, length, server,
	      servers = [],
	      config = this.session.ua.configuration;
	
	    stunServers = stunServers || null;
	    turnServers = turnServers || null;
	
	    if (!stunServers) {
	      stunServers = config.stunServers;
	    }
	
	    if(!turnServers) {
	      turnServers = config.turnServers;
	    }
	
	    /* Change 'url' to 'urls' whenever this issue is solved:
	     * https://code.google.com/p/webrtc/issues/detail?id=2096
	     */
	    [].concat(stunServers).forEach(function (server) {
	      servers.push({'url': server});
	    });
	
	    length = turnServers.length;
	    for (idx = 0; idx < length; idx++) {
	      server = turnServers[idx];
	      for (jdx = 0; jdx < server.urls.length; jdx++) {
	        servers.push({
	          'url': server.urls[jdx],
	          'username': server.username,
	          'credential': server.password
	        });
	      }
	    }
	
	    return servers;
	  }},
	
	  initPeerConnection: {writable: true, value: function initPeerConnection(servers, RTCConstraints) {
	    var self = this,
	      config = this.session.ua.configuration;
	
	    this.onIceCompleted = SIP.Utils.defer();
	    this.onIceCompleted.promise.then(function(pc) {
	      self.emit('iceGatheringComplete', pc);
	      if (self.iceCheckingTimer) {
	        SIP.Timers.clearTimeout(self.iceCheckingTimer);
	        self.iceCheckingTimer = null;
	      }
	    });
	
	    if (this.peerConnection) {
	      this.peerConnection.close();
	    }
	
	    this.peerConnection = new SIP.WebRTC.RTCPeerConnection({'iceServers': servers}, RTCConstraints);
	
	    // Firefox (35.0.1) sometimes throws on calls to peerConnection.getRemoteStreams
	    // even if peerConnection.onaddstream was just called. In order to make
	    // MediaHandler.prototype.getRemoteStreams work, keep track of them manually
	    this._remoteStreams = [];
	
	    this.peerConnection.onaddstream = function(e) {
	      self.logger.log('stream added: '+ e.stream.id);
	      self._remoteStreams.push(e.stream);
	      self.render();
	      self.emit('addStream', e);
	    };
	
	    this.peerConnection.onremovestream = function(e) {
	      self.logger.log('stream removed: '+ e.stream.id);
	    };
	
	    this.startIceCheckingTimer = function () {
	      if (!self.iceCheckingTimer) {
	        self.iceCheckingTimer = SIP.Timers.setTimeout(function() {
	          self.logger.log('RTCIceChecking Timeout Triggered after '+config.iceCheckingTimeout+' milliseconds');
	          self.onIceCompleted.resolve(this);
	        }.bind(this.peerConnection), config.iceCheckingTimeout);
	      }
	    };
	
	    this.peerConnection.onicecandidate = function(e) {
	      self.emit('iceCandidate', e);
	      if (e.candidate) {
	        self.logger.log('ICE candidate received: '+ (e.candidate.candidate === null ? null : e.candidate.candidate.trim()));
	        self.startIceCheckingTimer();
	      } else {
	        self.onIceCompleted.resolve(this);
	      }
	    };
	
	    this.peerConnection.onicegatheringstatechange = function () {
	      self.logger.log('RTCIceGatheringState changed: ' + this.iceGatheringState);
	      if (this.iceGatheringState === 'gathering') {
	        self.emit('iceGathering', this);
	      }
	      if (this.iceGatheringState === 'complete') {
	        self.onIceCompleted.resolve(this);
	      }
	    };
	
	    this.peerConnection.oniceconnectionstatechange = function() {  //need e for commented out case
	      var stateEvent;
	
	      if (this.iceConnectionState === 'checking') {
	        self.startIceCheckingTimer();
	      }
	
	      switch (this.iceConnectionState) {
	      case 'new':
	        stateEvent = 'iceConnection';
	        break;
	      case 'checking':
	        stateEvent = 'iceConnectionChecking';
	        break;
	      case 'connected':
	        stateEvent = 'iceConnectionConnected';
	        break;
	      case 'completed':
	        stateEvent = 'iceConnectionCompleted';
	        break;
	      case 'failed':
	        stateEvent = 'iceConnectionFailed';
	        break;
	      case 'disconnected':
	        stateEvent = 'iceConnectionDisconnected';
	        break;
	      case 'closed':
	        stateEvent = 'iceConnectionClosed';
	        break;
	      default:
	        self.logger.warn('Unknown iceConnection state:', this.iceConnectionState);
	        return;
	      }
	      self.emit(stateEvent, this);
	
	      //Bria state changes are always connected -> disconnected -> connected on accept, so session gets terminated
	      //normal calls switch from failed to connected in some cases, so checking for failed and terminated
	      /*if (this.iceConnectionState === 'failed') {
	        self.session.terminate({
	        cause: SIP.C.causes.RTP_TIMEOUT,
	        status_code: 200,
	        reason_phrase: SIP.C.causes.RTP_TIMEOUT
	      });
	      } else if (e.currentTarget.iceGatheringState === 'complete' && this.iceConnectionState !== 'closed') {
	      self.onIceCompleted(this);
	      }*/
	    };
	
	    this.peerConnection.onstatechange = function() {
	      self.logger.log('PeerConnection state changed to "'+ this.readyState +'"');
	    };
	  }},
	
	  createOfferOrAnswer: {writable: true, value: function createOfferOrAnswer (constraints) {
	    var self = this;
	    var methodName;
	    var pc = self.peerConnection;
	
	    self.ready = false;
	    methodName = self.hasOffer('remote') ? 'createAnswer' : 'createOffer';
	
	    return SIP.Utils.promisify(pc, methodName, true)(constraints)
	      .then(SIP.Utils.promisify(pc, 'setLocalDescription'))
	      .then(function onSetLocalDescriptionSuccess() {
	        var deferred = SIP.Utils.defer();
	        if (pc.iceGatheringState === 'complete' && (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed')) {
	          deferred.resolve();
	        } else {
	          self.onIceCompleted.promise.then(deferred.resolve);
	        }
	        return deferred.promise;
	      })
	      .then(function readySuccess () {
	        var sdp = pc.localDescription.sdp;
	
	        sdp = SIP.Hacks.Chrome.needsExplicitlyInactiveSDP(sdp);
	        sdp = SIP.Hacks.AllBrowsers.unmaskDtls(sdp);
	
	        var sdpWrapper = {
	          type: methodName === 'createOffer' ? 'offer' : 'answer',
	          sdp: sdp
	        };
	
	        self.emit('getDescription', sdpWrapper);
	
	        self.ready = true;
	        return sdpWrapper.sdp;
	      })
	      .catch(function methodFailed (e) {
	        self.logger.error(e);
	        self.ready = true;
	        throw new SIP.Exceptions.GetDescriptionError(e);
	      })
	    ;
	  }},
	
	  addStreams: {writable: true, value: function addStreams (streams) {
	    try {
	      streams = [].concat(streams);
	      streams.forEach(function (stream) {
	        this.peerConnection.addStream(stream);
	      }, this);
	    } catch(e) {
	      this.logger.error('error adding stream');
	      this.logger.error(e);
	      return SIP.Utils.Promise.reject(e);
	    }
	
	    return SIP.Utils.Promise.resolve();
	  }},
	
	  toggleMuteHelper: {writable: true, value: function toggleMuteHelper (trackGetter, mute) {
	    this.getLocalStreams().forEach(function (stream) {
	      stream[trackGetter]().forEach(function (track) {
	        track.enabled = !mute;
	      });
	    });
	  }},
	
	  toggleMuteAudio: {writable: true, value: function toggleMuteAudio (mute) {
	    this.toggleMuteHelper('getAudioTracks', mute);
	  }},
	
	  toggleMuteVideo: {writable: true, value: function toggleMuteVideo (mute) {
	    this.toggleMuteHelper('getVideoTracks', mute);
	  }}
	});
	
	// Return since it will be assigned to a variable.
	return MediaHandler;
	};


/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview MediaStreamManager
	 */
	
	/* MediaStreamManager
	 * @class Manages the acquisition and release of MediaStreams.
	 * @param {mediaHint} [defaultMediaHint] The mediaHint to use if none is provided to acquire()
	 */
	module.exports = function (SIP, environment) {
	
	// Default MediaStreamManager provides single-use streams created with getUserMedia
	var MediaStreamManager = function MediaStreamManager (logger, defaultMediaHint) {
	  if (!SIP.WebRTC.isSupported()) {
	    throw new SIP.Exceptions.NotSupportedError('Media not supported');
	  }
	
	  this.mediaHint = defaultMediaHint || {
	    constraints: {audio: true, video: true}
	  };
	
	  // map of streams to acquisition manner:
	  // true -> passed in as mediaHint.stream
	  // false -> getUserMedia
	  this.acquisitions = {};
	};
	MediaStreamManager.streamId = function (stream) {
	  return stream.getAudioTracks().concat(stream.getVideoTracks())
	    .map(function trackId (track) {
	      return track.id;
	    })
	    .join('');
	};
	
	/**
	 * @param {(Array of) MediaStream} streams - The streams to render
	 *
	 * @param {(Array of) HTMLMediaElement} elements
	 *        - The <audio>/<video> element(s) that should render the streams
	 *
	 * Each stream in streams renders to the corresponding element in elements,
	 * wrapping around elements if needed.
	 */
	MediaStreamManager.render = function render (streams, elements) {
	  if (!elements) {
	    return false;
	  }
	  if (Array.isArray(elements) && !elements.length) {
	    throw new TypeError('elements must not be empty');
	  }
	
	  function attachMediaStream(element, stream) {
	    if (typeof element.src !== 'undefined') {
	      environment.revokeObjectURL(element.src);
	      element.src = environment.createObjectURL(stream);
	    } else if (typeof (element.srcObject || element.mozSrcObject) !== 'undefined') {
	      element.srcObject = element.mozSrcObject = stream;
	    } else {
	      return false;
	    }
	
	    return true;
	  }
	
	  function ensureMediaPlaying (mediaElement) {
	    var interval = 100;
	    mediaElement.ensurePlayingIntervalId = SIP.Timers.setInterval(function () {
	      if (mediaElement.paused) {
	        mediaElement.play();
	      }
	      else {
	        SIP.Timers.clearInterval(mediaElement.ensurePlayingIntervalId);
	      }
	    }, interval);
	  }
	
	  function attachAndPlay (elements, stream, index) {
	    if (typeof elements === 'function') {
	      elements = elements();
	    }
	    var element = elements[index % elements.length];
	    (environment.attachMediaStream || attachMediaStream)(element, stream);
	    ensureMediaPlaying(element);
	  }
	
	  // [].concat "casts" `elements` into an array
	  // so forEach works even if `elements` was a single element
	  elements = [].concat(elements);
	  [].concat(streams).forEach(attachAndPlay.bind(null, elements));
	};
	
	MediaStreamManager.prototype = Object.create(SIP.EventEmitter.prototype, {
	  'acquire': {writable: true, value: function acquire (mediaHint) {
	    mediaHint = Object.keys(mediaHint || {}).length ? mediaHint : this.mediaHint;
	
	    var saveSuccess = function (isHintStream, streams) {
	      streams = [].concat(streams);
	      streams.forEach(function (stream) {
	        var streamId = MediaStreamManager.streamId(stream);
	        this.acquisitions[streamId] = !!isHintStream;
	      }, this);
	      return SIP.Utils.Promise.resolve(streams);
	    }.bind(this);
	
	    if (mediaHint.stream) {
	      return saveSuccess(true, mediaHint.stream);
	    } else {
	      // Fallback to audio/video enabled if no mediaHint can be found.
	      var constraints = mediaHint.constraints ||
	        (this.mediaHint && this.mediaHint.constraints) ||
	        {audio: true, video: true};
	
	      var deferred = SIP.Utils.defer();
	
	      /*
	       * Make the call asynchronous, so that ICCs have a chance
	       * to define callbacks to `userMediaRequest`
	       */
	      SIP.Timers.setTimeout(function () {
	        this.emit('userMediaRequest', constraints);
	
	        var emitThenCall = function (eventName, callback) {
	          var callbackArgs = Array.prototype.slice.call(arguments, 2);
	          // Emit with all of the arguments from the real callback.
	          var newArgs = [eventName].concat(callbackArgs);
	
	          this.emit.apply(this, newArgs);
	
	          return callback.apply(null, callbackArgs);
	        }.bind(this);
	
	        if (constraints.audio || constraints.video) {
	          deferred.resolve(
	            SIP.WebRTC.getUserMedia(constraints)
	            .then(
	              emitThenCall.bind(this, 'userMedia', saveSuccess.bind(null, false)),
	              emitThenCall.bind(this, 'userMediaFailed', function(e){throw e;})
	            )
	          );
	        } else {
	          // Local streams were explicitly excluded.
	          deferred.resolve([]);
	        }
	      }.bind(this), 0);
	
	      return deferred.promise;
	    }
	  }},
	
	  'release': {writable: true, value: function release (streams) {
	    streams = [].concat(streams);
	    streams.forEach(function (stream) {
	      var streamId = MediaStreamManager.streamId(stream);
	      if (this.acquisitions[streamId] === false) {
	        stream.getTracks().forEach(function (track) {
	          track.stop();
	        });
	      }
	      delete this.acquisitions[streamId];
	    }, this);
	  }},
	});
	
	// Return since it will be assigned to a variable.
	return MediaStreamManager;
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/**
	 * @augments SIP
	 * @class Class creating a SIP User Agent.
	 * @param {function returning SIP.MediaHandler} [configuration.mediaHandlerFactory]
	 *        A function will be invoked by each of the UA's Sessions to build the MediaHandler for that Session.
	 *        If no (or a falsy) value is provided, each Session will use a default (WebRTC) MediaHandler.
	 *
	 * @param {Object} [configuration.media] gets passed to SIP.MediaHandler.getDescription as mediaHint
	 */
	module.exports = function (SIP, environment) {
	var UA,
	  C = {
	    // UA status codes
	    STATUS_INIT:                0,
	    STATUS_STARTING:            1,
	    STATUS_READY:               2,
	    STATUS_USER_CLOSED:         3,
	    STATUS_NOT_READY:           4,
	
	    // UA error codes
	    CONFIGURATION_ERROR:  1,
	    NETWORK_ERROR:        2,
	
	    ALLOWED_METHODS: [
	      'ACK',
	      'CANCEL',
	      'INVITE',
	      'MESSAGE',
	      'BYE',
	      'OPTIONS',
	      'INFO',
	      'NOTIFY'
	    ],
	
	    ACCEPTED_BODY_TYPES: [
	      'application/sdp',
	      'application/dtmf-relay'
	    ],
	
	    MAX_FORWARDS: 70,
	    TAG_LENGTH: 10
	  };
	
	UA = function(configuration) {
	  var self = this;
	
	  // Helper function for forwarding events
	  function selfEmit(type) {
	    //registrationFailed handler is invoked with two arguments. Allow event handlers to be invoked with a variable no. of arguments
	    return self.emit.bind(self, type);
	  }
	
	  // Set Accepted Body Types
	  C.ACCEPTED_BODY_TYPES = C.ACCEPTED_BODY_TYPES.toString();
	
	  this.log = new SIP.LoggerFactory();
	  this.logger = this.getLogger('sip.ua');
	
	  this.cache = {
	    credentials: {}
	  };
	
	  this.configuration = {};
	  this.dialogs = {};
	
	  //User actions outside any session/dialog (MESSAGE)
	  this.applicants = {};
	
	  this.data = {};
	  this.sessions = {};
	  this.subscriptions = {};
	  this.transport = null;
	  this.contact = null;
	  this.status = C.STATUS_INIT;
	  this.error = null;
	  this.transactions = {
	    nist: {},
	    nict: {},
	    ist: {},
	    ict: {}
	  };
	
	  this.transportRecoverAttempts = 0;
	  this.transportRecoveryTimer = null;
	
	  Object.defineProperties(this, {
	    transactionsCount: {
	      get: function() {
	        var type,
	          transactions = ['nist','nict','ist','ict'],
	          count = 0;
	
	        for (type in transactions) {
	          count += Object.keys(this.transactions[transactions[type]]).length;
	        }
	
	        return count;
	      }
	    },
	
	    nictTransactionsCount: {
	      get: function() {
	        return Object.keys(this.transactions['nict']).length;
	      }
	    },
	
	    nistTransactionsCount: {
	      get: function() {
	        return Object.keys(this.transactions['nist']).length;
	      }
	    },
	
	    ictTransactionsCount: {
	      get: function() {
	        return Object.keys(this.transactions['ict']).length;
	      }
	    },
	
	    istTransactionsCount: {
	      get: function() {
	        return Object.keys(this.transactions['ist']).length;
	      }
	    }
	  });
	
	  /**
	   * Load configuration
	   *
	   * @throws {SIP.Exceptions.ConfigurationError}
	   * @throws {TypeError}
	   */
	
	  if(configuration === undefined) {
	    configuration = {};
	  } else if (typeof configuration === 'string' || configuration instanceof String) {
	    configuration = {
	      uri: configuration
	    };
	  }
	
	  // Apply log configuration if present
	  if (configuration.log) {
	    if (configuration.log.hasOwnProperty('builtinEnabled')) {
	      this.log.builtinEnabled = configuration.log.builtinEnabled;
	    }
	
	    if (configuration.log.hasOwnProperty('level')) {
	      this.log.level = configuration.log.level;
	    }
	
	    if (configuration.log.hasOwnProperty('connector')) {
	      this.log.connector = configuration.log.connector;
	    }
	  }
	
	  try {
	    this.loadConfig(configuration);
	  } catch(e) {
	    this.status = C.STATUS_NOT_READY;
	    this.error = C.CONFIGURATION_ERROR;
	    throw e;
	  }
	
	  // Initialize registerContext
	  this.registerContext = new SIP.RegisterContext(this);
	  this.registerContext.on('failed', selfEmit('registrationFailed'));
	  this.registerContext.on('registered', selfEmit('registered'));
	  this.registerContext.on('unregistered', selfEmit('unregistered'));
	
	  if(this.configuration.autostart) {
	    this.start();
	  }
	
	  if (typeof environment.addEventListener === 'function') {
	    // Google Chrome Packaged Apps don't allow 'unload' listeners:
	    // unload is not available in packaged apps
	    if (!(global.chrome && global.chrome.app && global.chrome.app.runtime)) {
	      environment.addEventListener('unload', this.stop.bind(this));
	    }
	  }
	};
	UA.prototype = Object.create(SIP.EventEmitter.prototype);
	
	//=================
	//  High Level API
	//=================
	
	UA.prototype.register = function(options) {
	  this.configuration.register = true;
	  this.registerContext.register(options);
	
	  return this;
	};
	
	/**
	 * Unregister.
	 *
	 * @param {Boolean} [all] unregister all user bindings.
	 *
	 */
	UA.prototype.unregister = function(options) {
	  this.configuration.register = false;
	
	  var context = this.registerContext;
	  this.afterConnected(context.unregister.bind(context, options));
	
	  return this;
	};
	
	UA.prototype.isRegistered = function() {
	  return this.registerContext.registered;
	};
	
	/**
	 * Connection state.
	 * @param {Boolean}
	 */
	UA.prototype.isConnected = function() {
	  return this.transport ? this.transport.connected : false;
	};
	
	UA.prototype.afterConnected = function afterConnected (callback) {
	  if (this.isConnected()) {
	    callback();
	  } else {
	    this.once('connected', callback);
	  }
	};
	
	/**
	 * Make an outgoing call.
	 *
	 * @param {String} target
	 * @param {Object} views
	 * @param {Object} [options.media] gets passed to SIP.MediaHandler.getDescription as mediaHint
	 *
	 * @throws {TypeError}
	 *
	 */
	UA.prototype.invite = function(target, options) {
	  var context = new SIP.InviteClientContext(this, target, options);
	
	  this.afterConnected(context.invite.bind(context));
	  return context;
	};
	
	UA.prototype.subscribe = function(target, event, options) {
	  var sub = new SIP.Subscription(this, target, event, options);
	
	  this.afterConnected(sub.subscribe.bind(sub));
	  return sub;
	};
	
	/**
	 * Send a message.
	 *
	 * @param {String} target
	 * @param {String} body
	 * @param {Object} [options]
	 *
	 * @throws {TypeError}
	 *
	 */
	UA.prototype.message = function(target, body, options) {
	  if (body === undefined) {
	    throw new TypeError('Not enough arguments');
	  }
	
	  // There is no Message module, so it is okay that the UA handles defaults here.
	  options = Object.create(options || Object.prototype);
	  options.contentType || (options.contentType = 'text/plain');
	  options.body = body;
	
	  return this.request(SIP.C.MESSAGE, target, options);
	};
	
	UA.prototype.request = function (method, target, options) {
	  var req = new SIP.ClientContext(this, method, target, options);
	
	  this.afterConnected(req.send.bind(req));
	  return req;
	};
	
	/**
	 * Gracefully close.
	 *
	 */
	UA.prototype.stop = function() {
	  var session, subscription, applicant,
	    ua = this;
	
	  function transactionsListener() {
	    if (ua.nistTransactionsCount === 0 && ua.nictTransactionsCount === 0) {
	        ua.removeListener('transactionDestroyed', transactionsListener);
	        ua.transport.disconnect();
	    }
	  }
	
	  this.logger.log('user requested closure...');
	
	  if(this.status === C.STATUS_USER_CLOSED) {
	    this.logger.warn('UA already closed');
	    return this;
	  }
	
	  // Clear transportRecoveryTimer
	  SIP.Timers.clearTimeout(this.transportRecoveryTimer);
	
	  // Close registerContext
	  this.logger.log('closing registerContext');
	  this.registerContext.close();
	
	  // Run  _terminate_ on every Session
	  for(session in this.sessions) {
	    this.logger.log('closing session ' + session);
	    this.sessions[session].terminate();
	  }
	
	  //Run _close_ on every Subscription
	  for(subscription in this.subscriptions) {
	    this.logger.log('unsubscribing from subscription ' + subscription);
	    this.subscriptions[subscription].close();
	  }
	
	  // Run  _close_ on every applicant
	  for(applicant in this.applicants) {
	    this.applicants[applicant].close();
	  }
	
	  this.status = C.STATUS_USER_CLOSED;
	
	  /*
	   * If the remaining transactions are all INVITE transactions, there is no need to
	   * wait anymore because every session has already been closed by this method.
	   * - locally originated sessions where terminated (CANCEL or BYE)
	   * - remotely originated sessions where rejected (4XX) or terminated (BYE)
	   * Remaining INVITE transactions belong tho sessions that where answered. This are in
	   * 'accepted' state due to timers 'L' and 'M' defined in [RFC 6026]
	   */
	  if (this.nistTransactionsCount === 0 && this.nictTransactionsCount === 0) {
	    this.transport.disconnect();
	  } else {
	    this.on('transactionDestroyed', transactionsListener);
	  }
	
	  return this;
	};
	
	/**
	 * Connect to the WS server if status = STATUS_INIT.
	 * Resume UA after being closed.
	 *
	 */
	UA.prototype.start = function() {
	  var server;
	
	  this.logger.log('user requested startup...');
	  if (this.status === C.STATUS_INIT) {
	    server = this.getNextWsServer();
	    this.status = C.STATUS_STARTING;
	    new SIP.Transport(this, server);
	  } else if(this.status === C.STATUS_USER_CLOSED) {
	    this.logger.log('resuming');
	    this.status = C.STATUS_READY;
	    this.transport.connect();
	  } else if (this.status === C.STATUS_STARTING) {
	    this.logger.log('UA is in STARTING status, not opening new connection');
	  } else if (this.status === C.STATUS_READY) {
	    this.logger.log('UA is in READY status, not resuming');
	  } else {
	    this.logger.error('Connection is down. Auto-Recovery system is trying to connect');
	  }
	
	  return this;
	};
	
	/**
	 * Normalize a string into a valid SIP request URI
	 *
	 * @param {String} target
	 *
	 * @returns {SIP.URI|undefined}
	 */
	UA.prototype.normalizeTarget = function(target) {
	  return SIP.Utils.normalizeTarget(target, this.configuration.hostportParams);
	};
	
	
	//===============================
	//  Private (For internal use)
	//===============================
	
	UA.prototype.saveCredentials = function(credentials) {
	  this.cache.credentials[credentials.realm] = this.cache.credentials[credentials.realm] || {};
	  this.cache.credentials[credentials.realm][credentials.uri] = credentials;
	
	  return this;
	};
	
	UA.prototype.getCredentials = function(request) {
	  var realm, credentials;
	
	  realm = request.ruri.host;
	
	  if (this.cache.credentials[realm] && this.cache.credentials[realm][request.ruri]) {
	    credentials = this.cache.credentials[realm][request.ruri];
	    credentials.method = request.method;
	  }
	
	  return credentials;
	};
	
	UA.prototype.getLogger = function(category, label) {
	  return this.log.getLogger(category, label);
	};
	
	
	//==============================
	// Event Handlers
	//==============================
	
	/**
	 * Transport Close event
	 * @private
	 * @event
	 * @param {SIP.Transport} transport.
	 */
	UA.prototype.onTransportClosed = function(transport) {
	  // Run _onTransportError_ callback on every client transaction using _transport_
	  var type, idx, length,
	    client_transactions = ['nict', 'ict', 'nist', 'ist'];
	
	  transport.server.status = SIP.Transport.C.STATUS_DISCONNECTED;
	  this.logger.log('connection state set to '+ SIP.Transport.C.STATUS_DISCONNECTED);
	
	  length = client_transactions.length;
	  for (type = 0; type < length; type++) {
	    for(idx in this.transactions[client_transactions[type]]) {
	      this.transactions[client_transactions[type]][idx].onTransportError();
	    }
	  }
	
	  // Close sessions if GRUU is not being used
	  if (!this.contact.pub_gruu) {
	    this.closeSessionsOnTransportError();
	  }
	
	};
	
	/**
	 * Unrecoverable transport event.
	 * Connection reattempt logic has been done and didn't success.
	 * @private
	 * @event
	 * @param {SIP.Transport} transport.
	 */
	UA.prototype.onTransportError = function(transport) {
	  var server;
	
	  this.logger.log('transport ' + transport.server.ws_uri + ' failed | connection state set to '+ SIP.Transport.C.STATUS_ERROR);
	
	  // Close sessions.
	  //Mark this transport as 'down'
	  transport.server.status = SIP.Transport.C.STATUS_ERROR;
	
	  this.emit('disconnected', {
	    transport: transport
	  });
	
	  // try the next transport if the UA isn't closed
	  if(this.status === C.STATUS_USER_CLOSED) {
	    return;
	  }
	
	  server = this.getNextWsServer();
	
	  if(server) {
	    new SIP.Transport(this, server);
	  }else {
	    this.closeSessionsOnTransportError();
	    if (!this.error || this.error !== C.NETWORK_ERROR) {
	      this.status = C.STATUS_NOT_READY;
	      this.error = C.NETWORK_ERROR;
	    }
	    // Transport Recovery process
	    this.recoverTransport();
	  }
	};
	
	/**
	 * Transport connection event.
	 * @private
	 * @event
	 * @param {SIP.Transport} transport.
	 */
	UA.prototype.onTransportConnected = function(transport) {
	  this.transport = transport;
	
	  // Reset transport recovery counter
	  this.transportRecoverAttempts = 0;
	
	  transport.server.status = SIP.Transport.C.STATUS_READY;
	  this.logger.log('connection state set to '+ SIP.Transport.C.STATUS_READY);
	
	  if(this.status === C.STATUS_USER_CLOSED) {
	    return;
	  }
	
	  this.status = C.STATUS_READY;
	  this.error = null;
	
	  if(this.configuration.register) {
	    this.configuration.authenticationFactory.initialize().then(function () {
	      this.registerContext.onTransportConnected();
	    }.bind(this));
	  }
	
	  this.emit('connected', {
	    transport: transport
	  });
	};
	
	
	/**
	 * Transport connecting event
	 * @private
	 * @param {SIP.Transport} transport.
	 * #param {Integer} attempts.
	 */
	  UA.prototype.onTransportConnecting = function(transport, attempts) {
	    this.emit('connecting', {
	      transport: transport,
	      attempts: attempts
	    });
	  };
	
	
	/**
	 * new Transaction
	 * @private
	 * @param {SIP.Transaction} transaction.
	 */
	UA.prototype.newTransaction = function(transaction) {
	  this.transactions[transaction.type][transaction.id] = transaction;
	  this.emit('newTransaction', {transaction: transaction});
	};
	
	
	/**
	 * destroy Transaction
	 * @private
	 * @param {SIP.Transaction} transaction.
	 */
	UA.prototype.destroyTransaction = function(transaction) {
	  delete this.transactions[transaction.type][transaction.id];
	  this.emit('transactionDestroyed', {
	    transaction: transaction
	  });
	};
	
	
	//=========================
	// receiveRequest
	//=========================
	
	/**
	 * Request reception
	 * @private
	 * @param {SIP.IncomingRequest} request.
	 */
	UA.prototype.receiveRequest = function(request) {
	  var dialog, session, message,
	    method = request.method,
	    transaction,
	    replaces,
	    replacedDialog,
	    self = this;
	
	  function ruriMatches (uri) {
	    return uri && uri.user === request.ruri.user;
	  }
	
	  // Check that request URI points to us
	  if(!(ruriMatches(this.configuration.uri) ||
	       ruriMatches(this.contact.uri) ||
	       ruriMatches(this.contact.pub_gruu) ||
	       ruriMatches(this.contact.temp_gruu))) {
	    this.logger.warn('Request-URI does not point to us');
	    if (request.method !== SIP.C.ACK) {
	      request.reply_sl(404);
	    }
	    return;
	  }
	
	  // Check request URI scheme
	  if(request.ruri.scheme === SIP.C.SIPS) {
	    request.reply_sl(416);
	    return;
	  }
	
	  // Check transaction
	  if(SIP.Transactions.checkTransaction(this, request)) {
	    return;
	  }
	
	  /* RFC3261 12.2.2
	   * Requests that do not change in any way the state of a dialog may be
	   * received within a dialog (for example, an OPTIONS request).
	   * They are processed as if they had been received outside the dialog.
	   */
	  if(method === SIP.C.OPTIONS) {
	    new SIP.Transactions.NonInviteServerTransaction(request, this);
	    request.reply(200, null, [
	      'Allow: '+ SIP.UA.C.ALLOWED_METHODS.toString(),
	      'Accept: '+ C.ACCEPTED_BODY_TYPES
	    ]);
	  } else if (method === SIP.C.MESSAGE) {
	    message = new SIP.ServerContext(this, request);
	    message.body = request.body;
	    message.content_type = request.getHeader('Content-Type') || 'text/plain';
	
	    request.reply(200, null);
	    this.emit('message', message);
	  } else if (method !== SIP.C.INVITE &&
	             method !== SIP.C.ACK) {
	    // Let those methods pass through to normal processing for now.
	    transaction = new SIP.ServerContext(this, request);
	  }
	
	  // Initial Request
	  if(!request.to_tag) {
	    switch(method) {
	      case SIP.C.INVITE:
	        replaces =
	          this.configuration.replaces !== SIP.C.supported.UNSUPPORTED &&
	          request.parseHeader('replaces');
	
	        if (replaces) {
	          replacedDialog = this.dialogs[replaces.call_id + replaces.replaces_to_tag + replaces.replaces_from_tag];
	
	          if (!replacedDialog) {
	            //Replaced header without a matching dialog, reject
	            request.reply_sl(481, null);
	            return;
	          } else if (replacedDialog.owner.status === SIP.Session.C.STATUS_TERMINATED) {
	            request.reply_sl(603, null);
	            return;
	          } else if (replacedDialog.state === SIP.Dialog.C.STATUS_CONFIRMED && replaces.early_only) {
	            request.reply_sl(486, null);
	            return;
	          }
	        }
	
	        var isMediaSupported = this.configuration.mediaHandlerFactory.isSupported;
	        if(!isMediaSupported || isMediaSupported()) {
	          session = new SIP.InviteServerContext(this, request);
	          session.replacee = replacedDialog && replacedDialog.owner;
	          session.on('invite', function() {
	            self.emit('invite', this);
	          });
	        } else {
	          this.logger.warn('INVITE received but WebRTC is not supported');
	          request.reply(488);
	        }
	        break;
	      case SIP.C.BYE:
	        // Out of dialog BYE received
	        request.reply(481);
	        break;
	      case SIP.C.CANCEL:
	        session = this.findSession(request);
	        if(session) {
	          session.receiveRequest(request);
	        } else {
	          this.logger.warn('received CANCEL request for a non existent session');
	        }
	        break;
	      case SIP.C.ACK:
	        /* Absorb it.
	         * ACK request without a corresponding Invite Transaction
	         * and without To tag.
	         */
	        break;
	      default:
	        request.reply(405);
	        break;
	    }
	  }
	  // In-dialog request
	  else {
	    dialog = this.findDialog(request);
	
	    if(dialog) {
	      if (method === SIP.C.INVITE) {
	        new SIP.Transactions.InviteServerTransaction(request, this);
	      }
	      dialog.receiveRequest(request);
	    } else if (method === SIP.C.NOTIFY) {
	      session = this.findSession(request);
	      if(session) {
	        session.receiveRequest(request);
	      } else {
	        this.logger.warn('received NOTIFY request for a non existent session');
	        request.reply(481, 'Subscription does not exist');
	      }
	    }
	    /* RFC3261 12.2.2
	     * Request with to tag, but no matching dialog found.
	     * Exception: ACK for an Invite request for which a dialog has not
	     * been created.
	     */
	    else {
	      if(method !== SIP.C.ACK) {
	        request.reply(481);
	      }
	    }
	  }
	};
	
	//=================
	// Utils
	//=================
	
	/**
	 * Get the session to which the request belongs to, if any.
	 * @private
	 * @param {SIP.IncomingRequest} request.
	 * @returns {SIP.OutgoingSession|SIP.IncomingSession|null}
	 */
	UA.prototype.findSession = function(request) {
	  return this.sessions[request.call_id + request.from_tag] ||
	          this.sessions[request.call_id + request.to_tag] ||
	          null;
	};
	
	/**
	 * Get the dialog to which the request belongs to, if any.
	 * @private
	 * @param {SIP.IncomingRequest}
	 * @returns {SIP.Dialog|null}
	 */
	UA.prototype.findDialog = function(request) {
	  return this.dialogs[request.call_id + request.from_tag + request.to_tag] ||
	          this.dialogs[request.call_id + request.to_tag + request.from_tag] ||
	          null;
	};
	
	/**
	 * Retrieve the next server to which connect.
	 * @private
	 * @returns {Object} ws_server
	 */
	UA.prototype.getNextWsServer = function() {
	  // Order servers by weight
	  var idx, length, ws_server,
	    candidates = [];
	
	  length = this.configuration.wsServers.length;
	  for (idx = 0; idx < length; idx++) {
	    ws_server = this.configuration.wsServers[idx];
	
	    if (ws_server.status === SIP.Transport.C.STATUS_ERROR) {
	      continue;
	    } else if (candidates.length === 0) {
	      candidates.push(ws_server);
	    } else if (ws_server.weight > candidates[0].weight) {
	      candidates = [ws_server];
	    } else if (ws_server.weight === candidates[0].weight) {
	      candidates.push(ws_server);
	    }
	  }
	
	  idx = Math.floor(Math.random() * candidates.length);
	
	  return candidates[idx];
	};
	
	/**
	 * Close all sessions on transport error.
	 * @private
	 */
	UA.prototype.closeSessionsOnTransportError = function() {
	  var idx;
	
	  // Run _transportError_ for every Session
	  for(idx in this.sessions) {
	    this.sessions[idx].onTransportError();
	  }
	  // Call registerContext _onTransportClosed_
	  this.registerContext.onTransportClosed();
	};
	
	UA.prototype.recoverTransport = function(ua) {
	  var idx, length, k, nextRetry, count, server;
	
	  ua = ua || this;
	  count = ua.transportRecoverAttempts;
	
	  length = ua.configuration.wsServers.length;
	  for (idx = 0; idx < length; idx++) {
	    ua.configuration.wsServers[idx].status = 0;
	  }
	
	  server = ua.getNextWsServer();
	
	  k = Math.floor((Math.random() * Math.pow(2,count)) +1);
	  nextRetry = k * ua.configuration.connectionRecoveryMinInterval;
	
	  if (nextRetry > ua.configuration.connectionRecoveryMaxInterval) {
	    this.logger.log('time for next connection attempt exceeds connectionRecoveryMaxInterval, resetting counter');
	    nextRetry = ua.configuration.connectionRecoveryMinInterval;
	    count = 0;
	  }
	
	  this.logger.log('next connection attempt in '+ nextRetry +' seconds');
	
	  this.transportRecoveryTimer = SIP.Timers.setTimeout(
	    function(){
	      ua.transportRecoverAttempts = count + 1;
	      new SIP.Transport(ua, server);
	    }, nextRetry * 1000);
	};
	
	function checkAuthenticationFactory (authenticationFactory) {
	  if (!(authenticationFactory instanceof Function)) {
	    return;
	  }
	  if (!authenticationFactory.initialize) {
	    authenticationFactory.initialize = function initialize () {
	      return SIP.Utils.Promise.resolve();
	    };
	  }
	  return authenticationFactory;
	}
	
	/**
	 * Configuration load.
	 * @private
	 * returns {Boolean}
	 */
	UA.prototype.loadConfig = function(configuration) {
	  // Settings and default values
	  var parameter, value, checked_value, hostportParams, registrarServer,
	    settings = {
	      /* Host address
	      * Value to be set in Via sent_by and host part of Contact FQDN
	      */
	      viaHost: SIP.Utils.createRandomToken(12) + '.invalid',
	
	      uri: new SIP.URI('sip', 'anonymous.' + SIP.Utils.createRandomToken(6), 'anonymous.invalid', null, null),
	      wsServers: [{
	        scheme: 'WSS',
	        sip_uri: '<sip:edge.sip.onsip.com;transport=ws;lr>',
	        status: 0,
	        weight: 0,
	        ws_uri: 'wss://edge.sip.onsip.com'
	      }],
	
	      // Password
	      password: null,
	
	      // Registration parameters
	      registerExpires: 600,
	      register: true,
	      registrarServer: null,
	
	      // Transport related parameters
	      wsServerMaxReconnection: 3,
	      wsServerReconnectionTimeout: 4,
	
	      connectionRecoveryMinInterval: 2,
	      connectionRecoveryMaxInterval: 30,
	
	      keepAliveInterval: 0,
	
	      extraSupported: [],
	
	      usePreloadedRoute: false,
	
	      //string to be inserted into User-Agent request header
	      userAgentString: SIP.C.USER_AGENT,
	
	      // Session parameters
	      iceCheckingTimeout: 5000,
	      noAnswerTimeout: 60,
	      stunServers: ['stun:stun.l.google.com:19302'],
	      turnServers: [],
	
	      // Logging parameters
	      traceSip: false,
	
	      // Hacks
	      hackViaTcp: false,
	      hackIpInContact: false,
	      hackWssInTransport: false,
	      hackAllowUnregisteredOptionTags: false,
	
	      contactTransport: 'ws',
	      forceRport: false,
	
	      //autostarting
	      autostart: true,
	
	      //Reliable Provisional Responses
	      rel100: SIP.C.supported.UNSUPPORTED,
	
	      // Replaces header (RFC 3891)
	      // http://tools.ietf.org/html/rfc3891
	      replaces: SIP.C.supported.UNSUPPORTED,
	
	      mediaHandlerFactory: SIP.WebRTC.MediaHandler.defaultFactory,
	
	      authenticationFactory: checkAuthenticationFactory(function authenticationFactory (ua) {
	        return new SIP.DigestAuthentication(ua);
	      })
	    };
	
	  // Pre-Configuration
	  function aliasUnderscored (parameter, logger) {
	    var underscored = parameter.replace(/([a-z][A-Z])/g, function (m) {
	      return m[0] + '_' + m[1].toLowerCase();
	    });
	
	    if (parameter === underscored) {
	      return;
	    }
	
	    var hasParameter = configuration.hasOwnProperty(parameter);
	    if (configuration.hasOwnProperty(underscored)) {
	      logger.warn(underscored + ' is deprecated, please use ' + parameter);
	      if (hasParameter) {
	        logger.warn(parameter + ' overriding ' + underscored);
	      }
	    }
	
	    configuration[parameter] = hasParameter ? configuration[parameter] : configuration[underscored];
	  }
	
	  // Check Mandatory parameters
	  for(parameter in UA.configuration_check.mandatory) {
	    aliasUnderscored(parameter, this.logger);
	    if(!configuration.hasOwnProperty(parameter)) {
	      throw new SIP.Exceptions.ConfigurationError(parameter);
	    } else {
	      value = configuration[parameter];
	      checked_value = UA.configuration_check.mandatory[parameter](value);
	      if (checked_value !== undefined) {
	        settings[parameter] = checked_value;
	      } else {
	        throw new SIP.Exceptions.ConfigurationError(parameter, value);
	      }
	    }
	  }
	
	  SIP.Utils.optionsOverride(configuration, 'rel100', 'reliable', true, this.logger, SIP.C.supported.UNSUPPORTED);
	
	  var emptyArraysAllowed = ['stunServers', 'turnServers'];
	
	  // Check Optional parameters
	  for(parameter in UA.configuration_check.optional) {
	    aliasUnderscored(parameter, this.logger);
	    if(configuration.hasOwnProperty(parameter)) {
	      value = configuration[parameter];
	
	      // If the parameter value is an empty array, but shouldn't be, apply its default value.
	      if (value instanceof Array && value.length === 0 && emptyArraysAllowed.indexOf(parameter) < 0) { continue; }
	
	      // If the parameter value is null, empty string, or undefined then apply its default value.
	      if(value === null || value === "" || value === undefined) { continue; }
	      // If it's a number with NaN value then also apply its default value.
	      // NOTE: JS does not allow "value === NaN", the following does the work:
	      else if(typeof(value) === 'number' && isNaN(value)) { continue; }
	
	      checked_value = UA.configuration_check.optional[parameter](value);
	      if (checked_value !== undefined) {
	        settings[parameter] = checked_value;
	      } else {
	        throw new SIP.Exceptions.ConfigurationError(parameter, value);
	      }
	    }
	  }
	
	  // Sanity Checks
	
	  // Connection recovery intervals
	  if(settings.connectionRecoveryMaxInterval < settings.connectionRecoveryMinInterval) {
	    throw new SIP.Exceptions.ConfigurationError('connectionRecoveryMaxInterval', settings.connectionRecoveryMaxInterval);
	  }
	
	  // Post Configuration Process
	
	  // Allow passing 0 number as displayName.
	  if (settings.displayName === 0) {
	    settings.displayName = '0';
	  }
	
	  // Instance-id for GRUU
	  if (!settings.instanceId) {
	    settings.instanceId = SIP.Utils.newUUID();
	  }
	
	  // sipjsId instance parameter. Static random tag of length 5
	  settings.sipjsId = SIP.Utils.createRandomToken(5);
	
	  // String containing settings.uri without scheme and user.
	  hostportParams = settings.uri.clone();
	  hostportParams.user = null;
	  settings.hostportParams = hostportParams.toRaw().replace(/^sip:/i, '');
	
	  /* Check whether authorizationUser is explicitly defined.
	   * Take 'settings.uri.user' value if not.
	   */
	  if (!settings.authorizationUser) {
	    settings.authorizationUser = settings.uri.user;
	  }
	
	  /* If no 'registrarServer' is set use the 'uri' value without user portion. */
	  if (!settings.registrarServer) {
	    registrarServer = settings.uri.clone();
	    registrarServer.user = null;
	    settings.registrarServer = registrarServer;
	  }
	
	  // User noAnswerTimeout
	  settings.noAnswerTimeout = settings.noAnswerTimeout * 1000;
	
	  // Via Host
	  if (settings.hackIpInContact) {
	    if (typeof settings.hackIpInContact === 'boolean') {
	      settings.viaHost = SIP.Utils.getRandomTestNetIP();
	    }
	    else if (typeof settings.hackIpInContact === 'string') {
	      settings.viaHost = settings.hackIpInContact;
	    }
	  }
	
	  // Contact transport parameter
	  if (settings.hackWssInTransport) {
	    settings.contactTransport = 'wss';
	  }
	
	  this.contact = {
	    pub_gruu: null,
	    temp_gruu: null,
	    uri: new SIP.URI('sip', SIP.Utils.createRandomToken(8), settings.viaHost, null, {transport: settings.contactTransport}),
	    toString: function(options){
	      options = options || {};
	
	      var
	        anonymous = options.anonymous || null,
	        outbound = options.outbound || null,
	        contact = '<';
	
	      if (anonymous) {
	        contact += (this.temp_gruu || ('sip:anonymous@anonymous.invalid;transport='+settings.contactTransport)).toString();
	      } else {
	        contact += (this.pub_gruu || this.uri).toString();
	      }
	
	      if (outbound) {
	        contact += ';ob';
	      }
	
	      contact += '>';
	
	      return contact;
	    }
	  };
	
	  // media overrides mediaConstraints
	  SIP.Utils.optionsOverride(settings, 'media', 'mediaConstraints', true, this.logger);
	
	  // Fill the value of the configuration_skeleton
	  for(parameter in settings) {
	    UA.configuration_skeleton[parameter].value = settings[parameter];
	  }
	
	  Object.defineProperties(this.configuration, UA.configuration_skeleton);
	
	  // Clean UA.configuration_skeleton
	  for(parameter in settings) {
	    UA.configuration_skeleton[parameter].value = '';
	  }
	
	  this.logger.log('configuration parameters after validation:');
	  for(parameter in settings) {
	    switch(parameter) {
	      case 'uri':
	      case 'registrarServer':
	      case 'mediaHandlerFactory':
	        this.logger.log('· ' + parameter + ': ' + settings[parameter]);
	        break;
	      case 'password':
	        this.logger.log('· ' + parameter + ': ' + 'NOT SHOWN');
	        break;
	      default:
	        this.logger.log('· ' + parameter + ': ' + JSON.stringify(settings[parameter]));
	    }
	  }
	
	  return;
	};
	
	/**
	 * Configuration Object skeleton.
	 * @private
	 */
	UA.configuration_skeleton = (function() {
	  var idx,  parameter,
	    skeleton = {},
	    parameters = [
	      // Internal parameters
	      "sipjsId",
	      "hostportParams",
	
	      // Optional user configurable parameters
	      "uri",
	      "wsServers",
	      "authorizationUser",
	      "connectionRecoveryMaxInterval",
	      "connectionRecoveryMinInterval",
	      "keepAliveInterval",
	      "extraSupported",
	      "displayName",
	      "hackViaTcp", // false.
	      "hackIpInContact", //false
	      "hackWssInTransport", //false
	      "hackAllowUnregisteredOptionTags", //false
	      "contactTransport", // 'ws'
	      "forceRport", // false
	      "iceCheckingTimeout",
	      "instanceId",
	      "noAnswerTimeout", // 30 seconds.
	      "password",
	      "registerExpires", // 600 seconds.
	      "registrarServer",
	      "reliable",
	      "rel100",
	      "replaces",
	      "userAgentString", //SIP.C.USER_AGENT
	      "autostart",
	      "stunServers",
	      "traceSip",
	      "turnServers",
	      "usePreloadedRoute",
	      "wsServerMaxReconnection",
	      "wsServerReconnectionTimeout",
	      "mediaHandlerFactory",
	      "media",
	      "mediaConstraints",
	      "authenticationFactory",
	
	      // Post-configuration generated parameters
	      "via_core_value",
	      "viaHost"
	    ];
	
	  for(idx in parameters) {
	    parameter = parameters[idx];
	    skeleton[parameter] = {
	      value: '',
	      writable: false,
	      configurable: false
	    };
	  }
	
	  skeleton['register'] = {
	    value: '',
	    writable: true,
	    configurable: false
	  };
	
	  return skeleton;
	}());
	
	/**
	 * Configuration checker.
	 * @private
	 * @return {Boolean}
	 */
	UA.configuration_check = {
	  mandatory: {
	  },
	
	  optional: {
	
	    uri: function(uri) {
	      var parsed;
	
	      if (!(/^sip:/i).test(uri)) {
	        uri = SIP.C.SIP + ':' + uri;
	      }
	      parsed = SIP.URI.parse(uri);
	
	      if(!parsed) {
	        return;
	      } else if(!parsed.user) {
	        return;
	      } else {
	        return parsed;
	      }
	    },
	
	    //Note: this function used to call 'this.logger.error' but calling 'this' with anything here is invalid
	    wsServers: function(wsServers) {
	      var idx, length, url;
	
	      /* Allow defining wsServers parameter as:
	       *  String: "host"
	       *  Array of Strings: ["host1", "host2"]
	       *  Array of Objects: [{ws_uri:"host1", weight:1}, {ws_uri:"host2", weight:0}]
	       *  Array of Objects and Strings: [{ws_uri:"host1"}, "host2"]
	       */
	      if (typeof wsServers === 'string') {
	        wsServers = [{ws_uri: wsServers}];
	      } else if (wsServers instanceof Array) {
	        length = wsServers.length;
	        for (idx = 0; idx < length; idx++) {
	          if (typeof wsServers[idx] === 'string'){
	            wsServers[idx] = {ws_uri: wsServers[idx]};
	          }
	        }
	      } else {
	        return;
	      }
	
	      if (wsServers.length === 0) {
	        return false;
	      }
	
	      length = wsServers.length;
	      for (idx = 0; idx < length; idx++) {
	        if (!wsServers[idx].ws_uri) {
	          return;
	        }
	        if (wsServers[idx].weight && !Number(wsServers[idx].weight)) {
	          return;
	        }
	
	        url = SIP.Grammar.parse(wsServers[idx].ws_uri, 'absoluteURI');
	
	        if(url === -1) {
	          return;
	        } else if(['wss', 'ws', 'udp'].indexOf(url.scheme) < 0) {
	          return;
	        } else {
	          wsServers[idx].sip_uri = '<sip:' + url.host + (url.port ? ':' + url.port : '') + ';transport=' + url.scheme.replace(/^wss$/i, 'ws') + ';lr>';
	
	          if (!wsServers[idx].weight) {
	            wsServers[idx].weight = 0;
	          }
	
	          wsServers[idx].status = 0;
	          wsServers[idx].scheme = url.scheme.toUpperCase();
	        }
	      }
	      return wsServers;
	    },
	
	    authorizationUser: function(authorizationUser) {
	      if(SIP.Grammar.parse('"'+ authorizationUser +'"', 'quoted_string') === -1) {
	        return;
	      } else {
	        return authorizationUser;
	      }
	    },
	
	    connectionRecoveryMaxInterval: function(connectionRecoveryMaxInterval) {
	      var value;
	      if(SIP.Utils.isDecimal(connectionRecoveryMaxInterval)) {
	        value = Number(connectionRecoveryMaxInterval);
	        if(value > 0) {
	          return value;
	        }
	      }
	    },
	
	    connectionRecoveryMinInterval: function(connectionRecoveryMinInterval) {
	      var value;
	      if(SIP.Utils.isDecimal(connectionRecoveryMinInterval)) {
	        value = Number(connectionRecoveryMinInterval);
	        if(value > 0) {
	          return value;
	        }
	      }
	    },
	
	    displayName: function(displayName) {
	      if(SIP.Grammar.parse('"' + displayName + '"', 'displayName') === -1) {
	        return;
	      } else {
	        return displayName;
	      }
	    },
	
	    hackViaTcp: function(hackViaTcp) {
	      if (typeof hackViaTcp === 'boolean') {
	        return hackViaTcp;
	      }
	    },
	
	    hackIpInContact: function(hackIpInContact) {
	      if (typeof hackIpInContact === 'boolean') {
	        return hackIpInContact;
	      }
	      else if (typeof hackIpInContact === 'string' && SIP.Grammar.parse(hackIpInContact, 'host') !== -1) {
	        return hackIpInContact;
	      }
	    },
	
	    iceCheckingTimeout: function(iceCheckingTimeout) {
	      if(SIP.Utils.isDecimal(iceCheckingTimeout)) {
	        return Math.max(500, iceCheckingTimeout);
	      }
	    },
	
	    hackWssInTransport: function(hackWssInTransport) {
	      if (typeof hackWssInTransport === 'boolean') {
	        return hackWssInTransport;
	      }
	    },
	
	    hackAllowUnregisteredOptionTags: function(hackAllowUnregisteredOptionTags) {
	      if (typeof hackAllowUnregisteredOptionTags === 'boolean') {
	        return hackAllowUnregisteredOptionTags;
	      }
	    },
	
	    contactTransport: function(contactTransport) {
	      if (typeof contactTransport === 'string') {
	        return contactTransport;
	      }
	    },
	
	    forceRport: function(forceRport) {
	      if (typeof forceRport === 'boolean') {
	        return forceRport;
	      }
	    },
	
	    instanceId: function(instanceId) {
	      if(typeof instanceId !== 'string') {
	        return;
	      }
	
	      if ((/^uuid:/i.test(instanceId))) {
	        instanceId = instanceId.substr(5);
	      }
	
	      if(SIP.Grammar.parse(instanceId, 'uuid') === -1) {
	        return;
	      } else {
	        return instanceId;
	      }
	    },
	
	    keepAliveInterval: function(keepAliveInterval) {
	      var value;
	      if (SIP.Utils.isDecimal(keepAliveInterval)) {
	        value = Number(keepAliveInterval);
	        if (value > 0) {
	          return value;
	        }
	      }
	    },
	
	    extraSupported: function(optionTags) {
	      var idx, length;
	
	      if (!(optionTags instanceof Array)) {
	        return;
	      }
	
	      length = optionTags.length;
	      for (idx = 0; idx < length; idx++) {
	        if (typeof optionTags[idx] !== 'string') {
	          return;
	        }
	      }
	
	      return optionTags;
	    },
	
	    noAnswerTimeout: function(noAnswerTimeout) {
	      var value;
	      if (SIP.Utils.isDecimal(noAnswerTimeout)) {
	        value = Number(noAnswerTimeout);
	        if (value > 0) {
	          return value;
	        }
	      }
	    },
	
	    password: function(password) {
	      return String(password);
	    },
	
	    rel100: function(rel100) {
	      if(rel100 === SIP.C.supported.REQUIRED) {
	        return SIP.C.supported.REQUIRED;
	      } else if (rel100 === SIP.C.supported.SUPPORTED) {
	        return SIP.C.supported.SUPPORTED;
	      } else  {
	        return SIP.C.supported.UNSUPPORTED;
	      }
	    },
	
	    replaces: function(replaces) {
	      if(replaces === SIP.C.supported.REQUIRED) {
	        return SIP.C.supported.REQUIRED;
	      } else if (replaces === SIP.C.supported.SUPPORTED) {
	        return SIP.C.supported.SUPPORTED;
	      } else  {
	        return SIP.C.supported.UNSUPPORTED;
	      }
	    },
	
	    register: function(register) {
	      if (typeof register === 'boolean') {
	        return register;
	      }
	    },
	
	    registerExpires: function(registerExpires) {
	      var value;
	      if (SIP.Utils.isDecimal(registerExpires)) {
	        value = Number(registerExpires);
	        if (value > 0) {
	          return value;
	        }
	      }
	    },
	
	    registrarServer: function(registrarServer) {
	      var parsed;
	
	      if(typeof registrarServer !== 'string') {
	        return;
	      }
	
	      if (!/^sip:/i.test(registrarServer)) {
	        registrarServer = SIP.C.SIP + ':' + registrarServer;
	      }
	      parsed = SIP.URI.parse(registrarServer);
	
	      if(!parsed) {
	        return;
	      } else if(parsed.user) {
	        return;
	      } else {
	        return parsed;
	      }
	    },
	
	    stunServers: function(stunServers) {
	      var idx, length, stun_server;
	
	      if (typeof stunServers === 'string') {
	        stunServers = [stunServers];
	      } else if (!(stunServers instanceof Array)) {
	        return;
	      }
	
	      length = stunServers.length;
	      for (idx = 0; idx < length; idx++) {
	        stun_server = stunServers[idx];
	        if (!(/^stuns?:/.test(stun_server))) {
	          stun_server = 'stun:' + stun_server;
	        }
	
	        if(SIP.Grammar.parse(stun_server, 'stun_URI') === -1) {
	          return;
	        } else {
	          stunServers[idx] = stun_server;
	        }
	      }
	      return stunServers;
	    },
	
	    traceSip: function(traceSip) {
	      if (typeof traceSip === 'boolean') {
	        return traceSip;
	      }
	    },
	
	    turnServers: function(turnServers) {
	      var idx, jdx, length, turn_server, num_turn_server_urls, url;
	
	      if (turnServers instanceof Array) {
	        // Do nothing
	      } else {
	        turnServers = [turnServers];
	      }
	
	      length = turnServers.length;
	      for (idx = 0; idx < length; idx++) {
	        turn_server = turnServers[idx];
	        //Backwards compatibility: Allow defining the turn_server url with the 'server' property.
	        if (turn_server.server) {
	          turn_server.urls = [turn_server.server];
	        }
	
	        if (!turn_server.urls || !turn_server.username || !turn_server.password) {
	          return;
	        }
	
	        if (turn_server.urls instanceof Array) {
	          num_turn_server_urls = turn_server.urls.length;
	        } else {
	          turn_server.urls = [turn_server.urls];
	          num_turn_server_urls = 1;
	        }
	
	        for (jdx = 0; jdx < num_turn_server_urls; jdx++) {
	          url = turn_server.urls[jdx];
	
	          if (!(/^turns?:/.test(url))) {
	            url = 'turn:' + url;
	          }
	
	          if(SIP.Grammar.parse(url, 'turn_URI') === -1) {
	            return;
	          }
	        }
	      }
	      return turnServers;
	    },
	
	    userAgentString: function(userAgentString) {
	      if (typeof userAgentString === 'string') {
	        return userAgentString;
	      }
	    },
	
	    usePreloadedRoute: function(usePreloadedRoute) {
	      if (typeof usePreloadedRoute === 'boolean') {
	        return usePreloadedRoute;
	      }
	    },
	
	    wsServerMaxReconnection: function(wsServerMaxReconnection) {
	      var value;
	      if (SIP.Utils.isDecimal(wsServerMaxReconnection)) {
	        value = Number(wsServerMaxReconnection);
	        if (value > 0) {
	          return value;
	        }
	      }
	    },
	
	    wsServerReconnectionTimeout: function(wsServerReconnectionTimeout) {
	      var value;
	      if (SIP.Utils.isDecimal(wsServerReconnectionTimeout)) {
	        value = Number(wsServerReconnectionTimeout);
	        if (value > 0) {
	          return value;
	        }
	      }
	    },
	
	    autostart: function(autostart) {
	      if (typeof autostart === 'boolean') {
	        return autostart;
	      }
	    },
	
	    mediaHandlerFactory: function(mediaHandlerFactory) {
	      if (mediaHandlerFactory instanceof Function) {
	        var promisifiedFactory = function promisifiedFactory () {
	          var mediaHandler = mediaHandlerFactory.apply(this, arguments);
	
	          function patchMethod (methodName) {
	            var method = mediaHandler[methodName];
	            if (method.length > 1) {
	              var callbacksFirst = methodName === 'getDescription';
	              mediaHandler[methodName] = SIP.Utils.promisify(mediaHandler, methodName, callbacksFirst);
	            }
	          }
	
	          patchMethod('getDescription');
	          patchMethod('setDescription');
	
	          return mediaHandler;
	        };
	
	        promisifiedFactory.isSupported = mediaHandlerFactory.isSupported;
	        return promisifiedFactory;
	      }
	    },
	
	    authenticationFactory: checkAuthenticationFactory
	  }
	};
	
	UA.C = C;
	SIP.UA = UA;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview Hacks - This file contains all of the things we
	 * wish we didn't have to do, just for interop.  It is similar to
	 * Utils, which provides actually useful and relevant functions for
	 * a SIP library. Methods in this file are grouped by vendor, so
	 * as to most easily track when particular hacks may not be necessary anymore.
	 */
	
	module.exports = function (SIP) {
	
	//keep to quiet jshint, and remain consistent with other files
	SIP = SIP;
	
	var Hacks = {
	  AllBrowsers: {
	    maskDtls: function (message) {
	      if (message.body) {
	        message.body = message.body.replace(/ UDP\/TLS\/RTP\/SAVP/gmi, " RTP/SAVP");
	      }
	    },
	    unmaskDtls: function (sdp) {
	      /**
	       * Chrome does not handle DTLS correctly (Canaray does, but not production)
	       * keeping Chrome as SDES until DTLS is fixed (comment out 'is_opera' condition)
	       *
	       * UPDATE: May 21, 2014
	       * Chrome 35 now properly defaults to DTLS.  Only Opera remains using SDES
	       *
	       * UPDATE: 2014-09-24
	       * Opera now supports DTLS by default as well.
	       *
	       **/
	      return sdp.replace(/ RTP\/SAVP/gmi, " UDP/TLS/RTP/SAVP");
	    }
	  },
	  Firefox: {
	    /* Condition to detect if hacks are applicable */
	    isFirefox: function () {
	      return typeof mozRTCPeerConnection !== 'undefined';
	    },
	
	    cannotHandleExtraWhitespace: function (message) {
	      if (this.isFirefox() && message.body) {
	        message.body = message.body.replace(/ \r\n/g, "\r\n");
	      }
	    },
	
	    hasMissingCLineInSDP: function (sdp) {
	      /*
	       * This is a Firefox hack to insert valid sdp when getDescription is
	       * called with the constraint offerToReceiveVideo = false.
	       * We search for either a c-line at the top of the sdp above all
	       * m-lines. If that does not exist then we search for a c-line
	       * beneath each m-line. If it is missing a c-line, we insert
	       * a fake c-line with the ip address 0.0.0.0. This is then valid
	       * sdp and no media will be sent for that m-line.
	       *
	       * Valid SDP is:
	       * m=
	       * i=
	       * c=
	       */
	      var insertAt, mlines;
	      if (sdp.indexOf('c=') > sdp.indexOf('m=')) {
	
	        // Find all m= lines
	        mlines = sdp.match(/m=.*\r\n.*/g);
	        for (var i=0; i<mlines.length; i++) {
	
	          // If it has an i= line, check if the next line is the c= line
	          if (mlines[i].toString().search(/i=.*/) >= 0) {
	            insertAt = sdp.indexOf(mlines[i].toString())+mlines[i].toString().length;
	            if (sdp.substr(insertAt,2)!=='c=') {
	              sdp = sdp.substr(0,insertAt) + '\r\nc=IN IP4 0.0.0.0' + sdp.substr(insertAt);
	            }
	
	          // else add the C line if it's missing
	          } else if (mlines[i].toString().search(/c=.*/) < 0) {
	            insertAt = sdp.indexOf(mlines[i].toString().match(/.*/))+mlines[i].toString().match(/.*/).toString().length;
	            sdp = sdp.substr(0,insertAt) + '\r\nc=IN IP4 0.0.0.0' + sdp.substr(insertAt);
	          }
	        }
	      }
	      return sdp;
	    },
	  },
	
	  Chrome: {
	    needsExplicitlyInactiveSDP: function (sdp) {
	      var sub, index;
	
	      if (Hacks.Firefox.isFirefox()) { // Fix this in Firefox before sending
	        index = sdp.indexOf('m=video 0');
	        if (index !== -1) {
	          sub = sdp.substr(index);
	          sub = sub.replace(/\r\nc=IN IP4.*\r\n$/,
	                            '\r\nc=IN IP4 0.0.0.0\r\na=inactive\r\n');
	          return sdp.substr(0, index) + sub;
	        }
	      }
	      return sdp;
	    },
	
	    getsConfusedAboutGUM: function (session) {
	      if (session.mediaHandler) {
	        session.mediaHandler.close();
	      }
	    }
	  }
	};
	return Hacks;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview Incoming SIP Message Sanity Check
	 */
	
	/**
	 * SIP message sanity check.
	 * @augments SIP
	 * @function
	 * @param {SIP.IncomingMessage} message
	 * @param {SIP.UA} ua
	 * @param {SIP.Transport} transport
	 * @returns {Boolean}
	 */
	module.exports = function (SIP) {
	var sanityCheck,
	 logger,
	 message, ua, transport,
	 requests = [],
	 responses = [],
	 all = [];
	
	// Reply
	function reply(status_code) {
	  var to,
	    response = SIP.Utils.buildStatusLine(status_code),
	    vias = message.getHeaders('via'),
	    length = vias.length,
	    idx = 0;
	
	  for(idx; idx < length; idx++) {
	    response += "Via: " + vias[idx] + "\r\n";
	  }
	
	  to = message.getHeader('To');
	
	  if(!message.to_tag) {
	    to += ';tag=' + SIP.Utils.newTag();
	  }
	
	  response += "To: " + to + "\r\n";
	  response += "From: " + message.getHeader('From') + "\r\n";
	  response += "Call-ID: " + message.call_id + "\r\n";
	  response += "CSeq: " + message.cseq + " " + message.method + "\r\n";
	  response += "\r\n";
	
	  transport.send(response);
	}
	
	/*
	 * Sanity Check for incoming Messages
	 *
	 * Requests:
	 *  - _rfc3261_8_2_2_1_ Receive a Request with a non supported URI scheme
	 *  - _rfc3261_16_3_4_ Receive a Request already sent by us
	 *   Does not look at via sent-by but at sipjsId, which is inserted as
	 *   a prefix in all initial requests generated by the ua
	 *  - _rfc3261_18_3_request_ Body Content-Length
	 *  - _rfc3261_8_2_2_2_ Merged Requests
	 *
	 * Responses:
	 *  - _rfc3261_8_1_3_3_ Multiple Via headers
	 *  - _rfc3261_18_1_2_ sent-by mismatch
	 *  - _rfc3261_18_3_response_ Body Content-Length
	 *
	 * All:
	 *  - Minimum headers in a SIP message
	 */
	
	// Sanity Check functions for requests
	function rfc3261_8_2_2_1() {
	  if(!message.ruri || message.ruri.scheme !== 'sip') {
	    reply(416);
	    return false;
	  }
	}
	
	function rfc3261_16_3_4() {
	  if(!message.to_tag) {
	    if(message.call_id.substr(0, 5) === ua.configuration.sipjsId) {
	      reply(482);
	      return false;
	    }
	  }
	}
	
	function rfc3261_18_3_request() {
	  var len = SIP.Utils.str_utf8_length(message.body),
	  contentLength = message.getHeader('content-length');
	
	  if(len < contentLength) {
	    reply(400);
	    return false;
	  }
	}
	
	function rfc3261_8_2_2_2() {
	  var tr, idx,
	    fromTag = message.from_tag,
	    call_id = message.call_id,
	    cseq = message.cseq;
	
	  if(!message.to_tag) {
	    if(message.method === SIP.C.INVITE) {
	      tr = ua.transactions.ist[message.via_branch];
	      if(tr) {
	        return;
	      } else {
	        for(idx in ua.transactions.ist) {
	          tr = ua.transactions.ist[idx];
	          if(tr.request.from_tag === fromTag && tr.request.call_id === call_id && tr.request.cseq === cseq) {
	            reply(482);
	            return false;
	          }
	        }
	      }
	    } else {
	      tr = ua.transactions.nist[message.via_branch];
	      if(tr) {
	        return;
	      } else {
	        for(idx in ua.transactions.nist) {
	          tr = ua.transactions.nist[idx];
	          if(tr.request.from_tag === fromTag && tr.request.call_id === call_id && tr.request.cseq === cseq) {
	            reply(482);
	            return false;
	          }
	        }
	      }
	    }
	  }
	}
	
	// Sanity Check functions for responses
	function rfc3261_8_1_3_3() {
	  if(message.getHeaders('via').length > 1) {
	    logger.warn('More than one Via header field present in the response. Dropping the response');
	    return false;
	  }
	}
	
	function rfc3261_18_1_2() {
	  var viaHost = ua.configuration.viaHost;
	  if(message.via.host !== viaHost || message.via.port !== undefined) {
	    logger.warn('Via sent-by in the response does not match UA Via host value. Dropping the response');
	    return false;
	  }
	}
	
	function rfc3261_18_3_response() {
	  var
	    len = SIP.Utils.str_utf8_length(message.body),
	    contentLength = message.getHeader('content-length');
	
	    if(len < contentLength) {
	      logger.warn('Message body length is lower than the value in Content-Length header field. Dropping the response');
	      return false;
	    }
	}
	
	// Sanity Check functions for requests and responses
	function minimumHeaders() {
	  var
	    mandatoryHeaders = ['from', 'to', 'call_id', 'cseq', 'via'],
	    idx = mandatoryHeaders.length;
	
	  while(idx--) {
	    if(!message.hasHeader(mandatoryHeaders[idx])) {
	      logger.warn('Missing mandatory header field : '+ mandatoryHeaders[idx] +'. Dropping the response');
	      return false;
	    }
	  }
	}
	
	requests.push(rfc3261_8_2_2_1);
	requests.push(rfc3261_16_3_4);
	requests.push(rfc3261_18_3_request);
	requests.push(rfc3261_8_2_2_2);
	
	responses.push(rfc3261_8_1_3_3);
	responses.push(rfc3261_18_1_2);
	responses.push(rfc3261_18_3_response);
	
	all.push(minimumHeaders);
	
	sanityCheck = function(m, u, t) {
	  var len, pass;
	
	  message = m;
	  ua = u;
	  transport = t;
	
	  logger = ua.getLogger('sip.sanitycheck');
	
	  len = all.length;
	  while(len--) {
	    pass = all[len](message);
	    if(pass === false) {
	      return false;
	    }
	  }
	
	  if(message instanceof SIP.IncomingRequest) {
	    len = requests.length;
	    while(len--) {
	      pass = requests[len](message);
	      if(pass === false) {
	        return false;
	      }
	    }
	  }
	
	  else if(message instanceof SIP.IncomingResponse) {
	    len = responses.length;
	    while(len--) {
	      pass = responses[len](message);
	      if(pass === false) {
	        return false;
	      }
	    }
	  }
	
	  //Everything is OK
	  return true;
	};
	
	SIP.sanityCheck = sanityCheck;
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * @fileoverview SIP Digest Authentication
	 */
	
	/**
	 * SIP Digest Authentication.
	 * @augments SIP.
	 * @function Digest Authentication
	 * @param {SIP.UA} ua
	 */
	module.exports = function (Utils) {
	var DigestAuthentication;
	
	DigestAuthentication = function(ua) {
	  this.logger = ua.getLogger('sipjs.digestauthentication');
	  this.username = ua.configuration.authorizationUser;
	  this.password = ua.configuration.password;
	  this.cnonce = null;
	  this.nc = 0;
	  this.ncHex = '00000000';
	  this.response = null;
	};
	
	
	/**
	* Performs Digest authentication given a SIP request and the challenge
	* received in a response to that request.
	* Returns true if credentials were successfully generated, false otherwise.
	*
	* @param {SIP.OutgoingRequest} request
	* @param {Object} challenge
	*/
	DigestAuthentication.prototype.authenticate = function(request, challenge) {
	  // Inspect and validate the challenge.
	
	  this.algorithm = challenge.algorithm;
	  this.realm = challenge.realm;
	  this.nonce = challenge.nonce;
	  this.opaque = challenge.opaque;
	  this.stale = challenge.stale;
	
	  if (this.algorithm) {
	    if (this.algorithm !== 'MD5') {
	      this.logger.warn('challenge with Digest algorithm different than "MD5", authentication aborted');
	      return false;
	    }
	  } else {
	    this.algorithm = 'MD5';
	  }
	
	  if (! this.realm) {
	    this.logger.warn('challenge without Digest realm, authentication aborted');
	    return false;
	  }
	
	  if (! this.nonce) {
	    this.logger.warn('challenge without Digest nonce, authentication aborted');
	    return false;
	  }
	
	  // 'qop' can contain a list of values (Array). Let's choose just one.
	  if (challenge.qop) {
	    if (challenge.qop.indexOf('auth') > -1) {
	      this.qop = 'auth';
	    } else if (challenge.qop.indexOf('auth-int') > -1) {
	      this.qop = 'auth-int';
	    } else {
	      // Otherwise 'qop' is present but does not contain 'auth' or 'auth-int', so abort here.
	      this.logger.warn('challenge without Digest qop different than "auth" or "auth-int", authentication aborted');
	      return false;
	    }
	  } else {
	    this.qop = null;
	  }
	
	  // Fill other attributes.
	
	  this.method = request.method;
	  this.uri = request.ruri;
	  this.cnonce = Utils.createRandomToken(12);
	  this.nc += 1;
	  this.updateNcHex();
	
	  // nc-value = 8LHEX. Max value = 'FFFFFFFF'.
	  if (this.nc === 4294967296) {
	    this.nc = 1;
	    this.ncHex = '00000001';
	  }
	
	  // Calculate the Digest "response" value.
	  this.calculateResponse();
	
	  return true;
	};
	
	
	/**
	* Generate Digest 'response' value.
	* @private
	*/
	DigestAuthentication.prototype.calculateResponse = function() {
	  var ha1, ha2;
	
	  // HA1 = MD5(A1) = MD5(username:realm:password)
	  ha1 = Utils.calculateMD5(this.username + ":" + this.realm + ":" + this.password);
	
	  if (this.qop === 'auth') {
	    // HA2 = MD5(A2) = MD5(method:digestURI)
	    ha2 = Utils.calculateMD5(this.method + ":" + this.uri);
	    // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)
	    this.response = Utils.calculateMD5(ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth:" + ha2);
	
	  } else if (this.qop === 'auth-int') {
	    // HA2 = MD5(A2) = MD5(method:digestURI:MD5(entityBody))
	    ha2 = Utils.calculateMD5(this.method + ":" + this.uri + ":" + Utils.calculateMD5(this.body ? this.body : ""));
	    // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)
	    this.response = Utils.calculateMD5(ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth-int:" + ha2);
	
	  } else if (this.qop === null) {
	    // HA2 = MD5(A2) = MD5(method:digestURI)
	    ha2 = Utils.calculateMD5(this.method + ":" + this.uri);
	    // response = MD5(HA1:nonce:HA2)
	    this.response = Utils.calculateMD5(ha1 + ":" + this.nonce + ":" + ha2);
	  }
	};
	
	
	/**
	* Return the Proxy-Authorization or WWW-Authorization header value.
	*/
	DigestAuthentication.prototype.toString = function() {
	  var auth_params = [];
	
	  if (! this.response) {
	    throw new Error('response field does not exist, cannot generate Authorization header');
	  }
	
	  auth_params.push('algorithm=' + this.algorithm);
	  auth_params.push('username="' + this.username + '"');
	  auth_params.push('realm="' + this.realm + '"');
	  auth_params.push('nonce="' + this.nonce + '"');
	  auth_params.push('uri="' + this.uri + '"');
	  auth_params.push('response="' + this.response + '"');
	  if (this.opaque) {
	    auth_params.push('opaque="' + this.opaque + '"');
	  }
	  if (this.qop) {
	    auth_params.push('qop=' + this.qop);
	    auth_params.push('cnonce="' + this.cnonce + '"');
	    auth_params.push('nc=' + this.ncHex);
	  }
	
	  return 'Digest ' + auth_params.join(', ');
	};
	
	
	/**
	* Generate the 'nc' value as required by Digest in this.ncHex by reading this.nc.
	* @private
	*/
	DigestAuthentication.prototype.updateNcHex = function() {
	  var hex = Number(this.nc).toString(16);
	  this.ncHex = '00000000'.substr(0, 8-hex.length) + hex;
	};
	
	return DigestAuthentication;
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Grammar = __webpack_require__(46);
	
	module.exports = function (SIP) {
	
	return {
	  parse: function parseCustom (input, startRule) {
	    var options = {startRule: startRule, SIP: SIP};
	    try {
	      Grammar.parse(input, options);
	    } catch (e) {
	      options.data = -1;
	    }
	    return options.data;
	  }
	};
	
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = (function() {
	  /*
	   * Generated by PEG.js 0.8.0.
	   *
	   * http://pegjs.majda.cz/
	   */
	
	  function peg$subclass(child, parent) {
	    function ctor() { this.constructor = child; }
	    ctor.prototype = parent.prototype;
	    child.prototype = new ctor();
	  }
	
	  function SyntaxError(message, expected, found, offset, line, column) {
	    this.message  = message;
	    this.expected = expected;
	    this.found    = found;
	    this.offset   = offset;
	    this.line     = line;
	    this.column   = column;
	
	    this.name     = "SyntaxError";
	  }
	
	  peg$subclass(SyntaxError, Error);
	
	  function parse(input) {
	    var options = arguments.length > 1 ? arguments[1] : {},
	
	        peg$FAILED = {},
	
	        peg$startRuleIndices = { Contact: 118, Name_Addr_Header: 155, Record_Route: 175, Request_Response: 81, SIP_URI: 45, Subscription_State: 185, Supported: 190, Require: 181, Via: 193, absoluteURI: 84, Call_ID: 117, Content_Disposition: 129, Content_Length: 134, Content_Type: 135, CSeq: 145, displayName: 121, Event: 148, From: 150, host: 52, Max_Forwards: 153, Min_SE: 212, Proxy_Authenticate: 156, quoted_string: 40, Refer_To: 177, Replaces: 178, Session_Expires: 209, stun_URI: 216, To: 191, turn_URI: 223, uuid: 226, WWW_Authenticate: 208, challenge: 157 },
	        peg$startRuleIndex   = 118,
	
	        peg$consts = [
	          "\r\n",
	          { type: "literal", value: "\r\n", description: "\"\\r\\n\"" },
	          /^[0-9]/,
	          { type: "class", value: "[0-9]", description: "[0-9]" },
	          /^[a-zA-Z]/,
	          { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
	          /^[0-9a-fA-F]/,
	          { type: "class", value: "[0-9a-fA-F]", description: "[0-9a-fA-F]" },
	          /^[\0-\xFF]/,
	          { type: "class", value: "[\\0-\\xFF]", description: "[\\0-\\xFF]" },
	          /^["]/,
	          { type: "class", value: "[\"]", description: "[\"]" },
	          " ",
	          { type: "literal", value: " ", description: "\" \"" },
	          "\t",
	          { type: "literal", value: "\t", description: "\"\\t\"" },
	          /^[a-zA-Z0-9]/,
	          { type: "class", value: "[a-zA-Z0-9]", description: "[a-zA-Z0-9]" },
	          ";",
	          { type: "literal", value: ";", description: "\";\"" },
	          "/",
	          { type: "literal", value: "/", description: "\"/\"" },
	          "?",
	          { type: "literal", value: "?", description: "\"?\"" },
	          ":",
	          { type: "literal", value: ":", description: "\":\"" },
	          "@",
	          { type: "literal", value: "@", description: "\"@\"" },
	          "&",
	          { type: "literal", value: "&", description: "\"&\"" },
	          "=",
	          { type: "literal", value: "=", description: "\"=\"" },
	          "+",
	          { type: "literal", value: "+", description: "\"+\"" },
	          "$",
	          { type: "literal", value: "$", description: "\"$\"" },
	          ",",
	          { type: "literal", value: ",", description: "\",\"" },
	          "-",
	          { type: "literal", value: "-", description: "\"-\"" },
	          "_",
	          { type: "literal", value: "_", description: "\"_\"" },
	          ".",
	          { type: "literal", value: ".", description: "\".\"" },
	          "!",
	          { type: "literal", value: "!", description: "\"!\"" },
	          "~",
	          { type: "literal", value: "~", description: "\"~\"" },
	          "*",
	          { type: "literal", value: "*", description: "\"*\"" },
	          "'",
	          { type: "literal", value: "'", description: "\"'\"" },
	          "(",
	          { type: "literal", value: "(", description: "\"(\"" },
	          ")",
	          { type: "literal", value: ")", description: "\")\"" },
	          peg$FAILED,
	          "%",
	          { type: "literal", value: "%", description: "\"%\"" },
	          null,
	          [],
	          function() {return " "; },
	          function() {return ':'; },
	          /^[!-~]/,
	          { type: "class", value: "[!-~]", description: "[!-~]" },
	          /^[\x80-\uFFFF]/,
	          { type: "class", value: "[\\x80-\\uFFFF]", description: "[\\x80-\\uFFFF]" },
	          /^[\x80-\xBF]/,
	          { type: "class", value: "[\\x80-\\xBF]", description: "[\\x80-\\xBF]" },
	          /^[a-f]/,
	          { type: "class", value: "[a-f]", description: "[a-f]" },
	          "`",
	          { type: "literal", value: "`", description: "\"`\"" },
	          "<",
	          { type: "literal", value: "<", description: "\"<\"" },
	          ">",
	          { type: "literal", value: ">", description: "\">\"" },
	          "\\",
	          { type: "literal", value: "\\", description: "\"\\\\\"" },
	          "[",
	          { type: "literal", value: "[", description: "\"[\"" },
	          "]",
	          { type: "literal", value: "]", description: "\"]\"" },
	          "{",
	          { type: "literal", value: "{", description: "\"{\"" },
	          "}",
	          { type: "literal", value: "}", description: "\"}\"" },
	          function() {return "*"; },
	          function() {return "/"; },
	          function() {return "="; },
	          function() {return "("; },
	          function() {return ")"; },
	          function() {return ">"; },
	          function() {return "<"; },
	          function() {return ","; },
	          function() {return ";"; },
	          function() {return ":"; },
	          function() {return "\""; },
	          /^[!-']/,
	          { type: "class", value: "[!-']", description: "[!-']" },
	          /^[*-[]/,
	          { type: "class", value: "[*-[]", description: "[*-[]" },
	          /^[\]-~]/,
	          { type: "class", value: "[\\]-~]", description: "[\\]-~]" },
	          function(contents) {
	                                  return contents; },
	          /^[#-[]/,
	          { type: "class", value: "[#-[]", description: "[#-[]" },
	          /^[\0-\t]/,
	          { type: "class", value: "[\\0-\\t]", description: "[\\0-\\t]" },
	          /^[\x0B-\f]/,
	          { type: "class", value: "[\\x0B-\\f]", description: "[\\x0B-\\f]" },
	          /^[\x0E-]/,
	          { type: "class", value: "[\\x0E-]", description: "[\\x0E-]" },
	          function() {
	                                  options.data.uri = new options.SIP.URI(options.data.scheme, options.data.user, options.data.host, options.data.port);
	                                  delete options.data.scheme;
	                                  delete options.data.user;
	                                  delete options.data.host;
	                                  delete options.data.host_type;
	                                  delete options.data.port;
	                                },
	          function() {
	                                  options.data.uri = new options.SIP.URI(options.data.scheme, options.data.user, options.data.host, options.data.port, options.data.uri_params, options.data.uri_headers);
	                                  delete options.data.scheme;
	                                  delete options.data.user;
	                                  delete options.data.host;
	                                  delete options.data.host_type;
	                                  delete options.data.port;
	                                  delete options.data.uri_params;
	
	                                  if (options.startRule === 'SIP_URI') { options.data = options.data.uri;}
	                                },
	          "sips",
	          { type: "literal", value: "sips", description: "\"sips\"" },
	          "sip",
	          { type: "literal", value: "sip", description: "\"sip\"" },
	          function(uri_scheme) {
	                              options.data.scheme = uri_scheme; },
	          function() {
	                              options.data.user = decodeURIComponent(text().slice(0, -1));},
	          function() {
	                              options.data.password = text(); },
	          function() {
	                              options.data.host = text();
	                              return options.data.host; },
	          function() {
	                            options.data.host_type = 'domain';
	                            return text(); },
	          /^[a-zA-Z0-9_\-]/,
	          { type: "class", value: "[a-zA-Z0-9_\\-]", description: "[a-zA-Z0-9_\\-]" },
	          /^[a-zA-Z0-9\-]/,
	          { type: "class", value: "[a-zA-Z0-9\\-]", description: "[a-zA-Z0-9\\-]" },
	          function() {
	                              options.data.host_type = 'IPv6';
	                              return text(); },
	          "::",
	          { type: "literal", value: "::", description: "\"::\"" },
	          function() {
	                            options.data.host_type = 'IPv6';
	                            return text(); },
	          function() {
	                              options.data.host_type = 'IPv4';
	                              return text(); },
	          "25",
	          { type: "literal", value: "25", description: "\"25\"" },
	          /^[0-5]/,
	          { type: "class", value: "[0-5]", description: "[0-5]" },
	          "2",
	          { type: "literal", value: "2", description: "\"2\"" },
	          /^[0-4]/,
	          { type: "class", value: "[0-4]", description: "[0-4]" },
	          "1",
	          { type: "literal", value: "1", description: "\"1\"" },
	          /^[1-9]/,
	          { type: "class", value: "[1-9]", description: "[1-9]" },
	          function(port) {
	                              port = parseInt(port.join(''));
	                              options.data.port = port;
	                              return port; },
	          "transport=",
	          { type: "literal", value: "transport=", description: "\"transport=\"" },
	          "udp",
	          { type: "literal", value: "udp", description: "\"udp\"" },
	          "tcp",
	          { type: "literal", value: "tcp", description: "\"tcp\"" },
	          "sctp",
	          { type: "literal", value: "sctp", description: "\"sctp\"" },
	          "tls",
	          { type: "literal", value: "tls", description: "\"tls\"" },
	          function(transport) {
	                                if(!options.data.uri_params) options.data.uri_params={};
	                                options.data.uri_params['transport'] = transport.toLowerCase(); },
	          "user=",
	          { type: "literal", value: "user=", description: "\"user=\"" },
	          "phone",
	          { type: "literal", value: "phone", description: "\"phone\"" },
	          "ip",
	          { type: "literal", value: "ip", description: "\"ip\"" },
	          function(user) {
	                                if(!options.data.uri_params) options.data.uri_params={};
	                                options.data.uri_params['user'] = user.toLowerCase(); },
	          "method=",
	          { type: "literal", value: "method=", description: "\"method=\"" },
	          function(method) {
	                                if(!options.data.uri_params) options.data.uri_params={};
	                                options.data.uri_params['method'] = method; },
	          "ttl=",
	          { type: "literal", value: "ttl=", description: "\"ttl=\"" },
	          function(ttl) {
	                                if(!options.data.params) options.data.params={};
	                                options.data.params['ttl'] = ttl; },
	          "maddr=",
	          { type: "literal", value: "maddr=", description: "\"maddr=\"" },
	          function(maddr) {
	                                if(!options.data.uri_params) options.data.uri_params={};
	                                options.data.uri_params['maddr'] = maddr; },
	          "lr",
	          { type: "literal", value: "lr", description: "\"lr\"" },
	          function() {
	                                if(!options.data.uri_params) options.data.uri_params={};
	                                options.data.uri_params['lr'] = undefined; },
	          function(param, value) {
	                                if(!options.data.uri_params) options.data.uri_params = {};
	                                if (value === null){
	                                  value = undefined;
	                                }
	                                else {
	                                  value = value[1];
	                                }
	                                options.data.uri_params[param.toLowerCase()] = value && value.toLowerCase();},
	          function(hname, hvalue) {
	                                hname = hname.join('').toLowerCase();
	                                hvalue = hvalue.join('');
	                                if(!options.data.uri_headers) options.data.uri_headers = {};
	                                if (!options.data.uri_headers[hname]) {
	                                  options.data.uri_headers[hname] = [hvalue];
	                                } else {
	                                  options.data.uri_headers[hname].push(hvalue);
	                                }},
	          function() {
	                                // lots of tests fail if this isn't guarded...
	                                if (options.startRule === 'Refer_To') {
	                                  options.data.uri = new options.SIP.URI(options.data.scheme, options.data.user, options.data.host, options.data.port, options.data.uri_params, options.data.uri_headers);
	                                  delete options.data.scheme;
	                                  delete options.data.user;
	                                  delete options.data.host;
	                                  delete options.data.host_type;
	                                  delete options.data.port;
	                                  delete options.data.uri_params;
	                                }
	                              },
	          "//",
	          { type: "literal", value: "//", description: "\"//\"" },
	          function() {
	                              options.data.scheme= text(); },
	          { type: "literal", value: "SIP", description: "\"SIP\"" },
	          function() {
	                              options.data.sip_version = text(); },
	          "INVITE",
	          { type: "literal", value: "INVITE", description: "\"INVITE\"" },
	          "ACK",
	          { type: "literal", value: "ACK", description: "\"ACK\"" },
	          "VXACH",
	          { type: "literal", value: "VXACH", description: "\"VXACH\"" },
	          "OPTIONS",
	          { type: "literal", value: "OPTIONS", description: "\"OPTIONS\"" },
	          "BYE",
	          { type: "literal", value: "BYE", description: "\"BYE\"" },
	          "CANCEL",
	          { type: "literal", value: "CANCEL", description: "\"CANCEL\"" },
	          "REGISTER",
	          { type: "literal", value: "REGISTER", description: "\"REGISTER\"" },
	          "SUBSCRIBE",
	          { type: "literal", value: "SUBSCRIBE", description: "\"SUBSCRIBE\"" },
	          "NOTIFY",
	          { type: "literal", value: "NOTIFY", description: "\"NOTIFY\"" },
	          "REFER",
	          { type: "literal", value: "REFER", description: "\"REFER\"" },
	          function() {
	
	                              options.data.method = text();
	                              return options.data.method; },
	          function(status_code) {
	                            options.data.status_code = parseInt(status_code.join('')); },
	          function() {
	                            options.data.reason_phrase = text(); },
	          function() {
	                        options.data = text(); },
	          function() {
	                                  var idx, length;
	                                  length = options.data.multi_header.length;
	                                  for (idx = 0; idx < length; idx++) {
	                                    if (options.data.multi_header[idx].parsed === null) {
	                                      options.data = null;
	                                      break;
	                                    }
	                                  }
	                                  if (options.data !== null) {
	                                    options.data = options.data.multi_header;
	                                  } else {
	                                    options.data = -1;
	                                  }},
	          function() {
	                                  var header;
	                                  if(!options.data.multi_header) options.data.multi_header = [];
	                                  try {
	                                    header = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                                    delete options.data.uri;
	                                    delete options.data.displayName;
	                                    delete options.data.params;
	                                  } catch(e) {
	                                    header = null;
	                                  }
	                                  options.data.multi_header.push( { 'position': peg$currPos,
	                                                            'offset': offset(),
	                                                            'parsed': header
	                                                          });},
	          function(displayName) {
	                                  displayName = text().trim();
	                                  if (displayName[0] === '\"') {
	                                    displayName = displayName.substring(1, displayName.length-1);
	                                  }
	                                  options.data.displayName = displayName; },
	          "q",
	          { type: "literal", value: "q", description: "\"q\"" },
	          function(q) {
	                                  if(!options.data.params) options.data.params = {};
	                                  options.data.params['q'] = q; },
	          "expires",
	          { type: "literal", value: "expires", description: "\"expires\"" },
	          function(expires) {
	                                  if(!options.data.params) options.data.params = {};
	                                  options.data.params['expires'] = expires; },
	          function(delta_seconds) {
	                                  return parseInt(delta_seconds.join('')); },
	          "0",
	          { type: "literal", value: "0", description: "\"0\"" },
	          function() {
	                                  return parseFloat(text()); },
	          function(param, value) {
	                                  if(!options.data.params) options.data.params = {};
	                                  if (value === null){
	                                    value = undefined;
	                                  }
	                                  else {
	                                    value = value[1];
	                                  }
	                                  options.data.params[param.toLowerCase()] = value;},
	          "render",
	          { type: "literal", value: "render", description: "\"render\"" },
	          "session",
	          { type: "literal", value: "session", description: "\"session\"" },
	          "icon",
	          { type: "literal", value: "icon", description: "\"icon\"" },
	          "alert",
	          { type: "literal", value: "alert", description: "\"alert\"" },
	          function() {
	                                      if (options.startRule === 'Content_Disposition') {
	                                        options.data.type = text().toLowerCase();
	                                      }
	                                    },
	          "handling",
	          { type: "literal", value: "handling", description: "\"handling\"" },
	          "optional",
	          { type: "literal", value: "optional", description: "\"optional\"" },
	          "required",
	          { type: "literal", value: "required", description: "\"required\"" },
	          function(length) {
	                                  options.data = parseInt(length.join('')); },
	          function() {
	                                  options.data = text(); },
	          "text",
	          { type: "literal", value: "text", description: "\"text\"" },
	          "image",
	          { type: "literal", value: "image", description: "\"image\"" },
	          "audio",
	          { type: "literal", value: "audio", description: "\"audio\"" },
	          "video",
	          { type: "literal", value: "video", description: "\"video\"" },
	          "application",
	          { type: "literal", value: "application", description: "\"application\"" },
	          "message",
	          { type: "literal", value: "message", description: "\"message\"" },
	          "multipart",
	          { type: "literal", value: "multipart", description: "\"multipart\"" },
	          "x-",
	          { type: "literal", value: "x-", description: "\"x-\"" },
	          function(cseq_value) {
	                            options.data.value=parseInt(cseq_value.join('')); },
	          function(expires) {options.data = expires; },
	          function(event_type) {
	                                 options.data.event = event_type.toLowerCase(); },
	          function() {
	                          var tag = options.data.tag;
	                            options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                            if (tag) {options.data.setParam('tag',tag)}
	                          },
	          "tag",
	          { type: "literal", value: "tag", description: "\"tag\"" },
	          function(tag) {options.data.tag = tag; },
	          function(forwards) {
	                            options.data = parseInt(forwards.join('')); },
	          function(min_expires) {options.data = min_expires; },
	          function() {
	                                  options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                                },
	          "digest",
	          { type: "literal", value: "Digest", description: "\"Digest\"" },
	          "realm",
	          { type: "literal", value: "realm", description: "\"realm\"" },
	          function(realm) { options.data.realm = realm; },
	          "domain",
	          { type: "literal", value: "domain", description: "\"domain\"" },
	          "nonce",
	          { type: "literal", value: "nonce", description: "\"nonce\"" },
	          function(nonce) { options.data.nonce=nonce; },
	          "opaque",
	          { type: "literal", value: "opaque", description: "\"opaque\"" },
	          function(opaque) { options.data.opaque=opaque; },
	          "stale",
	          { type: "literal", value: "stale", description: "\"stale\"" },
	          "true",
	          { type: "literal", value: "true", description: "\"true\"" },
	          function() { options.data.stale=true; },
	          "false",
	          { type: "literal", value: "false", description: "\"false\"" },
	          function() { options.data.stale=false; },
	          "algorithm",
	          { type: "literal", value: "algorithm", description: "\"algorithm\"" },
	          "md5",
	          { type: "literal", value: "MD5", description: "\"MD5\"" },
	          "md5-sess",
	          { type: "literal", value: "MD5-sess", description: "\"MD5-sess\"" },
	          function(algorithm) {
	                                options.data.algorithm=algorithm.toUpperCase(); },
	          "qop",
	          { type: "literal", value: "qop", description: "\"qop\"" },
	          "auth-int",
	          { type: "literal", value: "auth-int", description: "\"auth-int\"" },
	          "auth",
	          { type: "literal", value: "auth", description: "\"auth\"" },
	          function(qop_value) {
	                                  options.data.qop || (options.data.qop=[]);
	                                  options.data.qop.push(qop_value.toLowerCase()); },
	          function(rack_value) {
	                            options.data.value=parseInt(rack_value.join('')); },
	          function() {
	                            var idx, length;
	                            length = options.data.multi_header.length;
	                            for (idx = 0; idx < length; idx++) {
	                              if (options.data.multi_header[idx].parsed === null) {
	                                options.data = null;
	                                break;
	                              }
	                            }
	                            if (options.data !== null) {
	                              options.data = options.data.multi_header;
	                            } else {
	                              options.data = -1;
	                            }},
	          function() {
	                            var header;
	                            if(!options.data.multi_header) options.data.multi_header = [];
	                            try {
	                              header = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                              delete options.data.uri;
	                              delete options.data.displayName;
	                              delete options.data.params;
	                            } catch(e) {
	                              header = null;
	                            }
	                            options.data.multi_header.push( { 'position': peg$currPos,
	                                                      'offset': offset(),
	                                                      'parsed': header
	                                                    });},
	          function() {
	                        options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                      },
	          function() {
	                                if (!(options.data.replaces_from_tag && options.data.replaces_to_tag)) {
	                                  options.data = -1;
	                                }
	                              },
	          function() {
	                                options.data = {
	                                  call_id: options.data
	                                };
	                              },
	          "from-tag",
	          { type: "literal", value: "from-tag", description: "\"from-tag\"" },
	          function(from_tag) {
	                                options.data.replaces_from_tag = from_tag;
	                              },
	          "to-tag",
	          { type: "literal", value: "to-tag", description: "\"to-tag\"" },
	          function(to_tag) {
	                                options.data.replaces_to_tag = to_tag;
	                              },
	          "early-only",
	          { type: "literal", value: "early-only", description: "\"early-only\"" },
	          function() {
	                                options.data.early_only = true;
	                              },
	          function(r) {return r;},
	          function(first, rest) { return list(first, rest); },
	          function(value) {
	                          if (options.startRule === 'Require') {
	                            options.data = value || [];
	                          }
	                        },
	          function(rseq_value) {
	                            options.data.value=parseInt(rseq_value.join('')); },
	          "active",
	          { type: "literal", value: "active", description: "\"active\"" },
	          "pending",
	          { type: "literal", value: "pending", description: "\"pending\"" },
	          "terminated",
	          { type: "literal", value: "terminated", description: "\"terminated\"" },
	          function() {
	                                  options.data.state = text(); },
	          "reason",
	          { type: "literal", value: "reason", description: "\"reason\"" },
	          function(reason) {
	                                  if (typeof reason !== 'undefined') options.data.reason = reason; },
	          function(expires) {
	                                  if (typeof expires !== 'undefined') options.data.expires = expires; },
	          "retry_after",
	          { type: "literal", value: "retry_after", description: "\"retry_after\"" },
	          function(retry_after) {
	                                  if (typeof retry_after !== 'undefined') options.data.retry_after = retry_after; },
	          "deactivated",
	          { type: "literal", value: "deactivated", description: "\"deactivated\"" },
	          "probation",
	          { type: "literal", value: "probation", description: "\"probation\"" },
	          "rejected",
	          { type: "literal", value: "rejected", description: "\"rejected\"" },
	          "timeout",
	          { type: "literal", value: "timeout", description: "\"timeout\"" },
	          "giveup",
	          { type: "literal", value: "giveup", description: "\"giveup\"" },
	          "noresource",
	          { type: "literal", value: "noresource", description: "\"noresource\"" },
	          "invariant",
	          { type: "literal", value: "invariant", description: "\"invariant\"" },
	          function(value) {
	                          if (options.startRule === 'Supported') {
	                            options.data = value || [];
	                          }
	                        },
	          function() {
	                        var tag = options.data.tag;
	                          options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                          if (tag) {options.data.setParam('tag',tag)}
	                        },
	          "ttl",
	          { type: "literal", value: "ttl", description: "\"ttl\"" },
	          function(via_ttl_value) {
	                                options.data.ttl = via_ttl_value; },
	          "maddr",
	          { type: "literal", value: "maddr", description: "\"maddr\"" },
	          function(via_maddr) {
	                                options.data.maddr = via_maddr; },
	          "received",
	          { type: "literal", value: "received", description: "\"received\"" },
	          function(via_received) {
	                                options.data.received = via_received; },
	          "branch",
	          { type: "literal", value: "branch", description: "\"branch\"" },
	          function(via_branch) {
	                                options.data.branch = via_branch; },
	          "rport",
	          { type: "literal", value: "rport", description: "\"rport\"" },
	          function() {
	                                if(typeof response_port !== 'undefined')
	                                  options.data.rport = response_port.join(''); },
	          function(via_protocol) {
	                                options.data.protocol = via_protocol; },
	          { type: "literal", value: "UDP", description: "\"UDP\"" },
	          { type: "literal", value: "TCP", description: "\"TCP\"" },
	          { type: "literal", value: "TLS", description: "\"TLS\"" },
	          { type: "literal", value: "SCTP", description: "\"SCTP\"" },
	          function(via_transport) {
	                                options.data.transport = via_transport; },
	          function() {
	                                options.data.host = text(); },
	          function(via_sent_by_port) {
	                                options.data.port = parseInt(via_sent_by_port.join('')); },
	          function(ttl) {
	                                return parseInt(ttl.join('')); },
	          function(deltaSeconds) {
	                                if (options.startRule === 'Session_Expires') {
	                                  options.data.deltaSeconds = deltaSeconds;
	                                }
	                              },
	          "refresher",
	          { type: "literal", value: "refresher", description: "\"refresher\"" },
	          "uas",
	          { type: "literal", value: "uas", description: "\"uas\"" },
	          "uac",
	          { type: "literal", value: "uac", description: "\"uac\"" },
	          function(endpoint) {
	                                if (options.startRule === 'Session_Expires') {
	                                  options.data.refresher = endpoint;
	                                }
	                              },
	          function(deltaSeconds) {
	                                if (options.startRule === 'Min_SE') {
	                                  options.data = deltaSeconds;
	                                }
	                              },
	          "stuns",
	          { type: "literal", value: "stuns", description: "\"stuns\"" },
	          "stun",
	          { type: "literal", value: "stun", description: "\"stun\"" },
	          function(scheme) {
	                                options.data.scheme = scheme; },
	          function(host) {
	                                options.data.host = host; },
	          "?transport=",
	          { type: "literal", value: "?transport=", description: "\"?transport=\"" },
	          "turns",
	          { type: "literal", value: "turns", description: "\"turns\"" },
	          "turn",
	          { type: "literal", value: "turn", description: "\"turn\"" },
	          function() {
	                                options.data.transport = transport; },
	          function() {
	                            options.data = text(); }
	        ],
	
	        peg$bytecode = [
	          peg$decode(". \"\"2 3!"),
	          peg$decode("0\"\"\"1!3#"),
	          peg$decode("0$\"\"1!3%"),
	          peg$decode("0&\"\"1!3'"),
	          peg$decode("7'*# \"7("),
	          peg$decode("0(\"\"1!3)"),
	          peg$decode("0*\"\"1!3+"),
	          peg$decode(".,\"\"2,3-"),
	          peg$decode("..\"\"2.3/"),
	          peg$decode("00\"\"1!31"),
	          peg$decode(".2\"\"2233*\x89 \".4\"\"2435*} \".6\"\"2637*q \".8\"\"2839*e \".:\"\"2:3;*Y \".<\"\"2<3=*M \".>\"\"2>3?*A \".@\"\"2@3A*5 \".B\"\"2B3C*) \".D\"\"2D3E"),
	          peg$decode("7)*# \"7,"),
	          peg$decode(".F\"\"2F3G*} \".H\"\"2H3I*q \".J\"\"2J3K*e \".L\"\"2L3M*Y \".N\"\"2N3O*M \".P\"\"2P3Q*A \".R\"\"2R3S*5 \".T\"\"2T3U*) \".V\"\"2V3W"),
	          peg$decode("!!.Y\"\"2Y3Z+7$7#+-%7#+#%'#%$## X$\"# X\"# X+! (%"),
	          peg$decode("!! \\7$,#&7$\"+-$7 +#%'\"%$\"# X\"# X*# \" [+@$ \\7$+&$,#&7$\"\"\" X+'%4\"6]\" %$\"# X\"# X"),
	          peg$decode("7.*# \" ["),
	          peg$decode("! \\7'*# \"7(,)&7'*# \"7(\"+A$.8\"\"2839+1%7/+'%4#6^# %$## X$\"# X\"# X"),
	          peg$decode("!! \\72+&$,#&72\"\"\" X+o$ \\! \\7.,#&7.\"+-$72+#%'\"%$\"# X\"# X,@&! \\7.,#&7.\"+-$72+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X+! (%"),
	          peg$decode("0_\"\"1!3`*# \"73"),
	          peg$decode("0a\"\"1!3b"),
	          peg$decode("0c\"\"1!3d"),
	          peg$decode("7!*) \"0e\"\"1!3f"),
	          peg$decode("! \\7)*\x95 \".F\"\"2F3G*\x89 \".J\"\"2J3K*} \".L\"\"2L3M*q \".Y\"\"2Y3Z*e \".P\"\"2P3Q*Y \".H\"\"2H3I*M \".@\"\"2@3A*A \".g\"\"2g3h*5 \".R\"\"2R3S*) \".N\"\"2N3O+\x9E$,\x9B&7)*\x95 \".F\"\"2F3G*\x89 \".J\"\"2J3K*} \".L\"\"2L3M*q \".Y\"\"2Y3Z*e \".P\"\"2P3Q*Y \".H\"\"2H3I*M \".@\"\"2@3A*A \".g\"\"2g3h*5 \".R\"\"2R3S*) \".N\"\"2N3O\"\"\" X+! (%"),
	          peg$decode("! \\7)*\x89 \".F\"\"2F3G*} \".L\"\"2L3M*q \".Y\"\"2Y3Z*e \".P\"\"2P3Q*Y \".H\"\"2H3I*M \".@\"\"2@3A*A \".g\"\"2g3h*5 \".R\"\"2R3S*) \".N\"\"2N3O+\x92$,\x8F&7)*\x89 \".F\"\"2F3G*} \".L\"\"2L3M*q \".Y\"\"2Y3Z*e \".P\"\"2P3Q*Y \".H\"\"2H3I*M \".@\"\"2@3A*A \".g\"\"2g3h*5 \".R\"\"2R3S*) \".N\"\"2N3O\"\"\" X+! (%"),
	          peg$decode(".T\"\"2T3U*\xE3 \".V\"\"2V3W*\xD7 \".i\"\"2i3j*\xCB \".k\"\"2k3l*\xBF \".:\"\"2:3;*\xB3 \".D\"\"2D3E*\xA7 \".2\"\"2233*\x9B \".8\"\"2839*\x8F \".m\"\"2m3n*\x83 \"7&*} \".4\"\"2435*q \".o\"\"2o3p*e \".q\"\"2q3r*Y \".6\"\"2637*M \".>\"\"2>3?*A \".s\"\"2s3t*5 \".u\"\"2u3v*) \"7'*# \"7("),
	          peg$decode("! \\7)*\u012B \".F\"\"2F3G*\u011F \".J\"\"2J3K*\u0113 \".L\"\"2L3M*\u0107 \".Y\"\"2Y3Z*\xFB \".P\"\"2P3Q*\xEF \".H\"\"2H3I*\xE3 \".@\"\"2@3A*\xD7 \".g\"\"2g3h*\xCB \".R\"\"2R3S*\xBF \".N\"\"2N3O*\xB3 \".T\"\"2T3U*\xA7 \".V\"\"2V3W*\x9B \".i\"\"2i3j*\x8F \".k\"\"2k3l*\x83 \".8\"\"2839*w \".m\"\"2m3n*k \"7&*e \".4\"\"2435*Y \".o\"\"2o3p*M \".q\"\"2q3r*A \".6\"\"2637*5 \".s\"\"2s3t*) \".u\"\"2u3v+\u0134$,\u0131&7)*\u012B \".F\"\"2F3G*\u011F \".J\"\"2J3K*\u0113 \".L\"\"2L3M*\u0107 \".Y\"\"2Y3Z*\xFB \".P\"\"2P3Q*\xEF \".H\"\"2H3I*\xE3 \".@\"\"2@3A*\xD7 \".g\"\"2g3h*\xCB \".R\"\"2R3S*\xBF \".N\"\"2N3O*\xB3 \".T\"\"2T3U*\xA7 \".V\"\"2V3W*\x9B \".i\"\"2i3j*\x8F \".k\"\"2k3l*\x83 \".8\"\"2839*w \".m\"\"2m3n*k \"7&*e \".4\"\"2435*Y \".o\"\"2o3p*M \".q\"\"2q3r*A \".6\"\"2637*5 \".s\"\"2s3t*) \".u\"\"2u3v\"\"\" X+! (%"),
	          peg$decode("!7/+A$.P\"\"2P3Q+1%7/+'%4#6w# %$## X$\"# X\"# X"),
	          peg$decode("!7/+A$.4\"\"2435+1%7/+'%4#6x# %$## X$\"# X\"# X"),
	          peg$decode("!7/+A$.>\"\"2>3?+1%7/+'%4#6y# %$## X$\"# X\"# X"),
	          peg$decode("!7/+A$.T\"\"2T3U+1%7/+'%4#6z# %$## X$\"# X\"# X"),
	          peg$decode("!7/+A$.V\"\"2V3W+1%7/+'%4#6{# %$## X$\"# X\"# X"),
	          peg$decode("!.k\"\"2k3l+1$7/+'%4\"6|\" %$\"# X\"# X"),
	          peg$decode("!7/+7$.i\"\"2i3j+'%4\"6}\" %$\"# X\"# X"),
	          peg$decode("!7/+A$.D\"\"2D3E+1%7/+'%4#6~# %$## X$\"# X\"# X"),
	          peg$decode("!7/+A$.2\"\"2233+1%7/+'%4#6# %$## X$\"# X\"# X"),
	          peg$decode("!7/+A$.8\"\"2839+1%7/+'%4#6\x80# %$## X$\"# X\"# X"),
	          peg$decode("!7/+1$7&+'%4\"6\x81\" %$\"# X\"# X"),
	          peg$decode("!7&+1$7/+'%4\"6\x81\" %$\"# X\"# X"),
	          peg$decode("!7=+W$ \\7G*) \"7K*# \"7F,/&7G*) \"7K*# \"7F\"+-%7>+#%'#%$## X$\"# X\"# X"),
	          peg$decode("0\x82\"\"1!3\x83*A \"0\x84\"\"1!3\x85*5 \"0\x86\"\"1!3\x87*) \"73*# \"7."),
	          peg$decode("!!7/+U$7&+K% \\7J*# \"7K,)&7J*# \"7K\"+-%7&+#%'$%$$# X$## X$\"# X\"# X+! (%"),
	          peg$decode("!7/+`$7&+V%! \\7J*# \"7K,)&7J*# \"7K\"+! (%+2%7&+(%4$6\x88$!!%$$# X$## X$\"# X\"# X"),
	          peg$decode("7.*G \".L\"\"2L3M*; \"0\x89\"\"1!3\x8A*/ \"0\x86\"\"1!3\x87*# \"73"),
	          peg$decode("!.m\"\"2m3n+K$0\x8B\"\"1!3\x8C*5 \"0\x8D\"\"1!3\x8E*) \"0\x8F\"\"1!3\x90+#%'\"%$\"# X\"# X"),
	          peg$decode("!7N+Q$.8\"\"2839+A%7O*# \" [+1%7S+'%4$6\x91$ %$$# X$## X$\"# X\"# X"),
	          peg$decode("!7N+k$.8\"\"2839+[%7O*# \" [+K%7S+A%7_+7%7l*# \" [+'%4&6\x92& %$&# X$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("!/\x93\"\"1$3\x94*) \"/\x95\"\"1#3\x96+' 4!6\x97!! %"),
	          peg$decode("!7P+b$!.8\"\"2839+-$7R+#%'\"%$\"# X\"# X*# \" [+7%.:\"\"2:3;+'%4#6\x98# %$## X$\"# X\"# X"),
	          peg$decode(" \\7+*) \"7-*# \"7Q+2$,/&7+*) \"7-*# \"7Q\"\"\" X"),
	          peg$decode(".<\"\"2<3=*q \".>\"\"2>3?*e \".@\"\"2@3A*Y \".B\"\"2B3C*M \".D\"\"2D3E*A \".2\"\"2233*5 \".6\"\"2637*) \".4\"\"2435"),
	          peg$decode("! \\7+*_ \"7-*Y \".<\"\"2<3=*M \".>\"\"2>3?*A \".@\"\"2@3A*5 \".B\"\"2B3C*) \".D\"\"2D3E,e&7+*_ \"7-*Y \".<\"\"2<3=*M \".>\"\"2>3?*A \".@\"\"2@3A*5 \".B\"\"2B3C*) \".D\"\"2D3E\"+& 4!6\x99! %"),
	          peg$decode("!7T+N$!.8\"\"2839+-$7^+#%'\"%$\"# X\"# X*# \" [+#%'\"%$\"# X\"# X"),
	          peg$decode("!7U*) \"7\\*# \"7X+& 4!6\x9A! %"),
	          peg$decode("! \\!7V+3$.J\"\"2J3K+#%'\"%$\"# X\"# X,>&!7V+3$.J\"\"2J3K+#%'\"%$\"# X\"# X\"+G$7W+=%.J\"\"2J3K*# \" [+'%4#6\x9B# %$## X$\"# X\"# X"),
	          peg$decode(" \\0\x9C\"\"1!3\x9D+,$,)&0\x9C\"\"1!3\x9D\"\"\" X"),
	          peg$decode("!0$\"\"1!3%+A$ \\0\x9E\"\"1!3\x9F,)&0\x9E\"\"1!3\x9F\"+#%'\"%$\"# X\"# X"),
	          peg$decode("!.o\"\"2o3p+A$7Y+7%.q\"\"2q3r+'%4#6\xA0# %$## X$\"# X\"# X"),
	          peg$decode("!!7Z+\xBF$.8\"\"2839+\xAF%7Z+\xA5%.8\"\"2839+\x95%7Z+\x8B%.8\"\"2839+{%7Z+q%.8\"\"2839+a%7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%'-%$-# X$,# X$+# X$*# X$)# X$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u0838 \"!.\xA1\"\"2\xA13\xA2+\xAF$7Z+\xA5%.8\"\"2839+\x95%7Z+\x8B%.8\"\"2839+{%7Z+q%.8\"\"2839+a%7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%',%$,# X$+# X$*# X$)# X$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u0795 \"!.\xA1\"\"2\xA13\xA2+\x95$7Z+\x8B%.8\"\"2839+{%7Z+q%.8\"\"2839+a%7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%'*%$*# X$)# X$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u070C \"!.\xA1\"\"2\xA13\xA2+{$7Z+q%.8\"\"2839+a%7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%'(%$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u069D \"!.\xA1\"\"2\xA13\xA2+a$7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%'&%$&# X$%# X$$# X$## X$\"# X\"# X*\u0648 \"!.\xA1\"\"2\xA13\xA2+G$7Z+=%.8\"\"2839+-%7[+#%'$%$$# X$## X$\"# X\"# X*\u060D \"!.\xA1\"\"2\xA13\xA2+-$7[+#%'\"%$\"# X\"# X*\u05EC \"!.\xA1\"\"2\xA13\xA2+-$7Z+#%'\"%$\"# X\"# X*\u05CB \"!7Z+\xA5$.\xA1\"\"2\xA13\xA2+\x95%7Z+\x8B%.8\"\"2839+{%7Z+q%.8\"\"2839+a%7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%'+%$+# X$*# X$)# X$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u0538 \"!7Z+\xB6$!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\x8B%.\xA1\"\"2\xA13\xA2+{%7Z+q%.8\"\"2839+a%7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%'*%$*# X$)# X$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u0494 \"!7Z+\xC7$!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\x9C%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+q%.\xA1\"\"2\xA13\xA2+a%7Z+W%.8\"\"2839+G%7Z+=%.8\"\"2839+-%7[+#%')%$)# X$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u03DF \"!7Z+\xD8$!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\xAD%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\x82%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+W%.\xA1\"\"2\xA13\xA2+G%7Z+=%.8\"\"2839+-%7[+#%'(%$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u0319 \"!7Z+\xE9$!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\xBE%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\x93%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+h%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+=%.\xA1\"\"2\xA13\xA2+-%7[+#%''%$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u0242 \"!7Z+\u0114$!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\xE9%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\xBE%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\x93%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+h%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+=%.\xA1\"\"2\xA13\xA2+-%7Z+#%'(%$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X*\u0140 \"!7Z+\u0135$!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\u010A%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\xDF%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\xB4%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+\x89%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+^%!.8\"\"2839+-$7Z+#%'\"%$\"# X\"# X*# \" [+3%.\xA1\"\"2\xA13\xA2+#%'(%$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X+& 4!6\xA3! %"),
	          peg$decode("!7#+S$7#*# \" [+C%7#*# \" [+3%7#*# \" [+#%'$%$$# X$## X$\"# X\"# X"),
	          peg$decode("!7Z+=$.8\"\"2839+-%7Z+#%'#%$## X$\"# X\"# X*# \"7\\"),
	          peg$decode("!7]+u$.J\"\"2J3K+e%7]+[%.J\"\"2J3K+K%7]+A%.J\"\"2J3K+1%7]+'%4'6\xA4' %$'# X$&# X$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("!.\xA5\"\"2\xA53\xA6+3$0\xA7\"\"1!3\xA8+#%'\"%$\"# X\"# X*\xA0 \"!.\xA9\"\"2\xA93\xAA+=$0\xAB\"\"1!3\xAC+-%7!+#%'#%$## X$\"# X\"# X*o \"!.\xAD\"\"2\xAD3\xAE+7$7!+-%7!+#%'#%$## X$\"# X\"# X*D \"!0\xAF\"\"1!3\xB0+-$7!+#%'\"%$\"# X\"# X*# \"7!"),
	          peg$decode("!!7!*# \" [+c$7!*# \" [+S%7!*# \" [+C%7!*# \" [+3%7!*# \" [+#%'%%$%# X$$# X$## X$\"# X\"# X+' 4!6\xB1!! %"),
	          peg$decode(" \\!.2\"\"2233+-$7`+#%'\"%$\"# X\"# X,>&!.2\"\"2233+-$7`+#%'\"%$\"# X\"# X\""),
	          peg$decode("7a*A \"7b*; \"7c*5 \"7d*/ \"7e*) \"7f*# \"7g"),
	          peg$decode("!/\xB2\"\"1*3\xB3+b$/\xB4\"\"1#3\xB5*G \"/\xB6\"\"1#3\xB7*; \"/\xB8\"\"1$3\xB9*/ \"/\xBA\"\"1#3\xBB*# \"76+(%4\"6\xBC\"! %$\"# X\"# X"),
	          peg$decode("!/\xBD\"\"1%3\xBE+J$/\xBF\"\"1%3\xC0*/ \"/\xC1\"\"1\"3\xC2*# \"76+(%4\"6\xC3\"! %$\"# X\"# X"),
	          peg$decode("!/\xC4\"\"1'3\xC5+2$7\x8F+(%4\"6\xC6\"! %$\"# X\"# X"),
	          peg$decode("!/\xC7\"\"1$3\xC8+2$7\xEF+(%4\"6\xC9\"! %$\"# X\"# X"),
	          peg$decode("!/\xCA\"\"1&3\xCB+2$7T+(%4\"6\xCC\"! %$\"# X\"# X"),
	          peg$decode("!/\xCD\"\"1\"3\xCE+R$!.>\"\"2>3?+-$76+#%'\"%$\"# X\"# X*# \" [+'%4\"6\xCF\" %$\"# X\"# X"),
	          peg$decode("!7h+T$!.>\"\"2>3?+-$7i+#%'\"%$\"# X\"# X*# \" [+)%4\"6\xD0\"\"! %$\"# X\"# X"),
	          peg$decode("! \\7j+&$,#&7j\"\"\" X+! (%"),
	          peg$decode("! \\7j+&$,#&7j\"\"\" X+! (%"),
	          peg$decode("7k*) \"7+*# \"7-"),
	          peg$decode(".o\"\"2o3p*e \".q\"\"2q3r*Y \".4\"\"2435*M \".8\"\"2839*A \".<\"\"2<3=*5 \".@\"\"2@3A*) \".B\"\"2B3C"),
	          peg$decode("!.6\"\"2637+u$7m+k% \\!.<\"\"2<3=+-$7m+#%'\"%$\"# X\"# X,>&!.<\"\"2<3=+-$7m+#%'\"%$\"# X\"# X\"+#%'#%$## X$\"# X\"# X"),
	          peg$decode("!7n+C$.>\"\"2>3?+3%7o+)%4#6\xD1#\"\" %$## X$\"# X\"# X"),
	          peg$decode(" \\7p*) \"7+*# \"7-+2$,/&7p*) \"7+*# \"7-\"\"\" X"),
	          peg$decode(" \\7p*) \"7+*# \"7-,/&7p*) \"7+*# \"7-\""),
	          peg$decode(".o\"\"2o3p*e \".q\"\"2q3r*Y \".4\"\"2435*M \".6\"\"2637*A \".8\"\"2839*5 \".@\"\"2@3A*) \".B\"\"2B3C"),
	          peg$decode("7\x90*# \"7r"),
	          peg$decode("!7\x8F+K$7'+A%7s+7%7'+-%7\x84+#%'%%$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("7M*# \"7t"),
	          peg$decode("!7+G$.8\"\"2839+7%7u*# \"7x+'%4#6\xD2# %$## X$\"# X\"# X"),
	          peg$decode("!7v*# \"7w+N$!.6\"\"2637+-$7\x83+#%'\"%$\"# X\"# X*# \" [+#%'\"%$\"# X\"# X"),
	          peg$decode("!.\xD3\"\"2\xD33\xD4+=$7\x80+3%7w*# \" [+#%'#%$## X$\"# X\"# X"),
	          peg$decode("!.4\"\"2435+-$7{+#%'\"%$\"# X\"# X"),
	          peg$decode("!7z+5$ \\7y,#&7y\"+#%'\"%$\"# X\"# X"),
	          peg$decode("7**) \"7+*# \"7-"),
	          peg$decode("7+*\x8F \"7-*\x89 \".2\"\"2233*} \".6\"\"2637*q \".8\"\"2839*e \".:\"\"2:3;*Y \".<\"\"2<3=*M \".>\"\"2>3?*A \".@\"\"2@3A*5 \".B\"\"2B3C*) \".D\"\"2D3E"),
	          peg$decode("!7|+k$ \\!.4\"\"2435+-$7|+#%'\"%$\"# X\"# X,>&!.4\"\"2435+-$7|+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("! \\7~,#&7~\"+k$ \\!.2\"\"2233+-$7}+#%'\"%$\"# X\"# X,>&!.2\"\"2233+-$7}+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode(" \\7~,#&7~\""),
	          peg$decode("7+*w \"7-*q \".8\"\"2839*e \".:\"\"2:3;*Y \".<\"\"2<3=*M \".>\"\"2>3?*A \".@\"\"2@3A*5 \".B\"\"2B3C*) \".D\"\"2D3E"),
	          peg$decode("!7\"+\x8D$ \\7\"*G \"7!*A \".@\"\"2@3A*5 \".F\"\"2F3G*) \".J\"\"2J3K,M&7\"*G \"7!*A \".@\"\"2@3A*5 \".F\"\"2F3G*) \".J\"\"2J3K\"+'%4\"6\xD5\" %$\"# X\"# X"),
	          peg$decode("7\x81*# \"7\x82"),
	          peg$decode("!!7O+3$.:\"\"2:3;+#%'\"%$\"# X\"# X*# \" [+-$7S+#%'\"%$\"# X\"# X*# \" ["),
	          peg$decode(" \\7+*\x83 \"7-*} \".B\"\"2B3C*q \".D\"\"2D3E*e \".2\"\"2233*Y \".8\"\"2839*M \".:\"\"2:3;*A \".<\"\"2<3=*5 \".>\"\"2>3?*) \".@\"\"2@3A+\x8C$,\x89&7+*\x83 \"7-*} \".B\"\"2B3C*q \".D\"\"2D3E*e \".2\"\"2233*Y \".8\"\"2839*M \".:\"\"2:3;*A \".<\"\"2<3=*5 \".>\"\"2>3?*) \".@\"\"2@3A\"\"\" X"),
	          peg$decode(" \\7y,#&7y\""),
	          peg$decode("!/\x95\"\"1#3\xD6+y$.4\"\"2435+i% \\7!+&$,#&7!\"\"\" X+P%.J\"\"2J3K+@% \\7!+&$,#&7!\"\"\" X+'%4%6\xD7% %$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode(".\xD8\"\"2\xD83\xD9"),
	          peg$decode(".\xDA\"\"2\xDA3\xDB"),
	          peg$decode(".\xDC\"\"2\xDC3\xDD"),
	          peg$decode(".\xDE\"\"2\xDE3\xDF"),
	          peg$decode(".\xE0\"\"2\xE03\xE1"),
	          peg$decode(".\xE2\"\"2\xE23\xE3"),
	          peg$decode(".\xE4\"\"2\xE43\xE5"),
	          peg$decode(".\xE6\"\"2\xE63\xE7"),
	          peg$decode(".\xE8\"\"2\xE83\xE9"),
	          peg$decode(".\xEA\"\"2\xEA3\xEB"),
	          peg$decode("!7\x85*S \"7\x86*M \"7\x88*G \"7\x89*A \"7\x8A*; \"7\x8B*5 \"7\x8C*/ \"7\x8D*) \"7\x8E*# \"76+& 4!6\xEC! %"),
	          peg$decode("!7\x84+K$7'+A%7\x91+7%7'+-%7\x93+#%'%%$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("!7\x92+' 4!6\xED!! %"),
	          peg$decode("!7!+7$7!+-%7!+#%'#%$## X$\"# X\"# X"),
	          peg$decode("! \\7**A \"7+*; \"7-*5 \"73*/ \"74*) \"7'*# \"7(,G&7**A \"7+*; \"7-*5 \"73*/ \"74*) \"7'*# \"7(\"+& 4!6\xEE! %"),
	          peg$decode("!7\xB5+_$ \\!7A+-$7\xB5+#%'\"%$\"# X\"# X,8&!7A+-$7\xB5+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("!79+R$!.:\"\"2:3;+-$79+#%'\"%$\"# X\"# X*# \" [+'%4\"6\xEF\" %$\"# X\"# X"),
	          peg$decode("!7:*j \"!7\x97+_$ \\!7A+-$7\x97+#%'\"%$\"# X\"# X,8&!7A+-$7\x97+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X+& 4!6\xF0! %"),
	          peg$decode("!7L*# \"7\x98+c$ \\!7B+-$7\x9A+#%'\"%$\"# X\"# X,8&!7B+-$7\x9A+#%'\"%$\"# X\"# X\"+'%4\"6\xF1\" %$\"# X\"# X"),
	          peg$decode("!7\x99*# \" [+A$7@+7%7M+-%7?+#%'$%$$# X$## X$\"# X\"# X"),
	          peg$decode("!!76+_$ \\!7.+-$76+#%'\"%$\"# X\"# X,8&!7.+-$76+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X*# \"7H+' 4!6\xF2!! %"),
	          peg$decode("7\x9B*) \"7\x9C*# \"7\x9F"),
	          peg$decode("!/\xF3\"\"1!3\xF4+<$7<+2%7\x9E+(%4#6\xF5#! %$## X$\"# X\"# X"),
	          peg$decode("!/\xF6\"\"1'3\xF7+<$7<+2%7\x9D+(%4#6\xF8#! %$## X$\"# X\"# X"),
	          peg$decode("! \\7!+&$,#&7!\"\"\" X+' 4!6\xF9!! %"),
	          peg$decode("!.\xFA\"\"2\xFA3\xFB+x$!.J\"\"2J3K+S$7!*# \" [+C%7!*# \" [+3%7!*# \" [+#%'$%$$# X$## X$\"# X\"# X*# \" [+'%4\"6\xFC\" %$\"# X\"# X"),
	          peg$decode("!76+N$!7<+-$7\xA0+#%'\"%$\"# X\"# X*# \" [+)%4\"6\xFD\"\"! %$\"# X\"# X"),
	          peg$decode("76*) \"7T*# \"7H"),
	          peg$decode("!7\xA2+_$ \\!7B+-$7\xA3+#%'\"%$\"# X\"# X,8&!7B+-$7\xA3+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("!/\xFE\"\"1&3\xFF*G \"/\u0100\"\"1'3\u0101*; \"/\u0102\"\"1$3\u0103*/ \"/\u0104\"\"1%3\u0105*# \"76+& 4!6\u0106! %"),
	          peg$decode("7\xA4*# \"7\x9F"),
	          peg$decode("!/\u0107\"\"1(3\u0108+O$7<+E%/\u0109\"\"1(3\u010A*/ \"/\u010B\"\"1(3\u010C*# \"76+#%'#%$## X$\"# X\"# X"),
	          peg$decode("!76+_$ \\!7A+-$76+#%'\"%$\"# X\"# X,8&!7A+-$76+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("! \\7!+&$,#&7!\"\"\" X+' 4!6\u010D!! %"),
	          peg$decode("!7\xA8+& 4!6\u010E! %"),
	          peg$decode("!7\xA9+s$7;+i%7\xAE+_% \\!7B+-$7\xAF+#%'\"%$\"# X\"# X,8&!7B+-$7\xAF+#%'\"%$\"# X\"# X\"+#%'$%$$# X$## X$\"# X\"# X"),
	          peg$decode("7\xAA*# \"7\xAB"),
	          peg$decode("/\u010F\"\"1$3\u0110*S \"/\u0111\"\"1%3\u0112*G \"/\u0113\"\"1%3\u0114*; \"/\u0115\"\"1%3\u0116*/ \"/\u0117\"\"1+3\u0118*# \"7\xAC"),
	          peg$decode("/\u0119\"\"1'3\u011A*/ \"/\u011B\"\"1)3\u011C*# \"7\xAC"),
	          peg$decode("76*# \"7\xAD"),
	          peg$decode("!/\u011D\"\"1\"3\u011E+-$76+#%'\"%$\"# X\"# X"),
	          peg$decode("7\xAC*# \"76"),
	          peg$decode("!76+7$7<+-%7\xB0+#%'#%$## X$\"# X\"# X"),
	          peg$decode("76*# \"7H"),
	          peg$decode("!7\xB2+7$7.+-%7\x8F+#%'#%$## X$\"# X\"# X"),
	          peg$decode("! \\7!+&$,#&7!\"\"\" X+' 4!6\u011F!! %"),
	          peg$decode("!7\x9D+' 4!6\u0120!! %"),
	          peg$decode("!7\xB5+d$ \\!7B+-$7\x9F+#%'\"%$\"# X\"# X,8&!7B+-$7\x9F+#%'\"%$\"# X\"# X\"+(%4\"6\u0121\"!!%$\"# X\"# X"),
	          peg$decode("!!77+k$ \\!.J\"\"2J3K+-$77+#%'\"%$\"# X\"# X,>&!.J\"\"2J3K+-$77+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X+! (%"),
	          peg$decode("!7L*# \"7\x98+c$ \\!7B+-$7\xB7+#%'\"%$\"# X\"# X,8&!7B+-$7\xB7+#%'\"%$\"# X\"# X\"+'%4\"6\u0122\" %$\"# X\"# X"),
	          peg$decode("7\xB8*# \"7\x9F"),
	          peg$decode("!/\u0123\"\"1#3\u0124+<$7<+2%76+(%4#6\u0125#! %$## X$\"# X\"# X"),
	          peg$decode("! \\7!+&$,#&7!\"\"\" X+' 4!6\u0126!! %"),
	          peg$decode("!7\x9D+' 4!6\u0127!! %"),
	          peg$decode("! \\7\x99,#&7\x99\"+\x81$7@+w%7M+m%7?+c% \\!7B+-$7\x9F+#%'\"%$\"# X\"# X,8&!7B+-$7\x9F+#%'\"%$\"# X\"# X\"+'%4%6\u0128% %$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("7\xBD"),
	          peg$decode("!/\u0129\"\"1&3\u012A+s$7.+i%7\xC0+_% \\!7A+-$7\xC0+#%'\"%$\"# X\"# X,8&!7A+-$7\xC0+#%'\"%$\"# X\"# X\"+#%'$%$$# X$## X$\"# X\"# X*# \"7\xBE"),
	          peg$decode("!76+s$7.+i%7\xBF+_% \\!7A+-$7\xBF+#%'\"%$\"# X\"# X,8&!7A+-$7\xBF+#%'\"%$\"# X\"# X\"+#%'$%$$# X$## X$\"# X\"# X"),
	          peg$decode("!76+=$7<+3%76*# \"7H+#%'#%$## X$\"# X\"# X"),
	          peg$decode("7\xC1*G \"7\xC3*A \"7\xC5*; \"7\xC7*5 \"7\xC8*/ \"7\xC9*) \"7\xCA*# \"7\xBF"),
	          peg$decode("!/\u012B\"\"1%3\u012C+7$7<+-%7\xC2+#%'#%$## X$\"# X\"# X"),
	          peg$decode("!7I+' 4!6\u012D!! %"),
	          peg$decode("!/\u012E\"\"1&3\u012F+\xA5$7<+\x9B%7D+\x91%7\xC4+\x87% \\! \\7'+&$,#&7'\"\"\" X+-$7\xC4+#%'\"%$\"# X\"# X,G&! \\7'+&$,#&7'\"\"\" X+-$7\xC4+#%'\"%$\"# X\"# X\"+-%7E+#%'&%$&# X$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("7t*# \"7w"),
	          peg$decode("!/\u0130\"\"1%3\u0131+7$7<+-%7\xC6+#%'#%$## X$\"# X\"# X"),
	          peg$decode("!7I+' 4!6\u0132!! %"),
	          peg$decode("!/\u0133\"\"1&3\u0134+<$7<+2%7I+(%4#6\u0135#! %$## X$\"# X\"# X"),
	          peg$decode("!/\u0136\"\"1%3\u0137+_$7<+U%!/\u0138\"\"1$3\u0139+& 4!6\u013A! %*4 \"!/\u013B\"\"1%3\u013C+& 4!6\u013D! %+#%'#%$## X$\"# X\"# X"),
	          peg$decode("!/\u013E\"\"1)3\u013F+T$7<+J%/\u0140\"\"1#3\u0141*/ \"/\u0142\"\"1(3\u0143*# \"76+(%4#6\u0144#! %$## X$\"# X\"# X"),
	          peg$decode("!/\u0145\"\"1#3\u0146+\x9E$7<+\x94%7D+\x8A%!7\xCB+k$ \\!.D\"\"2D3E+-$7\xCB+#%'\"%$\"# X\"# X,>&!.D\"\"2D3E+-$7\xCB+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X+-%7E+#%'%%$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("!/\u0147\"\"1(3\u0148*/ \"/\u0149\"\"1$3\u014A*# \"76+' 4!6\u014B!! %"),
	          peg$decode("!76+_$ \\!7A+-$76+#%'\"%$\"# X\"# X,8&!7A+-$76+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("!7\xCE+K$7.+A%7\xCE+7%7.+-%7\x8F+#%'%%$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("! \\7!+&$,#&7!\"\"\" X+' 4!6\u014C!! %"),
	          peg$decode("!7\xD0+c$ \\!7A+-$7\xD0+#%'\"%$\"# X\"# X,8&!7A+-$7\xD0+#%'\"%$\"# X\"# X\"+'%4\"6\u014D\" %$\"# X\"# X"),
	          peg$decode("!7\x98+c$ \\!7B+-$7\x9F+#%'\"%$\"# X\"# X,8&!7B+-$7\x9F+#%'\"%$\"# X\"# X\"+'%4\"6\u014E\" %$\"# X\"# X"),
	          peg$decode("!7L*T \"7\x98*N \"!7@*# \" [+=$7t+3%7?*# \" [+#%'#%$## X$\"# X\"# X+c$ \\!7B+-$7\x9F+#%'\"%$\"# X\"# X,8&!7B+-$7\x9F+#%'\"%$\"# X\"# X\"+'%4\"6\u014F\" %$\"# X\"# X"),
	          peg$decode("!7\xD3+c$ \\!7B+-$7\xD4+#%'\"%$\"# X\"# X,8&!7B+-$7\xD4+#%'\"%$\"# X\"# X\"+'%4\"6\u0150\" %$\"# X\"# X"),
	          peg$decode("!7\x95+& 4!6\u0151! %"),
	          peg$decode("!/\u0152\"\"1(3\u0153+<$7<+2%76+(%4#6\u0154#! %$## X$\"# X\"# X*j \"!/\u0155\"\"1&3\u0156+<$7<+2%76+(%4#6\u0157#! %$## X$\"# X\"# X*: \"!/\u0158\"\"1*3\u0159+& 4!6\u015A! %*# \"7\x9F"),
	          peg$decode("!!76+o$ \\!7A+2$76+(%4\"6\u015B\"! %$\"# X\"# X,=&!7A+2$76+(%4\"6\u015B\"! %$\"# X\"# X\"+)%4\"6\u015C\"\"! %$\"# X\"# X*# \" [+' 4!6\u015D!! %"),
	          peg$decode("!7\xD7+_$ \\!7A+-$7\xD7+#%'\"%$\"# X\"# X,8&!7A+-$7\xD7+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("!7\x98+_$ \\!7B+-$7\x9F+#%'\"%$\"# X\"# X,8&!7B+-$7\x9F+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("! \\7!+&$,#&7!\"\"\" X+' 4!6\u015E!! %"),
	          peg$decode("!7\xDA+_$ \\!7B+-$7\xDB+#%'\"%$\"# X\"# X,8&!7B+-$7\xDB+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("!/\u015F\"\"1&3\u0160*; \"/\u0161\"\"1'3\u0162*/ \"/\u0163\"\"1*3\u0164*# \"76+& 4!6\u0165! %"),
	          peg$decode("!/\u0166\"\"1&3\u0167+<$7<+2%7\xDC+(%4#6\u0168#! %$## X$\"# X\"# X*\x83 \"!/\xF6\"\"1'3\xF7+<$7<+2%7\x9D+(%4#6\u0169#! %$## X$\"# X\"# X*S \"!/\u016A\"\"1+3\u016B+<$7<+2%7\x9D+(%4#6\u016C#! %$## X$\"# X\"# X*# \"7\x9F"),
	          peg$decode("/\u016D\"\"1+3\u016E*k \"/\u016F\"\"1)3\u0170*_ \"/\u0171\"\"1(3\u0172*S \"/\u0173\"\"1'3\u0174*G \"/\u0175\"\"1&3\u0176*; \"/\u0177\"\"1*3\u0178*/ \"/\u0179\"\"1)3\u017A*# \"76"),
	          peg$decode("71*# \" ["),
	          peg$decode("!!76+o$ \\!7A+2$76+(%4\"6\u015B\"! %$\"# X\"# X,=&!7A+2$76+(%4\"6\u015B\"! %$\"# X\"# X\"+)%4\"6\u015C\"\"! %$\"# X\"# X*# \" [+' 4!6\u017B!! %"),
	          peg$decode("!7L*# \"7\x98+c$ \\!7B+-$7\xE0+#%'\"%$\"# X\"# X,8&!7B+-$7\xE0+#%'\"%$\"# X\"# X\"+'%4\"6\u017C\" %$\"# X\"# X"),
	          peg$decode("7\xB8*# \"7\x9F"),
	          peg$decode("!7\xE2+_$ \\!7A+-$7\xE2+#%'\"%$\"# X\"# X,8&!7A+-$7\xE2+#%'\"%$\"# X\"# X\"+#%'\"%$\"# X\"# X"),
	          peg$decode("!7\xE9+s$7.+i%7\xEC+_% \\!7B+-$7\xE3+#%'\"%$\"# X\"# X,8&!7B+-$7\xE3+#%'\"%$\"# X\"# X\"+#%'$%$$# X$## X$\"# X\"# X"),
	          peg$decode("7\xE4*; \"7\xE5*5 \"7\xE6*/ \"7\xE7*) \"7\xE8*# \"7\x9F"),
	          peg$decode("!/\u017D\"\"1#3\u017E+<$7<+2%7\xEF+(%4#6\u017F#! %$## X$\"# X\"# X"),
	          peg$decode("!/\u0180\"\"1%3\u0181+<$7<+2%7T+(%4#6\u0182#! %$## X$\"# X\"# X"),
	          peg$decode("!/\u0183\"\"1(3\u0184+B$7<+8%7\\*# \"7Y+(%4#6\u0185#! %$## X$\"# X\"# X"),
	          peg$decode("!/\u0186\"\"1&3\u0187+<$7<+2%76+(%4#6\u0188#! %$## X$\"# X\"# X"),
	          peg$decode("!/\u0189\"\"1%3\u018A+T$!7<+5$ \\7!,#&7!\"+#%'\"%$\"# X\"# X*# \" [+'%4\"6\u018B\" %$\"# X\"# X"),
	          peg$decode("!7\xEA+K$7;+A%76+7%7;+-%7\xEB+#%'%%$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("!/\x95\"\"1#3\xD6*# \"76+' 4!6\u018C!! %"),
	          peg$decode("!/\xB4\"\"1#3\u018D*G \"/\xB6\"\"1#3\u018E*; \"/\xBA\"\"1#3\u018F*/ \"/\xB8\"\"1$3\u0190*# \"76+' 4!6\u0191!! %"),
	          peg$decode("!7\xED+H$!7C+-$7\xEE+#%'\"%$\"# X\"# X*# \" [+#%'\"%$\"# X\"# X"),
	          peg$decode("!7U*) \"7\\*# \"7X+& 4!6\u0192! %"),
	          peg$decode("!!7!*# \" [+c$7!*# \" [+S%7!*# \" [+C%7!*# \" [+3%7!*# \" [+#%'%%$%# X$$# X$## X$\"# X\"# X+' 4!6\u0193!! %"),
	          peg$decode("!!7!+C$7!*# \" [+3%7!*# \" [+#%'#%$## X$\"# X\"# X+' 4!6\u0194!! %"),
	          peg$decode("7\xBD"),
	          peg$decode("!7\x9D+d$ \\!7B+-$7\xF2+#%'\"%$\"# X\"# X,8&!7B+-$7\xF2+#%'\"%$\"# X\"# X\"+(%4\"6\u0195\"!!%$\"# X\"# X"),
	          peg$decode("7\xF3*# \"7\x9F"),
	          peg$decode("!.\u0196\"\"2\u01963\u0197+N$7<+D%.\u0198\"\"2\u01983\u0199*) \".\u019A\"\"2\u019A3\u019B+(%4#6\u019C#! %$## X$\"# X\"# X"),
	          peg$decode("!7\x9D+d$ \\!7B+-$7\x9F+#%'\"%$\"# X\"# X,8&!7B+-$7\x9F+#%'\"%$\"# X\"# X\"+(%4\"6\u019D\"!!%$\"# X\"# X"),
	          peg$decode("!76+7$70+-%7\xF6+#%'#%$## X$\"# X\"# X"),
	          peg$decode(" \\72*) \"74*# \"7.,/&72*) \"74*# \"7.\""),
	          peg$decode(" \\7%,#&7%\""),
	          peg$decode("!7\xF9+=$.8\"\"2839+-%7\xFA+#%'#%$## X$\"# X\"# X"),
	          peg$decode("!/\u019E\"\"1%3\u019F*) \"/\u01A0\"\"1$3\u01A1+' 4!6\u01A2!! %"),
	          peg$decode("!7\xFB+N$!.8\"\"2839+-$7^+#%'\"%$\"# X\"# X*# \" [+#%'\"%$\"# X\"# X"),
	          peg$decode("!7\\*) \"7X*# \"7\x82+' 4!6\u01A3!! %"),
	          peg$decode("! \\7\xFD*) \"7-*# \"7\xFE,/&7\xFD*) \"7-*# \"7\xFE\"+! (%"),
	          peg$decode("7\"*S \"7!*M \".F\"\"2F3G*A \".J\"\"2J3K*5 \".H\"\"2H3I*) \".N\"\"2N3O"),
	          peg$decode(".L\"\"2L3M*\x95 \".B\"\"2B3C*\x89 \".<\"\"2<3=*} \".R\"\"2R3S*q \".T\"\"2T3U*e \".V\"\"2V3W*Y \".P\"\"2P3Q*M \".@\"\"2@3A*A \".D\"\"2D3E*5 \".2\"\"2233*) \".>\"\"2>3?"),
	          peg$decode("!7\u0100+h$.8\"\"2839+X%7\xFA+N%!.\u01A4\"\"2\u01A43\u01A5+-$7\xEB+#%'\"%$\"# X\"# X*# \" [+#%'$%$$# X$## X$\"# X\"# X"),
	          peg$decode("!/\u01A6\"\"1%3\u01A7*) \"/\u01A8\"\"1$3\u01A9+' 4!6\u01A2!! %"),
	          peg$decode("!7\xEB+Q$/\xB4\"\"1#3\xB5*7 \"/\xB6\"\"1#3\xB7*+ \" \\7+,#&7+\"+'%4\"6\u01AA\" %$\"# X\"# X"),
	          peg$decode("!7\u0104+\x8F$.F\"\"2F3G+%7\u0103+u%.F\"\"2F3G+e%7\u0103+[%.F\"\"2F3G+K%7\u0103+A%.F\"\"2F3G+1%7\u0105+'%4)6\u01AB) %$)# X$(# X$'# X$&# X$%# X$$# X$## X$\"# X\"# X"),
	          peg$decode("!7#+A$7#+7%7#+-%7#+#%'$%$$# X$## X$\"# X\"# X"),
	          peg$decode("!7\u0103+-$7\u0103+#%'\"%$\"# X\"# X"),
	          peg$decode("!7\u0103+7$7\u0103+-%7\u0103+#%'#%$## X$\"# X\"# X")
	        ],
	
	        peg$currPos          = 0,
	        peg$reportedPos      = 0,
	        peg$cachedPos        = 0,
	        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
	        peg$maxFailPos       = 0,
	        peg$maxFailExpected  = [],
	        peg$silentFails      = 0,
	
	        peg$result;
	
	    if ("startRule" in options) {
	      if (!(options.startRule in peg$startRuleIndices)) {
	        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	      }
	
	      peg$startRuleIndex = peg$startRuleIndices[options.startRule];
	    }
	
	    function text() {
	      return input.substring(peg$reportedPos, peg$currPos);
	    }
	
	    function offset() {
	      return peg$reportedPos;
	    }
	
	    function line() {
	      return peg$computePosDetails(peg$reportedPos).line;
	    }
	
	    function column() {
	      return peg$computePosDetails(peg$reportedPos).column;
	    }
	
	    function expected(description) {
	      throw peg$buildException(
	        null,
	        [{ type: "other", description: description }],
	        peg$reportedPos
	      );
	    }
	
	    function error(message) {
	      throw peg$buildException(message, null, peg$reportedPos);
	    }
	
	    function peg$computePosDetails(pos) {
	      function advance(details, startPos, endPos) {
	        var p, ch;
	
	        for (p = startPos; p < endPos; p++) {
	          ch = input.charAt(p);
	          if (ch === "\n") {
	            if (!details.seenCR) { details.line++; }
	            details.column = 1;
	            details.seenCR = false;
	          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	            details.line++;
	            details.column = 1;
	            details.seenCR = true;
	          } else {
	            details.column++;
	            details.seenCR = false;
	          }
	        }
	      }
	
	      if (peg$cachedPos !== pos) {
	        if (peg$cachedPos > pos) {
	          peg$cachedPos = 0;
	          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
	        }
	        advance(peg$cachedPosDetails, peg$cachedPos, pos);
	        peg$cachedPos = pos;
	      }
	
	      return peg$cachedPosDetails;
	    }
	
	    function peg$fail(expected) {
	      if (peg$currPos < peg$maxFailPos) { return; }
	
	      if (peg$currPos > peg$maxFailPos) {
	        peg$maxFailPos = peg$currPos;
	        peg$maxFailExpected = [];
	      }
	
	      peg$maxFailExpected.push(expected);
	    }
	
	    function peg$buildException(message, expected, pos) {
	      function cleanupExpected(expected) {
	        var i = 1;
	
	        expected.sort(function(a, b) {
	          if (a.description < b.description) {
	            return -1;
	          } else if (a.description > b.description) {
	            return 1;
	          } else {
	            return 0;
	          }
	        });
	
	        while (i < expected.length) {
	          if (expected[i - 1] === expected[i]) {
	            expected.splice(i, 1);
	          } else {
	            i++;
	          }
	        }
	      }
	
	      function buildMessage(expected, found) {
	        function stringEscape(s) {
	          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }
	
	          return s
	            .replace(/\\/g,   '\\\\')
	            .replace(/"/g,    '\\"')
	            .replace(/\x08/g, '\\b')
	            .replace(/\t/g,   '\\t')
	            .replace(/\n/g,   '\\n')
	            .replace(/\f/g,   '\\f')
	            .replace(/\r/g,   '\\r')
	            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
	            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
	            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
	            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
	        }
	
	        var expectedDescs = new Array(expected.length),
	            expectedDesc, foundDesc, i;
	
	        for (i = 0; i < expected.length; i++) {
	          expectedDescs[i] = expected[i].description;
	        }
	
	        expectedDesc = expected.length > 1
	          ? expectedDescs.slice(0, -1).join(", ")
	              + " or "
	              + expectedDescs[expected.length - 1]
	          : expectedDescs[0];
	
	        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
	
	        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	      }
	
	      var posDetails = peg$computePosDetails(pos),
	          found      = pos < input.length ? input.charAt(pos) : null;
	
	      if (expected !== null) {
	        cleanupExpected(expected);
	      }
	
	      return new SyntaxError(
	        message !== null ? message : buildMessage(expected, found),
	        expected,
	        found,
	        pos,
	        posDetails.line,
	        posDetails.column
	      );
	    }
	
	    function peg$decode(s) {
	      var bc = new Array(s.length), i;
	
	      for (i = 0; i < s.length; i++) {
	        bc[i] = s.charCodeAt(i) - 32;
	      }
	
	      return bc;
	    }
	
	    function peg$parseRule(index) {
	      var bc    = peg$bytecode[index],
	          ip    = 0,
	          ips   = [],
	          end   = bc.length,
	          ends  = [],
	          stack = [],
	          params, i;
	
	      function protect(object) {
	        return Object.prototype.toString.apply(object) === "[object Array]" ? [] : object;
	      }
	
	      while (true) {
	        while (ip < end) {
	          switch (bc[ip]) {
	            case 0:
	              stack.push(protect(peg$consts[bc[ip + 1]]));
	              ip += 2;
	              break;
	
	            case 1:
	              stack.push(peg$currPos);
	              ip++;
	              break;
	
	            case 2:
	              stack.pop();
	              ip++;
	              break;
	
	            case 3:
	              peg$currPos = stack.pop();
	              ip++;
	              break;
	
	            case 4:
	              stack.length -= bc[ip + 1];
	              ip += 2;
	              break;
	
	            case 5:
	              stack.splice(-2, 1);
	              ip++;
	              break;
	
	            case 6:
	              stack[stack.length - 2].push(stack.pop());
	              ip++;
	              break;
	
	            case 7:
	              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
	              ip += 2;
	              break;
	
	            case 8:
	              stack.pop();
	              stack.push(input.substring(stack[stack.length - 1], peg$currPos));
	              ip++;
	              break;
	
	            case 9:
	              ends.push(end);
	              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	
	              if (stack[stack.length - 1]) {
	                end = ip + 3 + bc[ip + 1];
	                ip += 3;
	              } else {
	                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                ip += 3 + bc[ip + 1];
	              }
	
	              break;
	
	            case 10:
	              ends.push(end);
	              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	
	              if (stack[stack.length - 1] === peg$FAILED) {
	                end = ip + 3 + bc[ip + 1];
	                ip += 3;
	              } else {
	                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                ip += 3 + bc[ip + 1];
	              }
	
	              break;
	
	            case 11:
	              ends.push(end);
	              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	
	              if (stack[stack.length - 1] !== peg$FAILED) {
	                end = ip + 3 + bc[ip + 1];
	                ip += 3;
	              } else {
	                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                ip += 3 + bc[ip + 1];
	              }
	
	              break;
	
	            case 12:
	              if (stack[stack.length - 1] !== peg$FAILED) {
	                ends.push(end);
	                ips.push(ip);
	
	                end = ip + 2 + bc[ip + 1];
	                ip += 2;
	              } else {
	                ip += 2 + bc[ip + 1];
	              }
	
	              break;
	
	            case 13:
	              ends.push(end);
	              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
	
	              if (input.length > peg$currPos) {
	                end = ip + 3 + bc[ip + 1];
	                ip += 3;
	              } else {
	                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	                ip += 3 + bc[ip + 1];
	              }
	
	              break;
	
	            case 14:
	              ends.push(end);
	              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
	
	              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
	                end = ip + 4 + bc[ip + 2];
	                ip += 4;
	              } else {
	                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	                ip += 4 + bc[ip + 2];
	              }
	
	              break;
	
	            case 15:
	              ends.push(end);
	              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
	
	              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
	                end = ip + 4 + bc[ip + 2];
	                ip += 4;
	              } else {
	                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	                ip += 4 + bc[ip + 2];
	              }
	
	              break;
	
	            case 16:
	              ends.push(end);
	              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
	
	              if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
	                end = ip + 4 + bc[ip + 2];
	                ip += 4;
	              } else {
	                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	                ip += 4 + bc[ip + 2];
	              }
	
	              break;
	
	            case 17:
	              stack.push(input.substr(peg$currPos, bc[ip + 1]));
	              peg$currPos += bc[ip + 1];
	              ip += 2;
	              break;
	
	            case 18:
	              stack.push(peg$consts[bc[ip + 1]]);
	              peg$currPos += peg$consts[bc[ip + 1]].length;
	              ip += 2;
	              break;
	
	            case 19:
	              stack.push(peg$FAILED);
	              if (peg$silentFails === 0) {
	                peg$fail(peg$consts[bc[ip + 1]]);
	              }
	              ip += 2;
	              break;
	
	            case 20:
	              peg$reportedPos = stack[stack.length - 1 - bc[ip + 1]];
	              ip += 2;
	              break;
	
	            case 21:
	              peg$reportedPos = peg$currPos;
	              ip++;
	              break;
	
	            case 22:
	              params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
	              for (i = 0; i < bc[ip + 3]; i++) {
	                params[i] = stack[stack.length - 1 - params[i]];
	              }
	
	              stack.splice(
	                stack.length - bc[ip + 2],
	                bc[ip + 2],
	                peg$consts[bc[ip + 1]].apply(null, params)
	              );
	
	              ip += 4 + bc[ip + 3];
	              break;
	
	            case 23:
	              stack.push(peg$parseRule(bc[ip + 1]));
	              ip += 2;
	              break;
	
	            case 24:
	              peg$silentFails++;
	              ip++;
	              break;
	
	            case 25:
	              peg$silentFails--;
	              ip++;
	              break;
	
	            default:
	              throw new Error("Invalid opcode: " + bc[ip] + ".");
	          }
	        }
	
	        if (ends.length > 0) {
	          end = ends.pop();
	          ip = ips.pop();
	        } else {
	          break;
	        }
	      }
	
	      return stack[0];
	    }
	
	
	      options.data = {}; // Object to which header attributes will be assigned during parsing
	
	      function list (first, rest) {
	        return [first].concat(rest);
	      }
	
	
	    peg$result = peg$parseRule(peg$startRuleIndex);
	
	    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	      return peg$result;
	    } else {
	      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	        peg$fail({ type: "end", description: "end of input" });
	      }
	
	      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
	    }
	  }
	
	  return {
	    SyntaxError: SyntaxError,
	    parse:       parse
	  };
	})();


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var toplevel = global.window || global;
	
	function getPrefixedProperty (object, name) {
	  if (object == null) {
	    return;
	  }
	  var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	  var prefixedNames = [name, 'webkit' + capitalizedName, 'moz' + capitalizedName];
	  for (var i in prefixedNames) {
	    var property = object[prefixedNames[i]];
	    if (property) {
	      return property.bind(object);
	    }
	  }
	}
	
	module.exports = {
	  WebSocket: toplevel.WebSocket,
	  Transport: __webpack_require__(48),
	  open: toplevel.open,
	  Promise: toplevel.Promise,
	  timers: toplevel,
	
	  // Console is not defined in ECMAScript, so just in case...
	  console: toplevel.console || {
	    debug: function () {},
	    log: function () {},
	    warn: function () {},
	    error: function () {}
	  },
	
	  MediaStream: getPrefixedProperty(toplevel, 'MediaStream'),
	  getUserMedia: getPrefixedProperty(toplevel.navigator, 'getUserMedia'),
	  RTCPeerConnection: getPrefixedProperty(toplevel, 'RTCPeerConnection'),
	  RTCSessionDescription: getPrefixedProperty(toplevel, 'RTCSessionDescription'),
	
	  addEventListener: getPrefixedProperty(toplevel, 'addEventListener'),
	  HTMLMediaElement: toplevel.HTMLMediaElement,
	
	  attachMediaStream: toplevel.attachMediaStream,
	  createObjectURL: toplevel.URL && toplevel.URL.createObjectURL,
	  revokeObjectURL: toplevel.URL && toplevel.URL.revokeObjectURL
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @fileoverview Transport
	 */
	
	/**
	 * @augments SIP
	 * @class Transport
	 * @param {SIP.UA} ua
	 * @param {Object} server ws_server Object
	 */
	module.exports = function (SIP, WebSocket) {
	var Transport,
	  C = {
	    // Transport status codes
	    STATUS_READY:        0,
	    STATUS_DISCONNECTED: 1,
	    STATUS_ERROR:        2
	  };
	
	/**
	 * Compute an amount of time in seconds to wait before sending another
	 * keep-alive.
	 * @returns {Number}
	 */
	function computeKeepAliveTimeout(upperBound) {
	  var lowerBound = upperBound * 0.8;
	  return 1000 * (Math.random() * (upperBound - lowerBound) + lowerBound);
	}
	
	Transport = function(ua, server) {
	
	  this.logger = ua.getLogger('sip.transport');
	  this.ua = ua;
	  this.ws = null;
	  this.server = server;
	  this.reconnection_attempts = 0;
	  this.closed = false;
	  this.connected = false;
	  this.reconnectTimer = null;
	  this.lastTransportError = {};
	
	  this.keepAliveInterval = ua.configuration.keepAliveInterval;
	  this.keepAliveTimeout = null;
	  this.keepAliveTimer = null;
	
	  this.ua.transport = this;
	
	  // Connect
	  this.connect();
	};
	
	Transport.prototype = {
	  /**
	   * Send a message.
	   * @param {SIP.OutgoingRequest|String} msg
	   * @returns {Boolean}
	   */
	  send: function(msg) {
	    var message = msg.toString();
	
	    if(this.ws && this.ws.readyState === WebSocket.OPEN) {
	      if (this.ua.configuration.traceSip === true) {
	        this.logger.log('sending WebSocket message:\n\n' + message + '\n');
	      }
	      this.ws.send(message);
	      return true;
	    } else {
	      this.logger.warn('unable to send message, WebSocket is not open');
	      return false;
	    }
	  },
	
	  /**
	   * Send a keep-alive (a double-CRLF sequence).
	   * @private
	   * @returns {Boolean}
	   */
	  sendKeepAlive: function() {
	    if(this.keepAliveTimeout) { return; }
	
	    this.keepAliveTimeout = SIP.Timers.setTimeout(function() {
	      this.ua.emit('keepAliveTimeout');
	    }.bind(this), 10000);
	
	    return this.send('\r\n\r\n');
	  },
	
	  /**
	   * Start sending keep-alives.
	   * @private
	   */
	  startSendingKeepAlives: function() {
	    if (this.keepAliveInterval && !this.keepAliveTimer) {
	      this.keepAliveTimer = SIP.Timers.setTimeout(function() {
	        this.sendKeepAlive();
	        this.keepAliveTimer = null;
	        this.startSendingKeepAlives();
	      }.bind(this), computeKeepAliveTimeout(this.keepAliveInterval));
	    }
	  },
	
	  /**
	   * Stop sending keep-alives.
	   * @private
	   */
	  stopSendingKeepAlives: function() {
	    SIP.Timers.clearTimeout(this.keepAliveTimer);
	    SIP.Timers.clearTimeout(this.keepAliveTimeout);
	    this.keepAliveTimer = null;
	    this.keepAliveTimeout = null;
	  },
	
	  /**
	  * Disconnect socket.
	  */
	  disconnect: function() {
	    if(this.ws) {
	      // Clear reconnectTimer
	      SIP.Timers.clearTimeout(this.reconnectTimer);
	
	      this.stopSendingKeepAlives();
	
	      this.closed = true;
	      this.logger.log('closing WebSocket ' + this.server.ws_uri);
	      this.ws.close();
	    }
	
	    if (this.reconnectTimer !== null) {
	      SIP.Timers.clearTimeout(this.reconnectTimer);
	      this.reconnectTimer = null;
	      this.ua.emit('disconnected', {
	        transport: this,
	        code: this.lastTransportError.code,
	        reason: this.lastTransportError.reason
	      });
	    }
	  },
	
	  /**
	  * Connect socket.
	  */
	  connect: function() {
	    var transport = this;
	
	    if(this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
	      this.logger.log('WebSocket ' + this.server.ws_uri + ' is already connected');
	      return false;
	    }
	
	    if(this.ws) {
	      this.ws.close();
	    }
	
	    this.logger.log('connecting to WebSocket ' + this.server.ws_uri);
	    this.ua.onTransportConnecting(this,
	      (this.reconnection_attempts === 0)?1:this.reconnection_attempts);
	
	    try {
	      this.ws = new WebSocket(this.server.ws_uri, 'sip');
	    } catch(e) {
	      this.logger.warn('error connecting to WebSocket ' + this.server.ws_uri + ': ' + e);
	    }
	
	    this.ws.binaryType = 'arraybuffer';
	
	    this.ws.onopen = function() {
	      transport.onOpen();
	    };
	
	    this.ws.onclose = function(e) {
	      transport.onClose(e);
	    };
	
	    this.ws.onmessage = function(e) {
	      transport.onMessage(e);
	    };
	
	    this.ws.onerror = function(e) {
	      transport.onError(e);
	    };
	  },
	
	  // Transport Event Handlers
	
	  /**
	  * @event
	  * @param {event} e
	  */
	  onOpen: function() {
	    this.connected = true;
	
	    this.logger.log('WebSocket ' + this.server.ws_uri + ' connected');
	    // Clear reconnectTimer since we are not disconnected
	    if (this.reconnectTimer !== null) {
	      SIP.Timers.clearTimeout(this.reconnectTimer);
	      this.reconnectTimer = null;
	    }
	    // Reset reconnection_attempts
	    this.reconnection_attempts = 0;
	    // Disable closed
	    this.closed = false;
	    // Trigger onTransportConnected callback
	    this.ua.onTransportConnected(this);
	    // Start sending keep-alives
	    this.startSendingKeepAlives();
	  },
	
	  /**
	  * @event
	  * @param {event} e
	  */
	  onClose: function(e) {
	    var connected_before = this.connected;
	
	    this.lastTransportError.code = e.code;
	    this.lastTransportError.reason = e.reason;
	
	    this.stopSendingKeepAlives();
	
	    if (this.reconnection_attempts > 0) {
	      this.logger.log('Reconnection attempt ' + this.reconnection_attempts + ' failed (code: ' + e.code + (e.reason? '| reason: ' + e.reason : '') +')');
	      this.reconnect();
	    } else {
	      this.connected = false;
	      this.logger.log('WebSocket disconnected (code: ' + e.code + (e.reason? '| reason: ' + e.reason : '') +')');
	
	      if(e.wasClean === false) {
	        this.logger.warn('WebSocket abrupt disconnection');
	      }
	      // Transport was connected
	      if(connected_before === true) {
	        this.ua.onTransportClosed(this);
	        // Check whether the user requested to close.
	        if(!this.closed) {
	          this.reconnect();
	        } else {
	          this.ua.emit('disconnected', {
	            transport: this,
	            code: this.lastTransportError.code,
	            reason: this.lastTransportError.reason
	          });
	
	        }
	      } else {
	        // This is the first connection attempt
	        //Network error
	        this.ua.onTransportError(this);
	      }
	    }
	  },
	
	  /**
	  * @event
	  * @param {event} e
	  */
	  onMessage: function(e) {
	    var message, transaction,
	      data = e.data;
	
	    // CRLF Keep Alive response from server. Ignore it.
	    if(data === '\r\n') {
	      SIP.Timers.clearTimeout(this.keepAliveTimeout);
	      this.keepAliveTimeout = null;
	
	      if (this.ua.configuration.traceSip === true) {
	        this.logger.log('received WebSocket message with CRLF Keep Alive response');
	      }
	
	      return;
	    }
	
	    // WebSocket binary message.
	    else if (typeof data !== 'string') {
	      try {
	        data = String.fromCharCode.apply(null, new Uint8Array(data));
	      } catch(evt) {
	        this.logger.warn('received WebSocket binary message failed to be converted into string, message discarded');
	        return;
	      }
	
	      if (this.ua.configuration.traceSip === true) {
	        this.logger.log('received WebSocket binary message:\n\n' + data + '\n');
	      }
	    }
	
	    // WebSocket text message.
	    else {
	      if (this.ua.configuration.traceSip === true) {
	        this.logger.log('received WebSocket text message:\n\n' + data + '\n');
	      }
	    }
	
	    message = SIP.Parser.parseMessage(data, this.ua);
	
	    if (!message) {
	      return;
	    }
	
	    if(this.ua.status === SIP.UA.C.STATUS_USER_CLOSED && message instanceof SIP.IncomingRequest) {
	      return;
	    }
	
	    // Do some sanity check
	    if(SIP.sanityCheck(message, this.ua, this)) {
	      if(message instanceof SIP.IncomingRequest) {
	        message.transport = this;
	        this.ua.receiveRequest(message);
	      } else if(message instanceof SIP.IncomingResponse) {
	        /* Unike stated in 18.1.2, if a response does not match
	        * any transaction, it is discarded here and no passed to the core
	        * in order to be discarded there.
	        */
	        switch(message.method) {
	          case SIP.C.INVITE:
	            transaction = this.ua.transactions.ict[message.via_branch];
	            if(transaction) {
	              transaction.receiveResponse(message);
	            }
	            break;
	          case SIP.C.ACK:
	            // Just in case ;-)
	            break;
	          default:
	            transaction = this.ua.transactions.nict[message.via_branch];
	            if(transaction) {
	              transaction.receiveResponse(message);
	            }
	            break;
	        }
	      }
	    }
	  },
	
	  /**
	  * @event
	  * @param {event} e
	  */
	  onError: function(e) {
	    this.logger.warn('WebSocket connection error: ' + JSON.stringify(e));
	  },
	
	  /**
	  * Reconnection attempt logic.
	  * @private
	  */
	  reconnect: function() {
	    var transport = this;
	
	    this.reconnection_attempts += 1;
	
	    if(this.reconnection_attempts > this.ua.configuration.wsServerMaxReconnection) {
	      this.logger.warn('maximum reconnection attempts for WebSocket ' + this.server.ws_uri);
	      this.ua.onTransportError(this);
	    } else if (this.reconnection_attempts === 1) {
	      this.logger.log('Connection to WebSocket ' + this.server.ws_uri + ' severed, attempting first reconnect');
	      transport.connect();
	    } else {
	      this.logger.log('trying to reconnect to WebSocket ' + this.server.ws_uri + ' (reconnection attempt ' + this.reconnection_attempts + ')');
	
	      this.reconnectTimer = SIP.Timers.setTimeout(function() {
	        transport.connect();
	        transport.reconnectTimer = null;
	      }, this.ua.configuration.wsServerReconnectionTimeout * 1000);
	    }
	  }
	};
	
	Transport.C = C;
	return Transport;
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var LoginService = function (sdk) {
	    var onLoginHandler = [];
	    return {
	        login: function login(username, extension, password) {
	            return _rcSdk.RC.sdk.platform().login({
	                'username': username,
	                'extension': extension,
	                'password': password
	            });
	        },
	        logout: function logout() {
	            return _rcSdk.RC.sdk.platform().logout();
	        },
	        checkLoginStatus: function checkLoginStatus() {
	            return _rcSdk.RC.sdk.platform().loggedIn().then(function (isLoggedIn) {
	                if (isLoggedIn) {
	                    onLoginHandler.forEach(function (handler) {
	                        return handler();
	                    });
	                }
	                return isLoggedIn;
	            });
	        },
	        oauth: function oauth() {
	            return parent.Ringcentral.widgets.oauth(_rcSdk.RC.sdk).then(function (qs) {
	                return _rcSdk.RC.sdk.platform().login(qs);
	            });
	        }
	    };
	}();
	exports.default = LoginService;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var _rcSubscriptionService = __webpack_require__(51);
	
	var _rcSubscriptionService2 = _interopRequireDefault(_rcSubscriptionService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CallLogService = function (sdk) {
	    var period = 7 * 24 * 3600 * 1000;
	    var dateFrom = new Date(Date.now() - period);
	    return {
	        getCallLogs: function getCallLogs() {
	            return _rcSdk.RC.sdk.platform().get('/account/~/extension/~/call-log', { dateFrom: dateFrom.toISOString() }).then(function (response) {
	                return response.json().records;
	            });
	        },
	        getCallLogsByNumber: function getCallLogsByNumber(phoneNumber, hourFrom, hourTo) {
	            return _rcSdk.RC.sdk.platform().get('/account/~/extension/~/call-log', {
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
	}();
	
	exports.default = CallLogService;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var rcSubscription = function () {
	    var _init = false;
	    var cacheKey = 'ringcentral-subscription';
	    var subscription;
	    var handlers = {};
	    function init() {
	        _init = true;
	        subscription = _rcSdk.RC.sdk.createCachedSubscription(cacheKey).restore();
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
	    }
	
	    return {
	        subscribe: function subscribe(suffix, event, handler) {
	            if (!_init) init();
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
	
	exports.default = rcSubscription;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var accountService = function (RC) {
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
	            return RC.sdk.platform().get('/account/~/extension/~').then(function (response) {
	                info = response.json();
	                return info;
	            }).catch(function (e) {
	                return console.error('Recent Calls Error: ' + e.message);
	            });
	        },
	
	        getPhoneNumber: function getPhoneNumber() {
	            fetchNumbers = RC.sdk.platform().get('/account/~/extension/~/phone-number').then(function (response) {
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
	                return getNumbersByFeatures(getNumbersByType(numbers, type), features).sort(function (number1, number2) {
	                    if (number2.usageType === 'DirectNumber') return 1;
	                    return -1;
	                }).map(function (number) {
	                    return number.phoneNumber;
	                });
	            }
	        }
	    };
	}(_rcSdk.RC);
	
	exports.default = accountService;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var _lzString = __webpack_require__(54);
	
	var _lzString2 = _interopRequireDefault(_lzString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rcContactService = function () {
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
	        return _rcSdk.RC.sdk.platform().get('/account/~/extension/', { perPage: 250, page: page });
	    }
	
	    function fetchCompanyDirectNumbersByPage(page) {
	        return _rcSdk.RC.sdk.platform().get('/account/~/phone-number', { perPage: 250, page: page });
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
	        accessToken: function accessToken() {
	            return _rcSdk.RC.sdk.platform().auth().accessToken();
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
	            return function () {
	                if (contact) {
	                    contact.then(function (value) {
	                        completeCompanyContacts = companyContacts = value;
	                    });
	                    return contact;
	                }
	                // For test
	                if (window.location.href.indexOf('127.0.0.1') === -1) {
	                    var fetch = new Promise(function (resolve, reject) {
	                        // Hack for delay the refreshing request
	                        setTimeout(function () {
	                            rcContactService.completeCompanyContact().then(function (data) {
	                                if (data) localStorage.setItem('rc-contacts', _lzString2.default.compressToUTF16(JSON.stringify(data)));
	                                return resolve(data);
	                            });
	                        }, 100);
	                    });
	                } else {
	                    var fetch;
	                }
	
	                contact = data ? Promise.resolve(JSON.parse(_lzString2.default.decompressFromUTF16(data))) : fetch;
	                return contact;
	            };
	        }()
	    };
	}();
	
	exports.default = rcContactService;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
	// This work is free. You can redistribute it and/or modify it
	// under the terms of the WTFPL, Version 2
	// For more information see LICENSE.txt or http://www.wtfpl.net/
	//
	// For more information, the home page:
	// http://pieroxy.net/blog/pages/lz-string/testing.html
	//
	// LZ-based compression algorithm, version 1.4.4
	var LZString = (function() {
	
	// private property
	var f = String.fromCharCode;
	var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
	var baseReverseDic = {};
	
	function getBaseValue(alphabet, character) {
	  if (!baseReverseDic[alphabet]) {
	    baseReverseDic[alphabet] = {};
	    for (var i=0 ; i<alphabet.length ; i++) {
	      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
	    }
	  }
	  return baseReverseDic[alphabet][character];
	}
	
	var LZString = {
	  compressToBase64 : function (input) {
	    if (input == null) return "";
	    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
	    switch (res.length % 4) { // To produce valid Base64
	    default: // When could this happen ?
	    case 0 : return res;
	    case 1 : return res+"===";
	    case 2 : return res+"==";
	    case 3 : return res+"=";
	    }
	  },
	
	  decompressFromBase64 : function (input) {
	    if (input == null) return "";
	    if (input == "") return null;
	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
	  },
	
	  compressToUTF16 : function (input) {
	    if (input == null) return "";
	    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
	  },
	
	  decompressFromUTF16: function (compressed) {
	    if (compressed == null) return "";
	    if (compressed == "") return null;
	    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
	  },
	
	  //compress into uint8array (UCS-2 big endian format)
	  compressToUint8Array: function (uncompressed) {
	    var compressed = LZString.compress(uncompressed);
	    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character
	
	    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
	      var current_value = compressed.charCodeAt(i);
	      buf[i*2] = current_value >>> 8;
	      buf[i*2+1] = current_value % 256;
	    }
	    return buf;
	  },
	
	  //decompress from uint8array (UCS-2 big endian format)
	  decompressFromUint8Array:function (compressed) {
	    if (compressed===null || compressed===undefined){
	        return LZString.decompress(compressed);
	    } else {
	        var buf=new Array(compressed.length/2); // 2 bytes per character
	        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
	          buf[i]=compressed[i*2]*256+compressed[i*2+1];
	        }
	
	        var result = [];
	        buf.forEach(function (c) {
	          result.push(f(c));
	        });
	        return LZString.decompress(result.join(''));
	
	    }
	
	  },
	
	
	  //compress into a string that is already URI encoded
	  compressToEncodedURIComponent: function (input) {
	    if (input == null) return "";
	    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
	  },
	
	  //decompress from an output of compressToEncodedURIComponent
	  decompressFromEncodedURIComponent:function (input) {
	    if (input == null) return "";
	    if (input == "") return null;
	    input = input.replace(/ /g, "+");
	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
	  },
	
	  compress: function (uncompressed) {
	    return LZString._compress(uncompressed, 16, function(a){return f(a);});
	  },
	  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
	    if (uncompressed == null) return "";
	    var i, value,
	        context_dictionary= {},
	        context_dictionaryToCreate= {},
	        context_c="",
	        context_wc="",
	        context_w="",
	        context_enlargeIn= 2, // Compensate for the first entry which should not count
	        context_dictSize= 3,
	        context_numBits= 2,
	        context_data=[],
	        context_data_val=0,
	        context_data_position=0,
	        ii;
	
	    for (ii = 0; ii < uncompressed.length; ii += 1) {
	      context_c = uncompressed.charAt(ii);
	      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
	        context_dictionary[context_c] = context_dictSize++;
	        context_dictionaryToCreate[context_c] = true;
	      }
	
	      context_wc = context_w + context_c;
	      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
	        context_w = context_wc;
	      } else {
	        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	          if (context_w.charCodeAt(0)<256) {
	            for (i=0 ; i<context_numBits ; i++) {
	              context_data_val = (context_data_val << 1);
	              if (context_data_position == bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	            }
	            value = context_w.charCodeAt(0);
	            for (i=0 ; i<8 ; i++) {
	              context_data_val = (context_data_val << 1) | (value&1);
	              if (context_data_position == bitsPerChar-1) {
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
	            for (i=0 ; i<context_numBits ; i++) {
	              context_data_val = (context_data_val << 1) | value;
	              if (context_data_position ==bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	              value = 0;
	            }
	            value = context_w.charCodeAt(0);
	            for (i=0 ; i<16 ; i++) {
	              context_data_val = (context_data_val << 1) | (value&1);
	              if (context_data_position == bitsPerChar-1) {
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
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
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
	      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	        if (context_w.charCodeAt(0)<256) {
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	          }
	          value = context_w.charCodeAt(0);
	          for (i=0 ; i<8 ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
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
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1) | value;
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = 0;
	          }
	          value = context_w.charCodeAt(0);
	          for (i=0 ; i<16 ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
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
	        for (i=0 ; i<context_numBits ; i++) {
	          context_data_val = (context_data_val << 1) | (value&1);
	          if (context_data_position == bitsPerChar-1) {
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
	    for (i=0 ; i<context_numBits ; i++) {
	      context_data_val = (context_data_val << 1) | (value&1);
	      if (context_data_position == bitsPerChar-1) {
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
	      context_data_val = (context_data_val << 1);
	      if (context_data_position == bitsPerChar-1) {
	        context_data.push(getCharFromInt(context_data_val));
	        break;
	      }
	      else context_data_position++;
	    }
	    return context_data.join('');
	  },
	
	  decompress: function (compressed) {
	    if (compressed == null) return "";
	    if (compressed == "") return null;
	    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
	  },
	
	  _decompress: function (length, resetValue, getNextValue) {
	    var dictionary = [],
	        next,
	        enlargeIn = 4,
	        dictSize = 4,
	        numBits = 3,
	        entry = "",
	        result = [],
	        i,
	        w,
	        bits, resb, maxpower, power,
	        c,
	        data = {val:getNextValue(0), position:resetValue, index:1};
	
	    for (i = 0; i < 3; i += 1) {
	      dictionary[i] = i;
	    }
	
	    bits = 0;
	    maxpower = Math.pow(2,2);
	    power=1;
	    while (power!=maxpower) {
	      resb = data.val & data.position;
	      data.position >>= 1;
	      if (data.position == 0) {
	        data.position = resetValue;
	        data.val = getNextValue(data.index++);
	      }
	      bits |= (resb>0 ? 1 : 0) * power;
	      power <<= 1;
	    }
	
	    switch (next = bits) {
	      case 0:
	          bits = 0;
	          maxpower = Math.pow(2,8);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	        c = f(bits);
	        break;
	      case 1:
	          bits = 0;
	          maxpower = Math.pow(2,16);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
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
	      maxpower = Math.pow(2,numBits);
	      power=1;
	      while (power!=maxpower) {
	        resb = data.val & data.position;
	        data.position >>= 1;
	        if (data.position == 0) {
	          data.position = resetValue;
	          data.val = getNextValue(data.index++);
	        }
	        bits |= (resb>0 ? 1 : 0) * power;
	        power <<= 1;
	      }
	
	      switch (c = bits) {
	        case 0:
	          bits = 0;
	          maxpower = Math.pow(2,8);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	
	          dictionary[dictSize++] = f(bits);
	          c = dictSize-1;
	          enlargeIn--;
	          break;
	        case 1:
	          bits = 0;
	          maxpower = Math.pow(2,16);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	          dictionary[dictSize++] = f(bits);
	          c = dictSize-1;
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
	})();
	
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return LZString; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if( typeof module !== 'undefined' && module != null ) {
	  module.exports = LZString
	}


/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	exports.default = contactSearchService;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcContactService = __webpack_require__(53);
	
	var _rcContactService2 = _interopRequireDefault(_rcContactService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rcContactSearchProvider = function () {
	    return {
	        search: function search(text) {
	            console.log('search');
	            console.log(text);
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
	        },
	        searchAll: function searchAll() {
	            return _rcContactService2.default.completeCompanyContact().then(function (companyContacts) {
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
	
	exports.default = rcContactSearchProvider;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var _rcSubscriptionService = __webpack_require__(51);
	
	var _rcSubscriptionService2 = _interopRequireDefault(_rcSubscriptionService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rcMessageService = function () {
	    var messages = {};
	    var fetchingPromise = null;
	    var syncToken = null;
	    var messageUpdateHandlers = [];
	
	    function fullSyncMessages(hour) {
	        return _rcSdk.RC.sdk.platform().get('/account/~/extension/~/message-sync', {
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
	            return _rcSdk.RC.sdk.platform().get('/account/~/extension/~/message-sync', {
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
	            _rcSubscriptionService2.default.subscribe('message-store', '/restapi/v1.0/account/~/extension/~/message-store', incrementalSyncMessages);
	        },
	        onMessageUpdated: function onMessageUpdated(handler) {
	            if (handler) {
	                messageUpdateHandlers.push(handler);
	            }
	        },
	        sendSMSMessage: function sendSMSMessage(text, fromNumber, toNumber) {
	            return _rcSdk.RC.sdk.platform().post('/account/~/extension/~/sms/', {
	                from: { phoneNumber: fromNumber },
	                to: [{ phoneNumber: toNumber }],
	                text: text
	            }).then(function (response) {
	                return response.json();
	            });
	        },
	        sendPagerMessage: function sendPagerMessage(text, fromNumber, toNumber) {
	            console.log(fromNumber);
	            return _rcSdk.RC.sdk.platform().post('/account/~/extension/~/company-pager/', {
	                from: { extensionNumber: fromNumber },
	                to: [{ extensionNumber: toNumber }],
	                text: text
	            }).then(function (response) {
	                return response.json();
	            });
	        },
	        getConversation: function getConversation(conversationId, hourFrom, hourTo) {
	            return _rcSdk.RC.sdk.platform().get('/account/~/extension/~/message-store', {
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
	            return _rcSdk.RC.sdk.platform().get('/account/~/extension/~/message-store', {
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
	}();
	
	exports.default = rcMessageService;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcMessageService = __webpack_require__(57);
	
	var _rcMessageService2 = _interopRequireDefault(_rcMessageService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rcMessageProvider = function () {
	    var messageUpdatedHandlers = [];
	    var conversations = {};
	    var cachedHour = 0;
	
	    _rcMessageService2.default.onMessageUpdated(function (results) {
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
	            return Promise.resolve(_rcMessageService2.default.getMessagesByType('SMS')).then(function (messages) {
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
	            return Promise.resolve(_rcMessageService2.default.getAllMessages()).then(function (messages) {
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
	                return _rcMessageService2.default.getConversation(convId, hourFrom, cachedHour).then(function (result) {
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
	exports.default = rcMessageProvider;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _rcSdk = __webpack_require__(2);
	
	var rcConferenceSerivce = function () {
	    var fetchingConferenceInfo = null;
	
	    function fetchConferenceInfo() {
	        fetchingConferenceInfo = _rcSdk.RC.sdk.platform().get('/account/~/extension/~/conferencing').then(function (responses) {
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
	
	exports.default = rcConferenceSerivce;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _callLogService = __webpack_require__(50);
	
	var _callLogService2 = _interopRequireDefault(_callLogService);
	
	var _rcMessageService = __webpack_require__(57);
	
	var _rcMessageService2 = _interopRequireDefault(_rcMessageService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var conversationService = function () {
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
	            from: !msg.from && 'anonymous' || // For fax
	            msg.from.extensionNumber || msg.from.phoneNumber,
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
	            return _rcMessageService2.default.getMessagesByNumber(
	            // FIXME
	            number, cachedHour + offset, cachedHour);
	        })).then(function (result) {
	            return combine.apply(undefined, _toConsumableArray(result));
	        });
	    }
	    function getCallLogsByNumber(contact, offset) {
	        return Promise.all(contact.phoneNumber.map(function (number) {
	            return _callLogService2.default.getCallLogsByNumber(number, cachedHour + offset, cachedHour);
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
	            _rcMessageService2.default.onMessageUpdated(function (msgs) {
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
	}();
	
	exports.default = conversationService;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * JavaScript MD5
	 * https://github.com/blueimp/JavaScript-MD5
	 *
	 * Copyright 2011, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 *
	 * Based on
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */
	
	/*global unescape, define, module */
	
	;(function ($) {
	  'use strict'
	
	  /*
	  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	  * to work around bugs in some JS interpreters.
	  */
	  function safe_add (x, y) {
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
	    return (msw << 16) | (lsw & 0xFFFF)
	  }
	
	  /*
	  * Bitwise rotate a 32-bit number to the left.
	  */
	  function bit_rol (num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt))
	  }
	
	  /*
	  * These functions implement the four basic operations the algorithm uses.
	  */
	  function md5_cmn (q, a, b, x, s, t) {
	    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
	  }
	  function md5_ff (a, b, c, d, x, s, t) {
	    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
	  }
	  function md5_gg (a, b, c, d, x, s, t) {
	    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
	  }
	  function md5_hh (a, b, c, d, x, s, t) {
	    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
	  }
	  function md5_ii (a, b, c, d, x, s, t) {
	    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
	  }
	
	  /*
	  * Calculate the MD5 of an array of little-endian words, and a bit length.
	  */
	  function binl_md5 (x, len) {
	    /* append padding */
	    x[len >> 5] |= 0x80 << (len % 32)
	    x[(((len + 64) >>> 9) << 4) + 14] = len
	
	    var i
	    var olda
	    var oldb
	    var oldc
	    var oldd
	    var a = 1732584193
	    var b = -271733879
	    var c = -1732584194
	    var d = 271733878
	
	    for (i = 0; i < x.length; i += 16) {
	      olda = a
	      oldb = b
	      oldc = c
	      oldd = d
	
	      a = md5_ff(a, b, c, d, x[i], 7, -680876936)
	      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
	      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
	      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
	      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
	      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
	      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
	      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
	      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
	      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
	      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
	      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
	      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
	      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
	      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
	      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)
	
	      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
	      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
	      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
	      b = md5_gg(b, c, d, a, x[i], 20, -373897302)
	      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
	      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
	      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
	      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
	      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
	      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
	      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
	      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
	      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
	      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
	      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
	      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)
	
	      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
	      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
	      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
	      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
	      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
	      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
	      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
	      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
	      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
	      d = md5_hh(d, a, b, c, x[i], 11, -358537222)
	      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
	      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
	      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
	      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
	      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
	      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)
	
	      a = md5_ii(a, b, c, d, x[i], 6, -198630844)
	      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
	      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
	      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
	      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
	      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
	      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
	      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
	      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
	      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
	      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
	      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
	      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
	      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
	      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
	      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)
	
	      a = safe_add(a, olda)
	      b = safe_add(b, oldb)
	      c = safe_add(c, oldc)
	      d = safe_add(d, oldd)
	    }
	    return [a, b, c, d]
	  }
	
	  /*
	  * Convert an array of little-endian words to a string
	  */
	  function binl2rstr (input) {
	    var i
	    var output = ''
	    for (i = 0; i < input.length * 32; i += 8) {
	      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
	    }
	    return output
	  }
	
	  /*
	  * Convert a raw string to an array of little-endian words
	  * Characters >255 have their high-byte silently ignored.
	  */
	  function rstr2binl (input) {
	    var i
	    var output = []
	    output[(input.length >> 2) - 1] = undefined
	    for (i = 0; i < output.length; i += 1) {
	      output[i] = 0
	    }
	    for (i = 0; i < input.length * 8; i += 8) {
	      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
	    }
	    return output
	  }
	
	  /*
	  * Calculate the MD5 of a raw string
	  */
	  function rstr_md5 (s) {
	    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
	  }
	
	  /*
	  * Calculate the HMAC-MD5, of a key and some data (raw strings)
	  */
	  function rstr_hmac_md5 (key, data) {
	    var i
	    var bkey = rstr2binl(key)
	    var ipad = []
	    var opad = []
	    var hash
	    ipad[15] = opad[15] = undefined
	    if (bkey.length > 16) {
	      bkey = binl_md5(bkey, key.length * 8)
	    }
	    for (i = 0; i < 16; i += 1) {
	      ipad[i] = bkey[i] ^ 0x36363636
	      opad[i] = bkey[i] ^ 0x5C5C5C5C
	    }
	    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
	    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
	  }
	
	  /*
	  * Convert a raw string to a hex string
	  */
	  function rstr2hex (input) {
	    var hex_tab = '0123456789abcdef'
	    var output = ''
	    var x
	    var i
	    for (i = 0; i < input.length; i += 1) {
	      x = input.charCodeAt(i)
	      output += hex_tab.charAt((x >>> 4) & 0x0F) +
	      hex_tab.charAt(x & 0x0F)
	    }
	    return output
	  }
	
	  /*
	  * Encode a string as utf-8
	  */
	  function str2rstr_utf8 (input) {
	    return unescape(encodeURIComponent(input))
	  }
	
	  /*
	  * Take string arguments and return either raw or hex encoded strings
	  */
	  function raw_md5 (s) {
	    return rstr_md5(str2rstr_utf8(s))
	  }
	  function hex_md5 (s) {
	    return rstr2hex(raw_md5(s))
	  }
	  function raw_hmac_md5 (k, d) {
	    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
	  }
	  function hex_hmac_md5 (k, d) {
	    return rstr2hex(raw_hmac_md5(k, d))
	  }
	
	  function md5 (string, key, raw) {
	    if (!key) {
	      if (!raw) {
	        return hex_md5(string)
	      }
	      return raw_md5(string)
	    }
	    if (!raw) {
	      return hex_hmac_md5(key, string)
	    }
	    return raw_hmac_md5(key, string)
	  }
	
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return md5
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  } else if (typeof module === 'object' && module.exports) {
	    module.exports = md5
	  } else {
	    $.md5 = md5
	  }
	}(this))


/***/ }
/******/ ]);
//# sourceMappingURL=factory.js.map