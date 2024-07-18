/**
 * RCI-2638: Verify the app enter Voip mode when token API returns >=500 in the limited mode
 * https://test_it_domain/test-cases/RCI-2638
 * Preconditions:
 * Open the Charles
 * Turn on the read-only mode then the app enter the limited mode
 * API Request:
 * API RequestRequest URL1(Token API)https://api-rcapps-xmnup.lab.nordigy.ru/restapi/oauth/token2(Health check request)https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/status
 *
  | API Request |Request URL |
  | 1(Token API) |https://api-rcapps-xmnup.lab.nordigy.ru/restapi/oauth/token |
	| 2(Health check request) |https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/status |

 * https://api-rcapps-xmnup.lab.nordigy.ru/restapi/oauth/token
 * https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/status
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 *
 */
import {
  p2,
  it,
  autorun,
  Given,
  StepFunction,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
  WaitForRenderReady,
  UseFakeTimers,
  AdvanceTimersByTime,
  UseRealTimers,
  StepProp,
  common,
} from '@ringcentral-integration/test-utils';

import { Context } from '../../../../../interfaces';
import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import { CheckVoipOnlyBadge } from '../../../../../steps/Badge';
import { CheckLimitedModeBadge } from '../../../../../steps/Badge/actions/CheckLimitedModeBadge';
import { CheckGetStatusApi } from '../../../../../steps/Badge/checks/CheckGetStatusApi';
import {
  CallButtonBehavior,
  CheckActiveCallExist,
  MakeCall,
  AnswerCall,
} from '../../../../../steps/Call';
import { CheckCallIcon, CheckTextIcon } from '../../../../../steps/CallHistory';
import { CheckLogBaseInfoActive } from '../../../../../steps/CallLog/checks/CheckCallLogBaseInfo';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckIsCRM } from '../../../../../steps/IDB/checks/CheckIsCRM';
import { SendSMS } from '../../../../../steps/Messages';
import {
  CreateMock,
  MockNumberParserV2,
  MockGetStatus,
} from '../../../../../steps/Mock';
import { MockPostOauthToken } from '../../../../../steps/Mock/MockPostOauthToken';
import { NavigateToHistory } from '../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../steps/Router';

export const TriggerRefreshTokenError: StepFunction = async (
  _,
  { phone }: any,
) => {
  try {
    // phone.auth.refreshToken will cause issue in fakerTimer, so mock trigger platform refreshError event here
    phone.availabilityMonitor._deps.client.service
      .platform()
      .emit('refreshError', {
        message: 'none',
        response: { status: 500 },
      });
  } catch (error) {
    console.error('refreshToken error', error);
  }
};

