import I18n from '@ringcentral-integration/i18n';

// @ts-expect-error TS(2306): Remove this comment to see the full error message
import loadLocale from './loadLocale';

export default new I18n(loadLocale);
