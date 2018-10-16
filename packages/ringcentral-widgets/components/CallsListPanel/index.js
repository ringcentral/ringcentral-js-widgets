import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerOverlay from '../SpinnerOverlay';
import ActiveCallItem from '../ActiveCallItem';
import { CallListV2 } from '../CallListV2';
import { CallList } from '../CallList';
import InsideModal from '../InsideModal';
import LogSection from '../LogSection';
import LogNotification from '../LogNotification';
import SearchInput from '../SearchInput';
import styles from './styles.scss';
import i18n from './i18n';

// TODO it is ActiveCallsPanel's function is the same, and remove ActiveCallsPanel after migration.

function ActiveCallList({
  calls,
  className,
  currentLocale,
  areaCode,
  countryCode,
  brand,
  showContactDisplayPlaceholder,
  formatPhone,
  onClickToSms,
  onCreateContact,
  onViewContact,
  createEntityTypes,
  outboundSmsPermission,
  internalSmsPermission,
  isLoggedContact,
  onLogCall,
  autoLog,
  loggingMap,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneToVoicemail,
  enableContactFallback,
  title,
  sourceIcons,
  disableLinks,
  renderContactName,
  renderExtraButton,
  contactDisplayStyle,
  externalViewEntity,
  externalHasEntity,
  readTextPermission,
}) {
  if (calls.length === 0) {
    return null;
  }
  return (
    <div className={classnames(styles.list, className)}>
      <div className={styles.listTitle}>{title}</div>
      {calls.map((call) => (
        <ActiveCallItem
          call={call}
          key={call.id}
          currentLocale={currentLocale}
          areaCode={areaCode}
          countryCode={countryCode}
          brand={brand}
          showContactDisplayPlaceholder={showContactDisplayPlaceholder}
          formatPhone={formatPhone}
          onClickToSms={onClickToSms}
          internalSmsPermission={internalSmsPermission}
          outboundSmsPermission={outboundSmsPermission}
          isLoggedContact={isLoggedContact}
          onLogCall={onLogCall}
          onViewContact={onViewContact}
          createEntityTypes={createEntityTypes}
          onCreateContact={onCreateContact}
          loggingMap={loggingMap}
          webphoneAnswer={webphoneAnswer}
          webphoneReject={webphoneReject}
          webphoneHangup={webphoneHangup}
          webphoneResume={webphoneResume}
          webphoneToVoicemail={webphoneToVoicemail}
          enableContactFallback={enableContactFallback}
          autoLog={autoLog}
          sourceIcons={sourceIcons}
          disableLinks={disableLinks}
          renderContactName={renderContactName}
          renderExtraButton={renderExtraButton}
          contactDisplayStyle={contactDisplayStyle}
          externalViewEntity={externalViewEntity}
          externalHasEntity={externalHasEntity}
          readTextPermission={readTextPermission}
        />
      ))}
    </div>
  );
}

ActiveCallList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  calls: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  createEntityTypes: PropTypes.array,
  onViewContact: PropTypes.func,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLoggedContact: PropTypes.func,
  onLogCall: PropTypes.func,
  loggingMap: PropTypes.object,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  sourceIcons: PropTypes.object,
  disableLinks: PropTypes.bool,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.func,
  readTextPermission: PropTypes.bool,
};

ActiveCallList.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  createEntityTypes: undefined,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  disableLinks: false,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
};

export default class CallsListPanel extends Component {
  constructor(props) {
    super(props);
    this._callListWrapper = React.createRef();
    this.state = {
      listWidth: 0,
      listHeight: 0,
    };
  }

