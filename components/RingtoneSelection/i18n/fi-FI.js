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
var _default = exports["default"] = (_RINGS_TYPE$Phone_Rin = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring1, 'Puhelinsoitto 1'), _const.RINGS_TYPE.Phone_Ring2, 'Puhelinsoitto 2'), _const.RINGS_TYPE.Acoustic_Dreams, 'Akustiset unelmat'), _const.RINGS_TYPE.Air_Raid, 'Ilmahälytys'), _const.RINGS_TYPE.Allusive, 'Vihjaileva'), _const.RINGS_TYPE.Attention, 'Huomio'), _const.RINGS_TYPE.Blub_Blub, 'Pulpahdus'), _const.RINGS_TYPE.Buzzy, 'Surina'), _const.RINGS_TYPE.Channel_Open, 'Kanava auki'), _const.RINGS_TYPE.Contemplation, 'Suunnittelu'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Crystal_Ball, 'Kristallipallo'), _const.RINGS_TYPE.Disco, 'Disko'), _const.RINGS_TYPE.Door_Bell, 'Ovikello'), _const.RINGS_TYPE.Fairy, 'Keijukainen'), _const.RINGS_TYPE.Fast_Bells, 'Nopeat kellot'), _const.RINGS_TYPE.High_Gong, 'Korkea gongi'), _const.RINGS_TYPE.Immersion, 'Uppoutuminen'), _const.RINGS_TYPE.Indeed, 'Niinpä'), _const.RINGS_TYPE.Lazy_Day, 'Laiska päivä'), _const.RINGS_TYPE.Neural_Funk, 'Neurofunk'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Nice, 'Kiva'), _const.RINGS_TYPE.Ring, 'Soitto'), _const.RINGS_TYPE.Ringing_Bells, 'Soivat kellot'), _const.RINGS_TYPE.Simple, 'Yksinkertainen'), _const.RINGS_TYPE.Soothing, 'Rauhoittava'), _const.RINGS_TYPE.Sunshine, 'Auringonpaiste'), _const.RINGS_TYPE.Off, 'Pois päältä'), "add", 'Lisää'), "delete", 'Poista'), "play", 'Toista'), _defineProperty(_defineProperty(_RINGS_TYPE$Phone_Rin, "cancel", 'Peruuta'), "confirmToDelete", 'Poistetaanko {name}?')); // @key: @#@"[RINGS_TYPE.Phone_Ring1]"@#@ @source: @#@"Phone Ring 1"@#@
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
//# sourceMappingURL=fi-FI.js.map
