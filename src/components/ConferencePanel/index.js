import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatMessage from 'format-message';
import IconField from '../IconField';
import Switch from '../Switch';
import SpinnerOverlay from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';
import RcFont from '../../assets/RcFont/RcFont.scss';
import Select from '../DropdownSelect';

function renderDialInNumberItem(item) {
  return (<div>{item.region}<span style={{ float: 'right' }}>{item.phoneNumber}</span></div>);
}

class ConferencePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInternational: false,
      searchInternationals: this.props.conferenceNumbers.phoneNumbers,
      selectInternationals: [],
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
  render() {
    const {
      currentLocale,
      showSpinner,
    } = this.props;
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
            value={this.props.dialInNumber}
            onChange={this.onMyLocationChange}
            renderFunction={renderDialInNumberItem}
            renderValue={(phoneNumber) => {
              const option = this.props.dialInNumbers.find(p => p.phoneNumber === phoneNumber);
              return renderDialInNumberItem(option);
            }}
            options={this.props.dialInNumbers}
            disabled={false}
            dropdownAlign="left"
            titleEnabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>{i18n.getString('host', currentLocale)}:</label>
          <div className={styles.conferenceNumber}>
            {this.formatNumbers.hostCode}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>{i18n.getString('participants', currentLocale)}:</label>
          <div className={styles.conferenceNumber}>
            {this.formatNumbers.participantCode}
          </div>
        </div>
        <div className={styles.participantsSwitch}>
          <IconField
            icon={
              <Switch
                onChange={this.onInternationalSwitch}
              />
            }
          >
            {i18n.getString('internationalParticipants', currentLocale)}
          </IconField>
        </div>
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
  conferenceNumbers: PropTypes.shape({
    phoneNumber: PropTypes.string,
    hostCode: PropTypes.string,
    participantCode: PropTypes.string,
    phoneNumbers: PropTypes.array,
  }).isRequired,
  countryCode: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  inviteWithText: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  formatInternational: PropTypes.func.isRequired,
  formatPin: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
};
ConferencePanel.defaultProps = {
  showSpinner: false,
  dialInNumbers: [{
    region: 'Australia, Syn',
    phoneNumber: '1238989898'
  }, {
    region: 'Xiamen',
    phoneNumber: '0592323232'
  }, {
    region: 'Shenzhen, China',
    phoneNumber: '05191310931'
  }],
  dialInNumber: '0592323232'
};

export default ConferencePanel;
