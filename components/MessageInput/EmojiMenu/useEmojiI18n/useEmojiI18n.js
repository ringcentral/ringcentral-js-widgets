"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEmojiI18n = void 0;
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var useEmojiI18n = function useEmojiI18n(currentLocale) {
  return {
    search: _i18n["default"].getString('search', currentLocale),
    search_no_results_1: _i18n["default"].getString('search_no_results_1', currentLocale),
    search_no_results_2: _i18n["default"].getString('search_no_results_2', currentLocale),
    pick: _i18n["default"].getString('pick', currentLocale),
    add_custom: _i18n["default"].getString('add_custom', currentLocale),
    categories: {
      activity: _i18n["default"].getString('categories_activity', currentLocale),
      custom: _i18n["default"].getString('categories_custom', currentLocale),
      flags: _i18n["default"].getString('categories_flags', currentLocale),
      foods: _i18n["default"].getString('categories_foods', currentLocale),
      frequent: _i18n["default"].getString('categories_frequent', currentLocale),
      nature: _i18n["default"].getString('categories_nature', currentLocale),
      objects: _i18n["default"].getString('categories_objects', currentLocale),
      people: _i18n["default"].getString('categories_people', currentLocale),
      places: _i18n["default"].getString('categories_places', currentLocale),
      search: _i18n["default"].getString('categories_search', currentLocale),
      symbols: _i18n["default"].getString('categories_symbols', currentLocale)
    },
    skins: {
      choose: _i18n["default"].getString('skins_choose', currentLocale),
      '1': _i18n["default"].getString('skins_1', currentLocale),
      '2': _i18n["default"].getString('skins_2', currentLocale),
      '3': _i18n["default"].getString('skins_3', currentLocale),
      '4': _i18n["default"].getString('skins_4', currentLocale),
      '5': _i18n["default"].getString('skins_5', currentLocale),
      '6': _i18n["default"].getString('skins_6', currentLocale)
    }
  };
};
exports.useEmojiI18n = useEmojiI18n;
//# sourceMappingURL=useEmojiI18n.js.map
