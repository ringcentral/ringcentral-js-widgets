// currently we only use this prefix
// Jupiter has other prefix, we don't support for now.
const RC_AVATAR_CONTACT_TYPE = 'PHONE';

export const jRcContactAvatarColorId = (
  id?: string | number,
  phoneNumberAsId?: string,
) => {
  if (id) {
    return id;
  }
  if (phoneNumberAsId) {
    return `${RC_AVATAR_CONTACT_TYPE}.${phoneNumberAsId}`;
  }
  return '';
};
