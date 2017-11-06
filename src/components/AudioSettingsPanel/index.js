import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import styles from './styles.scss';
import i18n from './i18n';

import BackHeader from '../BackHeader';
import Panel from '../Panel';
import InputField from '../InputField';
import Select from '../DropdownSelect';
import Button from '../Button';
import SaveButton from '../SaveButton';
import IconLine from '../IconLine';

export default class AudioSettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialButtonVolume: props.dialButtonVolume,
      dialButtonMuted: props.dialButtonMuted,
      ringtoneVolume: props.ringtoneVolume,
      ringtoneMuted: props.ringtoneMuted,
      callVolume: props.callVolume,
      inputDeviceId: props.inputDeviceId,
      outputDeviceId: props.outputDeviceId,
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.dialButtonVolume !== this.props.dialButtonVolume) {
      this.setState({
        dialButtonVolume: newProps.dialButtonVolume,
      });
    }
    if (newProps.dialButtonMuted !== this.props.dialButtonMuted) {
      this.setState({
        dialButtonMuted: newProps.dialButtonMuted,
      });
    }
    if (newProps.ringtoneVolume !== this.props.ringtoneVolume) {
      this.setState({
        ringtoneVolume: newProps.ringtoneVolume,
      });
    }
    if (newProps.ringtoneMuted !== this.props.ringtoneMuted) {
      this.setState({
        ringtoneMuted: newProps.ringtoneMuted,
      });
    }
    if (newProps.callVolume !== this.props.callVolume) {
      this.setState({
        callVolume: newProps.callVolume,
      });
    }
    if (newProps.inputDeviceId !== this.props.inputDeviceId) {
      this.setState({
        inputDeviceId: newProps.inputDeviceId,
      });
    }
    if (newProps.outputDeviceId !== this.props.outputDeviceId) {
      this.setState({
        outputDeviceId: newProps.outputDeviceId,
      });
    }
  }
  onSave = () => {
    if (typeof this.props.onSave === 'function') {
      const {
        dialButtonVolume,
        dialButtonMuted,
        ringtoneVolume,
        ringtoneMuted,
        callVolume,
        inputDeviceId,
        outputDeviceId,
      } = this.state;
      this.props.onSave({
        dialButtonVolume,
        dialButtonMuted,
        ringtoneVolume,
        ringtoneMuted,
        callVolume,
        inputDeviceId,
        outputDeviceId,
      });
    }
  }
  onReset = () => {
    const {
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      inputDeviceId,
      outputDeviceId,
    } = this.props;
    this.setState({
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      inputDeviceId,
      outputDeviceId,
    });
  }
  onDialButtonVolumeChange = (dialButtonVolume) => {
    this.setState({
      dialButtonVolume,
    });
  }
  onDialButtonMutedChange = (dialButtonMuted) => {
    this.setState({
      dialButtonMuted,
    });
  }
  onRingtoneVolumeChange = (ringtoneVolume) => {
    this.setState({
      ringtoneVolume,
    });
  }
  onRingtoneMutedChange = (ringtoneMuted) => {
    this.setState({
      ringtoneMuted,
    });
  }
  onCallVolumeChange = (callVolume) => {
    this.setState({
      callVolume,
    });
  }
  onOutputDeviceIdChange = (device) => {
    this.setState({
      outputDeviceId: device.deviceId,
    });
  }
  onInputDeviceIdChange = (device) => {
    this.setState({
      inputDeviceId: device.deviceId,
    });
  }
  renderDeviceOption(device) {
    return device.label;
  }
  renderDeviceValue(device) {
    return device.deviceId;
  }
  renderOutputDevice = (value) => {
    const device = this.props.availableOutputDevices
      .find(device => device.deviceId === value);
    return device && device.label || value;
  }
  renderInputDevice = (value) => {
    const device = this.props.availableInputDevices
      .find(device => device.deviceId === value);
    return device && device.label || value;
  }

  render() {
    const {
      currentLocale,
      onBackButtonClick,
      className,
      availableOutputDevices,
      availableInputDevices,
      supportDevices,
      userMedia,
      isWebRTC,
      checkUserMedia,
    } = this.props;
    const {
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      outputDeviceId,
      inputDeviceId,
    } = this.state;
    const hasChanges = (
      this.props.dialButtonVolume !== dialButtonVolume ||
      this.props.dialButtonMuted !== dialButtonMuted ||
      this.props.ringtoneVolume !== ringtoneVolume ||
      this.props.ringtoneMuted !== ringtoneMuted ||
      this.props.callVolume !== callVolume ||
      this.props.inputDeviceId !== inputDeviceId ||
      this.props.outputDeviceId !== outputDeviceId
    );

    // TODO improve UI and add i18n support
    const permission = (userMedia && isWebRTC) ?
    null :
    (
      <IconLine
        noBorder
        icon={<Button onClick={checkUserMedia}>Check Permission</Button>}
      >
        The app does not have permission to use microphone
      </IconLine>
    );

    const webphoneVolume = isWebRTC ?
    (
      <div>
        <InputField
          label={i18n.getString('ringtoneVolume', currentLocale)}
        >
          {`${ringtoneVolume * 100}%`}
        </InputField>
        <InputField
          label={i18n.getString('callVolume', currentLocale)}
        >
          {`${callVolume * 100}%`}
        </InputField>
      </div>
    ) : null;

    const devices = (supportDevices && userMedia && isWebRTC) ?
    (
      <div>
        <InputField
          label={i18n.getString('outputDevice', currentLocale)}
          noBorder
        >
          <Select
            className={styles.select}
            value={outputDeviceId}
            onChange={this.onOutputDeviceIdChange}
            options={availableOutputDevices}
            dropdownAlign="left"
            renderFunction={this.renderDeviceOption}
            valueFunction={this.renderDeviceValue}
            renderValue={this.renderOutputDevice}
            titleEnabled
          />
        </InputField>
        <InputField
          label={i18n.getString('inputDevice', currentLocale)}
          noBorder
        >
          <Select
            className={styles.select}
            value={inputDeviceId}
            onChange={this.onInputDeviceIdChange}
            options={availableInputDevices}
            dropdownAlign="left"
            renderFunction={this.renderDeviceOption}
            valueFunction={this.renderDeviceValue}
            renderValue={this.renderInputDevice}
            titleEnabled
          />
        </InputField>
      </div>
    ) : null;

    return (
      <div className={classnames(styles.root, className)}>
        <BackHeader
          onBackClick={onBackButtonClick}
          >
          {i18n.getString('title', currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          <InputField
            label={i18n.getString('dialButtonVolume', currentLocale)}
          >
            {`${dialButtonVolume * 100}%`}
          </InputField>
          {webphoneVolume}
          {devices}
          {permission}
          <SaveButton
            currentLocale={currentLocale}
            onClick={this.onSave}
            disabled={!hasChanges}
          />
        </Panel>
      </div>
    );
  }
}

const devicePropType = {
  deviceId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

AudioSettingsPanel.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  dialButtonVolume: PropTypes.number.isRequired,
  ringtoneVolume: PropTypes.number.isRequired,
  ringtoneMuted: PropTypes.bool.isRequired,
  callVolume: PropTypes.number.isRequired,
  dialButtonMuted: PropTypes.bool.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  availableInputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType)).isRequired,
  inputDeviceId: PropTypes.string.isRequired,
  availableOutputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType)).isRequired,
  outputDeviceId: PropTypes.string.isRequired,
  supportDevices: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  userMedia: PropTypes.bool.isRequired,
  isWebRTC: PropTypes.bool.isRequired,
  checkUserMedia: PropTypes.func.isRequired,
};

AudioSettingsPanel.defaultProps = {
  className: null,
};
