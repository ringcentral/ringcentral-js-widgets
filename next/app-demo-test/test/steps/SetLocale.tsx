import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface SetLocaleProps {
  locale: string;
}

export const SetLocale: StepFunction<SetLocaleProps> = async (
  props,
  { app },
) => {
  const locale = app.container.got(Locale)!;
  await locale.setLocale(props.locale);
};
