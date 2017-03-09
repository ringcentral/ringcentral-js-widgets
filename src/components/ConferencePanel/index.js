import React, { PropTypes, Component } from 'react';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import IconField from '../IconField';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';
import RcFont from '../../assets/RcFont/RcFont.scss';

class ConferencePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInternational: false,
      searchInternationals: this.props.conferenceNumbers.phoneNumbers,
      selectInternationals: [],
    };
    this.formatPin = (number) => {
      if (!number) {
        return '';
      }
      return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
    };
    this.formatNumbers = {
      dialInNumber: formatNumber({
        phoneNumber: this.props.conferenceNumbers.phoneNumber,
        countryCode: this.props.countryCode,
        areaCode: this.props.areaCode || '',
      }),
      hostCode: this.formatPin(this.props.conferenceNumbers.hostCode),
      participantCode: this.formatPin(this.props.conferenceNumbers.participantCode)
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
      const key = searchKey.toLowerCase().trim();
      return this.props.conferenceNumbers.phoneNumbers.filter(value =>
        value.phoneNumber.indexOf(key) >= 0 ||
        value.country.name.toLowerCase().trim().indexOf(key) >= 0);
    };
    this.inviteWithText = () => {
      let inviteText = 'Please join the RingCentral conference.\n\n';
      inviteText += `Dial-In Numbers:${this.formatNumbers.dialInNumber}\n\n`;
      if (this.state.selectInternationals.length !== 0) {
        inviteText += 'International Dial-in Numbers:\n';
        this.state.selectInternationals.forEach((value) => {
          inviteText += `${value.countryName + value.phoneNumber}\n`;
        });
        inviteText += '\n';
      }
      inviteText += `Participant Access: ${this.formatNumbers.participantCode}\n\n`;
      inviteText += 'Need an international dial-in phone number? Please visit http://www.ringcentral.com/conferencing\n\n';
      inviteText += 'This conference call is brought to you by RingCentral Conferencing.';
      this.props.inviteWithText(i18n.getString(inviteText, this.props.currentLocale));
    };
    this.changeSelect = (e) => {
      const state = this.state.selectInternationals;
      if (e.currentTarget.checked === true) {
        const newState = Array.concat(state, [{
          id: e.currentTarget.getAttribute('data-id'),
          phoneNumber: e.currentTarget.getAttribute('data-number'),
          countryName: e.currentTarget.getAttribute('data-name'),
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
    } = this.props;
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
                  onChange={this.changeSelect} />
                <span className={styles.country}>{value.country.name}</span>
                <span className={styles.phoneNumber}>{value.phoneNumber}</span>
              </label>
            </div>
            ))}
        </div>
      </div>
    ) : '';
    return (
      <div>
        <div className={styles.showConferenceNumbers}>
          <label>{i18n.getString('dialInNumber', currentLocale)}:</label>
          <div className={styles.dialInNumber}>
            {this.formatNumbers.dialInNumber}
          </div>
        </div>
        <div className={styles.showConferenceNumbers}>
          <label>{i18n.getString('host', currentLocale)}:</label>
          <div className={styles.conferenceNumber}>
            {this.formatNumbers.hostCode}
          </div>
        </div>
        <div className={styles.showConferenceNumbers}>
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
  conferenceNumbers: PropTypes.shape.isRequired,
  countryCode: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  inviteWithText: PropTypes.func.isRequired,
};
export default ConferencePanel;
