import React from 'react';
// eslint-disable-next-line
import ActionMenu from 'ringcentral-widgets/components/ActionMenu';

/**
 * A example of `ActionMenu`
 */
const ActionMenuDemo = () => (
  <ActionMenu
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
export default ActionMenuDemo;
