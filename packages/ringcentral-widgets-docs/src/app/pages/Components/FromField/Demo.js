import React from 'react';
// eslint-disable-next-line
import FromField from 'ringcentral-widgets/components/FromField';

const props = {};
props.fromNumber = '123456';
props.formatPhone = value => value;
props.fromNumbers = [{ phoneNumber: '123456', usageType: 'DirectNumber' }];
props.onChange = () => null;
props.currentLocale = 'en-US';
props.hidden = false;
props.showAnonymous = true;

/**
 * A example of `FromField`
 */
const FromFieldDemo = () => (
  <FromField
    {...props}
  />
);
export default FromFieldDemo;
