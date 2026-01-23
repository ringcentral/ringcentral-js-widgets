"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEmojiI18n = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var useEmojiI18n = exports.useEmojiI18n = function useEmojiI18n() {
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return {
    search: t('search'),
    search_no_results_1: t('search_no_results_1'),
    search_no_results_2: t('search_no_results_2'),
    pick: t('pick'),
    add_custom: t('add_custom'),
    categories: {
      activity: t('categories_activity'),
      custom: t('categories_custom'),
      flags: t('categories_flags'),
      foods: t('categories_foods'),
      frequent: t('categories_frequent'),
      nature: t('categories_nature'),
      objects: t('categories_objects'),
      people: t('categories_people'),
      places: t('categories_places'),
      search: t('categories_search'),
      symbols: t('categories_symbols')
    },
    skins: {
      choose: t('skins_choose'),
      '1': t('skins_1'),
      '2': t('skins_2'),
      '3': t('skins_3'),
      '4': t('skins_4'),
      '5': t('skins_5'),
      '6': t('skins_6')
    }
  };
};
//# sourceMappingURL=useEmojiI18n.js.map
