import React from 'react';
// eslint-disable-next-line
import ActionMenu from 'ringcentral-widget/components/ActionMenu';

/**
 * A example of `ActionMenu`
 */
const ActionMenuDemo = () => (
  <ActionMenu
    currentLocale='en-US'
    disableLinks={false}
    hasEntity={true}
    phoneNumber={'12345678'}
    onViewEntity={ () => alert(`click 'onViewEntity'`) }
    onClickToDial={ () => alert(`click 'onClickToDial'`) }
    onClickToSms={ () => alert(`click 'onClickToSms'`) }
    onLog={ () => alert(`click 'onLog'`) }
  />
);
export default ActionMenuDemo;
