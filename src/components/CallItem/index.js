import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import 'core-js/fn/array/find';
import callDirections from 'ringcentral-integration/enums/callDirections';
import {
  isInbound,
  isRinging,
} from 'ringcentral-integration/lib/callLogHelpers';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callResults from 'ringcentral-integration/enums/callResults';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import Spinner from '../Spinner';
import Select from '../Select';
import DurationCounter from '../DurationCounter';
import formatDuration from '../../lib/formatDuration';
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

function Contact({
  contactMatches,
  selected,
  onSelectContact,
  disabled,
  isLogging,
  fallBackName,
  areaCode,
  countryCode,
  phoneNumber,
  currentLocale,
  missed,
}) {
  let contentEl;
  if (contactMatches.length === 0) {
    contentEl = fallBackName ||
      (phoneNumber && formatNumber({
        phoneNumber,
        countryCode,
        areaCode,
      })) ||
      i18n.getString('unknownNumber', currentLocale);
  } else if (contactMatches.length === 1) {
    contentEl = contactMatches[0].name;
  } else if (contactMatches.length > 1) {
    const options = [
      {

      },
      ...contactMatches,
    ];
    contentEl = (
      <Select
        className={styles.select}
        value={`${selected}`}
        paddingLeft={0}
        onChange={onSelectContact}
        disabled={disabled || isLogging}
        options={options}
        valueFunction={(_, idx) => `${idx - 1}`}
        renderFunction={(entity, idx) => (
          idx === 0 ?
            i18n.getString('select', currentLocale) :
            `${entity.name} ${i18n.getString(`phoneSource.${entity.entityType}`)}`
        )}
      />
    );
  }
  return (
    <div
      className={classnames(
        styles.contact,
        missed && styles.missed,
      )} >
      {contentEl}
    </div>
  );
}
Contact.propTypes = {
  contactMatches: PropTypes.arrayOf(PropTypes.any).isRequired,
  selected: PropTypes.number.isRequired,
  onSelectContact: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  isLogging: PropTypes.bool.isRequired,
  fallBackName: PropTypes.string,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  missed: PropTypes.bool.isRequired,
};
Contact.defaultProps = {
  onSelectContact: undefined,
  fallBackName: '',
};

function ContactLink({
  className,
  onViewContact,
  disabled,
  currentLocale,
}) {
  return (
    <div
      className={classnames(
        className,
        styles.contactLink,
        disabled && styles.disabled,
      )}
      title={i18n.getString('viewContact', currentLocale)}
      onClick={!disabled && onViewContact} >
      <i className={dynamicsFont.record} />
    </div>
  );
}
ContactLink.propTypes = {
  className: PropTypes.string,
  onViewContact: PropTypes.func,
  disabled: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
};
ContactLink.defaultProps = {
  className: null,
  onViewContact: null,
  disabled: false,
};

function LogLink({
  onLogCall,
  isLogged,
  disabled,
  isLogging,
}) {
  const spinner = isLogging ?
    (
      <div className={styles.spinnerContainer}>
        <Spinner ringWidth={2} />
      </div>
    ) :
    null;
  return (
    <a
      className={classnames(
        styles.logLink,
        (disabled || isLogging) && styles.disabled,
      )}
      onClick={!(disabled || isLogging) && onLogCall}
      disabled={(disabled || isLogging)}>
      <span
        className={isLogged ?
          dynamicsFont.edit :
          dynamicsFont.callLog
        } />
      {spinner}
    </a>
  );
}
LogLink.propTypes = {
  onLogCall: PropTypes.func,
  isLogged: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  isLogging: PropTypes.bool.isRequired,
};

export default class CallItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.getInitialContactIndex(),
      userSelection: false,
      isLogging: false,
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
  onSelectContact = (e) => {
    const selected = parseInt(e.currentTarget.value, 10);
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
  render() {
    const {
      call: {
        direction,
      telephonyStatus,
      result,
      startTime,
      activityMatches,
      duration,
      },
      currentLocale,
      areaCode,
      countryCode,
      disableLinks,
      active,
      onViewContact,
      onLogCall,
      dateTimeFormatter,
      isLogging,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const fallbackContactName = isInbound(this.props.call) ?
      (this.props.call.from.name) :
      (this.props.call.to.name);
    const ringing = isRinging(this.props.call);
    const missed = result === callResults.missed;

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
      dateEl = dateTimeFormatter(startTime); // TODO format according to locale?
    }
    let statusEl;
    if (active) {
      statusEl = i18n.getString(result || telephonyStatus, currentLocale);
    }

    let logLinkEl;
    if (onLogCall) {
      logLinkEl = (
        <LogLink
          currentLocale={currentLocale}
          onLogCall={this.logCall}
          isLogged={activityMatches.length > 0}
          disabled={disableLinks}
          isLogging={isLogging || this.state.isLogging} />
      );
    }
    let contactLinkEl;
    if (onViewContact && contactMatches.length) {
      contactLinkEl = (
        <ContactLink
          onViewContact={this.viewSelectedContact}
          disabled={disableLinks}
          currentLocale={currentLocale}
        />
      );
    }

    return (
      <div className={styles.callItem}>
        <CallIcon
          direction={direction}
          ringing={ringing}
          active={active}
          missed={missed}
        />
        <Contact
          contactMatches={contactMatches}
          selected={this.state.selected}
          onSelectContact={this.onSelectContact}
          disabled={disableLinks}
          isLogging={isLogging || this.state.isLogging}
          fallBackName={fallbackContactName}
          areaCode={areaCode}
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          currentLocale={currentLocale}
          missed={missed} />
        <div className={styles.details} >
          {durationEl} | {dateEl}{statusEl}
        </div>
        {contactLinkEl}
        {logLinkEl}
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
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  isLogging: PropTypes.bool,
};

CallItem.defaultProps = {
  onLogCall: undefined,
  onViewContact: undefined,
  isLoggedContact: () => false,
  isLogging: false,
};
