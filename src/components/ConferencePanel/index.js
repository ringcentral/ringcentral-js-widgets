import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import formatMessage from 'format-message';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';
import Select from '../DropdownSelect';
import BackHeader from '../BackHeader';
import Button from '../Button';
import LinkLine from '../LinkLine';

function CheckBox({ checked, onChange }) {
  let background = 'transparent';
  let border = 'solid 1px #e2e2e2';
  if (checked) {
    background = '#0684bd';
    border = 'solid 1px #0684bd';
  }
  return (
    <div
      onClick={evt => onChange && onChange(!checked)}
      style={{
        width: 13,
        height: 13,
        fontSize: 13,
        lineHeight: '13px',
        color: '#fff',
        display: 'inline-block',
        textAlign: 'center',
        userSelect: 'none',
        background,
        border
      }}>
      ✓
    </div>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

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

function DialInNumberList({ dialInNumbers, selected, onChange }) {
  if (dialInNumbers.length === 0) {
    return '';
  }
  return (
    <ul className={styles.dialInNumberList}>
      {dialInNumbers.map((e) => {
        const checked = selected.indexOf(e.phoneNumber) > -1;
        const selectChange = () => {
          let newSelection = [];
          if (checked) {
            selected.forEach(curNum => curNum !== e.phoneNumber && newSelection.push(curNum));
          } else {
            newSelection = selected.concat(e.phoneNumber);
          }
          onChange(newSelection);
        };
        return (
          <li
            key={e.phoneNumber}
            onClick={selectChange}
          >
            <CheckBox className={styles.checkbox} checked={checked} />
            <span className={styles.region}>{e.region}</span>
            <span className={styles.phoneNumber}>{e.formattedPhoneNumber}</span>
          </li>
        );
      })}
    </ul>
  );
}
DialInNumberList.propTypes = {
  dialInNumbers: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

function formatPin(number) {
  return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
}

class ConferencePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialInNumbers: this.formatDialInNumbers(props),
      showAdditionalNumbers: false,
      showAdditionalNumberList: false,
      additionalNumbers: [],
    };

    this.onAddionalNumbersSwitch = (checked) => {
      this.setState({
        showAdditionalNumbers: checked,
      });
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
      dialInNumber
    } = this.props;
    const {
      dialInNumbers,
      additionalNumbers, // e164
      showAdditionalNumbers,
      showAdditionalNumberList
    } = this.state;
    if (showAdditionalNumberList) {
      return (
        <div className={styles.selectNumberPage}>
          <BackHeader onBackClick={() => this.setState({ showAdditionalNumberList: false })}>
            {i18n.getString('selectNumbers', currentLocale)}
          </BackHeader>
          <DialInNumberList
            dialInNumbers={dialInNumbers}
            selected={additionalNumbers}
            onChange={newSelection => this.setState({ additionalNumbers: newSelection })} />
        </div >
      );
    }
    const additionalNumberObjs = [];
    for (const n of additionalNumbers) {
      additionalNumberObjs.push(dialInNumbers.find(e => e.phoneNumber === n));
    }
    const additionalNumbersCtrl = showAdditionalNumbers ? (
      <div>
        <LinkLine
          className={styles.linkLine}
          onClick={() => { this.setState({ showAdditionalNumberList: true }); }} >
          {i18n.getString('selectNumbers', currentLocale)}
        </LinkLine>
        <DialInNumberList
          dialInNumbers={additionalNumberObjs}
          selected={additionalNumbers}
          onChange={newSelection => this.setState({ additionalNumbers: newSelection })} />
      </div >
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
              checked={showAdditionalNumbers}
              onChange={this.onAddionalNumbersSwitch}
            />
          </span>
          {additionalNumbersCtrl}
        </div>
        <div className={styles.formGroup}>
          <label>{i18n.getString('enableJoinBeforeHost', currentLocale)}</label>
          <span className={styles.field}>
            <Switch
              onChange={this.onAddionalNumbersSwitch}
            />
          </span>
        </div>

        <Button className={styles.link}>{i18n.getString('conferenceCommands', currentLocale)}</Button>

        <div className={styles.bottom}>
          <Button className={styles.button}>{i18n.getString('inviteWithGCalendar', currentLocale)}</Button>
          <Button className={styles.button} onClick={this.inviteWithText}>{i18n.getString('inviteWithText', currentLocale)}</Button>
          <Button className={styles.primaryButton}>{i18n.getString('JoinAsHost', currentLocale)}</Button>
        </div>

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
  inviteWithText: PropTypes.func.isRequired,
};
ConferencePanel.defaultProps = {
  showSpinner: true,
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
