import React, { Component } from 'react';

import countryNames from '../../lib/countryNames';
import DropdownSelect from '../DropdownSelect';
import i18n from './i18n';

function renderFunction(locale) {
  const [lang, ...tokens] = locale.split(/[-_]/);
  const region = tokens.join('-');
  return `${i18n.getString(lang, locale)} (${countryNames.getString(
    region,
    locale,
  )})`;
}
type LocalePickerProps = {
  value: string;
  options: string[];
  onChange: (...args: any[]) => any;
};
class LocalePicker extends Component<LocalePickerProps, {}> {
  componentDidMount() {
    this.mounted = true;
    (async () => {
      await Promise.all(
        this.props.options.reduce((promises, l) => {
          promises.push(i18n._load(l));
          promises.push(countryNames._load(l));
          return promises;
        }, []),
      );
      if (this.mounted) this.forceUpdate();
    })();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    return (
      <DropdownSelect
        {...this.props}
        dropdownAlign="left"
        renderValue={renderFunction}
        renderFunction={renderFunction}
      />
    );
  }
}
export default LocalePicker;
