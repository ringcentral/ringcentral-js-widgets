import React, { Component } from 'react';

import classnames from 'classnames';

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
  canAreaCodeShow?: (currentCountryCode: string) => boolean;
};
type RegionSettingsState = {
  areaCodeValue: any;
  countryCodeValue: any;
};
class RegionSettings extends Component<
  RegionSettingsProps,
  RegionSettingsState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryCodeValue: props.countryCode,
      areaCodeValue: props.areaCode,
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
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

  onAreaCodeChange = (e: any) => {
    const value = e.currentTarget.value;
    this.setState({
      areaCodeValue: this.areaCodeInputFilter(value),
    });
  };
  onCountryCodeChange = (option: any) => {
    const value = option.isoCode;
    if (value !== this.state.countryCodeValue) {
      this.setState({
        countryCodeValue: value,
        areaCodeValue: '',
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
      this.props.onSave({
        areaCode: this.canAreaCodeShow() ? this.state.areaCodeValue : undefined,
        countryCode: this.state.countryCodeValue,
      });
    }
  };
  onBackClick = () => {
    if (typeof this.props.onBackButtonClick === 'function') {
      this.props.onBackButtonClick();
    }
  };

  canAreaCodeShow = () => {
    if (typeof this.props.canAreaCodeShow === 'function') {
      return this.props.canAreaCodeShow(this.state.countryCodeValue);
    }
  };

  areaCodeInputFilter = (value: any) => value.replace(/[^\d]/g, '');
  renderHandler = (option: any) =>
    `(+${option.callingCode}) ${countryNames.getString(
      option.isoCode,
      this.props.currentLocale,
    )}`;
  renderValue = (value: any) => {
    const selectedOption = this.props.availableCountries.find(
      (country) => country.isoCode === value,
    );
    if (!selectedOption) {
      return '';
    }
    return `(+${selectedOption.callingCode}) ${countryNames.getString(
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      selectedOption.isoCode,
      this.props.currentLocale,
    )}`;
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <BackHeader buttons={[]} onBackClick={this.onBackClick}>
          {i18n.getString('title', this.props.currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          <div data-sign="countryCodeHint" className={styles.hint}>
            {/* @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message */}
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
          {this.canAreaCodeShow() && (
            <InputField
              label={i18n.getString('areaCode', this.props.currentLocale)}
            >
              <TextInput
                placeholder={i18n.getString(
                  'areaCodePlaceholder',
                  this.props.currentLocale,
                )}
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
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
RegionSettings.defaultProps = {
  className: undefined,
  children: undefined,
  onBackButtonClick: undefined,
  canAreaCodeShow: undefined,
  onSave: undefined,
};
export default RegionSettings;
