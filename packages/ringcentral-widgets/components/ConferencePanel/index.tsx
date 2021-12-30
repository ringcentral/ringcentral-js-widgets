import React, { Component } from 'react';

import classNames from 'classnames';
import formatMessage from 'format-message';
import PropTypes from 'prop-types';

import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';

import BackHeader from '../BackHeader';
import { Button } from '../Button';
import CheckBox from '../CheckBox';
import Select from '../DropdownSelect';
import LinkLine from '../LinkLine';
import MeetingSection from '../MeetingSection';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';

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
            selected.forEach(
              (curNum) => curNum !== e.phoneNumber && newSelection.push(curNum),
            );
          } else {
            newSelection = selected.concat(e.phoneNumber);
          }
          onChange(newSelection);
        };
        return (
          <li key={e.phoneNumber} onClick={selectChange} title={e.region}>
            <CheckBox checked={checked} type="checkbox" />
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
  onChange: PropTypes.func.isRequired,
};

function formatPin(number) {
  return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
}

class ConferencePanel extends Component {
  constructor(props) {
    super(props);
    const { dialInNumber, additionalNumbers } = this.props;
    this.state = {
      dialInNumbers: this.formatDialInNumbers(props),
      showAdditionalNumberList: false,
      mainCtrlOverlapped: false,
      dialInNumber,
      additionalNumbers,
      saveAsDefault: false,
    };
  }

