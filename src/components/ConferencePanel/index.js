import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      onClick={() => onChange && onChange(!checked)}
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

CheckBox.defaultProps = {
  onChange: null
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
    };
  }

  onAddionalNumbersSwitch = (checked) => {
    this.setState({
      showAdditionalNumbers: checked,
    });
  };

  inviteTxt() {
    const { dialInNumber, additionalNumbers, participantCode } = this.props;
    const { dialInNumbers, showAdditionalNumbers } = this.state;
    const formattedDialInNumber = dialInNumbers.find(
      e => e.phoneNumber === dialInNumber
    ).formattedPhoneNumber;
    const additionalNumbersTxt = additionalNumbers.map(p =>
      dialInNumbers.find(obj => obj.phoneNumber === p)
    ).map(fmt => `${fmt.region}  ${fmt.formattedPhoneNumber}`)
      .join('\n');
    let additionalNumbersSection = '';
    if (showAdditionalNumbers) {
      additionalNumbersSection = `

International Dial-in Numbers:
${additionalNumbersTxt}

`;
    }
    return `
Please join the RingCentral conference.

Dial-In Numbers:${formattedDialInNumber}
${additionalNumbersSection}
Participant Access: ${formatPin(participantCode)}

Need an international dial-in phone number? Please visit https://rcconf.net/1L06Hd5

This conference call is brought to you by RingCentral Conferencing.`;
  }

  inviteWithText = () => {
    this.props.inviteWithText(this.inviteTxt());
  };

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
      dialInNumber,
      additionalNumbers,
      updateDialInNumber,
      updateAdditionalNumbers,
      joinAsHost,
      allowJoinBeforeHost,
      additionalButtons,
      onAllowJoinBeforeHostChange,
      showHelpCommands
    } = this.props;
    const {
      dialInNumbers,
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
            onChange={updateAdditionalNumbers} />
        </div >
      );
    }
    const additionalNumberObjs = [];
    for (const n of additionalNumbers) {
      additionalNumberObjs.push(dialInNumbers.find(e => e.phoneNumber === n));
    }
    const additionalNumbersCtrl = showAdditionalNumbers ? (
      <div style={{ width: '100%' }}>
        <LinkLine
          className={styles.linkLine}
          onClick={() => { this.setState({ showAdditionalNumberList: true }); }} >
          {i18n.getString('selectNumbers', currentLocale)}
        </LinkLine>
        <DialInNumberList
          dialInNumbers={additionalNumberObjs}
          selected={additionalNumbers}
          onChange={updateAdditionalNumbers} />
      </div >
    ) : '';
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.dialInNumber}>
            <label>{i18n.getString('dialInNumber', currentLocale)}</label>
            <Select
              className={styles.select}
              value={dialInNumber}
              onChange={option => updateDialInNumber(option.phoneNumber)}
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
                checked={allowJoinBeforeHost}
                onChange={onAllowJoinBeforeHostChange}
              />
            </span>
          </div>

          <Button
            onClick={showHelpCommands}
            className={styles.link}>
            {i18n.getString('conferenceCommands', currentLocale)}
          </Button>
        </div>
        <div className={styles.bottom}>
          {additionalButtons.map(
            Btn => (
              <Btn
                dialInNumber={dialInNumber}
                inviteText={this.inviteTxt()}
                key={Date.now()}
              />)
          )}
          <Button
            className={styles.button}
            onClick={this.inviteWithText}>
            {i18n.getString('inviteWithText', currentLocale)}
          </Button>
          <Button
            className={styles.primaryButton}
            onClick={() => joinAsHost(dialInNumber)}>
            {i18n.getString('joinAsHost', currentLocale)}
          </Button>
        </div>
      </div>
    );
  }
}
ConferencePanel.propTypes = {
  dialInNumbers: PropTypes.array,
  dialInNumber: PropTypes.string.isRequired,
  additionalNumbers: PropTypes.array.isRequired,
  updateAdditionalNumbers: PropTypes.func.isRequired,
  updateDialInNumber: PropTypes.func.isRequired,
  countryCode: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  hostCode: PropTypes.string.isRequired,
  participantCode: PropTypes.string.isRequired,
  inviteWithText: PropTypes.func.isRequired,
  joinAsHost: PropTypes.func.isRequired,
  allowJoinBeforeHost: PropTypes.bool.isRequired,
  onAllowJoinBeforeHostChange: PropTypes.func.isRequired,
  additionalButtons: PropTypes.array,
  showHelpCommands: PropTypes.func.isRequired
};
ConferencePanel.defaultProps = {
  showSpinner: true,
  dialInNumbers: [],
  additionalButtons: []
};

export default ConferencePanel;
