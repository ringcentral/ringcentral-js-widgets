import { ContactModel } from '@ringcentral-integration/commons/interfaces/Contact.model';

import {
  clickToDial,
  clickToSMS,
  formatNumber,
  onClickMailTo,
  sourceNodeRenderer,
} from '../ContactDetails/ContactDetails.interface';

export interface ContactDetailsViewProps {
  currentLocale: string;
  contact: ContactModel;
  isMultipleSiteEnabled: boolean;
  isCallButtonDisabled: boolean;
  disableLinks: boolean;
  showSpinner: boolean;
}

export interface ContactDetailsViewFunctionProps
  extends formatNumber,
    onClickMailTo,
    clickToDial,
    clickToSMS,
    sourceNodeRenderer {
  onBackClick?: () => any;
  onVisitPage?: () => any;
  onLeavingPage?: () => any;
}
