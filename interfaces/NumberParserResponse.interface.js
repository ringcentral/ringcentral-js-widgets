"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberDetailsType = exports.ContextSourceOption = exports.Category = void 0;
var Category = /*#__PURE__*/function (Category) {
  Category["Unknown"] = "Unknown";
  Category["ServiceCode"] = "ServiceCode";
  Category["SpecialService"] = "SpecialService";
  Category["Extension"] = "Extension";
  Category["Regular"] = "Regular";
  Category["TollFree"] = "TollFree";
  Category["ShortCode"] = "ShortCode";
  Category["Ambiguous"] = "Ambiguous";
  return Category;
}({});
exports.Category = Category;
var ContextSourceOption = {
  "default": 'Default',
  account: 'Account'
};
exports.ContextSourceOption = ContextSourceOption;
// introduce number parser v2
var NumberDetailsType = /*#__PURE__*/function (NumberDetailsType) {
  NumberDetailsType["Unknown"] = "Unknown";
  NumberDetailsType["Emergency"] = "Emergency";
  NumberDetailsType["DirectoryAssistance"] = "DirectoryAssistance";
  NumberDetailsType["UpdateEmergencyAddress"] = "UpdateEmergencyAddress";
  NumberDetailsType["CustomerSupport"] = "CustomerSupport";
  NumberDetailsType["NonEmergencyPolice"] = "NonEmergencyPolice";
  NumberDetailsType["NonEmergencyMedical"] = "NonEmergencyMedical";
  NumberDetailsType["TelecommunicationRelay"] = "TelecommunicationRelay";
  NumberDetailsType["Unsupported"] = "Unsupported";
  NumberDetailsType["Supplementary"] = "Supplementary";
  return NumberDetailsType;
}({});
exports.NumberDetailsType = NumberDetailsType;
//# sourceMappingURL=NumberParserResponse.interface.js.map
