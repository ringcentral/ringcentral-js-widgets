import debounce from '@ringcentral-integration/commons/lib/debounce';
import React from 'react';

import CallList from '../CallList';
import CallListV2 from '../CallListV2';
import { Header } from '../Header';
import Panel from '../Panel';
import { SpinnerOverlay } from '../SpinnerOverlay';

import styles from './styles.scss';

const HEADER_HEIGHT = 38;
type CallsPanelProps = {
  brand: string;
  currentLocale: string;
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  calls: any[];
  areaCode: string;
  countryCode: string;
  onViewContact?: (...args: any[]) => any;
  onCreateContact?: (...args: any[]) => any;
  onClickToDial?: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  onLogCall?: (...args: any[]) => any;
  isLoggedContact?: (...args: any[]) => any;
  disableLinks: boolean;
  disableCallButton?: boolean;
  disableClickToDial?: boolean;
  outboundSmsPermission?: boolean;
  internalSmsPermission?: boolean;
  dateTimeFormatter: (...args: any[]) => any;
  showSpinner?: boolean;
  title?: string;
  active?: boolean;
  loggingMap?: object;
  webphoneAnswer?: (...args: any[]) => any;
  webphoneReject?: (...args: any[]) => any;
  webphoneHangup?: (...args: any[]) => any;
  webphoneResume?: (...args: any[]) => any;
  enableContactFallback?: boolean;
  autoLog?: boolean;
  showContactDisplayPlaceholder?: boolean;
  showCallerIdName?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  useNewList?: boolean;
  enableCDC?: boolean;
  formatPhone: (phoneNumber: string) => string | undefined;
  maxExtensionNumberLength: number;
};
type CallsPanelState = {
  contentHeight: number;
  contentWidth: number;
};
class CallsPanel extends React.PureComponent<CallsPanelProps, CallsPanelState> {
  _listWrapper: any;
  _mounted: any;
  constructor(props: any) {
    super(props);
    this.state = {
      contentHeight: 0,
      contentWidth: 0,
    };
    this._mounted = false;
    this._listWrapper = React.createRef();
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
    this._calculateContentSize();
    window.addEventListener('resize', this._onResize);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('resize', this._onResize);
  }
  _onResize = debounce(() => {
    if (this._mounted) {
      this._calculateContentSize();
    }
  }, 300);
  _calculateContentSize() {
    if (
      this._listWrapper &&
      this._listWrapper.current &&
      this._listWrapper.current.getBoundingClientRect
    ) {
      const react = this._listWrapper.current.getBoundingClientRect();
      this.setState({
        contentHeight: react.bottom - react.top - HEADER_HEIGHT,
        contentWidth: react.right - react.left,
      });
      return;
    }
    this.setState({
      contentHeight: 0,
      contentWidth: 0,
    });
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      brand,
      currentLocale,
      calls,
      areaCode,
      countryCode,
      onViewContact,
      onCreateContact,
      onLogCall,
      onClickToDial,
      onClickToSms,
      isLoggedContact,
      disableLinks,
      disableCallButton,
      disableClickToDial,
      outboundSmsPermission,
      internalSmsPermission,
      dateTimeFormatter,
      showSpinner,
      title,
      active,
      loggingMap,
      webphoneAnswer,
      webphoneReject,
      webphoneHangup,
      webphoneResume,
      enableContactFallback,
      autoLog,
      showContactDisplayPlaceholder,
      showCallerIdName,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      useNewList,
      currentSiteCode,
      isMultipleSiteEnabled,
      enableCDC,
      maxExtensionNumberLength,
      formatPhone,
    } = this.props;
    const { contentWidth, contentHeight } = this.state;
    const callsListView = useNewList ? (
      <CallListV2
        formatPhone={formatPhone}
        currentSiteCode={currentSiteCode}
        isMultipleSiteEnabled={isMultipleSiteEnabled}
        brand={brand}
        currentLocale={currentLocale}
        calls={calls}
        areaCode={areaCode}
        countryCode={countryCode}
        onViewContact={onViewContact}
        onCreateContact={onCreateContact}
        onLogCall={onLogCall}
        onClickToDial={onClickToDial}
        onClickToSms={onClickToSms}
        isLoggedContact={isLoggedContact}
        disableLinks={disableLinks}
        disableCallButton={disableCallButton}
        disableClickToDial={disableClickToDial}
        outboundSmsPermission={outboundSmsPermission}
        internalSmsPermission={internalSmsPermission}
        dateTimeFormatter={dateTimeFormatter}
        active={active}
        loggingMap={loggingMap}
        webphoneAnswer={webphoneAnswer}
        webphoneReject={webphoneReject}
        webphoneHangup={webphoneHangup}
        webphoneResume={webphoneResume}
        enableContactFallback={enableContactFallback}
        showCallerIdName={showCallerIdName}
        autoLog={autoLog}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        sourceIcons={sourceIcons}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
        width={contentWidth}
        height={contentHeight}
        // @ts-expect-error TS(2322): Type '{ formatPhone: (phoneNumber: string) => stri... Remove this comment to see the full error message
        useNewList={useNewList}
        enableCDC={enableCDC}
        maxExtensionNumberLength={maxExtensionNumberLength}
      />
    ) : (
      <CallList
        currentSiteCode={currentSiteCode}
        isMultipleSiteEnabled={isMultipleSiteEnabled}
        brand={brand}
        currentLocale={currentLocale}
        calls={calls}
        areaCode={areaCode}
        countryCode={countryCode}
        onViewContact={onViewContact}
        onCreateContact={onCreateContact}
        onLogCall={onLogCall}
        onClickToDial={onClickToDial}
        onClickToSms={onClickToSms}
        isLoggedContact={isLoggedContact}
        disableLinks={disableLinks}
        disableCallButton={disableCallButton}
        disableClickToDial={disableClickToDial}
        outboundSmsPermission={outboundSmsPermission}
        internalSmsPermission={internalSmsPermission}
        dateTimeFormatter={dateTimeFormatter}
        active={active}
        loggingMap={loggingMap}
        enableContactFallback={enableContactFallback}
        autoLog={autoLog}
        showCallerIdName={showCallerIdName}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        sourceIcons={sourceIcons}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
        maxExtensionNumberLength={maxExtensionNumberLength}
      />
    );
    const content = showSpinner ? <SpinnerOverlay /> : callsListView;
    return (
      <div className={styles.root} ref={this._listWrapper}>
        <Header>{title}</Header>
        <Panel className={styles.content}>{content}</Panel>
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
CallsPanel.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  onViewContact: undefined,
  onCreateContact: undefined,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  disableCallButton: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  showSpinner: false,
  title: '',
  active: false,
  isLoggedContact: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  showContactDisplayPlaceholder: true,
  showCallerIdName: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  useNewList: false,
  enableCDC: false,
};
export default CallsPanel;
