import i18n from './i18n';

export const useEmojiI18n = (currentLocale: string) => {
  return {
    search: i18n.getString('search', currentLocale),
    search_no_results_1: i18n.getString('search_no_results_1', currentLocale),
    search_no_results_2: i18n.getString('search_no_results_2', currentLocale),
    pick: i18n.getString('pick', currentLocale),
    add_custom: i18n.getString('add_custom', currentLocale),
    categories: {
      activity: i18n.getString('categories_activity', currentLocale),
      custom: i18n.getString('categories_custom', currentLocale),
      flags: i18n.getString('categories_flags', currentLocale),
      foods: i18n.getString('categories_foods', currentLocale),
      frequent: i18n.getString('categories_frequent', currentLocale),
      nature: i18n.getString('categories_nature', currentLocale),
      objects: i18n.getString('categories_objects', currentLocale),
      people: i18n.getString('categories_people', currentLocale),
      places: i18n.getString('categories_places', currentLocale),
      search: i18n.getString('categories_search', currentLocale),
      symbols: i18n.getString('categories_symbols', currentLocale),
    },
    skins: {
      choose: i18n.getString('skins_choose', currentLocale),
      '1': i18n.getString('skins_1', currentLocale),
      '2': i18n.getString('skins_2', currentLocale),
      '3': i18n.getString('skins_3', currentLocale),
      '4': i18n.getString('skins_4', currentLocale),
      '5': i18n.getString('skins_5', currentLocale),
      '6': i18n.getString('skins_6', currentLocale),
    },
  };
};
