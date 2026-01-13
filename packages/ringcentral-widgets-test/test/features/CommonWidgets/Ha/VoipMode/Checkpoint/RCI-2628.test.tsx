/**
 * RCI-2628: Verify the app enter Voip mode when Refresh token API returns >=500
 * https://test_it_domain/test-cases/RCI-2628
 * Preconditions:
 * Open the Charles
 * API Request:
 *
  | API Request |Request URL |
  | 1 |https://platform.devtest.ringcentral.com/restapi/v1.0/account/~/extension/~/sms |
	| 2 |https://platform.devtest.ringcentral.com/restapi/oauth/token |

 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * > Login app with RC account
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p1,
  it,
  autorun,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../../steps/Alert';
import { CheckVoipOnlyBadge } from '../../../../../steps/Badge';
import {
  CallButtonBehavior,
  CheckActiveCallExist,
  MakeCall,
  AnswerCall,
} from '../../../../../steps/Call';
import { CheckCallIcon, CheckTextIcon } from '../../../../../steps/CallHistory';
import { CheckLogBaseInfoActive } from '../../../../../steps/CallLog/checks/CheckCallLogBaseInfo';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckIsCRM } from '../../../../../steps/IDB/checks/CheckIsCRM';
import {
  CreateMock,
  MockPostSMS,
  MockPostOauthToken,
} from '../../../../../steps/Mock';
import { NavigateToHistory } from '../../../../../steps/Navigate';

@autorun(test.skip)
@common
@it
@p1
@title('Verify the app enter Voip mode when Refresh token API returns >=500')
export class VoipOnlyRefreshToken extends Step {
  Login?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  callIconDisabled = false;
  smsIconDisabled = true;
  appName = 'common';
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Verify the app enter Voip mode when Refresh token API returns >=500">
        <When
          desc="> Set the {API Request1} response code = 401 by Charles or run{command}on console
                > Simulate{API Request2}API returns >=500"
          action={[
            CreateMock,
            <MockPostSMS repeat={0} status={401} />,
            <MockPostOauthToken failure repeat={0} failureCode={503} />,
          ]}
        />
        <And desc="Login CTI" action={Login} />
        <And
          desc="run {command} on console to send refresh token request
                  Salesforce: 'phone.client.service.platform().refresh()'
                  Chrome extension app: 'runner._server._target.client.service.platform().refresh()'"
          action={RefreshToken}
        />
        <Then
          desc="Can make and answer call(check in following steps)
                The badge'Voip Only' prompts
                Alert message: 'Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited.'"
          action={[
            (_: any, { phone }: any) => {
              expect(phone.connectivityManager.isVoipOnlyMode).toBeTruthy();
            },
            CheckVoipOnlyBadge,
            <CheckAlertMessage message="Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited." />,
          ]}
        />
        <When
          desc="Receive inbound call, should be able to answer/hangup call"
          action={() => {
            if (CheckIsCRM(this.appName)) {
              return [
                <MakeCall direction="Inbound" />,
                <CheckLogBaseInfoActive phoneNumber="(888) 255-6247" />,
                AnswerCall,
                <CallButtonBehavior callButtonBehaviorType="hangup" />,
              ];
            }
            return [
              <MakeCall direction="Inbound" useUserAgentSession />,
              AnswerCall,
              CheckActiveCallExist,
              <CallButtonBehavior callButtonBehaviorType="hangup" />,
            ];
          }}
        />
        <And
          desc="All other features can not work"
          action={[
            <NavigateToHistory />,
            <CheckCallIcon disabled={this.callIconDisabled} />,
            <CheckTextIcon disabled={this.smsIconDisabled} />,
            (_: any, { phone }: any) => {
              expect(phone.connectivityManager.isVoipOnlyMode).toBeTruthy();
            },
          ]}
        />
        <When
          desc="Make outbound call, should be able to make call"
          action={<MakeCall status="connected" />}
        />
        <Then
          desc="Should be able to make call"
          action={() => {
            if (CheckIsCRM(this.appName)) {
              return <CheckLogBaseInfoActive phoneNumber="(888) 255-6247" />;
            }
            return CheckActiveCallExist;
          }}
        />
      </Scenario>
    );
  }
}
