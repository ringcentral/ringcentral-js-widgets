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
var _AudioSettings = require("@ringcentral-integration/commons/modules/AudioSettings");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _AudioSettings.audioSettingsErrors.userMediaPermission, 'Autorize o {application} a aceder ao áudio.'), _AudioSettings.audioSettingsErrors.ringtoneSizeOverLimit, 'O ficheiro que está a tentar carregar é demasiado grande. Experimente carregar um com menos de 5 MB.'), _AudioSettings.audioSettingsErrors.duplicateRingtone, 'O toque que está a tentar adicionar já existe.'), _AudioSettings.audioSettingsErrors.uploadRingtoneFailed, 'Estamos a ter problemas a adicionar o seu toque. Tente novamente.'), _AudioSettings.audioSettingsErrors.deleteRingtoneFailed, 'Estamos a ter problemas a eliminar o seu toque. Tente novamente.'), "ringtoneAdded", 'Toque adicionado'); // @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
// @key: @#@"ringtoneAdded"@#@ @source: @#@"Ringtone added"@#@
//# sourceMappingURL=pt-PT.js.map
