import React from 'react';
// eslint-disable-next-line
import ActiveCallActionMenu from 'ringcentral-widgets/components/ActiveCallActionMenu';

/**
 * A example of `ActiveCallActionMenu`
 */
const ActiveCallActionMenuDemo = () => (
  <ActiveCallActionMenu
    currentLocale="en-US"
    disableLinks={false}
    hasEntity
    phoneNumber="12345678"
    onViewEntity={() => alert("click 'onViewEntity'")}
    onClickToDial={() => alert("click 'onClickToDial'")}
    onClickToSms={() => alert("click 'onClickToSms'")}
    onLog={() => alert("click 'onLog'")}
    extended
  />
);
export default ActiveCallActionMenuDemo;
