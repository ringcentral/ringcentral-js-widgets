import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface TriggerWebphoneEventProps {
  eventName:
    | 'registered'
    | 'unregistered'
    | 'registrationFailed'
    | 'provisionUpdate';
  args?: unknown[];
}

export const TriggerWebphoneEvent: StepFunction<
  TriggerWebphoneEventProps
> = async ({ eventName, args = [] }, { app }) => {
  const webphone = app.container.got(Webphone)!;
  (webphone._webphone!.userAgent as any).trigger(eventName, ...args);
};
