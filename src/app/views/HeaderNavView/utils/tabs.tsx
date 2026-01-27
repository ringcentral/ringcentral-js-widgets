import type { TabItem } from '@ringcentral-integration/next-widgets/deprecated/components/HeaderNav';
import HistoryIcon from '@ringcentral-integration/widgets/assets/images/CallHistory.svg';
import HistoryHoverIcon from '@ringcentral-integration/widgets/assets/images/CallHistoryHover.svg';
import CallsIcon from '@ringcentral-integration/widgets/assets/images/Calls.svg';
import CallsHoverIcon from '@ringcentral-integration/widgets/assets/images/CallsHover.svg';
import ContactIcon from '@ringcentral-integration/widgets/assets/images/Contact.svg';
import ContactHoverIcon from '@ringcentral-integration/widgets/assets/images/ContactHover.svg';
import ContactNavIcon from '@ringcentral-integration/widgets/assets/images/ContactsNavigation.svg';
import DialPadHoverIcon from '@ringcentral-integration/widgets/assets/images/DialPadHover.svg';
import DialPadIcon from '@ringcentral-integration/widgets/assets/images/DialPadNav.svg';
import MeetingNavIcon from '@ringcentral-integration/widgets/assets/images/MeetingNavigation.svg';
import MessageIcon from '@ringcentral-integration/widgets/assets/images/Messages.svg';
import MessageHoverIcon from '@ringcentral-integration/widgets/assets/images/MessagesHover.svg';
import SettingsNavIcon from '@ringcentral-integration/widgets/assets/images/SettingsNavigation.svg';
import {
  Settings,
  SettingsBorder,
  Videocam,
  VideocamBorder,
} from '@ringcentral/juno-icon';
import styled from 'styled-components';

type DefaultTabItem = Pick<
  TabItem,
  'symbol' | 'activeSymbol' | 'moreMenuSymbol'
>;

// TODO: should not set color in svg fill any more when switch to Juno icon or ready icon
const StyledContactIcon = styled(ContactIcon)`
  path {
    fill: currentColor !important;
  }
`;

const StyledContactHoverIcon = styled(ContactHoverIcon)`
  path {
    fill: currentColor !important;
  }
`;

export const defaultTabMap = {
  dialer: {
    symbol: DialPadIcon,
    activeSymbol: DialPadHoverIcon,
  } as DefaultTabItem,
  calls: {
    symbol: CallsIcon,
    activeSymbol: CallsHoverIcon,
  } as DefaultTabItem,
  history: {
    symbol: HistoryIcon,
    activeSymbol: HistoryHoverIcon,
  } as DefaultTabItem,
  messages: {
    symbol: MessageIcon,
    activeSymbol: MessageHoverIcon,
  } as DefaultTabItem,
  contacts: {
    // symbol: ContactsBorder,
    // activeSymbol: Contacts,
    symbol: StyledContactIcon,
    activeSymbol: StyledContactHoverIcon,
    moreMenuSymbol: ContactNavIcon,
  } as DefaultTabItem,
  meeting: {
    symbol: VideocamBorder,
    activeSymbol: Videocam,
    moreMenuSymbol: MeetingNavIcon,
  } as DefaultTabItem,
  settings: {
    symbol: SettingsBorder,
    activeSymbol: Settings,
    moreMenuSymbol: SettingsNavIcon,
  } as DefaultTabItem,
} as const;
