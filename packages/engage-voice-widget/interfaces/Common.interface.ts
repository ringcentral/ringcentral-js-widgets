export interface I18n {
  getString(name: string, currentLocale: string): string;
}

export type Handler = (...args: any[]) => void;
