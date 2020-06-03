"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.array.index-of");

var _sip = _interopRequireDefault(require("sip.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var localStorage = window.localStorage;

(function () {
  /**
   * @fileoverview CFSimpleSip
   */

  /* CFSimpleSip
   * @class CFSimpleSip
   */
  var C = {
    STATUS_NULL: 0,
    STATUS_NEW: 1,
    STATUS_CONNECTING: 2,
    STATUS_CONNECTED: 3,
    STATUS_COMPLETED: 4
  };
  /*
   * @param {Object} options
   */

  var CFSimpleSip = function CFSimpleSip(options) {
    /*
     *  {
     *    media: {
     *      remote: {
     *        audio: <DOM element>,
     *        video: <DOM element>
     *      },
     *      local: {
     *        video: <DOM element>
     *      }
     *    },
     *    ua: {
     *       <UA Configuration Options>
     *    }
     *  }
     */
    if (options.media.remote.video) {
      this.video = true;
    } else {
      this.video = false;
    }

    if (options.media.remote.audio) {
      this.audio = true;
    } else {
      this.audio = false;
    }

    if (!this.audio && !this.video) {
      // Need to do at least audio or video
      // Error
      throw new Error('At least one remote audio or video element is required for CFSimpleSip.');
    }

    this.options = options; // https://stackoverflow.com/questions/7944460/detect-safari-browser

    var browserUa = window.navigator.userAgent.toLowerCase();
    var isSafari = false;
    var isFirefox = false;

    if (browserUa.indexOf('safari') > -1 && browserUa.indexOf('chrome') < 0) {
      isSafari = true;
    } else if (browserUa.indexOf('firefox') > -1 && browserUa.indexOf('chrome') < 0) {
      isFirefox = true;
    }

    var sessionDescriptionHandlerFactoryOptions = {};

    if (isSafari) {
      sessionDescriptionHandlerFactoryOptions.modifiers = [_sip["default"].Web.Modifiers.stripG722];
    }

    if (isFirefox) {
      sessionDescriptionHandlerFactoryOptions.alwaysAcquireMediaFirst = true;
      sessionDescriptionHandlerFactoryOptions.modifiers = [_sip["default"].Web.Modifiers.addMidLines];
    }

    if (!this.options.ua.uri) {
      this.anonymous = true;
    }

    this.ua = new _sip["default"].UA({
      // User Configurable Options
      uri: this.options.ua.uri,
      authorizationUser: this.options.ua.authorizationUser,
      password: this.options.ua.password,
      displayName: this.options.ua.displayName,
      // Undocumented "Advanced" Options
      userAgentString: "".concat(_sip["default"].C.USER_AGENT, ";").concat(browserUa),
      // Fixed Options
      register: true,
      registerExpires: this.options.ua.registerExpires || 600,
      sessionDescriptionHandlerFactoryOptions: sessionDescriptionHandlerFactoryOptions,
      transportOptions: {
        traceSip: this.options.ua.traceSip,
        wsServers: this.options.ua.wsServers,
        maxReconnectionAttempts: 1000
      },
      dtmfType: _sip["default"].C.dtmfType.RTP
    });
    this.state = C.STATUS_NULL;
    this.logger = this.ua.getLogger('sip.simple');
    this.ua.on('registered', function () {
      this.emit('registered', this.ua);
    }.bind(this));
    this.ua.on('unregistered', function () {
      this.emit('unregistered', this.ua);
    }.bind(this));
    this.ua.on('failed', function () {
      this.emit('unregistered', this.ua);
    }.bind(this));
    this.ua.on('invite', function (session) {
      // If there is already an active session reject the incoming session
      if (this.state !== C.STATUS_NULL && this.state !== C.STATUS_COMPLETED) {
        this.logger.warn('Rejecting incoming call. CFSimpleSip only supports 1 call at a time');
        session.reject();
        return;
      }

      this.session = session;
      this.setupSession();
      this.emit('ringing', this.session);
    }.bind(this));
    this.ua.on('message', function (message) {
      this.emit('message', message);
    }.bind(this));
    return this;
  };

  CFSimpleSip.prototype = Object.create(_sip["default"].EventEmitter.prototype);
  CFSimpleSip.C = C; // Public

  CFSimpleSip.prototype.call = function (destination) {
    if (!this.ua || !this.checkRegistration()) {
      this.logger.warn('A registered UA is required for calling');
      return;
    }

    if (this.state !== C.STATUS_NULL && this.state !== C.STATUS_COMPLETED) {
      this.logger.warn('Cannot make more than a single call with CFSimpleSip');
      return;
    } // Safari hack, because you cannot call .play() from a non user action


    if (this.options.media.remote.audio) {
      this.options.media.remote.audio.autoplay = true;
    }

    if (this.options.media.remote.video) {
      this.options.media.remote.video.autoplay = true;
    }

    if (this.options.media.local && this.options.media.local.video) {
      this.options.media.local.video.autoplay = true;
      this.options.media.local.video.volume = 0;
    }

    this.session = this.ua.invite(destination, {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: this.audio,
          video: this.video
        }
      }
    });
    this.setupSession();
    return this.session;
  };

  CFSimpleSip.prototype.answer = function () {
    if (this.state !== C.STATUS_NEW && this.state !== C.STATUS_CONNECTING) {
      this.logger.warn('No call to answer');
      return;
    } // Safari hack, because you cannot call .play() from a non user action


    if (this.options.media.remote.audio) {
      this.options.media.remote.audio.autoplay = true;
    }

    if (this.options.media.remote.video) {
      this.options.media.remote.video.autoplay = true;
    }

    return this.session.accept({
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: this.audio,
          video: this.video
        }
      }
    }); // emit call is active
  };

  CFSimpleSip.prototype.reject = function () {
    if (this.state !== C.STATUS_NEW && this.state !== C.STATUS_CONNECTING) {
      this.logger.warn('Call is already answered');
      return;
    }

    return this.session.reject();
  };

  CFSimpleSip.prototype.hangup = function () {
    if (this.state !== C.STATUS_CONNECTED && this.state !== C.STATUS_CONNECTING && this.state !== C.STATUS_NEW) {
      this.logger.warn('No active call to hang up on');
      return;
    }

    if (this.state !== C.STATUS_CONNECTED) {
      return this.session.cancel();
    }

    return this.session.bye();
  };

  CFSimpleSip.prototype.hold = function () {
    if (this.state !== C.STATUS_CONNECTED || this.session.local_hold) {
      this.logger.warn('Cannot put call on hold');
      return;
    }

    this.mute();
    this.logger.log('Placing session on hold');
    return this.session.hold();
  };

  CFSimpleSip.prototype.unhold = function () {
    if (this.state !== C.STATUS_CONNECTED || !this.session.local_hold) {
      this.logger.warn('Cannot unhold a call that is not on hold');
      return;
    }

    this.unmute();
    this.logger.log('Placing call off hold');
    return this.session.unhold();
  };

  CFSimpleSip.prototype.mute = function () {
    if (this.state !== C.STATUS_CONNECTED) {
      this.logger.warn('An acitve call is required to mute audio');
      return;
    }

    this.logger.log('Muting Audio');
    this.toggleMute(true);
    this.emit('mute', this);
  };

  CFSimpleSip.prototype.unmute = function () {
    if (this.state !== C.STATUS_CONNECTED) {
      this.logger.warn('An active call is required to unmute audio');
      return;
    }

    this.logger.log('Unmuting Audio');
    this.toggleMute(false);
    this.emit('unmute', this);
  };

  CFSimpleSip.prototype.sendDTMF = function (tone) {
    if (this.state !== C.STATUS_CONNECTED) {
      this.logger.warn('An active call is required to send a DTMF tone');
      return;
    }

    this.logger.log("Sending DTMF tone: ".concat(tone));
    this.session.dtmf(tone);
  };

  CFSimpleSip.prototype.message = function (destination, message) {
    if (!this.ua || !this.checkRegistration()) {
      this.logger.warn('A registered UA is required to send a message');
      return;
    }

    if (!destination || !message) {
      this.logger.warn('A destination and message are required to send a message');
      return;
    }

    this.ua.message(destination, message);
  }; // Private Helpers


  CFSimpleSip.prototype.checkRegistration = function () {
    return this.anonymous || this.ua && this.ua.isRegistered();
  };

  CFSimpleSip.prototype.setupRemoteMedia = function () {
    // If there is a video track, it will attach the video and audio to the same element
    var pc = this.session.sessionDescriptionHandler.peerConnection;
    var remoteStream;

    if (pc.getReceivers) {
      remoteStream = new window.window.MediaStream();
      pc.getReceivers().forEach(function (receiver) {
        var track = receiver.track;

        if (track) {
          remoteStream.addTrack(track);
        }
      });
    } else {
      remoteStream = pc.getRemoteStreams()[0];
    }

    if (this.video) {
      this.options.media.remote.video.srcObject = remoteStream;
      this.options.media.remote.video.play()["catch"](function () {
        this.logger.log('play was rejected');
      }.bind(this));
    } else if (this.audio) {
      this.options.media.remote.audio.srcObject = remoteStream;
      this.options.media.remote.audio.play()["catch"](function () {
        this.logger.log('play was rejected');
      }.bind(this));
    }
  };

  CFSimpleSip.prototype.setupLocalMedia = function () {
    if (this.video && this.options.media.local && this.options.media.local.video) {
      var pc = this.session.sessionDescriptionHandler.peerConnection;
      var localStream;

      if (pc.getSenders) {
        localStream = new window.window.MediaStream();
        pc.getSenders().forEach(function (sender) {
          var track = sender.track;

          if (track && track.kind === 'video') {
            localStream.addTrack(track);
          }
        });
      } else {
        localStream = pc.getLocalStreams()[0];
      }

      this.options.media.local.video.srcObject = localStream;
      this.options.media.local.video.volume = 0;
      this.options.media.local.video.play();
    }
  };

  CFSimpleSip.prototype.cleanupMedia = function () {
    if (this.video) {
      this.options.media.remote.video.srcObject = null;
      this.options.media.remote.video.pause();

      if (this.options.media.local && this.options.media.local.video) {
        this.options.media.local.video.srcObject = null;
        this.options.media.local.video.pause();
      }
    }

    if (this.audio) {
      this.options.media.remote.audio.srcObject = null;
      this.options.media.remote.audio.pause();
    }
  };

  CFSimpleSip.prototype.setupSession = function () {
    this.state = C.STATUS_NEW;
    this.emit('new', this.session);
    this.session.on('progress', this.onProgress.bind(this));
    this.session.on('accepted', this.onAccepted.bind(this));
    this.session.on('rejected', this.onEnded.bind(this));
    this.session.on('failed', this.onFailed.bind(this));
    this.session.on('terminated', this.onEnded.bind(this));
  };

  CFSimpleSip.prototype.destroyMedia = function () {
    this.session.sessionDescriptionHandler.close();
  };

  CFSimpleSip.prototype.toggleMute = function (mute) {
    var pc = this.session.sessionDescriptionHandler.peerConnection;

    if (pc.getSenders) {
      pc.getSenders().forEach(function (sender) {
        if (sender.track) {
          sender.track.enabled = !mute;
        }
      });
    } else {
      pc.getLocalStreams().forEach(function (stream) {
        stream.getAudioTracks().forEach(function (track) {
          track.enabled = !mute;
        });
        stream.getVideoTracks().forEach(function (track) {
          track.enabled = !mute;
        });
      });
    }
  };

  CFSimpleSip.prototype.onAccepted = function () {
    this.state = C.STATUS_CONNECTED;
    this.emit('connected', this.session);
    this.setupLocalMedia();
    this.setupRemoteMedia();
    this.session.sessionDescriptionHandler.on('addTrack', function () {
      this.logger.log('A track has been added, triggering new remoteMedia setup');
      this.setupRemoteMedia();
    }.bind(this));
    this.session.sessionDescriptionHandler.on('addStream', function () {
      this.logger.log('A stream has been added, trigger new remoteMedia setup');
      this.setupRemoteMedia();
    }.bind(this));
    this.session.on('hold', function () {
      this.emit('hold', this.session);
    }.bind(this));
    this.session.on('unhold', function () {
      this.emit('unhold', this.session);
    }.bind(this));
    this.session.on('dtmf', function (tone) {
      this.emit('dtmf', tone);
    }.bind(this));
    this.session.on('bye', this.onEnded.bind(this));
  };

  CFSimpleSip.prototype.onProgress = function () {
    this.state = C.STATUS_CONNECTING;
    this.emit('connecting', this.session);
  };

  CFSimpleSip.prototype.onFailed = function () {
    this.onEnded();
  };

  CFSimpleSip.prototype.onEnded = function () {
    this.state = C.STATUS_COMPLETED;
    this.emit('ended', this.session);
    this.cleanupMedia();
  };

  window.CFSimpleSip = CFSimpleSip;
  return CFSimpleSip;
})();

var _default = function () {
  /**
   * @fileOverview Exposed functionality for Contact Center AgentUI.
   * @version 3.0.14
   * @namespace AgentLibrary
   */
  return function (global) {
    var AddSessionNotification = function AddSessionNotification() {};
    /*
     * This class is responsible for handling "ADD-SESSION" packets from IntelliQueue.  This is used by
     * the CallControlForm. Then it will increment the total_calls count.
     *
     * {
     *   "ui_notification": {
     *       "@message_id": "IQ982008082918151403727",
     *       "@response_to": "",
     *       "@type": "ADD-SESSION",
     *       "session_id": { "#text": "2" },
     *       "uii": { "#text": "200808291814560000000900016558" },
     *       "phone": { "#text": "200808291814370000000900016555" },
     *       "session_type": { "#text": "AGENT" },
     *       "session_label": { "#text": "Primary Agents Call Session" },
     *       "allow_control": { "#text": "TRUE" },
     *       "monitoring": { "#text": "FALSE" },
     *       "agent_id": { "#text": "1856" }
     *   }
     *  }
     */


    AddSessionNotification.prototype.processResponse = function (notification) {
      var formattedResponse = utils.buildDefaultResponse(notification);
      var model = UIModel.getInstance();
      var notif = notification.ui_notification;
      var sessionAgentId = utils.getText(notif, 'agent_id');

      if (utils.getText(notif, 'session_type') === 'AGENT') {
        model.incrementTotalCalls();
      }

      if (sessionAgentId === model.agentSettings.agentId) {
        // add the session_id of this leg to the current call packet -
        // this way we can use it for hangups later.
        model.currentCall.sessionId = utils.getText(notif, 'session_id');
      } else if (sessionAgentId != '') {
        // this is a monitoring session, lets save the monitored agent id for barge-ins
        model.currentCall.monitorAgentId = sessionAgentId;
      } // Check to see if we have a transfer leg here, if so, register it


      var sessionType = utils.getText(notif, 'session_type');
      var allowControl = utils.getText(notif, 'allow_control');
      var sessionId = utils.getText(notif, 'session_id');
      var uii = utils.getText(notif, 'uii');
      var isMonitoring = model.currentCall.isMonitoring;
      var monitoringType = model.currentCall.monitoringType;
      var isBargeInMonitor = isMonitoring && monitoringType === 'FULL';
      var notCurrentAgent = sessionAgentId !== model.agentSettings.agentId;
      var notSessionOne = sessionId !== '1';
      var shouldTrackSession = false;

      if (notSessionOne && notCurrentAgent) {
        if (isBargeInMonitor) {
          shouldTrackSession = true;
        } else if (allowControl) {
          if (sessionType === 'OUTBOUND' || sessionType === 'AGENT') {
            shouldTrackSession = true;
          }
        }
      }

      if (shouldTrackSession) {
        var destination = utils.getText(notif, 'phone');

        if (sessionType === 'AGENT' || sessionAgentId !== '') {
          destination = utils.getText(notif, 'agent_name');
        }

        model.transferSessions[sessionId] = {
          sessionId: sessionId,
          destination: destination,
          uii: uii
        };
      } // if agent session, set on call status


      if (notif.session_id === '2') {
        model.agentSettings.onCall = true;
      }

      formattedResponse.status = 'OK';
      formattedResponse.message = 'Received ADD-SESSION notification';
      formattedResponse.sessionId = utils.getText(notif, 'session_id');
      formattedResponse.uii = utils.getText(notif, 'uii');
      formattedResponse.phone = utils.getText(notif, 'phone');
      formattedResponse.sessionType = utils.getText(notif, 'session_type');
      formattedResponse.sessionLabel = utils.getText(notif, 'session_label');
      formattedResponse.allowControl = utils.getText(notif, 'allow_control');
      formattedResponse.monitoring = utils.getText(notif, 'monitoring');
      formattedResponse.agentId = utils.getText(notif, 'agent_id');
      formattedResponse.transferSessions = model.transferSessions;
      return formattedResponse;
    };

    var AdminDebugEmailNotification = function AdminDebugEmailNotification() {};
    /*
     * This class is responsible for handling "AGENT-DEBUG-EMAIL" packets from IntelliQueue
     *
     * {
     *   "ui_notification":{
     *      "@message_id":"IQD01DEV2018071616521500004",
     *      "@response_to":"",
     *      "@type":"AGENT-DEBUG-EMAIL",
     *      "email_to": {
     *          "#text":"rmyers@connectfirst.com"
     *      }
     *      "requested_by": {
     *          "#text":"Ross Myers"
     *      }
     *   }
     * }
     */


    AdminDebugEmailNotification.prototype.processResponse = function (notification) {
      var formattedResponse = utils.buildDefaultResponse(notification);
      var notif = notification.ui_notification;
      formattedResponse.status = 'OK';
      formattedResponse.message = 'Received AGENT-DEBUG-EMAIL notification';
      formattedResponse.emailTo = utils.getText(notif, 'email_to');
      formattedResponse.requestedBy = utils.getText(notif, 'requested_by');
      return formattedResponse;
    };

    var DialGroupChangeNotification = function DialGroupChangeNotification() {};
    /*
     * This class is responsible for handling a DIAL_GROUP_CHANGE notification.
     * This event is sent from IQ when an agent's dial group is changed in through the AdminUI.
     *
     *   {
     *       "ui_notification": {
     *           "@message_id": "IQ10012016080413085500263",
     *           "@type": "DIAL_GROUP_CHANGE",
     *           "agent_id": { "#text": "1180958" },
     *           "dial_group_id": { "#text": "50354" },
     *           "dialGroupName": { "#text": "Preview Dial Mode" },
     *           "dial_group_desc": {}
     *       }
     *   }
     */


    DialGroupChangeNotification.prototype.processResponse = function (notification) {
      // Modify loginRequest with new DialGroupId
      var model = UIModel.getInstance();
      var notif = notification.ui_notification;
      var origLoginType = model.loginRequest.loginType;
      var newDgId = utils.getText(notif, 'dial_group_id');
      model.dialGroupChangeNotification = notification; // Calculate type of login - called from AdminUI when assigning agent to new dial group.
      // Only options should be BLENDED or OUTBOUND here.

      if (newDgId && newDgId !== '' && (origLoginType === 'INBOUND' || origLoginType === 'BLENDED')) {
        model.loginRequest.loginType = 'BLENDED';
      } else if (newDgId && newDgId !== '') {
        model.loginRequest.loginType = 'OUTBOUND';
      } else if (origLoginType === 'INBOUND') {
        model.loginRequest.loginType = 'INBOUND';
      } else {
        model.loginRequest.loginType = 'NO-SELECTION';
      }

      UIModel.getInstance().loginRequest.dialGroupId = newDgId;
      var formattedResponse = {
        message: 'Dial Group Updated Successfully.',
        detail: "Dial Group changed to [".concat(newDgId, "]."),
        dialGroupId: utils.getText(notif, 'dial_group_id'),
        dialGroupName: utils.getText(notif, 'dialGroupName'),
        // camel case from server for some reason :/
        dialGroupDesc: utils.getText(notif, 'dial_group_desc'),
        agentId: utils.getText(notif, 'agent_id')
      };
      return formattedResponse;
    };

    var DialGroupChangePendingNotification = function DialGroupChangePendingNotification() {};
    /*
     * This class is responsible for handling a DIAL_GROUP_CHANGE_PENDING notification.
     * This event is sent from IQ when an agent's dial group is changed and the agent is on a call.
     *
     * {
     *     "ui_notification": {
     *         "@message_id": "IQ10012016080515294800318",
     *         "@type": "DIAL_GROUP_CHANGE_PENDING",
     *         "agent_id": { "#text": "1180958" },
     *         "dial_group_id": { "#text": "50354" },
     *         "update_from_adminui": { "#text": "TRUE" }
     *     }
     * }
     */


    DialGroupChangePendingNotification.prototype.processResponse = function (notification) {
      var model = UIModel.getInstance();
      var notif = notification.ui_notification;
      model.agentSettings.pendingDialGroupChange = parseInt(utils.getText(notif, 'dial_group_id'), 10); // check if request originated with AdminUI

      if (notif.update_from_adminui) {
        model.agentSettings.updateDGFromAdminUI = utils.getText(notif, 'update_from_adminui') === true;
      } else {
        model.agentSettings.updateDGFromAdminUI = false;
      }

      var formattedResponse = {
        message: 'Dial Group Change Pending notification received.',
        detail: 'DialGroup switch for existing session pending until active call ends.',
        agentId: utils.getText(notif, 'agent_id'),
        dialGroupId: utils.getText(notif, 'dial_group_id'),
        updateFromAdminUI: utils.getText(notif, 'update_from_adminui')
      };
      return formattedResponse;
    };

    var DirectAgentTransferNotification = function DirectAgentTransferNotification() {};
    /*
     * This class is responsible for handling a DIRECT-AGENT-ROUTE notification.
     * This event is sent from IQ when an agent is presented a direct transfer, in the case they are not in an
     * available state to automatically be presented the call.
     *
     * {
     *     "ui_notification": {
     *         "@message_id": "IQ10012016080515294800318",
     *         "@type": "DIRECT-AGENT-ROUTE",
     *         "response_to": { "#text": "" },
     *         "agent_id": { "#text": "" },
     *         "uii": { "#text": "" },
     *         "status": { "#text": "" },
     *         "ani": { "#text": "" },
     *         "dnis": { "#text": "" }
     *         "source_type": { "#text": "" },
     *         "source_id": { "#text": "" },
     *         "source_name": { "#text": "" }
     *         "voicemail_url": { "#text": "" }
     *     }
     * }
     */


    DirectAgentTransferNotification.prototype.processResponse = function (notification) {
      var formattedResponse = utils.buildDefaultResponse(notification);
      var notif = notification.ui_notification;
      formattedResponse.message = 'Received DIRECT-AGENT-ROUTE notification';
      formattedResponse.status = utils.getText(notif, 'status');
      formattedResponse.agentId = utils.getText(notif, 'agent_id');
      formattedResponse.uii = utils.getText(notif, 'uii');
      formattedResponse.ani = utils.getText(notif, 'ani');
      formattedResponse.dnis = utils.getText(notif, 'dnis');
      formattedResponse.sourceType = utils.getText(notif, 'source_type');
      formattedResponse.sourceId = utils.getText(notif, 'source_id');
      formattedResponse.sourceName = utils.getText(notif, 'source_name');
      formattedResponse.voicemailUrl = utils.getText(notif, 'voicemail_url');
      return formattedResponse;
    };

    var DropSessionNotification = function DropSessionNotification() {};
    /*
     * This class handles the DROP-SESSION packet from IQ. It doesn't really do anything
     * besides format a response for the callback notification since there isn't any action needed.
     *
     *  {
     *      "ui_notification": {
     *          "@message_id":"IQ10012016081613222800341",
     *          "@response_to":"",
     *          "@type":"DROP-SESSION",
     *          "session_id":{"#text":"3"},
     *          "uii":{"#text":"201608161322180139000000000124"}
     *      }
     *  }
     */


    DropSessionNotification.prototype.processResponse = function (notification) {
      var formattedResponse = utils.buildDefaultResponse(notification);
      var notif = notification.ui_notification;
      var sessionId = utils.getText(notif, 'session_id');
      var transfer = UIModel.getInstance().transferSessions[sessionId]; // Check to see if we just disconnected a transfer session
      // If so, we need to remove the session from our map

      if (transfer) {
        utils.logMessage(LOG_LEVELS.DEBUG, "Transfer to ".concat(transfer.destination, " has terminated"), '');
        delete UIModel.getInstance().transferSessions[sessionId];
        formattedResponse.transferEnd = transfer;
      }

      formattedResponse.message = 'Received DROP-SESSION Notification';
      formattedResponse.status = 'OK';
      formattedResponse.sessionId = utils.getText(notif, 'session_id');
      formattedResponse.uii = utils.getText(notif, 'uii');
      return formattedResponse;
    };

    var EarlyUiiNotification = function EarlyUiiNotification() {};
    /*
     * This class is responsible for handling "EARLY_UII" packets from IntelliQueue.
     * For manual outdials, this gives the uii to cancel a ringing line.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"EARLY_UII",
     *          "agent_id":{"#text":"1180958"},
     *          "uii":{"#text":"201608161200240139000000000120"}
     *      }
     *  }
     */


    EarlyUiiNotification.prototype.processResponse = function (notification) {
      var formattedResponse = utils.buildDefaultResponse(notification);
      var notif = notification.ui_notification;
      formattedResponse.message = 'Received EARLY_UII notification';
      formattedResponse.status = 'OK';
      formattedResponse.agentId = utils.getText(notif, 'agent_id');
      formattedResponse.uii = utils.getText(notif, 'uii');
      return formattedResponse;
    };

    var EndCallNotification = function EndCallNotification(libInstance) {
      this.libInstance = libInstance;
    };
    /*
     * This class is responsible for handling an END-CALL notification.
     * Save the packet in the UIModel by appending it to the currentCall packet.
     * Update the CallState field in the UIModel to "CALL-ENDED"
     *
     * {
     *  "ui_notification":{
     *      "@message_id":"IQ982008082910362203349",
     *      "@response_to":"",
     *      "@type":"END-CALL",
     *      "agent_id":{"#text":"1856"},
     *      "uii":{"#text":"200808291035510000000900029412"},
     *      "session_id":{"#text":"2"},
     *      "call_dts":{"#text":"2008-08-29 10:36:04"},
     *      "call_duration":{"#text":"16"},
     *      "term_party":{"#text":"CALLER"},
     *      "term_reason":{},
     *      "recording_url":{},
     *      "disposition_timeout:{"#text":"60"}
     *  }
     * }
     */


    EndCallNotification.prototype.processResponse = function (notification) {
      var model = UIModel.getInstance();
      var notif = notification.ui_notification;
      model.endCallNotification = notification; // add callDuration, termParty, and termReason to the current call packet

      model.currentCall.duration = utils.getText(notif, 'call_duration');
      model.currentCall.termParty = utils.getText(notif, 'term_party');
      model.currentCall.termReason = utils.getText(notif, 'term_reason'); // set call state to "CALL-ENDED"

      model.agentSettings.callState = 'CALL-ENDED';
      model.agentSettings.onCall = false;
      model.agentSettings.onManualOutdial = false; // Clear out any transfer sessions from the previous call

      model.transferSessions = {}; // Check if there is a pending dial group change

      if (model.agentSettings.pendingDialGroupChange > 0 || model.agentSettings.pendingDialGroupChange == -1) {
        // update dial group id
        model.loginRequest.dialGroupId = model.agentSettings.pendingDialGroupChange; // send login update request

        this.libInstance.loginAgent(model.loginRequest.queueIds, model.configRequest.chatIds, model.configRequest.skillProfileId, model.configRequest.dialGroupId, model.configRequest.dialDest, model.agentSettings.updateDGFromAdminUI); // reset pending dial group variables

        model.agentSettings.pendingDialGroupChange = 0;
        model.agentSettings.updateDGFromAdminUI = false;
      } // start ping call interval timer, sends message every 30 seconds
      // if this is not a manual outdial and we are not suppressing disposition pop


      if (model.currentCall.outdialDispositions && model.currentCall.outdialDispositions.dispositions && model.currentCall.outdialDispositions.dispositions.length > 0 && model.currentCall.surveyPopType !== 'SUPPRESS') {
        model.pingIntervalId = setInterval(utils.sendPingCallMessage, 30000);
      }

      var formattedResponse = {
        message: 'End Call Notification Received.',
        detail: '',
        uii: utils.getText(notif, 'uii'),
        sessionId: utils.getText(notif, 'session_id'),
        agentId: utils.getText(notif, 'agent_id'),
        callDts: utils.getText(notif, 'call_dts'),
        duration: model.currentCall.duration,
        termParty: model.currentCall.termParty,
        termReason: model.currentCall.termReason,
        recordingUrl: utils.getText(notif, 'recording_url'),
        dispositionTimeout: utils.getText(notif, 'disposition_timeout')
      };
      return formattedResponse;
    };

    var GatesChangeNotification = function GatesChangeNotification() {};
    /*
     * This class is responsible for handling a gates change notification
     *
     * {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016080817344100936",
     *          "@type":"GATES_CHANGE",
     *          "agent_id":{"#text":"1180958"},
     *          "gate_ids":{"#text":"11117,3"}
     *      }
     * }
     */


    GatesChangeNotification.prototype.processResponse = function (notification) {
      var model = UIModel.getInstance();
      var notif = notification.ui_notification;
      var newAssignedGates = [];
      var availableQueues = model.inboundSettings.availableQueues;
      var assignedGateIds = utils.getText(notif, 'gate_ids');

      if (assignedGateIds !== '') {
        assignedGateIds = assignedGateIds.split(',');
      }

      for (var a = 0; a < assignedGateIds.length; a++) {
        // find gate in avail list
        var id = assignedGateIds[a];
        var foundGate = utils.findObjById(availableQueues, id, 'gateId');

        if (foundGate) {
          newAssignedGates.push(foundGate);
        } else {
          // gate not in assigned list, add stub
          var gate = {
            gateId: id,
            gateName: '',
            gateDesc: '',
            defaultDestOverride: '',
            isAgentSelectable: false
          };
          newAssignedGates.push(gate);
        }
      }

      model.inboundSettings.queues = JSON.parse(JSON.stringify(newAssignedGates));
      var formattedResponse = {
        agentId: utils.getText(notif, 'agent_id'),
        message: 'Gates Change notification received.',
        queues: newAssignedGates
      };
      return formattedResponse;
    };

    var GenericNotification = function GenericNotification() {};
    /*
     * This class is responsible for handling a generic notification
     *
     * {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016080317400400011",
     *          "@response_to":"1c2fe39f-a31e-aff8-8d23-92a61c88270f",
     *          "@type":"GENERIC",
     *          "message_code":{"#text":"0"},
     *          "message":{"#text":"OK"},
     *          "detail":{"#text":"Pending Callback Successfully Cancelled."}
     *      }
     * }
     */


    GenericNotification.prototype.processResponse = function (notification) {
      var formattedResponse = utils.buildDefaultResponse(notification); // add message and detail if present

      formattedResponse.messageCode = utils.getText(notification.ui_notification, 'message_code');
      return formattedResponse;
    };

    var NewCallNotification = function NewCallNotification() {};
    /*
     * This class processes a "NEW-CALL" packet received from Intelliqueue. It will determine
     * if the call is a regular or monitoring call:
     * 		@Monitoring==true:  set state to ACTIVE-MONITORING, send NewMonitoringCall event
     * 		@Monitoring==false: set state to ACTIVE, send newcall packet and increment total calls
     *
     *  {"ui_notification":{
     *      "@message_id":"IQ982010020911335300027",
     *      "@response_to":"",
     *      "@type":"NEW-CALL",
     *      "uii":{"#text":"201002091133350139990000000010"},
     *      "ani":{"#text":"9548298548"},
     *      "dnis":{},
     *      "dial_dest":{"#text":"sip:+16789050673@sip.connectfirst.com"},
     *      "call_type":{"#text":"OUTBOUND"},
     *      "queue_dts":{"#text":"2010-02-09 11:33:53"},
     *      "queue_time":{"#text":"-1"},
     *      "agent_id":{"#text":"657"},
     *      "app_url":{},
     *      "is_monitoring":{"#text":"FALSE"},
     *      "script_id":{},
     *      "script_version":{},
     *      "survey_id":{},
     *      "survey_pop_type":{"#text":"SUPPRESS"},
     *      "message":{},
     *      "agent_recording":{"@default":"ON","@pause":"10","#text":"TRUE"},
     *      "hangup_on_disposition":{"#text":"FALSE"},
     *      "gate":{
     *          "@number":"17038",
     *          "name":{"#text":"AM Campaign"},
     *          "description":{}
     *      },
     *      "outdial_dispositions":{
     *          "@type":"CAMPAIGN|GATE",
     *          "disposition":[
     *              { "@contact_forwarding":"FALSE", "@disposition_id":"20556", "@is_complete":"1", "@is_default"="0", "@require_note"="0", "@save_survey"="1", "@xfer"="0", "#text":"Not Available"},
     *              { "@contact_forwarding":"FALSE", "@disposition_id":"20559", "@is_complete":"1", "@is_default"="1", "@require_note"="1", "@save_survey"="1", "@xfer"="0", #text":"Transfer Not Available"}
     *          ]
     *      },
     *      "requeue_shortcuts":{
     *          "requeue_shortcut":[
     *              { "@gate_id":"2", "@name":"test queue" "@skill_id":""}
     *          ]
     *      },
     *      "baggage":{
     *          "@allow_updates":"TRUE",
     *          "@show_lead_passes":"TRUE",
     *          "@show_list_name":"TRUE",
     *          "aux_phone":{},
     *          "aux_greeting":{},
     *          "aux_external_url":{},
     *          "aux_data1":{"#text":"BMAK"},
     *          "aux_data2":{"#text":"BMAK-041653-934"},
     *          "aux_data3":{"#text":"Call Ctr 1"},
     *          "aux_data4":{},
     *          "aux_data5":{},
     *          "extern_id":{"#text":"9548298548"},
     *          "lead_id":{"#text":"64306"},
     *          "lead_passes":{"#text":"1"},
     *          "first_name":{"#text":"Ryant"},
     *          "last_name":{"#text":"Taylor"},
     *          "mid_name":{},
     *          "address1":{"#text":"8010 Maryland Ave"},
     *          "address2":{},
     *          "city":{"#text":"Cleveland"},
     *          "state":{"#text":"OH"},
     *          "zip":{"#text":"44105"},
     *          "custom_labels":{
     *              "aux_1_label":{},
     *              "aux_2_label":{},
     *              "aux_3_label":{},
     *              "aux_4_label":{},
     *              "aux_5_label":{}
     *          }
     *      },
     *      "survey_response":{
     *          "@response_id":"24",
     *          "@survey_id":"1775",
     *          "details":{
     *              "detail":[
     *                  {"@element_id":"9001","@option_id":"0","#text":"Box 1"},
     *                  {"@element_id":"9002","@option_id":"0","#text":"Area 1"},
     *                  {"@element_id":"9003","@option_id":"6439"},
     *                  {"@element_id":"9004","@option_id":"6443"},
     *                  {"@element_id":"9004","@option_id":"6444"},
     *                  {"@element_id":"9005","@option_id":"6447"},
     *                  {"@element_id":"9006","@option_id":"0","#text":"11/20/2013"},
     *                  {"@element_id":"9015","@option_id":"0","#text":"Box 2"},
     *                  {"@element_id":"9016","@option_id":"0","#text":"Area 2"},
     *                  {"@element_id":"9017","@option_id":"6466"},
     *                  {"@element_id":"9018","@option_id":"6471"},
     *                  {"@element_id":"9018","@option_id":"6472"},
     *                  {"@element_id":"9019","@option_id":"6477"},
     *                  {"@element_id":"9020","@option_id":"0","#text":"11/21/2013"}
     *             ]
     *          }
     *      }
     *    }
     *  }
     */


    NewCallNotification.prototype.processResponse = function (notification) {
      var model = UIModel.getInstance();
      var notif = notification.ui_notification; // set up new call obj

      var newCall = {
        uii: utils.getText(notif, 'uii'),
        agentId: utils.getText(notif, 'agent_id'),
        dialDest: utils.getText(notif, 'dial_dest'),
        queueDts: utils.getText(notif, 'queue_dts'),
        queueTime: utils.getText(notif, 'queue_time'),
        ani: utils.getText(notif, 'ani'),
        dnis: utils.getText(notif, 'dnis'),
        callType: utils.getText(notif, 'call_type'),
        appUrl: utils.getText(notif, 'app_url'),
        isMonitoring: utils.getText(notif, 'is_monitoring'),
        allowHold: utils.getText(notif, 'allow_hold'),
        allowTransfer: utils.getText(notif, 'allow_transfer'),
        allowManualInternationalTransfer: utils.getText(notif, 'allow_manual_international_transfer'),
        allowDirectAgentTransfer: utils.getText(notif, 'allow_direct_agent_transfer'),
        allowHangup: utils.getText(notif, 'allow_hangup'),
        allowRequeue: utils.getText(notif, 'allow_requeue'),
        allowEndCallForEveryone: utils.getText(notif, 'allow_endcallforeveryone'),
        scriptId: utils.getText(notif, 'script_id'),
        scriptVersion: utils.getText(notif, 'script_version'),
        surveyId: utils.getText(notif, 'survey_id'),
        surveyPopType: utils.getText(notif, 'survey_pop_type'),
        requeueType: utils.getText(notif, 'requeue_type'),
        hangupOnDisposition: utils.getText(notif, 'hangup_on_disposition')
      };

      if (newCall.isMonitoring) {
        newCall.monitoringType = utils.getText(notif, 'monitoring_type'); // FULL, COACHING, MONITOR
      } // set collection values


      newCall.queue = utils.processResponseCollection(notification, 'ui_notification', 'gate')[0];
      newCall.agentRecording = utils.processResponseCollection(notification, 'ui_notification', 'agent_recording', 'agentRecording')[0];
      newCall.outdialDispositions = utils.processResponseCollection(notification, 'ui_notification', 'outdial_dispositions', 'disposition')[0];
      newCall.requeueShortcuts = utils.processResponseCollection(notification, 'ui_notification', 'requeue_shortcuts', 'requeueShortcut')[0] || [];
      newCall.baggage = utils.processResponseCollection(notification, 'ui_notification', 'baggage')[0];
      newCall.surveyResponse = utils.processResponseCollection(notification, 'ui_notification', 'survey_response', 'detail')[0];
      newCall.scriptResponse = {};
      newCall.transferPhoneBook = utils.processResponseCollection(notification, 'ui_notification', 'transfer_phone_book')[0];
      newCall.lead = utils.processResponseCollection(notification, 'ui_notification', 'lead')[0]; // parse extra data correctly

      try {
        if (notif.lead && notif.lead.extra_data) {
          delete newCall.lead.extraDatas;
          newCall.lead.extraData = {};

          for (var key in notif.lead.extra_data) {
            newCall.lead.extraData[key] = notif.lead.extra_data[key]['#text'];
          }
        }
      } catch (e) {
        console.warn("error parsing new call lead extra data: ".concat(e));
      }

      if (newCall.baggage) {
        // process custom labels correctly
        newCall.baggage.customLabels = {};
        var notifLabels = notif.baggage.custom_labels;

        for (var key in notifLabels) {
          var result = '';

          if (notifLabels && notifLabels[key] && notifLabels[key]['#text']) {
            result = notifLabels[key]['#text'];
          }

          newCall.baggage.customLabels[key] = result;
        }
      } // set saved script response if present


      try {
        var savedModel = JSON.parse(notif.script_result['#text']).model;
        var results = {};
        var keys = Object.keys(savedModel);

        for (var idx = 0; idx < keys.length; idx++) {
          var key = keys[idx];
          var value = savedModel[key].value;
          results[key] = value;
        }

        newCall.scriptResponse = results;
      } catch (err) {} // fix phonebook format


      if (newCall.transferPhoneBook && newCall.transferPhoneBook.entrys) {
        newCall.transferPhoneBook = newCall.transferPhoneBook.entrys;
      } // fix requeue shortcuts


      if (newCall.requeueShortcuts && newCall.requeueShortcuts.requeueShortcuts) {
        newCall.requeueShortcuts = newCall.requeueShortcuts.requeueShortcuts;
      } // if only one disposition, convert to array


      if (newCall.outdialDispositions && newCall.outdialDispositions.disposition) {
        newCall.outdialDispositions.dispositions = [newCall.outdialDispositions];
      } // convert numbers to boolean where applicable


      newCall.queue.isCampaign = newCall.queue.isCampaign === '1';

      if (newCall.outdialDispositions && newCall.outdialDispositions.dispositions) {
        for (var d = 0; d < newCall.outdialDispositions.dispositions.length; d++) {
          var disp = newCall.outdialDispositions.dispositions[d];
          disp.isComplete = disp.isComplete === '1';
          disp.requireNote = disp.requireNote === '1';
          disp.saveSurvey = disp.saveSurvey === '1';
          disp.xfer = disp.xfer === '1';
          disp.isDefault = disp.isDefault === '1';
        }
      } // Build token map


      model.callTokens = buildCallTokenMap(notif, newCall);
      newCall.baggage = model.callTokens; // add all tokens to baggage
      // Is Monitoring Call?

      if (newCall.isMonitoring) {
        model.agentSettings.callState = 'ACTIVE-MONITORING';
      } else {
        model.agentSettings.callState = 'ACTIVE'; // check for preloaded transfer number

        if (newCall.baggage && newCall.baggage.auxPhone != '') {
          model.transferNumber = newCall.baggage.auxPhone;
        }
      } // Reset the current call counter for Agent Daily Stats


      model.agentDailyStats.currCallTime = 0; // todo handle scripting??

      model.currentCall = newCall;
      return newCall;
    };

    function buildCallTokenMap(notif, newCall) {
      var model = UIModel.getInstance();
      var tokens = newCall.baggage || {}; // seed with baggage values

      if (notif.baggage && notif.baggage.generic_key_value_pairs) {
        var keyValuePairs = [];
        var keyValuePairsStr = utils.getText(notif.baggage, 'generic_key_value_pairs');

        if (keyValuePairsStr.length > 0) {
          keyValuePairs = utils.parseKeyValuePairsFromString(keyValuePairsStr, '|', '::');
        }

        for (var keyValue in keyValuePairs) {
          tokens[keyValue] = keyValuePairs[keyValue];
        }
      }

      tokens.ani = newCall.ani;
      tokens.dnis = newCall.dnis;
      tokens.uii = newCall.uii;

      try {
        if (newCall.queue.number) {
          tokens.sourceId = newCall.queue.number || '';
          tokens.sourceName = newCall.queue.name || '';
          tokens.sourceDesc = newCall.queue.description || '';

          if (newCall.queue.isCampaign === '1' || newCall.queue.isCampaign === true) {
            tokens.sourceType = 'OUTBOUND';
          } else {
            tokens.sourceType = 'INBOUND';
          }
        } else {
          tokens.sourceId = '0';
          tokens.sourceType = 'MANUAL';
          tokens.sourceName = '';
          tokens.sourceDesc = '';
        }
      } catch (any) {
        console.error('There was an error processing source tokenization', +any);
      }

      try {
        tokens.agentFirstName = model.agentSettings.firstName;
        tokens.agentLastName = model.agentSettings.lastName;
        tokens.agentExternalId = model.agentSettings.externalAgentId;
        tokens.agentType = model.agentSettings.agentType;
        tokens.agentEmail = model.agentSettings.email;
        tokens.agentUserName = model.agentSettings.username;
      } catch (any) {
        console.error('There was an error parsing tokens for agent info. ', any);
      }

      return tokens;
    }

    function isCampaign(gate) {
      if (gate && gate.isCampaign) {
        return gate.isCampaign === '1' || gate.isCampaign === true;
      }

      return false;
    }

    var PendingChatDispNotification = function PendingChatDispNotification() {};
    /*
     * This class is responsible for handling a generic notification
     *
     *  {
     *       "ui_notification":{
     *           "@message_id":"IQD01DEV2018062912352800014",
     *           "@type":"PENDING_CHAT_DISP",
     *           "agent_id":{ "#text":"1182160" },
     *           "uii":{ "#text":"201806291234550147950000000000" },
     *           "status":{ "#text":"false" }
     *       }
     *   }
     */


    PendingChatDispNotification.prototype.processResponse = function (notification) {
      var formattedResponse = {};
      formattedResponse.agentId = utils.getText(notification.ui_notification, 'agent_id');
      formattedResponse.uii = utils.getText(notification.ui_notification, 'uii');
      formattedResponse.status = utils.getText(notification.ui_notification, 'status') === 'true';
      return formattedResponse;
    };

    var PendingDispNotification = function PendingDispNotification() {};
    /*
     * This class is responsible for handling a generic notification
     *
     * {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016080317400400011",
     *          "@type":"PENDING_DISP",
     *          "agent_id":{"#text":"3"},
     *          "status":{"#text":"false"}
     *      }
     * }
     */


    PendingDispNotification.prototype.processResponse = function (notification) {
      var formattedResponse = {};
      formattedResponse.agentId = utils.getText(notification.ui_notification, 'agent_id');
      formattedResponse.status = utils.getText(notification.ui_notification, 'status');
      return formattedResponse;
    };

    var PreviewLeadStateNotification = function PreviewLeadStateNotification() {};
    /*
     * This class is responsible for processing the lead state packet
     * received from intelliqueue. It will decide what type of leads are
     * being processed, and depending on if the callback is true or false, it will
     * call the appropriate form to update the lead state.
     *
     * {
     *      "ui_notification":{
     *          "@type":"PREVIEW-LEAD-STATE",
     *          "@call_type":"MANUAL|PREVIEW",
     *          "@message_id":"IQ10012016092715393600184",
     *          "request_id":{"#text":"IQ10012016092715390900179"},
     *          "lead_state":{"#text":"ANSWER"},
     *          "callback":{"#text":"FALSE"}
     *      }
     *   }
     * }
     */


    PreviewLeadStateNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      UIModel.getInstance().agentSettings.onManualOutdial = true;
      var response = {
        callType: notif['@call_type'],
        messageId: notif['@message_id'],
        requestId: utils.getText(notif, 'request_id'),
        leadState: utils.getText(notif, 'lead_state'),
        callback: utils.getText(notif, 'callback')
      };
      return response;
    };

    var ReverseMatchNotification = function ReverseMatchNotification() {};
    /*
     * This class is responsible for processing a REVERSE_MATCH packet from IQ. It
     * will log the packet was rec'd, save the packet to the UIModel for use by
     * components like the WhosCallingForm
     * {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016080317400400011",
     *          "@response_to":"1c2fe39f-a31e-aff8-8d23-92a61c88270f",
     *          "@type":"REVERSE_MATCH",
     *          "first_name":{"#text":""},
     *          "mid_name":{"#text":""},
     *          "last_name":{"#text":""},
     *          "address1":{"#text":""},
     *          "address2":{"#text":""},
     *          "city":{"#text":""},
     *          "state":{"#text":""},
     *          "zip":{"#text":""},
     *          "business_name":{"#text":""}
     *      }
     * }
     */


    ReverseMatchNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      var model = UIModel.getInstance();
      model.tokens.first_name = utils.getText(notif, 'first_name');
      model.tokens.mid_name = utils.getText(notif, 'mid_name');
      model.tokens.last_name = utils.getText(notif, 'last_name');
      model.tokens.address1 = utils.getText(notif, 'address1');
      model.tokens.address2 = utils.getText(notif, 'address2');
      model.tokens.suffix = utils.getText(notif, 'suffix');
      model.tokens.title = utils.getText(notif, 'title');
      model.tokens.city = utils.getText(notif, 'city');
      model.tokens.state = utils.getText(notif, 'state');
      model.tokens.zip = utils.getText(notif, 'zip');
      model.tokens.business_name = utils.getText(notif, 'business_name');
      return model.tokens;
    };

    var TcpaSafeLeadStateNotification = function TcpaSafeLeadStateNotification() {};
    /*
     * This class is responsible for processing the lead state packet
     * received from intelliqueue. It will decide what type of leads are
     * being processed, and depending on if the callback is true or false, it will
     * call the appropriate form to update the lead state.
     *
     * {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016080317400400011",
     *          "@type":"TCPA-SAFE-LEAD-STATE",
     *          "@call_type":"MANUAL|TCPA-SAFE",
     *          "request_id":{"#text":""},
     *          "lead_state":{"#text":"CALLING"},
     *          "callback":{"#text":"false"}
     *      }
     * }
     */


    TcpaSafeLeadStateNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      var response = {
        callType: notif['@call_type'],
        messageId: notif['@message_id'],
        requestId: utils.getText(notif, 'request_id'),
        leadState: utils.getText(notif, 'lead_state'),
        callback: utils.getText(notif, 'callback')
      };
      return response;
    };

    var AckRequest = function AckRequest(audioType, agentId, uii, monitorAgentId) {
      this.audioType = audioType || 'FULL';
      this.agentId = agentId;
      this.uii = uii;
      this.monitorAgentId = monitorAgentId;
    };
    /*
     * This class processes ACK packets rec'd from IQ.
     * This is a callback triggered by certain actions like
     * sending dispositions or script results.
     * NOTE: uii is added in utils message processing.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008090317393001252",
     *      "@response_to":"1112222",
     *      "@type":"ACK",
     *      "type":{"#text":"CHAT-DISPOSITION|INBOUND-DISPOSITION|OUTDIAL-DISPOSITION|SCRIPT-RESULT"},
     *      "status":{"#text":"OK|FAILURE"},
     *      "message":{"#text":""},
     *      "detail":{}
     *    }
     * }
     */


    AckRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.type = utils.getText(resp, 'type');

      if (formattedResponse.status === 'OK') {
        utils.logMessage(LOG_LEVELS.DEBUG, formattedResponse.message, response);
      } else {
        utils.logMessage(LOG_LEVELS.WARN, "".concat(formattedResponse.message, ": ").concat(formattedResponse.detail), response);
      }

      return formattedResponse;
    };

    var AgentStateRequest = function AgentStateRequest(agentState, agentAuxState) {
      if (agentState.toUpperCase() == 'ON-BREAK' && UIModel.getInstance().onCall == true) {
        this.agentState = 'BREAK-AFTER-CALL';
        this.agentAuxState = '';
      } else {
        this.agentState = agentState.toUpperCase() || '';
        this.agentAuxState = agentAuxState || '';
      }
    };

    AgentStateRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.AGENT_STATE,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          state: {
            '#text': this.agentState
          },
          agent_aux_state: {
            '#text': this.agentAuxState
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes AGENT-STATE packets rec'd from IQ. It will check the state of the
     * packet and then set the state on the model. It will also check for deferred surveys,
     * if one is found it will load it at this point.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082817165103294",
     *      "@type":"AGENT-STATE",
     *      "status":{"#text":"OK"},
     *      "message":{},
     *      "detail":{},
     *      "agent_id":{"#text":"1856"},
     *      "prev_state":{"#text":"ENGAGED"},
     *      "current_state":{"#text":"WORKING"},
     *      "agent_aux_state":{"#text":"Offhook Work"},
     *      "prev_aux_state":{}
     *   }
     * }
     */


    AgentStateRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var status = utils.getText(resp, 'status');
      var prevState = utils.getText(resp, 'prev_state');
      var currState = utils.getText(resp, 'current_state');
      var prevAuxState = utils.getText(resp, 'prev_aux_state');
      var currAuxState = utils.getText(resp, 'agent_aux_state');
      var model = UIModel.getInstance(); // add message and detail if present

      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.agentId = response.ui_response.agent_id['#text'] || '';
      formattedResponse.previousState = prevState;
      formattedResponse.currentState = currState;
      formattedResponse.previousAuxState = prevAuxState;
      formattedResponse.currentAuxState = currAuxState;

      if (status == 'OK') {
        var prevStateStr = prevState;
        var currStateStr = currState;

        if (prevAuxState.length > 0) {
          prevStateStr = prevAuxState;
        }

        if (currAuxState.length > 0) {
          currStateStr = currAuxState;
        } // Update the state in the UIModel


        model.agentSettings.currentState = currState;
        model.agentSettings.currentStateLabel = currAuxState;
        model.agentStatePacket = response;
      } else {
        if (formattedResponse.message === '') {
          formattedResponse.message = 'Unable to change agent state';
        } // log message response


        var message = "Unable to change agent state. ".concat(formattedResponse.detail);
        utils.logMessage(LOG_LEVELS.WARN, message, response);
      }

      return formattedResponse;
    };

    var AuthenticateRequest = function AuthenticateRequest(config) {
      this.username = config.username;
      this.password = config.password;
      this.platformId = config.platformId;
      this.rcAccessToken = config.rcAccessToken;
      this.tokenType = config.tokenType;
      this.engageAccessToken = config.engageAccessToken;
      this.authType = config.authType;
    };

    AuthenticateRequest.prototype.sendHttpRequest = function () {
      UIModel.getInstance().authenticateRequest = this;

      switch (this.authType) {
        case AUTHENTICATE_TYPES.USERNAME_PASSWORD:
          _buildHttpRequest(this.authType, 'login/agent', {
            username: this.username,
            password: this.password,
            platformId: this.platformId
          });

          break;

        case AUTHENTICATE_TYPES.RC_TOKEN:
          _buildHttpRequest(this.authType, 'login/rc/accesstoken', {
            rcAccessToken: this.rcAccessToken,
            rcTokenType: this.tokenType
          });

          break;

        case AUTHENTICATE_TYPES.ENGAGE_TOKEN:
          _buildHttpRequest(this.authType, 'login', {});

          break;
      }
    };
    /*
     * response:
     * {
     *   "refreshToken": "223867e6-ad0f-4af1-bbe7-5090d8259065",
     *   "accessToken": "",
     *   "tokenType": "Bearer",
     *   "platformId": "local",
     *   "iqUrl": "d01-dev.vacd.biz",
     *   "port": 8080,
     *   "agentDetails": [
     *       {
     *           "agentId": 1,
     *           "firstName": "D",
     *           "lastName": "LB",
     *           "email": "dlb@somewhere.com",
     *           "username": "dlbooks"
     *       }
     *   ],
     *   "adminId": null,
     *   "mainAccountId": "99990000"
     * }
     */


    AuthenticateRequest.prototype.processResponse = function (response) {
      var model = UIModel.getInstance();
      model.authenticatePacket = response; // raw response packet

      model.authenticateRequest.accessToken = response.accessToken; // TODO - dlb - store in local storage

      model.authenticateRequest.refreshToken = response.refreshToken;
      model.authenticateRequest.tokenType = response.tokenType;
      model.authenticateRequest.socketUrl = response.iqUrl;
      model.authenticateRequest.socketPort = response.port;
      model.authenticateRequest.agents = response.agentDetails;
      model.authenticateRequest.platformId = response.platformId;
      return model.authenticateRequest;
    };

    function _buildHttpRequest(authType, path, queryParams) {
      var model = UIModel.getInstance();
      var baseUrl = model.authHost + model.baseAuthUri;
      var params = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      switch (authType) {
        case AUTHENTICATE_TYPES.USERNAME_PASSWORD:
        case AUTHENTICATE_TYPES.RC_TOKEN:
          params.queryParams = queryParams;
          var errorMsg = "Error on agent authenticate POST to engage-auth. URL: ".concat(baseUrl).concat(path);
          new HttpService(baseUrl).httpPost(path, params).then(function (response) {
            try {
              response = JSON.parse(response.response);
              var authenticateResponse = UIModel.getInstance().authenticateRequest.processResponse(response);
              utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.AUTHENTICATE, authenticateResponse);
            } catch (err) {
              utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
            }
          }, function (err) {
            var errResponse = {
              type: 'Authenticate Error',
              message: errorMsg
            };
            utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
            utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.AUTHENTICATE, errResponse);
          });
          break;

        case AUTHENTICATE_TYPES.ENGAGE_TOKEN:
          var errMsg = "Error on agent authenticate GET to engage-auth. URL: ".concat(baseUrl).concat(path);
          params.headers.Authorization = "Bearer ".concat(utils.toString(UIModel.getInstance().authenticateRequest.engageAccessToken));
          new HttpService(baseUrl).httpGet(path, params).then(function (response) {
            try {
              response = JSON.parse(response.response);
              var authenticateResponse = UIModel.getInstance().authenticateRequest.processResponse(response);
              utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.AUTHENTICATE, authenticateResponse);
            } catch (err) {
              utils.logMessage(LOG_LEVELS.WARN, errMsg, err);
            }
          }, function (err) {
            utils.logMessage(LOG_LEVELS.WARN, errMsg, err);
            utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.AUTHENTICATE, err);
          });
          break;
      }
    }

    var BargeInRequest = function BargeInRequest(audioType, agentId, uii, monitorAgentId) {
      this.audioType = audioType || 'FULL';
      this.agentId = agentId;
      this.uii = uii;
      this.monitorAgentId = monitorAgentId;
    };
    /*
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UIV22008931055822",
     *      "@response_to":"",
     *      "@type":"BARGE-IN",
     *      "agent_id":{"#text":"94"},
     *      "uii":{"#text":"200809031054510000000900020961"},
     *      "audio_state":{"#text":"FULL"},
     *      "monitor_agent_id":{"#text":"1856"}
     *    }
     * }
     */


    BargeInRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.BARGE_IN,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(this.agentId)
          },
          uii: {
            '#text': utils.toString(this.uii)
          },
          audio_state: {
            '#text': utils.toString(this.audioType)
          },
          monitor_agent_id: {
            '#text': utils.toString(this.monitorAgentId)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes BARGE-IN packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008090317393001252",
     *      "@response_to":"",
     *      "@type":"BARGE-IN",
     *      "agent_id":{"#text":"94"},
     *      "uii":{},
     *      "status":{"#text":"OK"},
     *      "message":{"#text":"Barge-In processed successfully!"},
     *      "detail":{}
     *    }
     * }
     */


    BargeInRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.agentId = utils.getText(resp, 'agent_id');
      formattedResponse.uii = utils.getText(resp, 'uii');

      if (formattedResponse.status === 'OK') {
        utils.logMessage(LOG_LEVELS.DEBUG, formattedResponse.message, response);
      } else {
        utils.logMessage(LOG_LEVELS.WARN, "There was an error processing the Barge-In request. ".concat(formattedResponse.detail), response);
      }

      return formattedResponse;
    };

    var CallNotesRequest = function CallNotesRequest(notes) {
      this.notes = notes;
    };
    /*
     * This event is responsible for allowing an agent to tag a call with notes
     */


    CallNotesRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@message_id': utils.getMessageId(),
          response_to: '',
          '@type': MESSAGE_TYPES.CALL_NOTES,
          agent_id: {
            '#text': utils.toString(model.agentSettings.agentId)
          },
          uii: {
            '#text': utils.toString(model.currentCall.uii)
          },
          notes: {
            '#text': utils.toString(this.notes)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class process CALL-NOTES packets rec'd from IntelliQueue.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082817165103294",
     *      "@type":"CALL-NOTES",
     *      "status":{"#text":"OK"},
     *      "message":{},
     *      "detail":{}
     *   }
     * }
     */


    CallNotesRequest.prototype.processResponse = function (response) {
      var formattedResponse = utils.buildDefaultResponse(response);

      if (formattedResponse.status === 'OK') {
        formattedResponse.message = 'Call notes have been updated.';
        formattedResponse.type = 'INFO_EVENT';
      } else {
        formattedResponse.type = 'ERROR_EVENT';
        formattedResponse.message = 'Unable to update notes.';
      }

      return formattedResponse;
    };

    var CallbackCancelRequest = function CallbackCancelRequest(leadId, agentId) {
      this.agentId = agentId || UIModel.getInstance().agentSettings.agentId;
      this.leadId = leadId;
    };

    CallbackCancelRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CALLBACK_CANCEL,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': this.agentId
          },
          lead_id: {
            '#text': this.leadId
          }
        }
      };
      return JSON.stringify(msg);
    }; // NOTE: cancel callback response sent as a generic notification message


    var CallbacksPendingRequest = function CallbacksPendingRequest(agentId) {
      this.agentId = agentId || UIModel.getInstance().agentSettings.agentId;
    };

    CallbacksPendingRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CALLBACK_PENDING,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': this.agentId
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling an PENDING-CALLBACKS response packet from IntelliQueue.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008091512353000875",
     *      "@response_to":"UIV220089151235539",
     *      "@type":"PENDING-CALLBACKS",
     *      "lead":{
     *          "@aux_data1":"",
     *          "@aux_data2":"",
     *          "@aux_data3":"",
     *          "@aux_data4":"",
     *          "@aux_data5":"",
     *          "@destination":"5555555555",
     *          "@dial_group_id":"",
     *          "@dial_group_name":"",
     *          "@dial_time":"2016-08-03 10:00",
     *          "@extern_id":"",
     *          "@lead_id":"",
     *          "lead_id":{},
     *          "extern_id":{},
     *          "extern_id":{},
     *          "first_name":{},
     *          "mid_name":{},
     *          "last_name":{},
     *          "suffix":{},
     *          "title":{},
     *          "address1":{},
     *          "address2":{},
     *          "city":{},
     *          "state":{},
     *          "zip":{},
     *          "gate_keeper":{}
     *      }
     *   }
     * }
     */


    CallbacksPendingRequest.prototype.processResponse = function (response) {
      var leadsRaw = response.ui_response.lead;
      var leads = [];

      if (!Array.isArray(leadsRaw)) {
        leadsRaw = [leadsRaw];
      }

      for (var l = 0; l < leadsRaw.length; l++) {
        var leadRaw = leadsRaw[l];

        if (leadRaw == null) {
          continue;
        }

        leads.push(parseLead(leadRaw));
      }

      UIModel.getInstance().agentSettings.pendingCallbacks = JSON.parse(JSON.stringify(leads));
      return UIModel.getInstance().agentSettings.pendingCallbacks;
    };

    function parseLead(leadRaw) {
      var lead = {
        auxData1: leadRaw['@aux_data1'],
        auxData2: leadRaw['@aux_data2'],
        auxData3: leadRaw['@aux_data3'],
        auxData4: leadRaw['@aux_data4'],
        auxData5: leadRaw['@aux_data5'],
        destination: leadRaw['@destination'],
        dialGroupId: leadRaw['@dial_group_id'],
        dialGroupName: leadRaw['@dial_group_name'],
        dialTime: leadRaw['@dial_time'],
        externId: leadRaw['@extern_id'],
        leadId: leadRaw['@lead_id'],
        firstName: utils.getText(leadRaw, 'first_name'),
        midName: utils.getText(leadRaw, 'mid_name'),
        lastName: utils.getText(leadRaw, 'last_name'),
        sufix: utils.getText(leadRaw, 'suffix'),
        title: utils.getText(leadRaw, 'title'),
        address1: utils.getText(leadRaw, 'address1'),
        address2: utils.getText(leadRaw, 'address2'),
        city: utils.getText(leadRaw, 'city'),
        state: utils.getText(leadRaw, 'state'),
        zip: utils.getText(leadRaw, 'zip'),
        gateKeeper: utils.getText(leadRaw, 'gate_keeper')
      };
      return lead;
    }
    /*
     * This request is used to get the list of dispositions for a given campaign
     * E.g. in the lead search form for manual passes
     *
     */


    var CampaignDispositionsRequest = function CampaignDispositionsRequest(campaignId) {
      this.agentId = UIModel.getInstance().agentSettings.agentId;
      this.campaignId = campaignId;
    };

    CampaignDispositionsRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CAMPAIGN_DISPOSITIONS,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': utils.toString(this.agentId)
          },
          campaign_id: {
            '#text': utils.toString(this.campaignId)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling CAMPAIGN-DISPOSITIONS packets received
     * from IntelliQueue. It will save a copy of it in the UIModel.
     *
     * {"ui_response":{
     *      "@campaign_id":"60403",
     *      "@message_id":"IQ10012016081813480400006",
     *      "@response_to":"0b61c3ca-c4fc-9942-c139-da4978053c9d",
     *      "@type":"CAMPAIGN-DISPOSITIONS",
     *      "outdial_dispositions":{
     *          "disposition":[
     *              {"@disposition_id":"1","#text":"requeue"},
     *              {"@disposition_id":"2","#text":"complete"}
     *          ]
     *       }
     *    }
     * }
     */


    CampaignDispositionsRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var model = UIModel.getInstance();
      var dispositions = utils.processResponseCollection(resp, 'outdial_dispositions', 'disposition', 'disposition');
      model.outboundSettings.campaignDispositions = dispositions;
      return dispositions;
    };

    var ChatStateRequest = function ChatStateRequest(chatState) {
      this.chatState = chatState && chatState.toUpperCase() || '';
    };

    ChatStateRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_STATE,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          state: {
            '#text': this.chatState
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes CHAT-STATE packets rec'd from IQ. It will check the state of the
     * packet and then set the state on the model.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082817165103294",
     *      "@type":"AGENT-STATE",
     *      "status":{"#text":"OK"},
     *      "message":{},
     *      "detail":{},
     *      "agent_id":{"#text":"1856"},
     *      "prev_state":{"#text":"CHAT-PRESENTED"},
     *      "current_state":{"#text":"CHAT-ENGAGED"}
     *   }
     * }
     */


    ChatStateRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var status = utils.getText(resp, 'status');
      var prevState = utils.getText(resp, 'prev_state');
      var currState = utils.getText(resp, 'current_state');
      var model = UIModel.getInstance(); // add message and detail if present

      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.agentId = response.ui_response.agent_id['#text'] || '';
      formattedResponse.previousState = prevState;
      formattedResponse.currentState = currState;

      if (status == 'OK') {
        // Update the state in the UIModel
        model.agentSettings.currentChatState = currState;
        model.chatStatePacket = response;
      } else {
        if (formattedResponse.message === '') {
          formattedResponse.message = 'Unable to change chat state';
        } // log message response


        var message = "Unable to change chat state. ".concat(formattedResponse.detail);
        utils.logMessage(LOG_LEVELS.WARN, message, response);
      }

      return formattedResponse;
    };

    var XferColdRequest = function XferColdRequest(dialDest, callerId, sipHeaders, countryId) {
      this.dialDest = dialDest;
      this.callerId = callerId || '';
      this.sipHeaders = sipHeaders || [];
      this.countryId = countryId || '';
    };

    XferColdRequest.prototype.formatJSON = function () {
      var fields = [];

      for (var i = 0; i < this.sipHeaders.length; i++) {
        var fieldObj = this.sipHeaders[i];
        fields.push({
          '@name': utils.toString(fieldObj.name),
          '@value': utils.toString(fieldObj.value)
        });
      }

      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.XFER_COLD,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          uii: {
            '#text': UIModel.getInstance().currentCall.uii
          },
          dial_dest: {
            '#text': utils.toString(this.dialDest)
          },
          caller_id: {
            '#text': utils.toString(this.callerId)
          },
          country_id: {
            '#text': utils.toString(this.countryId)
          },
          xfer_header: fields
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes COLD-XFER packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ10012016082314475000219",
     *      "@response_to":"",
     *      "@type":"COLD-XFER",
     *      "agent_id":{"#text":"1"},
     *      "uii":{"#text":"201608231447590139000000000200"},
     *      "session_id":{"#text":"3"},
     *      "status":{"#text":"OK"},
     *      "dial_dest":{"#text":"3038593775"},
     *      "message":{"#text":"OK"},
     *      "detail":{}
     *   }
     * }
     */


    XferColdRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.agentId = utils.getText(resp, 'agent_id');
      formattedResponse.uii = utils.getText(resp, 'uii');
      formattedResponse.sessionId = utils.getText(resp, 'session_id');
      formattedResponse.dialDest = utils.getText(resp, 'dial_dest');

      if (formattedResponse.status === 'OK') {} else {
        // log message response
        var message = "There was an error processing the Cold Xfer request. ".concat(formattedResponse.message, " : ").concat(formattedResponse.detail);
        utils.logMessage(LOG_LEVELS.WARN, message, response);
      }

      return formattedResponse;
    };

    var DirectAgentTransfer = function DirectAgentTransfer(targetAgentId, transferType, uii) {
      this.targetAgentId = targetAgentId;
      this.transferType = transferType;
      this.uii = uii || UIModel.getInstance().currentCall.uii;
    };

    DirectAgentTransfer.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.DIRECT_AGENT_TRANSFER,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(model.agentSettings.agentId)
          },
          uii: {
            '#text': utils.toString(this.uii)
          },
          target_agent_id: {
            '#text': utils.toString(this.targetAgentId)
          },
          transfer_type: {
            '#text': utils.toString(this.transferType)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes DIRECT-AGENT-TRANSFER packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ10012016082314475000219",
     *      "@response_to":"",
     *      "@type":"DIRECT-AGENT-TRANSFER",
     *      "status":{"#text":"OK"},
     *      "message":{"#text":"OK"},
     *      "type":{"#text":"WARM|COLD|CANCEL"}
     *   }
     * }
     */


    DirectAgentTransfer.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.type = utils.getText(resp, 'type');

      if (formattedResponse.status !== 'OK') {
        // log message response
        var message = "There was an error processing the Direct Agent Transfer request. ".concat(formattedResponse.message, " : ").concat(formattedResponse.detail);
        utils.logMessage(LOG_LEVELS.WARN, message, response);
      }

      return formattedResponse;
    };

    var DirectAgentTransferList = function DirectAgentTransferList() {};

    DirectAgentTransferList.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.DIRECT_AGENT_TRANSFER_LIST,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes DIRECT-AGENT-TRANSFER-LIST packets rec'd from IQ.
     *
     *  {
     *      "ui_response":{
     *          "@message_id":"IQD01DEV2018052917202600038",
     *          "@response_to":"f0b2e8a3-87fe-13ee-4d00-9d145bfe2be8",
     *          "@type":"DIRECT-AGENT-TRANSFER-LIST",
     *          "status":{
     *              "#text":"true"
     *          },
     *          "message":{
     *              "#text":"OK"
     *          },
     *          "agents": [
     *             {
     *                 "@agent_aux_state":"AVAILABLE",
     *                 "@agent_id":"1184160",
     *                 "@agent_state":"AVAILABLE",
     *                 "@available":"true",
     *                 "@first_name":"ross",
     *                 "@last_name":"m",
     *                 "@pending_disp":"false",
     *                 "@state_duration":"379",
     *                 "@username":"rm1"
     *             },
     *             {
     *                 "@agent_aux_state":"AVAILABLE",
     *                 "@agent_id":"1184161",
     *                 "@agent_state":"AVAILABLE",
     *                 "@available":"true",
     *                 "@first_name":"ross",
     *                 "@last_name":"m",
     *                 "@pending_disp":"false",
     *                 "@state_duration":"84",
     *                 "@username":"rm2"
     *             }
     *         ]
     *      }
     *  }
     */


    DirectAgentTransferList.prototype.processResponse = function (response) {
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.agents = utils.processResponseCollection(response, 'ui_response', 'agents');

      if (formattedResponse.status !== 'OK') {
        // log message response
        var message = "There was an error processing the Direct Agent Transfer List request. ".concat(formattedResponse.message, " : ").concat(formattedResponse.detail);
        utils.logMessage(LOG_LEVELS.WARN, message, response);
      }

      return formattedResponse;
    };

    var DispositionRequest = function DispositionRequest(uii, dispId, notes, callback, callbackDTS, contactForwardNumber, survey, externId, leadId, requestId) {
      this.uii = uii;
      this.dispId = dispId;
      this.notes = notes;
      this.callback = callback;
      this.callbackDTS = callbackDTS || '';
      this.contactForwardNumber = contactForwardNumber || null;
      this.externId = externId || null; // outbound-disposition only

      this.leadId = leadId || null; // outbound-disposition only

      this.requestId = requestId || null; // outbound-disposition only (pipe leads)

      /*
       * survey = {
       *      first_name: {
       *          leadField: "first_name"
       *          value: "Geoff"
       *      },
       *      last_name: {
       *          leadField: "last_name"
       *          value: "Mina"
       *      }
       *      ...
       * }
       */

      this.survey = survey || null;
    };
    /*
     * This class is responsible for creating an inbound or outbound disposition packet to
     * send to intelliqueue. It will grab uii and agent_id directly from packets saved
     * in the UIModel. Then, using the information passed in, it will
     * create the remainder of the packet. This class is called from the ExtendedCallForm
     *
     * {"ui_request":{
     *      "@message_id":"IQ20160817145840132",
     *      "@response_to":"",
     *      "@type":"OUTDIAL-DISPOSITION|INBOUND-DISPOSITION",
     *      "session_id":{"#text":"2"},  <-- ONLY WHEN AVAILABLE otherwise the node is left blank. this is the AGENT session_id
     *      "uii":{"#text":"201608171658440139000000000165"},
     *      "agent_id":{"#text":"1180958"},
     *      "lead_id":{"#text":"1800"},                 <-- OUTDIAL-DISPOSITION ONLY
     *      "outbound_externid":{"#text":"3038593775"}, <-- OUTDIAL-DISPOSITION ONLY
     *      "pending_request_id":{"#text":""},          <-- OUTDIAL-DISPOSITION ONLY
     *      "disposition_id":{"#text":"5950"},
     *      "notes":{"#text":"note here"},
     *      "call_back":{"#text":"FALSE"},
     *      "call_back_DTS":{},
     *      "contact_forwarding":{},
     *      "survey":{
     *          "response":[
     *              {"@extern_id":"text_box","@lead_update_column":"","#text":"hello"},
     *              {"@extern_id":"check_box","@lead_update_column":"","#text":"20"},
     *              {"@extern_id":"radio_save","@lead_update_column":"","#text":"23"}
     *          ]
     *      }
     *   }
     * }
     */


    DispositionRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          '@type': MESSAGE_TYPES.OUTDIAL_DISPOSITION,
          agent_id: {
            '#text': utils.toString(model.agentSettings.agentId)
          },
          session_id: {
            '#text': ''
          },
          uii: {
            '#text': utils.toString(this.uii)
          },
          disposition_id: {
            '#text': utils.toString(this.dispId)
          },
          notes: {
            '#text': utils.toString(this.notes)
          },
          call_back: {
            '#text': this.callback === true ? 'TRUE' : 'FALSE'
          },
          call_back_DTS: {
            '#text': utils.toString(this.callbackDTS)
          },
          contact_forwarding: {
            '#text': utils.toString(this.contactForwardNumber)
          },
          outbound_externid: {
            '#text': utils.toString(this.externId)
          },
          lead_id: {
            '#text': utils.toString(this.leadId)
          },
          pending_request_id: {
            '#text': utils.toString(this.requestId)
          }
        }
      };

      if (model.currentCall.outdialDispositions && model.currentCall.outdialDispositions.type === 'GATE') {
        msg.ui_request['@type'] = MESSAGE_TYPES.INBOUND_DISPOSITION;
      }

      if (model.currentCall.sessionId) {
        msg.ui_request.session_id = {
          '#text': model.currentCall.sessionId
        };
      }
      /*
       * converts survey to this response
       * survey : {
       *      response: [
       *          { "@extern_id":"", "@lead_update_column":"", "#text":"" }
       *      ]
       * }
       */


      if (this.survey !== null) {
        var response = [];
        var keys = Object.keys(this.survey);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var obj = {
            '@extern_id': key,
            '@lead_update_column': utils.toString(this.survey[key].leadField),
            '#text': utils.toString(this.survey[key].value)
          };
          response.push(obj);
        }

        msg.ui_request.survey = {
          response: response
        };
      }

      return JSON.stringify(msg);
    };

    var DispositionManualPassRequest = function DispositionManualPassRequest(dispId, notes, callback, callbackDTS, leadId, requestId, externId) {
      this.dispId = dispId;
      this.notes = notes;
      this.callback = callback;
      this.callbackDTS = callbackDTS || '';
      this.leadId = leadId || null;
      this.requestId = requestId || null;
      this.externId = externId || null;
    };
    /*
     * Sends an OUTDIAL-DISPOSITION request, just a separate class
     * specifically for dispositions on manual pass.
     *
     * {"ui_request":{
     *      "@message_id":"UIV220089241119416",
     *      "@response_to":"",
     *      "@type":"OUTDIAL-DISPOSITION",
     *      "manual_disp":{"#text":"TRUE"},
     *      "request_key":{"#text":"IQ10012016081719070100875"},
     *      "session_id":{},
     *      "uii":{},
     *      "agent_id":{"#text":"1810"},
     *      "lead_id":{"#text":"213215"},
     *      "outbound_externid":{"#text":"909809"},
     *      "disposition_id":{"#text":"126"},
     *      "notes":{"#text":"here are my notes :)"},
     *      "call_back":{"#text":"TRUE | FALSE"},
     *      "call_back_DTS":{"#text":"2008-09-30 22:30:00 | null"},
     *      "contact_forwarding":{"#text":"null"}
     *    }
     * }
     */


    DispositionManualPassRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          '@type': MESSAGE_TYPES.OUTDIAL_DISPOSITION,
          manual_disp: {
            '#text': 'TRUE'
          },
          agent_id: {
            '#text': utils.toString(model.agentSettings.agentId)
          },
          request_key: {
            '#text': utils.toString(this.requestId)
          },
          disposition_id: {
            '#text': utils.toString(this.dispId)
          },
          notes: {
            '#text': utils.toString(this.notes)
          },
          call_back: {
            '#text': this.callback === true ? 'TRUE' : 'FALSE'
          },
          call_back_DTS: {
            '#text': utils.toString(this.callbackDTS)
          },
          lead_id: {
            '#text': utils.toString(this.leadId)
          },
          extern_id: {
            '#text': utils.toString(this.externId)
          },
          contact_forwarding: {
            '#text': 'null'
          },
          session_id: {},
          uii: {}
        }
      };
      return JSON.stringify(msg);
    };

    var ExtensionPresenceRequest = function ExtensionPresenceRequest() {};

    ExtensionPresenceRequest.prototype.getExtensionPresenceInfo = function (extensionIds) {
      UIModel.getInstance().ExtensionPresenceRequest = this;

      _getExtensionPresenceInfo('rcdirectory/getExtensionPresenceStatus', {
        extensionIds: extensionIds
      });
    };

    ExtensionPresenceRequest.prototype.processResponse = function (response) {
      UIModel.getInstance().extensionPresenceResponse = response;
      return UIModel.getInstance().extensionPresenceResponse;
    };

    function _getExtensionPresenceInfo(path, queryParams) {
      var model = UIModel.getInstance();
      var baseUrl = model.authHost + model.baseApiUri;
      var engageAccessToken = "Bearer ".concat(utils.toString(UIModel.getInstance().authenticateRequest.engageAccessToken));
      var params = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      params.headers.Authorization = engageAccessToken;
      params.queryParams = queryParams;
      var errorMsg = "Error while fetching extension presence response. URL: ".concat(baseUrl).concat(path);
      new HttpService(baseUrl).httpGet(path, params).then(function (response) {
        try {
          response = JSON.parse(response.response);
          var extensionPresenceResponse = UIModel.getInstance().extensionPresenceRequest.processResponse(response);
          utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.EXTENSION_PRESENCE, extensionPresenceResponse);
        } catch (err) {
          utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
        }
      }, function (err) {
        var errResponse = {
          type: 'Error while fetching extension presence response.',
          message: errorMsg
        };
        utils.logMessage(LOG_LEVELS.WARN, errorMsg, err); // still fire callback on error response

        utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.EXTENSION_PRESENCE, errResponse);
      });
    }

    var HangupRequest = function HangupRequest(sessionId, resetPendingDisp) {
      this.sessionId = sessionId || null;
      this.resetPendingDisp = resetPendingDisp || false;
    };

    HangupRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.HANGUP,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          uii: {
            '#text': utils.toString(UIModel.getInstance().currentCall.uii)
          },
          session_id: {
            '#text': utils.toString(this.sessionId === null ? UIModel.getInstance().currentCall.sessionId : this.sessionId)
          },
          cancel_pending_disp: {
            '#text': this.resetPendingDisp === true ? 'TRUE' : 'FALSE'
          }
        }
      };
      return JSON.stringify(msg);
    };

    var HoldRequest = function HoldRequest(holdState, sessionId) {
      this.holdState = holdState;
      this.sessionId = sessionId || '1';
    };
    /*
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"HOLD",
     *      "agent_id":{"#text":"1856"},
     *      "uii":{"#text":"200808291035510000000900029412"},
     *      "session_id":{"#text":"1"},
     *      "hold_state":{"#text":"ON"}
     *    }
     * }
     */


    HoldRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.HOLD,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(model.currentCall.agentId)
          },
          uii: {
            '#text': utils.toString(model.currentCall.uii)
          },
          session_id: {
            '#text': utils.toString(this.sessionId)
          },
          hold_state: {
            '#text': this.holdState === true || this.holdState === 'true' ? 'ON' : 'OFF'
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes HOLD packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082910361503344",
     *      "@response_to":"",
     *      "@type":"HOLD",
     *      "uii":{"#text":"200808291035510000000900029412"},
     *      "session_id":{"#text":"1"},
     *      "status":{"#text":"OK"},
     *      "message":{},
     *      "detail":{},
     *      "hold_state":{"#text":"ON"}
     *    }
     * }
     */


    HoldRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      var currUII = '';

      if (UIModel.getInstance().currentCall.uii) {
        currUII = UIModel.getInstance().currentCall.uii;
      }

      formattedResponse.holdState = utils.getText(resp, 'hold_state') === 'ON';
      formattedResponse.sessionId = utils.getText(resp, 'session_id');
      formattedResponse.uii = utils.getText(resp, 'uii');

      if (formattedResponse.status === 'OK') {
        // make sure we are talking about the same call
        if (formattedResponse.uii === currUII) {
          if (formattedResponse.message === '') {
            formattedResponse.message = "Broadcasting new hold state of ".concat(formattedResponse.holdState);
          }

          utils.logMessage(LOG_LEVELS.DEBUG, "Broadcasting new hold state of ".concat(formattedResponse.holdState), response);
        } else {
          utils.logMessage(LOG_LEVELS.DEBUG, 'Hold Response is for a different call...discarding', response);
        }
      } else {
        if (formattedResponse.message === '') {
          formattedResponse.message = "Error processing HOLD request. ".concat(+formattedResponse.message, "\n").concat(formattedResponse.detail);
        }

        utils.logMessage(LOG_LEVELS.WARN, "Error processing HOLD request. ".concat(formattedResponse.detail), response);
      }

      var model = UIModel.getInstance();

      if (formattedResponse.sessionId !== '1' && model.transferSessions[formattedResponse.sessionId]) {
        // we have a hold for a transfer session
        model.transferSessions[formattedResponse.sessionId].onHold = formattedResponse.holdState;
      }

      return formattedResponse;
    };

    var LeadHistoryRequest = function LeadHistoryRequest(leadId) {
      this.leadId = leadId;
    };
    /*
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"LEAD-HISTORY",
     *      "agent_id":{"#text":"1"},
     *      "lead_id":{"#text":"12"},
     *    }
     * }
     */


    LeadHistoryRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LEAD_HISTORY,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(model.agentSettings.agentId)
          },
          lead_id: {
            '#text': utils.toString(this.leadId)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes LEAD-HISTORY packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@lead_id":"2653",
     *      "@message_id":"IQ982008091512353000875",
     *      "@response_to":"UIV220089151235539",
     *      "@type":"LEAD-HISTORY",
     *      "previous_dial":{
     *          "@agent_name":"mandy pants (mandy)",
     *          "@duration":"",
     *          "@pass_disposition":"",
     *          "@pass_dts":"2008-09-15 12:35:27",
     *          "@pass_number":"",
     *          "@pass_uii":"200809151234140000000900021288",
     *          "agent_notes":{"#text":"This person was incredibly nice and agreed to buy donuts. "},
     *          "agent_disposition":{"#text":"Incomplete"}
     *      }
     *   }
     * }
     *
     * OR
     *
     * {"ui_response":{
     *      "@lead_id":"2653",
     *      "@message_id":"IQ982008091512353000875",
     *      "@response_to":"UIV220089151235539",
     *      "@type":"LEAD-HISTORY",
     *      "previous_dial":[
     *        {
     *          "@agent_name":"mandy pants (mandy)",
     *          "@duration":"",
     *          "@pass_disposition":"",
     *          "@pass_dts":"2008-09-15 12:35:27",
     *          "@pass_number":"",
     *          "@pass_uii":"200809151234140000000900021288",
     *          "agent_notes":{"#text":"This person was incredibly nice and agreed to buy donuts. "},
     *          "agent_disposition":{"#text":"Incomplete"}
     *        },
     *        {
     *          "@agent_name":"mandy pants (mandy)",
     *          "@duration":"",
     *          "@pass_disposition":"",
     *          "@pass_dts":"2008-09-15 12:35:27",
     *          "@pass_number":"",
     *          "@pass_uii":"200809151234140000000900021288",
     *          "agent_notes":{"#text":"This person was incredibly nice and agreed to buy donuts. "},
     *          "agent_disposition":{"#text":"Incomplete"}
     *        }
     *      ]
     *   }
     * }
     */


    LeadHistoryRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var histResponse = {
        leadId: resp['@lead_id']
      };
      var history = utils.processResponseCollection(response, 'ui_response', 'previous_dial'); // always return array, even if only one item

      if (!Array.isArray(history)) {
        history = [history];
      }

      histResponse.leadHistory = history;
      return histResponse;
    };

    var LeadInsertRequest = function LeadInsertRequest(dataObj) {
      // handle boolean value conversion
      if (dataObj.agent_reserved && dataObj.agent_reserved === true) {
        dataObj.agent_reserved = '1';
      } else {
        dataObj.agent_reserved = '0';
      }

      if (dataObj.dialable && dataObj.dialable === true) {
        dataObj.dialable = '1';
      } else {
        dataObj.dialable = '0';
      }

      this.dataObj = dataObj;
    };
    /*
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"LEAD-INSERT",
     *      "agent_id":{"#text":"1"},
     *      "campaign_id":{"#text":""},
     *      "lead_phone":{"#text":""},
     *      "dialable":{"#text":""},
     *      "agent_reserved":{"#text":""},
     *      "callback_dts":{"#text":""},
     *      "first_name":{"#text":""},
     *      "mid_name":{"#text":""},
     *      "last_name":{"#text":""},
     *      "suffix":{"#text":""},
     *      "title":{"#text":""},
     *      "address1":{"#text":""},
     *      "address2":{"#text":""},
     *      "city":{"#text":""},
     *      "state":{"#text":""},
     *      "zip":{"#text":""},
     *      "email":{"#text":""},
     *      "gateKeeper":{"#text":""},
     *      "aux_data1":{"#text":""},
     *      "aux_data2":{"#text":""},
     *      "aux_data3":{"#text":""},
     *      "aux_data4":{"#text":""},
     *      "aux_data5":{"#text":""},
     *    }
     * }
     */


    LeadInsertRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LEAD_INSERT,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(this.dataObj.agent_id)
          },
          campaign_id: {
            '#text': utils.toString(this.dataObj.campaign_id)
          },
          lead_phone: {
            '#text': utils.toString(this.dataObj.lead_phone)
          },
          dialable: {
            '#text': utils.toString(this.dataObj.dialable)
          },
          agent_reserved: {
            '#text': utils.toString(this.dataObj.agent_reserved)
          },
          call_back_dts: {
            '#text': utils.toString(this.dataObj.callback_dts)
          },
          first_name: {
            '#text': utils.toString(this.dataObj.first_name)
          },
          mid_name: {
            '#text': utils.toString(this.dataObj.mid_name)
          },
          last_name: {
            '#text': utils.toString(this.dataObj.last_name)
          },
          suffix: {
            '#text': utils.toString(this.dataObj.suffix)
          },
          title: {
            '#text': utils.toString(this.dataObj.title)
          },
          address1: {
            '#text': utils.toString(this.dataObj.address1)
          },
          address2: {
            '#text': utils.toString(this.dataObj.address2)
          },
          city: {
            '#text': utils.toString(this.dataObj.city)
          },
          state: {
            '#text': utils.toString(this.dataObj.state)
          },
          zip: {
            '#text': utils.toString(this.dataObj.zip)
          },
          email: {
            '#text': utils.toString(this.dataObj.email)
          },
          gate_keeper: {
            '#text': utils.toString(this.dataObj.gate_keeper)
          },
          aux_data1: {
            '#text': utils.toString(this.dataObj.aux_data1)
          },
          aux_data2: {
            '#text': utils.toString(this.dataObj.aux_data2)
          },
          aux_data3: {
            '#text': utils.toString(this.dataObj.aux_data3)
          },
          aux_data4: {
            '#text': utils.toString(this.dataObj.aux_data4)
          },
          aux_data5: {
            '#text': utils.toString(this.dataObj.aux_data5)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes LEAD-INSERT packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008091512353000875",
     *      "@response_to":"UIV220089151235539",
     *      "@type":"LEAD-INSERT",
     *      "status":{"#text":"TRUE|FALSE"},
     *      "msg":{"#text":""},
     *      "detail":{"#text":""},
     *   }
     * }
     */


    LeadInsertRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.message = resp.msg['#text'];
      return formattedResponse;
    };

    var LeadUpdateRequest = function LeadUpdateRequest(leadId, leadPhone, baggage) {
      this.leadId = leadId;
      this.leadPhone = leadPhone;
      this.baggage = baggage;
      this.agentId = utils.toString(UIModel.getInstance().agentSettings.agentId);
    };
    /*
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"LEAD-UPDATE",
     *      "agent_id":{"#text":"1"},
     *      "lead_id":{"#text":"12"},
     *      "lead_phone":{"#text":"12"},
     *       "baggage":{
     *          "lead_id":{"#text":"64306"},
     *          "extern_id":{"#text":"9548298548"},
     *          "first_name":{"#text":"Ryant"},
     *          "mid_name":{},
     *          "last_name":{"#text":"Taylor"},
     *          "state":{"#text":"OH"},
     *          "aux_data1":{"#text":"BMAK"},
     *          "aux_data2":{"#text":"BMAK-041653-934"},
     *          "aux_data3":{"#text":"Call Ctr 1"},
     *          "aux_data4":{},
     *          "aux_data5":{},
     *          "address1":{"#text":"8010 Maryland Ave"},
     *          "address2":{},
     *          "city":{"#text":"Cleveland"},
     *          "zip":{"#text":"44105"},
     *          "aux_external_url":{},
     *          "aux_greeting":{},
     *          "aux_phone":{}
     *      },
     *    }
     * }
     */


    LeadUpdateRequest.prototype.formatJSON = function () {
      // make sure required baggage fields are present
      this.baggage = _formatBaggage(this.baggage);
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LEAD_UPDATE,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': this.agentId
          },
          lead_id: {
            '#text': utils.toString(this.leadId)
          },
          lead_phone: {
            '#text': utils.toString(this.leadPhone)
          },
          baggage: this.baggage
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes LEAD-UPDATE packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008091512353000875",
     *      "@response_to":"UIV220089151235539",
     *      "@type":"LEAD-UPDATE",
     *      "status":{"#text":"TRUE|FALSE"},
     *      "msg":{"#text":"64306"},
     *      "detail":{"#text":"64306"},
     *   }
     * }
     */


    LeadUpdateRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.message = resp.msg['#text'];
      return formattedResponse;
    };

    var _formatBaggage = function _formatBaggage(baggage) {
      var bag = {};
      bag.first_name = {
        '#text': baggage.first_name || ''
      };
      bag.mid_name = {
        '#text': baggage.mid_name || ''
      };
      bag.last_name = {
        '#text': baggage.last_name || ''
      };
      bag.suffix = {
        '#text': baggage.suffix || ''
      };
      bag.title = {
        '#text': baggage.title || ''
      };
      bag.address1 = {
        '#text': baggage.address1 || ''
      };
      bag.address2 = {
        '#text': baggage.address2 || ''
      };
      bag.city = {
        '#text': baggage.city || ''
      };
      bag.state = {
        '#text': baggage.state || ''
      };
      bag.zip = {
        '#text': baggage.zip || ''
      };
      bag.email = {
        '#text': baggage.email || ''
      };
      bag.gate_keeper = {
        '#text': baggage.gate_keeper || ''
      };
      bag.extern_id = {
        '#text': baggage.extern_id || ''
      };
      bag.aux_data1 = {
        '#text': baggage.aux_data1 || ''
      };
      bag.aux_data2 = {
        '#text': baggage.aux_data2 || ''
      };
      bag.aux_data3 = {
        '#text': baggage.aux_data3 || ''
      };
      bag.aux_data4 = {
        '#text': baggage.aux_data4 || ''
      };
      bag.aux_data5 = {
        '#text': baggage.aux_data5 || ''
      };
      return bag;
    };

    var LoginRequest = function LoginRequest(dialDest, queueIds, chatIds, skillProfileId, dialGroupId, updateFromAdminUI, isForce) {
      this.queueIds = queueIds || [];
      this.chatIds = chatIds || [];
      this.skillProfileId = skillProfileId || '';
      this.dialGroupId = dialGroupId || '';
      this.dialDest = dialDest || '';
      this.updateFromAdminUI = updateFromAdminUI || false;
      this.loginType = 'NO-SELECTION';
      this.updateLogin = false;
      this.isForce = isForce; // Remove any ids agent doesn't have access to

      var model = UIModel.getInstance();
      this.queueIds = utils.checkExistingIds(model.inboundSettings.availableQueues, this.queueIds, 'gateId');
      this.chatIds = utils.checkExistingIds(model.chatSettings.availableChatQueues, this.chatIds, 'chatQueueId');
      this.skillProfileId = utils.checkExistingIds(model.inboundSettings.availableSkillProfiles, [this.skillProfileId], 'profileId')[0] || '';
      this.dialGroupId = utils.checkExistingIds(model.outboundSettings.availableOutdialGroups, [this.dialGroupId], 'dialGroupId')[0] || ''; // Set loginType value

      if (this.queueIds.length > 0 && this.dialGroupId !== '') {
        this.loginType = 'BLENDED';
      } else if (this.queueIds.length > 0) {
        this.loginType = 'INBOUND';
      } else if (this.dialGroupId !== '') {
        this.loginType = 'OUTBOUND';
      } else if (this.chatIds.length > 0) {
        this.loginType = 'CHAT';
      } else {
        this.loginType = 'NO-SELECTION';
      } // set updateLogin value


      if (model.agentSettings.isLoggedIn) {
        this.updateLogin = true;
        this.dialDest = UIModel.getInstance().agentSettings.dialDest;
      } // validate dialDest is sip or 10-digit num


      if (!utils.validateDest(this.dialDest)) {
        utils.logMessage(LOG_LEVELS.WARN, "dialDest [".concat(this.dialDest, "] must be a valid sip or 10-digit DID"), '');
      }
    };

    LoginRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LOGIN,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          access_token: {
            '#text': UIModel.getInstance().authenticateRequest.accessToken
          },
          hash_code: {
            '#text': UIModel.getInstance().connectionSettings.hashCode
          },
          allow_multisocket: {
            '#text': utils.toString(UIModel.getInstance().applicationSettings.allowMultiSocket)
          },
          dial_dest: {
            '#text': utils.toString(this.dialDest)
          },
          login_type: {
            '#text': this.loginType
          },
          update_login: {
            '#text': utils.toString(this.updateLogin)
          },
          outdial_group_id: {
            '#text': utils.toString(this.dialGroupId)
          },
          skill_profile_id: {
            '#text': utils.toString(this.skillProfileId)
          },
          update_from_adminui: {
            '#text': utils.toString(this.updateFromAdminUI)
          },
          agent_platform_id: {
            '#text': utils.toString(2) // Hard-coded platformId for agent-js repo

          },
          is_force: {
            '#text': utils.toString(this.isForce)
          }
        }
      }; // add arrays

      var queueIds = [];

      for (var i = 0; i < this.queueIds.length; i++) {
        if (this.queueIds[i] !== '') {
          queueIds.push({
            '#text': utils.toString(this.queueIds[i])
          });
        }
      }

      if (queueIds.length > 0) {
        msg.ui_request.gates = {
          gate_id: queueIds
        };
      } else {
        msg.ui_request.gates = {};
      }

      var chatIds = [];

      for (var i = 0; i < this.chatIds.length; i++) {
        if (this.chatIds[i] !== '') {
          chatIds.push({
            '#text': utils.toString(this.chatIds[i])
          });
        }
      }

      if (chatIds.length > 0) {
        msg.ui_request.chat_queues = {
          chat_queue_id: chatIds
        };
      } else {
        msg.ui_request.chat_queues = {};
      }

      return JSON.stringify(msg);
    };
    /*
     * This function is responsible for handling the response to Login from IntelliQueue.
     *
     * {"ui_response":{
     *      "@message_id":"IQ10012016082513212000447",
     *      "@response_to":"IQ201608251121200",
     *      "@type":"LOGIN",
     *      "agent_id":{"#text":"1"},
     *      "status":{"#text":"SUCCESS"},
     *      "message":{"#text":"Hello Geoffrey Mina!"},
     *      "detail":{"#text":"Logon request processed successfully!"},
     *      "hash_code":{"#text":"404946966"},
     *      "login_type":{"#text":"BLENDED"},
     *      "outdial_group_id":{"#text":"50692"},
     *      "skill_profile_id":{"#text":"1513"},
     *      "gates":{
     *          "gate_id":[
     *              {"#text":"11116"},
     *              {"#text":"11117"}
     *          ]
     *      },
     *      "chat_queues":{
     *          "chat_queue_id":{"#text":"30"}
     *      }
     *    }
     * }
     */


    LoginRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var status = utils.getText(resp, 'status');
      var detail = utils.getText(resp, 'detail');
      var model = UIModel.getInstance();
      var message = '';
      var formattedResponse = utils.buildDefaultResponse(response);
      var Lib = UIModel.getInstance().libraryInstance;

      if (detail === 'Logon Session Configuration Updated!') {
        // this is an update login packet
        model.agentSettings.updateLoginMode = true;
        message = 'Logon Session Configuration Updated!';
        utils.logMessage(LOG_LEVELS.INFO, message, response);
      }

      if (status === 'SUCCESS') {
        if (!model.agentSettings.isLoggedIn) {
          // fresh login, set UI Model properties
          model.loginPacket = response;
          model.agentSettings.isLoggedIn = true;
          model.agentSettings.loginDTS = new Date();
          model.connectionSettings.reconnect = true;
          model.agentPermissions.allowLeadSearch = false;
          model.agentSettings.dialDest = utils.getText(resp, 'dial_dest');
          model.agentSettings.loginType = utils.getText(resp, 'login_type');
          model.agentSettings.accountId = utils.getText(resp, 'account_id');
          model.agentSettings.corporateDirectory = utils.getText(resp, 'corporate_dir');
          model.connectionSettings.isMultiSocket = utils.getText(resp, 'is_multisocket') === 'true'; // If we allow multisocket, lets setup a listener for other tabs to request data

          if (model.applicationSettings.allowMultiSocket === true || model.connectionSettings.isMultiSocket === true) {
            broadcastChannelHelper.init();
          } // Set collection values


          setDialGroupSettings(response);
          setGateSettings(response);
          setChatQueueSettings(response);
          setSkillProfileSettings(response);
        } else if (model.agentSettings.updateLoginMode) {
          model.agentSettings.dialDest = utils.getText(resp, 'dial_dest');
          model.agentSettings.loginType = utils.getText(resp, 'login_type');
          model.agentSettings.accountId = utils.getText(resp, 'account_id'); // This was an update login request

          model.agentSettings.updateLoginMode = false; // reset to false before updating dial group settings

          model.agentPermissions.allowLeadSearch = false;
          model.agentPermissions.requireFetchedLeadsCalled = false;
          model.agentPermissions.allowPreviewLeadFilters = false; // Set collection values

          setDialGroupSettings(response);
          setGateSettings(response);
          setChatQueueSettings(response);
          setSkillProfileSettings(response);
        } else {
          // this was a reconnect
          message = 'Processed a Layer 2 Reconnect Successfully';
          model.connectionSettings.isOnCall = utils.getText(resp, 'is_on_call');
          model.connectionSettings.activeCallUii = utils.getText(resp, 'active_call_uii');
          model.connectionSettings.isPendingDisp = utils.getText(resp, 'is_pending_disp');

          if (model.connectionSettings.isOnCall === false) {
            if (model.currentCall.uii) {
              var mockEndCallPacket = {
                ui_notification: {
                  '@message_id': '',
                  '@type': 'END-CALL',
                  uii: {
                    '#text': model.currentCall.uii
                  },
                  term_reason: {
                    '#text': 'SOCKET-DISCONNECT'
                  }
                }
              };
              utils.processNotification(Lib, mockEndCallPacket);
            }

            if (model.agentSettings.isOffhook) {
              var offHookTermPacket = {
                ui_notification: {
                  agent_id: {
                    '#text': UIModel.getInstance().agentSettings.agentId
                  },
                  '@type': 'OFF-HOOK-TERM',
                  '@message_id': ''
                }
              };
              var agentProcessOffhookCallback = utils.processNotification(Lib, offHookTermPacket);
              Lib.offhookTerm(agentProcessOffhookCallback);
            }
          } else if (model.connectionSettings.isOnCall && (model.currentCall.uii !== model.connectionSettings.activeCallUii || Lib.waitingForAddSession === true)) {
            // if the agent does not know it is on a call, but IQ thinks it is on a call
            // normally in the case of disconnect during transition
            model.currentCall.uii = model.connectionSettings.activeCallUii;
            model.currentCall.pendingDisp = false;
            Lib.hangup(1, true);
          } else {
            // agent still is on call and there are transferSessions, verify no transferSession were drop
            var activeAgentUiSessions = Lib.getTransferSessions();
            var activeAgentSessions = response.ui_response.active_call_sessions.call_session_id.map(function (sessionObj) {
              return sessionObj['#text'];
            });

            for (var transferSession in activeAgentUiSessions) {
              if (activeAgentSessions.indexOf(transferSession) === -1) {
                // if the active ui session is no longer active, we need to tell the ui
                delete UIModel.getInstance().transferSessions[transferSession];
              }
            }
          }

          utils.logMessage(LOG_LEVELS.INFO, message, response);
        } // always update guid and agent login hashcode if found


        model.connectionSettings.hashCode = utils.getText(resp, 'hash_code') || model.connectionSettings.hashCode;
        model.agentSettings.guid = utils.getText(resp, 'guid') || model.agentSettings.guid;
        model.dataStore.save('agent_id', utils.getText(resp, 'agent_id'));
        model.dataStore.save('hash_code', utils.getText(resp, 'hash_code'));
        formattedResponse.agentSettings = model.agentSettings;
        formattedResponse.agentPermissions = model.agentPermissions;
        formattedResponse.applicationSettings = model.applicationSettings;
        formattedResponse.chatSettings = model.chatSettings;
        formattedResponse.connectionSettings = model.connectionSettings;
        formattedResponse.inboundSettings = model.inboundSettings;
        formattedResponse.outboundSettings = model.outboundSettings;
        formattedResponse.scriptSettings = model.scriptSettings;
      } else {
        // Login failed
        if (formattedResponse.message === '') {
          formattedResponse.message = 'Agent configuration attempt failed (2nd layer login)';
        }

        utils.logMessage(LOG_LEVELS.WARN, formattedResponse.message, response);
      }

      return formattedResponse;
    };

    function setDialGroupSettings(response) {
      var model = UIModel.getInstance();
      var outdialGroups = model.outboundSettings.availableOutdialGroups;
      model.outboundSettings.outdialGroup = {}; // reset

      for (var g = 0; g < outdialGroups.length; g++) {
        var group = outdialGroups[g];

        if (group.dialGroupId === response.ui_response.outdial_group_id['#text']) {
          model.agentPermissions.allowLeadSearch = group.allowLeadSearch;
          model.agentPermissions.allowPreviewLeadFilters = group.allowPreviewLeadFilters;
          model.agentPermissions.progressiveEnabled = group.progressiveEnabled;
          model.outboundSettings.outdialGroup = JSON.parse(JSON.stringify(group)); // copy object
          // Only used for Preview or TCPA Safe accounts.
          // If set to true, only allow fetching new leads when current leads are called or expired

          model.agentPermissions.requireFetchedLeadsCalled = group.requireFetchedLeadsCalled;
        }
      }
    }

    function setSkillProfileSettings(response) {
      var model = UIModel.getInstance();
      model.inboundSettings.skillProfile = {};
      var skillProfiles = model.inboundSettings.availableSkillProfiles;

      for (var s = 0; s < skillProfiles.length; s++) {
        var profile = skillProfiles[s];
        var responseId = utils.getText(response.ui_response, 'skill_profile_id');

        if (profile.profileId === responseId) {
          model.inboundSettings.skillProfile = JSON.parse(JSON.stringify(profile)); // copy object
        }
      }
    }

    function setGateSettings(response) {
      var model = UIModel.getInstance();
      var gates = model.inboundSettings.availableQueues;
      var selectedGateIds = [];
      var selectedGates = [];
      var gateIds = response.ui_response.gates.gate_id || [];

      if (!Array.isArray(gateIds)) {
        gateIds = [gateIds];
      }

      for (var s = 0; s < gateIds.length; s++) {
        var obj = gateIds[s];
        selectedGateIds.push(obj['#text']);
      }

      for (var gIdx = 0; gIdx < gates.length; gIdx++) {
        var gate = gates[gIdx];

        if (selectedGateIds.indexOf(gate.gateId) > -1) {
          selectedGates.push(gate);
        }
      }

      model.inboundSettings.queues = JSON.parse(JSON.stringify(selectedGates)); // copy array
    }

    function setChatQueueSettings(response) {
      var model = UIModel.getInstance();
      var chatQueues = model.chatSettings.availableChatQueues;
      var selectedChatQueueIds = [];
      var selectedChatQueues = [];
      var cQueues = response.ui_response.chat_queues || {};
      var chatQueueIds = cQueues.chat_queue_id || [];

      if (!Array.isArray(chatQueueIds)) {
        chatQueueIds = [chatQueueIds];
      }

      for (var c = 0; c < chatQueueIds.length; c++) {
        var obj = chatQueueIds[c];
        selectedChatQueueIds.push(obj['#text']);
      }

      for (var cIdx = 0; cIdx < chatQueues.length; cIdx++) {
        var chatQueue = chatQueues[cIdx];

        if (selectedChatQueueIds.indexOf(chatQueue.chatQueueId) > -1) {
          selectedChatQueues.push(chatQueue);
        }
      }

      model.chatSettings.chatQueues = JSON.parse(JSON.stringify(selectedChatQueues)); // copy array
    }

    var LoginPhase1Request = function LoginPhase1Request() {};

    LoginPhase1Request.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LOGIN_PHASE_1,
          '@message_id': utils.getMessageId(),
          response_to: '',
          reconnect: {
            '#text': utils.toString(UIModel.getInstance().connectionSettings.reconnect)
          },
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          access_token: {
            '#text': utils.toString(UIModel.getInstance().authenticateRequest.accessToken)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This function is responsible for handling the login packet received from IntelliServices. It will save
     * a copy of it in the UIModel as loginPacket, as well as set the isLoggedInIS variable to
     * true (for reconnect purposes) and the loginDTS with the current date/time.
     *
     * {"ui_response":{
     *      "@type":"login",
     *      "status":{"#text":"OK"},
     *      "is_sso:{"#text":"TRUE"|"FALSE"},
     *      "agent_id":{"#text":"1810"},
     *      "agent_pwd":{"#text":"bound25"},
     *      "first_name":{"#text":"mandy"},
     *      "last_name":{"#text":"pants"},
     *      "email":{"#text":"mandypants@aol.coim"},
     *      "agent_type":{"#text":"AGENT"},
     *      "external_agent_id":{"#text":"blahblah"},
     *      "default_login_dest":{"#text":"9548298548|123"},
     *      "alt_default_login_dest":{"#text":"9548298548|123"},
     *      "iq_url":{"#text":"dev.connectfirst.com"},
     *      "iq_port":{"#text":"1313"},
     *      "iq_ssl_port":{"#text":"1213"},
     *      "iq_secret_key":{"#text":"F-OFF"},
     *      "allow_inbound":{"#text":"1"},
     *      "allow_outbound":{"#text":"1"},
     *      "allow_chat":{"#text":"1"},
     *      "allow_blended":{"#text":"0"},
     *      "allow_off_hook":{"#text":"1"},
     *      "allow_call_control":{"#text":"1"},
     *      "allow_login_control":{"#text":"1"},
     *      "allow_login_updates":{"#text":"1"},
     *      "allow_lead_inserts":{"#text":"1"},
     *      "show_lead_history":{"#text":"1"},
     *      "allow_cross_gate_requeue":{"#text":"1"},
     *      "phone_login_dial_group":{"#text":"44"},
     *      "phone_login_pin":{"#text":"1234"},
     *      "allow_manual_calls":{"#text":"1"},
     *      "allow_manual_intl_calls":{"#text":"0"},
     *      "init_login_state":{"#text":"ON-BREAK"},
     *      "init_login_state_label":{"#text":"Morning Break"},
     *      "outbound_prepay":{"#text":"0"},
     *      "max_break_time":{"#text":"-1"},
     *      "max_lunch_time":{"#text":"-1"},
     *      "allow_lead_search":{"#text":"YES_ALL"},
     *      "tcpa_safe_mode":{"#text":"1|0"},
     *      "pci_enabled":{"#text":"1|0"},
     *      "login_gates":{
     *          "gate":[
     *              {"@default_dest_override":"","@gate_desc":"","@gate_id":"37","@gate_name":"test"},
     *              {"@default_dest_override":"","@gate_desc":"","@gate_id":"42","@gate_name":"test gate two"},
     *              {"@default_dest_override":"","@gate_desc":"","@gate_id":"43","@gate_name":"test gate three"},
     *              {"@default_dest_override":"","@gate_desc":"Amandas Other Gate","@gate_id":"46","@gate_name":"You know it!"}
     *          ]
     *      },
     *      "login_chat_queues":{
     *          "chat_queue":[
     *              {"@chat_queue_description":"","@chat_queue_id":"","@chat_queue_name":""},
     *              {"@chat_queue_description":"","@chat_queue_id":"","@chat_queue_name":""}
     *          ]
     *      },
     *      "outdial_groups":{
     *          "group":[
     *              {"@billing_key":"","@dial_group_desc":"","@dial_group_id":"44","@dial_group_name":"Geoff Dial Test","@dial_mode":"PREDICTIVE"},
     *              {"@billing_key":"2","@dial_group_desc":"AutoDial Configured Dial Group","@dial_group_id":"46","@dial_group_name":"Phone Only test5","@dial_mode":"PREDICTIVE"},
     *              {"@billing_key":"","@dial_group_desc":"Test","@dial_group_id":"200000","@dial_group_name":"Test","@dial_mode":"PREDICTIVE"},
     *              {"@billing_key":"","@dial_group_desc":"Test","@dial_group_id":"200010","@dial_group_name":"Carissa's Test Group","@dial_mode":"PREDICTIVE"}
     *          ]
     *      },"skill_profiles":{
     *          "profile":[
     *              {"@profile_desc":"","@profile_id":"571","@profile_name":"skill1"},
     *              {"@profile_desc":"","@profile_id":"572","@profile_name":"skill2"}
     *          ]
     *      },
     *      "requeue_gates":{
     *          "gate_group":[
     *              {
     *                  "@gate_group_id":"18",
     *                  "@group_name":"new gate group",
     *                  "gates":{
     *                      "gate":[
     *                          {"@gate_desc":"","@gate_id":"37","@gate_name":"test"},
     *                          {"@gate_desc":"","@gate_id":"43","@gate_name":"test gate three"},
     *                          {"@gate_desc":"","@gate_id":"42","@gate_name":"test gate two"}
     *                      ]
     *                  },
     *                  "skills":{
     *                      "skill":[
     *                          {"@skill_desc":"","@skill_id":"58","@skill_name":"one"},
     *                          {"@skill_desc":"","@skill_id":"59","@skill_name":"two"},
     *                      ]
     *                  }
     *              }
     *          ]
     *      },
     *      "chat_rooms":{},
     *      "scripts": {
     *           "script": {
     *               "@script_id": "15",
     *               "@script_name": "Don't Read This Script"
     *           }
     *      },
     *      "campaigns": {
     *          "campaign": {
     *              "@allow_lead_updates": "",
     *              "@campaign_id": "",
     *              "@campaign_name": "",
     *              "@survey_id": "",
     *              "@survey_name": "",
     *              "custom_labels": {
     *                  "@aux_1_label": "",
     *                  "@aux_2_label": "",
     *                  "@aux_3_label": "",
     *                  "@aux_4_label": "",
     *                  "@aux_5_label": ""
     *              },
     *              "generic_key_value_pairs": {}
     *          }
     *      },
     *      "account_countries":{
     *          "country":[
     *              {"@country_id":"BRA"},{"@country_id":"FRA"},{"@country_id":"GER"}
     *          ]
     *      }
     *   }
     * }
     */


    LoginPhase1Request.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var status = utils.getText(resp, 'status');
      var model = UIModel.getInstance();
      var formattedResponse = utils.buildDefaultResponse(response);

      if (status === 'OK') {
        if (!model.applicationSettings.isLoggedInIS) {
          // save login packet properties to UIModel
          model.loginPhase1Packet = response;
          model.applicationSettings.isLoggedInIS = true;
          model.applicationSettings.isSso = utils.getText(resp, 'is_sso');
          model.applicationSettings.isTcpaSafeMode = utils.getText(resp, 'tcpa_safe_mode') === '1';
          model.applicationSettings.pciEnabled = utils.getText(resp, 'pci_enabled') === '1';
          model.chatSettings.alias = "".concat(utils.getText(resp, 'first_name'), " ").concat(utils.getText(resp, 'last_name'));
          model.agentSettings.loginDTS = new Date();
          model.agentSettings.maxBreakTime = utils.getText(resp, 'max_break_time');
          model.agentSettings.maxLunchTime = utils.getText(resp, 'max_lunch_time');
          model.agentSettings.firstName = utils.getText(resp, 'first_name');
          model.agentSettings.lastName = utils.getText(resp, 'last_name');
          model.agentSettings.email = utils.getText(resp, 'email');
          model.agentSettings.agentId = utils.getText(resp, 'agent_id');
          model.agentSettings.externalAgentId = utils.getText(resp, 'external_agent_id');
          model.agentSettings.agentType = utils.getText(resp, 'agent_type');
          model.agentSettings.realAgentType = utils.getText(resp, 'real_agent_type');
          model.agentSettings.defaultLoginDest = utils.getText(resp, 'default_login_dest');
          model.agentSettings.altDefaultLoginDest = utils.getText(resp, 'alt_default_login_dest');
          model.agentSettings.initLoginState = utils.getText(resp, 'init_login_state');
          model.agentSettings.initLoginStateLabel = utils.getText(resp, 'init_login_state_label');
          model.agentSettings.outboundManualDefaultRingtime = utils.getText(resp, 'outbound_manual_default_ringtime');
          model.agentSettings.isOutboundPrepay = utils.getText(resp, 'outbound_prepay') === '1';
          model.agentSettings.phoneLoginPin = utils.getText(resp, 'phone_login_pin');
          model.agentSettings.username = utils.getText(resp, 'username');
          model.agentSettings.agentPassword = utils.getText(resp, 'agent_pwd');
          model.agentPermissions.allowCallControl = utils.getText(resp, 'allow_call_control') === '1';
          model.agentPermissions.allowChat = utils.getText(resp, 'allow_chat') === '1';
          model.agentPermissions.showLeadHistory = utils.getText(resp, 'show_lead_history') === '1';
          model.agentPermissions.allowManualOutboundGates = utils.getText(resp, 'allow_manual_outbound_gates') === '1';
          model.agentPermissions.allowOffHook = utils.getText(resp, 'allow_off_hook') === '1';
          model.agentPermissions.allowManualCalls = utils.getText(resp, 'allow_manual_calls') === '1';
          model.agentPermissions.allowManualPass = utils.getText(resp, 'allow_manual_pass') === '1';
          model.agentPermissions.allowManualIntlCalls = utils.getText(resp, 'allow_manual_intl_calls') === '1';
          model.agentPermissions.allowLoginUpdates = utils.getText(resp, 'allow_login_updates') === '1';
          model.agentPermissions.allowInbound = utils.getText(resp, 'allow_inbound') === '1';
          model.agentPermissions.allowOutbound = utils.getText(resp, 'allow_outbound') === '1';
          model.agentPermissions.allowBlended = utils.getText(resp, 'allow_blended') === '1';
          model.agentPermissions.allowLoginControl = utils.getText(resp, 'allow_login_control') === '1';
          model.agentPermissions.allowCrossQueueRequeue = utils.getText(resp, 'allow_cross_gate_requeue') === '1';
          model.agentPermissions.disableSupervisorMonitoring = utils.getText(resp, 'disable_supervisor_monitoring') === '1';
          model.agentPermissions.allowAutoAnswer = utils.getText(resp, 'allow_auto_answer') === '1';
          model.agentPermissions.defaultAutoAnswerOn = utils.getText(resp, 'default_auto_answer_on') === '1';
          model.agentPermissions.allowHistoricalDialing = utils.getText(resp, 'allow_historical_dialing') === '1';
          model.agentPermissions.allowAgentStats = utils.getText(resp, 'allow_agent_stats') === '1';
          model.agentPermissions.allowCampaignStats = utils.getText(resp, 'allow_camp_stats') === '1';
          model.agentPermissions.allowGateStats = utils.getText(resp, 'allow_gate_stats') === '1';
          model.agentPermissions.allowChatStats = utils.getText(resp, 'allow_chat_stats') === '1';
          model.agentPermissions.enableFolderMode = utils.getText(resp, 'enable_folder_mode') === '1';
          model.agentPermissions.enableTaskMode = utils.getText(resp, 'enable_task_mode') === '1';
          model.outboundSettings.defaultDialGroup = utils.getText(resp, 'phone_login_dial_group');

          if (response.ui_response.allow_lead_inserts && typeof resp.insert_campaigns !== 'undefined' && response.ui_response.insert_campaigns.campaign) {
            model.agentPermissions.allowLeadInserts = utils.getText(resp, 'allow_lead_inserts') === '1';
          } // Set collection values


          model.outboundSettings.availableCampaigns = _processCampaigns(response);
          model.chatSettings.availableChatQueues = utils.processResponseCollection(response.ui_response, 'login_chat_queues', 'chat_queue');

          _processChatQueueDnis(model.chatSettings, response);

          model.chatSettings.availableChatRequeueQueues = utils.processResponseCollection(response.ui_response, 'chat_requeue_queues', 'chat_group');
          model.inboundSettings.availableQueues = utils.processResponseCollection(response.ui_response, 'login_gates', 'gate');
          model.inboundSettings.availableSkillProfiles = utils.processResponseCollection(response.ui_response, 'skill_profiles', 'profile');
          model.inboundSettings.availableRequeueQueues = utils.processResponseCollection(response.ui_response, 'requeue_gates', 'gate_group');
          model.chatSettings.availableChatRooms = utils.processResponseCollection(response.ui_response, 'chat_rooms', 'room');
          model.scriptSettings.availableScripts = utils.processResponseCollection(response.ui_response, 'scripts', 'script');
          model.agentSettings.callerIds = utils.processResponseCollection(response.ui_response, 'caller_ids', 'caller_id');
          model.agentSettings.availableAgentStates = utils.processResponseCollection(response.ui_response, 'agent_states', 'agent_state');
          model.applicationSettings.availableCountries = utils.processResponseCollection(response.ui_response, 'account_countries', 'country');
          model.outboundSettings.insertCampaigns = utils.processResponseCollection(response.ui_response, 'insert_campaigns', 'campaign');
          var dialGroups = utils.processResponseCollection(response.ui_response, 'outdial_groups', 'group'); // set boolean values

          for (var dg = 0; dg < dialGroups.length; dg++) {
            var group = dialGroups[dg];
            group.allowLeadSearch = group.allowLeadSearch === 'YES';
            group.allowPreviewLeadFilters = group.allowPreviewLeadFilters === '1';
            group.progressiveEnabled = group.progressiveEnabled === '1';
            group.requireFetchedLeadsCalled = group.requireFetchedLeadsCalled === '1';
            group.hciType = parseInt(group.hciEnabled) || 0;
            group.hciEnabled = group.hciEnabled === '1' || group.hciEnabled === '2';
            group.hciClicker = group.hciClicker === '1';
          }

          model.outboundSettings.availableOutdialGroups = dialGroups;
        }
      }

      formattedResponse.agentSettings = model.agentSettings;
      formattedResponse.agentPermissions = model.agentPermissions;
      formattedResponse.applicationSettings = model.applicationSettings;
      formattedResponse.chatSettings = model.chatSettings;
      formattedResponse.connectionSettings = model.connectionSettings;
      formattedResponse.inboundSettings = model.inboundSettings;
      formattedResponse.outboundSettings = model.outboundSettings;
      formattedResponse.scriptSettings = model.scriptSettings;
      return formattedResponse;
    };

    function _processCampaigns(response) {
      var campaigns = [];
      var campaignsRaw = null;

      if (typeof response.ui_response.campaigns.campaign !== 'undefined') {
        campaignsRaw = response.ui_response.campaigns.campaign;
      }

      if (campaignsRaw) {
        if (!Array.isArray(campaignsRaw)) {
          campaignsRaw = [campaignsRaw];
        }

        for (var c = 0; c < campaignsRaw.length; c++) {
          campaigns.push(_processCampaign(campaignsRaw[c]));
        }
      }

      return campaigns;
    }

    function _processCampaign(campaignRaw) {
      // single campaign object
      var campaignId = campaignRaw['@campaign_id'];
      var allowLeadUpdates = campaignRaw['@allow_lead_updates']; // 0 = no update, 1 = allow phone update, 2 = don't allow phone update

      UIModel.getInstance().agentPermissions.allowLeadUpdatesByCampaign[campaignId] = allowLeadUpdates;
      var customLabels = campaignRaw.custom_labels;
      var labelArray = [];

      for (var p in customLabels) {
        var label = p.replace(/@/, ''); // remove leading '@'

        var obj = {};
        obj[label] = customLabels[p];
        labelArray.push(obj);
      }

      return {
        campaignId: campaignId,
        campaignName: campaignRaw['@campaign_name'],
        surveyId: campaignRaw['@survey_id'],
        surveyName: campaignRaw['@survey_name'],
        customLabels: labelArray,
        allowLeadUpdates: allowLeadUpdates
      };
    }
    /**
     * example packet
     *  {
     *      "chat_queue":[
     *          {
     *              "@chat_queue_desc":"",
     *              "@chat_queue_id":"74",
     *              "@chat_queue_name":"Please don't delete"
     *          },
     *          {
     *              "@chat_queue_desc":"blah",
     *              "@chat_queue_id":"131",
     *              "@chat_queue_name":"cris chat queue",
     *              "dnis":[
     *                  {"#text":"5555551215"},
     *                  {"#text":"5555554444"},
     *                  {"#text":"8885551212"},
     *                  {"#text":"97687"}
     *              ]
     *          }
     *      ]
     *   }
     *
     *
     *      This function will format the dnis list and put them back on chatSettings.availableChatQueues
     * */


    function _processChatQueueDnis(chatSettings, response) {
      var queues = chatSettings.availableChatQueues;
      var rawQueues = response.ui_response.login_chat_queues.chat_queue;

      if (!Array.isArray(rawQueues)) {
        rawQueues = [rawQueues];
      }

      for (var i = 0; i < queues.length; i++) {
        var queue = queues[i];
        var rawQueue = {};

        for (var j = 0; j < rawQueues.length; j++) {
          var rq = rawQueues[j];

          if (rq['@chat_queue_id'] === queue.chatQueueId) {
            rawQueue = rq;
            break;
          }
        }

        if (rawQueue.dnis) {
          if (!Array.isArray(rawQueue.dnis)) {
            rawQueue.dnis = [rawQueue.dnis];
          } // update the dnis array to just be a list


          queue.dnis = rawQueue.dnis.map(function (d) {
            return d['#text'];
          });
        }
      }
    }

    var LogoutRequest = function LogoutRequest(agentId, message) {
      this.agentId = agentId;
      this.message = message || '';
    };

    LogoutRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LOGOUT,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': this.agentId
          },
          message: {
            '#text': this.message
          }
        }
      };
      return JSON.stringify(msg);
    };

    LogoutRequest.prototype.processResponse = function (notification) {
      var formattedResponse = utils.buildDefaultResponse(notification);
      return formattedResponse;
    };

    var MultiSocketRequest = function MultiSocketRequest() {};

    MultiSocketRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LOGIN_MULTISOCKET,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': JSON.parse(model.dataStore.get('agent_id')) // fetch agent_id and hash_code from browser's local storage

          },
          hash_code: {
            '#text': JSON.parse(model.dataStore.get('hash_code'))
          }
        }
      };
      UIModel.getInstance().loginRequest = new LoginRequest(null, null, null, null, null, null, null);
      return JSON.stringify(msg);
    };

    var OffhookInitRequest = function OffhookInitRequest() {};

    OffhookInitRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.OFFHOOK_INIT,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          dial_dest: {
            '#text': UIModel.getInstance().agentSettings.dialDest
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling an off-hook-init response packet from IntelliQueue.
     * If the offhookinit is successful, it will go into the UIModel and set the isOffhook variable
     * to true.
     *
     * {"ui_response":{
     *      "@message_id":"UI2005",
     *      "@response_to":"",
     *      "@type":"OFF-HOOK-INIT",
     *      "status":{"#text":"OK|FAILURE"},
     *      "monitoring":{"#text:"TRUE|FALSE"},
     *      "message":{},
     *      "detail":{}
     *    }
     * }
     */


    OffhookInitRequest.prototype.processResponse = function (response) {
      var status = response.ui_response.status['#text'];
      var formattedResponse = utils.buildDefaultResponse(response);

      if (status === 'OK') {
        var isMonitoring = utils.getText(response.ui_response, 'monitoring');
        UIModel.getInstance().offhookInitPacket = response;
        UIModel.getInstance().agentSettings.isOffhook = true;
        UIModel.getInstance().agentSettings.isMonitoring = isMonitoring;
        formattedResponse.monitoring = isMonitoring; // make sure to reset softphone reconnect bool

        UIModel.getInstance().softphoneSettings.attemptingSoftphoneReconnect = false;
      } else {
        if (formattedResponse.message === '') {
          formattedResponse.message = 'Unable to process offhook request';
        }

        utils.logMessage(LOG_LEVELS.WARN, "".concat(formattedResponse.message, " ").concat(formattedResponse.detail), response);
      }

      return formattedResponse;
    };

    var OffhookTermRequest = function OffhookTermRequest() {};

    OffhookTermRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.OFFHOOK_TERM,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * Process an OFF-HOOK-TERM packet and update various variables in the UI
     *
     * {"ui_notification":{
     *      "@message_id":"IQ10012016080217135001344",
     *      "@response_to":"",
     *      "@type":"OFF-HOOK-TERM",
     *      "agent_id":{"#text":"1"},
     *      "start_dts":{"#text":"2016-08-02 17:11:38"},
     *      "end_dts":{"#text":"2016-08-02 17:14:07"},
     *      "monitoring":{"#text":"0"}
     *    }
     * }
     */


    OffhookTermRequest.prototype.processResponse = function (data) {
      var notif = data.ui_notification;
      var monitoring = utils.getText(notif, 'monitoring') === '1';
      var model = UIModel.getInstance();
      model.agentSettings.wasMonitoring = monitoring;
      model.offhookTermPacket = data;
      model.agentSettings.isOffhook = false;
      model.agentSettings.isMonitoring = false;
      var formattedResponse = {
        status: 'OK',
        agentId: utils.getText(notif, 'agent_id'),
        startDts: utils.getText(notif, 'start_dts'),
        endDts: utils.getText(notif, 'end_dts'),
        monitoring: monitoring
      };
      return formattedResponse;
    };

    var OneToOneOutdialRequest = function OneToOneOutdialRequest(destination, callerId, ringTime, countryId, gateId) {
      this.destination = destination;
      this.callerId = callerId;
      this.ringTime = ringTime || '60';
      this.countryId = countryId || 'USA';
      this.gateId = gateId || '';
    };

    OneToOneOutdialRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.ONE_TO_ONE_OUTDIAL,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          destination: {
            '#text': utils.toString(this.destination)
          },
          ring_time: {
            '#text': utils.toString(this.ringTime)
          },
          caller_id: {
            '#text': utils.toString(this.callerId)
          },
          country_id: {
            '#text': utils.toString(this.countryId)
          },
          gate_id: {
            '#text': utils.toString(this.gateId)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var OneToOneOutdialCancelRequest = function OneToOneOutdialCancelRequest(uii) {
      this.uii = uii;
    };
    /*
     * This class is responsible for creating a new packet to cancel
     * an in-progress outbound call.
     */


    OneToOneOutdialCancelRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.ONE_TO_ONE_OUTDIAL_CANCEL,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          uii: {
            '#text': utils.toString(this.uii)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var PauseRecordRequest = function PauseRecordRequest(record) {
      this.record = record;
    };
    /*
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"PAUSE-RECORD",
     *      "agent_id":{"#text":"1856"},
     *      "uii":{"#text":"200808291035510000000900029412"},
     *      "record":{"#text":"TRUE | FALSE"},
     *      "pause":{"#text":"10"}
     *    }
     * }
     */


    PauseRecordRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var pauseTime = '10';

      if (model.currentCall.agentRecording && model.currentCall.agentRecording.pause) {
        pauseTime = model.currentCall.agentRecording.pause;
      }

      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.PAUSE_RECORD,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(model.currentCall.agentId)
          },
          uii: {
            '#text': utils.toString(model.currentCall.uii)
          },
          record: {
            '#text': utils.toString(this.record === true ? 'TRUE' : 'FALSE')
          },
          pause: {
            '#text': utils.toString(pauseTime)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes PAUSE-RECORD packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082910361503344",
     *      "@response_to":"",
     *      "@type":"PAUSE-RECORD",
     *      "uii":{"#text":"200808291035510000000900029412"},
     *      "status":{"#text":"OK | FAILURE"},
     *      "message":{},
     *      "detail":{},
     *      "state":{"#text":"RECORDING | PAUSED"},
     *      "pause":{"#text":"10"}
     *    }
     * }
     */


    PauseRecordRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      var currUII = '';

      if (UIModel.getInstance().currentCall.uii) {
        currUII = UIModel.getInstance().currentCall.uii;
      }

      formattedResponse.uii = utils.getText(resp, 'uii');
      formattedResponse.state = utils.getText(resp, 'state');
      formattedResponse.pause = utils.getText(resp, 'pause');

      if (formattedResponse.status === 'OK') {
        // make sure we are talking about the same call
        if (formattedResponse.uii === currUII) {
          if (formattedResponse.message === '') {
            formattedResponse.message = "Broadcasting new record state of ".concat(formattedResponse.state);
          }

          utils.logMessage(LOG_LEVELS.DEBUG, "Broadcasting new record state of ".concat(formattedResponse.state), response);
        } else {
          utils.logMessage(LOG_LEVELS.DEBUG, 'Pause Record Response is for a different call...discarding', response);
        }
      } else {
        if (formattedResponse.message === '') {
          formattedResponse.message = "Error processing PAUSE-RECORD request.".concat(formattedResponse.message, "\n").concat(formattedResponse.detail);
        }

        utils.logMessage(LOG_LEVELS.WARN, formattedResponse.message, response);
      }

      return formattedResponse;
    };

    var PingCallRequest = function PingCallRequest() {};

    PingCallRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.PING_CALL,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': UIModel.getInstance().currentCall.agentId
          },
          uii: {
            '#text': UIModel.getInstance().currentCall.uii
          }
        }
      };
      return JSON.stringify(msg);
    };

    var PreviewDialRequest = function PreviewDialRequest(action, searchFields, requestId, leadPhone) {
      this.agentId = UIModel.getInstance().agentSettings.agentId;
      this.searchFields = searchFields || [];
      this.requestId = requestId || '';
      this.action = action || '';
      this.leadPhone = leadPhone || ''; // pipe leads only
    };
    /*
     * searchFields = [
     *  {key: "name", value: "Danielle"},
     *  {key: "number", value: "5555555555"
     * ];
     */


    PreviewDialRequest.prototype.formatJSON = function () {
      var fields = {};

      for (var i = 0; i < this.searchFields.length; i++) {
        var fieldObj = this.searchFields[i];
        fields[fieldObj.key] = {
          '#text': utils.toString(fieldObj.value)
        };
      }

      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.PREVIEW_DIAL,
          '@message_id': utils.getMessageId(),
          '@action': this.action,
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          pending_request_id: {
            '#text': utils.toString(this.requestId)
          },
          lead_phone: {
            '#text': utils.toString(this.leadPhone)
          },
          search_fields: fields // { "name": {"#text": "Danielle" } }

        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling PREVIEW-DIAL packets received
     * from the dialer. It will save a copy of it in the UIModel.
     *
     * {"dialer_request":{
     *      "@action":"", // <-- empty for Preview fetch, otherwise "SEARCH"
     *      "@callbacks":"TRUE|FALSE"
     *      ,"@message_id":"ID2008091513163400220",
     *      "@response_to":"",
     *      "@type":"PREVIEW_DIAL",
     *      "dial_group_id":{"#text":"200018"},
     *      "account_id":{"#text":"99999999"},
     *      "agent_id":{"#text":"1810"},
     *      "is_insert":{"#text":"TRUE|FALSE"}, <--- TRUE if search triggered by insert
     *      "destinations":{
     *          "lead":[
     *              {
     *                  "@aux_data1":"","@aux_data2":"","@aux_data3":"","@aux_data4":"","@aux_data5":"",
     *                  "@aux_phone":"","@campaign_id":"51","@destination":"9548298548","@dnis":"1112223333",
     *                  "@extern_id":"amanda","@lead_id":"2646","@lead_state":"PENDING","@live_answer_msg":"",
     *                  "@mach_answer_msg":"","@machine_detect":"FALSE","@request_key":"IQ982008091516241101125",
     *                  "@valid_until":"2008-09-15 17:24:11","extern_id":{"#text":"9548298548"},
     *                  "first_name":{"#text":"Amanda"},"mid_name":{"#text":"Amanda"},"last_name":{"#text":"Machutta2"},
     *                  "address1":{},"address2":{},"city":{},"state":{},"zip":{},"aux_greeting":{},
     *                  "aux_external_url":{}, "app_url":{}
     *              },
     *          ]
     *      }
     *    }
     * }
     */


    PreviewDialRequest.prototype.processResponse = function (notification) {
      var notif = notification.dialer_request;
      var model = UIModel.getInstance();
      var leads = utils.processResponseCollection(notif, 'destinations', 'lead'); // send over requestId (as well as requestKey for backwards compatibility)
      // to match previewLeadState.notification property

      for (var l = 0; l < leads.length; l++) {
        var lead = leads[l];
        lead.requestId = lead.requestKey;
        lead.ani = lead.destination; // add ani prop since used in new call packet & update lead
        // In case of a single lead returned, the XML converter to JSON will add lead as an object and not an array
        //

        if (!Array.isArray(notif.destinations.lead)) {
          notif.destinations.lead = [notif.destinations.lead];
        } // parse extra data correctly


        try {
          var notifLead = notif.destinations.lead[l];

          if (notifLead.extra_data) {
            // if this lead doesn't match the current lead, find it from the notification
            if (notifLead['@lead_id'] !== lead.leadId) {
              notifLead = notif.destinations.lead.filter(function (destLead) {
                return destLead['@lead_id'] === lead.leadId;
              });
            }

            delete lead.extraDatas;
            lead.extraData = {};

            for (var key in notifLead.extra_data) {
              lead.extraData[key] = notifLead.extra_data[key]['#text'];
            }
          }
        } catch (e) {
          console.warn("error parsing lead extra data: ".concat(e));
        }
      }

      var formattedResponse = {
        action: notif['@action'],
        callbacks: notif['@callbacks'] === 'TRUE',
        dialGroupId: utils.getText(notif, 'dial_group_id'),
        accountId: utils.getText(notif, 'account_id'),
        agentId: utils.getText(notif, 'agent_id'),
        isInsert: utils.getText(notif, 'is_insert'),
        leads: leads
      };

      if (notif['@callbacks'] === 'TRUE') {
        utils.logMessage(LOG_LEVELS.INFO, "New CALLBACK packet request rec'd from dialer", notification); // clear callbacks??
        // model.callbacks = [];

        for (var l = 0; l < leads.length; l++) {
          var lead = leads[l];
          model.callbacks.push(lead);
        }
      } else {
        model.outboundSettings.previewDialLeads = leads;
      }

      return formattedResponse;
    };

    var RecordRequest = function RecordRequest(record) {
      this.record = record;
    };
    /*
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"RECORD",
     *      "agent_id":{"#text":"1856"},
     *      "uii":{"#text":"200808291035510000000900029412"},
     *      "record":{"#text":"TRUE | FALSE"}
     *    }
     * }
     */


    RecordRequest.prototype.formatJSON = function () {
      var model = UIModel.getInstance();
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.RECORD,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(model.currentCall.agentId)
          },
          uii: {
            '#text': utils.toString(model.currentCall.uii)
          },
          record: {
            '#text': this.record === true ? 'TRUE' : 'FALSE'
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes RECORD packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082910361503344",
     *      "@response_to":"",
     *      "@type":"RECORD",
     *      "uii":{"#text":"200808291035510000000900029412"},
     *      "status":{"#text":"OK"},
     *      "message":{},
     *      "detail":{},
     *      "state":{"#text":"RECORDING | STOPPED"}
     *    }
     * }
     */


    RecordRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      var currUII = '';

      if (UIModel.getInstance().currentCall.uii) {
        currUII = UIModel.getInstance().currentCall.uii;
      }

      formattedResponse.uii = utils.getText(resp, 'uii');
      formattedResponse.state = utils.getText(resp, 'state');

      if (formattedResponse.status === 'OK') {
        // make sure we are talking about the same call
        if (formattedResponse.uii === currUII) {
          if (formattedResponse.message === '') {
            formattedResponse.message = "Broadcasting new record state of ".concat(formattedResponse.state);
          }

          utils.logMessage(LOG_LEVELS.DEBUG, formattedResponse.message, response);
        } else {
          utils.logMessage(LOG_LEVELS.DEBUG, 'Record Response is for a different call...discarding', response);
        }
      } else {
        if (formattedResponse.message === '') {
          formattedResponse.message = "Error processing RECORD request.".concat(formattedResponse.message, "\n").concat(formattedResponse.detail);
        }

        utils.logMessage(LOG_LEVELS.WARN, formattedResponse.message, response);
      }

      return formattedResponse;
    };

    var RequeueRequest = function RequeueRequest(queueId, skillId, maintain) {
      this.queueId = queueId;
      this.skillId = skillId;
      this.maintain = maintain;
    };

    RequeueRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.REQUEUE,
          '@message_id': utils.getMessageId(),
          response_to: '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          uii: {
            '#text': UIModel.getInstance().currentCall.uii
          },
          gate_number: {
            '#text': utils.toString(this.queueId)
          },
          skill_id: {
            '#text': utils.toString(this.skillId)
          },
          maintain_agent: {
            '#text': this.maintain === true ? 'TRUE' : 'FALSE'
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes RE-QUEUE packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082817165103291",
     *      "@response_to":"UIV220088281716486",
     *      "@type":"RE-QUEUE",
     *      "status":"OK",
     *      "message":"Success.",
     *      "detail":"The re-queue request was successfully processed.",
     *      "agent_id":{"#text":"1856"},
     *      "uii":{"#text":"200808281716090000000900028070"},
     *      "gate_number":{"#text":"19"},
     *      "maintain_agent":{"#text":"FALSE"}
     *    }
     * }
     */


    RequeueRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.agentId = utils.getText(resp, 'agent_id');
      formattedResponse.uii = utils.getText(resp, 'uii');
      formattedResponse.queueId = utils.getText(resp, 'gate_number');

      if (formattedResponse.status === 'OK') {} else {
        var message = "There was an error processing the requeue request. ".concat(formattedResponse.detail);
        utils.logMessage(LOG_LEVELS.WARN, message, response);
      }

      return formattedResponse;
    };

    var ScriptConfigRequest = function ScriptConfigRequest(scriptId, version) {
      this.scriptId = scriptId;
      this.version = version || null;
    };
    /*
     * This event is responsible for requesting a script object
     */


    ScriptConfigRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@message_id': utils.getMessageId(),
          response_to: '',
          '@type': MESSAGE_TYPES.SCRIPT_CONFIG,
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          script_id: {
            '#text': utils.toString(this.scriptId)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class process SCRIPT-CONFIG packets received from IntelliQueue.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082817165103294",
     *      "@response_to":"",
     *      "@type":"SCRIPT-CONFIG",
     *      "status":{"#text":"OK"},
     *      "message":{},
     *      "script_id":{"#text":"123"},
     *      "version":{"#text":"1"},
     *      "json":{},
     *   }
     * }
     */


    ScriptConfigRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);

      if (formattedResponse.status === 'true') {
        formattedResponse.status = true;
        formattedResponse.scriptId = utils.getText(resp, 'script_id');
        formattedResponse.version = utils.getText(resp, 'version');
        formattedResponse.json = utils.getText(resp, 'json'); // store script on model

        UIModel.getInstance().scriptSettings.loadedScripts[formattedResponse.scriptId] = formattedResponse;
      } else {
        formattedResponse.status = false;
      }

      return formattedResponse;
    };

    var ScriptResultRequest = function ScriptResultRequest(uii, scriptId, jsonResult) {
      this.uii = uii;
      this.scriptId = scriptId;
      this.jsonResult = jsonResult;
    };
    /*
     * This event is responsible for sending the script result object
     */


    ScriptResultRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@message_id': utils.getMessageId(),
          response_to: '',
          '@type': MESSAGE_TYPES.SCRIPT_RESULT,
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          uii: {
            '#text': utils.toString(this.uii)
          },
          script_id: {
            '#text': utils.toString(this.scriptId)
          },
          json_result: {
            '#text': JSON.stringify(this.jsonResult)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var SearchDirectoryRequest = function SearchDirectoryRequest() {};

    SearchDirectoryRequest.prototype.searchDirectory = function (searchString) {
      UIModel.getInstance().searchDirectoryRequest = this;

      _searchDirectory('rcdirectory/getRcCorporateDirectory', searchString);
    };

    SearchDirectoryRequest.prototype.processResponse = function (response) {
      UIModel.getInstance().filteredDirectory = response;
      return UIModel.getInstance().filteredDirectory;
    };

    function _searchDirectory(path, searchString) {
      var model = UIModel.getInstance();
      var accountId = model.agentSettings.accountId; // subAccountId

      var baseUrl = model.authHost + model.baseApiUri;
      var engageAccessToken = "Bearer ".concat(utils.toString(UIModel.getInstance().authenticateRequest.engageAccessToken));
      var params = {
        headers: {
          'Content-Type': 'application/json'
        },
        queryParams: {}
      };
      params.headers.Authorization = engageAccessToken;
      params.queryParams.searchString = searchString;
      params.queryParams.accountId = accountId;
      var errorMsg = "Error on request to search Directory: ".concat(baseUrl).concat(path);
      new HttpService(baseUrl).httpGet(path, params).then(function (response) {
        try {
          response = JSON.parse(response.response);
          var searchDirResponse = UIModel.getInstance().searchDirectoryRequest.processResponse(response);
          utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SEARCH_DIR, searchDirResponse);
        } catch (err) {
          utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
        }
      }, function (err) {
        var errResponse = {
          type: 'Error retrieving directory list',
          message: errorMsg
        };
        utils.logMessage(LOG_LEVELS.WARN, errorMsg, err); // still fire callback on error response

        utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SEARCH_DIR, errResponse);
      });
    }

    var StatsRequest = function StatsRequest() {};
    /*
     * { "ui_request": {
     *      "@response_to":"",
     *      "@message_id":"IS20160901142437535",
     *      "@type":"STATS"
     *    }
     * }
     */


    StatsRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IS',
          '@type': MESSAGE_TYPES.STATS,
          '@message_id': utils.getMessageId(),
          '@response_to': ''
        }
      };
      return JSON.stringify(msg);
    };

    var TcpaSafeRequest = function TcpaSafeRequest(action, searchFields, requestId, leadPhone) {
      this.agentId = UIModel.getInstance().agentSettings.agentId;
      this.searchFields = searchFields || [];
      this.requestId = requestId || '';
      this.action = action || '';
      this.leadPhone = leadPhone || ''; // pipe leads only
    };
    /*
     * searchFields = [
     *  {key: "name", value: "Danielle"},
     *  {key: "number", value: "5555555555"
     * ];
     */


    TcpaSafeRequest.prototype.formatJSON = function () {
      var fields = {};

      for (var i = 0; i < this.searchFields.length; i++) {
        var fieldObj = this.searchFields[i];
        fields[fieldObj.key] = {
          '#text': utils.toString(fieldObj.value)
        };
      }

      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.TCPA_SAFE,
          '@message_id': utils.getMessageId(),
          '@action': this.action,
          response_to: '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          pending_request_id: {
            '#text': utils.toString(this.requestId)
          },
          lead_phone: {
            '#text': utils.toString(this.leadPhone)
          },
          search_fields: fields // { "name": {"#text": "Danielle"} }

        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling TCPA-SAFE packets received
     * from the dialer. It will save a copy of it in the UIModel.
     *
     * {"dialer_request":{
     *      "@action":"",
     *      "@callbacks":"TRUE|FALSE"
     *      ,"@message_id":"ID2008091513163400220",
     *      "@response_to":"",
     *      "@type":"TCPA_SAFE",
     *      "dial_group_id":{"#text":"200018"},
     *      "account_id":{"#text":"99999999"},
     *      "agent_id":{"#text":"1810"},
     *      "is_insert":{"#text":"TRUE|FALSE"}, <--- TRUE if search triggered by insert
     *      "destinations":{
     *          "lead":[
     *              {
     *                  "@aux_data1":"","@aux_data2":"","@aux_data3":"","@aux_data4":"","@aux_data5":"",
     *                  "@aux_phone":"","@campaign_id":"51","@destination":"9548298548","@dnis":"1112223333",
     *                  "@extern_id":"amanda","@lead_id":"2646","@lead_state":"PENDING","@live_answer_msg":"",
     *                  "@mach_answer_msg":"","@machine_detect":"FALSE","@request_key":"IQ982008091516241101125",
     *                  "@valid_until":"2008-09-15 17:24:11","extern_id":{"#text":"9548298548"},
     *                  "first_name":{"#text":"Amanda"},"mid_name":{"#text":"Amanda"},"last_name":{"#text":"Machutta2"},
     *                  "address1":{},"address2":{},"city":{},"state":{},"zip":{},"aux_greeting":{},
     *                  "aux_external_url":{}, "app_url":{}
     *              },
     *          ]
     *      }
     *    }
     * }
     *
     */


    TcpaSafeRequest.prototype.processResponse = function (notification) {
      var notif = notification.dialer_request;
      var model = UIModel.getInstance();
      var leads = utils.processResponseCollection(notif, 'destinations', 'lead'); // send over requestId (as well as requestKey for backwards compatibility)
      // to match tcpaSafeLeadState.notification property

      for (var l = 0; l < leads.length; l++) {
        var lead = leads[l];
        lead.requestId = lead.requestKey;
        lead.ani = lead.destination; // add ani prop since used in new call packet & update lead
        // parse extra data correctly

        try {
          var notifLead = notif.destinations.lead[l];

          if (notifLead.extra_data) {
            // if this lead doesn't match the current lead, find it from the notification
            if (notifLead['@lead_id'] !== lead.leadId) {
              notifLead = notif.destinations.lead.filter(function (destLead) {
                return destLead['@lead_id'] === lead.leadId;
              });
            }

            delete lead.extraDatas;
            lead.extraData = {};

            for (var key in notifLead.extra_data) {
              lead.extraData[key] = notifLead.extra_data[key]['#text'];
            }
          }
        } catch (e) {
          console.warn("error parsing lead extra data: ".concat(e));
        }
      }

      var formattedResponse = {
        action: notif['@action'],
        callbacks: notif['@callbacks'] === 'TRUE',
        dialGroupId: utils.getText(notif, 'dial_group_id'),
        accountId: utils.getText(notif, 'account_id'),
        agentId: utils.getText(notif, 'agent_id'),
        isInsert: utils.getText(notif, 'is_insert'),
        leads: leads
      };

      if (notif['@callbacks'] === 'TRUE') {
        var message = "New CALLBACK packet request rec'd from dialer";
        utils.logMessage(LOG_LEVELS.INFO, message, notification); // clear callbacks??
        // model.callbacks = [];

        for (var l = 0; l < leads.length; l++) {
          var lead = leads[l];
          model.callbacks.push(lead);
        }
      } else {
        model.outboundSettings.tcpaSafeLeads = leads;
      }

      return formattedResponse;
    };

    var UpdateDialDestinationRequest = function UpdateDialDestinationRequest(dialDest, isSoftphoneError) {
      this.dialDest = dialDest;
      this.isSoftphoneError = isSoftphoneError || false;
    };
    /*
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":MESSAGE_TYPES.UPDATE_DIAL_DESTINATION,
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "agent_id":"1",
     *      "dial_dest":{"#text":"blah@something.com"},
     *      "log_softphone_error": {"#text":"TRUE|FALSE"},
     *    }
     * }
     */


    UpdateDialDestinationRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.UPDATE_DIAL_DESTINATION,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          },
          dial_dest: {
            '#text': utils.toString(this.dialDest)
          },
          log_softphone_error: {
            '#text': utils.toString(this.isSoftphoneError === true ? 'TRUE' : 'FALSE')
          }
        }
      };
      return JSON.stringify(msg);
    };

    var XferWarmRequest = function XferWarmRequest(dialDest, callerId, sipHeaders, countryId) {
      this.dialDest = dialDest;
      this.callerId = callerId || '';
      this.sipHeaders = sipHeaders || [];
      this.countryId = countryId;
    };

    XferWarmRequest.prototype.formatJSON = function () {
      var fields = [];

      for (var i = 0; i < this.sipHeaders.length; i++) {
        var fieldObj = this.sipHeaders[i];
        fields.push({
          '@name': utils.toString(fieldObj.name),
          '@value': utils.toString(fieldObj.value)
        });
      }

      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.XFER_WARM,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          uii: {
            '#text': UIModel.getInstance().currentCall.uii
          },
          dial_dest: {
            '#text': utils.toString(this.dialDest)
          },
          caller_id: {
            '#text': utils.toString(this.callerId)
          },
          country_id: {
            '#text': utils.toString(this.countryId)
          },
          xfer_header: fields
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class processes WARM-XFER packets rec'd from IQ.
     *
     * {"ui_response":{
     *      "@message_id":"IQ10012016082314475000219",
     *      "@response_to":"",
     *      "@type":"WARM-XFER",
     *      "agent_id":{"#text":"1"},
     *      "uii":{"#text":"201608231447590139000000000200"},
     *      "session_id":{"#text":"3"},
     *      "status":{"#text":"OK"},
     *      "dial_dest":{"#text":"3038593775"},
     *      "message":{"#text":"OK"},"detail":{}
     *    }
     * }
     *  Response on CANCEL:
     *  {"ui_response":{
     *      "@message_id":"IQ10012016082315005000264",
     *      "@response_to":"",
     *      "@type":"WARM-XFER",
     *      "agent_id":{"#text":"1"},
     *      "uii":{"#text":"201608231501090139000000000204"},
     *      "session_id":{},
     *      "status":{"#text":"FAILURE"},
     *      "dial_dest":{"#text":"3038593775"},
     *      "message":{"#text":"Transfer CANCELED"},
     *      "detail":{"#text":"NOANSWER after 3 seconds."}
     *    }
     * }
     */


    XferWarmRequest.prototype.processResponse = function (response) {
      var resp = response.ui_response;
      var formattedResponse = utils.buildDefaultResponse(response);
      formattedResponse.agentId = utils.getText(resp, 'agent_id');
      formattedResponse.uii = utils.getText(resp, 'uii');
      formattedResponse.sessionId = utils.getText(resp, 'session_id');
      formattedResponse.dialDest = utils.getText(resp, 'dial_dest');

      if (formattedResponse.status === 'OK') {
        utils.logMessage(LOG_LEVELS.DEBUG, "Warm Xfer to ".concat(formattedResponse.dialDest, " processed successfully."), response);
      } else {
        utils.logMessage(LOG_LEVELS.WARN, "There was an error processing the Warm Xfer request. ".concat(formattedResponse.message, "\n").concat(formattedResponse.detail), response);
      }

      return formattedResponse;
    };

    var XferWarmCancelRequest = function XferWarmCancelRequest(dialDest) {
      this.dialDest = dialDest;
    };

    XferWarmCancelRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.XFER_WARM_CANCEL,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          uii: {
            '#text': UIModel.getInstance().currentCall.uii
          },
          dial_dest: {
            '#text': utils.toString(this.dialDest)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var WebRTCRequest = function WebRTCRequest() {};

    WebRTCRequest.prototype.getSipRegistrationInfo = function () {
      UIModel.getInstance().WebRTCRequest = this;

      _getSipRegistrationInfo('sip/sipRegistrationInfo', {
        agentId: UIModel.getInstance().agentSettings.agentId
      });
    };
    /*
     * legacy response
     * {
     *   "sipInfo": [
     *       {
     *           "transport": "wss",
     *           "username": "yadvendra_agent",
     *           "password": "oct@2018",
     *           "domain": "d03-reg1.vacd.biz",
     *           "outboundProxy": "d03-reg1.vacd.biz:8089/freeswitch"
     *       }
     *   ]
     * }
     *
     * RC SSO response
     * {
     *   "sipInfo": [
     *       {
     *           "transport": "WSS",
     *           "username": "18662032059*101",
     *           "password": "B77O85vO",
     *           "authorizationId": "400017513008",
     *           "domain": "sip-cfintams.lab.nordigy.ru",
     *           "outboundProxy": "webphone-sip-cfintams.lab.nordigy.ru:8083"
     *       }
     *   ]
     * }
     * */


    WebRTCRequest.prototype.processResponse = function (response) {
      var softphoneSettings = UIModel.getInstance().softphoneSettings;
      softphoneSettings.sipInfo = response.sipInfo;
      return softphoneSettings.sipInfo;
    };

    function _getSipRegistrationInfo(path, queryParams) {
      var model = UIModel.getInstance();
      var baseUrl = model.authHost + model.baseApiUri;
      var engageAccessToken = "Bearer ".concat(utils.toString(UIModel.getInstance().authenticateRequest.engageAccessToken));
      var params = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      params.headers.Authorization = engageAccessToken;
      params.queryParams = queryParams;
      var errorMsg = "Error on request get to sip registration info. URL: ".concat(baseUrl).concat(path);
      new HttpService(baseUrl).httpGet(path, params).then(function (response) {
        try {
          response = JSON.parse(response.response);
          var webRTCResponse = UIModel.getInstance().WebRTCRequest.processResponse(response);
          utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.WEBRTC_INFO, webRTCResponse);
        } catch (err) {
          utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
        }
      }, function (err) {
        var errResponse = {
          type: 'Error retrieving sip registration information',
          message: errorMsg
        };
        utils.logMessage(LOG_LEVELS.WARN, errorMsg, err); // still fire callback on error response

        utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.WEBRTC_INFO, errResponse);
      });
    }

    var ChatAgentEndRequest = function ChatAgentEndRequest(agentId, uii) {
      this.uii = uii;
      this.agentId = agentId;
    };
    /*
     External Chat :
    when agent submits a chat end request, send "CHAT-AGENT-END" request to IntelliQueue
     {
        "ui_request" : {
            "@destination" : "IQ",
            "@type" : MESSAGE_TYPES.CHAT_AGENT_END,
            "uii":{
                "#text":utils.toString(this.uii)
            },
            "agent_id":{
                "#text":utils.toString(this.agentId)
            }
        }
    }
     */


    ChatAgentEndRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_AGENT_END,
          uii: {
            '#text': utils.toString(this.uii)
          },
          agent_id: {
            '#text': utils.toString(this.agentId)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var ChatAliasRequest = function ChatAliasRequest(alias) {
      this.alias = alias;
    };
    /*
     * This class is responsible for creating the request to change chat alias
     * packet and sending it to intelliservices.
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"CHAT-ALIAS",
     *      "alias":{"#text":""}
     *    }
     * }
     */


    ChatAliasRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IS',
          '@type': MESSAGE_TYPES.CHAT_ALIAS,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          alias: {
            '#text': utils.toString(this.alias)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var ChatDispositionRequest = function ChatDispositionRequest(uii, agentId, dispositionId, notes, sendAcknowlegement, survey, sessionId) {
      this.uii = uii;
      this.agentId = agentId;
      this.dispositionId = dispositionId;
      this.notes = notes || '';
      this.sendAcknowlegement = sendAcknowlegement || false;
      this.sessionId = sessionId;
      /*
       * survey = {
       *      first_name: {
       *          leadField: "first_name"
       *          value: "Geoff"
       *      },
       *      last_name: {
       *          leadField: "last_name"
       *          value: "Mina"
       *      }
       *      ...
       * }
       */

      this.survey = survey || null;
    };
    /*
     * External Chat:
     * When agent dispositions a chat, send "CHAT-DISPOSITION" request to IntelliQueue
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-DISPOSITION",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "uii":{"#text":""},
     *      "agent_id":{"#text":""},
     *      "session_id" : {"#text" : ""},
     *      "disposition_id":{"#text":""},
     *      "notes":{"#text":"hello"},
     *      "do_ack":{"#text":"true"},
     *      "survey":{
     *          "response":[
     *              {"@extern_id":"text_box","#text":"hello"},
     *              {"@extern_id":"check_box","#text":"20"},
     *              {"@extern_id":"radio_save","#text":"23"}
     *          ]
     *      }
     *    }
     * }
     */


    ChatDispositionRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_DISPOSITION,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          uii: {
            '#text': utils.toString(this.uii)
          },
          agent_id: {
            '#text': utils.toString(this.agentId)
          },
          session_id: {
            '#text': utils.toString(this.sessionId)
          },
          disposition_id: {
            '#text': utils.toString(this.dispositionId)
          },
          notes: {
            '#text': utils.toString(this.notes)
          },
          do_ack: {
            '#text': this.sendAcknowlegement === true ? 'TRUE' : 'FALSE'
          }
        }
      };
      /*
       * converts survey to this response
       * survey : {
       *      response: [
       *          { "@extern_id":"", "@lead_update_column":"", "#text":"" }
       *      ]
       * }
       */

      if (this.survey !== null) {
        var response = [];
        var keys = Object.keys(this.survey);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var obj = {
            '@extern_id': key,
            '#text': utils.toString(this.survey[key].value)
          };
          response.push(obj);
        }

        msg.ui_request.survey = {
          response: response
        };
      }

      return JSON.stringify(msg);
    };

    var ChatListRequest = function ChatListRequest(agentId, monitorAgentId) {
      this.agentId = agentId;
      this.monitorAgentId = monitorAgentId;
    };
    /*
     * External Chat:
     * Requests a list of all chats by monitor agent id
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-LIST",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "agent_id":{"#text":""},
     *      "monitor_agent_id":{"#text":""}
     *    }
     * }
     */


    ChatListRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_LIST,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(this.agentId)
          },
          monitor_agent_id: {
            '#text': utils.toString(this.monitorAgentId)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * External Chat:
     * This class is responsible for handling "CHAT-LIST" packets from IntelliQueue.
     *
     *  {
     *      "ui_response":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"CHAT-LIST",
     *          "@response_to":"",
     *          "agent_id":{"#text":"17"},
     *          "monitor_agent_id":{"#text":"18"},
     *          "chat_list": {}
     *      }
     *  }
     */


    ChatListRequest.prototype.processResponse = function (response) {
      var notif = response.ui_response;
      var model = UIModel.getInstance();
      model.chatListResponse = response;
      return {
        message: 'Received CHAT-LIST notification',
        status: 'OK',
        messageId: notif['@message_id'],
        agentId: utils.getText(notif, 'agent_id'),
        monitorAgentId: utils.getText(notif, 'monitor_agent_id'),
        chatList: utils.processResponseCollection(notif, 'chat_list', 'active_chat')
      };
    };

    var ChatMessageRequest = function ChatMessageRequest(uii, agentId, message, whisper) {
      this.uii = uii;
      this.agentId = agentId;
      this.message = message;
      this.whisper = whisper;
    };
    /*
     * External Chat:
     * When agent submits a chat message, send "CHAT-MESSAGE" request to IntelliQueue
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-MESSAGE",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "uii":{"#text":""},
     *      "agent_id":{"#text":""},
     *      "message":{"#text":"hello"},
     *      "whisper":{"#text":"true|false"}
     *    }
     * }
     */


    ChatMessageRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_MESSAGE,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          uii: {
            '#text': utils.toString(this.uii)
          },
          agent_id: {
            '#text': utils.toString(this.agentId)
          },
          message: {
            '#text': utils.toString(this.message)
          },
          whisper: {
            '#text': utils.toString(this.whisper)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling external CHAT-MESSAGE packets received from
     * IntelliQueue.
     *
     * {"ui_notification":{
     *      "@message_id":"",
     *      "@response_to":"",
     *      "@type":"CHAT-MESSAGE",
     *      "uii":{"#text":""},
     *      "account_id":{"#text":""},
     *      "from":{"#text":""},
     *      "message":{"#text":"hello"},
     *      "dts":{"#text":"2017-05-10 12:40:28"},
     *      "dequeue_agent_id":{"#text":"123"},
     *      "whisper":{"#text":'TRUE'|'FALSE'"}
     *    }
     * }
     */


    ChatMessageRequest.prototype.processResponse = function (response) {
      var resp = response.ui_notification;
      var dts = utils.getText(resp, 'dts').trim();
      var dtsDate = new Date(dts.replace(' ', 'T'));
      var formattedResponse = {
        uii: utils.getText(resp, 'uii'),
        accountId: utils.getText(resp, 'account_id'),
        from: utils.getText(resp, 'from'),
        type: utils.getText(resp, 'type'),
        message: utils.getText(resp, 'message'),
        whisper: utils.getText(resp, 'whisper'),
        dequeueAgentId: utils.getText(resp, 'dequeue_agent_id'),
        dts: dtsDate,
        mediaLinks: utils.processResponseCollection(resp, 'media_links', 'link')
      };
      utils.logMessage(LOG_LEVELS.DEBUG, 'New CHAT-MESSAGE packet received from IntelliQueue', response);
      return formattedResponse;
    };

    var ChatPresentedResponseRequest = function ChatPresentedResponseRequest(uii, messageId, response, responseReason) {
      this.uii = uii;
      this.messageId = messageId;
      this.response = response;
      this.responseReason = responseReason || '';
    };
    /*
     * External Chat:
     * When Agent receives a CHAT-PRESENTED notification, respond with
     * either ACCEPT or REJECT for presented chat.
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-PRESENTED",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "uii":{"#text":""},
     *      "agent_id":{"#text":""},
     *      "response":{"#text":"ACCEPT|REJECT"},
     *      "response_reason":{"#text":""}
     *    }
     * }
     */


    ChatPresentedResponseRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_PRESENTED_RESPONSE,
          '@message_id': utils.getMessageId(),
          '@response_to': this.messageId,
          uii: {
            '#text': utils.toString(this.uii)
          },
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          response: {
            '#text': utils.toString(this.response)
          },
          response_reason: {
            '#text': utils.toString(this.responseReason)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var ChatRequeueRequest = function ChatRequeueRequest(uii, agentId, chatQueueId, skillId, maintainAgent) {
      this.uii = uii;
      this.agentId = agentId;
      this.chatQueueId = chatQueueId;
      this.skillId = skillId || '';
      this.maintainAgent = maintainAgent || false;
    };
    /*
     * External Chat:
     * When agent submits a chat message, send "CHAT-REQUEUE" request to IntelliQueue
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-REQUEUE",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "uii":{"#text":""},
     *      "agent_id":{"#text":""},
     *      "chat_queue_id":{"#text":""},
     *      "skill_id":{"#text":""},
     *      "maintain_agent":{"#text":"true|false"}
     *    }
     * }
     */


    ChatRequeueRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_REQUEUE,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          uii: {
            '#text': utils.toString(this.uii)
          },
          agent_id: {
            '#text': utils.toString(this.agentId)
          },
          chat_queue_id: {
            '#text': utils.toString(this.chatQueueId)
          },
          skill_id: {
            '#text': utils.toString(this.skillId)
          },
          maintain_agent: {
            '#text': utils.toString(this.maintainAgent)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var ChatRoomRequest = function ChatRoomRequest(action, roomType, roomId, agentOne, agentTwo) {
      this.action = action;
      this.roomType = roomType;
      this.roomId = roomId;
      this.agentOne = agentOne || '';
      this.agentTwo = agentTwo || '';
    };
    /*
     * This class is responsible for sending the packet requesting to either enter
     * a chatroom, or to exit a chatroom to IS. It also handles private chats. There are
     * two possible ways these packets could look:
     *
     * //PUBLIC
     * {"ui_request":{
     *      "@destination":"IS",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "@type":"CHAT-ROOM",
     *      "@room_type":"PUBLIC",
     *      "room_id":{"#text":""},
     *      "action":{"#text":"EXIT|ENTER"}
     *    }
     * }
     * -OR-
     * // PRIVATE
     * {"ui_request":{
     *      "@destination":"IS",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "@type":"CHAT-ROOM",
     *      "@room_type":"PRIVATE",
     *      "agent_one":{"#text":""},
     *      "agent_two":{"#text":""},
     *      "action":{"#text":"ENTER|EXIT"}
     *    }
     * }
     *
     */


    ChatRoomRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IS',
          '@type': MESSAGE_TYPES.CHAT_ROOM,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          action: {
            '#text': utils.toString(this.action)
          }
        }
      };

      if (this.action !== 'EXIT') {
        msg.ui_request['@room_type'] = this.roomType;
      }

      if (this.roomType === 'PRIVATE' && this.action === 'ENTER') {
        msg.ui_request.agent_one = {
          '#text': utils.toString(this.agentOne)
        };
        msg.ui_request.agent_two = {
          '#text': utils.toString(this.agentTwo)
        };
      } else {
        msg.ui_request.room_id = {
          '#text': utils.toString(this.roomId)
        };
      }

      return JSON.stringify(msg);
    };

    var ChatRoomStateRequest = function ChatRoomStateRequest() {};
    /*
     * This class is responsible for processing CHAT-ROOM-STATE packets received
     * from IntelliServices.
     *
     * {"ui_request":{
     *      "@message_id":"",
     *      "@response_to":"",
     *      "@type":"CHAT-ROOM-STATE",
     *      "room_id":{"#text":""},
     *      "agent_id":{"#text":""},
     *      "chat_alias":{"#text":""},
     *      "state":{"#text":""}
     *    }
     * }
     */


    ChatRoomStateRequest.prototype.processResponse = function (response) {
      var resp = response.ui_request;
      var formattedResponse = {
        roomId: utils.getText(resp, 'room_id'),
        agentId: utils.getText(resp, 'agent_id'),
        chatAlias: utils.getText(resp, 'chat_alias'),
        state: utils.getText(resp, 'state')
      };
      utils.logMessage(LOG_LEVELS.DEBUG, "Chat-Room-State update packet received for room #".concat(formattedResponse.roomId), response);
      return formattedResponse;
    };

    var ChatSendRequest = function ChatSendRequest(roomId, message) {
      this.roomId = roomId;
      this.message = message;
    };
    /*
     * This class is responsible for creating the CHAT message packet and sending
     * it to IntelliServices.
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"CHAT",
     *      "room_id":{"#text":""}
     *      "message":{"#text":""}
     *    }
     * }
     */


    ChatSendRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IS',
          '@type': MESSAGE_TYPES.CHAT_SEND,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          room_id: {
            '#text': utils.toString(this.roomId)
          },
          message: {
            '#text': utils.toString(this.message)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling CHAT packets received from
     * IntelliServices.
     *
     * //PUBLIC
     * {"ui_request":{
     *      "@message_id":"",
     *      "@response_to":"",
     *      "@type":"CHAT",
     *      "room_type":"GROUP",
     *      "room_id":{"#text":""},
     *      "message":{"#text":""},
     *      "sender":{"#text":""},
     *      "sender_id":{"#text":""},
     *      "room_name":{"#text":""}
     *    }
     * }
     * -OR-
     * // PRIVATE
     * {"ui_request":{
     *      "@dynamic_create":"TRUE",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "@type":"CHAT",
     *      "room_type":"PRIVATE",
     *      "room_id":{"#text":""},
     *      "message":{"#text":""},
     *      "sender":{"#text":""},
     *      "room_name":{"#text":""}
     *    }
     * }
     */


    ChatSendRequest.prototype.processResponse = function (response) {
      var resp = response.ui_request;
      var formattedResponse = {
        roomType: utils.getText(resp, 'room_type'),
        roomId: utils.getText(resp, 'room_id'),
        message: utils.getText(resp, 'message'),
        sender: utils.getText(resp, 'sender'),
        senderId: utils.getText(resp, 'sender_id'),
        roomName: utils.getText(resp, 'room_name'),
        dynamicCreate: utils.getText(resp, 'dynamic_create') === 'TRUE'
      };
      utils.logMessage(LOG_LEVELS.DEBUG, 'New CHAT packet received from IntelliServices', response);
      return formattedResponse;
    };

    var ChatTypingRequest = function ChatTypingRequest(uii, message) {
      this.uii = uii;
      this.message = message;
    };
    /*
     * External Chat:
     * Agent sends typing message to notify client widgets,
     * but the agent's pending message is not sent going this direction.
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-TYPING",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "uii":{"#text":""},
     *      "agent_id":{"#text":""},
     *      "message":{"#text":""}
     *    }
     * }
     */


    ChatTypingRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_TYPING,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          uii: {
            '#text': utils.toString(this.uii)
          },
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          message: {
            '#text': utils.toString(this.message)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var LeaveChatRequest = function LeaveChatRequest(uii, agentId, sessionId) {
      this.uii = uii;
      this.agentId = agentId;
      this.sessionId = sessionId;
    };
    /*
     * External Chat:
     * Requests to terminate a chat session on an existing chat uii
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-DROP-SESSION",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "uii":{"#text":""},
     *      "agent_id":{"#text":""},
     *      "session_id":{"#text":""}
     *    }
     * }
     */


    LeaveChatRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.LEAVE_CHAT,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          uii: {
            '#text': utils.toString(this.uii)
          },
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          session_id: {
            '#text': utils.toString(this.sessionId)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var ChatManualSmsRequest = function ChatManualSmsRequest(agentId, chatQueueId, ani, dnis, message) {
      this.agentId = agentId;
      this.chatQueueId = chatQueueId;
      this.ani = ani;
      this.dnis = dnis;
      this.message = message;
    };
    /*
     * External Chat:
     * When agent submits a manual sms message, send "MANUAL-SMS" request to IntelliQueue
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"MANUAL-SMS",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "agent_id":{"#text":"1995"},
     *      "chatQueueId":{"#text":"44"},
     *      "ani":{"#text":"1231231234"},
     *      "dnis":{"#text":"5435435432"},
     *      "message":{"#text":"hello"}
     *    }
     * }
     */


    ChatManualSmsRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.CHAT_MANUAL_SMS,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(this.agentId)
          },
          chat_queue_id: {
            '#text': utils.toString(this.chatQueueId)
          },
          ani: {
            '#text': utils.toString(this.ani)
          },
          dnis: {
            '#text': utils.toString(this.dnis)
          },
          message: {
            '#text': utils.toString(this.message)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var MonitorChatRequest = function MonitorChatRequest(monitorAgentId) {
      this.monitorAgentId = monitorAgentId;
    };
    /*
     * External Chat:
     * Requests a new session on an existing chat uii
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-MONITOR",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "agent_id":{"#text":""},
     *      "monitor_agent_id":{"#text":""}
     *    }
     * }
     */


    MonitorChatRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.MONITOR_CHAT,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          monitor_agent_id: {
            '#text': utils.toString(this.monitorAgentId)
          }
        }
      };
      return JSON.stringify(msg);
    };

    var StopMonitorChatRequest = function StopMonitorChatRequest(monitorAgentId) {
      this.monitorAgentId = monitorAgentId || '';
    };
    /*
     * External Chat:
     * Requests a termination of a chat monitor session for an agent
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@type":"CHAT-DROP-MONITORING-SESSION",
     *      "@message_id":"",
     *      "@response_to":"",
     *      "agent_id":{"#text":""},
     *      "monitor_agent_id":{"#text":""}
     *    }
     * }
     */


    StopMonitorChatRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IQ',
          '@type': MESSAGE_TYPES.STOP_MONITOR_CHAT,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': UIModel.getInstance().agentSettings.agentId
          },
          monitor_agent_id: {
            '#text': utils.toString(this.monitorAgentId)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * Process a CHAT-DROP-MONITORING-SESSION notification. Used to notify supervisor monitors that agent has logged out.
     *
     * {"ui_notification":{
     *      "@message_id":"IQ10012016080217135001344",
     *      "@response_to":"",
     *      "@type":"CHAT-DROP-MONITORING-SESSION",
     *      "monitored_agent_id":{"#text":"1"}
     *    }
     * }
     */


    StopMonitorChatRequest.prototype.processResponse = function (data) {
      var notif = data.ui_notification;
      return {
        monitoredAgentId: utils.getText(notif, 'monitored_agent_id')
      };
    };

    var SupervisorListRequest = function SupervisorListRequest() {};
    /*
     * This class is responsible for creating a packet to request a list of
     * supervisors from IntelliServices. This is used by the chat function so an
     * agent can grab a list of supervisors and then select one for a private chat.
     *
     * {"ui_request":{
     *      "@destination":"IQ",
     *      "@message_id":"UI200809291036128",
     *      "@response_to":"",
     *      "@type":"SUPERVISOR-LIST",
     *      "agent_id":{"#text":""}
     *    }
     * }
     */


    SupervisorListRequest.prototype.formatJSON = function () {
      var msg = {
        ui_request: {
          '@destination': 'IS',
          '@type': MESSAGE_TYPES.SUPERVISOR_LIST,
          '@message_id': utils.getMessageId(),
          '@response_to': '',
          agent_id: {
            '#text': utils.toString(UIModel.getInstance().agentSettings.agentId)
          }
        }
      };
      return JSON.stringify(msg);
    };
    /*
     * This class is responsible for handling the SUPERVISOR-LIST packet
     * rec'd from intelliservices. It will save a copy of this list in the
     * UIModel under a variable called "supervisors". Whenever a new list
     * is rec'd it is overwritten.
     *
     * {"ui_response":{
     *      "@message_id":"IQ982008082910361503344",
     *      "@response_to":"",
     *      "supervisor":[
     *          {"id":{"#text":""}, "fname":{"#text":""}, "lname":{"#text":""}, "uname":{"#text":""} }
     *          {"id":{"#text":""}, "fname":{"#text":""}, "lname":{"#text":""}, "uname":{"#text":""} }
     *      ]
     *    }
     * }
     */


    SupervisorListRequest.prototype.processResponse = function (response) {
      var model = UIModel.getInstance();
      var tempList = utils.processResponseCollection(response, 'ui_response', 'supervisor');
      var supervisors = [];

      for (var i = 0; i < tempList.length; i++) {
        var sup = tempList[i];
        supervisors.push({
          agentId: sup.id,
          firstName: sup.fname,
          lastName: sup.lname,
          username: sup.uname
        });
      }

      utils.logMessage(LOG_LEVELS.DEBUG, 'New supervisor list received ', supervisors);
      model.supervisors = supervisors;
      return model.supervisors;
    };

    var ChatClientReconnectNotification = function ChatClientReconnectNotification() {};
    /*
     * External Chat:
     * This class is responsible for handling "CHAT-CLIENT-RECONNECT" packets from IntelliQueue.
     * This is sent when a chat connect message is sent to a non-archieved chat.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"CHAT-CLIENT-RECONNECT",
     *          "@destination":"IQ",
     *          "@response_to":"",
     *          "account_id":{"#text":"99999999"},
     *          "uii":{"#text":"201608161200240139000000000120"}
     *          "agent_id":{"#text":"1"}
     *      }
     *  }
     */


    ChatClientReconnectNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      return {
        message: 'Received CHAT-CLIENT-RECONNECT notification',
        status: 'OK',
        accountId: utils.getText(notif, 'account_id'),
        uii: utils.getText(notif, 'uii'),
        agentId: utils.getText(notif, 'agent_id')
      };
    };

    var AddChatSessionNotification = function AddChatSessionNotification() {};
    /*
     * This class is responsible for handling "ADD-CHAT-SESSION" packets from IntelliQueue.
     *
     * {
     *   "ui_notification": {
     *       "@message_id": "IQ982008082918151403727",
     *       "@response_to": "",
     *       "@type": "ADD-CHAT-SESSION",
     *       "session_id": { "#text": "2" },
     *       "uii": { "#text": "200808291814560000000900016558" },
     *       "session_type": { "#text": "AGENT|MONITORING" },
     *       "agent_id": { "#text": "1856" } // null unless monitor type,
     *       "transcript": { }
     *   }
     *  }
     */


    AddChatSessionNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      var formattedResponse = utils.buildDefaultResponse(notification);
      formattedResponse.status = 'OK';
      formattedResponse.message = 'Received ADD-CHAT-SESSION notification';
      formattedResponse.sessionId = utils.getText(notif, 'session_id');
      formattedResponse.uii = utils.getText(notif, 'uii');
      formattedResponse.sessionType = utils.getText(notif, 'session_type');
      formattedResponse.agentId = utils.getText(notif, 'agent_id');
      formattedResponse.transcript = utils.processResponseCollection(notification, 'ui_notification', 'transcript')[0];
      return formattedResponse;
    };

    var ChatActiveNotification = function ChatActiveNotification() {};
    /*
     * External Chat:
     * This class is responsible for handling "CHAT-ACTIVE" packets from IntelliQueue.
     * This is sent in response to an agent's CHAT-PRESENTED-RESPONSE accept request.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"CHAT-ACTIVE",
     *          "@destination":"IQ",
     *          "@response_to":"",
     *          "account_id":{"#text":"99999999"},
     *          "uii":{"#text":"201608161200240139000000000120"},
     *          "is_monitoring":{"#text":"TRUE"|"FALSE"}
     *      }
     *  }
     */


    ChatActiveNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      return {
        message: 'Received CHAT-ACTIVE notification',
        status: 'OK',
        accountId: utils.getText(notif, 'account_id'),
        uii: utils.getText(notif, 'uii'),
        isMonitoring: utils.getText(notif, 'is_monitoring')
      };
    };

    var ChatCancelledNotification = function ChatCancelledNotification() {};
    /*
     * External Chat:
     * This class is responsible for processing "CHAT-CANCELLED" packets from IntelliQueue.
     * If an agent is presented a chat and doesn't respond before the timeout, the CHAT-CANCELLED
     * message is sent from IQ.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"CHAT-CANCELLED",
     *          "@destination":"IQ",
     *          "@response_to":"",
     *          "account_id":{"#text":"99999999"},
     *          "uii":{"#text":"201608161200240139000000000120"}
     *      }
     *  }
     */


    ChatCancelledNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      return {
        message: 'Received CHAT-CANCELLED notification',
        status: 'OK',
        messageId: notif['@message_id'],
        accountId: utils.getText(notif, 'account_id'),
        uii: utils.getText(notif, 'uii')
      };
    };

    var ChatInactiveNotification = function ChatInactiveNotification() {};
    /*
     * External Chat:
     * This class is responsible for handling "CHAT-INACTIVE" packets from IntelliQueue.
     * This is sent to the agent when the last session is disconnected from a chat.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"CHAT-INACTIVE",
     *          "@destination":"IQ",
     *          "@response_to":"",
     *          "account_id":{"#text":"99999999"},
     *          "uii":{"#text":"201608161200240139000000000120"},
     *          "disposition_timeout":{"#text":"30"},
     *          "dequeue_agent_id":{"#text":"123"}
     *      }
     *  }
     */


    ChatInactiveNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      return {
        message: 'Received CHAT-INACTIVE notification',
        status: 'OK',
        accountId: utils.getText(notif, 'account_id'),
        uii: utils.getText(notif, 'uii'),
        dispositionTimeout: utils.getText(notif, 'disposition_timeout'),
        dequeueAgentId: utils.getText(notif, 'dequeue_agent_id')
      };
    };

    var ChatPresentedNotification = function ChatPresentedNotification() {};
    /*
     * External Chat:
     * This class is responsible for handling "CHAT-PRESENTED" packets from IntelliQueue.
     * When this notification is received, the Agent can either Accept or Decline which will
     * be sent back to IntelliQueue as a CHAT-PRESENTED-RESPONSE.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"CHAT-PRESENTED",
     *          "@destination":"IQ",
     *          "@response_to":"",
     *          "chat_queue_id":{"#text":"3"},
     *          "chat_queue_name":{"#text":"Support Chat"},
     *          "account_id":{"#text":"99999999"},
     *          "uii":{"#text":"201608161200240139000000000120"},
     *          "channel_type":{"#text":""},
     *          "allow_accept":{"#text":"TRUE|FALSE"}
     *      }
     *  }
     */


    ChatPresentedNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      return {
        message: 'Received CHAT-PRESENTED notification',
        status: 'OK',
        messageId: notif['@message_id'],
        accountId: utils.getText(notif, 'account_id'),
        uii: utils.getText(notif, 'uii'),
        channelType: utils.getText(notif, 'channel_type'),
        chatQueueId: utils.getText(notif, 'chat_queue_id'),
        chatQueueName: utils.getText(notif, 'chat_queue_name'),
        allowAccept: utils.getText(notif, 'allow_accept')
      };
    };

    var ChatTypingNotification = function ChatTypingNotification() {};
    /*
     * External Chat:
     * This class is responsible for handling "CHAT-TYPING" packets from IntelliQueue.
     * When this notification is received, the AgentUI will show the pending message
     * so far from the client chat widget and typing notification.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"CHAT-TYPING",
     *          "@destination":"IQ",
     *          "@response_to":"",
     *          "uii":{"#text":"201608161200240139000000000120"},
     *          "account_id":{"#text":"99999999"},
     *          "from":{"#text":""},
     *          "message":{"#text":"this is the message before actual send"}
     *          "dequeue_agent_id":{"#text":"123"}
     *      }
     *  }
     */


    ChatTypingNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      return {
        message: 'Received CHAT-TYPING notification',
        status: 'OK',
        accountId: utils.getText(notif, 'account_id'),
        uii: utils.getText(notif, 'uii'),
        from: utils.getText(notif, 'from'),
        type: utils.getText(notif, 'type'),
        pendingMessage: utils.getText(notif, 'message'),
        dequeueAgentId: utils.getText(notif, 'dequeue_agent_id')
      };
    };

    var NewChatNotification = function NewChatNotification() {};
    /*
     * External Chat:
     * This class is responsible for handling "NEW-CHAT" packets from IntelliQueue.
     *
     *  {
     *      "ui_notification":{
     *          "@message_id":"IQ10012016081611595000289",
     *          "@type":"NEW-CHAT",
     *          "@destination":"IQ",
     *          "@response_to":"",
     *          "uii":{"#text":"201608161200240139000000000120"},
     *          "account_id":{"#text":"99999999"},
     *          "session_id":{"#text":"2"},
     *          "agent_id":{"#text":"1180958"},
     *          "queue_dts":{"#text":""},
     *          "queue_time":{"#text":""},
     *          "chat_queue_id":{"#text":""},
     *          "chat_queue_name":{"#text":""},
     *          "chat_requeue_type" : {"#text":""}
     *          "app_url":{"#text":""},
     *          "channel_type":{"#text":""},
     *          "ani":{"#text":""},
     *          "dnis":{"#text":""},
     *          "survey_pop_type":{"#text":""},
     *          "script_id":{"#text":""},
     *          "script_version":{"#text":""},
     *          "idle_timeout":{"#text":""},
     *          "is_monitoring":{#text":"TRUE"|"FALSE"},
     *          "monitored_agent_id":{"#text":"123"| ""} <-- only populated if is_monitoring == TRUE
     *          "requeue_shortcuts":{
     *              "requeue_shortcut":{
     *                  "@chat_queue_id":"2",
     *                  "@name":"test queue",
     *                  "@skill_id":""
     *              }
     *          },
     *          "chat_dispositions":{
     *              "disposition":[
     *                  { "@disposition_id":"2", "@is_success":"true", "@is_complete":"false", "@is_default"="0", "@email_template_id":"1", "#text":"Complete"},
     *                  { "@disposition_id":"3", "@is_success":"true", "@is_complete":"false", "@is_default"="0", "#text":"Requeue"}
     *              ]
     *          },
     *          "chat_requeue_shortcuts" :{
     *              shortcut : [
     *                {@chat_requeue_shortcut_id:"3", @name:"test", @rank:"1",@requeue_chat_queue_id:"74",@skill_id:""}
     *              ]
     *          }
     *          "transcript":{
     *              "message":[
     *                  { "@from":"system", "@type":"SYSTEM", "@whisper":"FALSE", "@dts":"yyyy-MM-dd HH:mm:ss", "#text":"User1 connected"},
     *                  { "@from":"dlbooks", "@type":"AGENT", "@whisper":"FALSE", "@dts":"yyyy-MM-dd HH:mm:ss", "#text":"Hello"},
     *                  { "@from":"user1", "@type":"CLIENT", "@whisper":"FALSE", "@dts":"yyyy-MM-dd HH:mm:ss", "#text":"Hi"}
     *              ]
     *          },
     *          "json_baggage":{"#text":"json_string_form_data"}, <--- pre-form chat data
     *      }
     *  }
     */


    NewChatNotification.prototype.processResponse = function (notification) {
      var notif = notification.ui_notification;
      var dts = utils.getText(notif, 'queue_dts');
      dts = new Date(dts.replace(' ', 'T')); // set up new call obj

      var newChat = {
        uii: utils.getText(notif, 'uii'),
        accountId: utils.getText(notif, 'account_id'),
        sessionId: utils.getText(notif, 'session_id'),
        agentId: utils.getText(notif, 'agent_id'),
        queueDts: dts,
        queueTime: utils.getText(notif, 'queue_time'),
        chatQueueId: utils.getText(notif, 'chat_queue_id'),
        chatQueueName: utils.getText(notif, 'chat_queue_name'),
        chatRequeueType: utils.getText(notif, 'chat_requeue_type'),
        appUrl: utils.getText(notif, 'app_url'),
        channelType: utils.getText(notif, 'channel_type'),
        ani: utils.getText(notif, 'ani'),
        dnis: utils.getText(notif, 'dnis'),
        surveyPopType: utils.getText(notif, 'survey_pop_type'),
        scriptId: utils.getText(notif, 'script_id'),
        scriptVersion: utils.getText(notif, 'script_version'),
        idleTimeout: utils.getText(notif, 'idle_timeout'),
        isMonitoring: utils.getText(notif, 'is_monitoring'),
        monitoredAgentId: utils.getText(notif, 'monitored_agent_id'),
        preChatData: utils.getText(notif, 'json_baggage')
      };
      newChat.requeueShortcuts = utils.processResponseCollection(notification, 'ui_notification', 'chat_requeue_shortcuts', 'shortcut')[0];
      newChat.chatDispositions = utils.processResponseCollection(notification, 'ui_notification', 'chat_dispositions', 'disposition')[0];
      newChat.transcript = utils.processResponseCollection(notification, 'ui_notification', 'transcript', 'message')[0];
      newChat.baggage = utils.processResponseCollection(notification, 'ui_notification', 'json_baggage')[0];

      if (newChat.chatDispositions && newChat.chatDispositions.disposition) {
        newChat.chatDispositions.dispositions = [newChat.chatDispositions];
      } else {
        newChat.chatDispositions = newChat.chatDispositions.dispositions;
      }

      if (newChat.transcript && newChat.transcript.message) {
        newChat.transcript = [newChat.transcript];
      } else {
        newChat.transcript = newChat.transcript.messages;
      }

      if (newChat.preChatData) {
        try {
          newChat.preChatData = JSON.parse(newChat.preChatData);
        } catch (err) {
          utils.logMessage(LOG_LEVELS.ERROR, 'Error parsing the pre-form chat data.', notif);
        }
      } // convert numbers to boolean


      if (newChat.chatDispositions) {
        for (var d = 0; d < newChat.chatDispositions.length; d++) {
          var disp = newChat.chatDispositions[d];
          disp.isComplete = disp.isComplete === '1';
          disp.isSuccess = disp.isSuccess === '1';
          disp.isDefault = disp.isDefault === '1';
        }
      } // convert dates


      if (newChat.transcript) {
        for (var t = 0; t < newChat.transcript.length; t++) {
          var msg = newChat.transcript[t];

          if (msg.dts) {
            msg.dts = new Date(msg.dts.replace(' ', 'T'));
          }
        }
      } // Build token map


      newChat.baggage = buildChatTokenMap(notif, newChat);
      return newChat;
    };

    function buildChatTokenMap(notif, newChat) {
      var tokens = {};
      var model = UIModel.getInstance();

      if (newChat.preChatData) {
        for (var prop in newChat.preChatData) {
          if (newChat.preChatData.hasOwnProperty(prop)) {
            tokens[prop] = newChat.preChatData[prop];
          }
        }
      }

      try {
        tokens.chatQueueId = newChat.chatQueueId;
        tokens.chatQueueName = newChat.chatQueueName;
        tokens.ani = newChat.ani;
        tokens.dnis = newChat.dnis;
        tokens.uii = newChat.uii;
      } catch (any) {
        console.error('There was an error parsing chat tokens for basic chat info. ', any);
      }

      try {
        tokens.agentFirstName = model.agentSettings.firstName;
        tokens.agentLastName = model.agentSettings.lastName;
        tokens.agentExternalId = model.agentSettings.externalAgentId;
        tokens.agentType = model.agentSettings.agentType;
        tokens.agentEmail = model.agentSettings.email;
        tokens.agentUserName = model.agentSettings.username;
      } catch (any) {
        console.error('There was an error parsing chat tokens for agent info. ', any);
      }

      return tokens;
    }

    var AgentStats = function AgentStats() {};
    /*
     * This class is responsible for handling an Agent Stats packet rec'd from IntelliServices.
     * It will save a copy of it in the UIModel. Could be a single agent or array of agents.
     *
      {"ui_stats":{
           "@type":"AGENT",
           "agent":{
               "@alt":"INBOUND",
               "@atype":"AGENT",
               "@avgtt":"00.0",
               "@calls":"0",
               "@da":"0",
               "@droute":"6789050673",
               "@f":"John",
               "@gdesc":"",
               "@gname":"",
               "@id":"1856",
               "@l":"Doe",
               "@ldur":"6",
               "@ltype":"INBOUND",
               "@oh":"0",
               "@pd":"0",
               "@pdt":"0",
               "@pres":"0",
               "@rna":"0",
               "@sdur":"6",
               "@sp":"",
               "@state":"AVAILABLE",
               "@ttt":"0",
               "@u":"jdoe",
               "@uii":"",
               "@util":"0.00",
               "@call_duration:0"
           }
         }
      }
     */


    AgentStats.prototype.processResponse = function (stats) {
      var resp = stats.ui_stats.agent;
      var agentStats = [];

      if (!Array.isArray(resp)) {
        resp = [resp];
      }

      try {
        for (var i = 0; i < resp.length; i++) {
          agentStats.push({
            agentLoginType: resp[i]['@alt'],
            agentType: resp[i]['@atype'],
            avgTalkTime: resp[i]['@avgtt'],
            calls: resp[i]['@calls'],
            isDequeueAgent: resp[i]['@da'],
            defaultRoute: resp[i]['@droute'],
            firstName: resp[i]['@f'],
            queueDesc: resp[i]['@gdesc'],
            queueName: resp[i]['@gname'],
            agentId: resp[i]['@id'],
            lastName: resp[i]['@l'],
            loginDuration: resp[i]['@ldur'],
            loginType: resp[i]['@ltype'],
            offHook: resp[i]['@oh'],
            pendingDisp: resp[i]['@pd'],
            pendingDispTime: resp[i]['@pdt'],
            presented: resp[i]['@pres'],
            rna: resp[i]['@rna'],
            stateDuration: resp[i]['@sdur'],
            skillProfileName: resp[i]['@sp'],
            agentState: resp[i]['@state'],
            totalTalkTime: resp[i]['@ttt'],
            username: resp[i]['@u'],
            uii: resp[i]['@uii'],
            utilization: resp[i]['@util'],
            callDuration: resp[i]['@call_duration']
          });
        }
      } catch (e) {}

      UIModel.getInstance().agentStats = agentStats;
      return agentStats;
    };

    var AgentDailyStats = function AgentDailyStats() {};
    /*
     * This class is responsible for handling an Agent Daily Stats packet rec'd from IntelliServices.
     * It will save a copy of it in the UIModel.
     *
     * {"ui_stats":{
     *      "@type":"AGENTDAILY",
     *      "agent_id":{"#text":"1180723"},
     *      "total_login_sessions":{"#text":"1"},
     *      "total_calls_handled":{"#text":"0"},
     *      "total_preview_dials":{"#text":"0"},
     *      "total_manual_dials":{"#text":"0"},
     *      "total_rna":{"#text":"0"},
     *      "total_talk_time":{"#text":"0"},
     *      "total_offhook_time":{"#text":"0"},
     *      "total_login_time":{"#text":"7808"},
     *      "total_success_dispositions":{"#text":"0"}
     *    }
     * }
     */


    AgentDailyStats.prototype.processResponse = function (stats) {
      var model = UIModel.getInstance().agentDailyStats;
      var resp = stats.ui_stats;
      model.agentId = utils.getText(resp, 'agent_id');
      model.totalLoginSessions = utils.getText(resp, 'total_login_sessions');
      model.totalChatsHandled = utils.getText(resp, 'total_chats_handled');
      model.totalCallsHandled = utils.getText(resp, 'total_calls_handled');
      model.totalPreviewDials = utils.getText(resp, 'total_preview_dials');
      model.totalManualDials = utils.getText(resp, 'total_manual_dials');
      model.totalRna = utils.getText(resp, 'total_rna');
      model.totalSuccessDispositions = utils.getText(resp, 'total_success_dispositions');

      if (!model.totalTalkTime) {
        // init daily stats to first stats packet if they don't exist
        model.totalLoginTime = utils.getText(resp, 'total_login_time');
        model.totalOffhookTime = utils.getText(resp, 'total_offhook_time');
        model.totalTalkTime = utils.getText(resp, 'total_talk_time');
        model.currCallTime = '0';
      }

      return model;
    };

    var CampaignStats = function CampaignStats() {};
    /*
     * This class is responsible for handling a Campaign Stats packet rec'd from IntelliServices.
     * It will save a copy of it in the UIModel.
     *
     * {"ui_stats":{
     *      "@type":"CAMPAIGN",
     *      "campaign":[
     *          {
     *              "@a":"0","@aba":"0","@an":"0","@av":"0","@b":"0","@c":"1","@e":"0","@f":"0",
     *              "@id":"60275","@int":"0","@m":"0","@na":"0","@name":"Test Campaign",
     *              "@p":"0","@r":"1","@s":"0","@tc":"0","@ttt":"0"
     *          },
     *          {
     *              "@a":"0","@aba":"0","@an":"0","@av":"0","@b":"0","@c":"0","@e":"0","@f":"0",
     *              "@id":"60293","@int":"0","@m":"0","@na":"0","@name":"Test Campaign w\\ Search",
     *              "@p":"0","@r":"19","@s":"0","@tc":"0","@ttt":"0"
     *          }
     *     ],
     *     "totals":{
     *          "noanswer":{"#text":"0"},
     *          "totalConnects":{"#text":"0"},
     *          "pending":{"#text":"0"},
     *          "active":{"#text":"0"},
     *          "error":{"#text":"0"},
     *          "totalTalkTime":{"#text":"0"},
     *          "answer":{"#text":"0"},
     *          "abandon":{"#text":"0"},
     *          "ready":{"#text":"20"},
     *          "machine":{"#text":"0"},
     *          "intercept":{"#text":"0"},
     *          "busy":{"#text":"0"},
     *          "complete":{"#text":"1"},
     *          "fax":{"#text":"0"}
     *     }
     *   }
     * }
     */


    CampaignStats.prototype.processResponse = function (stats) {
      var resp = stats.ui_stats;
      var totals = utils.processResponseCollection(stats, 'ui_stats', 'totals')[0];
      var campaigns = [];
      var campRaw = null;

      if (!Array.isArray(resp.campaign)) {
        resp.campaign = [resp.campaign];
      }

      for (var c = 0; c < resp.campaign.length; c++) {
        campRaw = resp.campaign[c];

        if (campRaw == null) {
          continue;
        }

        campaigns.push({
          active: campRaw['@a'],
          abandon: campRaw['@aba'],
          answer: campRaw['@an'],
          available: campRaw['@av'],
          busy: campRaw['@b'],
          complete: campRaw['@c'],
          error: campRaw['@e'],
          fax: campRaw['@f'],
          campaignId: campRaw['@id'],
          intercept: campRaw['@int'],
          machine: campRaw['@m'],
          noanswer: campRaw['@na'],
          campaignName: campRaw['@name'],
          pending: campRaw['@p'],
          ready: campRaw['@r'],
          staffed: campRaw['@s'],
          totalConnects: campRaw['@tc'],
          totalTalkTime: campRaw['@ttt']
        });
      }

      var campaignStats = {
        type: resp['@type'],
        campaigns: campaigns,
        totals: totals
      };
      UIModel.getInstance().campaignStats = campaignStats;
      return campaignStats;
    };

    var ChatQueueStats = function ChatQueueStats() {};
    /*
     * This class is responsible for handling an Chat Stats packet rec'd from IntelliServices.
     * It will save a copy of it in the UIModel.
     *
     *{
     *  "ui_stats": {
     *  "@type": "CHAT",
     *  "chatQueue": [
     *      {
     *          "@active": "1",
     *          "@available": "0",
     *          "@avgAbandon": "00.0",
     *          "@avgChatTime": "00.0",
     *          "@avgQueueTime": "00.0",
     *          "@chatQueueId": "1",
     *          "@chatQueueName": "testing chat quuee",
     *          "@deflected": "0",
     *          "@inQueue": "0",
     *          "@longestInQueue": "0",
     *          "@presented": "0",
     *          "@routing": "0",
     *          "@staffed": "0",
     *          "@totalAbandonTime": "0",
     *          "@totalAnswerTime": "0",
     *          "@totalChatTime": "0",
     *          "@totalQueueTime": "0",
     *          "@utilization": "00.0"
     *      },
     *      {
     *          "@active": "0",
     *          "@available": "0",
     *          "@avgAbandon": "00.0",
     *          "@avgChatTime": "00.0",
     *          "@avgQueueTime": "00.0",
     *          "@chatQueueId": "3",
     *          "@chatQueueName": "testing test",
     *          "@deflected": "0",
     *          "@inQueue": "0",
     *          "@longestInQueue": "0",
     *          "@presented": "0",
     *          "@routing": "0",
     *          "@staffed": "0",
     *          "@totalAbandonTime": "0",
     *          "@totalAnswerTime": "0",
     *          "@totalChatTime": "0",
     *          "@totalQueueTime": "0",
     *          "@utilization": "00.0"
     *      }
     *  ],
     *  "totals": {
     *      "routing": {"#text": "0"},
     *      "ttotalAnswerTime": {"#text": "0"},
     *      "inQueue": { "#text": "0"},
     *      "ttotalChatTime": {"#text": "0"},
     *      "ttotalAbandonTime": {"#text": "0"},
     *      "presented": {"#text": "0},
     *      "accepted": {"#text": "0"},
     *      "deflected": {"#text": "0"},
     *      "active": {"#text": "1"},
     *      "abandoned": {"#text": "0"},
     *      "ttotalQueueTime": {"#text": "0"}
     *   }
     *  }
     *}
     */


    ChatQueueStats.prototype.processResponse = function (stats) {
      var resp = stats.ui_stats;
      var totals = utils.processResponseCollection(stats, 'ui_stats', 'totals')[0];
      var chatQueues = utils.processResponseCollection(stats, 'ui_stats', 'chatQueue');
      var chatQueueStats = {
        type: resp['@type'],
        chatQueues: chatQueues,
        totals: totals
      };
      UIModel.getInstance().chatQueueStats = chatQueueStats;
      return chatQueueStats;
    };

    var QueueStats = function QueueStats() {};
    /*
     * This class is responsible for handling an Queue Stats packet rec'd from IntelliServices.
     * It will save a copy of it in the UIModel.
     *
     * {
     *   "ui_stats":{
     *       "@type":"GATE",
     *       "gate":{
     *           "@aba":"0","@active":"0","@ans":"0","@asa":"00.0","@avail":"2",
     *           "@avga":"00.0","@avgq":"00.0","@avgt":"00.0","@def":"0","@id":"12126",
     *           "@inq":"0","@long_c":"0","@longq":"0","@name":"Cris inbound",
     *           "@pres":"0","@route":"0","@short_aba":"0","@short_c":"0","@sla":"100.0",
     *           "@sla_f":"0","@sla_p":"0","@staff":"2","@t_aba":"0","@t_q":"0","@t_soa":"0","@util":"00.0"
     *       },
     *       "totals":{
     *           "inQueue":{"#text":"0"},
     *           "answered":{"#text":"0"},
     *           "totalABATime":{"#text":"0"},
     *           "active":{"#text":"0"},
     *           "longCall":{"#text":"0"},
     *           "shortCall":{"#text":"0"},
     *           "slaPass":{"#text":"0"},
     *           "totalQueueTime":{"#text":"0"},
     *           "routing":{"#text":"0"},
     *           "totalTalkTime":{"#text":"0"},
     *           "shortAbandon":{"#text":"0"},
     *           "presented":{"#text":"0"},
     *           "totalSOA":{"#text":"0"},
     *           "slaFail":{"#text":"0"},
     *           "deflected":{"#text":"0"},
     *           "abandoned":{"#text":"0"}
     *      }
     *   }
     * }
     */


    QueueStats.prototype.processResponse = function (stats) {
      var resp = stats.ui_stats;
      var totals = utils.processResponseCollection(stats, 'ui_stats', 'totals')[0];
      var queues = [];
      var gateRaw = {};

      if (!Array.isArray(resp.gate)) {
        resp.gate = [resp.gate];
      }

      for (var c = 0; c < resp.gate.length; c++) {
        gateRaw = resp.gate[c];

        if (gateRaw == null) {
          continue;
        }

        queues.push({
          abandon: gateRaw['@aba'],
          active: gateRaw['@active'],
          answer: gateRaw['@ans'],
          asa: gateRaw['@asa'],
          available: gateRaw['@avail'],
          avgAbandon: gateRaw['@avga'],
          avgQueue: gateRaw['@avgq'],
          avgTalk: gateRaw['@avgt'],
          deflected: gateRaw['@def'],
          queueId: gateRaw['@id'],
          inQueue: gateRaw['@inq'],
          longCall: gateRaw['@long_c'],
          longestInQueue: gateRaw['@longq'],
          queueName: gateRaw['@name'],
          presented: gateRaw['@pres'],
          routing: gateRaw['@route'],
          shortAbandon: gateRaw['@short_aba'],
          shortCall: gateRaw['@short_c'],
          sla: gateRaw['@sla'],
          slaPass: gateRaw['@sla_p'],
          slaFail: gateRaw['@sla_f'],
          staffed: gateRaw['@staff'],
          tAbandonTime: gateRaw['@t_aba'],
          tQueueTime: gateRaw['@t_q'],
          tSpeedOfAnswer: gateRaw['@t_soa'],
          utilization: gateRaw['@util']
        });
      }

      var queueStats = {
        type: resp['@type'],
        queues: queues,
        totals: totals
      };
      UIModel.getInstance().queueStats = queueStats;
      return queueStats;
    };

    var UIModel = function () {
      var instance;

      function init() {
        // Singleton
        // Private methods and variables here //
        // function privateMethod(){
        //    console.log( "I am private" );
        // }
        //
        // var privateVariable = "I'm also private";
        // Public methods and variables
        return {
          currentCall: {},
          // save the NEW-CALL notification in parsed form
          pendingNewCallSessions: {},
          // save any pending call sessions, in case the new call packet hasn't arrived
          callTokens: {},
          // Stores a map of all tokens for a call
          callbacks: [],
          libraryInstance: null,
          // Initialized to the library instance on startup
          pingIntervalId: null,
          // The id of the timer used to send ping-call messages
          statsIntervalId: null,
          // The id of the timer used to send stats request messages
          pingStatIntervalId: null,
          // The id of the timer used to send ping-call beat messages
          agentDailyIntervalId: null,
          // The id of the timer used to update some agent daily stats values
          reconnectIntervalId: null,
          // The id of the timer used to try reconnecting the socket
          waitingForAddSession: null,
          authHost: window.location.origin,
          // default to protocol + hostname + port
          socketProtocol: 'wss://',
          // default to secure socket unless local test flag passed in on initialization
          baseAuthUri: '/api/auth/',
          // the path to engage-auth e.g.: http://localhost:81/api/auth/ or window.location.origin + "/api/auth/",
          baseApiUri: '/api/v1/',
          // the path to engage-api
          // internal chat requests
          chatAliasRequest: null,
          chatRoomRequest: null,
          chatSendRequest: null,
          supervisorListRequest: null,
          chatRoomStateRequest: new ChatRoomStateRequest(),
          // multi-socket
          multiSocketRequest: new MultiSocketRequest(),
          dataStore: new LocalStorageService('agentSDK'),
          // external chat requests/notifications
          chatActiveNotification: new ChatActiveNotification(),
          chatInactiveNotification: new ChatInactiveNotification(),
          chatDispositionRequest: null,
          chatMessageRequest: new ChatMessageRequest(),
          chatPresentedNotification: new ChatPresentedNotification(),
          chatPresentedRequest: null,
          chatRequeueRequest: null,
          chatTypingNotification: new ChatTypingNotification(),
          chatTypingRequest: null,
          newChatNotification: new NewChatNotification(),
          chatClientReconnectNotification: new ChatClientReconnectNotification(),
          // request instances
          agentStateRequest: null,
          chatStateRequest: null,
          ackRequest: new AckRequest(),
          bargeInRequest: null,
          callNotesRequest: null,
          callbacksPendingRequest: null,
          campaignDispositionsRequest: null,
          loginRequest: null,
          coldXferRequest: null,
          dispositionRequest: null,
          dispositionManualPassRequest: null,
          hangupRequest: null,
          holdRequest: null,
          leadHistoryRequest: null,
          leadInsertRequest: null,
          leadUpdateRequest: null,
          logoutRequest: null,
          authenticateRequest: null,
          // get RC access token
          loginPhase1Request: null,
          offhookInitRequest: null,
          offhookTermRequest: null,
          oneToOneOutdialRequest: null,
          oneToOneOutdialCancelRequest: null,
          pauseRecordRequest: null,
          pingCallRequest: null,
          previewDialRequest: null,
          reconnectRequest: null,
          recordRequest: null,
          requeueRequest: null,
          statsRequest: null,
          tcpaSafeRequest: null,
          warmXferRequest: null,
          warmXferCancelRequest: null,
          chatListRequest: null,
          directAgentTransferListRequest: null,
          directAgentTransferRequest: null,
          webRTCRequest: null,
          searchDirectoryRequest: null,
          extensionPresenceRequest: null,
          // response packets
          agentStatePacket: null,
          chatStatePacket: null,
          loginPacket: null,
          currentCallPacket: null,
          authenticatePacket: null,
          loginPhase1Packet: null,
          offhookInitPacket: null,
          offhookTermPacket: null,
          transferSessions: {},
          chatListResponse: null,
          // notification packets
          addSessionNotification: new AddSessionNotification(),
          dialGroupChangeNotification: new DialGroupChangeNotification(),
          dialGroupChangePendingNotification: new DialGroupChangePendingNotification(),
          dropSessionNotification: new DropSessionNotification(),
          earlyUiiNotification: new EarlyUiiNotification(),
          endCallNotification: new EndCallNotification(),
          gatesChangeNotification: new GatesChangeNotification(),
          genericNotification: new GenericNotification(),
          newCallNotification: new NewCallNotification(),
          // stats packets
          agentStatsPacket: new AgentStats(),
          agentDailyStatsPacket: new AgentDailyStats(),
          queueStatsPacket: new QueueStats(),
          campaignStatsPacket: new CampaignStats(),
          chatQueueStatsPacket: new ChatQueueStats(),
          // application state
          applicationSettings: {
            availableCountries: [],
            isLoggedInIS: false,
            // a check for whether or not user is logged in with IntelliServices
            socketConnected: false,
            socketDest: '',
            isTcpaSafeMode: false,
            // Comes in at the account-level - will get set to true if this interface should be in tcpa-safe-mode only.
            isSso: false,
            // Passed in on phase 1 login response, if agent signed in through RC single sign-on path set to true
            dialDestType: '',
            // What type of phone are we setting up: e.g. "RC_SOFTPHONE", "LEGACY_SOFTPHONE", "RC_PHONE" (for RC office ext)// Comes in at the account-level - will get set to true if this interface should be in tcpa-safe-mode only.
            allowMultiSocket: false // Determines whether agent can open a new socket under the same login

          },
          // stat objects
          agentStats: [],
          agentDailyStats: {},
          campaignStats: {},
          queueStats: {},
          chatQueueStats: {},
          // current agent settings
          agentSettings: {
            accountId: null,
            // account agent belongs to
            agentId: 0,
            agentPassword: '',
            // agent Password
            agentType: 'AGENT',
            // AGENT | SUPERVISOR
            altDefaultLoginDest: '',
            availableAgentStates: [],
            callerIds: [],
            callState: null,
            // display the current state of the call
            corporateDirectory: false,
            currentState: 'OFFLINE',
            // Agent system/base state
            currentStateLabel: '',
            // Agent aux state label
            defaultLoginDest: '',
            dialDest: '',
            // Destination agent is logged in with for offhook session, set on configure response, if multi values in format "xxxx|,,xxxx"
            email: '',
            externalAgentId: '',
            firstName: '',
            guid: '',
            // unique key generated on login, used for accessing spring endpoints
            isLoggedIn: false,
            // agent is logged in to the platform
            isOffhook: false,
            // track whether or not the agent has an active offhook session
            isMonitoring: false,
            // track whether or not the offhook session is for monitoring
            initLoginState: 'AVAILABLE',
            // state agent is placed in on successful login
            initLoginStateLabel: 'Available',
            // state label for agent on successful login
            isOutboundPrepay: false,
            // determines if agent is a prepay agent
            lastName: '',
            loginDTS: null,
            // date and time of the final login phase (IQ)
            loginType: 'NO-SELECTION',
            // Could be INBOUND | OUTBOUND | BLENDED | NO-SELECTION, set on login response
            maxBreakTime: -1,
            maxLunchTime: -1,
            onCall: false,
            // true if agent is on an active call
            onManualOutdial: false,
            // true if agent is on a manual outdial call
            outboundManualDefaultRingtime: '30',
            pendingCallbacks: [],
            pendingDialGroupChange: 0,
            // Set to Dial Group Id if we are waiting to change dial groups until agent ends call
            phoneLoginPin: '',
            realAgentType: 'AGENT',
            supervisors: [],
            // Used for agent chat
            totalCalls: 0,
            // Call counter that is incremented every time a new session is received
            transferNumber: '',
            // May be pre-populated by an external interface, if so, the transfer functionality uses it
            updateDGFromAdminUI: false,
            // if pending Dial Group change came from AdminUI, set to true (only used if request is pending)
            updateLoginMode: false,
            // gets set to true when doing an update login (for events control)
            username: '',
            // Agent's username
            wasMonitoring: false // used to track if the last call was a monitoring call

          },
          // current agent permissions
          agentPermissions: {
            allowBlended: true,
            // Controls whether or not the agent can log into both inbound queues and an outbound dialgroup
            allowCallControl: true,
            // Set from the the login response packet
            allowChat: false,
            // Controls whether or not the agent has the option to open the Chat Queue Manager
            allowCrossQueueRequeue: false,
            // Controls whether or not the agent can requeue to a different queue group
            allowInbound: true,
            // Controls whether or not the agent can log into an inbound queue
            allowLeadInserts: false,
            // Controls whether or not the agents can insert leads
            allowLeadSearch: false,
            // Controlled by the dial-group allow_lead_search setting. Enables or disables the lead search
            allowLoginControl: true,
            // Controls whether or not the agent can log in
            allowLoginUpdates: true,
            // Controls whether or not the agent can update their login
            allowManualCalls: true,
            // Controls whether or not the agents have the option to make a manual outbound call
            allowManualPass: true,
            // Controls whether or not the agent has the option to make a manual pass on a lead
            allowManualIntlCalls: false,
            // Controls whether or not the agent has the option to make international manual outbound calls
            allowManualOutboundGates: false,
            // Controls whether or not the agent has the option to select queues to convert manual outbound calls to
            allowOffHook: true,
            // Controls whether or not the agents can go offhook
            allowOutbound: true,
            // Controls whether or not the agent can log into an outdial group
            allowPreviewLeadFilters: false,
            // Controlled by the dial-group allow_preview_lead_filters setting. Enables or disables the filters on the preview style forms
            allowLeadUpdatesByCampaign: {},
            // For each campaign ID, store whether leads can be updated
            disableSupervisorMonitoring: true,
            // Controls whether or not a supervisor can view agent stats
            progressiveEnabled: false,
            // Preview dial feature that enables auto-calls from the preview window.
            requireFetchedLeadsCalled: false,
            // Controlled by the dial-group require_fetched_leads_called setting. Enables or disables the requirement to only fetch new leads when current leads are called or expired. ONly for Preview or TCPA-SAFE.
            showLeadHistory: true,
            // Controls whether or not the agents can view lead history
            enableTaskMode: false,
            // Controls whether or not the agent has access to Digital task mode
            enableFolderMode: false // Controls whether or not the agent has access to Digital folder mode

          },
          // chat
          chatSettings: {
            availableChatQueues: [],
            // List of all chat queues agent has access to, set on login
            availableChatRooms: [],
            // List of all chat rooms agent has access to, set on login
            chatQueues: [],
            // Array of chat queues agent is signed into
            alias: '' // Chat alias, on-login this is the UID, but is changed if the user changes it

          },
          // connection objects
          connectionSettings: {
            hashCode: '',
            // used specifically for reconnects
            reconnect: false,
            // variable tracks the type of login, on init it's false...once connected it's set to true
            isMultiSocket: false
          },
          // inbound settings
          inboundSettings: {
            availableQueues: [],
            // array of queues agent has access to, set on login
            availableSkillProfiles: [],
            // array of skill profiles agent has access to, set on login
            queues: [],
            // array of queues agent is signed into, set on config response
            skillProfile: {} // The skill profile the agent is signed into, set on config response

          },
          // outbound settings
          outboundSettings: {
            availableCampaigns: [],
            // array of campaigns agent has access to, set on login
            availableOutdialGroups: [],
            // array of dial groups agent has access to, set on login
            insertCampaigns: [],
            defaultDialGroup: 0,
            outdialGroup: {},
            // dial group agent is signed into
            previewDialLeads: [],
            // list of leads returned from preview dial request
            tcpaSafeLeads: [],
            // list of leads returned from tcpa safe request
            campaignDispositions: [] // list of campaign dispositions for specific campaign

          },
          scriptSettings: {
            availableScripts: [],
            // array of all scripts associated with any campaigns or queues agent is logged into
            loadedScripts: {} // stores script data by script id e.g. {1:{}, 32:{}}

          },
          softphoneSettings: {
            webRtc: null,
            // stores the CFSimpleSip object
            isRegistered: false,
            // whether or not the softphone is currently registered
            muteActive: false,
            // whether or not the softphone is muted
            registerPending: null,
            // timeout to trigger no register response
            maintainOH: false,
            // based on the configurable agent setting to keep offhook session after ending call
            autoStartOH: false,
            // determines whether or not to start an offhook session automatically after softphone registrar reconnect
            wsServers: [],
            // current sip server domain + user credentials, set as array for SIP.js ua object
            sipInfo: [],
            // array of sip server domains + user credentials for softphone registration, retrieved from engage-auth
            uri: '',
            // username + @ + domain
            displayName: '',
            // username - Used to register softphone with freeswitch (legacy)
            authorizationUser: '',
            // username - Used to register softphone with freeswitch (legacy)
            sipPassword: '',
            // password for sip softphone registration
            sipDialDest: '',
            // dialDest used for softphone connection
            attemptingSoftphoneReconnect: false // set to true when attempting to rotate softphone registrar and reconnect
            // manualSoftphoneReconnect: false     // set to true when agent triggered registrar rotation

          },
          // Filtered Directory
          filteredDirectory: {
            rcAccountId: '',
            records: []
          },
          extensionPresenceResponse: [],
          // Public methods
          incrementTotalCalls: function incrementTotalCalls() {
            this.agentSettings.totalCalls = this.agentSettings.totalCalls + 1;
          }
        };
      }

      return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function getInstance() {
          if (!instance) {
            instance = init();
          }

          return instance;
        },
        resetInstance: function resetInstance() {
          instance = null;
        }
      };
    }();

    var LocalStorageService = function LocalStorageService(name) {
      if (!window.localStorage) {
        console.log('Browser does not support HTML5 Web Storage');
      }

      this.prefix = "".concat(name, ":");
    };

    LocalStorageService.prototype.save = function (key, value) {
      if (!key || !value) {
        console.log('Missing parameters key or value on add');
        return false;
      }

      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    };

    LocalStorageService.prototype.get = function (key) {
      if (!key || !localStorage.getItem(this.prefix + key)) {
        console.log('Missing parameter key on retrieve');
        return false;
      }

      return localStorage.getItem(this.prefix + key);
    };

    LocalStorageService.prototype.remove = function (key) {
      if (!key || !localStorage.getItem(this.prefix + key)) {
        console.log('Missing parameter key on remove');
        return false;
      }

      localStorage.removeItem(this.prefix + key);
    }; // --------------------------
    // BroadcastChannelHelper.js
    // --------------------------


    var broadcastChannelHelper = {
      // Generate handlers to request / response BroadcastChannels
      //
      requestChannel: null,
      responseChannel: null,
      currentCallMessageId: null,
      currentCallRequestCallback: null,
      // Registers the request / response channels
      //
      init: function init() {
        if (this.requestChannel != null) {
          return;
        }

        var self = this;
        this.requestChannel = new BroadcastChannel('ev-multisocket-request');
        this.responseChannel = new BroadcastChannel('ev-multisocket-response'); // Listen for requests coming from the requestChannel
        //

        this.requestChannel.onmessage = function (e) {
          var type = e.data.type;
          var messageId = e.data.messageId;

          switch (type) {
            case 'currentCall':
              self._sendCurrentCall(messageId);

              break;
          }
        }; // Listen for requests coming from the responseChannel
        //


        this.responseChannel.onmessage = function (e) {
          var type = e.data.type;

          switch (type) {
            case 'currentCall':
              self._processCurrentCallResponse(e.data.data, e.data.messageId);

          }
        };
      },
      destroy: function destroy() {
        if (this.requestChannel == null) {
          return;
        }

        this.requestChannel.onmessage = null;
        this.responseChannel.onmessage = null;
        this.requestChannel.close();
        this.responseChannel.close();
        this.requestChannel = null;
        this.responseChannel = null;
      },
      // ----------------------------------------------------
      // Current Call, Request & Response
      // ----------------------------------------------------
      // When a new tab opens and needs to get the current call, it can do so with this method.  Passing
      // a callback function to response with (could be a Promise if we are using them in SDK). Once
      // a response is retrieved, it will be handled in the "processCurrentCall" method, and returned
      // back to the original callback function
      //
      requestCurrentCall: function requestCurrentCall(fn) {
        this.currentCallMessageId = Math.random();
        this.currentCallRequestCallback = fn;
        this.requestChannel.postMessage({
          type: 'currentCall',
          messageId: this.currentCallMessageId
        });
      },
      // Any instance that has knowledge of the current call can respond to the request
      //
      _sendCurrentCall: function _sendCurrentCall(messageId) {
        if (UIModel.getInstance().currentCall != null) {
          var obj = {
            type: 'currentCall',
            messageId: messageId,
            data: UIModel.getInstance().currentCall
          };
          this.responseChannel.postMessage(obj);
        }
      },
      // When a current call response is received, every tab will try to process it.  Only the original
      // requestor will be able to process it successfully.
      //
      _processCurrentCallResponse: function _processCurrentCallResponse(data, messageId) {
        if (this.currentCallMessageId === messageId) {
          // Set the current call model
          UIModel.getInstance().currentCall = data; // Alert the original method that our data is now available.

          if (this.currentCallRequestCallback != null) {
            this.currentCallRequestCallback(data);
          } // Null out properties - this ensure subsequent responses from other tabs will be ignored.


          this.currentCallMessageId = null;
          this.currentCallRequestCallback = null;
        }
      }
    };

    function HttpService(apiBase) {
      this.XMLHttpRequest = window.XMLHttpRequest;
      this.encodeURIComponent = window.encodeURIComponent;
      this.apiBase = apiBase || 'http://localhost:81';
      var that = this;
      /**
       * Makes a GET request to Engage Auth.
       *
       * @param {string} path - Relative path to append to apiUrl.
       * @param {Object} config - Object describing different properties of the request.
       * @returns {Promise} Promise that represents status of the request. Resolves if server responds with 200 status code, and is rejected otherwise.
       */

      this.httpGet = function (path, config) {
        return new Promise(function (resolve, reject) {
          var req = new that.XMLHttpRequest();
          var queryParams = '';

          if (config.queryParams) {
            queryParams = "?".concat(_getUriEncodedParams(config.queryParams));
          }

          req.open('GET', that.apiBase + path + queryParams);

          _addHeaders(config, req);

          _addCompletionListeners(resolve, reject, req);

          req.send();
        });
      };
      /**
       * Makes a GET request to Engage Auth.
       *
       * @param {string} path - Relative path to append to apiUrl.
       * @param {Object} config - Object describing different properties of the request.
       * @returns {Promise} Promise that represents status of the request. Resolves if server responds with 200 status code, and is rejected otherwise.
       */


      this.httpPost = function (path, config) {
        return new Promise(function (resolve, reject) {
          var req = new that.XMLHttpRequest();
          var queryParams = '';

          if (config.queryParams) {
            queryParams = "?".concat(_getUriEncodedParams(config.queryParams));
          }

          req.open('POST', that.apiBase + path + queryParams);

          _addHeaders(config, req);

          _addCompletionListeners(resolve, reject, req);

          req.send(_getUriEncodedBody(config));
        });
      };
      /**
       * Utility method used to check if an argument is actually an object.
       *
       * @param {*} obj
       */


      function _isObj(obj) {
        return _typeof(obj) === 'object' && obj !== null;
      }
      /**
       * Adds headers to XMLHttpRequest based on configuration object.
       *
       * @param {Object} config - Config object passed to HttpService methods.
       * @param {XMLHttpRequest} req - Instance of XMLHttpRequest that needs to be configured.
       */


      function _addHeaders(config, req) {
        if (!_isObj(config)) {
          return;
        }

        var headers = config.headers;

        if (!_isObj(headers)) {
          return;
        }

        for (var key in headers) {
          req.setRequestHeader(key, headers[key]);
        }
      }
      /**
       * Configures an XMLHttpRequest object to properly resolve/reject a promise, depending on the outcome of the request.
       *
       * @param {Function} resolve - Resolve callback function from a promise. Invoked if the request completed successfully.
       * @param {Function} reject - Reject callback function from a promise. Invoked if the request failed.
       * @param {XMLHttpRequest} req - Instance of XMLHttpRequest that will be configured.
       */


      function _addCompletionListeners(resolve, reject, req) {
        req.addEventListener('error', function (e) {
          reject(e);
        });
        req.addEventListener('timeout', function () {
          reject(new Error('request timeout'));
        });
        req.addEventListener('load', function () {
          if (this.status !== 200) {
            reject({
              status: this.status,
              response: this.responseText
            });
          } else {
            resolve({
              status: this.status,
              response: this.responseText
            });
          }
        });
      }
      /**
       * Takes a config object and serializes/URI encodes the contents of the body property. If the "Content-Type" header is set
       * to "application/json", it encodes the payload as JSON. Otherwise, we assume that the payload should be x-www-form-urlencoded.
       */


      function _getUriEncodedBody(config) {
        var contentType = config && config.headers && config.headers['Content-Type'];
        var body = config && config.body || '';

        if (contentType === 'application/json') {
          body = JSON.stringify(body);
        } else if (_isObj(body)) {
          body = _getUriEncodedParams(body);
        }

        return body;
      }

      function _getUriEncodedParams(params) {
        if (!_isObj(params)) {
          return;
        }

        return Object.keys(params).map(function (key) {
          return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(params[key]));
        }).join('&');
      }
    }

    function NewCallUtils(instance, data) {
      this.instance = instance;
      this.data = data;
      var that = this;

      this.setupAddSessionCallback = function () {
        var sessionUii = utils.getText(data.ui_notification, 'uii');
        var sessionId = utils.getText(data.ui_notification, 'session_id');
        var call = UIModel.getInstance().currentCall;

        if (call.uii === sessionUii) {
          // we already have a new call packet for this session
          _delayedAddSessionCallback(that.instance, that.data);
        } else {
          // uii mismatch, but call has been dispositioned
          UIModel.getInstance().pendingNewCallSessions[sessionUii] = UIModel.getInstance().pendingNewCallSessions[sessionUii] || {};
          UIModel.getInstance().pendingNewCallSessions[sessionUii][sessionId] = that;
        }
      };

      this.processSessionsForCall = function () {
        var uii = UIModel.getInstance().currentCall.uii;
        var delayedSessions = UIModel.getInstance().pendingNewCallSessions[uii];

        if (delayedSessions && Object.keys(delayedSessions).length > 0) {
          // we have delayed sessions to process
          for (var sessionId in delayedSessions) {
            if (delayedSessions.hasOwnProperty(sessionId)) {
              var session = delayedSessions[sessionId];

              _delayedAddSessionCallback(session.instance, session.data);
            } else {
              console.error("error processing sessions for uii: ".concat(uii, " session: ").concat(sessionId));
            }
          }

          delete UIModel.getInstance().pendingNewCallSessions[uii];
        }
      };

      function _delayedAddSessionCallback(instance, data) {
        var addSessionNotif = new AddSessionNotification();
        var addResponse = addSessionNotif.processResponse(data);
        utils.fireCallback(instance, CALLBACK_TYPES.ADD_SESSION, addResponse);
      }
    }

    var utils = {
      logMessage: function logMessage(logLevel, message, data) {
        var instance = UIModel.getInstance().libraryInstance;

        if (instance._db) {
          try {
            var transaction = instance._db.transaction(['logger'], 'readwrite');

            var store = transaction.objectStore('logger');
            var record = {
              logLevel: logLevel,
              message: message,
              dts: new Date(),
              data: data
            };
            var request = store.add(record);
          } catch (err) {
            console.error("Error adding log message: ".concat(err));
          }
        } else {// console.log("AgentLibrary: indexedDb not available");
        }
      },
      sendMessage: function sendMessage(instance, msg) {
        var msgObj = JSON.parse(msg);

        if (instance.socket && instance.socket.readyState === 1) {
          // add message id to request map, then send message
          var type = msgObj.ui_request['@type'];
          var destination = msgObj.ui_request['@destination'];
          var message = "Sending ".concat(type, " request message to ").concat(destination);

          instance._requests.push({
            id: msgObj.ui_request['@message_id'],
            type: msgObj.ui_request['@type'],
            msg: msgObj.ui_request
          }); // keep rolling window of latest 1000 requests


          if (instance._requests.length > 1000) {
            instance._requests.shift();
          }

          instance.socket.send(msg);

          if (type === 'STATS') {
            utils.logMessage(LOG_LEVELS.STATS, message, msgObj);
          } else {
            utils.logMessage(LOG_LEVELS.INFO, message, msgObj);
          }
        } else {
          // add message to queue if socket is not open.
          instance._queuedMsgs.push({
            dts: new Date(),
            msg: msg
          });
        }
      },
      processResponse: function processResponse(instance, response) {
        var type = response.ui_response['@type'];
        var messageId = response.ui_response['@message_id'];
        var dest = messageId === '' || !messageId ? 'IS' : messageId.slice(0, 2);
        var message = "Received ".concat(type.toUpperCase(), " response message from ").concat(dest); // log message response

        utils.logMessage(LOG_LEVELS.INFO, message, response); // Send generic on message response

        utils.fireCallback(instance, CALLBACK_TYPES.ON_MESSAGE, response); // Fire callback function

        switch (type.toUpperCase()) {
          case MESSAGE_TYPES.AGENT_STATE:
            if (UIModel.getInstance().agentStateRequest === null) {
              UIModel.getInstance().agentStateRequest = new AgentStateRequest(response.ui_response.current_state['#text'], response.ui_response.agent_aux_state['#text']);
            }

            var stateChangeResponse = UIModel.getInstance().agentStateRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.AGENT_STATE, stateChangeResponse);
            break;

          case MESSAGE_TYPES.BARGE_IN:
            var resp = UIModel.getInstance().bargeInRequest.processResponse(response);
            var responseTo = response.ui_response['@response_to'];
            var request = utils.findRequestById(instance, responseTo);

            if (request) {
              // found corresponding request, fire registered callback for type
              var audioState = request.msg.audio_state['#text'];

              if (audioState === 'MUTE') {
                utils.fireCallback(instance, CALLBACK_TYPES.SILENT_MONITOR, resp);
              } else if (audioState === 'COACHING') {
                utils.fireCallback(instance, CALLBACK_TYPES.COACH_CALL, resp);
              } else {
                utils.fireCallback(instance, CALLBACK_TYPES.BARGE_IN, resp);
              }
            } else {
              // no corresponding request, just fire FULL audio type BARGE-IN callback
              utils.fireCallback(instance, CALLBACK_TYPES.BARGE_IN, resp);
            }

            break;

          case MESSAGE_TYPES.CAMPAIGN_DISPOSITIONS:
            var campaignDispsResposne = UIModel.getInstance().campaignDispositionsRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.CAMPAIGN_DISPOSITIONS, campaignDispsResposne);
            break;

          case MESSAGE_TYPES.CALL_NOTES:
            var callNotes = UIModel.getInstance().callNotesRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.CALL_NOTES, callNotes);
            break;

          case MESSAGE_TYPES.CALLBACK_PENDING:
            var pendingCallbacks = UIModel.getInstance().callbacksPendingRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.CALLBACK_PENDING, pendingCallbacks);
            break;

          case MESSAGE_TYPES.HOLD:
            var holdRequest;

            if (UIModel.getInstance().holdRequest === null) {
              holdRequest = new HoldRequest();
            } else {
              holdRequest = UIModel.getInstance().holdRequest;
            }

            var hold = holdRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.HOLD, hold);
            break;

          case MESSAGE_TYPES.LEAD_HISTORY:
            var history = UIModel.getInstance().leadHistoryRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.LEAD_HISTORY, history);
            break;

          case MESSAGE_TYPES.LEAD_INSERT:
            var insert = UIModel.getInstance().leadInsertRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.LEAD_INSERT, insert);
            break;

          case MESSAGE_TYPES.LEAD_UPDATE:
            var update = UIModel.getInstance().leadUpdateRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.LEAD_UPDATE, update);
            break;

          case MESSAGE_TYPES.LOGIN_PHASE_1:
            var loginPhase1Response = UIModel.getInstance().loginPhase1Request.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.LOGIN_PHASE_1, loginPhase1Response);
            break;

          case MESSAGE_TYPES.LOGIN:
            var loginResponse = UIModel.getInstance().loginRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.LOGIN, loginResponse);
            break;

          case MESSAGE_TYPES.OFFHOOK_INIT:
            var offhook = new OffhookInitRequest();
            var initResponse = offhook.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.OFFHOOK_INIT, initResponse);
            break;

          case MESSAGE_TYPES.PAUSE_RECORD:
            var pauseRequest;

            if (UIModel.getInstance().pauseRecordRequest === null) {
              pauseRequest = new PauseRecordRequest();
            } else {
              pauseRequest = UIModel.getInstance().pauseRecordRequest;
            }

            var pauseRec = pauseRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.PAUSE_RECORD, pauseRec);
            break;

          case MESSAGE_TYPES.RECORD:
            var record = UIModel.getInstance().recordRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.RECORD, record);
            break;

          case MESSAGE_TYPES.REQUEUE:
            var requeue = UIModel.getInstance().requeueRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.REQUEUE, requeue);
            break;

          case MESSAGE_TYPES.SUPERVISOR_LIST:
            var supervisorList = UIModel.getInstance().supervisorListRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.SUPERVISOR_LIST, supervisorList);
            break;

          case MESSAGE_TYPES.SCRIPT_CONFIG:
            var script = UIModel.getInstance().scriptConfigRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.SCRIPT_CONFIG, script);
            break;

          case MESSAGE_TYPES.XFER_COLD:
            var coldXfer = UIModel.getInstance().coldXferRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.XFER_COLD, coldXfer);
            break;

          case MESSAGE_TYPES.XFER_WARM:
            var warmXfer = UIModel.getInstance().warmXferRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.XFER_WARM, warmXfer);
            break;

          case MESSAGE_TYPES.XFER_WARM_CANCEL:
            var warmXferCancel = UIModel.getInstance().warmXferCancelRequest.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.XFER_WARM_CANCEL, warmXferCancel);
            break;

          case MESSAGE_TYPES.ACK:
            var ack = UIModel.getInstance().ackRequest.processResponse(response);
            var responseTo = response.ui_response['@response_to'];
            var request = utils.findRequestById(instance, responseTo);
            ack.uii = request.msg.uii && request.msg.uii['#text'];
            utils.fireCallback(instance, CALLBACK_TYPES.ACK, ack);
            break;

          case MESSAGE_TYPES.CHAT_LIST:
            var chatList = new ChatListRequest();
            var chatListResponse = chatList.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_LIST, chatListResponse);
            break;

          case MESSAGE_TYPES.CHAT_STATE:
            var chatState = new ChatStateRequest();
            var chatStateResponse = chatState.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_STATE, chatStateResponse);
            break;

          case MESSAGE_TYPES.DIRECT_AGENT_TRANSFER_LIST:
            var agentList = new DirectAgentTransferList();
            var agentListResponse = agentList.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.DIRECT_AGENT_TRANSFER_LIST, agentListResponse);
            break;

          case MESSAGE_TYPES.DIRECT_AGENT_TRANSFER:
            var agentXfer = new DirectAgentTransfer();
            var agentXferResponse = agentXfer.processResponse(response);
            utils.fireCallback(instance, CALLBACK_TYPES.DIRECT_AGENT_TRANSFER, agentXferResponse);
            break;
        }
      },
      processNotification: function processNotification(instance, data) {
        var type = data.ui_notification['@type'];
        var messageId = data.ui_notification['@message_id'];
        var dest = messageId === '' ? 'IS' : messageId.slice(0, 2);
        var message = "Received ".concat(type.toUpperCase(), " notification message from ").concat(dest); // log message response

        utils.logMessage(LOG_LEVELS.INFO, message, data);

        switch (type.toUpperCase()) {
          case MESSAGE_TYPES.ADD_SESSION:
            new NewCallUtils(instance, data).setupAddSessionCallback();
            break;

          case MESSAGE_TYPES.DIAL_GROUP_CHANGE:
            var dgChangeNotif = new DialGroupChangeNotification();
            var changeResponse = dgChangeNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.DIAL_GROUP_CHANGE, changeResponse);
            break;

          case MESSAGE_TYPES.DIAL_GROUP_CHANGE_PENDING:
            var dgChangePendNotif = new DialGroupChangePendingNotification();
            var pendResponse = dgChangePendNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.DIAL_GROUP_CHANGE_PENDING, pendResponse);
            break;

          case MESSAGE_TYPES.DROP_SESSION:
            var dropSesNotif = new DropSessionNotification(instance);
            var dropSesResponse = dropSesNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.DROP_SESSION, dropSesResponse);
            break;

          case MESSAGE_TYPES.EARLY_UII:
            var earlyUiiNotif = new EarlyUiiNotification(instance);
            var earlyUiiResponse = earlyUiiNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.EARLY_UII, earlyUiiResponse);
            break;

          case MESSAGE_TYPES.END_CALL:
            var endCallNotif = new EndCallNotification(instance);
            var endCallResponse = endCallNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.END_CALL, endCallResponse);
            break;

          case MESSAGE_TYPES.GATES_CHANGE:
            var gateChangeNotif = new GatesChangeNotification();
            var gateChangeResponse = gateChangeNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.GATES_CHANGE, gateChangeResponse);
            break;

          case MESSAGE_TYPES.GENERIC:
            var genericNotif = new GenericNotification();
            var generic = genericNotif.processResponse(data);
            var responseTo = data.ui_notification['@response_to'];
            var request = utils.findRequestById(instance, responseTo);

            if (request) {
              // found corresponding request, fire registered callback for type
              var type = request.type;
              var callbackFnName = utils.findCallbackBasedOnMessageType(type);

              if (callbackFnName) {
                if (type === MESSAGE_TYPES.CALLBACK_CANCEL) {
                  generic.leadId = request.msg.lead_id['#text'];
                }

                utils.fireCallback(instance, callbackFnName, generic);
              } else {
                // no registered callback, fallback to generic notification
                utils.fireCallback(instance, CALLBACK_TYPES.GENERIC_NOTIFICATION, generic);
              }
            } else {
              if (generic.messageCode === '001') {
                // caller hangup, stop pinging call
                if (UIModel.getInstance().pingIntervalId) {
                  clearInterval(UIModel.getInstance().pingIntervalId);
                }
              } // no corresponding request, just fire generic notification callback


              utils.fireCallback(instance, CALLBACK_TYPES.GENERIC_NOTIFICATION, generic);
            }

            break;

          case MESSAGE_TYPES.NEW_CALL:
            var newCallNotif = new NewCallNotification();
            var newCallResponse = newCallNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.NEW_CALL, newCallResponse);
            new NewCallUtils(instance, data).processSessionsForCall();
            break;

          case MESSAGE_TYPES.OFFHOOK_TERM:
            if (UIModel.getInstance().offhookTermRequest === null) {
              // offhook term initiated by IQ
              UIModel.getInstance().offhookTermRequest = new OffhookTermRequest();
            }

            var termResponse = UIModel.getInstance().offhookTermRequest.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.OFFHOOK_TERM, termResponse);
            break;

          case MESSAGE_TYPES.PREVIEW_LEAD_STATE:
            var leadStateNotif = new PreviewLeadStateNotification();
            var leadStateResponse = leadStateNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.PREVIEW_LEAD_STATE, leadStateResponse);
            break;

          case MESSAGE_TYPES.PENDING_DISP:
            var pendingDispNotif = new PendingDispNotification();
            var pendingDispResponse = pendingDispNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.PENDING_DISP, pendingDispResponse);
            break;

          case MESSAGE_TYPES.PENDING_CHAT_DISP:
            var pendingChatDispNotif = new PendingChatDispNotification();
            var pendingChatDispResponse = pendingChatDispNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.PENDING_CHAT_DISP, pendingChatDispResponse);
            break;

          case MESSAGE_TYPES.REVERSE_MATCH:
            var reverseMatchNotif = new ReverseMatchNotification();
            var reverseMatchResponse = reverseMatchNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.REVERSE_MATCH, reverseMatchResponse);
            break;

          case MESSAGE_TYPES.TCPA_SAFE_LEAD_STATE:
            var leadStateTcpaNotif = new TcpaSafeLeadStateNotification();
            var leadStateTcpaResponse = leadStateTcpaNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.TCPA_SAFE_LEAD_STATE, leadStateTcpaResponse);
            break;

          case MESSAGE_TYPES.CHAT_ACTIVE:
            var activeNotif = new ChatActiveNotification();
            var activeResponse = activeNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_ACTIVE, activeResponse);
            break;

          case MESSAGE_TYPES.CHAT_INACTIVE:
            var inactiveNotif = new ChatInactiveNotification();
            var inactiveResponse = inactiveNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_INACTIVE, inactiveResponse);
            break;

          case MESSAGE_TYPES.CHAT_CLIENT_RECONNECT:
            var reconnectNotif = new ChatClientReconnectNotification();
            var reconnectResponse = reconnectNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_CLIENT_RECONNECT, reconnectResponse);
            break;

          case MESSAGE_TYPES.CHAT_PRESENTED:
            var presentedNotif = new ChatPresentedNotification();
            var presentedResponse = presentedNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_PRESENTED, presentedResponse);
            break;

          case MESSAGE_TYPES.CHAT_TYPING:
            var typingNotif = new ChatTypingNotification();
            var typingResponse = typingNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_TYPING, typingResponse);
            break;

          case MESSAGE_TYPES.CHAT_NEW:
            var newChatNotif = new NewChatNotification();
            var newChatResponse = newChatNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_NEW, newChatResponse);
            break;

          case MESSAGE_TYPES.CHAT_MESSAGE:
            var chatMessage = new ChatMessageRequest();
            var chatMessageResponse = chatMessage.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_MESSAGE, chatMessageResponse);
            break;

          case MESSAGE_TYPES.CHAT_CANCELLED:
            var chatCancelled = new ChatCancelledNotification();
            var chatCancelledResponse = chatCancelled.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_CANCELLED, chatCancelledResponse);
            break;

          case MESSAGE_TYPES.CHAT_ADD_SESSION:
            var addChatSession = new AddChatSessionNotification();
            var addChatSessionResponse = addChatSession.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_ADD_SESSION, addChatSessionResponse);
            break;

          case MESSAGE_TYPES.STOP_MONITOR_CHAT:
            var stopChatMonitor = new StopMonitorChatRequest();
            var stopChatMonitorResponse = stopChatMonitor.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_STOP_MONITOR, stopChatMonitorResponse);
            break;

          case MESSAGE_TYPES.DIRECT_AGENT_ROUTE:
            var directAgentTransfer = new DirectAgentTransferNotification();
            var directAgentTransferResponse = directAgentTransfer.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.DIRECT_AGENT_TRANSFER_NOTIF, directAgentTransferResponse);
            break;

          case MESSAGE_TYPES.AGENT_DEBUG_EMAIL:
            var emailNotif = new AdminDebugEmailNotification();
            var emailNotifResp = emailNotif.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.AGENT_DEBUG_EMAIL_NOTIF, emailNotifResp);
            break;

          case MESSAGE_TYPES.LOGOUT:
            var logoutNotification = new LogoutRequest();
            var logoutNotifResponse = logoutNotification.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.LOGOUT, logoutNotifResponse);
            var model = UIModel.getInstance();
            model.dataStore.remove('agent_id'); // remove agent_id and hash_code from local storage

            model.dataStore.remove('hash_code');
            var instance = model.libraryInstance;
            model.agentSettings.isLoggedIn = false;
            instance.closeSocket();
            break;

          case MESSAGE_TYPES.MONITOR_CHAT:
            // TODO: do this
            break;

          case MESSAGE_TYPES.LEAVE_CHAT:
            // TODO: do this
            break;
        }
      },
      processDialerResponse: function processDialerResponse(instance, response) {
        var type = response.dialer_request['@type'];
        var messageId = response.dialer_request['@message_id'];
        var dest = messageId === '' ? 'IS' : messageId.slice(0, 2);
        var message = "Received ".concat(type.toUpperCase(), " dialer response message from ").concat(dest); // log message response

        utils.logMessage(LOG_LEVELS.INFO, message, response); // Send generic on message response

        utils.fireCallback(instance, CALLBACK_TYPES.ON_MESSAGE, response); // Fire callback function

        switch (type.toUpperCase()) {
          case MESSAGE_TYPES.PREVIEW_DIAL_ID:
            var pdRequest = new PreviewDialRequest();
            var dialResponse = pdRequest.processResponse(response);

            if (dialResponse.action.toUpperCase() === 'SEARCH') {
              utils.fireCallback(instance, CALLBACK_TYPES.LEAD_SEARCH, dialResponse);
            } else {
              utils.fireCallback(instance, CALLBACK_TYPES.PREVIEW_FETCH, dialResponse);
            }

            break;

          case MESSAGE_TYPES.TCPA_SAFE_ID:
            var tcpaRequest = new TcpaSafeRequest();
            var tcpaResponse = tcpaRequest.processResponse(response);

            if (tcpaResponse.action.toUpperCase() === 'SEARCH') {
              utils.fireCallback(instance, CALLBACK_TYPES.SAFE_MODE_SEARCH, tcpaResponse);
            } else {
              utils.fireCallback(instance, CALLBACK_TYPES.SAFE_MODE_FETCH, tcpaResponse);
            }

            break;
        }
      },
      processRequest: function processRequest(instance, message) {
        var type = message.ui_request['@type']; // Fire callback function

        switch (type.toUpperCase()) {
          case MESSAGE_TYPES.CHAT_SEND:
            var chatSendRequest = new ChatSendRequest();
            var chatSendResponse = chatSendRequest.processResponse(message);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT, chatSendResponse);
            break;

          case MESSAGE_TYPES.CHAT_ROOM_STATE:
            var chatRoomStateRequest = new ChatRoomStateRequest();
            var chatRoomStateResponse = chatRoomStateRequest.processResponse(message);
            utils.fireCallback(instance, CALLBACK_TYPES.CHAT_ROOM_STATE, chatRoomStateResponse);
            break;
        }
      },
      processStats: function processStats(instance, data) {
        var type = data.ui_stats['@type'];
        var message = "Received ".concat(type.toUpperCase(), " response message from IS"); // Fire callback function

        switch (type.toUpperCase()) {
          case MESSAGE_TYPES.STATS_AGENT:
            var agentStats = UIModel.getInstance().agentStatsPacket.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.STATS_AGENT, agentStats);
            break;

          case MESSAGE_TYPES.STATS_AGENT_DAILY:
            var agentDailyStats = UIModel.getInstance().agentDailyStatsPacket.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.STATS_AGENT_DAILY, agentDailyStats); // start daily stats interval timer, request update every second

            if (UIModel.getInstance().agentDailyIntervalId === null) {
              UIModel.getInstance().agentDailyIntervalId = setInterval(utils.onAgentDailyStats, 1000);
            }

            break;

          case MESSAGE_TYPES.STATS_CAMPAIGN:
            var campaignStats = UIModel.getInstance().campaignStatsPacket.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.STATS_CAMPAIGN, campaignStats);
            break;

          case MESSAGE_TYPES.STATS_QUEUE:
            var queueStats = UIModel.getInstance().queueStatsPacket.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.STATS_QUEUE, queueStats);
            break;

          case MESSAGE_TYPES.STATS_CHAT:
            var chatStats = UIModel.getInstance().chatQueueStatsPacket.processResponse(data);
            utils.fireCallback(instance, CALLBACK_TYPES.STATS_CHAT_QUEUE, chatStats);
            break;
        }
      },

      /*
       * Take the xml marked JSON, group and item property names and reformat to
       * simple javascript object without the xml markers.
       * Will work recursively down the tree on nested objects and arrays.
       *
       * example of acceptable response tree (groupProp = requeue_gates, itemProp = gate_group):
       *   "requeue_gates": {
       *       "gate_group": [
       *           {
       *               "@gate_group_id": "4",
       *               "@group_name": "Test Gate Group",
       *               "gates": {
       *                   "gate": [
       *                       {
       *                           "@gate_desc": "",
       *                           "@gate_id": "10951",
       *                           "@gate_name": "CD ACD Queue"
       *                       },
       *                       {
       *                           "@gate_desc": "",
       *                           "@gate_id": "11036",
       *                           "@gate_name": "Xerox Test Gate"
       *                       }
       *                   ]
       *               },
       *               "skills": {
       *                   "skill": [
       *                       {
       *                           "@skill_desc": "",
       *                           "@skill_id": "322",
       *                           "@skill_name": "English"
       *                       },
       *                       {
       *                           "@skill_desc": "",
       *                           "@skill_id": "323",
       *                           "@skill_name": "Spanish"
       *                       }
       *                   ]
       *               }
       *           },
       *           {
       *               "@gate_group_id": "14292",
       *               "@group_name": "New Test Group",
       *               "gates": {
       *                   "gate": {
       *                       "@gate_desc": "",
       *                       "@gate_id": "15535",
       *                       "@gate_name": "New Test Gate"
       *                   }
       *               },
       *               "skills": {
       *                   "skill": {
       *                       "@skill_desc": "",
       *                       "@skill_id": "1658",
       *                       "@skill_name": "new skill"
       *                   }
       *               }
       *           }
       *       ]
       *   }
       *
       *   OR
       *
       *   "outdial_dispositions": {
       *       "@type": "GATE",
       *       "disposition": [
       *          {
       *           "@contact_forwarding": "false",
       *           "@disposition_id": "926",
       *           "@is_complete": "1",
       *           "@require_note": "0",
       *           "@save_survey": "1",
       *           "@xfer": "0",
       *           "#text": "One B"
       *          },
       *          {
       *           "@contact_forwarding": "false",
       *           "@disposition_id": "926",
       *           "@is_complete": "1",
       *           "@require_note": "0",
       *           "@save_survey": "1",
       *           "@xfer": "0",
       *           "#text": "One B"
       *          }
       *      ]
       *   }
       *
       *   OR
       *
       *   "outdial_dispositions": {
       *       "@type": "GATE",
       *       "disposition": {
       *          {
       *           "@contact_forwarding": "false",
       *           "@disposition_id": "926",
       *           "@is_complete": "1",
       *           "@require_note": "0",
       *           "@save_survey": "1",
       *           "@xfer": "0",
       *           "#text": "One B"
       *          }
       *      }
       *   }
       */
      processResponseCollection: function processResponseCollection(response, groupProp, itemProp, textName) {
        textName = textName || 'text';

        if (response[groupProp] && typeof response[groupProp][itemProp] !== 'undefined') {
          var itemsRaw = response[groupProp][itemProp];
          return this._processItems(itemsRaw, textName);
        }

        return [];
      },
      escapeSoftphoneUsername: function escapeSoftphoneUsername(str) {
        return str && str.replace(/[@]/g, '_at_');
      },
      _processItems: function _processItems(itemsRaw, textName) {
        var result = [];

        if (typeof itemsRaw === 'undefined' || itemsRaw === null) {
          return result;
        }

        if (!Array.isArray(itemsRaw)) {
          itemsRaw = [itemsRaw];
        }

        for (var i = 0; i < itemsRaw.length; i++) {
          result.push(this._processItem(itemsRaw[i], textName));
        }

        return result;
      },
      _processItem: function _processItem(itemRaw, textName) {
        /*
         * Be sure that the item we are processing is not a #text node only, where the "texName" is also "text". If this
         * is the case, it means there's a default value that needs to get converted and isn't going to be mapped to a custom
         * field.  Therefore, we treat it as just a single value, not an object.
         */
        if (textName === 'text' && Object.keys(itemRaw).length === 1 && itemRaw['#text'] != null) {
          return this._tryConvertValueToBoolean(itemRaw['#text']);
        } // Convert the raw item to a new item, with keys and values processed below
        //


        var item = {};

        for (var key in itemRaw) {
          var formattedKey = this._convertToFormattedKey(key, textName);

          var value = itemRaw[key]; // If we aren't an object, set the value and continue to next key

          if (_typeof(value) !== 'object') {
            item[formattedKey] = this._tryConvertValueToBoolean(value);
            continue;
          }

          if (Array.isArray(value) && value.length === 0 || Object.keys(value).length === 0) {
            // Empty property
            item[formattedKey] = '';
          } else if (Array.isArray(value) || Object.keys(value).length > 1) {
            // Array or object with more than one key
            formattedKey = this._convertKeyForCollection(formattedKey);
            item[formattedKey] = this._processItems(value, textName);
          } else if (Object.keys(value).length === 1 && value['#text'] != null) {
            // One property of type "#text"
            item[formattedKey] = value['#text'];
          } else {
            // One property not with key "#text"
            item[formattedKey] = this._processItems(value[Object.keys(value)[0]], 'text');
          }
        }

        return item;
      },
      _convertToFormattedKey: function _convertToFormattedKey(key, textName) {
        var formattedKey;

        if (key.match(/^#/)) {
          // dealing with text property
          formattedKey = textName;
        } else {
          // dealing with attribute
          formattedKey = key.replace(/@/, ''); // remove leading '@'

          formattedKey = formattedKey.replace(/_([a-z])/g, function (g) {
            return g[1].toUpperCase();
          }); // convert to camelCase
        }

        return formattedKey;
      },
      _convertKeyForCollection: function _convertKeyForCollection(formattedKey) {
        if (formattedKey.substr(formattedKey.length - 1) !== 's') {
          return "".concat(formattedKey, "s");
        }

        return formattedKey;
      },
      _tryConvertValueToBoolean: function _tryConvertValueToBoolean(value) {
        if (value === null) {
          return null;
        } // can't convert 0 | 1 to boolean since some are counters


        if (value.toUpperCase() === 'TRUE') {
          return true;
        }

        if (value.toUpperCase() === 'FALSE') {
          return false;
        }

        return value;
      },
      fireCallback: function fireCallback(instance, type, response) {
        response = response || '';

        if (typeof type !== 'undefined' && typeof instance.callbacks[type] === 'function') {
          instance.callbacks[type].call(instance, response);
        }
      },
      setCallback: function setCallback(instance, type, callback) {
        if (typeof type !== 'undefined' && typeof callback !== 'undefined') {
          instance.callbacks[type] = callback;
        }
      },
      getMessageId: function getMessageId() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return "".concat(s4() + s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
      },
      // check whether the given array of ids exist in the given array of objects
      // if not available, remove the id
      // returns the clean list of acceptable ids
      checkExistingIds: function checkExistingIds(objArray, idArray, idProperty) {
        var availIds = [];
        var removeIds = []; // get list of available ids

        for (var o = 0; o < objArray.length; o++) {
          availIds.push(parseInt(objArray[o][idProperty], 10));
        } // go through selected ids and mark unfound ones for removal


        for (var i = 0; i < idArray.length; i++) {
          if (availIds.indexOf(parseInt(idArray[i], 10)) === -1) {
            // selected id not found in available list, mark for removal
            removeIds.push(parseInt(idArray[i], 10));
          }
        } // remove marked ids


        for (var r = idArray.length - 1; r >= 0; r--) {
          if (removeIds.indexOf(parseInt(idArray[r], 10)) > -1) {
            // remove
            idArray.splice(r, 1);
          }
        }

        return idArray;
      },
      // find an object by given id in an array of objects
      findObjById: function findObjById(objArray, id, propName) {
        for (var o = 0; o < objArray.length; o++) {
          var obj = objArray[o];

          if (obj[propName] === id) {
            return obj;
          }
        }

        return null;
      },
      // check whether agent dialDest is either a 10-digit number or valid sip
      validateDest: function validateDest(dialDest) {
        var isValid = false;
        var isNum = /^\d+$/.test(dialDest);

        if (isNum && dialDest.length === 10) {
          // is a 10-digit number
          isValid = true;
        } else if (dialDest.slice(0, 4).toLowerCase() === 'sip:' && dialDest.indexOf('@') !== -1) {
          // has sip prefix and '@'
          isValid = true;
        }

        return isValid;
      },
      // pass in MESSAGE_TYPE string (e.g. "CANCEL-CALLBACK"),
      // return corresponding CALLBACK_TYPE function name string (e.g. "callbackCancelResponse")
      findCallbackBasedOnMessageType: function findCallbackBasedOnMessageType(messageType) {
        var callbackFnName = '';

        for (var key in MESSAGE_TYPES) {
          if (MESSAGE_TYPES[key] === messageType) {
            callbackFnName = CALLBACK_TYPES[key];
          }
        }

        return callbackFnName;
      },
      // add message, detail, and status values to the formattedResponse
      // returned from each request processResponse method
      buildDefaultResponse: function buildDefaultResponse(response) {
        var message = '';
        var detail = '';
        var status = '';
        var msg = '';
        var det = '';
        var stat = ''; // add message and detail if present

        if (response.ui_response) {
          msg = response.ui_response.message;
          det = response.ui_response.detail;
          stat = response.ui_response.status;
        } else if (response.ui_notification) {
          msg = response.ui_notification.message;
          det = response.ui_notification.detail;
          stat = response.ui_notification.status;
        }

        if (msg) {
          message = msg['#text'] || '';
        }

        if (det) {
          detail = det['#text'] || '';
        }

        if (stat) {
          status = stat['#text'] || '';
        }

        return {
          message: message,
          detail: detail,
          status: status
        };
      },
      toString: function toString(val) {
        if (val) {
          return val.toString();
        }

        return '';
      },
      // safely check if property exists and return empty string
      // instead of undefined if it doesn't exist
      // convert "TRUE" | "FALSE" to boolean
      getText: function getText(obj, prop) {
        var o = obj[prop];

        if (o && o['#text']) {
          if (o['#text'].toUpperCase() === 'TRUE') {
            return true;
          }

          if (o['#text'].toUpperCase() === 'FALSE') {
            return false;
          }

          return o['#text'] || '';
        }

        return '';
      },
      // safely check if property exists and return empty string
      // instead of undefined if it doesn't exist
      // convert "TRUE" | "FALSE" to boolean
      getAttribute: function getAttribute(obj, prop) {
        var o = obj[prop];

        if (o && o[prop]) {
          if (o[prop].toUpperCase() === 'TRUE') {
            return true;
          }

          if (o[prop].toUpperCase() === 'FALSE') {
            return false;
          }

          return o[prop] || '';
        }

        return '';
      },
      // Parses a string of key value pairs and returns an Array of KeyValue objects.
      // @param str The string of keyvalue pairs to parse
      // @param outerDelimiter The delimiter that separates each keyValue pair
      // @param innerDelimiter The delimiter that separates each key from its value
      parseKeyValuePairsFromString: function parseKeyValuePairsFromString(str, outerDelimiter, innerDelimiter) {
        if (!str) {
          return [];
        }

        var arr = str.split(outerDelimiter).reduce(function (dict, pair) {
          var keyValue = pair.split(innerDelimiter);
          dict[keyValue[0]] = keyValue[1];
          return dict;
        }, {});
        return arr;
      },
      // Finds a request by responseTo id
      findRequestById: function findRequestById(instance, id) {
        var request = null;

        for (var i = 0; i < instance._requests.length; i++) {
          if (instance._requests[i].id === id) {
            request = instance._requests[i];
            break;
          }
        }

        return request;
      },
      // called every 30 seconds letting intelliQueue know
      // not to archive the call so dispositions and other call
      // clean up actions can happen
      sendPingCallMessage: function sendPingCallMessage() {
        UIModel.getInstance().pingCallRequest = new PingCallRequest();
        var msg = UIModel.getInstance().pingCallRequest.formatJSON();
        var msgObj = JSON.parse(msg);
        var agentId = utils.getText(msgObj.ui_request, 'agent_id');
        var uii = utils.getText(msgObj.ui_request, 'uii');

        if (agentId === '' || uii === '') {
          utils.logMessage(LOG_LEVELS.WARN, 'PING-CALL message failed, agentId or UII is empty', msgObj);
        } else {
          utils.sendMessage(UIModel.getInstance().libraryInstance, msg);
        }
      },
      // called every 5 seconds to request stats from IntelliServices
      sendStatsRequestMessage: function sendStatsRequestMessage() {
        UIModel.getInstance().statsRequest = new StatsRequest();
        var msg = UIModel.getInstance().statsRequest.formatJSON();
        utils.sendMessage(UIModel.getInstance().libraryInstance, msg);
      },
      // called every 20 seconds to ping IntelliSocket whent stats are disabled
      sendPingRequestMessage: function sendPingRequestMessage() {
        var msg = 'BEAT';
        var instance = UIModel.getInstance().libraryInstance;

        if (instance.socket && instance.socket.readyState === 1) {
          instance.socket.send('BEAT');
        }
      },
      // called every second
      // if we have received agent daily stats
      // start incrementing various data points since not all
      // data is incremented when we want on the IntelliServices side
      onAgentDailyStats: function onAgentDailyStats() {
        if (Object.keys(UIModel.getInstance().agentDailyStats).length !== 0) {
          var agentSettings = UIModel.getInstance().agentSettings;
          var stats = UIModel.getInstance().agentDailyStats;
          var curLoginTime = stats.totalLoginTime;
          stats.totalLoginTime = Number(curLoginTime) + 1;

          if (agentSettings.isOffhook) {
            var curOffhookTime = stats.totalOffhookTime;
            stats.totalOffhookTime = Number(curOffhookTime) + 1;
          }

          if (agentSettings.currentState == 'ENGAGED') {
            var curTalkTime = stats.totalTalkTime;
            stats.totalTalkTime = Number(curTalkTime) + 1;
            var curCallTime = stats.currCallTime;
            stats.currCallTime = Number(curCallTime) + 1;
          }
        }
      },
      // called in loginAgent if 'integrated' dial destination passed in
      getDialDestination: function getDialDestination() {
        var model = UIModel.getInstance();
        var softphoneSettings = model.softphoneSettings;
        var dialDestType = model.applicationSettings.dialDestType;
        var dialDest = ''; // default to the first server in the array

        if (softphoneSettings.sipInfo.length > 0) {
          var currentServer = softphoneSettings.sipInfo[0];

          if (dialDestType === 'LEGACY_SOFTPHONE') {
            dialDest = "sip:".concat(utils.escapeSoftphoneUsername(currentServer.username), "@").concat(currentServer.domain);
          } else if (dialDestType === 'RC_SOFTPHONE') {
            dialDest = "".concat(utils.escapeSoftphoneUsername(currentServer.username), "@RC_SOFTPHONE");
          }
        }

        return dialDest;
      },
      // get valid access token based on agentId and login hash code
      refreshAccessToken: function refreshAccessToken() {
        var model = UIModel.getInstance();
        var baseUrl = model.authHost + model.baseAuthUri;
        var errorMsg = 'Error in opening WebSocket on retrieving access token';
        var params = {
          queryParams: {
            loginHashcode: model.connectionSettings.hashCode,
            agentId: model.agentSettings.agentId,
            platformId: model.authenticateRequest.platformId
          }
        };
        new HttpService(baseUrl).httpPost('login/agent/hashcode', params).then(function (response) {
          try {
            response = JSON.parse(response.response);
            UIModel.getInstance().authenticateRequest.engageAccessToken = response.accessToken;
          } catch (err) {
            utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
          }
        }, function (err) {
          var errResponse = {
            type: 'refreshAccessToken Error',
            message: errorMsg
          };
          utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
        });
      }
    }; // CONSTANTS

    /* jshint esnext: true */

    var LOG_LEVELS = {
      DEBUG: 'debug',
      STATS: 'stats',
      INFO: 'info',
      WARN: 'warn',
      ERROR: 'error'
    };
    var AUTHENTICATE_TYPES = {
      USERNAME_PASSWORD: 'USERNAME_PASSWORD',
      RC_TOKEN: 'RC_TOKEN',
      ENGAGE_TOKEN: 'ENGAGE_TOKEN'
    }; // add all callback types to setCallback method description

    var CALLBACK_TYPES = {
      ACK: 'acknowledgeResponse',
      ADD_SESSION: 'addSessionNotification',
      AGENT_DEBUG_EMAIL_NOTIF: 'agentDebugEmailNotification',
      AGENT_STATE: 'agentStateResponse',
      AUTHENTICATE: 'authenticateResponse',
      BARGE_IN: 'bargeInResponse',
      CALLBACK_CANCEL: 'callbackCancelResponse',
      CALLBACK_PENDING: 'callbacksPendingResponse',
      CALL_NOTES: 'callNotesResponse',
      CAMPAIGN_DISPOSITIONS: 'campaignDispositionsResponse',
      CHAT: 'chatResponse',
      // internal chat
      CHAT_ACTIVE: 'chatActiveNotification',
      // external chat
      CHAT_ADD_SESSION: 'addChatSessionNotification',
      // external chat
      CHAT_CANCELLED: 'chatCancelledNotification',
      // external chat
      CHAT_CLIENT_RECONNECT: 'chatClientReconnectNotification',
      CHAT_INACTIVE: 'chatInactiveNotification',
      // external chat
      CHAT_LIST: 'chatListResponse',
      // external chat
      CHAT_MESSAGE: 'chatMessageNotification',
      // external chat
      CHAT_NEW: 'chatNewNotification',
      // external chat
      CHAT_PRESENTED: 'chatPresentedNotification',
      // external chat
      CHAT_ROOM_STATE: 'chatRoomStateResponse',
      CHAT_STATE: 'chatStateResponse',
      // external chat
      CHAT_STOP_MONITOR: 'stopAgentChatMonitorNotification',
      // external chat
      CHAT_TYPING: 'chatTypingNotification',
      // external chat
      CLOSE_SOCKET: 'closeResponse',
      COACH_CALL: 'coachResponse',
      CONFIG: 'configureResponse',
      DIAL_GROUP_CHANGE: 'dialGroupChangeNotification',
      DIAL_GROUP_CHANGE_PENDING: 'dialGroupChangePendingNotification',
      DIRECT_AGENT_TRANSFER: 'directAgentTransferResponse',
      DIRECT_AGENT_TRANSFER_LIST: 'directAgentTransferListResponse',
      DIRECT_AGENT_TRANSFER_NOTIF: 'directAgentTransferNotification',
      DROP_SESSION: 'dropSessionNotification',
      EARLY_UII: 'earlyUiiNotification',
      END_CALL: 'endCallNotification',
      GATES_CHANGE: 'gatesChangeNotification',
      GENERIC_NOTIFICATION: 'genericNotification',
      GENERIC_RESPONSE: 'genericResponse',
      HOLD: 'holdResponse',
      LEAD_HISTORY: 'leadHistoryResponse',
      LEAD_INSERT: 'leadInsertResponse',
      LEAD_SEARCH: 'leadSearchResponse',
      LEAD_UPDATE: 'leadUpdateResponse',
      LOGIN: 'loginResponse',
      LOGIN_PHASE_1: 'loginPhase1Response',
      LOGIN_MULTISOCKET: 'multiSocketResponse',
      LOGOUT: 'logoutResponse',
      LOG_CONSOLE_RESULTS: 'logConsoleResultsResponse',
      LOG_RESULTS: 'logResultsResponse',
      NEW_CALL: 'newCallNotification',
      OFFHOOK_INIT: 'offhookInitResponse',
      OFFHOOK_TERM: 'offhookTermNotification',
      OPEN_SOCKET: 'openResponse',
      PAUSE_RECORD: 'pauseRecordResponse',
      PENDING_CHAT_DISP: 'pendingChatDispNotification',
      PENDING_DISP: 'pendingDispNotification',
      PREVIEW_FETCH: 'previewFetchResponse',
      PREVIEW_LEAD_STATE: 'previewLeadStateNotification',
      RECORD: 'recordResponse',
      REQUEUE: 'requeueResponse',
      REVERSE_MATCH: 'reverseMatchNotification',
      SAFE_MODE_FETCH: 'safeModeFetchResponse',
      SAFE_MODE_SEARCH: 'safeModeSearchResponse',
      SCRIPT_CONFIG: 'scriptConfigResponse',
      SILENT_MONITOR: 'monitorResponse',
      STATS_AGENT: 'agentStats',
      STATS_AGENT_DAILY: 'agentDailyStats',
      STATS_CAMPAIGN: 'campaignStats',
      STATS_CHAT_QUEUE: 'chatQueueStats',
      STATS_QUEUE: 'queueStats',
      SUPERVISOR_LIST: 'supervisorListResponse',
      TCPA_SAFE_LEAD_STATE: 'tcpaSafeLeadStateNotification',
      WEBRTC_INFO: 'webRtcInfoResponse',
      XFER_COLD: 'coldXferResponse',
      XFER_WARM: 'warmXferResponse',
      SEARCH_DIR: 'searchDirectoryResponse',
      EXTENSION_PRESENCE: 'extensionPresenceInfo',
      // SOFTPHONE Callbacks
      SIP_CONNECTED: 'sipConnectedNotification',
      SIP_DIAL_DEST_CHANGED: 'sipDialDestChangedNotification',
      SIP_ENDED: 'sipEndedNotification',
      SIP_MUTE: 'sipMuteResponse',
      SIP_REGISTERED: 'sipRegisteredNotification',
      SIP_REGISTRATION_FAILED: 'sipRegistrationFailedNotification',
      SIP_RINGING: 'sipRingingNotification',
      SIP_SWITCH_REGISTRAR: 'sipSwitchRegistrarNotification',
      SIP_UNMUTE: 'sipUnmuteResponse',
      SIP_UNREGISTERED: 'sipUnregisteredNotification'
    };
    var MESSAGE_TYPES = {
      ACK: 'ACK',
      ADD_SESSION: 'ADD-SESSION',
      AGENT_DEBUG_EMAIL: 'AGENT-DEBUG-EMAIL',
      AGENT_STATE: 'AGENT-STATE',
      BARGE_IN: 'BARGE-IN',
      CALLBACK_CANCEL: 'CANCEL-CALLBACK',
      CALLBACK_PENDING: 'PENDING-CALLBACKS',
      CALL_NOTES: 'CALL-NOTES',
      CAMPAIGN_DISPOSITIONS: 'CAMPAIGN-DISPOSITIONS',
      CHAT_ACTIVE: 'CHAT-ACTIVE',
      // external chat
      CHAT_ADD_SESSION: 'ADD-CHAT-SESSION',
      // external chat
      CHAT_AGENT_END: 'CHAT-END',
      // external chat
      CHAT_ALIAS: 'CHAT-ALIAS',
      // internal chat
      CHAT_CANCELLED: 'CHAT-CANCELLED',
      // external chat
      CHAT_CLIENT_RECONNECT: 'CHAT-CLIENT-RECONNECT',
      // external chat
      CHAT_DISPOSITION: 'CHAT-DISPOSITION',
      // external chat
      CHAT_INACTIVE: 'CHAT-INACTIVE',
      // external chat
      CHAT_LIST: 'CHAT-LIST',
      // external chat
      CHAT_MANUAL_SMS: 'MANUAL-SMS',
      // external chat
      CHAT_MESSAGE: 'CHAT-MESSAGE',
      // external chat
      CHAT_NEW: 'NEW-CHAT',
      // external chat
      CHAT_PRESENTED: 'CHAT-PRESENTED',
      // external chat
      CHAT_PRESENTED_RESPONSE: 'CHAT-PRESENTED-RESPONSE',
      // external chat
      CHAT_REQUEUE: 'CHAT-REQUEUE',
      // external chat
      CHAT_ROOM: 'CHAT-ROOM',
      // internal chat
      CHAT_ROOM_STATE: 'CHAT-ROOM-STATE',
      // internal chat
      CHAT_SEND: 'CHAT',
      // internal chat
      CHAT_STATE: 'CHAT-STATE',
      // external chat
      CHAT_TYPING: 'CHAT-TYPING',
      // external chat
      DIAL_GROUP_CHANGE: 'DIAL_GROUP_CHANGE',
      DIAL_GROUP_CHANGE_PENDING: 'DIAL_GROUP_CHANGE_PENDING',
      DIRECT_AGENT_ROUTE: 'DIRECT-AGENT-ROUTE',
      DIRECT_AGENT_TRANSFER: 'DIRECT-AGENT-TRANSFER',
      DIRECT_AGENT_TRANSFER_LIST: 'DIRECT-AGENT-TRANSFER-LIST',
      DROP_SESSION: 'DROP-SESSION',
      EARLY_UII: 'EARLY_UII',
      END_CALL: 'END-CALL',
      GATES_CHANGE: 'GATES_CHANGE',
      GENERIC: 'GENERIC',
      HANGUP: 'HANGUP',
      HOLD: 'HOLD',
      INBOUND_DISPOSITION: 'INBOUND-DISPOSITION',
      LEAD_HISTORY: 'LEAD-HISTORY',
      LEAD_INSERT: 'LEAD-INSERT',
      LEAD_UPDATE: 'LEAD-UPDATE',
      LEAVE_CHAT: 'CHAT-DROP-SESSION',
      // external chat
      LOGIN: 'LOGIN',
      LOGIN_PHASE_1: 'LOGIN-PHASE-1',
      LOGIN_MULTISOCKET: 'MULTISOCKET',
      LOGOUT: 'LOGOUT',
      MONITOR_CHAT: 'CHAT-MONITOR',
      // external chat
      NEW_CALL: 'NEW-CALL',
      OFFHOOK_INIT: 'OFF-HOOK-INIT',
      OFFHOOK_TERM: 'OFF-HOOK-TERM',
      ONE_TO_ONE_OUTDIAL: 'ONE-TO-ONE-OUTDIAL',
      ONE_TO_ONE_OUTDIAL_CANCEL: 'ONE-TO-ONE-OUTDIAL-CANCEL',
      ON_MESSAGE: 'ON-MESSAGE',
      OUTDIAL_DISPOSITION: 'OUTDIAL-DISPOSITION',
      PAUSE_RECORD: 'PAUSE-RECORD',
      PENDING_CHAT_DISP: 'PENDING-CHAT-DISP',
      // external chat
      PENDING_DISP: 'PENDING_DISP',
      PING_CALL: 'PING-CALL',
      PREVIEW_DIAL: 'PREVIEW-DIAL',
      PREVIEW_DIAL_ID: 'PREVIEW_DIAL',
      PREVIEW_LEAD_STATE: 'PREVIEW-LEAD-STATE',
      RECORD: 'RECORD',
      REQUEUE: 'RE-QUEUE',
      REVERSE_MATCH: 'REVERSE_MATCH',
      SCRIPT_CONFIG: 'SCRIPT-CONFIG',
      SCRIPT_RESULT: 'SCRIPT-RESULT',
      STATS: 'STATS',
      STATS_AGENT: 'AGENT',
      STATS_AGENT_DAILY: 'AGENTDAILY',
      STATS_CAMPAIGN: 'CAMPAIGN',
      STATS_CHAT: 'CHAT',
      STATS_QUEUE: 'GATE',
      STOP_MONITOR_CHAT: 'CHAT-DROP-MONITORING-SESSION',
      // external chat
      SUPERVISOR_LIST: 'SUPERVISOR-LIST',
      // internal chat
      TCPA_SAFE: 'TCPA-SAFE',
      TCPA_SAFE_ID: 'TCPA_SAFE',
      TCPA_SAFE_LEAD_STATE: 'TCPA-SAFE-LEAD-STATE',
      UPDATE_DIAL_DESTINATION: 'UPDATE_DIAL_DESTINATION',
      XFER_COLD: 'COLD-XFER',
      XFER_WARM: 'WARM-XFER',
      XFER_WARM_CANCEL: 'WARM-XFER-CANCEL',
      // SOFTPHONE message types
      SETUP_WEB_RTC_SERVER: 'SETUP_WEB_RTC_SERVER',
      SIP_INIT: 'SIP_INIT',
      SIP_ANSWER: 'SIP_ANSWER',
      SIP_REJECT: 'SIP_REJECT',
      SIP_REGISTER: 'SIP_REGISTER',
      SIP_HANGUP: 'SIP_HANGUP',
      SIP_SEND_DTMF: 'SIP_SEND_DTMF',
      SIP_TOGGLE_MUTE: 'SIP_TOGGLE_MUTE',
      SOFTPHONE_RESET_SESSION: 'SOFTPHONE_RESET_SESSION',
      SWITCH_SOFTPHONE_REGISTRAR: 'SWITCH_SOFTPHONE_REGISTRAR'
    };
    /*
     * Init wrapper for the core module.
     * @param {Object} The Object that the library gets attached to in
     * library.init.js.  If the library was not loaded with an AMD loader such as
     * require.js, this is the global Object.
     */

    function initAgentLibraryCore(context) {
      /**
         * This is the constructor for the Library Object. Note that the constructor is also being
         * attached to the context that the library was loaded in.
         * @param {Object} [config={}] Set authHost, if the WebSocket should be secure or not with the testingLocal boolean, and callback functions.
         * @constructor
         * @namespace Core
         * @memberof AgentLibrary
         * @property {object} callbacks Internal map of registered callback functions
         * @property {array} _requests Internal map of requests by message id, private property.
         * @property {array} _queuedMsgs Array of pending messages to be sent when socket reconnected
         * @property {boolean} _isReconnect Whether or not we are doing a reconnect for the socket
         * @example
          var Lib = new AgentLibrary({
               authHost:'d01-test.cf.dev:8080', // window.location.origin
               testingLocal: true,
               allowMultiSocket: true,
               callbacks: {
                   closeResponse: onCloseFunction,
                   openResponse: onOpenFunction
               }
          });
         */
      var AgentLibrary = context.AgentLibrary = function (config) {
        config = config || {}; // define properties

        this.callbacks = {};
        this._requests = [];
        this._queuedMsgs = [];
        this._isReconnect = false; // start with new model instance

        UIModel.resetInstance(); // set instance on model object

        UIModel.getInstance().libraryInstance = this; // initialize indexedDB for logging

        this.openLogger();
        this.openConsoleLogger(); // set default values

        if (typeof config.callbacks !== 'undefined') {
          this.callbacks = config.callbacks;
        }

        if (typeof config.authHost !== 'undefined') {
          UIModel.getInstance().authHost = config.authHost;
        }

        if (config.isSecureSocket !== 'undefined') {
          if (typeof config.isSecureSocket === 'string') {
            config.isSecureSocket = config.isSecureSocket.toLowerCase() === 'true';
          }

          UIModel.getInstance().socketProtocol = config.isSecureSocket ? 'wss://' : 'ws://';
        }

        UIModel.getInstance().applicationSettings.allowMultiSocket = config.allowMultiSocket === true;
        return this;
      };
      /**
       * Set multiple callback functions based on type
       * @memberof AgentLibrary.Core
       * @param {Object} callbackMap Contains map of callback types to their respective functions:<br />
       * <tt>callbackMap = {<br />
       *      closeResponse: onCloseFunction,<br />
       *      openResponse: onOpenFunction<br />
       * }
       * </tt>
       *<br />
       * Possible callback types:
       * <li>"addSessionNotification"</li>
       * <li>"agentStateResponse"</li>
       * <li>"acknowledgeResponse"</li>
       * <li>"bargeInResponse"</li>
       * <li>"closeResponse"</li>
       * <li>"coachResponse"</li>
       * <li>"configureResponse"</li>
       * <li>"callNotesResponse"</li>
       * <li>"callbacksPendingResponse"</li>
       * <li>"callbackCancelResponse"</li>
       * <li>"campaignDispositionsResponse"</li>
       * <li>"chatResponse"</li>
       * <li>"dialGroupChangeNotification"</li>
       * <li>"dialGroupChangePendingNotification"</li>
       * <li>"dropSessionNotification"</li>
       * <li>"earlyUiiNotification"</li>
       * <li>"endCallNotification"</li>
       * <li>"gatesChangeNotification"</li>
       * <li>"genericNotification"</li>
       * <li>"genericResponse"</li>
       * <li>"holdResponse"</li>
       * <li>"leadSearchResponse"</li>
       * <li>"loginResponse"</li>
       * <li>"logoutResponse"</li>
       * <li>"monitorResponse"</li>
       * <li>"newCallNotification"</li>
       * <li>"offhookInitResponse"</li>
       * <li>"offhookTermNotification"</li>
       * <li>"openResponse"</li>
       * <li>"pauseRecordResponse"</li>
       * <li>"pendingDispNotification"</li>
       * <li>"previewFetchResponse"</li>
       * <li>"previewLeadStateNotification"</li>
       * <li>"recordResponse"</li>
       * <li>"requeueResponse"</li>
       * <li>"reverseMatchNotification"</li>
       * <li>"safeModeFetchResponse"</li>
       * <li>"safeModeSearchResponse"</li>
       * <li>"scriptConfigResponse"</li>
       * <li>"supervisorListResponse"</li>
       * <li>"coldXferResponse"</li>
       * <li>"warmXferResponse"</li>
       * <li>"agentStats"</li>
       * <li>"agentDailyStats"</li>
       * <li>"campaignStats"</li>
       * <li>"queueStats"</li>
       * <li>"chatQueueStats"</li>
       * @type {object}
       */


      AgentLibrary.prototype.setCallbacks = function (callbackMap) {
        for (var property in callbackMap) {
          this.callbacks[property] = callbackMap[property];
        }
      };
      /**
       * Set an individual callback function for the given type
       * @memberof AgentLibrary.Core
       * @param {string} type The name of the event that fires the callback function
       * @param {function} callback The function to call for the given type
       */


      AgentLibrary.prototype.setCallback = function (type, callback) {
        this.callbacks[type] = callback;
      };
      /**
       * Get the map of all registered callbacks
       * @memberof AgentLibrary.Core
       * @returns {array}
       */


      AgentLibrary.prototype.getCallbacks = function () {
        return this.callbacks;
      };
      /**
       * Get a given registered callback by type
       * @memberof AgentLibrary.Core
       * @returns {object}
       */


      AgentLibrary.prototype.getCallback = function (type) {
        return this.callbacks[type];
      };
      /**
       * Get the socket connection to IntelliSocket
       * @memberof AgentLibrary.Core
       * @returns {object}
       */


      AgentLibrary.prototype.getSocket = function (type) {
        return this.socket;
      };
      /**
       * @namespace Requests
       * @memberof AgentLibrary.Core
       */
      // //////////////////////////
      // requests and responses //
      // //////////////////////////

      /**
       * Get outgoing Authenticate Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAuthenticateRequest = function () {
        return UIModel.getInstance().authenticateRequest;
      };
      /**
       * Get outgoing Login Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getLoginRequest = function () {
        return UIModel.getInstance().loginRequest;
      };
      /**
       * Get the MultiSocket Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getMultiSocketRequest = function () {
        return UIModel.getInstance().multiSocketRequest;
      };
      /**
       * Get outgoing Login Phase 1 Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentConfigRequest = function () {
        return UIModel.getInstance().loginPhase1Request;
      };
      /**
       * Get outgoing Logout Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getLogoutRequest = function () {
        return UIModel.getInstance().logoutRequest;
      };
      /**
       * Get latest Agent Daily Stats object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentDailyStats = function () {
        return UIModel.getInstance().agentDailyStats;
      };
      /**
       * Get latest Call Tokens object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getCallTokens = function () {
        return UIModel.getInstance().callTokens;
      };
      /**
       * Get latest outgoing Agent State Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentStateRequest = function () {
        return UIModel.getInstance().agentStateRequest;
      };
      /**
       * Get latest outgoing offhook init Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getOffhookInitRequest = function () {
        return UIModel.getInstance().offhookInitRequest;
      };
      /**
       * Get latest outgoing offhook termination Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getOffhookTermRequest = function () {
        return UIModel.getInstance().offhookTermRequest;
      };
      /**
       * Get latest outgoing Hangup Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getHangupRequest = function () {
        return UIModel.getInstance().hangupRequest;
      };
      /**
       * Get latest outgoing Preview Dial Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getPreviewDialRequest = function () {
        return UIModel.getInstance().previewDialRequest;
      };
      /**
       * Get latest TCPA Safe Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getTcpaSafeRequest = function () {
        return UIModel.getInstance().tcpaSafeRequest;
      };
      /**
       * Get latest Manual Outdial Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getManualOutdialRequest = function () {
        return UIModel.getInstance().oneToOneOutdialRequest;
      };
      /**
       * Get latest Manual Outdial Cancel Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getManualOutdialCancelRequest = function () {
        return UIModel.getInstance().oneToOneOutdialCancelRequest;
      };
      /**
       * Get latest Call Notes Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getCallNotesRequest = function () {
        return UIModel.getInstance().callNotesRequest;
      };
      /**
       * Get latest Campaign Dispositions Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getCampaignDispositionsRequest = function () {
        return UIModel.getInstance().campaignDispositionsRequest;
      };
      /**
       * Get latest Disposition Call Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getDispositionRequest = function () {
        return UIModel.getInstance().dispositionRequest;
      };
      /**
       * Get latest Disposition Manual Pass Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getDispositionManualPassRequest = function () {
        return UIModel.getInstance().dispositionManualPassRequest;
      };
      /**
       * Get latest Warm Transfer Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getWarmTransferRequest = function () {
        return UIModel.getInstance().warmXferRequest;
      };
      /**
       * Get latest Cold Transfer Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getColdTransferRequest = function () {
        return UIModel.getInstance().coldXferRequest;
      };
      /**
       * Get latest Warm Transfer Cancel Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getWarmTransferCancelRequest = function () {
        return UIModel.getInstance().warmXferCancelRequest;
      };
      /**
       * Get latest Requeue Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getRequeueRequest = function () {
        return UIModel.getInstance().requeueRequest;
      };
      /**
       * Get latest Barge-In Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getBargeInRequest = function () {
        return UIModel.getInstance().bargeInRequest;
      };
      /**
       * Get latest Hold Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getHoldRequest = function () {
        return UIModel.getInstance().holdRequest;
      };
      /**
       * Get latest Pause Record Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getPauseRecordRequest = function () {
        return UIModel.getInstance().pauseRecordRequest;
      };
      /**
       * Get latest Record Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getRecordRequest = function () {
        return UIModel.getInstance().recordRequest;
      };
      /**
       * Get latest Chat Presented Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getChatPresentedRequest = function () {
        return UIModel.getInstance().chatPresentedRequest;
      };
      /**
       * Get latest Chat Disposition Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getChatDispositionRequest = function () {
        return UIModel.getInstance().chatDispositionRequest;
      };
      /**
       * Get latest Chat Message Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getChatMessageRequest = function () {
        return UIModel.getInstance().chatMessageRequest;
      };
      /**
       * Get latest Chat Requeue Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getChatRequeueRequest = function () {
        return UIModel.getInstance().chatRequeueRequest;
      };
      /**
       * Get latest Chat Typing Request object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getChatTypingRequest = function () {
        return UIModel.getInstance().chatTypingRequest;
      };
      /**
       * Get latest Agent Stats object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentStatsPacket = function () {
        return UIModel.getInstance().agentStatsPacket;
      };
      /**
       * Get latest Agent Daily Stats object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentDailyStatsPacket = function () {
        return UIModel.getInstance().agentDailyStatsPacket;
      };
      /**
       * Get latest Queue Stats object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getQueueStatsPacket = function () {
        return UIModel.getInstance().queueStatsPacket;
      };
      /**
       * Get latest Chat Queue Stats object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getChatQueueStatsPacket = function () {
        return UIModel.getInstance().chatQueueStatsPacket;
      };
      /**
       * Get latest Campaign Stats object
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getCampaignStatsPacket = function () {
        return UIModel.getInstance().campaignStatsPacket;
      };
      /**
       * Get packet received on successful Phase 1 login
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentConfigPacket = function () {
        return UIModel.getInstance().loginPhase1Packet;
      };
      /**
       * Get packet received on successful Login (2nd layer login)
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getLoginPacket = function () {
        return UIModel.getInstance().loginPacket;
      };
      /**
       * Get latest received packet for Agent State
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentStatePacket = function () {
        return UIModel.getInstance().agentStatePacket;
      };
      /**
       * Get latest received packet for the Current Call
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getCurrentCallPacket = function () {
        return UIModel.getInstance().currentCallPacket;
      };
      /**
       * Get latest received packet for initiating an offhook session
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getOffhookInitPacket = function () {
        return UIModel.getInstance().offhookInitPacket;
      };
      /**
       * Get latest received packet for terminating an offhook session
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getOffhookTermPacket = function () {
        return UIModel.getInstance().offhookTermPacket;
      };
      /**
       * Get chat agent end request class
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getChatAgentEnd = function () {
        return UIModel.getInstance().chatAgentEnd;
      };
      /**
       * Get WebRTC request class
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getWebRTCRequest = function () {
        return UIModel.getInstance().webRTCRequest;
      };

      AgentLibrary.prototype.getChatListRequest = function () {
        return UIModel.getInstance().chatListRequest;
      };
      /**
       * Get SearchDirectoryRequest class
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getSearchDirectoryRequest = function () {
        return UIModel.getInstance().searchDirectoryRequest;
      };
      /**
       * @namespace Notifications
       * @memberof AgentLibrary.Core
       */
      // /////////////////
      // notifications //
      // /////////////////

      /**
       * Get Dial Group Change notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getDialGroupChangeNotification = function () {
        return UIModel.getInstance().dialGroupChangeNotification;
      };
      /**
       * Get Dial Group Change Pending notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getDialGroupChangePendingNotification = function () {
        return UIModel.getInstance().dialGroupChangePendingNotification;
      };
      /**
       * Get End Call notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getEndCallNotification = function () {
        return UIModel.getInstance().endCallNotification;
      };
      /**
       * Get Gates Change notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getGatesChangeNotification = function () {
        return UIModel.getInstance().gatesChangeNotification;
      };
      /**
       * Get Generic notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getGenericNotification = function () {
        return UIModel.getInstance().genericNotification;
      };
      /**
       * Get New Call notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getNewCallNotification = function () {
        return UIModel.getInstance().newCallNotification;
      };
      /**
       * Get current call object
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getCurrentCall = function () {
        return UIModel.getInstance().currentCall;
      };
      /**
       * Get Add Session notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getAddSessionNotification = function () {
        return UIModel.getInstance().addSessionNotification;
      };
      /**
       * Get Drop Session notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getDropSessionNotification = function () {
        return UIModel.getInstance().dropSessionNotification;
      };
      /**
       * Get Early UII notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getEarlyUiiNotification = function () {
        return UIModel.getInstance().earlyUiiNotification;
      };
      /**
       * Get Chat Active notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getChatActiveNotification = function () {
        return UIModel.getInstance().chatActiveNotification;
      };
      /**
       * Get Chat Inactive notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getChatInactiveNotification = function () {
        return UIModel.getInstance().chatInactiveNotification;
      };
      /**
       * Get Chat Inactive notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getChatClientReconnectNotification = function () {
        return UIModel.getInstance().chatClientReconnectNotification;
      };
      /**
       * Get Chat Presented notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getChatPresentedNotification = function () {
        return UIModel.getInstance().chatPresentedNotification;
      };
      /**
       * Get Chat Typing notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getChatTypingNotification = function () {
        return UIModel.getInstance().chatTypingNotification;
      };
      /**
       * Get New Chat notification class
       * @memberof AgentLibrary.Core.Notifications
       * @returns {object}
       */


      AgentLibrary.prototype.getNewChatNotification = function () {
        return UIModel.getInstance().newChatNotification;
      };
      /**
       * @namespace Settings
       * @memberof AgentLibrary.Core
       */
      // ////////////////////
      // settings objects //
      // ////////////////////

      /**
       * Get Application Settings object containing the current state of application related data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getApplicationSettings = function () {
        return UIModel.getInstance().applicationSettings;
      };
      /**
       * Get Softphone Settings object containing the current state of SIP related data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getSoftphoneSettings = function () {
        return UIModel.getInstance().softphoneSettings;
      };
      /**
       * Get Chat Settings object containing the current state of chat related data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getChatSettings = function () {
        return UIModel.getInstance().chatSettings;
      };
      /**
       * Get Connection Settings object containing the current state of connection related data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getConnectionSettings = function () {
        return UIModel.getInstance().connectionSettings;
      };
      /**
       * Get Inbound Settings object containing the current state of inbound related data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getInboundSettings = function () {
        return UIModel.getInstance().inboundSettings;
      };
      /**
       * Get Outbound Settings object containing the current state of outbound related data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getOutboundSettings = function () {
        return UIModel.getInstance().outboundSettings;
      };
      /**
       * Get Agent Settings object containing the current state of agent related data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentSettings = function () {
        return UIModel.getInstance().agentSettings;
      };
      /**
       * Get Transfer Sessions
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getTransferSessions = function () {
        return UIModel.getInstance().transferSessions;
      };

      AgentLibrary.prototype.getPendingSessions = function () {
        return UIModel.getInstance().pendingNewCallSessions;
      };
      /**
       * Get the Agent Permissions object containing the current state of agent permissions
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentPermissions = function () {
        return UIModel.getInstance().agentPermissions;
      };
      /**
       * @namespace Stats
       * @memberof AgentLibrary.Core
       */
      // /////////////////
      // stats objects //
      // /////////////////

      /**
       * Get the Agent stats object containing the current state of agent stats
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentStats = function () {
        return UIModel.getInstance().agentStats;
      };
      /**
       * Get the Agent Daily stats object containing the current state of agent daily stats
       * @memberof AgentLibrary.Core.Stats
       * @returns {object}
       */


      AgentLibrary.prototype.getAgentDailyStats = function () {
        return UIModel.getInstance().agentDailyStats;
      };
      /**
       * Get the Queue stats object containing the current state of queue stats
       * @memberof AgentLibrary.Core.Stats
       * @returns {object}
       */


      AgentLibrary.prototype.getQueueStats = function () {
        return UIModel.getInstance().queueStats;
      };
      /**
       * Get the Chat Queue stats object containing the current state of chat queue stats
       * @memberof AgentLibrary.Core.Stats
       * @returns {object}
       */


      AgentLibrary.prototype.getChatQueueStats = function () {
        return UIModel.getInstance().chatQueueStats;
      };
      /**
       * Get the Campaign stats object containing the current state of campaign stats
       * @memberof AgentLibrary.Core.Stats
       * @returns {object}
       */


      AgentLibrary.prototype.getCampaignStats = function () {
        return UIModel.getInstance().campaignStats;
      };
      /**
       * Get filteredDirectory object containing the filtered directory data
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getFilteredDirectory = function () {
        return UIModel.getInstance().filteredDirectory;
      };
      /**
       * Get extensionPresenceResponse object containing the presenceInfo of extensionIds
       * @memberof AgentLibrary.Core.Settings
       * @returns {object}
       */


      AgentLibrary.prototype.getExtensionPresenceResponse = function () {
        return UIModel.getInstance().extensionPresenceResponse;
      };
      /**
       * Get ExtensionPresenceRequest class
       * @memberof AgentLibrary.Core.Requests
       * @returns {object}
       */


      AgentLibrary.prototype.getExtensionPresenceRequest = function () {
        return UIModel.getInstance().extensionPresenceRequest;
      };
      /** ********************
       *  PRIVATE FUNCTIONS *
       ********************* */


      AgentLibrary.prototype._utils = utils;
      AgentLibrary.prototype._NewCallUtils = NewCallUtils;
      AgentLibrary.prototype._HttpService = HttpService;

      AgentLibrary.prototype._getUIModel = function () {
        return UIModel;
      };
    }

    function initAgentLibrarySocket(context) {
      var AgentLibrary = context.AgentLibrary;

      AgentLibrary.prototype.openSocket = function (agentId, callback) {
        var instance = this;
        utils.setCallback(instance, CALLBACK_TYPES.OPEN_SOCKET, callback);

        if ('WebSocket' in context) {
          if (!instance.socket) {
            var model = UIModel.getInstance();
            model.agentSettings.agentId = agentId; // set agentId here since id is in scope

            if (instance._isReconnect) {
              // update access_token on reconnect
              _getNewAccessToken(instance);
            } else {
              _buildSocketDest();

              _initSocket(instance);
            }
          }
        } else {
          utils.logMessage(LOG_LEVELS.WARN, 'WebSocket NOT supported by your Browser', '');
        }
      };

      AgentLibrary.prototype.closeSocket = function () {
        this.socket.close();
      }; // when socket is successfully opened, check to see if there are any queued messaged
      // and if so, send them.


      AgentLibrary.prototype.socketOpened = function () {
        var instance = this;
        var currDts = new Date();
        var threeMins = 3 * 60 * 1000; // milliseconds

        var queuedMsg; // get agent configuration information - "phase 1 login"

        UIModel.getInstance().loginPhase1Request = new LoginPhase1Request();
        var msg = UIModel.getInstance().loginPhase1Request.formatJSON();
        utils.sendMessage(this, msg); // if this is a reconnect, we need to re-authenticate with IntelliServices & IntelliQueue

        if (instance._isReconnect) {
          instance._isReconnect = false; // Add IntelliQueue reconnect

          var loginRequest = JSON.parse(UIModel.getInstance().loginRequest.formatJSON());
          var hashCode = UIModel.getInstance().connectionSettings.hashCode;
          loginRequest.ui_request.hash_code = {
            '#text': hashCode
          };
          loginRequest.ui_request.update_login = {
            '#text': 'FALSE'
          };
          loginRequest.ui_request.reconnect = {
            '#text': 'TRUE'
          };

          instance._queuedMsgs.unshift({
            dts: new Date(),
            msg: JSON.stringify(loginRequest)
          });
        }

        for (var idx = 0; idx < instance._queuedMsgs.length; idx++) {
          queuedMsg = instance._queuedMsgs[idx];

          if (currDts.getTime() - queuedMsg.dts.getTime() < threeMins) {
            // message queued less than 3 mins ago, send
            utils.logMessage(LOG_LEVELS.DEBUG, 'Sending queued message to IntelliSocket.', queuedMsg.msg);
            utils.sendMessage(instance, queuedMsg.msg);
          } else {
            // message expired, don't send
            utils.logMessage(LOG_LEVELS.DEBUG, 'Queued message expired, discarding.', queuedMsg.msg);
          }
        } // reset queued messages


        instance._queuedMsgs = [];
      }; // build WebSocket destination based on current agentId and access token


      function _buildSocketDest() {
        var model = UIModel.getInstance();
        var socketDest = model.applicationSettings.socketDest;
        socketDest = model.socketProtocol + model.authenticateRequest.socketUrl;
        socketDest += ":".concat(model.authenticateRequest.socketPort);
        socketDest += "?access_token=".concat(model.authenticateRequest.accessToken);
        socketDest += "&agent_id=".concat(model.agentSettings.agentId);
        model.applicationSettings.socketDest = socketDest; // seems redundant, but needed to update value on model

        return socketDest;
      } // connect socket, setup socket event listeners


      function _initSocket(instance) {
        var socketDest = UIModel.getInstance().applicationSettings.socketDest;
        utils.logMessage(LOG_LEVELS.DEBUG, "Attempting to open socket connection to ".concat(socketDest), '');
        instance.socket = new WebSocket(socketDest);

        instance.socket.onopen = function () {
          // stop reconnect timer
          clearInterval(UIModel.getInstance().reconnectIntervalId);
          UIModel.getInstance().reconnectIntervalId = null;
          UIModel.getInstance().applicationSettings.socketConnected = true;
          utils.fireCallback(instance, CALLBACK_TYPES.OPEN_SOCKET, {
            reconnect: instance._isReconnect
          });
          instance.socketOpened();
        };

        instance.socket.onerror = function (err) {
          utils.fireCallback(instance, CALLBACK_TYPES.OPEN_SOCKET, {
            error: err
          });
        };

        instance.socket.onmessage = function (evt) {
          if (evt.data !== 'BOP') {
            var data = JSON.parse(evt.data);

            if (data.ui_response) {
              utils.processResponse(instance, data);
            } else if (data.ui_notification) {
              utils.processNotification(instance, data);
            } else if (data.dialer_request) {
              utils.processDialerResponse(instance, data);
            } else if (data.ui_stats) {
              utils.processStats(instance, data);
            } else if (data.ui_request) {
              utils.processRequest(instance, data);
            }
          }
        };

        instance.socket.onclose = function () {
          utils.fireCallback(instance, CALLBACK_TYPES.CLOSE_SOCKET, '');
          UIModel.getInstance().applicationSettings.socketConnected = false;
          instance.socket = null; // cancel daily stats timer

          clearInterval(UIModel.getInstance().agentDailyIntervalId);
          UIModel.getInstance().agentDailyIntervalId = null; // cancel stats timer

          clearInterval(UIModel.getInstance().statsIntervalId);
          UIModel.getInstance().statsIntervalId = null; // cancel BEAT timer

          clearInterval(UIModel.getInstance().pingStatIntervalId);
          UIModel.getInstance().pingStatIntervalId = null; // if we are still logged in, set reconnect flag and try to reconnect

          if (UIModel.getInstance().agentSettings.isLoggedIn) {
            instance._isReconnect = true;
            console.warn('AgentLibrary: WebSocket is not connected, attempting to reconnect.'); // try reconnect every 5 seconds

            UIModel.getInstance().reconnectIntervalId = setInterval(function () {
              instance.openSocket(UIModel.getInstance().agentSettings.agentId);
            }, 5000);
          }
        };
      } // get valid access token based on agentId and login hash code


      function _getNewAccessToken(instance) {
        var model = UIModel.getInstance();
        var baseUrl = model.authHost + model.baseAuthUri;
        var errorMsg = 'Error in opening WebSocket on retrieving access token';
        var params = {
          queryParams: {
            loginHashcode: model.connectionSettings.hashCode,
            agentId: model.agentSettings.agentId,
            platformId: model.authenticateRequest.platformId
          }
        };
        new HttpService(baseUrl).httpPost('login/agent/hashcode', params).then(function (response) {
          try {
            response = JSON.parse(response.response);
            UIModel.getInstance().authenticateRequest.accessToken = response.accessToken;

            _buildSocketDest();

            _initSocket(instance);
          } catch (err) {
            utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
          }
        }, function (err) {
          var errResponse = {
            type: 'WebSocket Error',
            message: errorMsg
          };
          utils.logMessage(LOG_LEVELS.WARN, errorMsg, err);
        });
      }
    }

    function initAgentLibraryAgent(context) {
      /**
       * @namespace Agent
       * @memberof AgentLibrary
       */
      var AgentLibrary = context.AgentLibrary;
      /**
       * Sends authenticate request to Engage Auth. Can either pass in 3 params of username, password, and platformId or
       * two params of jwt and tokenType. In each case a callback function may optionally be specified.
       * @memberof AgentLibrary.Agent
       * @param {string} username Agent's username
       * @param {string} password Agent's password
       * @param {string} platformId Designate the platform where the agent is set up
       * @param {function} [callback=null] Callback function when loginAgent response received
       */

      AgentLibrary.prototype.authenticateAgentWithUsernamePassword = function (username, password, platformId, callback) {
        UIModel.getInstance().authenticateRequest = new AuthenticateRequest({
          username: username,
          password: password,
          platformId: platformId,
          authType: AUTHENTICATE_TYPES.USERNAME_PASSWORD
        });
        UIModel.getInstance().authenticateRequest.sendHttpRequest();
        utils.setCallback(this, CALLBACK_TYPES.AUTHENTICATE, callback);
      };
      /**
       * Sends authenticate request to Engage Auth. Returns an array of agents to continue login process.
       * @memberof AgentLibrary.Agent
       * @param {string} rcAccessToken JSON Web Token received from RingCentral Single Sign-on API
       * @param {string} tokenType string type received from RingCentral Single Sign-on API
       * @param {function} [callback=null] Callback function when loginAgent response received
       */


      AgentLibrary.prototype.authenticateAgentWithRcAccessToken = function (rcAccessToken, tokenType, callback) {
        UIModel.getInstance().authenticateRequest = new AuthenticateRequest({
          rcAccessToken: rcAccessToken,
          tokenType: tokenType,
          authType: AUTHENTICATE_TYPES.RC_TOKEN
        });
        UIModel.getInstance().authenticateRequest.sendHttpRequest();
        utils.setCallback(this, CALLBACK_TYPES.AUTHENTICATE, callback);
      };
      /**
       * Sends authenticate request to Engage Auth. Returns an array of agents to continue login process.
       * @memberof AgentLibrary.Agent
       * @param {string} engageAccessToken JSON Web Token received from RingCentral Single Sign-on API
       * @param {function} [callback=null] Callback function when loginAgent response received
       */


      AgentLibrary.prototype.authenticateAgentWithEngageAccessToken = function (engageAccessToken, callback) {
        UIModel.getInstance().authenticateRequest = new AuthenticateRequest({
          engageAccessToken: engageAccessToken,
          authType: AUTHENTICATE_TYPES.ENGAGE_TOKEN
        });
        UIModel.getInstance().authenticateRequest.sendHttpRequest();
        utils.setCallback(this, CALLBACK_TYPES.AUTHENTICATE, callback);
      };
      /**
       * Sends request to IntelliQueue to get the agent's available products for login
       * @memberof AgentLibrary.Agent
       * @param {function} [callback=null] Callback function when loginPhase1 response received
       */


      AgentLibrary.prototype.getAgentConfig = function (callback) {
        UIModel.getInstance().loginPhase1Request = new LoginPhase1Request();
        var msg = UIModel.getInstance().loginPhase1Request.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.LOGIN_PHASE_1, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Sends request to the WebRTC Endpoint URL and process the response.
       * @memberof AgentLibrary.Agent
       *
       * @param {function} [callback=null] Callback function when web rtc info response received
       */


      AgentLibrary.prototype.getWebRtcInfo = function (callback) {
        var model = UIModel.getInstance();
        model.webRTCRequest = new WebRTCRequest();
        model.webRTCRequest.getSipRegistrationInfo();
        utils.setCallback(this, CALLBACK_TYPES.WEBRTC_INFO, callback);
      };
      /**
       * Sends agent configure message (2nd layer login) to IntelliQueue
       * @memberof AgentLibrary.Agent
       * @param {string} dialDest The agent's number, sip | DID.
       * @param {string[]} [queueIds=null] The queue ids the agent will be logged into.
       * @param {string[]} [chatIds=null] The chat ids the agent will be logged into.
       * @param {string} [skillProfileId=null] The skill profile the agent will be logged into.
       * @param {string} [dialGroupId=null] The outbound dial group id the agent will be logged into.
       * @param {string} [updateFromAdminUI=false] Whether the request is generated from the AdminUI or not.
       * @param {boolean} isForce Whether the agent login is forcing an existing agentlogin out.
       * @param {function} [callback=null] Callback function when configureAgent response received.
       */


      AgentLibrary.prototype.loginAgent = function (dialDest, queueIds, chatIds, skillProfileId, dialGroupId, updateFromAdminUI, isForce, callback) {
        var model = UIModel.getInstance();
        var config = {
          dialDest: dialDest,
          queueIds: queueIds,
          chatIds: chatIds,
          skillProfileId: skillProfileId,
          dialGroupId: dialGroupId,
          updateFromAdminUI: updateFromAdminUI,
          isForce: isForce
        };
        var instance = this; // if dialDest is set to `integrated`, we are doing an integrated softphone
        // and need to get SIP credentials

        if (config.dialDest === 'integrated') {
          // set up some global variables to track dial dest type for later offhook init
          if (model.applicationSettings.isSso) {
            model.applicationSettings.dialDestType = 'RC_SOFTPHONE';
          } else {
            model.applicationSettings.dialDestType = 'LEGACY_SOFTPHONE';
          }

          if (model.softphoneSettings.sipInfo.length === 0) {
            // call engage-auth api to get webRtc info
            model.libraryInstance.getWebRtcInfo(function () {
              config.dialDest = utils.getDialDestination();

              _setUpAndSendLogin(config, callback, instance);
            });
          } else {
            // set webRtc info from model, could be an update login
            config.dialDest = utils.getDialDestination();

            _setUpAndSendLogin(config, callback, instance);
          }
        } else {
          // set up some global variables to track dial dest type for later offhook init
          if (config.dialDest === 'RC_PHONE') {
            model.applicationSettings.dialDestType = 'RC_PHONE';
          }

          _setUpAndSendLogin(config, callback, instance);
        }
      };

      function _setUpAndSendLogin(config, callback, instance) {
        UIModel.getInstance().loginRequest = new LoginRequest(config.dialDest, config.queueIds, config.chatIds, config.skillProfileId, config.dialGroupId, config.updateFromAdminUI, config.isForce);
        var msg = UIModel.getInstance().loginRequest.formatJSON();
        utils.setCallback(instance, CALLBACK_TYPES.LOGIN, callback);
        utils.sendMessage(instance, msg);
      }
      /**
       * Sends multisocket message to IntelliQueue
       * @memberof AgentLibrary.Agent
       * @param {function} [callback=null] Callback function when multisocket response received.
       */


      AgentLibrary.prototype.multiLoginRequest = function (callback) {
        var model = UIModel.getInstance();
        model.multiSocketRequest = new MultiSocketRequest();
        var msg = model.multiSocketRequest.formatJSON();

        if (model.dataStore.get('agent_id') && model.dataStore.get('hash_code')) {
          utils.setCallback(this, CALLBACK_TYPES.LOGIN_MULTISOCKET, callback);
          utils.sendMessage(this, msg);
        } else {
          this.getAgentConfig(callback);
        }
      };
      /**
       * Sends agent logout message to IntelliQueue
       * @memberof AgentLibrary.Agent
       * @param {number} agentId Id of the agent that will be logged out.
       * @param {function} [callback=null] Callback function when logoutAgent response received.
       */


      AgentLibrary.prototype.logoutAgent = function (agentId, callback) {
        var model = UIModel.getInstance();

        if (model.agentSettings.isLoggedIn) {
          model.agentSettings.isLoggedIn = false;
          model.logoutRequest = new LogoutRequest(agentId);
          var msg = model.logoutRequest.formatJSON(); // socket closed in callback function

          utils.setCallback(this, CALLBACK_TYPES.LOGOUT, callback);
          utils.sendMessage(this, msg);
        }
      };
      /**
       * Sends agent logout for the given agent to logout message to IntelliQueue
       * @memberof AgentLibrary.Agent
       * @param {number} agentToLogout Id of the agent that will be logged out.
       * @param {number} [requestMessage=""] Message to send for the logout request.
       * @param {function} [callback=null] Callback function when logoutAgent response received.
       */


      AgentLibrary.prototype.requestLogoutAgent = function (agentToLogout, requestMessage, callback) {
        var isSupervisor = UIModel.getInstance().agentSettings.agentType === 'SUPERVISOR';

        if (isSupervisor) {
          // This is a supervisor request to log an agent out. Create the
          // logout packet and then send the packet to IntelliQueue.
          UIModel.getInstance().logoutRequest = new LogoutRequest(agentToLogout, requestMessage);
          utils.setCallback(this, CALLBACK_TYPES.LOGOUT, callback);
          var msg = UIModel.getInstance().logoutRequest.formatJSON();
          utils.sendMessage(this, msg);
        }
      };
      /**
       * Sends agent state change message to IntelliQueue
       * @memberof AgentLibrary.Agent
       * @param {string} agentState The system/base state to transition to <br />
       * AVAILABLE | TRANSITION | ENGAGED | ON-BREAK | WORKING | AWAY | LUNCH | AUX-UNAVAIL-NO-OFFHOOK | AUX-UNAVAIL-OFFHOOK
       * @param {string} [agentAuxState=""] The aux state display label
       * @param {function} [callback=null] Callback function when agentState response received
       */


      AgentLibrary.prototype.setAgentState = function (agentState, agentAuxState, callback) {
        UIModel.getInstance().agentStateRequest = new AgentStateRequest(agentState, agentAuxState);
        var msg = UIModel.getInstance().agentStateRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.AGENT_STATE, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Initiates an agent offhook session
       * @memberof AgentLibrary.Agent
       * @param {function} [callback=null] Callback function when offhookInit response received
       */


      AgentLibrary.prototype.offhookInit = function (callback) {
        UIModel.getInstance().offhookInitRequest = new OffhookInitRequest();
        var msg = UIModel.getInstance().offhookInitRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.OFFHOOK_INIT, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Terminates agent's offhook session
       * @memberof AgentLibrary.Agent
       * @param {function} [callback=null] Callback function when pending callbacks response received
       */


      AgentLibrary.prototype.offhookTerm = function (callback) {
        UIModel.getInstance().offhookTermRequest = new OffhookTermRequest();
        var msg = UIModel.getInstance().offhookTermRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.OFFHOOK_TERM, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Returns scheduled callbacks for the given agent
       * @memberof AgentLibrary.Agent
       * @param {number} [agentId=logged in agent id] Id of agent to get callbacks for
       * @param {function} [callback=null] Callback function when pending callbacks response received
       */


      AgentLibrary.prototype.getPendingCallbacks = function (agentId, callback) {
        UIModel.getInstance().callbacksPendingRequest = new CallbacksPendingRequest(agentId);
        var msg = UIModel.getInstance().callbacksPendingRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.CALLBACK_PENDING, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Cancel a scheduled callback for the given agent based on lead id
       * @memberof AgentLibrary.Agent
       * @param {number} leadId Id of lead callback to cancel
       * @param {number} [agentId=logged in agent id] Id of agent to cancel specified lead callback for
       * @param {function} [callback=null] Callback function when callback is canceled
       */


      AgentLibrary.prototype.cancelCallback = function (leadId, agentId, callback) {
        UIModel.getInstance().callbackCancelRequest = new CallbackCancelRequest(leadId, agentId);
        var msg = UIModel.getInstance().callbackCancelRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.CALLBACK_CANCEL, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Request stats messages to be sent every 5 seconds. The stats responses will be sent as
       * four possible callback types: agentStats, agentDailyStats, campaignStats, or queueStats
       * @memberof AgentLibrary.Agent
       */


      AgentLibrary.prototype.requestStats = function () {
        // start stats interval timer, request stats every 5 seconds
        if (UIModel.getInstance().statsIntervalId === null) {
          UIModel.getInstance().statsIntervalId = setInterval(utils.sendStatsRequestMessage, 5000);

          _terminatePing();
        }
      };
      /**
       * Terminate stats messages sent to the agent every 5 seconds.
       * @memberof AgentLibrary.Agent
       */


      AgentLibrary.prototype.terminateStats = function () {
        clearInterval(UIModel.getInstance().statsIntervalId);
        UIModel.getInstance().statsIntervalId = null;

        _requestPing();
      };

      function _requestPing() {
        // start ping interval timer, request BEAT every 20 seconds
        if (UIModel.getInstance().pingStatIntervalId === null) {
          UIModel.getInstance().pingStatIntervalId = setInterval(utils.sendPingRequestMessage, 20000);
        }
      }

      function _terminatePing() {
        clearInterval(UIModel.getInstance().pingStatIntervalId);
        UIModel.getInstance().pingStatIntervalId = null;
      }
      /**
       * Set the agent dial destination
       * @memberof AgentLibrary.Agent
       * @param {string} dialDest The dial destination used for softphone registration
       * @param {boolean} isSoftphoneError True - if we want to log this dial destination update as a softphone error
       */


      AgentLibrary.prototype.updateDialDestination = function (dialDest, isSoftphoneError) {
        UIModel.getInstance().updateDialDestinationRequest = new UpdateDialDestinationRequest(dialDest, isSoftphoneError);
        var msg = UIModel.getInstance().updateDialDestinationRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Search Directory for the searchString passed to function.
       * @memberof AgentLibrary.Agent
       * @param {string} searchString The search filter for PBX directory
       */


      AgentLibrary.prototype.searchDirectory = function (searchString, callback) {
        var model = UIModel.getInstance();
        model.searchDirectoryRequest = new SearchDirectoryRequest(searchString);
        model.searchDirectoryRequest.searchDirectory(searchString);
        utils.setCallback(this, CALLBACK_TYPES.SEARCH_DIR, callback);
      };
      /**
       * Refresh Token method
       * @memberof AgentLibrary.Agent
       */


      AgentLibrary.prototype.getRefreshedToken = function () {
        utils.refreshAccessToken();
      };
      /**
       * get Extension Presence  Info for the extension Ids passed to function.
       * @memberof AgentLibrary.Agent
       * @param {string} extensionIds The extension Ids of RC
       */


      AgentLibrary.prototype.getExtensionPresenceInfo = function (extensionIds, callback) {
        var model = UIModel.getInstance();
        model.extensionPresenceRequest = new ExtensionPresenceRequest(extensionIds);
        model.extensionPresenceRequest.getExtensionPresenceInfo(extensionIds);
        utils.setCallback(this, CALLBACK_TYPES.EXTENSION_PRESENCE, callback);
      };
    }

    function initAgentLibraryCall(context) {
      /**
       * @namespace Call
       * @memberof AgentLibrary
       */
      var AgentLibrary = context.AgentLibrary;
      /**
       * Barge in on a call, can hear all parties and be heard by all
       * @memberof AgentLibrary.Call
       * @param {number} agentId Agent Id of the current logged in agent
       * @param {string} uii UII of the active call you wish to monitor
       * @param {number} monitorAgentId UII Agent Id of the agent you wish to monitor
       * @param {function} [callback=null] Callback function when barge in response received
       */

      AgentLibrary.prototype.bargeIn = function (agentId, uii, monitorAgentId, callback) {
        UIModel.getInstance().bargeInRequest = new BargeInRequest('FULL', agentId, uii, monitorAgentId);
        var msg = UIModel.getInstance().bargeInRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.BARGE_IN, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Add a coaching session to the call, can hear all parties but only able to speak on agent channel
       * @memberof AgentLibrary.Call
       * @param {number} agentId Agent Id of the current logged in agent
       * @param {string} uii UII of the active call you wish to monitor
       * @param {number} monitorAgentId UII Agent Id of the agent you wish to monitor
       * @param {function} [callback=null] Callback function when coaching session response received
       */


      AgentLibrary.prototype.coach = function (agentId, uii, monitorAgentId, callback) {
        UIModel.getInstance().bargeInRequest = new BargeInRequest('COACHING', agentId, uii, monitorAgentId);
        var msg = UIModel.getInstance().bargeInRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.COACH_CALL, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer to another number and end the call for the original agent (cold transfer).
       * @memberof AgentLibrary.Call
       * @param {number} dialDest Number to transfer to
       * @param {number} [callerId=""] Caller Id for caller (DNIS)
       * @param {number} [sipHeaders=[]] Name/Value header pairs
       * @param {function} [callback=null] Callback function when cold transfer response received
       */


      AgentLibrary.prototype.coldXfer = function (dialDest, callerId, sipHeaders, callback) {
        UIModel.getInstance().coldXferRequest = new XferColdRequest(dialDest, callerId, sipHeaders);
        var msg = UIModel.getInstance().coldXferRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.XFER_COLD, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer to another number and end the call for the original agent (cold transfer).
       * @memberof AgentLibrary.Call
       * @param {number} dialDest Number to transfer to
       * @param {number} [callerId=""] Caller Id for caller (DNIS)
       * @param {number} [sipHeaders=[]] Name/Value header pairs
       * @param {number} [countryId=""] Country Id for the dialDest
       * @param {function} [callback=null] Callback function when warm transfer response received
       */


      AgentLibrary.prototype.internationalColdXfer = function (dialDest, callerId, sipHeaders, countryId, callback) {
        UIModel.getInstance().coldXferRequest = new XferColdRequest(dialDest, callerId, sipHeaders, countryId);
        var msg = UIModel.getInstance().coldXferRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.XFER_COLD, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Send a disposition for an inbound or outbound call
       * @memberof AgentLibrary.Call
       * @param {string} uii UII (unique id) for call
       * @param {string} dispId The disposition id
       * @param {string} notes Agent notes for call
       * @param {boolean} callback Boolean for whether or not this call is a callback
       * @param {string} [callbackDTS=""] date time stamp if callback
       * @param {string} [contactForwardNumber=null] Number for contact forwarding
       * @param {string} [survey=null] The survey response values for the call.
       * Format: survey = [ { label: "", externId: "", leadUpdateColumn: ""} ]
       * @param {string} [externId=null] The external id associated with the lead for this call (only for Outbound Dispositions).
       * @param {string} [leadId=null] The lead id associated with this call (only for Outbound Dispositions).
       * @param {string} [requestId=null] The request id associated with a preview fetched lead (only for Outbound Dispositions).
       */


      AgentLibrary.prototype.dispositionCall = function (uii, dispId, notes, callback, callbackDTS, contactForwardNumber, survey, externId, leadId, requestId) {
        var model = UIModel.getInstance();
        model.dispositionRequest = new DispositionRequest(uii, dispId, notes, callback, callbackDTS, contactForwardNumber, survey, externId, leadId, requestId);
        var msg = model.dispositionRequest.formatJSON();
        utils.sendMessage(this, msg); // cancel ping call timer

        if (model.pingIntervalId) {
          clearInterval(model.pingIntervalId);
          model.pingIntervalId = null;
        }
      };
      /**
       * Send a disposition for a manual pass on a lead
       * @memberof AgentLibrary.Call
       * @param {string} dispId The disposition id
       * @param {string} notes Agent notes for call
       * @param {boolean} callback Boolean for whether or not this call is a callback
       * @param {string} [callbackDTS=""] date time stamp if callback
       * @param {string} [leadId=null] The lead id
       * @param {string} [requestId=null] The request key for the lead
       * @param {string} [externId=null] The external id of the lead
       */


      AgentLibrary.prototype.dispositionManualPass = function (dispId, notes, callback, callbackDTS, leadId, requestId, externId) {
        UIModel.getInstance().dispositionManualPassRequest = new DispositionManualPassRequest(dispId, notes, callback, callbackDTS, leadId, requestId, externId);
        var msg = UIModel.getInstance().dispositionManualPassRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Get a list of all campaign dispositions for given campaign id
       * @memberof AgentLibrary.Call
       * @param {string} campaignId Id for campaign to get dispositions for
       * @param {function} [callback=null] Callback function when campaign dispositions response received
       */


      AgentLibrary.prototype.getCampaignDispositions = function (campaignId, callback) {
        UIModel.getInstance().campaignDispositionsRequest = new CampaignDispositionsRequest(campaignId);
        var msg = UIModel.getInstance().campaignDispositionsRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.CAMPAIGN_DISPOSITIONS, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Sends a hangup request message
       * @memberof AgentLibrary.Call
       * @param {string} [sessionId=""] Session to hangup, defaults to current call session id
       * @param {boolean} resetPendingDisp, reset pendingDisp to false, in case of bad reconnect
       */


      AgentLibrary.prototype.hangup = function (sessionId, resetPendingDisp) {
        UIModel.getInstance().hangupRequest = new HangupRequest(sessionId, resetPendingDisp);
        var msg = UIModel.getInstance().hangupRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Place a call on hold
       * @memberof AgentLibrary.Call
       * @param {boolean} holdState Whether we are putting call on hold or taking off hold - values true | false
       * @param {function} [callback=null] Callback function when hold response received
       */


      AgentLibrary.prototype.hold = function (holdState, callback) {
        UIModel.getInstance().holdRequest = new HoldRequest(holdState);
        var msg = UIModel.getInstance().holdRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.HOLD, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Place a specified session of a call on hold
       * @memberof AgentLibrary.Call
       * @param {boolean} holdState Whether we are putting call on hold or taking off hold - values true | false
       * @param {integer|string} sessionId session id of the call to place on hold
       * @param {function} [callback=null] Callback function when hold response received
       */


      AgentLibrary.prototype.holdSession = function (holdState, sessionId, callback) {
        UIModel.getInstance().holdRequest = new HoldRequest(holdState, sessionId);
        var msg = UIModel.getInstance().holdRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.HOLD, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Sends a manual outdial request message
       * @memberof AgentLibrary.Call
       * @param {string} destination Number to call - ANI
       * @param {number} callerId Number displayed to callee, DNIS
       * @param {number} [ringTime=60] Time in seconds to ring call
       * @param {string} [countryId='USA'] Country for the destination number
       * @param {number} [queueId=''] Queue id to tie manual call to
       */


      AgentLibrary.prototype.manualOutdial = function (destination, callerId, ringTime, countryId, queueId) {
        UIModel.getInstance().oneToOneOutdialRequest = new OneToOneOutdialRequest(destination, callerId, ringTime, countryId, queueId);
        var msg = UIModel.getInstance().oneToOneOutdialRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Cancels a manual outdial request by UII.
       * @memberof AgentLibrary.Call
       * @param {string} uii UII of manual call request, the UII is returned in the EARLY_UII notification.
       */


      AgentLibrary.prototype.manualOutdialCancel = function (uii) {
        UIModel.getInstance().oneToOneOutdialCancelRequest = new OneToOneOutdialCancelRequest(uii);
        var msg = UIModel.getInstance().oneToOneOutdialCancelRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Pause call recording
       * @memberof AgentLibrary.Call
       * @param {boolean} record Whether we are recording or not
       * @param {function} [callback=null] Callback function when pause record response received
       */


      AgentLibrary.prototype.pauseRecord = function (record, callback) {
        UIModel.getInstance().pauseRecordRequest = new PauseRecordRequest(record);
        var msg = UIModel.getInstance().pauseRecordRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.PAUSE_RECORD, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Sends a preview dial request to call lead based on request id and (optional) lead phone.
       * Call previewFetch method first to get request id.
       * @memberof AgentLibrary.Call
       * @param {number} requestId Pending request id sent back with lead, required to dial lead.
       * @param {number} [leadPhone=""] Lead phone number. Only needed if there are multiple numbers loaded for given lead.
       */


      AgentLibrary.prototype.previewDial = function (requestId, leadPhone) {
        UIModel.getInstance().previewDialRequest = new PreviewDialRequest('', [], requestId, leadPhone);
        var msg = UIModel.getInstance().previewDialRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Sends a message to fetch preview dialable leads
       * @memberof AgentLibrary.Call
       * @param {array} [searchFields=[]] Array of objects with key/value pairs for search parameters
       * e.g. [ {key: "name", value: "Geoff"} ]
       * @param {function} [callback=null] Callback function when preview fetch completed, returns matched leads
       */


      AgentLibrary.prototype.previewFetch = function (searchFields, callback) {
        UIModel.getInstance().previewDialRequest = new PreviewDialRequest('', searchFields, '');
        var msg = UIModel.getInstance().previewDialRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.PREVIEW_FETCH, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Pull back leads that match search criteria
       * @memberof AgentLibrary.Call
       * @param {array} [searchFields=[]] Array of objects with key/value pairs for search parameters
       * e.g. [ {key: "name", value: "Geoff"} ]
       * @param {function} [callback=null] Callback function when lead search completed, returns matched leads
       */


      AgentLibrary.prototype.searchLeads = function (searchFields, callback) {
        UIModel.getInstance().previewDialRequest = new PreviewDialRequest('search', searchFields, '');
        var msg = UIModel.getInstance().previewDialRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.LEAD_SEARCH, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Set agent notes for a call
       * @memberof AgentLibrary.Call
       * @param {string} notes Agent notes to add to call
       * @param {function} [callback=null] Callback function when call notes response received
       */


      AgentLibrary.prototype.setCallNotes = function (notes, callback) {
        UIModel.getInstance().callNotesRequest = new CallNotesRequest(notes);
        var msg = UIModel.getInstance().callNotesRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.CALL_NOTES, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Add a silent monitor session to a call, can hear all channels but can't be heard by any party
       * @memberof AgentLibrary.Call
       * @param {number} agentId Agent Id of the current logged in agent
       * @param {string} uii UII of the active call you wish to monitor
       * @param {number} monitorAgentId UII Agent Id of the agent you wish to monitor
       * @param {function} [callback=null] Callback function when silent monitor response received
       */


      AgentLibrary.prototype.monitor = function (agentId, uii, monitorAgentId, callback) {
        UIModel.getInstance().bargeInRequest = new BargeInRequest('MUTE', agentId, uii, monitorAgentId);
        var msg = UIModel.getInstance().bargeInRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.SILENT_MONITOR, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Toggle call recording based on passed in boolean true | false
       * @memberof AgentLibrary.Call
       * @param {boolean} record Whether we are recording or not
       * @param {function} [callback=null] Callback function when record response received
       */


      AgentLibrary.prototype.record = function (record, callback) {
        UIModel.getInstance().recordRequest = new RecordRequest(record);
        var msg = UIModel.getInstance().recordRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.RECORD, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Requeue a call
       * @memberof AgentLibrary.Call
       * @param {number} queueId Queue Id to send the call to
       * @param {number} skillId Skill Id for the requeued call
       * @param {boolean} maintain Whether or not to maintain the current agent
       * @param {function} [callback=null] Callback function when requeue response received
       */


      AgentLibrary.prototype.requeueCall = function (queueId, skillId, maintain, callback) {
        UIModel.getInstance().requeueRequest = new RequeueRequest(queueId, skillId, maintain);
        var msg = UIModel.getInstance().requeueRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.REQUEUE, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Sends a TCPA Safe call request to call lead based on request id and (optional) lead phone.
       * Call safeModeFetch method first to get request id.
       * @memberof AgentLibrary.Call
       * @param {number} requestId Pending request id sent back with lead, required to dial lead.
       * @param {number} [leadPhone=""] Lead phone number. Only needed if there are multiple numbers loaded for given lead.
       */


      AgentLibrary.prototype.safeModeCall = function (requestId, leadPhone) {
        UIModel.getInstance().tcpaSafeRequest = new TcpaSafeRequest('', [], requestId, leadPhone);
        var msg = UIModel.getInstance().tcpaSafeRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Sends a message to fetch safe mode dialable leads
       * @memberof AgentLibrary.Call
       * @param {array} [searchFields=[]] Array of objects with key/value pairs for search parameters
       * e.g. [ {key: "name", value: "Geoff"} ]
       * @param {function} [callback=null] Callback function when safe mode fetch completed, returns matched leads
       */


      AgentLibrary.prototype.safeModeFetch = function (searchFields, callback) {
        UIModel.getInstance().tcpaSafeRequest = new TcpaSafeRequest('', searchFields, '');
        var msg = UIModel.getInstance().tcpaSafeRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.SAFE_MODE_FETCH, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Pull back Safe Mode leads that match search criteria
       * @memberof AgentLibrary.Call
       * @param {array} [searchFields=[]] Array of objects with key/value pairs for search parameters
       * e.g. [ {key: "name", value: "Geoff"} ]
       * @param {function} [callback=null] Callback function when safe mode fetch completed, returns matched leads
       */


      AgentLibrary.prototype.safeSearchLeads = function (searchFields, callback) {
        UIModel.getInstance().tcpaSafeRequest = new TcpaSafeRequest('search', searchFields, '');
        var msg = UIModel.getInstance().tcpaSafeRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.SAFE_MODE_SEARCH, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer to another number while keeping the original agent on the line (warm transfer).
       * @memberof AgentLibrary.Call
       * @param {number} dialDest Number to transfer to
       * @param {number} [callerId=""] Caller Id for caller (DNIS)
       * @param {number} [sipHeaders=[]] Name/Value header pairs
       * @param {number} [countryId=""] Country Id for the dialDest
       * @param {function} [callback=null] Callback function when warm transfer response received
       */


      AgentLibrary.prototype.internationalWarmXfer = function (dialDest, callerId, sipHeaders, countryId, callback) {
        UIModel.getInstance().warmXferRequest = new XferWarmRequest(dialDest, callerId, sipHeaders, countryId);
        var msg = UIModel.getInstance().warmXferRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.XFER_WARM, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer to another number while keeping the original agent on the line (warm transfer).
       * @memberof AgentLibrary.Call
       * @param {number} dialDest Number to transfer to
       * @param {number} [callerId=""] Caller Id for caller (DNIS)
       * @param {number} [sipHeaders=[]] Name/Value header pairs
       * @param {function} [callback=null] Callback function when warm transfer response received
       */


      AgentLibrary.prototype.warmXfer = function (dialDest, callerId, sipHeaders, callback) {
        UIModel.getInstance().warmXferRequest = new XferWarmRequest(dialDest, callerId, sipHeaders);
        var msg = UIModel.getInstance().warmXferRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.XFER_WARM, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Cancel a warm transfer
       * @memberof AgentLibrary.Call
       * @param {number} dialDest Number that was transfered to
       */


      AgentLibrary.prototype.warmXferCancel = function (dialDest) {
        UIModel.getInstance().warmXferCancelRequest = new XferWarmCancelRequest(dialDest);
        var msg = UIModel.getInstance().warmXferCancelRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer to another number while keeping the original agent on the line (warm transfer).
       * @memberof AgentLibrary.Call
       * @param {number} dialDest Number to transfer to
       * @param {number} [callerId=""] Caller Id for caller (DNIS)
       * @param {number} [sipHeaders=[]] Name/Value header pairs
       * @param {number} [countryId=""] Country Id for the dialDest
       * @param {function} [callback=null] Callback function when warm transfer response received
       */


      AgentLibrary.prototype.corporateDirWarmXfer = function (dialDest, callerId, sipHeaders, countryId, callback) {
        UIModel.getInstance().warmXferRequest = new XferWarmRequest(dialDest, callerId, sipHeaders, countryId);
        var msg = UIModel.getInstance().warmXferRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.XFER_WARM, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer to another number and end the call for the original agent (cold transfer).
       * @memberof AgentLibrary.Call
       * @param {number} dialDest Number to transfer to
       * @param {number} [callerId=""] Caller Id for caller (DNIS)
       * @param {number} [sipHeaders=[]] Name/Value header pairs
       * @param {number} [countryId=""] Country Id for the dialDest
       * @param {function} [callback=null] Callback function when cold transfer response received
       */


      AgentLibrary.prototype.corporateDirColdXfer = function (dialDest, callerId, sipHeaders, countryId, callback) {
        UIModel.getInstance().coldXferRequest = new XferColdRequest(dialDest, callerId, sipHeaders, countryId);
        var msg = UIModel.getInstance().coldXferRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.XFER_COLD, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Requests a script object based on given id
       * @memberof AgentLibrary.Call
       * @param {number} scriptId Id of script
       * @param {number} version The version number of the script, if the current loaded script version matches,
       *                 just return current script. Otherwise, fetch new version of script.
       * @param {function} [callback=null] Callback function when warm transfer response received
       */


      AgentLibrary.prototype.getScript = function (scriptId, version, callback) {
        var model = UIModel.getInstance();
        var script = model.scriptSettings.loadedScripts[scriptId];
        utils.setCallback(this, CALLBACK_TYPES.SCRIPT_CONFIG, callback);

        if (script && script.version === version) {
          // return from memory
          var savedScript = UIModel.getInstance().scriptSettings.loadedScripts[scriptId];
          callback(savedScript);
        } else {
          // load script
          model.scriptConfigRequest = new ScriptConfigRequest(scriptId);
          var msg = UIModel.getInstance().scriptConfigRequest.formatJSON();
          utils.sendMessage(this, msg);
        }
      };
      /**
       * Saves the results from a script
       * @memberof AgentLibrary.Call
       * @param {string} uii The UII of the call the script results belong to
       * @param {number} scriptId Id of script
       * @param {object} jsonResult JSON object of script results, name/value pairs
       */


      AgentLibrary.prototype.saveScriptResult = function (uii, scriptId, jsonResult) {
        UIModel.getInstance().scriptResultRequest = new ScriptResultRequest(uii, scriptId, jsonResult);
        var msg = UIModel.getInstance().scriptResultRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Get available list of agents available for Direct Transfer
       * @memberof AgentLibrary.Call
       */


      AgentLibrary.prototype.directAgentXferList = function (callback) {
        UIModel.getInstance().directAgentTransferListRequest = new DirectAgentTransferList();
        var msg = UIModel.getInstance().directAgentTransferListRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.DIRECT_AGENT_TRANSFER_LIST, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer directly to an available agent from the directAgentXferList result and stay on the call
       * @memberof AgentLibrary.Call
       * @param {number} targetAgentId Agent id to transfer the call to
       */


      AgentLibrary.prototype.warmDirectAgentXfer = function (targetAgentId) {
        UIModel.getInstance().directAgentTransferRequest = new DirectAgentTransfer(targetAgentId, 'WARM');
        var msg = UIModel.getInstance().directAgentTransferRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Transfer directly to an available agent from the directAgentXferList result
       * and terminate the current agents call session
       * @memberof AgentLibrary.Call
       * @param {number} targetAgentId Agent id to transfer the call to
       */


      AgentLibrary.prototype.coldDirectAgentXfer = function (targetAgentId) {
        UIModel.getInstance().directAgentTransferRequest = new DirectAgentTransfer(targetAgentId, 'COLD');
        var msg = UIModel.getInstance().directAgentTransferRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Cancel the request to transfer directly to an agent
       * @memberof AgentLibrary.Call
       * @param {number} targetAgentId Agent id to transfer the call to
       */


      AgentLibrary.prototype.cancelDirectAgentXfer = function (targetAgentId) {
        UIModel.getInstance().directAgentTransferRequest = new DirectAgentTransfer(targetAgentId, 'CANCEL');
        var msg = UIModel.getInstance().directAgentTransferRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Send the direct agent transfer straight to voicemail, avoid any attempts to connect to the target agent
       * @memberof AgentLibrary.Call
       * @param {number} targetAgentId Agent id to receive the voicemail
       */


      AgentLibrary.prototype.voicemailDirectAgentXfer = function (targetAgentId) {
        UIModel.getInstance().directAgentTransferRequest = new DirectAgentTransfer(targetAgentId, 'VOICEMAIL');
        var msg = UIModel.getInstance().directAgentTransferRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Reject a presented direct agent transfer, if WARM requesting agent will be notified to try again,
       * if COLD a voicemail will be left for the target agent
       * @memberof AgentLibrary.Call
       * @param {number} targetAgentId Agent id to receive the voicemail
       */


      AgentLibrary.prototype.rejectDirectAgentXfer = function (uii) {
        UIModel.getInstance().directAgentTransferRequest = new DirectAgentTransfer('0', 'REJECT', uii);
        var msg = UIModel.getInstance().directAgentTransferRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
    }

    function initAgentLibraryLead(context) {
      /**
       * @namespace Lead
       * @memberof AgentLibrary
       */
      var AgentLibrary = context.AgentLibrary;
      /**
       * Get the history for a given lead
       * @memberof AgentLibrary.Lead
       * @param {number} leadId The lead id to retrieve history for
       * @param {function} [callback=null] Callback function when lead history response received
       */

      AgentLibrary.prototype.leadHistory = function (leadId, callback) {
        UIModel.getInstance().leadHistoryRequest = new LeadHistoryRequest(leadId);
        var msg = UIModel.getInstance().leadHistoryRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.LEAD_HISTORY, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Insert a lead to the given campaign
       * @memberof AgentLibrary.Lead
       * @param {object} dataObj agentId, campaignId, and lead info
       * @param {function} [callback=null] Callback function when lead history response received
       */


      AgentLibrary.prototype.leadInsert = function (dataObj, callback) {
        UIModel.getInstance().leadInsertRequest = new LeadInsertRequest(dataObj);
        var msg = UIModel.getInstance().leadInsertRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.LEAD_INSERT, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Update lead information
       * @memberof AgentLibrary.Lead
       * @param {string} leadId Id for lead to update
       * @param {string} leadPhone Lead phone number
       * @param {object} baggage Object containing lead information
       * @param {function} [callback=null] Callback function when lead history response received
       */


      AgentLibrary.prototype.leadUpdate = function (leadId, leadPhone, baggage, callback) {
        UIModel.getInstance().leadUpdateRequest = new LeadUpdateRequest(leadId, leadPhone, baggage);
        var msg = UIModel.getInstance().leadUpdateRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.LEAD_UPDATE, callback);
        utils.sendMessage(this, msg);
      };
    }

    function initAgentLibraryChat(context) {
      /**
       * @namespace Chat
       * @memberof AgentLibrary
       */
      var AgentLibrary = context.AgentLibrary;
      /**
       * Set the agent chat alias
       * @memberof AgentLibrary.Chat
       * @param {string} alias The alias string to be used for agent chat messages
       */

      AgentLibrary.prototype.setChatAlias = function (alias) {
        UIModel.getInstance().chatAliasRequest = new ChatAliasRequest(alias);
        var msg = UIModel.getInstance().chatAliasRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Request to enter/exit a public chat room
       * @memberof AgentLibrary.Chat
       * @param {string} action "ENTER" | "EXIT"
       * @param {integer} roomId Chat room id
       */


      AgentLibrary.prototype.publicChatRoom = function (action, roomId) {
        UIModel.getInstance().chatRoomRequest = new ChatRoomRequest(action, 'PUBLIC', roomId);
        var msg = UIModel.getInstance().chatRoomRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Request to enter/exit a private chat room
       * @memberof AgentLibrary.Chat
       * @param {string} action "ENTER" | "EXIT"
       * @param {integer} roomId Chat room id
       * @param {integer} agentOne Id for the logged in agent
       * @param {integer} agentTwo Id for the agent or supervisor the logged in agent is chatting with
       */


      AgentLibrary.prototype.privateChatRoom = function (action, roomId, agentOne, agentTwo) {
        UIModel.getInstance().chatRoomRequest = new ChatRoomRequest(action, 'PRIVATE', roomId, agentOne, agentTwo);
        var msg = UIModel.getInstance().chatRoomRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Send a chat message to the given room
       * @memberof AgentLibrary.Chat
       * @param {integer} roomId Id for chat room
       * @param {string} message The message to be sent
       * @param {function} [callback=null] Callback function when chat message received
       */


      AgentLibrary.prototype.sendChat = function (roomId, message, callback) {
        UIModel.getInstance().chatSendRequest = new ChatSendRequest(roomId, message);
        var msg = UIModel.getInstance().chatSendRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.CHAT, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Get list of supervisors for logged in agent
       * @memberof AgentLibrary.Chat
       * @param {function} [callback=null] Callback function when chat message received
       */


      AgentLibrary.prototype.getSupervisors = function (callback) {
        UIModel.getInstance().supervisorListRequest = new SupervisorListRequest();
        var msg = UIModel.getInstance().supervisorListRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.SUPERVISOR_LIST, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * Send accept/decline response when a chat is presented to an agent
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {string} response ACCEPT|REJECT response
       * @param {string} responseReason Agent reason for Reject
       */


      AgentLibrary.prototype.chatPresentedResponse = function (uii, messageId, response, responseReason) {
        UIModel.getInstance().chatPresentedRequest = new ChatPresentedResponseRequest(uii, messageId, response, responseReason);
        var msg = UIModel.getInstance().chatPresentedRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Send an external chat message
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {string} agentId The agent associated with the chat
       * @param {string} message The message sent by the agent
       */


      AgentLibrary.prototype.chatMessage = function (uii, agentId, message) {
        UIModel.getInstance().chatMessageRequest = new ChatMessageRequest(uii, agentId, message, false);
        var msg = UIModel.getInstance().chatMessageRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Send an whisper type chat message
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {string} agentId The agent associated with the chat
       * @param {string} message The message sent by the agent
       */


      AgentLibrary.prototype.chatWhisper = function (uii, agentId, message) {
        UIModel.getInstance().chatMessageRequest = new ChatMessageRequest(uii, agentId, message, true);
        var msg = UIModel.getInstance().chatMessageRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Send a disposition to end a chat session
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {number} agentId The agent's id
       * @param {number} dispositionId Id of the selected disposition
       * @param {string} [notes=""] Agent notes
       * @param {boolean} sendAcknowlegement Whether or not to fire callback
       * @param {object} [script=null] Script data associated with the chat session
       */


      AgentLibrary.prototype.chatDisposition = function (uii, agentId, dispositionId, notes, sendAcknowlegement, script, sessionId) {
        UIModel.getInstance().chatDispositionRequest = new ChatDispositionRequest(uii, agentId, dispositionId, notes, sendAcknowlegement, script, sessionId);
        var msg = UIModel.getInstance().chatDispositionRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Send the chat to a different Chat Queue
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {number} agentId The agent's id
       * @param {number} chatQueueId Id of the Chat Queue to requeue to
       * @param {number} skillId Skill id associated with the Chat Queue
       * @param {boolean} [maintainAgent=fakse] Whether or not to keep the current agent connected to the chat on requeue
       */


      AgentLibrary.prototype.chatRequeue = function (uii, agentId, chatQueueId, skillId, maintainAgent) {
        UIModel.getInstance().chatRequeueRequest = new ChatRequeueRequest(uii, agentId, chatQueueId, skillId, maintainAgent);
        var msg = UIModel.getInstance().chatRequeueRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Sent when agent starts/stops typing
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {string} message Pending Agent message - sent to any monitoring Supervisors
       */


      AgentLibrary.prototype.chatTyping = function (uii, message) {
        UIModel.getInstance().chatTypingRequest = new ChatTypingRequest(uii, message);
        var msg = UIModel.getInstance().chatTypingRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Request to add a session on an existing chat
       * @memberof AgentLibrary.Chat
       * @param {string} monitorAgentId Agent id handling this chat, the agent being monitored
       */


      AgentLibrary.prototype.monitorAgentChats = function (monitorAgentId) {
        UIModel.getInstance().monitorChatRequest = new MonitorChatRequest(monitorAgentId);
        var msg = UIModel.getInstance().monitorChatRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Request to stop a chat monitoring session for a specific agent
       * @memberof AgentLibrary.Chat
       * @param {string} monitorAgentId Agent id of agent being monitored
       */


      AgentLibrary.prototype.stopMonitoringChatsByAgent = function (monitorAgentId) {
        UIModel.getInstance().stopMonitorChatRequest = new StopMonitorChatRequest(monitorAgentId);
        var msg = UIModel.getInstance().stopMonitorChatRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Request to drop all chat monitoring sessions for the logged in agent
       * @memberof AgentLibrary.Chat
       */


      AgentLibrary.prototype.stopMonitoringAllAgentChats = function () {
        UIModel.getInstance().stopMonitorChatRequest = new StopMonitorChatRequest();
        var msg = UIModel.getInstance().stopMonitorChatRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Request to terminate an active chat session
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {string} agentId Current logged in agent id
       * @param {string} sessionId Chat session id
       */


      AgentLibrary.prototype.leaveChat = function (uii, agentId, sessionId) {
        UIModel.getInstance().leaveChatRequest = new LeaveChatRequest(uii, agentId, sessionId);
        var msg = UIModel.getInstance().leaveChatRequest.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Request a list of active chats by agent id
       * @memberof AgentLibrary.Chat
       * @param {string} agentId Current logged in agent id
       * @param {string} monitorAgentId Agent id handling chats
       * @param {function} [callback=null] Callback function when chat-list request received
       */


      AgentLibrary.prototype.chatList = function (agentId, monitorAgentId, callback) {
        UIModel.getInstance().chatListRequest = new ChatListRequest(agentId, monitorAgentId);
        var msg = UIModel.getInstance().chatListRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.CHAT_LIST, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * set chat in state of agent-chat-end
       * @memberof AgentLibrary.Chat
       * @param {string} uii Unique identifier for the chat session
       * @param {string} agentId Current logged in agent id
       */


      AgentLibrary.prototype.chatAgentEnd = function (agentId, uii) {
        UIModel.getInstance().chatAgentEnd = new ChatAgentEndRequest(agentId, uii);
        var msg = UIModel.getInstance().chatAgentEnd.formatJSON();
        utils.sendMessage(this, msg);
      };
      /**
       * Sends chat state change message to IntelliQueue
       * @memberof AgentLibrary.Agent
       * @param {string} chatState The base chat state <br />
       * CHAT-AVAILABLE | CHAT-PRESENTED | CHAT-ENGAGED | CHAT-RNA
       * @param {function} [callback=null] Callback function when chatState response received
       */


      AgentLibrary.prototype.setChatState = function (chatState, callback) {
        UIModel.getInstance().chatStateRequest = new ChatStateRequest(chatState);
        var msg = UIModel.getInstance().chatStateRequest.formatJSON();
        utils.setCallback(this, CALLBACK_TYPES.CHAT_STATE, callback);
        utils.sendMessage(this, msg);
      };
      /**
       * initialize a chat session by sending a manual outbound sms
       * @memberof AgentLibrary.Chat
       * @param {string} agentId Current logged in agent id
       * @param {number} chatQueueId Id of the Chat Queue to send this sms through
       * @param {number} ani to receive the sms
       * @param {number} dnis to be used for the sms
       * @param {string} message content
       */


      AgentLibrary.prototype.sendManualOutboundSms = function (agentId, chatQueueId, ani, dnis, message) {
        UIModel.getInstance().chatManualSms = new ChatManualSmsRequest(agentId, chatQueueId, ani, dnis, message);
        var msg = UIModel.getInstance().chatManualSms.formatJSON();
        utils.sendMessage(this, msg);
      };
    }

    function initAgentLibraryLogger(context) {
      var AgentLibrary = context.AgentLibrary;

      AgentLibrary.prototype.openLogger = function () {
        var instance = this;

        if ('indexedDB' in context) {
          // Open database
          var dbRequest = indexedDB.open('AgentLibraryLogging', 6); // version number

          dbRequest.onerror = function (event) {
            console.error('Error requesting DB access');
          };

          dbRequest.onsuccess = function (event) {
            instance._db = event.target.result; // prune items older than 2 days

            instance.purgeLog(instance._db, 'logger');

            instance._db.onerror = function (event) {
              // Generic error handler for all errors targeted at this database requests
              console.error("AgentLibrary: Database error - ".concat(event.target.errorCode));
            };

            instance._db.onsuccess = function (event) {
              console.log('AgentLibrary: Successful logging of record');
            };
          }; // This event is only implemented in recent browsers


          dbRequest.onupgradeneeded = function (event) {
            instance._db = event.target.result; // Create an objectStore to hold log information. Key path should be unique

            if (!instance._db.objectStoreNames.contains('logger')) {
              var objectStore = instance._db.createObjectStore('logger', {
                autoIncrement: true
              }); // simple indicies: index name, index column path


              objectStore.createIndex('logLevel', 'logLevel', {
                unique: false
              });
              objectStore.createIndex('dts', 'dts', {
                unique: false
              }); // index for logLevel and date range

              var name = 'levelAndDate';
              var keyPath = ['logLevel', 'dts'];
              objectStore.createIndex(name, keyPath, {
                unique: false
              });
            }
          };
        } else {
          console.warn('AgentLibrary: indexedDB NOT supported by your Browser.');
        }
      };
      /**
       * Purge records older than 2 days from the AgentLibrary log
       * @memberof AgentLibrary
       */


      AgentLibrary.prototype.purgeLog = function (db, store) {
        var instance = this;

        if (db) {
          try {
            var transaction = db.transaction([store], 'readwrite');
            var objectStore = transaction.objectStore(store);
            var dateIndex = objectStore.index('dts');
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 2); // two days ago

            var range = IDBKeyRange.upperBound(endDate);

            dateIndex.openCursor(range).onsuccess = function (event) {
              var cursor = event.target.result;

              if (cursor) {
                objectStore["delete"](cursor.primaryKey);
                cursor["continue"]();
              }
            };
          } catch (err) {// no op
          }
        }
      };
      /**
       * Clear the AgentLibrary log by emptying the IndexedDB object store
       * @memberof AgentLibrary
       */


      AgentLibrary.prototype.clearLog = function (db) {
        var transaction = db.transaction(['logger'], 'readwrite');
        var objectStore = transaction.objectStore('logger');
        var objectStoreRequest = objectStore.clear();

        objectStoreRequest.onsuccess = function (event) {
          console.log('AgentLibrary: logger database cleared');
        };
      };

      AgentLibrary.prototype.deleteDB = function (dbName) {
        dbName = dbName || 'AgentLibraryLogging';
        var DBDeleteRequest = indexedDB.deleteDatabase(dbName);

        DBDeleteRequest.onerror = function (event) {
          console.log('Error deleting database.', dbName);
        };

        DBDeleteRequest.onsuccess = function (event) {
          console.log('Database', dbName, 'deleted successfully');
        };
      };

      AgentLibrary.prototype.getLogRecords = function (logLevel, startDate, endDate, maxRows, callback) {
        logLevel = logLevel || '';
        var instance = this;

        var transaction = instance._db.transaction(['logger'], 'readonly');

        var objStore = transaction.objectStore('logger');
        var index = null;
        var cursor = null;
        var range = null;
        var limit = maxRows || 100;
        utils.setCallback(instance, CALLBACK_TYPES.LOG_RESULTS, callback);

        if (logLevel !== '' && logLevel.toUpperCase() !== 'ALL' && logLevel.toUpperCase() !== 'NO-STATS') {
          // looking for specific log level type
          if (startDate && endDate) {
            var lowerBound = [logLevel.toLowerCase(), startDate];
            var upperBound = [logLevel.toLowerCase(), endDate];
            range = IDBKeyRange.bound(lowerBound, upperBound);
          } else if (startDate) {
            range = IDBKeyRange.lowerBound([logLevel.toLowerCase(), startDate]);
          } else if (endDate) {
            range = IDBKeyRange.upperBound([logLevel.toLowerCase(), endDate]);
          }

          if (range !== null) {
            // with the provided date range
            var levelAndDateReturn = [];
            var idxLevelAndDate = 0;
            index = objStore.index('levelAndDate');

            index.openCursor(range, 'prev').onsuccess = function (event) {
              cursor = event.target.result;

              if (cursor && idxLevelAndDate < limit) {
                levelAndDateReturn.push(cursor.value);
                idxLevelAndDate += 1;
                cursor["continue"]();
              } else {
                utils.fireCallback(instance, CALLBACK_TYPES.LOG_RESULTS, levelAndDateReturn);
              }
            };
          } else {
            // no date range specified, return all within log level
            var logLevelReturn = [];
            var idxLogLevel = 0;
            index = objStore.index('logLevel');

            index.openCursor(logLevel, 'prev').onsuccess = function (event) {
              cursor = event.target.result;

              if (cursor && idxLogLevel < limit) {
                logLevelReturn.push(cursor.value);
                idxLogLevel += 1;
                cursor["continue"]();
              } else {
                utils.fireCallback(instance, CALLBACK_TYPES.LOG_RESULTS, logLevelReturn);
              }
            };
          }
        } else if (logLevel.toUpperCase() === 'NO-STATS') {
          // give us all types except stats
          if (startDate && endDate) {
            range = IDBKeyRange.bound(startDate, endDate);
          } else if (startDate) {
            range = IDBKeyRange.lowerBound(startDate);
          } else if (endDate) {
            range = IDBKeyRange.upperBound(endDate);
          }

          if (range !== null) {
            // with the provided date range
            var dtsNoStatsReturn = [];
            var idxDTSNoStats = 0;
            index = objStore.index('dts');

            index.openCursor(range, 'prev').onsuccess = function (event) {
              cursor = event.target.result;

              if (cursor && idxDTSNoStats < limit) {
                if (cursor.value.logLevel !== 'stats') {
                  dtsNoStatsReturn.push(cursor.value);
                  idxDTSNoStats += 1;
                }

                cursor["continue"]();
              } else {
                utils.fireCallback(instance, CALLBACK_TYPES.LOG_RESULTS, dtsNoStatsReturn);
              }
            };
          } else {
            // no date range specified, return all records
            var noStatsReturn = [];
            var idxNoStats = 0;

            objStore.openCursor().onsuccess = function (event) {
              cursor = event.target.result;

              if (cursor && idxNoStats < limit) {
                if (cursor.value.logLevel !== 'stats') {
                  noStatsReturn.push(cursor.value);
                  idxNoStats += 1;
                }

                cursor["continue"]();
              } else {
                utils.fireCallback(instance, CALLBACK_TYPES.LOG_RESULTS, noStatsReturn);
              }
            };
          }
        } else {
          // give us all log level types
          if (startDate && endDate) {
            range = IDBKeyRange.bound(startDate, endDate);
          } else if (startDate) {
            range = IDBKeyRange.lowerBound(startDate);
          } else if (endDate) {
            range = IDBKeyRange.upperBound(endDate);
          }

          if (range !== null) {
            // with the provided date range
            var dtsReturn = [];
            var idxDTS = 0;
            index = objStore.index('dts');

            index.openCursor(range, 'prev').onsuccess = function (event) {
              cursor = event.target.result;

              if (cursor && idxDTS < limit) {
                dtsReturn.push(cursor.value);
                idxDTS += 1;
                cursor["continue"]();
              } else {
                utils.fireCallback(instance, CALLBACK_TYPES.LOG_RESULTS, dtsReturn);
              }
            };
          } else {
            // no date range specified, return all records
            var allValsReturn = [];
            var idxAll = 0;

            objStore.openCursor().onsuccess = function (event) {
              cursor = event.target.result;

              if (cursor && idxAll < limit) {
                allValsReturn.push(cursor.value);
                idxAll += 1;
                cursor["continue"]();
              } else {
                utils.fireCallback(instance, CALLBACK_TYPES.LOG_RESULTS, allValsReturn);
              }
            };
          }
        }

        return null;
      };
    }

    function initAgentLibraryMultisocket(context) {
      /**
       * @namespace Multisocket
       * @memberof AgentLibrary
       */
      var AgentLibrary = context.AgentLibrary;
      /**
       * Method to request call details from other tabs using the broadcast channel, for multisocket
       */

      AgentLibrary.prototype.loadCurrentCall = function (callback) {
        broadcastChannelHelper.requestCurrentCall(callback);
      };
    }

    function initAgentLibraryConsoleLogger(context) {
      var AgentLibrary = context.AgentLibrary;

      AgentLibrary.prototype.openConsoleLogger = function () {
        var instance = this;

        if ('indexedDB' in context) {
          var dbRequest = indexedDB.open('AgentLibraryConsoleLogging', 1);

          dbRequest.onerror = function (event) {
            console.error('Error requesting DB access');
          };

          dbRequest.onsuccess = function (event) {
            instance._consoleDb = event.target.result; // prune items older than 2 days

            instance.purgeLog(instance._consoleDb, 'consoleLogger');

            instance._consoleDb.onerror = function (event) {
              // Generic error handler for all errors targeted at this database requests
              console.error("AgentLibrary: Database error - ".concat(event.target.errorCode));
            };

            instance._consoleDb.onsuccess = function (event) {
              console.log('AgentLibrary: Successful logging of record');
            };

            _overrideConsole();
          }; // This event is only implemented in recent browsers


          dbRequest.onupgradeneeded = function (event) {
            instance._consoleDb = event.target.result; // Create an objectStore to hold log information. Key path should be unique

            if (!instance._consoleDb.objectStoreNames.contains('consoleLogger')) {
              var objectStore = instance._consoleDb.createObjectStore('consoleLogger', {
                autoIncrement: true
              }); // simple indicies: index name, index column path


              objectStore.createIndex('type', 'type', {
                unique: false
              });
              objectStore.createIndex('dts', 'dts', {
                unique: false
              });
              objectStore.createIndex('agentId', 'agentId', {
                unique: false
              }); // index for type and agent id

              var name = 'typeAndAgent';
              var keyPath = ['type', 'agentId'];
              objectStore.createIndex(name, keyPath, {
                unique: false
              });
            }

            _overrideConsole();
          };
        } else {
          console.warn('AgentLibrary: indexedDB NOT supported by your Browser.');
        }
      };

      AgentLibrary.prototype.getConsoleLogRecords = function (type, callback) {
        var agentId = UIModel.getInstance().agentSettings.agentId; // only return records for this agent id

        var instance = this;

        var transaction = instance._consoleDb.transaction(['consoleLogger'], 'readonly');

        var objStore = transaction.objectStore('consoleLogger');
        var index = null;
        var cursor = null;
        var range = null;
        var limit = 5000;
        utils.setCallback(instance, CALLBACK_TYPES.LOG_CONSOLE_RESULTS, callback);
        var result = [];

        if (type) {
          // everything with this type
          index = objStore.index('typeAndAgent');
          range = IDBKeyRange.only([type.toUpperCase(), agentId]);
        } else {
          index = objStore.index('agentId');
          range = IDBKeyRange.only(agentId);
        }

        var count = 0;

        index.openCursor(range, 'prev').onsuccess = function (event) {
          cursor = event.target.result;

          if (cursor && count < limit) {
            result.push(cursor.value);
            count++;
            cursor["continue"]();
          } else {
            utils.fireCallback(instance, CALLBACK_TYPES.LOG_CONSOLE_RESULTS, result);
          }
        };
      };

      function _overrideConsole() {
        // override the window.console functions, process as normal then save to the local db
        var browserConsole = _objectSpread({}, window.console);

        (function (defaultConsole) {
          var instance;

          if (UIModel && UIModel.getInstance() && UIModel.getInstance().libraryInstance) {
            instance = UIModel.getInstance().libraryInstance;
          } else {
            // fallback
            instance = new AgentLibrary();
          }

          var agentSettings = UIModel.getInstance().agentSettings;

          function _getRecord(type, text) {
            if (typeof text === 'function') {
              text = text.toString();
            } else if (_typeof(text) === 'object') {
              try {
                text = JSON.stringify(text);
              } catch (e) {}
            }

            return {
              type: type,
              message: text,
              dts: new Date(),
              agentId: agentSettings.agentId,
              agentName: "".concat(agentSettings.firstName, " ").concat(agentSettings.lastName)
            };
          }

          function _saveRecord(type, text) {
            if (instance._consoleDb) {
              var transaction = instance._consoleDb.transaction(['consoleLogger'], 'readwrite');

              var store = transaction.objectStore('consoleLogger');
              store.add(_getRecord(type, text));
            }
          }

          window.console.log = function (text) {
            defaultConsole.log(text);

            _saveRecord('LOG', text);
          };

          window.console.info = function (text) {
            defaultConsole.info(text);

            _saveRecord('INFO', text);
          };

          window.console.warn = function (text) {
            defaultConsole.warn(text);

            _saveRecord('WARN', text);
          };

          window.console.error = function (text) {
            defaultConsole.error(text);

            _saveRecord('ERROR', text);
          };
        })(browserConsole);
      }
    }

    function initAgentLibrarySoftphoneService(context) {
      /**
       * @namespace Softphone
       * @memberof AgentLibrary
       */
      var AgentLibrary = context.AgentLibrary; // ////////////////////
      // PUBLIC FUNCTIONS //
      // ////////////////////

      /* These functions are available externally to agent-js or other parent apps */

      /**
       * Initializes the SIP library, sets up callback functions
       * @memberof AgentLibrary.Softphone
       */

      AgentLibrary.prototype.sipInit = function () {
        var model = UIModel.getInstance();
        var softphoneSettings = model.softphoneSettings; // if webRtc settings not yet set, do so now

        if (softphoneSettings.uri === '' || softphoneSettings.wsServers.length === 0 || softphoneSettings.displayName === '' || softphoneSettings.authorizationUser === '') {
          SoftphoneService.setupWebRtcServer();
        }

        if (softphoneSettings.wsServers.length > 0) {
          var webRtc = new CFSimpleSip(_getSipConfig()); // callbacks

          webRtc.on('connected', _connected);
          webRtc.on('ended', _ended);
          webRtc.on('registered', _registered);
          webRtc.on('unregistered', _unregistered);
          webRtc.on('registrationFailed', _registrationFailed);
          webRtc.on('ringing', _ringing);
          webRtc.on('mute', _mute);
          webRtc.on('unmute', _unmute); // after 15 sec of no registration response, rotate the registrar

          softphoneSettings.registerPending = setTimeout(_handleNoRegisterResponse, 15 * 1000);
          softphoneSettings.webRtc = webRtc; // set back on the UIModel instance
        } else {
          console.error('Unable to setup WebRtc server');
        }
      };
      /**
       * Sends a session.accept response to a SIP invite event.
       * @memberof AgentLibrary.Softphone
       */


      AgentLibrary.prototype.sipAnswer = function () {
        var webRtc = UIModel.getInstance().softphoneSettings.webRtc;

        if (webRtc) {
          webRtc.answer();
        }
      };
      /**
       * Sends a session.reject response to a SIP invite event.
       * @memberof AgentLibrary.Softphone
       */


      AgentLibrary.prototype.sipReject = function () {
        var webRtc = UIModel.getInstance().softphoneSettings.webRtc;

        if (webRtc && webRtc.reject) {
          webRtc.reject();
        }
      };
      /**
       * Request microphone access, if already registered, call hangup
       * @memberof AgentLibrary.Softphone
       */


      AgentLibrary.prototype.sipRegister = function () {
        var model = UIModel.getInstance();
        var webRtc = model.softphoneSettings.webRtc;

        try {
          // enable microphone access notification if not already done
          if (window.webkitNotifications && window.webkitNotifications.checkPermission() !== 0) {
            window.webkitNotifications.requestPermission();
          }

          if (!webRtc) {
            return;
          } // if already registered, hangup


          if (model.softphoneSettings.isRegistered) {
            model.libraryInstance.sipHangUp();
          }
        } catch (e) {
          console.error("sip reg error:".concat(e));
        }
      };
      /**
       * Sends session.cancel if connected, or session.bye if not connected to a call
       * @memberof AgentLibrary.Softphone
       */


      AgentLibrary.prototype.sipHangUp = function () {
        var webRtc = UIModel.getInstance().softphoneSettings.webRtc;

        if (webRtc && webRtc.hangup) {
          webRtc.hangup();
        }
      };
      /**
       * Sends session.dtmf for the tone specified
       * @memberof AgentLibrary.Softphone
       * @param {string} dtmf The dtmf tone to send
       */


      AgentLibrary.prototype.sipSendDTMF = function (dtmf) {
        var webRtc = UIModel.getInstance().softphoneSettings.webRtc;

        if (webRtc) {
          webRtc.sendDTMF(dtmf);
        }
      };
      /**
       * Toggles call audio on/off
       * @memberof AgentLibrary.Softphone
       * @param {boolean} state The dtmf tone to send
       */


      AgentLibrary.prototype.sipToggleMute = function (state) {
        var softphoneSettings = UIModel.getInstance().softphoneSettings;
        var webRtc = softphoneSettings.webRtc;
        var muteActive = softphoneSettings.muteActive;

        if (webRtc) {
          if (muteActive || state === false) {
            webRtc.unmute();
            utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_UNMUTE, {
              message: 'Call unmuted'
            });
          } else {
            webRtc.mute();
            utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_MUTE, {
              message: 'Call muted'
            });
          }
        }
      };

      AgentLibrary.prototype.switchSoftphoneRegistrar = function (maintainOffhook, autoStartOffhook) {
        var model = UIModel.getInstance();

        if (typeof autoStartOffhook === 'undefined') {
          autoStartOffhook = true;
        }

        if (model.softphoneSettings.attemptingSoftphoneReconnect && autoStartOffhook) {
          _updateOHFlags(maintainOffhook, autoStartOffhook);

          utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_SWITCH_REGISTRAR, {
            message: 'Updating offhook flags, set status message',
            status: 'UPDATE'
          });
        } else {
          model.libraryInstance.resetSoftphoneSession({
            maintainOH: maintainOffhook,
            autoStartOH: autoStartOffhook
          });
          utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_SWITCH_REGISTRAR, {
            message: 'Triggering softphone registrar swap',
            status: 'RESET'
          });
        }
      };

      AgentLibrary.prototype.resetSoftphoneSession = function (offhookParams) {
        var model = UIModel.getInstance();
        var softphoneSettings = model.softphoneSettings;

        if (softphoneSettings.isRegistered && !softphoneSettings.attemptingSoftphoneReconnect) {
          _reset(); // clear current SIP.js object


          _rotateWebRtcServer();

          SoftphoneService.setupWebRtcServer();

          if (offhookParams) {
            if (offhookParams.maintainOH === 'null') {
              offhookParams.maintainOH = softphoneSettings.maintainOH; // default to model setting
            }

            _updateOHFlags(offhookParams.maintainOH, offhookParams.autoStartOH);
          }

          model.libraryInstance.sipInit();
          model.libraryInstance.sipRegister();
        }
      }; // //////////////////////
      // INTERNAL FUNCTIONS //
      // //////////////////////

      /* These functions are globally available to the AgentSDK app */


      var SoftphoneService = {
        setupWebRtcServer: function setupWebRtcServer() {
          var model = UIModel.getInstance();
          var softphoneSettings = model.softphoneSettings; // webRtcServerInfo format for Legacy
          // [
          //     {
          //        "transport": "wss",
          //        "username": "yadvendra_agent",
          //        "password": "oct@2018",
          //        "domain": "d03-reg1.vacd.biz",
          //        "outboundProxy": "d03-reg1.vacd.biz:8089/freeswitch"
          //    }
          // ]
          //
          // webRtcServerInfo format for RC Int API
          // [
          //     {
          //        "transport": "WSS",
          //        "username": "18662032059*101",
          //        "password": "B77O85vO",
          //        "authorizationId": "400017513008",
          //        "domain": "sip-cfintams.lab.nordigy.ru",
          //        "outboundProxy": "webphone-sip-cfintams.lab.nordigy.ru:8083"
          //    }
          // ]

          var sipInfo = _getCurrentWebRtcServerInfo();

          if (sipInfo !== null) {
            var username = sipInfo.username.toLowerCase();
            var webRtcServer = "".concat(sipInfo.transport.toLowerCase(), "://").concat(sipInfo.outboundProxy); // e.g. "wss://aws87-f06-ccw01.vacd.biz:8089/freeswitch";

            softphoneSettings.uri = "".concat(utils.escapeSoftphoneUsername(username), "@").concat(sipInfo.domain);
            softphoneSettings.wsServers = [webRtcServer];
            softphoneSettings.displayName = username;
            softphoneSettings.authorizationUser = sipInfo.authorizationId;
            softphoneSettings.sipPassword = sipInfo.password;
            softphoneSettings.sipDialDest = "sip:".concat(softphoneSettings.uri);
            return {
              webRtcServer: webRtcServer,
              username: username,
              password: softphoneSettings.sipPassword,
              domain: sipInfo.domain || null,
              dialDest: softphoneSettings.sipDialDest || null,
              uri: softphoneSettings.uri || null,
              wsServers: softphoneSettings.wsServers || []
            };
          }

          return null;
        }
      }; // /////////////////////
      // PRIVATE FUNCTIONS //
      // /////////////////////

      /* These functions are just used within this softphoneService.js file */

      function _getSipConfig() {
        var remoteAudioElement = document.getElementById('remoteAudio'); // audio node on index.html

        var model = UIModel.getInstance();
        var softphoneSettings = model.softphoneSettings;
        var config = {
          media: {
            remote: {
              audio: remoteAudioElement
            }
          },
          ua: {
            displayName: utils.escapeSoftphoneUsername(softphoneSettings.displayName),
            authorizationUser: utils.escapeSoftphoneUsername(softphoneSettings.authorizationUser),
            password: softphoneSettings.sipPassword,
            uri: softphoneSettings.uri,
            wsServers: softphoneSettings.wsServers,
            traceSip: true,
            registerExpires: 60,
            userAgentString: navigator.userAgent
          }
        };
        return config;
      }

      function _handleNoRegisterResponse() {
        // registration timeout reached, rotate registrar
        var model = UIModel.getInstance();
        var softphoneSettings = model.softphoneSettings; // we want to force a registrar refresh

        softphoneSettings.isRegistered = true;
        model.libraryInstance.switchSoftphoneRegistrar(softphoneSettings.maintainOH, softphoneSettings.autoStartOH);
      } // clear registration timeout


      function _registerHasResponse() {
        clearTimeout(UIModel.getInstance().softphoneSettings.registerPending);
      }

      function _rotateWebRtcServer() {
        var softphoneSettings = UIModel.getInstance().softphoneSettings;
        var sipInfo = softphoneSettings.sipInfo;

        if (sipInfo.length > 1) {
          sipInfo.push(sipInfo.shift());
          softphoneSettings.attemptingSoftphoneReconnect = true;
        }
      }

      function _updateOHFlags(maintainOffhook, autoStartOffhook) {
        var softphoneSettings = UIModel.getInstance().softphoneSettings;
        softphoneSettings.maintainOH = maintainOffhook;
        softphoneSettings.autoStartOH = autoStartOffhook;
      }

      function _getCurrentWebRtcServerInfo() {
        var softphoneSettings = UIModel.getInstance().softphoneSettings;
        return softphoneSettings.sipInfo != null && softphoneSettings.sipInfo.length > 0 ? softphoneSettings.sipInfo[0] : null;
      } // clear webRtc settings, hangup, unregister


      function _reset() {
        var model = UIModel.getInstance();
        var webRtc = model.softphoneSettings.webRtc;

        if (webRtc && webRtc.ua) {
          var opts = {
            all: true
          };
          model.libraryInstance.offhookTerm(); // TODO - dlb - set up callback with agent-js??

          webRtc.hangup();
          webRtc.ua.unregister(opts);
          webRtc.removeAllListeners('connected');
          webRtc.removeAllListeners('ended');
          webRtc.removeAllListeners('registered');
          webRtc.removeAllListeners('unregistered');
          webRtc.removeAllListeners('registrationFailed');
          webRtc.removeAllListeners('ringing');
          webRtc.removeAllListeners('mute');
          webRtc.removeAllListeners('unmute');
          webRtc.ua.stop();
          webRtc = null;
          model.softphoneSettings.webRtc = webRtc; // set back on model

          model.softphoneSettings.isRegistered = false;
          model.softphoneSettings.muteActive = false;
          model.softphoneSettings.registerPending = null;
          model.softphoneSettings.uri = '';
        }
      } // /////////////////////////////
      // SIP JS CALLBACK FUNCTIONS //
      // /////////////////////////////

      /* These functions bubble up SIP callbacks to the UI */


      function _connected() {
        // send response to agent-js
        utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_CONNECTED, {
          message: 'SIP connected'
        });
      }

      function _ended() {
        utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_ENDED, {
          message: 'SIP ended'
        });
      }

      function _registered() {
        var model = UIModel.getInstance();

        _registerHasResponse();

        model.softphoneSettings.isRegistered = true; // check if dial destination has changed to a new registrar,
        // but not just with the IQ replacement of @RC_SOFTPHONE

        if (model.agentSettings.dialDest !== model.softphoneSettings.sipDialDest && model.agentSettings.dialDest.indexOf('@RC_SOFTPHONE') === -1) {
          // update agent dial dest on instance
          model.agentSettings.dialDest = JSON.parse(JSON.stringify(model.softphoneSettings.sipDialDest)); // notify agent of change

          var responseObj = {
            message: 'SIP dial destination changed',
            dialDest: model.agentSettings.dialDest,
            maintainOH: model.softphoneSettings.maintainOH,
            autoStartOH: model.softphoneSettings.autoStartOH
          };

          if (!model.softphoneSettings.autoStartOH) {
            model.softphoneSettings.attemptingSoftphoneReconnect = false; // done with reconnect steps for now
          }

          utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_DIAL_DEST_CHANGED, responseObj); // update dial destination on agent login record, send request to IQ

          model.libraryInstance.updateDialDestination(model.agentSettings.dialDest, true);
        }

        utils.fireCallback(model.libraryInstance, CALLBACK_TYPES.SIP_REGISTERED, {
          message: 'SIP registered'
        });
      }

      function _unregistered() {
        var model = UIModel.getInstance();

        _registerHasResponse();

        model.softphoneSettings.isRegistered = false;

        _reset();

        model.libraryInstance.sipInit();
      }

      function _registrationFailed() {
        _registerHasResponse();

        UIModel.getInstance().softphoneSettings.isRegistered = false;

        _reset();
      }

      function _ringing(notif) {
        utils.fireCallback(UIModel.getInstance().libraryInstance, CALLBACK_TYPES.SIP_RINGING, {
          message: 'SIP ringing',
          data: notif
        });
      }

      function _mute() {
        UIModel.getInstance().softphoneSettings.muteActive = true;
      }

      function _unmute() {
        UIModel.getInstance().softphoneSettings.muteActive = false;
      }
    }

    var initAgentLibrary = function initAgentLibrary(context) {
      initAgentLibraryCore(context);
      initAgentLibrarySocket(context);
      initAgentLibraryAgent(context);
      initAgentLibraryCall(context);
      initAgentLibraryLead(context);
      initAgentLibraryChat(context);
      initAgentLibraryLogger(context);
      initAgentLibraryConsoleLogger(context);
      initAgentLibrarySoftphoneService(context);
      initAgentLibraryMultisocket(context);
      return context.AgentLibrary;
    };

    return initAgentLibrary(this);
  }.call(this, this);
}.call(window);

exports["default"] = _default;
//# sourceMappingURL=agentLibrary.js.map
