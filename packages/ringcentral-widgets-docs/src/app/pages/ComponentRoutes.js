import { RcThemeProvider } from '@ringcentral/juno';
import React from 'react';
import { Route } from 'react-router-dom';

import ActionMenuPage from './Components/ActionMenu';
import ActiveCallActionMenuPage from './Components/ActiveCallActionMenu';
import ActiveCallBadgePage from './Components/ActiveCallBadge';
import ActiveCallButtonPage from './Components/ActiveCallButton';
import ActiveCallDialPadPage from './Components/ActiveCallDialPad';
import ActiveCallItemPage from './Components/ActiveCallItem';
import ActiveCallPadPage from './Components/ActiveCallPad';
import ActiveCallPanelPage from './Components/ActiveCallPanel';
import ActiveCallsPanelPage from './Components/ActiveCallsPanel';
import AlertDisplayPage from './Components/AlertDisplay';
import AnimationAlertPage from './Components/AnimationAlert';
import AudioSettingsAlertPage from './Components/AudioSettingsAlert';
import AudioSettingsPanelPage from './Components/AudioSettingsPanel';
import AuthAlertPage from './Components/AuthAlert';
import BackHeaderPage from './Components/BackHeader';
import BadgePage from './Components/Badge';
import ButtonPage from './Components/Button';
import CallAlertPage from './Components/CallAlert';
import CallAvatarPage from './Components/CallAvatar';
import CallCtrlPanelPage from './Components/CallCtrlPanel';
import CallingSettingsAlertPage from './Components/CallingSettingsAlert';
import CallingSettingsPanelPage from './Components/CallingSettingsPanel';
import CallItemPage from './Components/CallItem';
import CallListPage from './Components/CallList';
import CallsListPanelPage from './Components/CallsListPanel';
import CallsPanelPage from './Components/CallsPanel';
import CheckBoxPage from './Components/CheckBox';
import CircleButtonPage from './Components/CircleButton';
import ComposeTextPanelPage from './Components/ComposeTextPanel';
import ConnectivityAlertPage from './Components/ConnectivityAlert';
import ConnectivityBadgePage from './Components/ConnectivityBadge';
import ContactDetailsPage from './Components/ContactDetails';
import ContactDisplayPage from './Components/ContactDisplay';
import ContactDropdownListPage from './Components/ContactDropdownList';
import ContactItemPage from './Components/ContactItem';
import ContactListPage from './Components/ContactList';
import ContactsViewPage from './Components/ContactsView';
import ConversationListPage from './Components/ConversationList';
import ConversationMessageListPage from './Components/ConversationMessageList';
import ConversationPanelPage from './Components/ConversationPanel';
import ConversationsPanelPage from './Components/ConversationsPanel';
import CopyToClipboardPage from './Components/CopyToClipboard';
import DatePickerPage from './Components/DatePicker';
import DialButtonPage from './Components/DialButton';
import DialerPanelPage from './Components/DialerPanel';
import DialPadPage from './Components/DialPad';
import DialTextInputPage from './Components/DialTextInput';
import DraggablePage from './Components/Draggable';
import DropdownNavigationItemPage from './Components/DropdownNavigationItem';
import DropdownNavigationViewPage from './Components/DropdownNavigationView';
import DropdownSelectPage from './Components/DropdownSelect';
import DurationCounterPage from './Components/DurationCounter';
import EntityButtonPage from './Components/EntityButton';
import EntityModalPage from './Components/EntityModal';
import EnvironmentPage from './Components/Environment';
import EulaPage from './Components/Eula';
import FeedbackPanelPage from './Components/FeedbackPanel';
import FlipPanelPage from './Components/FlipPanel';
import FooterPage from './Components/Footer';
import FormattedMessagePage from './Components/FormattedMessage';
import ForwardFormPage from './Components/ForwardForm';
import FromFieldPage from './Components/FromField';
import HeaderPage from './Components/Header';
import IconFieldPage from './Components/IconField';
import IconLinePage from './Components/IconLine';
import IncomingCallPadPage from './Components/IncomingCallPad';
import IncomingCallPanelPage from './Components/IncomingCallPanel';
import InputFieldPage from './Components/InputField';
import InputLinePage from './Components/InputLine';
import LinePage from './Components/Line';
import LinkLinePage from './Components/LinkLine';
import LocalePickerPage from './Components/LocalePicker';
import LogBasicInfoPage from './Components/LogBasicInfo';
import LogButtonPage from './Components/LogButton';
import LogIconPage from './Components/LogIcon';
import LoginPanelPage from './Components/LoginPanel';
import LogNotificationPage from './Components/LogNotification';
import LogSectionPage from './Components/LogSection';
import MeetingAlertPage from './Components/MeetingAlert';
import MeetingPanelPage from './Components/MeetingPanel';
import MeetingScheduleButtonPage from './Components/MeetingScheduleButton';
import MeetingSectionPage from './Components/MeetingSection';
import MessagePage from './Components/Message';
import MessageInputPage from './Components/MessageInput';
import MessageItemPage from './Components/MessageItem';
import MessageSenderAlertPage from './Components/MessageSenderAlert';
import MessageStoreAlertPage from './Components/MessageStoreAlert';
import MessageTabButtonPage from './Components/MessageTabButton';
import ModalPage from './Components/Modal';
import MultiCallAnswerButtonPage from './Components/MultiCallAnswerButton';
import NavigationBarPage from './Components/NavigationBar';
import PanelPage from './Components/Panel';
import PermissionsAlertPage from './Components/PermissionsAlert';
import PresenceItemPage from './Components/PresenceItem';
import PresenceSettingSectionPage from './Components/PresenceSettingSection';
import PresenceStatusIconPage from './Components/PresenceStatusIcon';
import RadioBtnGroupPage from './Components/RadioBtnGroup';
import RateExceededAlertPage from './Components/RateExceededAlert';
import RecentActivityCallsPage from './Components/RecentActivityCalls';
import RecentActivityMessagesPage from './Components/RecentActivityMessages';
import RecentActivityNavigationButtonPage from './Components/RecentActivityNavigationButton';
import RecentActivityPanelPage from './Components/RecentActivityPanel';
import RecentActivityViewPage from './Components/RecentActivityView';
import RecipientsInputPage from './Components/RecipientsInput';
import RegionSettingsAlertPage from './Components/RegionSettingsAlert';
import RegionSettingsPanelPage from './Components/RegionSettingsPanel';
import RemoveButtonPage from './Components/RemoveButton';
import ReplyWithMessagePage from './Components/ReplyWithMessage';
import SaveButtonPage from './Components/SaveButton';
import SearchInputPage from './Components/SearchInput';
import SelectPage from './Components/Select';
import SettingsPanelPage from './Components/SettingsPanel';
import SlideMenuPage from './Components/SlideMenu';
import SlideoutBarPage from './Components/SlideoutBar';
import SpinnerPage from './Components/Spinner';
import SpinnerOverlayPage from './Components/SpinnerOverlay';
import SwitchPage from './Components/Switch';
import TabNavigationButtonPage from './Components/TabNavigationButton';
import TabNavigationViewPage from './Components/TabNavigationView';
import TextInputPage from './Components/TextInput';
import ToFieldPage from './Components/ToField';
import TransferPanelPage from './Components/TransferPanel';
import UserGuidePage from './Components/UserGuide';
import VoicemailPlayerPage from './Components/VoicemailPlayer';
import WebphoneAlertPage from './Components/WebphoneAlert';