  componentDidMount() {
    if (
      !this.hasCalls(this.props) &&
      typeof this.props.onCallsEmpty === 'function'
    ) {
      this.props.onCallsEmpty();
    }
    this.forceUpdate();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this._callListWrapper &&
  //     this._callListWrapper.current &&
  //     this._callListWrapper.current.getBoundingClientRect &&
  //     (this.state.listHeight !== prevState.listHeight &&
  //       this.state.listWidth !== prevState.listWidth)
  //   ) {
  //     const wrapperReact = this._callListWrapper.current.getBoundingClientRect();
  //     this.setState({
  //       listWidth: wrapperReact.right - wrapperReact.left,
  //       listHeight: wrapperReact.bottom - wrapperReact.top
  //     });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (
      this.hasCalls(this.props) &&
      !this.hasCalls(nextProps) &&
      typeof this.props.onCallsEmpty === 'function'
    ) {
      this.props.onCallsEmpty();
    }
  }

  hasCalls(props = this.props) {
    return (
      props.activeRingCalls.length > 0 ||
      props.activeOnHoldCalls.length > 0 ||
      props.activeCurrentCalls.length > 0 ||
      props.otherDeviceCalls.length > 0 ||
      props.calls.length > 0
    );
  }

  render() {
    const {
      useNewList,
      width,
      height,
      onlyHistory,
      activeRingCalls,
      activeOnHoldCalls,
      activeCurrentCalls,
      otherDeviceCalls,
      showSpinner,
      searchInput,
      onSearchInputChange,
      className,
      currentLocale,
      areaCode,
      countryCode,
      brand,
      showContactDisplayPlaceholder,
      formatPhone,
      onClickToSms,
      onCreateContact,
      createEntityTypes,
      onViewContact,
      outboundSmsPermission,
      internalSmsPermission,
      isLoggedContact,
      onLogCall,
      autoLog,
      loggingMap,
      webphoneAnswer,
      webphoneReject,
      webphoneHangup,
      webphoneResume,
      enableContactFallback,
      webphoneToVoicemail,
      sourceIcons,
      onClickToDial,
      disableLinks,
      disableClickToDial,
      dateTimeFormatter,
      calls,
      active,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      activeContactDisplayStyle,
      currentLog,
      additionalInfo,
      onCloseLogSection,
      onUpdateCallLog,
      onSaveCallLog,
      renderEditLogSection,
      renderSaveLogButton,
      logNotification,
      onCloseNotification,
      onDiscardNotification,
      onSaveNotification,
      onExpandNotification,
      showSaveLogBtn,
      showNotiLogButton,
      sectionContainerStyles,
      sectionModalStyles,
      notificationContainerStyles,
      externalViewEntity,
      externalHasEntity,
      readTextPermission,
      children,
    } = this.props;

    if (showSpinner) {
      return <SpinnerOverlay />;
    }
    const search = onSearchInputChange ? (
      <div className={classnames(styles.searchContainer)}>
        <SearchInput
          key="100"
          className={styles.searchInput}
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder={i18n.getString('searchPlaceholder', currentLocale)}
          disabled={disableLinks}
        />
      </div>
    ) : null;

    const logSection = currentLog ? (
      <div>
        <InsideModal
          title={currentLog.title}
          show={currentLog.showLog}
          onClose={onCloseLogSection}
          clickOutToClose={false}
          containerStyles={sectionContainerStyles}
          modalStyles={sectionModalStyles}
        >
          <LogSection
            currentLocale={currentLocale}
            currentLog={currentLog}
            additionalInfo={additionalInfo}
            isInnerMask={
              logNotification && logNotification.notificationIsExpand
            }
            renderEditLogSection={renderEditLogSection}
            renderSaveLogButton={renderSaveLogButton}
            formatPhone={formatPhone}
            onUpdateCallLog={onUpdateCallLog}
            onSaveCallLog={onSaveCallLog}
            showSaveLogBtn={showSaveLogBtn}
          />
        </InsideModal>
        {logNotification ? (
          <InsideModal
            show={logNotification.showNotification}
            showTitle={false}
            containerStyles={classnames(
              styles.notificationContainer,
              notificationContainerStyles,
            )}
            modalStyles={styles.notificationModal}
            contentStyle={styles.notificationContent}
            onClose={onCloseNotification}
          >
            <LogNotification
              showLogButton={showNotiLogButton}
              currentLocale={currentLocale}
              formatPhone={formatPhone}
              currentLog={logNotification}
              isExpand={logNotification.notificationIsExpand}
              onSave={onSaveNotification}
              onExpand={onExpandNotification}
              onDiscard={onDiscardNotification}
              onStay={onCloseNotification}
            />
          </InsideModal>
        ) : null}
      </div>
    ) : null;
    const isShowMessageIcon = readTextPermission && !!onClickToSms;
    const getCallList = (calls, title) => (
      <ActiveCallList
        title={title}
        calls={calls}
        currentLocale={currentLocale}
        areaCode={areaCode}
        countryCode={countryCode}
        brand={brand}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        formatPhone={formatPhone}
        onClickToSms={onClickToSms}
        onCreateContact={onCreateContact}
        createEntityTypes={createEntityTypes}
        onViewContact={onViewContact}
        outboundSmsPermission={outboundSmsPermission}
        internalSmsPermission={internalSmsPermission}
        isLoggedContact={isLoggedContact}
        onLogCall={onLogCall}
        autoLog={autoLog}
        loggingMap={loggingMap}
        webphoneAnswer={webphoneAnswer}
        webphoneReject={webphoneReject}
        webphoneHangup={webphoneHangup}
        webphoneResume={webphoneResume}
        webphoneToVoicemail={webphoneToVoicemail}
        enableContactFallback={enableContactFallback}
        sourceIcons={sourceIcons}
        disableLinks={disableLinks}
        renderContactName={renderContactName}
        renderExtraButton={renderExtraButton}
        contactDisplayStyle={activeContactDisplayStyle}
        externalViewEntity={externalViewEntity}
        externalHasEntity={externalHasEntity}
        readTextPermission={isShowMessageIcon}
      />
    );

    const historyCall = showSpinner ? (
      <SpinnerOverlay />
    ) : (
      <div
        className={classnames(styles.list, className)}
        ref={this._callListWrapper}
      >
        <div className={styles.listTitle}>
          {onlyHistory ? null : i18n.getString('historyCalls', currentLocale)}
        </div>
        {useNewList ? (
          <CallListV2
            width={width}
            height={height}
            brand={brand}
            currentLocale={currentLocale}
            calls={calls}
            areaCode={areaCode}
            countryCode={countryCode}
            onViewContact={onViewContact}
            onCreateContact={onCreateContact}
            createEntityTypes={createEntityTypes}
            onLogCall={onLogCall}
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            isLoggedContact={isLoggedContact}
            disableLinks={disableLinks}
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
            renderContactName={renderContactName}
            renderExtraButton={renderExtraButton}
            contactDisplayStyle={contactDisplayStyle}
            externalViewEntity={externalViewEntity}
            externalHasEntity={externalHasEntity}
            readTextPermission={isShowMessageIcon}
          />
        ) : (
          <CallList
            brand={brand}
            currentLocale={currentLocale}
            calls={calls}
            areaCode={areaCode}
            countryCode={countryCode}
            onViewContact={onViewContact}
            onCreateContact={onCreateContact}
            createEntityTypes={createEntityTypes}
            onLogCall={onLogCall}
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            isLoggedContact={isLoggedContact}
            disableLinks={disableLinks}
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
            renderContactName={renderContactName}
            renderExtraButton={renderExtraButton}
            contactDisplayStyle={contactDisplayStyle}
            externalViewEntity={externalViewEntity}
            externalHasEntity={externalHasEntity}
            readTextPermission={isShowMessageIcon}
          />
        )}
      </div>
    );

    const noCalls = (
      <p className={styles.noCalls}>
        {i18n.getString('noCalls', currentLocale)}
      </p>
    );

    return (
      <div
        className={classnames(
          styles.container,
          onSearchInputChange ? styles.containerWithSearch : null,
        )}
      >
        {children}
        {search}
        <div
          className={classnames(
            styles.root,
            currentLog && currentLog.showLog ? styles.hiddenScroll : '',
            className,
          )}
        >
          {onlyHistory ||
            getCallList(
              activeRingCalls,
              i18n.getString('ringCall', currentLocale),
            )}
          {onlyHistory ||
            getCallList(
              activeCurrentCalls,
              i18n.getString('currentCall', currentLocale),
            )}
          {onlyHistory ||
            getCallList(
              activeOnHoldCalls,
              i18n.getString('onHoldCall', currentLocale),
            )}
          {onlyHistory ||
            getCallList(
              otherDeviceCalls,
              i18n.getString('otherDeviceCall', currentLocale),
            )}
          {calls.length > 0 ? historyCall : noCalls}
        </div>
        {logSection}
      </div>
    );
  }
}

