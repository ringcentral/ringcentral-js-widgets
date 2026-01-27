import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { IncomingCallView } from '@ringcentral-integration/widgets/components/IncomingCallView';
import type { ComponentType, ReactElement } from 'react';

import type { Webphone } from '../../services';

export interface IncomingCallViewOptions {
  component?: typeof IncomingCallView;
}

export interface IncomingCallViewProps
  extends Pick<IncomingCallViewPanelProps, 'getAvatarUrl'> {
  showContactDisplayPlaceholder?: boolean;
  phoneSourceNameRenderer?: (type: string) => string;
  showCallQueueName: boolean;
  sourceIcons?: Record<string, ComponentType>;
  phoneTypeRenderer?: (type: string) => ReactElement;
}

export interface IncomingCallViewPanelProps {
  brand: string;
  nameMatches: Entity[];
  currentLocale: string;
  session: Partial<NormalizedSession>;
  activeSessionId: string | null | undefined;
  areaCode: string;
  countryCode: string;
  forwardingNumbers: ForwardingNumberInfo[];
  showContactDisplayPlaceholder: boolean;
  searchContactList: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  phoneNumber?: string | null;
  /**
   * current call should should name if not match any contact
   */
  name: string | undefined | null;
  sourceIcons?: Record<string, ComponentType>;
  phoneTypeRenderer?: (type: string) => ReactElement;
  phoneSourceNameRenderer?: (type: string) => string;
  showCallQueueName: boolean;
  formatPhone: (phoneNumber: string) => string | undefined;
  answer: (sessionId: string) => void;
  reject: Webphone['reject'];
  toVoiceMail: Webphone['toVoiceMail'];
  onForward: Webphone['forward'];
  replyWithMessage: Webphone['replyWithMessage'];
  toggleMinimized: Webphone['toggleMinimized'];
  updateSessionMatchedContact: Webphone['updateSessionMatchedContact'];
  getAvatarUrl: (contact: IContact) => Promise<string | null> | null;
  hangup: Webphone['hangup'];
  onHold: Webphone['hold'];
  searchContact: (pattern: string) => Promise<void>;
}
