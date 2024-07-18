import { dropDownOptions } from '../../../enums';

export default {
  [dropDownOptions.None]: 'None',
  multiple: 'Multiple assignments',
  phone: 'Phone',
  loginStyle: 'Login style',
  loginTime: 'Login time',
  skillProfile: 'Skill profile',
  dialGroup: 'Dial group',
  saveEditionModalTitle: 'Confirm Update',
  saveEditionModalContent: 'Your changes have not been saved.',
  save: 'Save',
  cancel: 'Cancel',
} as const;
