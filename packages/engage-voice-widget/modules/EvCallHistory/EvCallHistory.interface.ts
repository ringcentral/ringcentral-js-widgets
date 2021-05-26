import { ActivityMatcher } from 'ringcentral-integration/modules/ActivityMatcherV2';
import { ContactMatcher } from 'ringcentral-integration/modules/ContactMatcherV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';

import { EvCallMonitor } from '../EvCallMonitor';
import { EvSubscription } from '../EvSubscription';

export interface State {
  //
}

export interface Deps {
  evCallMonitor: EvCallMonitor;
  evSubscription: EvSubscription;
  contactMatcher?: ContactMatcher;
  activityMatcher?: ActivityMatcher;
  locale: Locale;
}

export interface CallHistory extends State {
  //
}
