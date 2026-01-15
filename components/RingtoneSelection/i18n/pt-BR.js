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
var _default = (_RINGS_TYPE$Phone_Rin = {}, _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring1, 'Toque de telefone 1'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Phone_Ring2, 'Toque de telefone 2'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Acoustic_Dreams, 'Acústico'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Air_Raid, 'Ataque aéreo'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Allusive, 'Alusivo'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Attention, 'Atenção'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Blub_Blub, 'Blub Blub'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Buzzy, 'Buzzy'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Channel_Open, 'Canal aberto'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Contemplation, 'Contemplação'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Crystal_Ball, 'Cristal'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Disco, 'Discoteca'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Door_Bell, 'Campainha'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Fairy, 'Fada'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Fast_Bells, 'Sinos rápidos'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.High_Gong, 'Gong alto'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Immersion, 'Imersão'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Indeed, 'Efeito'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Lazy_Day, 'Relaxamento'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Neural_Funk, 'Neurônio'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Nice, 'Legal'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Ring, 'Toque'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Ringing_Bells, 'Sinos tocando'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Simple, 'Simples'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Soothing, 'Tranquilizante'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Sunshine, 'Luz do sol'), _defineProperty(_RINGS_TYPE$Phone_Rin, _const.RINGS_TYPE.Off, 'Desativado'), _defineProperty(_RINGS_TYPE$Phone_Rin, "add", 'Adicionar'), _defineProperty(_RINGS_TYPE$Phone_Rin, "delete", 'Excluir'), _defineProperty(_RINGS_TYPE$Phone_Rin, "play", 'Reproduzir'), _defineProperty(_RINGS_TYPE$Phone_Rin, "cancel", 'Cancelar'), _defineProperty(_RINGS_TYPE$Phone_Rin, "confirmToDelete", 'Excluir {name}?'), _RINGS_TYPE$Phone_Rin); // @key: @#@"[RINGS_TYPE.Phone_Ring1]"@#@ @source: @#@"Phone Ring 1"@#@
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
//# sourceMappingURL=pt-BR.js.map
