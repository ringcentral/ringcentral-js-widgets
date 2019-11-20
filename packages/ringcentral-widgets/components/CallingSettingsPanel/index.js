/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import formatMessage from 'format-message';

import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import InfoIcon from '../../assets/images/Info.svg';

import styles from './styles.scss';
import i18n from './i18n';

import SpinnerOverlay from '../SpinnerOverlay';
import BackHeader from '../BackHeader';
import Panel from '../Panel';
import Switch from '../Switch';
import IconField from '../IconField';
import InputField from '../InputField';
import TextInput from '../TextInput';
import DropdownSelect from '../DropdownSelect';
import SaveButton from '../SaveButton';

const TooltipCom = typeof Tooltip === 'function' ? Tooltip : Tooltip.default;
class CallingSettingsContent extends Component {
  constructor(props) {
    super(props);
    this.defaultRingoutPrompt = props.defaultRingoutPrompt;
    this.state = {
      callWith: props.callWith,
      ringoutPrompt: props.ringoutPrompt,
      myLocation: props.myLocation,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.callWith !== this.props.callWith) {
      this.setState({
        callWith: newProps.callWith,
      });
    }
    if (newProps.ringoutPrompt !== this.props.ringoutPrompt) {
      this.setState({
        ringoutPrompt: newProps.ringoutPrompt,
      });
    }
    if (newProps.myLocation !== this.props.myLocation) {
      this.setState({
        myLocation: newProps.myLocation,
      });
    }
  }

  onSave = () => {
    if (typeof this.props.onSave === 'function') {
      const { callWith, myLocation, ringoutPrompt } = this.state;
      this.props.onSave({
        callWith,
        myLocation,
        ringoutPrompt,
      });
    }
  };

  onReset = () => {
    const { callWith, myLocation, ringoutPrompt } = this.props;
    this.setState({
      callWith,
      myLocation,
      ringoutPrompt,
    });
  };

  onCallWithChange = (callWith) => {
    if (callWith === this.props.callWith) {
      this.setState({
        callWith,
        myLocation: this.props.myLocation,
        ringoutPrompt: this.props.ringoutPrompt,
      });
      return;
    }
    this.setState({
      callWith,
      myLocation:
        (this.props.availableNumbers[callWith] &&
          this.props.availableNumbers[callWith][0]) ||
        '',
      ringoutPrompt: this.defaultRingoutPrompt,
    });
  };

  onMyLocationChange = (myLocation) => {
    this.setState({
      myLocation,
    });
  };

  onMyLocationTextChange = (e) => {
    const myLocation = e.target.value;
    this.setState({
      myLocation,
    });
  };

  onRingoutPromptChange = (checked) => {
    this.setState({
      ringoutPrompt: checked,
    });
  };

  getTooltipContent() {
    let contentKeys;
    if (
      this.state.callWith === callingOptions.browser ||
      this.state.callWith === callingOptions.softphone
    ) {
      contentKeys = [`${this.state.callWith}Tooltip`];
    } else {
      contentKeys = [
        `${this.state.callWith}Tooltip`,
        `${this.state.callWith}Tooltip1`,
      ];
    }
    return (
      <div>
        {contentKeys.map((contentKey) => (
          <div key={contentKey}>
            {formatMessage(
              i18n.getString(contentKey, this.props.currentLocale),
              { brand: this.props.brand },
            )}
          </div>
        ))}
      </div>
    );
  }

  renderHandler = (option) => {
    let { brand } = this.props;
    if (option === callingOptions.myphone) {
      brand = brand.replace(/\sPhone$/, '');
    }
    return formatMessage(i18n.getString(option, this.props.currentLocale), {
      brand,
    });
  };