const Routes = () => (
  <RcThemeProvider>
    <Route path="/components/ActionMenu" component={ActionMenuPage} />
    <Route
      path="/components/ActiveCallActionMenu"
      component={ActiveCallActionMenuPage}
    />
    <Route path="/components/ActiveCallBadge" component={ActiveCallBadgePage} />
    <Route
      path="/components/ActiveCallButton"
      component={ActiveCallButtonPage}
    />
    <Route
      path="/components/ActiveCallDialPad"
      component={ActiveCallDialPadPage}
    />
    <Route path="/components/ActiveCallItem" component={ActiveCallItemPage} />
    <Route path="/components/ActiveCallPad" component={ActiveCallPadPage} />
    <Route path="/components/ActiveCallPanel" component={ActiveCallPanelPage} />
    <Route
      path="/components/ActiveCallsPanel"
      component={ActiveCallsPanelPage}
    />
    <Route path="/components/AlertDisplay" component={AlertDisplayPage} />
    <Route path="/components/AnimationAlert" component={AnimationAlertPage} />
    <Route
      path="/components/AudioSettingsAlert"
      component={AudioSettingsAlertPage}
    />
    <Route
      path="/components/AudioSettingsPanel"
      component={AudioSettingsPanelPage}
    />
    <Route path="/components/AuthAlert" component={AuthAlertPage} />
    <Route path="/components/BackHeader" component={BackHeaderPage} />
    <Route path="/components/Badge" component={BadgePage} />
    <Route path="/components/Button" component={ButtonPage} />
    <Route path="/components/CallAlert" component={CallAlertPage} />
    <Route path="/components/CallAvatar" component={CallAvatarPage} />
    <Route path="/components/CallCtrlPanel" component={CallCtrlPanelPage} />
    <Route path="/components/CallItem" component={CallItemPage} />
    <Route path="/components/CallList" component={CallListPage} />
    <Route
      path="/components/CallingSettingsAlert"
      component={CallingSettingsAlertPage}
    />
    <Route
      path="/components/CallingSettingsPanel"
      component={CallingSettingsPanelPage}
    />
    <Route path="/components/CallsListPanel" component={CallsListPanelPage} />
    <Route path="/components/CallsPanel" component={CallsPanelPage} />
    <Route path="/components/CheckBox" component={CheckBoxPage} />
    <Route path="/components/CircleButton" component={CircleButtonPage} />
    <Route
      path="/components/ComposeTextPanel"
      component={ComposeTextPanelPage}
    />
    <Route
      path="/components/ConnectivityAlert"
      component={ConnectivityAlertPage}
    />
    <Route path="/components/ContactDetails" component={ContactDetailsPage} />
    <Route path="/components/ContactDisplay" component={ContactDisplayPage} />
    <Route
      path="/components/ContactDropdownList"
      component={ContactDropdownListPage}
    />
    <Route path="/components/ContactItem" component={ContactItemPage} />
    <Route path="/components/ContactList" component={ContactListPage} />
    <Route path="/components/ContactsView" component={ContactsViewPage} />
    <Route
      path="/components/ConversationList"
      component={ConversationListPage}
    />
    <Route
      path="/components/ConversationMessageList"
      component={ConversationMessageListPage}
    />
    <Route
      path="/components/ConversationPanel"
      component={ConversationPanelPage}
    />
    <Route
      path="/components/ConversationsPanel"
      component={ConversationsPanelPage}
    />
    <Route path="/components/CopyToClipboard" component={CopyToClipboardPage} />
    <Route path="/components/DatePicker" component={DatePickerPage} />
    <Route path="/components/DialButton" component={DialButtonPage} />
    <Route path="/components/DialPad" component={DialPadPage} />
    <Route path="/components/DialTextInput" component={DialTextInputPage} />
    <Route path="/components/DialerPanel" component={DialerPanelPage} />
    <Route path="/components/Draggable" component={DraggablePage} />
    <Route
      path="/components/DropdownNavigationItem"
      component={DropdownNavigationItemPage}
    />
    <Route
      path="/components/DropdownNavigationView"
      component={DropdownNavigationViewPage}
    />
    <Route path="/components/DropdownSelect" component={DropdownSelectPage} />
    <Route path="/components/DurationCounter" component={DurationCounterPage} />
    <Route path="/components/EntityButton" component={EntityButtonPage} />
    <Route path="/components/EntityModal" component={EntityModalPage} />
    <Route path="/components/Environment" component={EnvironmentPage} />
    <Route path="/components/Eula" component={EulaPage} />
    <Route path="/components/FeedbackPanel" component={FeedbackPanelPage} />
    <Route path="/components/FlipPanel" component={FlipPanelPage} />
    <Route path="/components/Footer" component={FooterPage} />
    <Route
      path="/components/FormattedMessage"
      component={FormattedMessagePage}
    />
    <Route path="/components/ForwardForm" component={ForwardFormPage} />
    <Route path="/components/FromField" component={FromFieldPage} />
    <Route path="/components/Header" component={HeaderPage} />
    <Route path="/components/IconField" component={IconFieldPage} />
    <Route path="/components/IconLine" component={IconLinePage} />
    <Route path="/components/IncomingCallPad" component={IncomingCallPadPage} />
    <Route
      path="/components/IncomingCallPanel"
      component={IncomingCallPanelPage}
    />
    <Route path="/components/InputField" component={InputFieldPage} />
    <Route path="/components/InputLine" component={InputLinePage} />
    <Route path="/components/Line" component={LinePage} />
    <Route path="/components/LinkLine" component={LinkLinePage} />
    <Route path="/components/LocalePicker" component={LocalePickerPage} />
    <Route path="/components/LogBasicInfo" component={LogBasicInfoPage} />
    <Route path="/components/LogButton" component={LogButtonPage} />
    <Route path="/components/LogIcon" component={LogIconPage} />
    <Route path="/components/LogNotification" component={LogNotificationPage} />
    <Route path="/components/LogSection" component={LogSectionPage} />
    <Route path="/components/LoginPanel" component={LoginPanelPage} />
    <Route path="/components/MeetingAlert" component={MeetingAlertPage} />
    <Route path="/components/MeetingPanel" component={MeetingPanelPage} />
    <Route
      path="/components/MeetingScheduleButton"
      component={MeetingScheduleButtonPage}
    />
    <Route path="/components/MeetingSection" component={MeetingSectionPage} />
    <Route path="/components/Message" component={MessagePage} />
    <Route path="/components/MessageInput" component={MessageInputPage} />
    <Route path="/components/MessageItem" component={MessageItemPage} />
    <Route
      path="/components/MessageSenderAlert"
      component={MessageSenderAlertPage}
    />
    <Route
      path="/components/MessageStoreAlert"
      component={MessageStoreAlertPage}
    />
    <Route
      path="/components/MessageTabButton"
      component={MessageTabButtonPage}
    />
    <Route path="/components/Modal" component={ModalPage} />
    <Route
      path="/components/MultiCallAnswerButton"
      component={MultiCallAnswerButtonPage}
    />
    <Route path="/components/NavigationBar" component={NavigationBarPage} />
    <Route path="/components/Panel" component={PanelPage} />
    <Route path="/components/PresenceItem" component={PresenceItemPage} />
    <Route
      path="/components/PresenceSettingSection"
      component={PresenceSettingSectionPage}
    />
    <Route
      path="/components/PresenceStatusIcon"
      component={PresenceStatusIconPage}
    />
    <Route path="/components/RadioBtnGroup" component={RadioBtnGroupPage} />
    <Route
      path="/components/RateExceededAlert"
      component={RateExceededAlertPage}
    />
    <Route
      path="/components/RecentActivityCalls"
      component={RecentActivityCallsPage}
    />
    <Route
      path="/components/RecentActivityMessages"
      component={RecentActivityMessagesPage}
    />
    <Route
      path="/components/RecentActivityNavigationButton"
      component={RecentActivityNavigationButtonPage}
    />
    <Route
      path="/components/RecentActivityPanel"
      component={RecentActivityPanelPage}
    />
    <Route
      path="/components/RecentActivityView"
      component={RecentActivityViewPage}
    />
    <Route path="/components/RecipientsInput" component={RecipientsInputPage} />
    <Route
      path="/components/RegionSettingsAlert"
      component={RegionSettingsAlertPage}
    />
    <Route
      path="/components/RegionSettingsPanel"
      component={RegionSettingsPanelPage}
    />
    <Route path="/components/RemoveButton" component={RemoveButtonPage} />
    <Route
      path="/components/ReplyWithMessage"
      component={ReplyWithMessagePage}
    />
    <Route
      path="/components/PermissionsAlert"
      component={PermissionsAlertPage}
    />
    <Route path="/components/SaveButton" component={SaveButtonPage} />
    <Route path="/components/SearchInput" component={SearchInputPage} />
    <Route path="/components/Select" component={SelectPage} />
    <Route path="/components/SettingsPanel" component={SettingsPanelPage} />
    <Route path="/components/SlideMenu" component={SlideMenuPage} />
    <Route path="/components/SlideoutBar" component={SlideoutBarPage} />
    <Route path="/components/Spinner" component={SpinnerPage} />
    <Route path="/components/SpinnerOverlay" component={SpinnerOverlayPage} />
    <Route path="/components/Switch" component={SwitchPage} />
    <Route
      path="/components/TabNavigationButton"
      component={TabNavigationButtonPage}
    />
    <Route
      path="/components/TabNavigationView"
      component={TabNavigationViewPage}
    />
    <Route path="/components/TextInput" component={TextInputPage} />
    <Route path="/components/ToField" component={ToFieldPage} />
    <Route path="/components/TransferPanel" component={TransferPanelPage} />
    <Route path="/components/UserGuide" component={UserGuidePage} />
    <Route path="/components/VoicemailPlayer" component={VoicemailPlayerPage} />
    <Route path="/components/WebphoneAlert" component={WebphoneAlertPage} />
    <Route
      path="/components/ConnectivityBadge"
      component={ConnectivityBadgePage}
    />
  </RcThemeProvider>
);

export default Routes;
