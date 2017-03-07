import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import IconLine from '../IconLine';
import IconField from '../IconField';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';
import RcFont from '../../assets/RcFont/RcFont.scss';

class ConferencePanel extends Component {
//     className,
//     conferenceNumbers,
//     countryCode,
//     areaCode,
//     inviteWithText
// }) {
  constructor(props) {
    super(props);
    this.state = {
      showInternational: false,
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
    this.onInternationalChange = (checked) => {
      this.setState({
        showInternational: checked,
      });
    };
    this.onSearchKeyDown = () => {

    };
  }
  render() {
    const {
      currentLocale,
      className,
      conferenceNumbers
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
              onKeyUp={this.onSeachKeyDown}
            />
          </div>
        </div>
        <div className={styles.numbers}>
          {conferenceNumbers.phoneNumbers.map((value, key) => (
            <div className={styles.row}>
              <label>
                <input type="checkbox" className={styles.checkCountry} />
                <span className={classnames(RcFont['checkbox-selected'], styles.checkbox_selected)}></span>
                <span className={styles.country}>{value.country.name}</span>
                <span className={styles.phoneNumber}>{value.phoneNumber}</span>
              </label>
            </div>
            ))};
        </div>
      </div>
    ) : '';
    return (
      <div>
        <div className={styles.conferencePanelHeader}>
          <h1>{i18n.getString('newConference', currentLocale)}</h1>
        </div>
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
                onChange={this.onInternationalChange}
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
        />
      </div>
    );
  }
}


ConferencePanel.propTypes = {
  className: PropTypes.string,
  conferenceNumbers: PropTypes.object.isRequired,
  countryCode: PropTypes.string.isRequired,
  areaCode: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  inviteWithText: PropTypes.func.isRequired,
};
export default ConferencePanel;
