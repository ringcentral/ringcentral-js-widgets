import type { ContactDetailsView } from '@ringcentral-integration/widgets/components/ContactDetailsView';

export type ContactDetailsViewOptions = {
  composeTextRoute?: string;
  dialerRoute?: string;
  component?: typeof ContactDetailsView;
};

export interface RouteParams {
  type: string;
  id: string;
  direct?: boolean;
}

export interface IParams {
  contactType?: string;
  contactId?: string;
}

export interface ContactDetailsPanelProps {
  //
}

export interface ContactDetailsViewProps {
  //
}
