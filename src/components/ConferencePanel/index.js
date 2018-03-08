import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import messages from 'ringcentral-integration/modules/Conference/messages';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';
import Select from '../DropdownSelect';
import BackHeader from '../BackHeader';
import Button from '../Button';
import LinkLine from '../LinkLine';
import formatMessage from 'format-message';

// TODO Move to a separate folder.
function CheckBox({ checked, onChange }) {
  const className = classNames(styles.checkbox, checked ? styles.checked : '');
  return (
    <div
      className={className}
      onClick={() => onChange && onChange(!checked)}>
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
    <div className={styles.dialInNumberItem} title={region}>
      <span className={styles.region}>{region}</span>
      <span>{formattedPhoneNumber}</span>
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
            title={e.region}
          >
            <CheckBox className={styles.checkbox} checked={checked} />
            <div className={styles.region}>{e.region}</div>
            <div className={styles.phoneNumber}>{e.formattedPhoneNumber}</div>
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

const dialInNumbersLinks = {
  att: 'https://rcconf.net/1L06Hd5', // att reuse rc brand
  bt: 'https://www.btcloudphone.bt.com/conferencing',
  rc: 'https://rcconf.net/1L06Hd5',
  telus: 'https://telus.com/BusinessConnect/ConferencingFrequentlyAskedQuestions',
};

class ConferencePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialInNumbers: this.formatDialInNumbers(props),
      showAdditionalNumbers: false,
      showAdditionalNumberList: false,
      mainCtrlOverlapped: false
    };
  }

  checkOverlap = () => {
    const { mainCtrl } = this;
    if (!mainCtrl) {
      return;
    }
    const overlappedHeight = mainCtrl.scrollHeight - mainCtrl.clientHeight - mainCtrl.scrollTop;
    const mainCtrlOverlapped = overlappedHeight > 1;
    if (mainCtrlOverlapped !== this.state.mainCtrlOverlapped) {
      this.setState({ mainCtrlOverlapped });
    }
  }

  // Fix bug: Dropdown select on Mac Chrome 63.0.3239.108 doesn't scroll
  onSelectToggle = (open) => {
    const { mainCtrl } = this;
    if (!mainCtrl) {
      return;
    }
    if (open) {
      mainCtrl.style.overflow = 'hidden';
    } else {
      mainCtrl.style.overflow = '';
    }
  }

  onAddionalNumbersSwitch = (checked) => {
    this.setState({
      showAdditionalNumbers: checked,
    });
  };

  inviteTxt = () => {
    const {
      dialInNumber, additionalNumbers, participantCode, brand, alert
    } = this.props;
    const { dialInNumbers, showAdditionalNumbers } = this.state;
    if (showAdditionalNumbers && additionalNumbers.length < 1) {
      alert(messages.requireAditionalNumbers);
      return '';
    }
    const formattedDialInNumber = dialInNumbers.find(
      e => e.phoneNumber === dialInNumber
    ).formattedPhoneNumber;
    const additionalNumbersTxt = additionalNumbers.map(p =>
      dialInNumbers.find(obj => obj.phoneNumber === p)
    ).map(fmt => `${fmt.region}  ${fmt.formattedPhoneNumber}`)
      .join('\n');
    let additionalNumbersSection = '';
    if (showAdditionalNumbers) {
      additionalNumbersSection = `${i18n.getString('internationalNumber', this.props.currentLocale)}\n${additionalNumbersTxt}`;
    }
    //     return `
    // Please join the ${brand.name} conference.

    // Dial-In Number: ${formattedDialInNumber}
    // ${additionalNumbersSection}
    // Participant Access: ${formatPin(participantCode)}

    // Need an international dial-in phone number? Please visit ${dialInNumbersLinks[brand.code]}

    // This conference call is brought to you by ${brand.name} Conferencing.`;
    // return i18n.getString('inviteText', this.props.currentLocale);
    return formatMessage(i18n.getString(`inviteText_${brand.code}`, this.props.currentLocale), {
      brandName: brand.name,
      formattedDialInNumber,
      additionalNumbersSection,
      participantCode: formatPin(participantCode),
      dialInNumbersLinks: dialInNumbersLinks[brand.code],
    });
  }

  inviteWithText = () => {
    const txt = this.inviteTxt();
    if (txt) {
      this.props.inviteWithText(txt);
    }
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

  componentDidMount() {
    window.addEventListener('resize', this.checkOverlap, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkOverlap, false);
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
      showHelpCommands,
      disableTxtBtn,
      showJoinAsHost = true,
      showEnableJoinBeforeHost = true,
      recipientsSection,
    } = this.props;
    const {
      dialInNumbers,
      showAdditionalNumbers,
      showAdditionalNumberList,
      mainCtrlOverlapped
    } = this.state;
    if (showAdditionalNumberList) {
      return (
        <div className={styles.selectNumberPage}>
          <BackHeader onBackClick={() => this.setState({ showAdditionalNumberList: false })}>
            {i18n.getString('selectNumbers', currentLocale)}
          </BackHeader>
          <DialInNumberList
            dialInNumbers={dialInNumbers.filter(e => e.phoneNumber !== dialInNumber)}
            selected={additionalNumbers}
            onChange={updateAdditionalNumbers} />
        </div>
      );
    }
    const additionalNumberObjs = [];
    for (const n of additionalNumbers) {
      if (n !== dialInNumber) {
        additionalNumberObjs.push(dialInNumbers.find(e => e.phoneNumber === n));
      }
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
      </div>
    ) : '';
    const bottomClass = [styles.bottom];
    if (mainCtrlOverlapped) bottomClass.push(styles.overlapped);
    setTimeout(this.checkOverlap, 1);
    return (
      <div className={styles.container}>
        <div
          className={styles.main}
          onScroll={this.checkOverlap}
          ref={(ref) => { this.mainCtrl = ref; }}>
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
              onToggle={this.onSelectToggle}
              options={dialInNumbers}
              disabled={false}
              dropdownAlign="left"
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
          {
            recipientsSection
          }
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
          {
            showEnableJoinBeforeHost &&
            <div className={styles.formGroup}>
              <label>{i18n.getString('enableJoinBeforeHost', currentLocale)}</label>
              <span className={styles.field}>
                <Switch
                  checked={allowJoinBeforeHost}
                  onChange={onAllowJoinBeforeHostChange}
                />
              </span>
            </div>
          }

          <Button
            onClick={showHelpCommands}
            className={styles.link}>
            {i18n.getString('conferenceCommands', currentLocale)}
          </Button>
        </div>
        <div className={bottomClass.join(' ')}>
          {additionalButtons.map(
            Btn => (
              <Btn
                currentLocale={currentLocale}
                dialInNumber={dialInNumber}
                getInviteTxt={this.inviteTxt}
                key={Date.now()}
              />)
          )}
          {
            !disableTxtBtn &&
            <Button
              className={styles.button}
              onClick={this.inviteWithText}>
              {i18n.getString('inviteWithText', currentLocale)}
            </Button>
          }
          {
            showJoinAsHost &&
            <Button
              className={styles.primaryButton}
              onClick={() => joinAsHost(dialInNumber)}>
              {i18n.getString('joinAsHost', currentLocale)}
            </Button>
          }
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
  showHelpCommands: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
  disableTxtBtn: PropTypes.bool.isRequired,
  showJoinAsHost: PropTypes.bool,
  showEnableJoinBeforeHost: PropTypes.bool,
  brand: PropTypes.object.isRequired,
  recipientsSection: PropTypes.node,
};
ConferencePanel.defaultProps = {
  dialInNumbers: [],
  additionalButtons: [],
  recipientsSection: undefined,
  showJoinAsHost: true,
  showEnableJoinBeforeHost: true,
};

export default ConferencePanel;
