import type { ContactModel } from '@ringcentral-integration/commons/interfaces/Contact.model';

import type { GetPresenceFn } from '../../react-hooks/usePresence';
import type {
  clickToDial,
  clickToSMS,
  formatNumber,
  onClickMailTo,
  sourceNodeRenderer,
} from '../ContactDetails/ContactDetails.interface';

export interface ContactDetailsViewProps {
  currentLocale: string;
  contact: ContactModel | null;
  isMultipleSiteEnabled: boolean;
  isCallButtonDisabled: boolean;
  disableLinks: boolean;
  showSpinner: boolean;
  onVisitPage?: () => void;
  onLeavingPage?: () => void;
  getPresence: GetPresenceFn;
}

export interface ContactDetailsViewFunctionProps
  extends formatNumber,
    onClickMailTo,
    clickToDial,
    clickToSMS,
    sourceNodeRenderer {
  onBackClick?: () => any;
}