  render() {
    const {
      currentLocale,
      callWith,
      callWithOptions,
      myLocation,
      ringoutPrompt,
      availableNumbers,
      disabled,
      locationSearchable,
    } = this.props;

    const hasChanges =
      this.state.callWith !== callWith ||
      this.state.myLocation !== myLocation ||
      this.state.ringoutPrompt !== ringoutPrompt;
    const availableCallWithNumbers = availableNumbers[this.state.callWith];

    const ringout =
      this.state.callWith !== callingOptions.softphone &&
      this.state.callWith !== callingOptions.browser ? (
        <div>
          <div className={styles.ringoutHint}>
            {i18n.getString('ringoutHint', currentLocale)}
          </div>
          <InputField
            dataSign="myLocation"
            label={i18n.getString('myLocationLabel', currentLocale)}
          >
            {availableCallWithNumbers ? (
              <DropdownSelect
                className={classnames(styles.select, styles.locationSelect)}
                value={this.state.myLocation}
                onChange={this.onMyLocationChange}
                searchOption={
                  locationSearchable
                    ? (option, text) => option.includes(text)
                    : null
                }
                options={availableCallWithNumbers}
                disabled={disabled}
                dropdownAlign="left"
                titleEnabled
              />
            ) : (
              <TextInput
                dataSign="myLocationInput"
                value={this.state.myLocation}
                maxLength={30}
                onChange={this.onMyLocationTextChange}
              />
            )}
          </InputField>
          <IconField
            className={styles.iconField}
            icon={
              <Switch
                dataSign="ringoutPromptToggle"
                checked={this.state.ringoutPrompt}
                onChange={this.onRingoutPromptChange}
              />
            }
          >
            {i18n.getString('press1ToStartCallLabel', currentLocale)}
          </IconField>
        </div>
      ) : null;

    const toolTip = this.getTooltipContent();
    return (
      <React.Fragment>
        <InputField
          label={
            <span>
              {i18n.getString('makeCallsWith', currentLocale)}
              <TooltipCom
                placement="bottom"
                trigger="click"
                overlay={toolTip}
                align={{
                  offset: [0, 47],
                }}
                arrowContent={<div className="rc-tooltip-arrow-inner" />}
                getTooltipContainer={() => this.tooltipContainner}
              >
                <InfoIcon width={14} height={14} className={styles.infoIcon} />
              </TooltipCom>
            </span>
          }
          noBorder
        >
          <DropdownSelect
            dataSign="callingSetting"
            className={styles.select}
            value={this.state.callWith}
            onChange={this.onCallWithChange}
            options={callWithOptions}
            dropdownAlign="left"
            renderFunction={this.renderHandler}
            renderValue={this.renderHandler}
            disabled={disabled}
            titleEnabled
          />
          <div
            className={styles.tooltipContainner}
            ref={(tooltipContainner) => {
              this.tooltipContainner = tooltipContainner;
            }}
          />
        </InputField>
        {ringout}
        <SaveButton
          currentLocale={currentLocale}
          onClick={this.onSave}
          disabled={!hasChanges}
        />
      </React.Fragment>
    );
  }
}

CallingSettingsContent.propTypes = {
  brand: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  callWithOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  callWith: PropTypes.string.isRequired,
  myLocation: PropTypes.string.isRequired,
  ringoutPrompt: PropTypes.bool.isRequired,
  defaultRingoutPrompt: PropTypes.bool,
  availableNumbers: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  locationSearchable: PropTypes.bool,
};

CallingSettingsContent.defaultProps = {
  disabled: false,
  locationSearchable: false,
  defaultRingoutPrompt: true,
};

export default function CallingSettingsPanel({
  className,
  onBackButtonClick,
  currentLocale,
  showSpinner,
  ...props
}) {
  const content = showSpinner ? (
    <SpinnerOverlay />
  ) : (
    <CallingSettingsContent {...props} currentLocale={currentLocale} />
  );
  return (
    <div
      data-sign="callingSettings"
      className={classnames(styles.root, className)}
    >
      <BackHeader onBackClick={onBackButtonClick}>
        {i18n.getString('title', currentLocale)}
      </BackHeader>
      <Panel className={styles.content}>{content}</Panel>
    </div>
  );
}
CallingSettingsPanel.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
};

CallingSettingsPanel.defaultProps = {
  className: null,
  showSpinner: false,
};
