"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RINGS_TYPE = exports.MAX_RINGTONE_SIZE = exports.MAX_CUSTOM_RINGTONE_COUNT = exports.DEFAULT_RINGTONE_LIST = void 0;
var _AcousticDreams = _interopRequireDefault(require("./audio/AcousticDreams.mp3"));
var _AirRaid = _interopRequireDefault(require("./audio/AirRaid.mp3"));
var _Allusive = _interopRequireDefault(require("./audio/Allusive.mp3"));
var _Attention = _interopRequireDefault(require("./audio/Attention.mp3"));
var _BlubBlub = _interopRequireDefault(require("./audio/BlubBlub.mp3"));
var _Buzzy = _interopRequireDefault(require("./audio/Buzzy.mp3"));
var _ChannelOpen = _interopRequireDefault(require("./audio/ChannelOpen.mp3"));
var _Contemplation = _interopRequireDefault(require("./audio/Contemplation.mp3"));
var _CrystalBall = _interopRequireDefault(require("./audio/CrystalBall.mp3"));
var _Disco = _interopRequireDefault(require("./audio/Disco.mp3"));
var _DoorBell = _interopRequireDefault(require("./audio/DoorBell.mp3"));
var _Fairy = _interopRequireDefault(require("./audio/Fairy.mp3"));
var _FastBells = _interopRequireDefault(require("./audio/FastBells.mp3"));
var _HighGong = _interopRequireDefault(require("./audio/HighGong.mp3"));
var _Immersion = _interopRequireDefault(require("./audio/Immersion.mp3"));
var _Indeed = _interopRequireDefault(require("./audio/Indeed.mp3"));
var _LazyDay = _interopRequireDefault(require("./audio/LazyDay.mp3"));
var _NeuralFunk = _interopRequireDefault(require("./audio/NeuralFunk.mp3"));
var _Nice = _interopRequireDefault(require("./audio/Nice.mp3"));
var _PhoneRing = _interopRequireDefault(require("./audio/PhoneRing.mp3"));
var _Ring = _interopRequireDefault(require("./audio/Ring.mp3"));
var _RingingBells = _interopRequireDefault(require("./audio/RingingBells.mp3"));
var _Simple = _interopRequireDefault(require("./audio/Simple.mp3"));
var _Soothing = _interopRequireDefault(require("./audio/Soothing.mp3"));
var _Sunshine = _interopRequireDefault(require("./audio/Sunshine.mp3"));
var _incoming = _interopRequireDefault(require("./audio/incoming.mp3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RINGS_TYPE = /*#__PURE__*/function (RINGS_TYPE) {
  RINGS_TYPE["Phone_Ring1"] = "phone_ring1";
  RINGS_TYPE["Phone_Ring2"] = "phone_ring2";
  RINGS_TYPE["Acoustic_Dreams"] = "acoustic_dreams";
  RINGS_TYPE["Air_Raid"] = "air_raid";
  RINGS_TYPE["Allusive"] = "allusive";
  RINGS_TYPE["Attention"] = "attention";
  RINGS_TYPE["Blub_Blub"] = "blub_blub";
  RINGS_TYPE["Buzzy"] = "buzzy";
  RINGS_TYPE["Channel_Open"] = "channel_open";
  RINGS_TYPE["Contemplation"] = "contemplation";
  RINGS_TYPE["Crystal_Ball"] = "crystal_ball";
  RINGS_TYPE["Disco"] = "disco";
  RINGS_TYPE["Door_Bell"] = "door_bell";
  RINGS_TYPE["Fairy"] = "fairy";
  RINGS_TYPE["Fast_Bells"] = "fast_bells";
  RINGS_TYPE["High_Gong"] = "high_gong";
  RINGS_TYPE["Immersion"] = "immersion";
  RINGS_TYPE["Indeed"] = "indeed";
  RINGS_TYPE["Lazy_Day"] = "lazy_day";
  RINGS_TYPE["Neural_Funk"] = "neural_funk";
  RINGS_TYPE["Nice"] = "nice";
  RINGS_TYPE["Ring"] = "ring";
  RINGS_TYPE["Ringing_Bells"] = "ringing_bells";
  RINGS_TYPE["Simple"] = "simple";
  RINGS_TYPE["Soothing"] = "soothing";
  RINGS_TYPE["Sunshine"] = "sunshine";
  RINGS_TYPE["Off"] = "off";
  return RINGS_TYPE;
}({});
exports.RINGS_TYPE = RINGS_TYPE;
var DEFAULT_RINGTONE_LIST = [{
  id: RINGS_TYPE.Phone_Ring1,
  url: _incoming["default"]
}, {
  id: RINGS_TYPE.Phone_Ring2,
  url: _PhoneRing["default"]
}, {
  id: RINGS_TYPE.Acoustic_Dreams,
  url: _AcousticDreams["default"]
}, {
  id: RINGS_TYPE.Air_Raid,
  url: _AirRaid["default"]
}, {
  id: RINGS_TYPE.Allusive,
  url: _Allusive["default"]
}, {
  id: RINGS_TYPE.Attention,
  url: _Attention["default"]
}, {
  id: RINGS_TYPE.Blub_Blub,
  url: _BlubBlub["default"]
}, {
  id: RINGS_TYPE.Buzzy,
  url: _Buzzy["default"]
}, {
  id: RINGS_TYPE.Channel_Open,
  url: _ChannelOpen["default"]
}, {
  id: RINGS_TYPE.Contemplation,
  url: _Contemplation["default"]
}, {
  id: RINGS_TYPE.Crystal_Ball,
  url: _CrystalBall["default"]
}, {
  id: RINGS_TYPE.Disco,
  url: _Disco["default"]
}, {
  id: RINGS_TYPE.Door_Bell,
  url: _DoorBell["default"]
}, {
  id: RINGS_TYPE.Fairy,
  url: _Fairy["default"]
}, {
  id: RINGS_TYPE.Fast_Bells,
  url: _FastBells["default"]
}, {
  id: RINGS_TYPE.High_Gong,
  url: _HighGong["default"]
}, {
  id: RINGS_TYPE.Immersion,
  url: _Immersion["default"]
}, {
  id: RINGS_TYPE.Indeed,
  url: _Indeed["default"]
}, {
  id: RINGS_TYPE.Lazy_Day,
  url: _LazyDay["default"]
}, {
  id: RINGS_TYPE.Neural_Funk,
  url: _NeuralFunk["default"]
}, {
  id: RINGS_TYPE.Nice,
  url: _Nice["default"]
}, {
  id: RINGS_TYPE.Ring,
  url: _Ring["default"]
}, {
  id: RINGS_TYPE.Ringing_Bells,
  url: _RingingBells["default"]
}, {
  id: RINGS_TYPE.Simple,
  url: _Simple["default"]
}, {
  id: RINGS_TYPE.Soothing,
  url: _Soothing["default"]
}, {
  id: RINGS_TYPE.Sunshine,
  url: _Sunshine["default"]
}, {
  id: RINGS_TYPE.Off,
  url: ''
}];
exports.DEFAULT_RINGTONE_LIST = DEFAULT_RINGTONE_LIST;
var MAX_CUSTOM_RINGTONE_COUNT = 10;
exports.MAX_CUSTOM_RINGTONE_COUNT = MAX_CUSTOM_RINGTONE_COUNT;
var MAX_RINGTONE_SIZE = 5 * 1024 * 1024;
exports.MAX_RINGTONE_SIZE = MAX_RINGTONE_SIZE;
//# sourceMappingURL=const.js.map
