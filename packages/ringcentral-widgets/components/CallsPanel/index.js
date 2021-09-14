import React from 'react';
import PropTypes from 'prop-types';
import debounce from '@ringcentral-integration/commons/lib/debounce';
import { Header } from '../Header';
import Panel from '../Panel';
import { SpinnerOverlay } from '../SpinnerOverlay';
import CallList from '../CallList';
import CallListV2 from '../CallListV2';

import styles from './styles.scss';

const HEADER_HEIGHT = 38;

export default class CallsPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      contentHeight: 0,
      contentWidth: 0,
    };

    this._mounted = false;
    this._listWrapper = React.createRef();
  }

  componentDidMount() {
    this._mounted = true;
    this._calculateContentSize();
    window.addEventListener('resize', this._onResize);
  }

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
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      useNewList,
      currentSiteCode,
      isMultipleSiteEnabled,
      enableCDC,
    } = this.props;

    const { contentWidth, contentHeight } = this.state;

    const callsListView = useNewList ? (
      <CallListV2
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
        autoLog={autoLog}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        sourceIcons={sourceIcons}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
        width={contentWidth}
        height={contentHeight}
        useNewList={useNewList}
        enableCDC={enableCDC}
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
        webphoneAnswer={webphoneAnswer}
        webphoneReject={webphoneReject}
        webphoneHangup={webphoneHangup}
        webphoneResume={webphoneResume}
        enableContactFallback={enableContactFallback}
        autoLog={autoLog}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        sourceIcons={sourceIcons}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
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

CallsPanel.propTypes = {
  brand: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  currentSiteCode: PropTypes.string,
  isMultipleSiteEnabled: PropTypes.bool,
  calls: PropTypes.arrayOf(PropTypes.any).isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  onLogCall: PropTypes.func,
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool.isRequired,
  disableCallButton: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
  title: PropTypes.string,
  active: PropTypes.bool,
  loggingMap: PropTypes.object,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  useNewList: PropTypes.bool,
  enableCDC: PropTypes.bool,
};

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
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  useNewList: false,
  enableCDC: false,
};
