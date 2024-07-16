import type { StepFunction } from '../../../lib/step';

import {
  CheckPasswordInputNotExist,
  CheckPasswordValue,
} from './CheckPasswordField';
import { CheckboxIsChecked } from './CheckRCVPage';

export const CheckRcvMeetingSettingsValues: StepFunction<{
  meeting: any;
}> = async ({ meeting }) => {
  const {
    muteAudio,
    muteVideo,
    isMeetingSecret,
    meetingPassword,
    allowJoinBeforeHost,
    isOnlyAuthUserJoin,
    allowScreenSharing,
  } = meeting;
  const checkSteps = [
    <CheckboxIsChecked dataSign="usePersonalMeetingId" isChecked />,
    <CheckboxIsChecked dataSign="muteAudio" isChecked={muteAudio} />,
    <CheckboxIsChecked dataSign="turnOffCamera" isChecked={muteVideo} />,
    <CheckboxIsChecked dataSign="e2ee" isChecked={false} />,
    <CheckboxIsChecked
      dataSign="requirePassword"
      isChecked={isMeetingSecret}
    />,
    <CheckboxIsChecked
      dataSign="allowJoinBeforeHost"
      isChecked={!allowJoinBeforeHost}
    />,
    <CheckboxIsChecked
      dataSign="isOnlyAuthUserJoin"
      isChecked={isOnlyAuthUserJoin}
    />,
    <CheckboxIsChecked
      dataSign="limitScreenSharing"
      isChecked={!allowScreenSharing}
    />,
  ];
  if (isMeetingSecret) {
    checkSteps.push(<CheckPasswordValue password={meetingPassword} />);
  } else {
    checkSteps.push(<CheckPasswordInputNotExist />);
  }
};
