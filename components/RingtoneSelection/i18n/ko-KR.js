"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _const = require("@ringcentral-integration/commons/modules/RingtoneConfiguration/const");
var _RINGS_TYPE$Phone_Rin;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_RINGS_TYPE$Phone_Rin = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring1, '전화 벨소리 1'), _const.RINGS_TYPE.Phone_Ring2, '전화 벨소리 2'), _const.RINGS_TYPE.Acoustic_Dreams, '어쿠스틱 드림'), _const.RINGS_TYPE.Air_Raid, '공습 경보음'), _const.RINGS_TYPE.Allusive, '암시적 느낌의 소리'), _const.RINGS_TYPE.Attention, '주의'), _const.RINGS_TYPE.Blub_Blub, '우는 소리'), _const.RINGS_TYPE.Buzzy, '윙윙 소리'), _const.RINGS_TYPE.Channel_Open, '채널 열기'), _const.RINGS_TYPE.Contemplation, '명상'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Crystal_Ball, '크리스털 볼'), _const.RINGS_TYPE.Disco, '디스코'), _const.RINGS_TYPE.Door_Bell, '초인종 소리'), _const.RINGS_TYPE.Fairy, '요정'), _const.RINGS_TYPE.Fast_Bells, '빠른 벨소리'), _const.RINGS_TYPE.High_Gong, '고음 징'), _const.RINGS_TYPE.Immersion, '몰입'), _const.RINGS_TYPE.Indeed, '정말'), _const.RINGS_TYPE.Lazy_Day, '레이지 데이'), _const.RINGS_TYPE.Neural_Funk, '뉴럴 펑크'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Nice, '좋음'), _const.RINGS_TYPE.Ring, '벨소리'), _const.RINGS_TYPE.Ringing_Bells, '울리는 종'), _const.RINGS_TYPE.Simple, '단순'), _const.RINGS_TYPE.Soothing, '기분을 안정시키는 소리'), _const.RINGS_TYPE.Sunshine, '햇살'), _const.RINGS_TYPE.Off, '끄기'), "add", '추가'), "delete", '삭제'), "play", '재생'), _defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, "cancel", '취소'), "confirmToDelete", '{name} 벨소리를 삭제하시겠습니까?')); // @key: @#@"[RINGS_TYPE.Phone_Ring1]"@#@ @source: @#@"Phone Ring 1"@#@
// @key: @#@"[RINGS_TYPE.Phone_Ring2]"@#@ @source: @#@"Phone Ring 2"@#@
// @key: @#@"[RINGS_TYPE.Acoustic_Dreams]"@#@ @source: @#@"Acoustic Dreams"@#@
// @key: @#@"[RINGS_TYPE.Air_Raid]"@#@ @source: @#@"Air Raid"@#@
// @key: @#@"[RINGS_TYPE.Allusive]"@#@ @source: @#@"Allusive"@#@
// @key: @#@"[RINGS_TYPE.Attention]"@#@ @source: @#@"Attention"@#@
// @key: @#@"[RINGS_TYPE.Blub_Blub]"@#@ @source: @#@"Blub Blub"@#@
// @key: @#@"[RINGS_TYPE.Buzzy]"@#@ @source: @#@"Buzzy"@#@
// @key: @#@"[RINGS_TYPE.Channel_Open]"@#@ @source: @#@"Channel Open"@#@
// @key: @#@"[RINGS_TYPE.Contemplation]"@#@ @source: @#@"Contemplation"@#@
// @key: @#@"[RINGS_TYPE.Crystal_Ball]"@#@ @source: @#@"Crystal Ball"@#@
// @key: @#@"[RINGS_TYPE.Disco]"@#@ @source: @#@"Disco"@#@
// @key: @#@"[RINGS_TYPE.Door_Bell]"@#@ @source: @#@"Door Bell"@#@
// @key: @#@"[RINGS_TYPE.Fairy]"@#@ @source: @#@"Fairy"@#@
// @key: @#@"[RINGS_TYPE.Fast_Bells]"@#@ @source: @#@"Fast Bells"@#@
// @key: @#@"[RINGS_TYPE.High_Gong]"@#@ @source: @#@"High Gong"@#@
// @key: @#@"[RINGS_TYPE.Immersion]"@#@ @source: @#@"Immersion"@#@
// @key: @#@"[RINGS_TYPE.Indeed]"@#@ @source: @#@"Indeed"@#@
// @key: @#@"[RINGS_TYPE.Lazy_Day]"@#@ @source: @#@"Lazy Day"@#@
// @key: @#@"[RINGS_TYPE.Neural_Funk]"@#@ @source: @#@"Neural Funk"@#@
// @key: @#@"[RINGS_TYPE.Nice]"@#@ @source: @#@"Nice"@#@
// @key: @#@"[RINGS_TYPE.Ring]"@#@ @source: @#@"Ring"@#@
// @key: @#@"[RINGS_TYPE.Ringing_Bells]"@#@ @source: @#@"Ringing Bells"@#@
// @key: @#@"[RINGS_TYPE.Simple]"@#@ @source: @#@"Simple"@#@
// @key: @#@"[RINGS_TYPE.Soothing]"@#@ @source: @#@"Soothing"@#@
// @key: @#@"[RINGS_TYPE.Sunshine]"@#@ @source: @#@"Sunshine"@#@
// @key: @#@"[RINGS_TYPE.Off]"@#@ @source: @#@"Off"@#@
// @key: @#@"add"@#@ @source: @#@"Add"@#@
// @key: @#@"delete"@#@ @source: @#@"Delete"@#@
// @key: @#@"play"@#@ @source: @#@"Play"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"confirmToDelete"@#@ @source: @#@"Delete {name}?"@#@
//# sourceMappingURL=ko-KR.js.map
