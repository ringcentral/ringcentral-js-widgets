import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

/* eslint-disable react/destructuring-assignment */
import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import messageDirection from '@ringcentral-integration/commons/enums/messageDirection';
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
import {
  isInbound,
  isMissed,
  isRinging,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import parseNumber from '@ringcentral-integration/commons/lib/parseNumber';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import FaxInboundIcon from '../../assets/images/FaxInbound.svg';
import FaxOutboundIcon from '../../assets/images/FaxOutbound.svg';
import { checkShouldHideContactUser } from '../../lib/checkShouldHideContactUser';
import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';
import formatDuration from '../../lib/formatDuration';
import ActionMenu from '../ActionMenu';
import ContactDisplay from '../ContactDisplay';
import DurationCounter from '../DurationCounter';
import i18n from './i18n';
import styles from './styles.scss';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  missed: dynamicsFont.missed,
};

const CallIcon = ({
  direction,
  missed,
  active,
  ringing,
  inboundTitle,
  outboundTitle,
  missedTitle,
  type,
}) => {
  let icon = null;
  switch (type) {
    case messageTypes.fax: {
      icon =
        direction === messageDirection.inbound ? (
          <span title={inboundTitle}>
            <FaxInboundIcon width={21} />
          </span>
        ) : (
          <span title={outboundTitle}>
            <FaxOutboundIcon width={21} />
          </span>
        );
      break;
    }
    default: {
      let title = null;
      if (missed) {
        title = missedTitle;
      } else if (direction === callDirections.inbound) {
        title = inboundTitle;
      } else {
        title = outboundTitle;
      }
      icon = (
        <span
          className={classnames(
            missed ? callIconMap.missed : callIconMap[direction],
            active && styles.activeCall,
            ringing && styles.ringing,
            missed && styles.missed,
          )}
          title={title}
        />
      );
    }
  }
  return <div className={styles.callIcon}>{icon}</div>;
};
CallIcon.propTypes = {
  direction: PropTypes.string.isRequired,
  missed: PropTypes.bool,
  active: PropTypes.bool,
  ringing: PropTypes.bool,
  inboundTitle: PropTypes.string,
  outboundTitle: PropTypes.string,
  missedTitle: PropTypes.string,
  type: PropTypes.string,
};
CallIcon.defaultProps = {
  missed: false,
  active: false,
  ringing: false,
  inboundTitle: '',
  outboundTitle: '',
  missedTitle: '',
  type: '',
};

class CallItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.getInitialContactIndex(),
      isLogging: false,
      isCreating: false,
      loading: true,
      extended: false,
    };
    this._userSelection = false;
  }

  componentDidMount() {
    this._mounted = true;
    this._loadingTimeout = setTimeout(() => {
      // clear timeout is probably not necessary
      if (this._mounted) {
        this.setState({
          loading: false,
        });
      }
    }, 10);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { call, extended } = this.props;
    if (
      !this._userSelection &&
      (nextProps.call.activityMatches !== call.activityMatches ||
        nextProps.call.fromMatches !== call.fromMatches ||
        nextProps.call.toMatches !== call.toMatches)
    ) {
      this.setState({
        selected: this.getInitialContactIndex(nextProps),
      });
    }
    if (extended !== nextProps.extended && extended !== nextProps.extended) {
      this.setState({
        extended: nextProps.extended,
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this._loadingTimeout) {
      clearTimeout(this._loadingTimeout);
      this._loadingTimeout = null;
    }
  }

  onSelectContact = (value, idx) => {
    const { showContactDisplayPlaceholder, autoLog } = this.props;
    const selected = showContactDisplayPlaceholder
      ? parseInt(idx, 10) - 1
      : parseInt(idx, 10);
    this._userSelection = true;
    this.setState({
      selected,
    });
    if (autoLog) {
      this.logCall({ redirect: false, selected });
    }
  };

  toggleExtended = (e) => {
    if (this.contactDisplay && this.contactDisplay.contains(e.target)) {
      return;
    }
    const { onSizeChanged, renderIndex } = this.props;
    if (onSizeChanged) {
      onSizeChanged(renderIndex);
    } else {
      this.setState((state) => ({
        extended: !state.extended,
      }));
    }
  };

  getInitialContactIndex(nextProps = this.props) {
    const contactMatches = this.getContactMatches(nextProps);
    const { isLoggedContact, showContactDisplayPlaceholder } = this.props;
    const activityMatches = nextProps.call.activityMatches;
    // console.log('getInitialContactIndex:', nextProps.call.toNumberEntity);
    for (const activity of activityMatches) {
      const index = contactMatches.findIndex((contact) =>
        // TODO find a better name or mechanism...
        isLoggedContact(nextProps.call, activity, contact),
      );
      if (index > -1) return index;
    }
    if (nextProps.call.toNumberEntity) {
      const index = contactMatches.findIndex(
        (contact) => contact.id === nextProps.call.toNumberEntity,
      );
      return index;
    }
    return showContactDisplayPlaceholder ? -1 : 0;
  }

  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.getContactMatches();
    return (
      (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null
    );
  };

  getPhoneNumber() {
    return isInbound(this.props.call)
      ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber
      : this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
  }

  getContactMatches(nextProps = this.props) {
    return isInbound(nextProps.call)
      ? nextProps.call.fromMatches
      : nextProps.call.toMatches;
  }

  getFallbackContactName() {
    return isInbound(this.props.call)
      ? this.props.call.from.name
      : this.props.call.to.name;
  }

  async logCall(redirect = true, selected = this.state.selected) {
    if (
      typeof this.props.onLogCall === 'function' &&
      this._mounted &&
      !this.state.isLogging
    ) {
      this.setState({
        isLogging: true,
      });
      await this.props.onLogCall({
        contact: this.getSelectedContact(selected),
        call: this.props.call,
        redirect,
      });
      if (this._mounted) {
        this.setState({
          isLogging: false,
        });
      }
    }
  }

  logCall = this.logCall.bind(this);

  viewSelectedContact = () => {
    if (typeof this.props.onViewContact === 'function') {
      const { call } = this.props;
      const activityMatches = (call && call.activityMatches) || [];
      this.props.onViewContact({
        activityMatches,
        contactMatches: this.getContactMatches(),
        contact: this.getSelectedContact(),
        phoneNumber: this.getPhoneNumber(),
      });
    }
  };

  createSelectedContact = async (entityType) => {
    // console.log('click createSelectedContact!!', entityType);
    if (
      typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      !this.state.isCreating
    ) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      await this.props.onCreateContact({
        phoneNumber,
        name: this.props.enableContactFallback
          ? this.getFallbackContactName()
          : '',
        entityType,
      });

      if (this._mounted) {
        this.setState({
          isCreating: false,
        });
        // console.log('created: isCreating...', this.state.isCreating);
      }
    }
  };

  clickToSms = ({ countryCode, areaCode }) => {
    if (this.props.onClickToSms) {
      const phoneNumber = this.getPhoneNumber();
      const contact = this.getSelectedContact();
      if (contact) {
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      } else {
        const formatted = formatNumber({
          phoneNumber,
          countryCode,
          areaCode,
        });
        this.props.onClickToSms(
          {
            name: this.props.enableContactFallback
              ? this.getFallbackContactName()
              : formatted,
            phoneNumber,
          },
          true,
        );
      }
    }
  };

  clickToDial = () => {
    if (this.props.onClickToDial) {
      const contact = this.getSelectedContact() || {};
      const phoneNumber = this.getPhoneNumber();

      if (phoneNumber) {
        this.props.onClickToDial({
          ...contact,
          phoneNumber,
        });
      }
    }
  };

  externalViewEntity = () => this.props.externalViewEntity(this.props.call);

  render() {
    if (this.state.loading) {
      return <div className={styles.root} />;
    }
    const {
      call: {
        direction,
        telephonyStatus,
        result,
        startTime,
        duration,
        activityMatches,
        offset,
        type,
        toName,
      },
      brand,
      currentLocale,
      currentSiteCode,
      isMultipleSiteEnabled,
      areaCode,
      countryCode,
      disableLinks,
      disableCallButton,
      disableClickToDial,
      outboundSmsPermission,
      internalSmsPermission,
      active,
      onViewContact,
      onCreateContact,
      createEntityTypes,
      onLogCall,
      onClickToDial,
      onClickToSms,
      dateTimeFormatter,
      isLogging,
      enableContactFallback,
      showContactDisplayPlaceholder,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      externalViewEntity,
      externalHasEntity,
      readTextPermission,
      withAnimation,
      showChooseEntityModal,
      enableCDC,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const shouldHideNumber =
      enableCDC && checkShouldHidePhoneNumber(phoneNumber, contactMatches);
    const isContactMatchesHidden =
      enableCDC && checkShouldHideContactUser(contactMatches);
    const fallbackContactName = this.getFallbackContactName();
    const ringing = isRinging(this.props.call);
    const missed = isInbound(this.props.call) && isMissed(this.props.call);
    const parsedInfo = parseNumber({
      phoneNumber,
      countryCode,
      areaCode,
    });
    const isExtension =
      !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= 6;
    const disableClickToSms = !(
      onClickToSms &&
      (isExtension ? internalSmsPermission : outboundSmsPermission)
    );

    let durationEl = null;
    if (typeof duration === 'undefined') {
      durationEl = disableLinks ? (
        i18n.getString('unavailable', currentLocale)
      ) : (
        <DurationCounter startTime={startTime} offset={offset} />
      );
    } else {
      durationEl = formatDuration(duration);
    }
    let dateEl = '';
    if (!active) {
      dateEl = dateTimeFormatter({ utcTimestamp: startTime });
    }
    let statusEl = '';
    if (active) {
      statusEl = i18n.getString(result || telephonyStatus, currentLocale);
    }
    const contactName =
      typeof renderContactName === 'function'
        ? renderContactName(this.props.call)
        : undefined;
    const extraButton =
      typeof renderExtraButton === 'function'
        ? renderExtraButton(this.props.call)
        : undefined;
    const menuExtended = this.props.extended || this.state.extended;
    const selectedMatchContactType = this.getSelectedContact()?.type ?? '';

    return (
      <div
        className={styles.root}
        onClick={this.toggleExtended}
        data-sign="calls_item_root"
      >
        <div data-sign="calls_item_wrapper" className={styles.wrapper}>
          <CallIcon
            direction={direction}
            ringing={ringing}
            active={active}
            missed={missed}
            inboundTitle={i18n.getString('inboundCall', currentLocale)}
            outboundTitle={i18n.getString('outboundCall', currentLocale)}
            missedTitle={i18n.getString('missedCall', currentLocale)}
            type={type}
          />
          <div className={styles.infoWrapper}>
            <ContactDisplay
              missed={missed}
              isOnConferenceCall={
                direction === callDirections.outbound && toName === 'Conference'
              }
              contactName={contactName}
              reference={(ref) => {
                this.contactDisplay = ref;
              }}
              className={classnames(
                styles.contactDisplay,
                contactDisplayStyle,
                missed && styles.missed,
                active && styles.active,
              )}
              selectClassName={styles.dropdownSelect}
              brand={brand}
              sourceIcons={sourceIcons}
              phoneTypeRenderer={phoneTypeRenderer}
              phoneSourceNameRenderer={phoneSourceNameRenderer}
              contactMatches={contactMatches}
              selected={this.state.selected}
              onSelectContact={this.onSelectContact}
              disabled={disableLinks}
              isLogging={isLogging || this.state.isLogging}
              fallBackName={fallbackContactName}
              enableContactFallback={enableContactFallback}
              areaCode={areaCode}
              countryCode={countryCode}
              phoneNumber={shouldHideNumber ? null : phoneNumber}
              currentLocale={currentLocale}
              stopPropagation={false}
              showType={false}
              showPlaceholder={showContactDisplayPlaceholder}
              currentSiteCode={currentSiteCode}
              isMultipleSiteEnabled={isMultipleSiteEnabled}
            />
            <div className={styles.details}>
              {durationEl}
              {` | ${dateEl}${statusEl}`}
            </div>
          </div>
          {extraButton}
        </div>
        <ActionMenu
          extended={menuExtended}
          onToggle={this.toggleExtended}
          currentLocale={currentLocale}
          onLog={onLogCall && this.logCall}
          onViewEntity={onViewContact && this.viewSelectedContact}
          onCreateEntity={onCreateContact && this.createSelectedContact}
          createEntityTypes={createEntityTypes}
          hasEntity={!!contactMatches.length}
          selectedMatchContactType={selectedMatchContactType}
          onClickToDial={onClickToDial && this.clickToDial}
          onClickToSms={
            readTextPermission
              ? () => this.clickToSms({ countryCode, areaCode })
              : undefined
          }
          phoneNumber={phoneNumber}
          disableLinks={disableLinks}
          shouldHideEntityButton={isContactMatchesHidden}
          disableCallButton={disableCallButton}
          disableClickToDial={disableClickToDial}
          isLogging={isLogging || this.state.isLogging}
          isLogged={activityMatches.length > 0}
          isCreating={this.state.isCreating}
          addLogTitle={i18n.getString('addLog', currentLocale)}
          editLogTitle={i18n.getString('editLog', currentLocale)}
          textTitle={i18n.getString('text', currentLocale)}
          callTitle={i18n.getString('call', currentLocale)}
          createEntityTitle={i18n.getString('addEntity', currentLocale)}
          viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
          externalViewEntity={externalViewEntity && this.externalViewEntity}
          externalHasEntity={
            externalHasEntity && externalHasEntity(this.props.call)
          }
          disableClickToSms={disableClickToSms}
          withAnimation={withAnimation}
          showChooseEntityModal={showChooseEntityModal}
        />
      </div>
    );
  }
}

CallItem.propTypes = {
  renderIndex: PropTypes.number,
  extended: PropTypes.bool,
  call: PropTypes.shape({
    result: PropTypes.string,
    duration: PropTypes.number,
    offset: PropTypes.number,
    type: PropTypes.string,
    toName: PropTypes.string,
    direction: PropTypes.string.isRequired,
    telephonyStatus: PropTypes.string,
    startTime: PropTypes.number.isRequired,
    activityMatches: PropTypes.array.isRequired,
    fromMatches: PropTypes.array.isRequired,
    toMatches: PropTypes.array.isRequired,
    from: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    to: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }),
    webphoneSession: PropTypes.object,
  }).isRequired,
  areaCode: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onLogCall: PropTypes.func,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  createEntityTypes: PropTypes.array,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableCallButton: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  active: PropTypes.bool.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  isLogging: PropTypes.bool,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.func,
  readTextPermission: PropTypes.bool,
  onSizeChanged: PropTypes.func,
  withAnimation: PropTypes.bool,
  currentSiteCode: PropTypes.string,
  isMultipleSiteEnabled: PropTypes.bool,
  showChooseEntityModal: PropTypes.bool,
  enableCDC: PropTypes.bool,
};

CallItem.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  renderIndex: undefined,
  extended: false,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  isLoggedContact: () => false,
  isLogging: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  disableCallButton: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  autoLog: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  onSizeChanged: undefined,
  withAnimation: true,
  showChooseEntityModal: true,
  enableCDC: false,
};

export default CallItem;
