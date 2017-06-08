import React from 'react';
// eslint-disable-next-line
import ActionMenu from 'ringcentral-widget/components/ActionMenu';

const props = {};
props.currentLocale = 'en-US';

/**
 * A example of `ActionMenu`
 */
const ActionMenuDemo = () => (
  <ActionMenu
    disableLinks={false}
    hasEntity={true}
    phoneNumber={'12345678'}
    onViewEntity={ () => alert(`click 'onViewEntity'`) }
    onClickToDial={ () => alert(`click 'onClickToDial'`) }
    onClickToSms={ () => alert(`click 'onClickToSms'`) }
    onLog={ () => alert(`click 'onLog'`) }
    {...props}
  />
);
export default ActionMenuDemo;
