import React from 'react';
// eslint-disable-next-line
import CallIdSelect from 'ringcentral-widget/components/CallIdSelect';

const props = {};
props.fromNumber = '123456';
props.formatPhone = value => value;
props.fromNumbers = [{ phoneNumber: '123456', usageType: 'DirectNumber' }];
props.onChange = () => null;
props.currentLocale = 'en-US';
props.hidden = false;

/**
 * A example of `CallIdSelect`
 */
const CallIdSelectDemo = () => (
  <CallIdSelect
    {...props}
  />
);
export default CallIdSelectDemo;