CallsListPanel.propTypes = {
  useNewList: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeRingCalls: PropTypes.array.isRequired,
  activeOnHoldCalls: PropTypes.array.isRequired,
  activeCurrentCalls: PropTypes.array.isRequired,
  otherDeviceCalls: PropTypes.array.isRequired,
  onSearchInputChange: PropTypes.func,
  searchInput: PropTypes.string,
  showSpinner: PropTypes.bool.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  createEntityTypes: PropTypes.array,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLoggedContact: PropTypes.func,
  onLogCall: PropTypes.func,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  autoLog: PropTypes.bool,
  onViewContact: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  loggingMap: PropTypes.object,
  onCallsEmpty: PropTypes.func,
  sourceIcons: PropTypes.object,
  calls: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickToDial: PropTypes.func,
  disableLinks: PropTypes.bool.isRequired,
  disableClickToDial: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  active: PropTypes.bool,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  activeContactDisplayStyle: PropTypes.string,
  currentLog: PropTypes.object,
  additionalInfo: PropTypes.object,
  onCloseLogSection: PropTypes.func,
  onUpdateCallLog: PropTypes.func,
  onSaveCallLog: PropTypes.func,
  renderEditLogSection: PropTypes.func,
  renderSaveLogButton: PropTypes.func,
  logNotification: PropTypes.object,
  onCloseNotification: PropTypes.func,
  onDiscardNotification: PropTypes.func,
  onSaveNotification: PropTypes.func,
  onExpandNotification: PropTypes.func,
  showSaveLogBtn: PropTypes.bool,
  showNotiLogButton: PropTypes.bool,
  sectionContainerStyles: PropTypes.string,
  sectionModalStyles: PropTypes.string,
  notificationContainerStyles: PropTypes.string,
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.func,
  readTextPermission: PropTypes.bool,
  children: PropTypes.node,
  onlyHistory: PropTypes.bool,
};

CallsListPanel.defaultProps = {
  useNewList: false,
  width: undefined,
  height: undefined,
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onSearchInputChange: undefined,
  searchInput: '',
  onLogCall: undefined,
  onViewContact: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false,
  onCallsEmpty: undefined,
  sourceIcons: undefined,
  onClickToDial: undefined,
  disableClickToDial: false,
  active: false,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: styles.contactDisplay,
  activeContactDisplayStyle: styles.activeContactDisplay,
  currentLog: undefined,
  additionalInfo: undefined,
  onCloseLogSection: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showSaveLogBtn: true,
  showNotiLogButton: true,
  sectionContainerStyles: undefined,
  sectionModalStyles: undefined,
  notificationContainerStyles: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  children: null,
  onlyHistory: false,
};
