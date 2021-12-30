import React, { Component } from 'react';

import classnames from 'classnames';
import { contains } from 'ramda';

import countryNames from '../../lib/countryNames';
import BackHeader from '../BackHeader';
import Select from '../DropdownSelect';
import InputField from '../InputField';
import Panel from '../Panel';
import SaveButton from '../SaveButton';
import TextInput from '../TextInput';
import i18n from './i18n';
import styles from './styles.scss';

type RegionSettingsProps = {
  className?: string;
  onBackButtonClick?: (...args: any[]) => any;
  currentLocale: string;
  availableCountries: {
    isoCode?: string;
    callingCode?: string;
  }[];
  countryCode: string;
  areaCode: string;
  onSave?: (...args: any[]) => any;
};
type RegionSettingsState = {
  areaCodeValue: any;
  countryCodeValue: any;
};
class RegionSettings extends Component<
  RegionSettingsProps,
  RegionSettingsState
> {
  constructor(props) {
    super(props);
    this.state = {
      countryCodeValue: props.countryCode,
      areaCodeValue: props.areaCode,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.areaCode !== this.props.areaCode) {
      this.setState({
        areaCodeValue: nextProps.areaCode,
      });
    }
    if (nextProps.countryCode !== this.props.countryCode) {
      this.setState({
        countryCodeValue: nextProps.countryCode,
      });
    }
  }
  onAreaCodeChange = (e) => {
    const value = e.currentTarget.value;
    this.setState({
      areaCodeValue: this.areaCodeInputFilter(value),
    });
  };
  onCountryCodeChange = (option) => {
    const value = option.isoCode;
    if (value !== this.state.countryCodeValue) {
      this.setState({
        countryCodeValue: value,
      });
    }
  };
  onResetClick = () => {
    this.setState({
      areaCodeValue: this.props.areaCode,
      countryCodeValue: this.props.countryCode,
    });
  };
  onSaveClick = () => {
    if (typeof this.props.onSave === 'function') {
      const showAreaCode = contains(this.state.countryCodeValue, ['CA', 'US']);
      this.props.onSave({
        areaCode: showAreaCode ? this.state.areaCodeValue : undefined,
        countryCode: this.state.countryCodeValue,
      });
    }
  };
  onBackClick = () => {
    if (typeof this.props.onBackButtonClick === 'function') {
      this.props.onBackButtonClick();
    }
  };
  areaCodeInputFilter = (value) => value.replace(/[^\d]/g, '');
  renderHandler = (option) =>
    `(+${option.callingCode}) ${countryNames.getString(
      option.isoCode,
      this.props.currentLocale,
    )}`;
  renderValue = (value) => {
    const selectedOption = this.props.availableCountries.find(
      (country) => country.isoCode === value,
    );
    if (!selectedOption) {
      return '';
    }
    return `(+${selectedOption.callingCode}) ${countryNames.getString(
      selectedOption.isoCode,
      this.props.currentLocale,
    )}`;
  };
  render() {
    const hasChanges =
      this.state.areaCodeValue !== this.props.areaCode ||
      this.state.countryCodeValue !== this.props.countryCode;
    const hasNA =
      !!this.props.availableCountries.find((c) => c.isoCode === 'US') ||
      !!this.props.availableCountries.find((c) => c.isoCode === 'CA');
    let messageId;
    if (this.props.availableCountries.length > 1) {
      if (hasNA) {
        messageId = 'MultiWithNAMessage';
      } else {
        messageId = 'MultiWithoutNAMessage';
      }
    } else if (hasNA) {
      messageId = 'NAOnlyMessage';
    }
    const showAreaCode =
      this.state.countryCodeValue === 'US' ||
      this.state.countryCodeValue === 'CA';
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <BackHeader buttons={[]} onBackClick={this.onBackClick}>
          {i18n.getString('title', this.props.currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          <div className={styles.hint}>
            {i18n.getString(messageId, this.props.currentLocale)}
          </div>
          <InputField
            label={i18n.getString('country', this.props.currentLocale)}
          >
            <Select
              className={styles.select}
              value={this.state.countryCodeValue}
              onChange={this.onCountryCodeChange}
              options={this.props.availableCountries}
              dropdownAlign="left"
              valueFunction={(option) => option.isoCode}
              renderFunction={this.renderHandler}
              renderValue={this.renderValue}
              titleEnabled
            />
          </InputField>
          {showAreaCode && (
            <InputField
              label={i18n.getString('areaCode', this.props.currentLocale)}
            >
              <TextInput
                placeholder={i18n.getString(
                  'areaCodePlaceholder',
                  this.props.currentLocale,
                )}
                maxLength={3}
                filter={this.areaCodeInputFilter}
                value={this.state.areaCodeValue}
                onChange={this.onAreaCodeChange}
                dataSign="areaCodeInputField"
              />
            </InputField>
          )}
          <SaveButton
            currentLocale={this.props.currentLocale}
            onClick={this.onSaveClick}
            disabled={!hasChanges}
          />
          {this.props.children}
        </Panel>
      </div>
    );
  }
}
RegionSettings.defaultProps = {
  className: undefined,
  children: undefined,
  onBackButtonClick: undefined,
  onSave: undefined,
};
export default RegionSettings;
