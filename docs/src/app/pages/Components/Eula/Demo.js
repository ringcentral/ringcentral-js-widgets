import React from 'react';
// eslint-disable-next-line
import Eula from 'ringcentral-widgets/components/Eula';

const props = {};
props.brandId = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `Eula`
 */
const EulaDemo = () => (
  <Eula
    {...props}
  />
);
export default EulaDemo;