@autorun(test)
@common
@it
@p2
@title(
  'Verify the app enter Voip mode should retry status api when token API returns >=500 in the limited mode',
)
export class RetryHealthStatusInVoipMode extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  retryAfter = 10;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Verify the app enter Voip mode should retry status api when token API returns >=500 in the limited mode">
        <Given
          desc="Login app with RC account
								> Simulate app enter limited mode"
          action={[
            CreateMock,
            <MockPostOauthToken failure repeat={0} failureCode={503} />,
            <MockGetStatus
              repeat={2}
              status={503}
              retryAfter={`${this.retryAfter}`}
              mockData={{
                status: 503,
                errorCode: 'CMN-211',
                errors: [{ errorCode: 'CMN-211' }],
              }}
            />,
            <MockNumberParserV2 repeat={1} />,
            <MockNumberParserV2
              repeat={0}
              status={503}
              handler={() => {
                return {
                  status: 503,
                  errorCode: 'CMN-211',
                  errors: [{ errorCode: 'CMN-211' }],
                };
              }}
            />,
            Login,
            UseFakeTimers,
            <NavigateTo path="/composeText" />,
            SendSMS,
            WaitForRenderReady,
            CheckLimitedModeBadge,
          ]}
        />
        <When
          desc="Simulate token API {API Request1} returns >=500 use Charles"
          action={TriggerRefreshTokenError}
        />
        <Then
          desc="The badge'Limited' disappears then 'Voip Only' prompts
                Alert message:'Sorry, something went wrong on our end, but we are working hard to fix it.You can still make calls, but other functions are currently limited.'"
          action={[
            CheckVoipOnlyBadge,
            WaitForRenderReady,
            <CheckContainsAlertMessage message="Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited." />,
          ]}
        />
        <When
          desc="Wait for the 60s"
          action={[<AdvanceTimersByTime ms={60 * 1000} />, WaitForRenderReady]}
        />
        <Then
          desc="Charles can catch the health check request{API Request2}
										The badge is still 'Voip Only'"
          action={[<CheckGetStatusApi length={1} />, CheckVoipOnlyBadge]}
        />
        <When
          desc="Wait for the time in retry-after,"
          action={[
            <AdvanceTimersByTime ms={this.retryAfter * 1000} />,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="Charles can catch the health check request{API Request2}
										The badge is still 'Voip Only'"
          action={[<CheckGetStatusApi length={2} />, CheckVoipOnlyBadge]}
        />
        <When
          desc="The health check API{API Request2}returns 200 use Charles"
          action={[
            <MockGetStatus
              repeat={0}
              status={200}
              mockData={{
                status: 200,
              }}
            />,
            <AdvanceTimersByTime ms={this.retryAfter * 1000} />,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="Charles can not catch the health check request
										App back to normal mode
										The badge disappears"
          action={[
            <CheckGetStatusApi length={3} />,
            // 121s is the maximum of AvailabilityMonitor._randomTime
            // which is used for switch to normal mode
            <AdvanceTimersByTime ms={121 * 1000} />,
            WaitForRenderReady,
            UseRealTimers,
            // no more status api requests sent
            <CheckGetStatusApi length={3} />,
            <CheckVoipOnlyBadge show={false} />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@it
@p2
@title(
  'Verify the app enter Voip mode when token API returns >=500 in the limited mode',
)
export class EnterVoipModeFromLimitMode extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  callIconDisabled = false;
  smsIconDisabled = false;
  appName = 'common';
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Verify the app enter Voip mode when token API returns >=500 in the limited mode">
        <Given
          desc="Login app with RC account
								> Simulate app enter limited mode"
          action={[
            CreateMock,
            <MockPostOauthToken failure repeat={0} failureCode={503} />,
            <MockGetStatus
              repeat={0}
              status={503}
              mockData={{
                status: 503,
                errorCode: 'CMN-211',
                errors: [{ errorCode: 'CMN-211' }],
              }}
            />,
            <MockNumberParserV2
              repeat={0}
              status={503}
              handler={() => {
                return {
                  status: 503,
                  errorCode: 'CMN-211',
                  errors: [{ errorCode: 'CMN-211' }],
                };
              }}
            />,
            Login,
            <NavigateTo path="/composeText" />,
            SendSMS,
            WaitForRenderReady,
            CheckLimitedModeBadge,
          ]}
        />
        <When
          desc="Simulate token API {API Request1} returns >=500 use Charles"
          action={TriggerRefreshTokenError}
        />
        <Then
          desc="1.Can make and answer call
                  All rc other features can not work
                  The badge'Limited' disappears then 'Voip Only ' prompts
                  Alert message:'Sorry, something went wrong on our end, but we are working hard to fix it.You can still make calls, but other functions are currently limited.'"
          action={[
            CheckVoipOnlyBadge,
            WaitForRenderReady,
            <CheckContainsAlertMessage message="Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited." />,
            <NavigateToHistory />,
            <CheckCallIcon disabled={this.callIconDisabled} />,
            <CheckTextIcon disabled={this.smsIconDisabled} />,
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
          desc="Make outbound call, should be able to make call"
          action={<MakeCall status="connected" />}
        />
      </Scenario>
    );
  }
}
