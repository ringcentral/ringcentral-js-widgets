import React, { Component } from 'react';

import countryNames from '../../lib/countryNames';
import { StyledDropdownSelect } from '../DropdownSelect';
import i18n from './i18n';

function renderFunction(locale: any) {
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
  mounted: any;
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.mounted = true;
    (async () => {
      await Promise.all(
        this.props.options.reduce((promises, l) => {
          // @ts-expect-error TS(2345): Argument of type 'Promise<void>' is not assignable... Remove this comment to see the full error message
          promises.push(i18n._load(l));
          // @ts-expect-error TS(2345): Argument of type 'Promise<void>' is not assignable... Remove this comment to see the full error message
          promises.push(countryNames._load(l));
          return promises;
        }, []),
      );
      if (this.mounted) this.forceUpdate();
    })();
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this.mounted = false;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    return (
      <StyledDropdownSelect
        {...this.props}
        dropdownAlign="left"
        renderValue={renderFunction}
        renderFunction={renderFunction}
        dataSign="locale-picker"
      />
    );
  }
}
export default LocalePicker;
