"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _const = require("@ringcentral-integration/commons/modules/RingtoneConfiguration/const");
var _RINGS_TYPE$Phone_Rin;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_RINGS_TYPE$Phone_Rin = {}, _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring1, '電話のベル1'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring2, '電話のベル2'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Acoustic_Dreams, 'アコースティック'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Air_Raid, '空襲'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Allusive, 'ひらめき'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Attention, '注意'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Blub_Blub, 'スイミング'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Buzzy, 'バジー'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Channel_Open, 'チャンネルオープン'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Contemplation, '黙想'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Crystal_Ball, 'クリスタル'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Disco, 'ディスコ'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Door_Bell, 'ドアベル'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Fairy, '妖精'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Fast_Bells, '速い鐘'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.High_Gong, 'ハイゴング'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Immersion, 'ピアノの音'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Indeed, '確かに'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Lazy_Day, 'リラックス'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Neural_Funk, 'ニューロン'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Nice, 'いいね'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Ring, 'ベルの音'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Ringing_Bells, '鳴る鐘'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Simple, 'シンプル'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Soothing, '癒し'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Sunshine, 'サンシャイン'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Off, 'オフ'), _defineProperty(_RINGS_TYPE$Phone_Rin, "add", '追加'), _defineProperty(_RINGS_TYPE$Phone_Rin, "delete", '削除'), _defineProperty(_RINGS_TYPE$Phone_Rin, "play", '再生'), _defineProperty(_RINGS_TYPE$Phone_Rin, "cancel", 'キャンセル'), _defineProperty(_RINGS_TYPE$Phone_Rin, "confirmToDelete", '{name}を削除しますか？'), _RINGS_TYPE$Phone_Rin); // @key: @#@"[RINGS_TYPE.Phone_Ring1]"@#@ @source: @#@"Phone Ring 1"@#@
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
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
