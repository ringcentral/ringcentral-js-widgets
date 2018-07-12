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
    onViewEntity={() => console.log("click 'onViewEntity'")}
    onClickToDial={() => console.log("click 'onClickToDial'")}
    onClickToSms={() => console.log("click 'onClickToSms'")}
    onLog={() => console.log("click 'onLog'")}
    extended
  />
);
export default ActiveCallActionMenuDemo;
