export declare const I18nFlag = "__i18n__";
export type I18nStrings<T = string> = {
    [I18nFlag]: true;
    translations: {
        [k: string]: T;
    };
};
export type LocaleCode = string;
