import React from 'react';
// eslint-disable-next-line
import CallAvatar from 'ringcentral-widgets/components/CallAvatar';

import styles from './styles.scss';

const props = {};
// props.isOnConferenceCall = true;
// props.extraNum = 2;
props.avatarUrl = null;
// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uAfoapDbR_ycxF4hltMedCYIqj9bcOZB-ZuD8Sf89rdrGtTv';

/**
 * A example of `CallAvatar`
 */
const CallAvatarDemo = () => (
  <div className={styles.root}>
    <CallAvatar {...props} />
  </div>
);
export default CallAvatarDemo;
