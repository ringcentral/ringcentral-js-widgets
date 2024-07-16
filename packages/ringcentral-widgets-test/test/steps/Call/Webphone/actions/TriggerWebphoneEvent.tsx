import type { StepFunction } from '../../../../lib/step';

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
> = async ({ eventName, args = [] }, { phone }) => {
  phone.webphone._webphone.userAgent.trigger(eventName, ...args);
};
