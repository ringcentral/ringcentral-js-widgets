"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.generateTemplates = generateTemplates;
var _AddButton = _interopRequireDefault(require("../AddButton"));
var _ArrayFieldItemTemplate = _interopRequireDefault(require("../ArrayFieldItemTemplate"));
var _ArrayFieldTemplate = _interopRequireDefault(require("../ArrayFieldTemplate"));
var _BaseInputTemplate = _interopRequireDefault(require("../BaseInputTemplate"));
var _DescriptionField = _interopRequireDefault(require("../DescriptionField"));
var _ErrorList = _interopRequireDefault(require("../ErrorList"));
var _FieldErrorTemplate = _interopRequireDefault(require("../FieldErrorTemplate"));
var _FieldHelpTemplate = _interopRequireDefault(require("../FieldHelpTemplate"));
var _FieldTemplate = _interopRequireDefault(require("../FieldTemplate"));
var _IconButton = require("../IconButton");
var _ObjectFieldTemplate = _interopRequireDefault(require("../ObjectFieldTemplate"));
var _SubmitButton = _interopRequireDefault(require("../SubmitButton"));
var _TitleField = _interopRequireDefault(require("../TitleField"));
var _WrapIfAdditionalTemplate = _interopRequireDefault(require("../WrapIfAdditionalTemplate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function generateTemplates() {
  return {
    ArrayFieldItemTemplate: _ArrayFieldItemTemplate["default"],
    ArrayFieldTemplate: _ArrayFieldTemplate["default"],
    BaseInputTemplate: _BaseInputTemplate["default"],
    ButtonTemplates: {
      AddButton: _AddButton["default"],
      CopyButton: _IconButton.CopyButton,
      MoveDownButton: _IconButton.MoveDownButton,
      MoveUpButton: _IconButton.MoveUpButton,
      RemoveButton: _IconButton.RemoveButton,
      SubmitButton: _SubmitButton["default"]
    },
    DescriptionFieldTemplate: _DescriptionField["default"],
    ErrorListTemplate: _ErrorList["default"],
    FieldErrorTemplate: _FieldErrorTemplate["default"],
    FieldHelpTemplate: _FieldHelpTemplate["default"],
    FieldTemplate: _FieldTemplate["default"],
    ObjectFieldTemplate: _ObjectFieldTemplate["default"],
    TitleFieldTemplate: _TitleField["default"],
    WrapIfAdditionalTemplate: _WrapIfAdditionalTemplate["default"]
  };
}
var _default = exports["default"] = generateTemplates();
//# sourceMappingURL=Templates.js.map