  checkOverlap = () => {
    const { mainCtrl } = this;
    if (!mainCtrl) {
      return;
    }
    const overlappedHeight =
      mainCtrl.scrollHeight - mainCtrl.clientHeight - mainCtrl.scrollTop;
    const mainCtrlOverlapped = overlappedHeight > 1;
    if (mainCtrlOverlapped !== this.state.mainCtrlOverlapped) {
      this.setState({ mainCtrlOverlapped });
    }
  };

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
  };

  inviteTxt = () => {
    const {
      participantCode,
      brandName,
      dialInNumbersLink,
      conferenceInviteText,
      showSaveAsDefault,
      updateDialInNumber,
      updateAdditionalNumbers,
    } = this.props;
    let { dialInNumber, additionalNumbers } = this.props;
    const { dialInNumbers, saveAsDefault } = this.state;
    if (showSaveAsDefault) {
      dialInNumber = this.state.dialInNumber;
      additionalNumbers = this.state.additionalNumbers;
      if (saveAsDefault) {
        updateDialInNumber(dialInNumber);
        updateAdditionalNumbers(additionalNumbers);
      }
    }
    dialInNumber =
      dialInNumbers.find((e) => e.phoneNumber === dialInNumber) ||
      dialInNumbers[0];
    const formattedDialInNumber = dialInNumber.formattedPhoneNumber;
    const additionalNumbersTxt = additionalNumbers
      .map((p) => dialInNumbers.find((obj) => obj.phoneNumber === p))
      .map((fmt) => `${fmt.region}  ${fmt.formattedPhoneNumber}`)
      .join('\n');
    let additionalNumbersSection = '';
    if (additionalNumbers.length > 0) {
      additionalNumbersSection = `${i18n.getString(
        'internationalNumber',
        this.props.currentLocale,
      )}\n${additionalNumbersTxt}`;
    }
    return formatMessage(conferenceInviteText, {
      brandName,
      formattedDialInNumber,
      additionalNumbersSection,
      participantCode: formatPin(participantCode),
      dialInNumbersLink,
    });
  };

  inviteWithText = () => {
    const txt = this.inviteTxt();
    if (txt) {
      this.props.inviteWithText(txt);
    }
    const { showSaveAsDefault, updateDialInNumber, updateAdditionalNumbers } =
      this.props;
    const { saveAsDefault, dialInNumber, additionalNumbers } = this.state;
    if (showSaveAsDefault && saveAsDefault) {
      updateDialInNumber(dialInNumber);
      updateAdditionalNumbers(additionalNumbers);
    }
  };

  formatDialInNumbers({ dialInNumbers, countryCode, areaCode }) {
    return dialInNumbers.map((e) => ({
      ...e,
      formattedPhoneNumber: formatNumber({
        phoneNumber: e.phoneNumber,
        countryCode,
        areaCode,
        international: true,
      }),
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
    const { showSaveAsDefault, dialInNumber, additionalNumbers } = nextProps;
    if (showSaveAsDefault && dialInNumber !== this.props.dialInNumber) {
      this.setState({ dialInNumber });
    }
    if (
      showSaveAsDefault &&
      additionalNumbers !== this.props.additionalNumbers
    ) {
      this.setState({ additionalNumbers });
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
      allowJoinBeforeHost,
      additionalButtons,
      onAllowJoinBeforeHostChange,
      showHelpCommands,
      disableTxtBtn,
      showJoinAsHost = true,
      showEnableJoinBeforeHost = true,
      recipientsSection,
      bottomClassName,
      showSaveAsDefault,
    } = this.props;
    let {
      dialInNumber,
      additionalNumbers,
      updateDialInNumber,
      updateAdditionalNumbers,
      joinAsHost,
    } = this.props;
    const {
      dialInNumbers,
      showAdditionalNumberList,
      mainCtrlOverlapped,
      saveAsDefault,
    } = this.state;
    // if user checked the save as defautlt
    if (showSaveAsDefault) {
      dialInNumber = this.state.dialInNumber;
      additionalNumbers = this.state.additionalNumbers;
      updateDialInNumber = (dialInNumber) => {
        this.setState({ dialInNumber });
      };
      updateAdditionalNumbers = (additionalNumbers) => {
        this.setState({ additionalNumbers });
      };
      joinAsHost = (...opts) => {
        if (saveAsDefault) {
          this.props.updateDialInNumber(dialInNumber);
          this.props.updateAdditionalNumbers(additionalNumbers);
        }
        this.props.joinAsHost(...opts);
      };
    }
    const onSaveAsDefaultChange = (checked) => {
      this.setState({ saveAsDefault: checked });
    };
    if (showAdditionalNumberList) {
      return (
        <div className={styles.selectNumberPage}>
          <BackHeader
            onBackClick={() =>
              this.setState({ showAdditionalNumberList: false })
            }
          >
            {i18n.getString('selectNumbers', currentLocale)}
          </BackHeader>
          <DialInNumberList
            dialInNumbers={dialInNumbers.filter(
              (e) => e.phoneNumber !== dialInNumber,
            )}
            selected={additionalNumbers}
            onChange={updateAdditionalNumbers}
          />
        </div>
      );
    }
    const additionalNumberObjs = [];
    for (const n of additionalNumbers) {
      if (n !== dialInNumber) {
        additionalNumberObjs.push(
          dialInNumbers.find((e) => e.phoneNumber === n),
        );
      }
    }
    const bottomClass = [styles.bottom];
    if (mainCtrlOverlapped) bottomClass.push(styles.overlapped);
    if (bottomClassName) bottomClass.push(bottomClassName);
    setTimeout(this.checkOverlap, 1);

    return (
      <div className={styles.container}>
        <div
          className={styles.main}
          onScroll={this.checkOverlap}
          ref={(ref) => {
            this.mainCtrl = ref;
          }}
        >
          <div className={styles.dialInNumber}>
            <label className={styles.title}>
              {i18n.getString('dialInNumber', currentLocale)}
            </label>
            <Select
              className={styles.select}
              value={dialInNumber}
              onChange={(option) => updateDialInNumber(option.phoneNumber)}
              renderFunction={DialInNumberItem}
              renderValue={(phoneNumber) => {
                const option = dialInNumbers.find(
                  (p) => p.phoneNumber === phoneNumber,
                );
                if (!option) {
                  console.warn(
                    `Conference dial in number ${phoneNumber} is not found in the list.`,
                  );
                }
                const itemOptions = option || dialInNumbers[0];
                if (itemOptions) {
                  return DialInNumberItem(itemOptions);
                }
                return '';
              }}
              onToggle={this.onSelectToggle}
              options={dialInNumbers}
              disabled={false}
              dropdownAlign="left"
            />
          </div>
          <div className={styles.formGroup}>
            <label>{i18n.getString('hostAccess', currentLocale)}</label>
            <div className={styles.field} data-sign="hostCode">
              {formatPin(hostCode)}
            </div>
          </div>
          <div className={classNames(styles.formGroup, styles.hasBottomBorder)}>
            <label>{i18n.getString('participantsAccess', currentLocale)}</label>
            <div className={styles.field} data-sign="participantCode">
              {formatPin(participantCode)}
            </div>
          </div>
          {recipientsSection}
          <MeetingSection
            className={styles.section}
            title={i18n.getString('addinalDialInNumbers', currentLocale)}
          >
            <div>
              <LinkLine
                className={styles.linkLine}
                onClick={() => {
                  this.setState({ showAdditionalNumberList: true });
                }}
              >
                {i18n.getString('selectNumbers', currentLocale)}
              </LinkLine>
              <DialInNumberList
                dialInNumbers={additionalNumberObjs}
                selected={additionalNumbers}
                onChange={updateAdditionalNumbers}
              />
            </div>
          </MeetingSection>
          {showEnableJoinBeforeHost && (
            <MeetingSection
              className={styles.section}
              title={i18n.getString('conferenceOptions', currentLocale)}
              withSwitch
            >
              <div
                className={classNames(
                  styles.formGroup,
                  styles.hasTopMargin,
                  styles.noPadding,
                )}
              >
                <label>
                  {i18n.getString('enableJoinBeforeHost', currentLocale)}
                </label>
                <span className={styles.field}>
                  <Switch
                    checked={allowJoinBeforeHost}
                    onChange={onAllowJoinBeforeHostChange}
                    dataSign="enableJoinToggle"
                  />
                </span>
              </div>
            </MeetingSection>
          )}
          <Button onClick={showHelpCommands} className={styles.section}>
            {i18n.getString('conferenceCommands', currentLocale)}
          </Button>
        </div>
        <div className={bottomClass.join(' ')}>
          {showSaveAsDefault && (
            <CheckBox
              checked={saveAsDefault}
              onChecked={onSaveAsDefaultChange}
              type="checkbox"
            >
              {i18n.getString('saveAsDefault', currentLocale)}
            </CheckBox>
          )}
          {additionalButtons.map((Btn) => (
            <Btn
              currentLocale={currentLocale}
              dialInNumber={dialInNumber}
              getInviteTxt={this.inviteTxt}
              participantCode={formatPin(participantCode)}
              key={Date.now()}
            />
          ))}
          {!disableTxtBtn && (
            <Button
              className={styles.button}
              dataSign="inviteWithText"
              onClick={this.inviteWithText}
            >
              {i18n.getString('inviteWithText', currentLocale)}
            </Button>
          )}
          {showJoinAsHost && (
            <Button
              className={styles.primaryButton}
              dataSign="launchConference"
              onClick={() => joinAsHost(dialInNumber)}
            >
              {i18n.getString('joinAsHost', currentLocale)}
            </Button>
          )}
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
  disableTxtBtn: PropTypes.bool.isRequired,
  showJoinAsHost: PropTypes.bool,
  showEnableJoinBeforeHost: PropTypes.bool,
  brandName: PropTypes.string.isRequired,
  dialInNumbersLink: PropTypes.string.isRequired,
  conferenceInviteText: PropTypes.string.isRequired,
  recipientsSection: PropTypes.node,
  bottomClassName: PropTypes.string,
  showSaveAsDefault: PropTypes.bool,
};
ConferencePanel.defaultProps = {
  dialInNumbers: [],
  additionalButtons: [],
  recipientsSection: undefined,
  showJoinAsHost: true,
  showEnableJoinBeforeHost: true,
  bottomClassName: null,
  showSaveAsDefault: false,
};

export default ConferencePanel;
