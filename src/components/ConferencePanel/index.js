import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatMessage from 'format-message';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import IconField from '../IconField';
import Switch from '../Switch';
import SpinnerOverlay from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';
import RcFont from '../../assets/RcFont/RcFont.scss';
import Select from '../DropdownSelect';
import Button from '../Button';

function DialInNumberItem({ region, formattedPhoneNumber }) {
  return (
    <div>
      {region}
      <span style={{ float: 'right' }}>{formattedPhoneNumber}</span>
    </div>
  );
}
DialInNumberItem.propTypes = {
  region: PropTypes.string.isRequired,
  formattedPhoneNumber: PropTypes.string.isRequired,
};

function formatPin(number) {
  return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
}

class ConferencePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInternational: false,
      searchInternationals: this.props.conferenceNumbers.phoneNumbers,
      selectInternationals: [],
      dialInNumbers: this.formatDialInNumbers(props),
    };
    this.formatNumbers = {
      dialInNumber: this.props.formatPhone(
        this.props.conferenceNumbers.phoneNumber,
        this.props.countryCode,
        this.props.areaCode
      ),
      hostCode: this.props.formatPin(this.props.conferenceNumbers.hostCode),
      participantCode: this.props.formatPin(this.props.conferenceNumbers.participantCode)
    };
    this.onInternationalSwitch = (checked) => {
      this.setState({
        showInternational: checked,
      });
    };
    this.onSearchKeyUp = (e) => {
      const searchKey = e.currentTarget.value;
      this.setState({
        searchInternationals: this.getMatchList(searchKey)
      });
    };
    this.getMatchList = (searchKey) => {
      const key = searchKey.toLowerCase().trim().split(' ').join('');
      return this.props.conferenceNumbers.phoneNumbers.filter(value =>
        value.phoneNumber.trim().replace(' ', '').indexOf(key) >= 0 ||
        value.country.name.toLowerCase().trim().replace(' ', '').indexOf(key) >= 0);
    };
    this.inviteWithText = () => {
      let internationals = '';
      if (this.state.selectInternationals.length !== 0) {
        internationals += 'International Dial-in Numbers:\n';
        this.state.selectInternationals.forEach((value) => {
          const phoneNumber = this.props.formatPhone(
            value.phoneNumber,
            value.countryCode,
            value.areaCode || '',
          );
          internationals += `${value.countryName} ${phoneNumber}\n`;
        });
        internationals += '\n';
      }
      this.props.inviteWithText(
        formatMessage(
          i18n.getString('inviteText', this.props.currentLocale), {
            dialInNumber: this.formatNumbers.dialInNumber,
            internationals,
            participantCode: this.formatNumbers.participantCode,
          }
        ));
    };
    this.changeSelect = (e) => {
      const state = this.state.selectInternationals;
      if (e.currentTarget.checked === true) {
        const newState = Array.concat(state, [{
          id: e.currentTarget.getAttribute('data-id'),
          phoneNumber: e.currentTarget.getAttribute('data-number'),
          countryName: e.currentTarget.getAttribute('data-name'),
          countryCode: e.currentTarget.getAttribute('data-countryCode'),
          areaCode: e.currentTarget.getAttribute('data-areaCode'),
        }]);
        newState.sort((a, b) => a.id - b.id);
        this.setState({
          selectInternationals: newState
        });
      } else {
        const newState = state.filter(value =>
          value.phoneNumber !== e.currentTarget.getAttribute('data-number'));
        newState.sort((a, b) => a.id - b.id);
        this.setState({
          selectInternationals: newState
        });
      }
    };
  }
  formatDialInNumbers({
    dialInNumbers,
    countryCode,
    areaCode,
  }) {
    return dialInNumbers.map(e => ({
      ...e,
      formattedPhoneNumber: formatNumber({
        phoneNumber: e.phoneNumber,
        countryCode,
        areaCode,
        international: true
      })
    }));
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.dialInNumbers !== this.props.dialInNumbers ||
      nextProps.countryCode !== this.props.countryCode ||
      nextProps.areaCode !== this.props.areaCode
    ) {
      this.setState({
        dialInNumbers: this.formatDialInNumbers(nextProps),
      });
    }
  }
  render() {
    const {
      currentLocale,
      hostCode,
      participantCode,
      showSpinner,
      dialInNumber
    } = this.props;
    const {
      dialInNumbers,
      showInternational
    } = this.state;
    if (showSpinner) {
      return (
        <SpinnerOverlay />
      );
    }
    const internationalNumbers = this.state.showInternational ? (
      <div className={styles.international}>
        <h2>
          {i18n.getString('internationalNumbersHeader', currentLocale)}
        </h2>
        <div className={styles.search}>
          <span className={RcFont.icon_search} />
          <div className={styles.rightPanel}>
            <input
              type="text"
              placeholder={i18n.getString('search', currentLocale)}
              onKeyUp={this.onSearchKeyUp}
            />
          </div>
        </div>
        <div className={styles.numbers}>
          {this.state.searchInternationals.map((value, key) => (
            <div className={styles.row} key={key}>
              <label>
                <input
                  type="checkbox"
                  className={styles.checkCountry}
                  data-id={value.country.id}
                  data-number={value.phoneNumber}
                  data-name={value.country.name}
                  data-countryCode={value.country.countryCode}
                  data-areaCode={value.country.areaCode}
                  onChange={this.changeSelect} />
                <span className={styles.country}>{value.country.name}</span>
                <span className={styles.phoneNumber}>
                  {this.props.formatInternational(value.phoneNumber, value.country.callingCode)}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    ) : '';
    return (
      <div className={styles.container}>
        <div className={styles.dialInNumber}>
          <label>{i18n.getString('dialInNumber', currentLocale)}</label>
          <Select
            className={styles.select}
            value={dialInNumber}
            onChange={this.onMyLocationChange}
            renderFunction={DialInNumberItem}
            renderValue={(phoneNumber) => {
              const option = dialInNumbers.find(p => p.phoneNumber === phoneNumber);
              if (!option) {
                console.warn(`Conference dial in number ${phoneNumber} is not found in the list.`);
              }
              return DialInNumberItem(option || dialInNumbers[0]);
            }}
            options={dialInNumbers}
            disabled={false}
            dropdownAlign="left"
            titleEnabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>{i18n.getString('hostAccess', currentLocale)}</label>
          <div className={styles.field}>
            {formatPin(hostCode)}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>{i18n.getString('participantsAccess', currentLocale)}</label>
          <div className={styles.field}>
            {formatPin(participantCode)}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>{i18n.getString('addinalDialInNumbers', currentLocale)}</label>
          <span className={styles.field}>
            <Switch
              onChange={this.onInternationalSwitch}
            />
          </span>

        </div>
        <div className={styles.formGroup}>
          <label>{i18n.getString('enableJoinBeforeHost', currentLocale)}</label>
          <span className={styles.field}>
            <Switch
              onChange={this.onInternationalSwitch}
            />
          </span>
        </div>

        <Button className={styles.link}>{i18n.getString('conferenceCommands', currentLocale)}</Button>

        {internationalNumbers}
        <input
          type="button"
          value={i18n.getString('inviteWithText', currentLocale)}
          className={styles.textBtn}
          onClick={this.inviteWithText}
        />
      </div>
    );
  }
}
ConferencePanel.propTypes = {
  dialInNumbers: PropTypes.array,
  dialInNumber: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  hostCode: PropTypes.string.isRequired,
  participantCode: PropTypes.string.isRequired,

  conferenceNumbers: PropTypes.shape({
    phoneNumber: PropTypes.string,
    hostCode: PropTypes.string,
    participantCode: PropTypes.string,
    phoneNumbers: PropTypes.array,
  }).isRequired,
  inviteWithText: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  formatInternational: PropTypes.func.isRequired,
  formatPin: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
};
ConferencePanel.defaultProps = {
  showSpinner: false,
  dialInNumbers: [{
    region: 'Australia, Perth',
    phoneNumber: '+61862450610'
  }, {
    region: 'Belgium, Brussels',
    phoneNumber: '+3228089351'
  }, {
    region: 'Argentina, Buenos Aires',
    phoneNumber: '+541159842371'
  }],
  dialInNumber: '+541159842371'
};

export default ConferencePanel;
