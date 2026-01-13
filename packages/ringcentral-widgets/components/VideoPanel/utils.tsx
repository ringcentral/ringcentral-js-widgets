import i18n from './i18n';

export function getHelperTextForPasswordField(
  meetingPassword: string,
  isMeetingPasswordValid: boolean,
  currentLocale: string,
  isPasswordFocus: boolean,
): string {
  if (!meetingPassword) {
    return i18n.getString('passwordEmptyError', currentLocale);
  }
  if (!isMeetingPasswordValid) {
    return i18n.getString('passwordInvalidError', currentLocale);
  }
  if (isPasswordFocus) {
    return i18n.getString('passwordHintText', currentLocale);
  }
  return '';
}
