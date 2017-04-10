'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _messageSenderMessage;

var _messageSenderMessages = require('ringcentral-integration/modules/MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_messageSenderMessage = {}, (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendSuccess, 'Erfolgreich gesendet.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendError, 'Fehler beim Senden der Nachricht.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.numberValidateError, 'Fehler beim Validieren der Telefonnummer.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textEmpty, 'Geben Sie den zu sendenden Text ein.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noPermission, 'Sie verfügen über keine Berechtigung zum Senden von Nachrichten.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderEmpty, 'Zum Senden Nummer aus Ihren Telefonnummern auswählen'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noToNumber, 'Geben Sie eine gültige Telefonnummer ein.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientsEmpty, 'Geben Sie eine gültige Empfängernummer ein.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textTooLong, 'Text ist zu lang, maximal 1000 Zeichen'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientNumberInvalids, 'Ungültige Empfängernummer'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noAreaCode, 'Legen Sie für die {areaCodeLink} die Verwendung von 7-stelligen lokalen Telefonnummern fest.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.specialNumber, 'Das Anrufen des Notrufs oder bestimmter Servicenummern wird nicht unterstützt.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.connectFailed, 'Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internalError, 'Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später erneut.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notAnExtension, 'Die Durchwahlnummer existiert nicht.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.networkError, 'Herstellen der Verbindung aufgrund von Netzwerkproblemen nicht möglich. Versuchen Sie es später erneut.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notSmsToExtension, 'Senden an eine Durchwahl mit Haupttelefonnummer nicht m\xF6glich.\n    Geben Sie zun\xE4chst die Durchwahl an,\n    wenn Sie an eine Durchwahl senden m\xF6chten.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderNumberInvalids, 'Sie haben keine g\xFCltige Telefonnummer, um SMS\n    zu versenden. Wenden Sie sich an Ihren Kontoadministrator.'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internationalSMSNotSupported, 'Das Versenden von SMS an internationale Telefonnummern\n    wird nicht unterst\xFCtzt.'), (0, _defineProperty3.default)(_messageSenderMessage, 'areaCode', 'Vorwahl'), _messageSenderMessage);
//# sourceMappingURL=de-DE.js.map
