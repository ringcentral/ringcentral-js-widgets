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
}: any) => {
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
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  _loadingTimeout: any;
  _mounted: any;
  _userSelection: any;
  contactDisplay: any;
  constructor(props: any) {
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
    if (this._loadingTimeout) {
      clearTimeout(this._loadingTimeout);
      this._loadingTimeout = null;
    }
  }

  onSelectContact = (value: any, idx: any) => {
    // @ts-expect-error TS(2339): Property 'showContactDisplayPlaceholder' does not ... Remove this comment to see the full error message
    const { showContactDisplayPlaceholder, autoLog } = this.props;
    const selected = showContactDisplayPlaceholder
      ? parseInt(idx, 10) - 1
      : parseInt(idx, 10);
    this._userSelection = true;
    this.setState({
      selected,
    });
    if (autoLog) {
      // @ts-expect-error TS(2345): Argument of type '{ redirect: boolean; selected: n... Remove this comment to see the full error message
      this.logCall({ redirect: false, selected });
    }
  };

  toggleExtended = (e: any) => {
    if (this.contactDisplay && this.contactDisplay.contains(e.target)) {
      return;
    }
    // @ts-expect-error TS(2339): Property 'onSizeChanged' does not exist on type 'R... Remove this comment to see the full error message
    const { onSizeChanged, renderIndex } = this.props;
    if (onSizeChanged) {
      onSizeChanged(renderIndex);
    } else {
      this.setState((state) => ({
        // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
        extended: !state.extended,
      }));
    }
  };

  getInitialContactIndex(nextProps = this.props) {
    const contactMatches = this.getContactMatches(nextProps);
    // @ts-expect-error TS(2339): Property 'isLoggedContact' does not exist on type ... Remove this comment to see the full error message
    const { isLoggedContact, showContactDisplayPlaceholder } = this.props;
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const activityMatches = nextProps.call.activityMatches;
    // console.log('getInitialContactIndex:', nextProps.call.toNumberEntity);
    for (const activity of activityMatches) {
      const index = contactMatches.findIndex(
        (
          contact: any, // TODO: find a better name or mechanism...
          // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        ) => isLoggedContact(nextProps.call, activity, contact),
      );
      if (index > -1) return index;
    }
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    if (nextProps.call.toNumberEntity) {
      const index = contactMatches.findIndex(
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        (contact: any) => contact.id === nextProps.call.toNumberEntity,
      );
      return index;
    }
    return showContactDisplayPlaceholder ? -1 : 0;
  }

  // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.getContactMatches();
    return (
      (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null
    );
  };

  getPhoneNumber() {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    return isInbound(this.props.call)
      ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.from.phoneNumber || this.props.call.from.extensionNumber
      : // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
  }

  getContactMatches(nextProps = this.props) {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    return isInbound(nextProps.call)
      ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        nextProps.call.fromMatches
      : // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        nextProps.call.toMatches;
  }

  getFallbackContactName() {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    return isInbound(this.props.call)
      ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.from.name
      : // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.to.name;
  }

  // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
  async logCall(redirect = true, selected = this.state.selected) {
    if (
      // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
      typeof this.props.onLogCall === 'function' &&
      this._mounted &&
      // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
      !this.state.isLogging
    ) {
      this.setState({
        isLogging: true,
      });
      // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
      await this.props.onLogCall({
        contact: this.getSelectedContact(selected),
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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

  // @ts-expect-error TS(2300): Duplicate identifier 'logCall'.
  logCall = this.logCall.bind(this);

  viewSelectedContact = () => {
    // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
    if (typeof this.props.onViewContact === 'function') {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      const { call } = this.props;
      const activityMatches = (call && call.activityMatches) || [];
      // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
      this.props.onViewContact({
        activityMatches,
        contactMatches: this.getContactMatches(),
        contact: this.getSelectedContact(),
        phoneNumber: this.getPhoneNumber(),
      });
    }
  };

  createSelectedContact = async (entityType: any) => {
    // console.log('click createSelectedContact!!', entityType);
    if (
      // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
      typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
      !this.state.isCreating
    ) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
      await this.props.onCreateContact({
        phoneNumber,
        // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
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

  clickToSms = ({ countryCode, areaCode }: any) => {
    // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
    if (this.props.onClickToSms) {
      const phoneNumber = this.getPhoneNumber();
      const contact = this.getSelectedContact();
      if (contact) {
        // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      } else {
        const formatted = formatNumber({
          phoneNumber,
          countryCode,
          areaCode,
          // @ts-expect-error TS(2339): Property 'maxExtensionNumberLength' does not exist... Remove this comment to see the full error message
          maxExtensionLength: this.props.maxExtensionNumberLength,
        });
        // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.onClickToSms(
          {
            // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2339): Property 'onClickToDial' does not exist on type 'R... Remove this comment to see the full error message
    if (this.props.onClickToDial) {
      const contact = this.getSelectedContact() || {};
      const phoneNumber = this.getPhoneNumber();

      if (phoneNumber) {
        // @ts-expect-error TS(2339): Property 'onClickToDial' does not exist on type 'R... Remove this comment to see the full error message
        this.props.onClickToDial({
          ...contact,
          phoneNumber,
        });
      }
    }
  };

  // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
  externalViewEntity = () => this.props.externalViewEntity(this.props.call);

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
    if (this.state.loading) {
      return <div className={styles.root} />;
    }
    const {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'brand' does not exist on type 'Readonly<... Remove this comment to see the full error message
      brand,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'currentSiteCode' does not exist on type ... Remove this comment to see the full error message
      currentSiteCode,
      // @ts-expect-error TS(2339): Property 'isMultipleSiteEnabled' does not exist on... Remove this comment to see the full error message
      isMultipleSiteEnabled,
      // @ts-expect-error TS(2339): Property 'areaCode' does not exist on type 'Readon... Remove this comment to see the full error message
      areaCode,
      // @ts-expect-error TS(2339): Property 'countryCode' does not exist on type 'Rea... Remove this comment to see the full error message
      countryCode,
      // @ts-expect-error TS(2339): Property 'disableLinks' does not exist on type 'Re... Remove this comment to see the full error message
      disableLinks,
      // @ts-expect-error TS(2339): Property 'disableCallButton' does not exist on typ... Remove this comment to see the full error message
      disableCallButton,
      // @ts-expect-error TS(2339): Property 'disableClickToDial' does not exist on ty... Remove this comment to see the full error message
      disableClickToDial,
      // @ts-expect-error TS(2339): Property 'outboundSmsPermission' does not exist on... Remove this comment to see the full error message
      outboundSmsPermission,
      // @ts-expect-error TS(2339): Property 'internalSmsPermission' does not exist on... Remove this comment to see the full error message
      internalSmsPermission,
      // @ts-expect-error TS(2339): Property 'active' does not exist on type 'Readonly... Remove this comment to see the full error message
      active,
      // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
      onViewContact,
      // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
      onCreateContact,
      // @ts-expect-error TS(2339): Property 'createEntityTypes' does not exist on typ... Remove this comment to see the full error message
      createEntityTypes,
      // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
      onLogCall,
      // @ts-expect-error TS(2339): Property 'onClickToDial' does not exist on type 'R... Remove this comment to see the full error message
      onClickToDial,
      // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
      onClickToSms,
      // @ts-expect-error TS(2339): Property 'dateTimeFormatter' does not exist on typ... Remove this comment to see the full error message
      dateTimeFormatter,
      // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
      isLogging,
      // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
      enableContactFallback,
      // @ts-expect-error TS(2339): Property 'showContactDisplayPlaceholder' does not ... Remove this comment to see the full error message
      showContactDisplayPlaceholder,
      // @ts-expect-error TS(2339): Property 'sourceIcons' does not exist on type 'Rea... Remove this comment to see the full error message
      sourceIcons,
      // @ts-expect-error TS(2339): Property 'phoneTypeRenderer' does not exist on typ... Remove this comment to see the full error message
      phoneTypeRenderer,
      // @ts-expect-error TS(2339): Property 'phoneSourceNameRenderer' does not exist ... Remove this comment to see the full error message
      phoneSourceNameRenderer,
      // @ts-expect-error TS(2339): Property 'renderContactName' does not exist on typ... Remove this comment to see the full error message
      renderContactName,
      // @ts-expect-error TS(2339): Property 'renderSubContactName' does not exist on ... Remove this comment to see the full error message
      renderSubContactName,
      // @ts-expect-error TS(2339): Property 'renderExtraButton' does not exist on typ... Remove this comment to see the full error message
      renderExtraButton,
      // @ts-expect-error TS(2339): Property 'contactDisplayStyle' does not exist on t... Remove this comment to see the full error message
      contactDisplayStyle,
      // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
      externalViewEntity,
      // @ts-expect-error TS(2339): Property 'externalHasEntity' does not exist on typ... Remove this comment to see the full error message
      externalHasEntity,
      // @ts-expect-error TS(2339): Property 'readTextPermission' does not exist on ty... Remove this comment to see the full error message
      readTextPermission,
      // @ts-expect-error TS(2339): Property 'withAnimation' does not exist on type 'R... Remove this comment to see the full error message
      withAnimation,
      // @ts-expect-error TS(2339): Property 'showChooseEntityModal' does not exist on... Remove this comment to see the full error message
      showChooseEntityModal,
      // @ts-expect-error TS(2339): Property 'enableCDC' does not exist on type 'Reado... Remove this comment to see the full error message
      enableCDC,
      // @ts-expect-error TS(2339): Property 'maxExtensionNumberLength' does not exist... Remove this comment to see the full error message
      maxExtensionNumberLength,
      // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
      formatPhone,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const shouldHideNumber =
      enableCDC && checkShouldHidePhoneNumber(phoneNumber, contactMatches);
    const isContactMatchesHidden =
      enableCDC && checkShouldHideContactUser(contactMatches);
    const fallbackContactName = this.getFallbackContactName();
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const ringing = isRinging(this.props.call);
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const missed = isInbound(this.props.call) && isMissed(this.props.call);
    const parsedInfo = parseNumber({
      phoneNumber,
      countryCode,
      areaCode,
    });
    const isExtension =
      !parsedInfo.hasPlus &&
      parsedInfo.number &&
      parsedInfo.number.length <= maxExtensionNumberLength;
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
        ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          renderContactName(this.props.call)
        : undefined;
    const subContactName =
      typeof renderSubContactName === 'function'
        ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          renderSubContactName(this.props.call)
        : undefined;
    const extraButton =
      typeof renderExtraButton === 'function'
        ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          renderExtraButton(this.props.call)
        : undefined;
    // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
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
              formatPhone={formatPhone}
              missed={missed}
              isOnConferenceCall={
                direction === callDirections.outbound && toName === 'Conference'
              }
              contactName={contactName}
              subContactName={subContactName}
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
              // @ts-expect-error TS(2322): Type '{ formatPhone: any; missed: boolean; isOnCon... Remove this comment to see the full error message
              phoneTypeRenderer={phoneTypeRenderer}
              phoneSourceNameRenderer={phoneSourceNameRenderer}
              contactMatches={contactMatches}
              // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
              selected={this.state.selected}
              onSelectContact={this.onSelectContact}
              disabled={disableLinks}
              // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
          isLogging={isLogging || this.state.isLogging}
          isLogged={activityMatches.length > 0}
          // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
          isCreating={this.state.isCreating}
          addLogTitle={i18n.getString('addLog', currentLocale)}
          editLogTitle={i18n.getString('editLog', currentLocale)}
          textTitle={i18n.getString('text', currentLocale)}
          callTitle={i18n.getString('call', currentLocale)}
          createEntityTitle={i18n.getString('addEntity', currentLocale)}
          viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
          externalViewEntity={externalViewEntity && this.externalViewEntity}
          externalHasEntity={
            // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
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
  renderSubContactName: PropTypes.func,
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
  maxExtensionNumberLength: PropTypes.number,
  formatPhone: PropTypes.func,
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
  renderSubContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  onSizeChanged: undefined,
  withAnimation: true,
  showChooseEntityModal: true,
  enableCDC: false,
  maxExtensionNumberLength: 6,
  formatPhone: (phoneNumber: string) => phoneNumber,
};

export default CallItem;
