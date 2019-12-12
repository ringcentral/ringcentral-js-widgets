import { ContactModel } from 'ringcentral-integration/models/Contact.model';
import {
  formatNumber,
  onClickMailTo,
  onClickToDial,
  onClickToSMS,
  sourceNodeRenderer,
} from '../ContactDetails/ContactDetails.interface';

export interface ContactDetailsViewProps {
  currentLocale: string;
  contact: ContactModel;
  isClickToDialEnabled: boolean;
  isCallButtonDisabled: boolean;
  isClickToTextEnabled: boolean;
  disableLinks: boolean;
  internalSmsPermission: boolean;
  outboundSmsPermission: boolean;
  showSpinner: boolean;
}

export interface ContactDetailsViewFunctionProps
  extends formatNumber,
    onClickMailTo,
    onClickToDial,
    onClickToSMS,
    sourceNodeRenderer {
  onBackClick(): any;
}
