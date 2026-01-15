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
var _default = (_RINGS_TYPE$Phone_Rin = {}, _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring1, 'Sonnerie 1'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring2, 'Sonnerie 2'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Acoustic_Dreams, 'Acoustique'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Air_Raid, 'Raid aérien'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Allusive, 'Allusif'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Attention, 'Attention'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Blub_Blub, 'Blub Blub'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Buzzy, 'Vibration'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Channel_Open, 'Canal ouvert'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Contemplation, 'Contemplation'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Crystal_Ball, 'Cristal'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Disco, 'Disco'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Door_Bell, 'Sonnette'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Fairy, 'Fée'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Fast_Bells, 'Cloches Rapides'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.High_Gong, 'Gong aigu'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Immersion, 'Immersion'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Indeed, 'En effet'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Lazy_Day, 'Détente'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Neural_Funk, 'Neurone'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Nice, 'Agréable'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Ring, 'Sonnerie'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Ringing_Bells, 'Cloches'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Simple, 'Simple'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Soothing, 'Apaisant'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Sunshine, 'Ensoleillement'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Off, 'Désactivé'), _defineProperty(_RINGS_TYPE$Phone_Rin, "add", 'Ajouter'), _defineProperty(_RINGS_TYPE$Phone_Rin, "delete", 'Supprimer'), _defineProperty(_RINGS_TYPE$Phone_Rin, "play", 'Lire'), _defineProperty(_RINGS_TYPE$Phone_Rin, "cancel", 'Annuler'), _defineProperty(_RINGS_TYPE$Phone_Rin, "confirmToDelete", 'Supprimer {name}?'), _RINGS_TYPE$Phone_Rin); // @key: @#@"[RINGS_TYPE.Phone_Ring1]"@#@ @source: @#@"Phone Ring 1"@#@
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
//# sourceMappingURL=fr-CA.js.map
