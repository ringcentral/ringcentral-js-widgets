import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { all, find } from 'ramda';
import Tooltip from 'rc-tooltip';

import InfoIcon from '../../assets/images/Info.svg';
import BackHeader from '../BackHeader';
import { Button } from '../Button';
import Select from '../DropdownSelect';
import IconLine from '../IconLine';
import InputField from '../InputField';
import Panel from '../Panel';
import SaveButton from '../SaveButton';
import i18n from './i18n';
import styles from './styles.scss';

const TooltipCom = typeof Tooltip === 'function' ? Tooltip : Tooltip.default;

class AudioSettingsPanel extends Component {
  _isFirefox = false;

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

    this._isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
  }

  // eslint-disable-next-line react/no-deprecated
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
    if (
      newProps.inputDeviceId !== this.props.inputDeviceId ||
      all(
        (device) => device.deviceId !== this.state.inputDeviceId,
        newProps.availableInputDevices,
      )
    ) {
      this.setState({
        inputDeviceId: newProps.inputDeviceId,
      });
    }
    if (
      newProps.outputDeviceId !== this.props.outputDeviceId ||
      all(
        (device) => device.deviceId !== this.state.outputDeviceId,
        newProps.availableOutputDevices,
      )
    ) {
      this.setState({
        outputDeviceId: newProps.outputDeviceId,
      });
    }
  }

  componentDidMount() {
    if (!this.props.userMedia) {
      return;
    }
    if (
      this.props.availableInputDevices.length > 0 &&
      this.props.availableInputDevices[0].label === ''
    ) {
      this.props.checkUserMedia();
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
  };

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
  };

  onDialButtonVolumeChange = (dialButtonVolume) => {
    this.setState({
      dialButtonVolume,
    });
  };

  onDialButtonMutedChange = (dialButtonMuted) => {
    this.setState({
      dialButtonMuted,
    });
  };

  onRingtoneVolumeChange = (ringtoneVolume) => {
    this.setState({
      ringtoneVolume,
    });
  };

  onRingtoneMutedChange = (ringtoneMuted) => {
    this.setState({
      ringtoneMuted,
    });
  };

  onCallVolumeChange = (callVolume) => {
    this.setState({
      callVolume,
    });
  };

  onOutputDeviceIdChange = (device) => {
    this.setState({
      outputDeviceId: device.deviceId,
    });
  };

  onInputDeviceIdChange = (device) => {
    this.setState({
      inputDeviceId: device.deviceId,
    });
  };

  renderDeviceOption = (device, index) => {
    const { availableInputDevices, availableOutputDevices, currentLocale } =
      this.props;
    const noLabel = i18n.getString('noLabel', currentLocale);
    if (device.kind === 'audioinput' && availableInputDevices.length > 1) {
      return device.label || `${noLabel} ${index + 1}`;
    }
    if (device.kind === 'audiooutput' && availableOutputDevices.length > 1) {
      return device.label || `${noLabel} ${index + 1}`;
    }
    return device.label || noLabel;
  };

  renderDeviceValue(device) {
    return device.deviceId;
  }

  renderOutputDevice = (value) => {
    const { availableOutputDevices, currentLocale } = this.props;
    if (value === null) {
      return i18n.getString('noDevice', currentLocale);
    }
    const device = find(
      (device) => device.deviceId === value,
      availableOutputDevices,
    );
    let noLabel = i18n.getString('noLabel', currentLocale);
    if (availableOutputDevices.length > 1) {
      const index = availableOutputDevices.indexOf(device);
      if (index >= 0) {
        noLabel = `${noLabel} ${index + 1}`;
      }
    }
    return (device && device.label) || noLabel;
  };

  renderInputDevice = (value) => {
    const { availableInputDevices, currentLocale } = this.props;
    if (value === null) {
      return i18n.getString('noDevice', currentLocale);
    }
    const device = find(
      (device) => device.deviceId === value,
      availableInputDevices,
    );
    let noLabel = i18n.getString('noLabel', currentLocale);
    if (availableInputDevices.length > 1) {
      const index = availableInputDevices.indexOf(device);
      if (index >= 0) {
        noLabel = `${noLabel} ${index + 1}`;
      }
    }
    return (device && device.label) || noLabel;
  };

  isNoLabel() {
    const { availableInputDevices } = this.props;

    let noLabel = false;

    if (availableInputDevices && availableInputDevices.length) {
      noLabel = availableInputDevices[0].label === '';
    } else {
      noLabel = this._isFirefox;
    }

    return noLabel;
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
      outputDeviceDisabled,
      inputDeviceDisabled,
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
    const hasChanges =
      this.props.dialButtonVolume !== dialButtonVolume ||
      this.props.dialButtonMuted !== dialButtonMuted ||
      this.props.ringtoneVolume !== ringtoneVolume ||
      this.props.ringtoneMuted !== ringtoneMuted ||
      this.props.callVolume !== callVolume ||
      this.props.inputDeviceId !== inputDeviceId ||
      this.props.outputDeviceId !== outputDeviceId;

    // TODO: improve UI
    const permission = !userMedia ? (
      <IconLine
        noBorder
        icon={
          <Button onClick={checkUserMedia}>
            {i18n.getString('checkMicPermission')}
          </Button>
        }
      >
        {i18n.getString('micNoPermissionMessage')}
      </IconLine>
    ) : null;

    // const webphoneVolume = isWebRTC ?
    //   (
    //     <div>
    //       <InputField
    //         label={i18n.getString('ringtoneVolume', currentLocale)}
    //     >
    //         {`${ringtoneVolume * 100}%`}
    //       </InputField>
    //       <InputField
    //         label={i18n.getString('callVolume', currentLocale)}
    //     >
    //         {`${callVolume * 100}%`}
    //       </InputField>
    //     </div>
    //   ) : null;

    const outputDeviceDropdown = supportDevices ? (
      <InputField
        label={<span>{i18n.getString('outputDevice', currentLocale)}</span>}
        noBorder
      >
        <Select
          className={styles.select}
          disabled={outputDeviceDisabled}
          value={availableOutputDevices.length ? outputDeviceId : null}
          onChange={this.onOutputDeviceIdChange}
          options={availableOutputDevices}
          dropdownAlign="left"
          renderFunction={this.renderDeviceOption}
          valueFunction={this.renderDeviceValue}
          renderValue={this.renderOutputDevice}
          titleEnabled
        />
        <div
          className={styles.tooltipContainer}
          ref={(tooltipContainer) => {
            this.outputTooltipContainner = tooltipContainer;
          }}
        />
      </InputField>
    ) : null;
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
    // Prior to Firefox 63, enumerateDevices() only returned input devices. Starting with Firefox 63, output devices are also included if the `media.setsinkid.enabled` preference is enabled.
    // disabledFrom version 63: this feature is behind the `media.setsinkid.enabled` preferences (needs to be set to true). To change preferences in Firefox, visit about:config.
    const outputDevice =
      this._isFirefox && !availableOutputDevices?.length ? (
        <InputField
          className={styles.noHeightInputField}
          label={<span>{i18n.getString('outputDevice', currentLocale)}</span>}
          noBorder
        >
          <div className={styles.fakeDropdownContainer}>
            {i18n.getString('defaultOutputDevice', currentLocale)}
          </div>
        </InputField>
      ) : (
        outputDeviceDropdown
      );

    const inputTooltip = this.isNoLabel() ? (
      <TooltipCom
        placement="bottom"
        trigger="click"
        align={{
          offset: [0, 47],
        }}
        overlay={i18n.getString('noLabelTip', currentLocale)}
        arrowContent={<div className="rc-tooltip-arrow-inner" />}
        getTooltipContainer={() => this.inputTooltipContainner}
      >
        <InfoIcon width={14} height={14} className={styles.infoIcon} />
      </TooltipCom>
    ) : null;
    const inputDevice = supportDevices ? (
      <InputField
        label={
          <span>
            {i18n.getString('inputDevice', currentLocale)}
            {inputTooltip}
          </span>
        }
        noBorder
      >
        <Select
          className={styles.select}
          disabled={inputDeviceDisabled}
          value={availableInputDevices.length ? inputDeviceId : null}
          onChange={this.onInputDeviceIdChange}
          options={availableInputDevices}
          dropdownAlign="left"
          renderFunction={this.renderDeviceOption}
          valueFunction={this.renderDeviceValue}
          renderValue={this.renderInputDevice}
          titleEnabled
        />
        <div
          className={styles.tooltipContainer}
          ref={(tooltipContainer) => {
            this.inputTooltipContainner = tooltipContainer;
          }}
        />
      </InputField>
    ) : null;

    return (
      <div className={classnames(styles.root, className)}>
        <BackHeader onBackClick={onBackButtonClick}>
          {i18n.getString('title', currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          {
            // <InputField
            //   label={i18n.getString('dialButtonVolume', currentLocale)}
            // >
            //   {`${dialButtonVolume * 100}%`}
            // </InputField>
            // webphoneVolume
          }
          {outputDevice}
          {inputDevice}
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
  availableInputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType))
    .isRequired,
  inputDeviceId: PropTypes.string.isRequired,
  availableOutputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType))
    .isRequired,
  outputDeviceId: PropTypes.string.isRequired,
  supportDevices: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  userMedia: PropTypes.bool.isRequired,
  isWebRTC: PropTypes.bool.isRequired,
  checkUserMedia: PropTypes.func.isRequired,
  outputDeviceDisabled: PropTypes.bool,
  inputDeviceDisabled: PropTypes.bool,
};

AudioSettingsPanel.defaultProps = {
  className: null,
  outputDeviceDisabled: false,
  inputDeviceDisabled: false,
};

export default AudioSettingsPanel;
