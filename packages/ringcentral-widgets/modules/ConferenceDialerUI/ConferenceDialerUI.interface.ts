import {
  Deps as DialerUIDeps,
  DialerUIPanelProps,
} from '../DialerUI/DialerUI.interface';
import { RouterInteraction } from '../RouterInteraction';

export interface ConferenceDialerUIOptions {
  /** go back to url */
  backURL?: string;
}

export interface Deps extends DialerUIDeps {
  routerInteraction: RouterInteraction;
  conferenceDialerUIOptions?: ConferenceDialerUIOptions;
}

export interface ConferenceDialerUIPanelProps extends DialerUIPanelProps {
  onBack: () => Promise<void>;
  setLastSessionId: () => Promise<void>;
  onCallButtonClick: () => Promise<void>;
  inConference: boolean;
  showFromField: boolean;
}

export interface ConferenceDialerUIContainerProps {
  params: { fromNumber?: string; fromSessionId?: string };
}
