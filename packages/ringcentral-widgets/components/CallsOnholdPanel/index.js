import React from 'react';
import PropTypes from 'prop-types';
import ActiveCallItem from '../ActiveCallItem';
import CircleButton from '../CircleButton';
import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import styles from './styles.scss';
import i18n from './i18n';
import CombineIcon from '../../assets/images/Combine.svg';

class CallItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null,
    };
  }

  componentDidMount() {
    const { getAvatarUrl, contactMapping, call } = this.props;
    const nameMatches = (contactMapping && contactMapping[call.webphoneSession.to]) || [];
    let contact = call.webphoneSession.contactMatch;
    if (!contact) {
      contact = nameMatches && nameMatches[0];
    }
    getAvatarUrl(contact).then((avatarUrl) => {
      this.setState({ avatarUrl });
    });
  }

  render() {
    const {
      call,
      currentLocale,
      areaCode,
      countryCode,
      brand,
      showContactDisplayPlaceholder,
      formatPhone,
      onClickToSms,
      internalSmsPermission,
      outboundSmsPermission,
      isLoggedContact,
      onLogCall,
      onViewContact,
      onCreateContact,
      loggingMap,
      webphoneAnswer,
      webphoneReject,
      webphoneHangup,
      webphoneResume,
      webphoneToVoicemail,
      enableContactFallback,
      autoLog,
      sourceIcons,
      disableMerge,
      onMergeCall,
    } = this.props;
    return (
      <ActiveCallItem
        call={call}
        key={call.id}
        showMergeCall
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
        onCreateContact={onCreateContact}
        onMergeCall={onMergeCall}
        loggingMap={loggingMap}
        webphoneAnswer={webphoneAnswer}
        webphoneReject={webphoneReject}
        webphoneHangup={webphoneHangup}
        webphoneResume={webphoneResume}
        webphoneToVoicemail={webphoneToVoicemail}
        enableContactFallback={enableContactFallback}
        autoLog={autoLog}
        sourceIcons={sourceIcons}
        disableMerge={disableMerge}
        hasActionMenu={false}
        showAnswer={false}
        showAvatar
        showCallDetail={false}
        avatarUrl={this.state.avatarUrl}
      />
    );
  }
}

CallItem.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
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
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  disableMerge: PropTypes.bool,
  getAvatarUrl: PropTypes.func,
  onMergeCall: PropTypes.func,
  contactMapping: PropTypes.object,
  call: PropTypes.object,
};

CallItem.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
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
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  onClickToSms: undefined,
  onCreateContact: undefined,
  disableMerge: false,
  onMergeCall: i => i,
  getAvatarUrl: i => i,
  contactMapping: {},
  call: {},
};

export default function CallsOnholdContainer({
  calls,
  currentLocale,
  areaCode,
  countryCode,
  brand,
  showContactDisplayPlaceholder,
  formatPhone,
  onClickToSms,
  onCreateContact,
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
  webphoneToVoicemail,
  enableContactFallback,
  sourceIcons,
  disableMerge,
  onBackButtonClick,
  onMerge,
  onAdd,
  contactMapping,
  getAvatarUrl,
}) {
  const backHeader = (<BackHeader
    className={styles.header}
    onBackClick={onBackButtonClick}
    backButton={<BackButton label={i18n.getString('activeCall', currentLocale)} />}
  />);

  return (
    <div className={styles.root}>
      {backHeader}
      <div className={styles.callList}>
        {
          calls.length
            ? calls.map(call => (
              <CallItem
                call={call}
                key={call.id}
                showMergeCall
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
                onCreateContact={onCreateContact}
                onMergeCall={() => onMerge(call.webphoneSession.id)}
                loggingMap={loggingMap}
                webphoneAnswer={webphoneAnswer}
                webphoneReject={webphoneReject}
                webphoneHangup={webphoneHangup}
                webphoneResume={webphoneResume}
                webphoneToVoicemail={webphoneToVoicemail}
                enableContactFallback={enableContactFallback}
                autoLog={autoLog}
                sourceIcons={sourceIcons}
                disableMerge={disableMerge}
                hasActionMenu={false}
                showAnswer={false}
                getAvatarUrl={getAvatarUrl}
                contactMapping={contactMapping}
              />
            ))
            : <div className={styles.noCalls}>{i18n.getString('noCallsOnhold', currentLocale)}</div>
        }
      </div>
      <div className={styles.addBtnContainer}>
        <div className={styles.addBtn}>
          <span title={i18n.getString('add', currentLocale)} className={styles.webphoneButton}>
            <CircleButton
              className={styles.addBtnIcon}
              icon={CombineIcon}
              showBorder={false}
              onClick={onAdd}
            />
          </span>
        </div>
      </div>
    </div>
  );
}


CallsOnholdContainer.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  onMerge: PropTypes.func,
  calls: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
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
  onBackButtonClick: PropTypes.func,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  disableMerge: PropTypes.bool,
  onAdd: PropTypes.func,
  getAvatarUrl: PropTypes.func,
  contactMapping: PropTypes.object,
};

CallsOnholdContainer.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
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
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  onBackButtonClick: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onClickToSms: undefined,
  onCreateContact: undefined,
  disableMerge: false,
  getAvatarUrl: i => i,
  contactMapping: {},
};
