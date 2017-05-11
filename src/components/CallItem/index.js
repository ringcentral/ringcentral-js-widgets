import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import 'core-js/fn/array/find';
import callDirections from 'ringcentral-integration/enums/callDirections';
import {
  isInbound,
  isRinging,
  isMissed,
} from 'ringcentral-integration/lib/callLogHelpers';
import parseNumber from 'ringcentral-integration/lib/parseNumber';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DurationCounter from '../DurationCounter';
import ContactDisplay from '../ContactDisplay';
import formatDuration from '../../lib/formatDuration';
import ActionMenu from '../ActionMenu';
import styles from './styles.scss';

import i18n from './i18n';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  missed: dynamicsFont.missed,
};

function CallIcon({
  direction,
  missed,
  active,
  ringing,
}) {
  return (
    <div className={styles.callIcon}>
      <span
        className={classnames(
          missed ? callIconMap.missed : callIconMap[direction],
          active && styles.activeCall,
          ringing && styles.ringing,
          missed && styles.missed,
        )} />
    </div>
  );
}
CallIcon.propTypes = {
  direction: PropTypes.string.isRequired,
  missed: PropTypes.bool,
  active: PropTypes.bool,
  ringing: PropTypes.bool,
};
CallIcon.defaultProps = {
  missed: false,
  active: false,
  ringing: false,
};

export default class CallItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.getInitialContactIndex(),
      userSelection: false,
      isLogging: false,
      isCreating: false,
    };
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      !this.state.userSelection &&
      nextProps.call.activityMatches !== this.props.call.activityMatches
    ) {
      this.setState({
        selected: this.getInitialContactIndex(nextProps),
      });
    }
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  onSelectContact = (value, idx) => {
    const selected = parseInt(idx, 10) - 1;
    this.setState({
      selected,
      userSelection: true,
    });
    if (this.props.call.activityMatches.length > 0) {
      this.logCall({ redirect: false, selected });
    }
  }
  getInitialContactIndex(nextProps = this.props) {
    const contactMatches = this.getContactMatches(nextProps);
    const activityMatches = nextProps.call.activityMatches;
    for (const activity of activityMatches) {
      const index = contactMatches.findIndex(contact => (
        // TODO find a better name or mechanism...
        this.props.isLoggedContact(nextProps.call, activity, contact)
      ));
      if (index > -1) return index;
    }
    return -1;
  }
  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.getContactMatches();
    return (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null;
  }
  getPhoneNumber() {
    return isInbound(this.props.call) ?
      (this.props.call.from.phoneNumber || this.props.call.from.extensionNumber) :
      (this.props.call.to.phoneNumber || this.props.call.to.extensionNumber);
  }
  getContactMatches(nextProps = this.props) {
    return isInbound(nextProps.call) ?
      nextProps.call.fromMatches :
      nextProps.call.toMatches;
  }
  getFallbackContactName() {
    return isInbound(this.props.call) ?
      (this.props.call.from.name) :
      (this.props.call.to.name);
  }
  logCall = async ({ redirect = true, selected }) => {
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
  viewSelectedContact = () => {
    if (typeof this.props.onViewContact === 'function') {
      this.props.onViewContact({
        phoneNumber: this.getPhoneNumber(),
        contact: this.getSelectedContact(),
      });
    }
  }

  createSelectedContact = async (entityType) => {
    console.log('click createSelectedContact!!', entityType);
    if (typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      !this.state.isCreating) {
      this.setState({
        isCreating: true,
      });
      console.log('start to create: isCreating...', this.state.isCreating);

      await this.props.onCreateContact({
        phoneNumber: this.getPhoneNumber(),
        name: this.getFallbackContactName(),
        entityType,
      });

      if (this._mounted) {
        this.setState({
          isCreating: false,
        });
        console.log('created: isCreating...', this.state.isCreating);
      }
    }
  }
  clickToSms = () => {
    if (this.props.onClickToSms) {
      const phoneNumber = this.getPhoneNumber();
      const contact = this.getSelectedContact();
      if (contact) {
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      } else {
        this.props.onClickToSms({
          name: this.getFallbackContactName(),
          phoneNumber,
        });
      }
    }
  }
  clickToDial = () => {
    if (this.props.onClickToDial) {
      this.props.onClickToDial(this.getPhoneNumber());
    }
  }
  render() {
    const {
      call: {
        direction,
      telephonyStatus,
      result,
      startTime,
      duration,
      activityMatches,
      },
      currentLocale,
      areaCode,
      countryCode,
      disableLinks,
      disableClickToDial,
      outboundSmsPermission,
      internalSmsPermission,
      active,
      onViewContact,
      onCreateContact,
      onLogCall,
      onClickToDial,
      onClickToSms,
      dateTimeFormatter,
      isLogging,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    const ringing = isRinging(this.props.call);
    const missed = isInbound(this.props.call) && isMissed(this.props.call);
    const parsedInfo = parseNumber(phoneNumber);
    const isExtension = !parsedInfo.hasPlus &&
      parsedInfo.number.length <= 6;
    const showClickToSms = !!(
      onClickToSms &&
      (
        isExtension ?
          internalSmsPermission :
          outboundSmsPermission
      )
    );

    let durationEl;
    if (typeof duration === 'undefined') {
      durationEl = disableLinks ?
        i18n.getString('unavailable', currentLocale) :
        <DurationCounter startTime={startTime} />;
    } else {
      durationEl = formatDuration(duration);
    }
    let dateEl;
    if (!active) {
      dateEl = dateTimeFormatter(startTime);
    }
    let statusEl;
    if (active) {
      statusEl = i18n.getString(result || telephonyStatus, currentLocale);
    }
    return (
      <div className={styles.root}>
        <CallIcon
          direction={direction}
          ringing={ringing}
          active={active}
          missed={missed}
        />
        <ContactDisplay
          className={classnames(
            styles.contactDisplay,
            missed && styles.missed,
          )}
          contactMatches={contactMatches}
          selected={this.state.selected}
          onSelectContact={this.onSelectContact}
          disabled={disableLinks}
          isLogging={isLogging || this.state.isLogging}
          fallBackName={fallbackContactName}
          areaCode={areaCode}
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          currentLocale={currentLocale} />
        <div className={styles.details} >
          {durationEl} | {dateEl}{statusEl}
        </div>
        <ActionMenu
          currentLocale={currentLocale}
          onLog={onLogCall && this.logCall}
          onViewEntity={onViewContact && this.viewSelectedContact}
          onCreateEntity={onCreateContact && this.createSelectedContact}
          hasEntity={!!contactMatches.length}
          onClickToDial={onClickToDial && this.clickToDial}
          onClickToSms={showClickToSms && this.clickToSms}
          phoneNumber={phoneNumber}
          disableLinks={disableLinks}
          disableClickToDial={disableClickToDial}
          isLogging={isLogging || this.state.isLogging}
          isLogged={activityMatches.length > 0}
          isCreating={this.state.isCreating}
        />
      </div>
    );
  }
}

CallItem.propTypes = {
  call: PropTypes.shape({
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
  }).isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onLogCall: PropTypes.func,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  active: PropTypes.bool.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  isLogging: PropTypes.bool,
};

CallItem.defaultProps = {
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  isLoggedContact: () => false,
  isLogging: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
};
