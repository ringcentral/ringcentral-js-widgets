import clsx from 'clsx';
import React, { Component } from 'react';

import countryNames from '../../lib/countryNames';
import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import Select from '../DropdownSelect';
import InputField from '../InputField';
import Panel from '../Panel';
import SaveButton from '../SaveButton';
import TextInput from '../TextInput';

import { t } from './i18n';
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

export function formatCountryDisplay(callingCode: string, countryName: string) {
  if (callingCode.includes('+')) {
    return `(${callingCode}) ${countryName}`;
  }
  return `(+${callingCode}) ${countryName}`;
}

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
    formatCountryDisplay(
      option.callingCode,
      countryNames.getString(option.isoCode, this.props.currentLocale),
    );
  renderValue = (value: any) => {
    const selectedOption = this.props.availableCountries.find(
      (country) => country.isoCode === value,
    );
    if (!selectedOption) {
      return '';
    }
    return formatCountryDisplay(
      selectedOption.callingCode!,
      countryNames.getString(
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        selectedOption.isoCode,
        this.props.currentLocale,
      ),
    );
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const hasChanges =
      this.state.areaCodeValue !== this.props.areaCode ||
      this.state.countryCodeValue !== this.props.countryCode;

    // An improvement is created to adjust this message
    // RCINT-38284
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
      <div className={clsx(styles.root, this.props.className)}>
        <PageHeader>
          <PageHeaderBack onClick={this.onBackClick} />
          <PageHeaderTitle>{t('title')}</PageHeaderTitle>
          <PageHeaderRemain />
        </PageHeader>
        <Panel className={styles.content}>
          <div data-sign="countryCodeHint" className={styles.hint}>
            {t(messageId as never)}
          </div>
          <InputField label={t('country')}>
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
            <InputField label={t('areaCode')}>
              <TextInput
                placeholder={t('areaCodePlaceholder')}
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

export default RegionSettings;
