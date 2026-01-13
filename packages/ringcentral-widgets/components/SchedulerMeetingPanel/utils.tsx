import i18n from './i18n';

export function getHelperTextForPasswordField(
  meetingPassword: string,
  isMeetingPasswordValid: boolean,
  currentLocale: string,
): string {
  if (!meetingPassword) {
    return i18n.getString('passwordEmptyError', currentLocale);
  }
  if (!isMeetingPasswordValid) {
    return i18n.getString('passwordInvalidError', currentLocale);
  }
  return i18n.getString('passwordHintText', currentLocale);
}
