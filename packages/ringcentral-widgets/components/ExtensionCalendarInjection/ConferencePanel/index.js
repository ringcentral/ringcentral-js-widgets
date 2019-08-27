import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../PopupModal/styles.scss';
import DropDialInNumberList from '../DropDialInNumberList';
import DropAdditionalValues from '../DropAdditionalValues';
import MultipleSelect from '../MultipleSelect';
import Switch from '../Switch';
import DialInNumberDropdown from '../DialInNumberDropdown';
import Title from '../Title';

class ConferencePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialInNumber: props.dialInNumber,
      dialInNumbers: props.dialInNumbers,
      additionalNumbers: props.additionalNumbers,
      allowJoinBeforeHost: props.allowJoinBeforeHost,
    };
  }

  onUpdate = async (key, value) => {
    this.setState({
      [key]: value
    });
  }

  onUpdateAllowJoinBeforeHost = async (checked) => {
    const result = await this.props.updateEnableJoinBeforeHost(checked);
    if (result === null) {
      return;
    }
    this.setState({ allowJoinBeforeHost: result.allowJoinBeforeHost });
  }

  renderValue = () => {
    const { dialInNumber, additionalNumbers, dialInNumbers } = this.state;

    const additionalNumberObjs = (additionalNumbers || []).reduce((res, curr) => {
      if (curr !== dialInNumber) {
        return res.concat(dialInNumbers.find(e => e.phoneNumber === curr));
      }
      return res;
    }, []);

    return (
      <div className={styles.additionalValueList}>
        <DropAdditionalValues
          dialInNumbers={additionalNumberObjs}
          selected={additionalNumbers}
          onChange={numbers => this.onUpdate('additionalNumbers', numbers)}
        />
      </div>
    );
  }

  renderDropdownMenu = (open) => {
    const { dialInNumber, additionalNumbers, dialInNumbers } = this.state;
    return (
      <DropDialInNumberList
        open={open}
        dialInNumbers={dialInNumbers.filter(item => item.phoneNumber !== dialInNumber)}
        selected={additionalNumbers}
        onChange={numbers => this.onUpdate('additionalNumbers', numbers)}
      />
    );
  }

  getDatas = () => {
    const {
      dialInNumber,
      additionalNumbers,
      allowJoinBeforeHost,
    } = this.state;

    return {
      dialInNumber,
      additionalNumbers,
      allowJoinBeforeHost
    };
  }

  render() {
    const { i18n } = this.props;

    const {
      dialInNumber,
      dialInNumbers,
      additionalNumbers,
      allowJoinBeforeHost,
    } = this.state;

    return (
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <Title label={i18n.dialInNumber} />
          <DialInNumberDropdown
            onUpdate={this.onUpdate}
            dialInNumber={dialInNumber}
            dialInNumbers={dialInNumbers}
          />
        </div>
        <div className={styles.formGroup}>
          <Title label={i18n.addinalDialInNumbers} />
          <span>
            <MultipleSelect
              dataSign="conferenceDropdownSelect"
              label={i18n.selectNumbers}
              dropdownAlign="left"
              renderValue={this.renderValue}
              renderDropdownMenu={this.renderDropdownMenu}
            />
          </span>
        </div>
        <div className={styles.formGroup}>
          <Title label={i18n.meetingOptions} />
          <div className={styles.flex}>
            <div>{i18n.enableJoinBeforeHost}</div>
            <span>
              <Switch
                checked={allowJoinBeforeHost}
                dataSign="enableJoinToggle"
                onChange={this.onUpdateAllowJoinBeforeHost}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

ConferencePanel.propTypes = {
  dialInNumbers: PropTypes.array,
  dialInNumber: PropTypes.string.isRequired,
  additionalNumbers: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  allowJoinBeforeHost: PropTypes.bool.isRequired,
  updateEnableJoinBeforeHost: PropTypes.func.isRequired,
};

ConferencePanel.defaultProps = {
  dialInNumbers: [],
};

export default ConferencePanel;
