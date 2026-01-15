import type { StepFunction } from '../../../lib/step';

interface CheckPreferenceCallProps {
  preference: string;
  changeTo: any;
}

export const CheckPreferenceCall: StepFunction<
  CheckPreferenceCallProps
> = async ({ preference, changeTo }, { rcMock }) => {
  const options = await rcMock.fetchMock
    .lastOptions(
      new RegExp(
        `.*/rcvideo/v1/account/~/extension/~/preferences/${preference}`,
      ),
      { method: 'patch' },
    )
    ?.json();

  expect(options).toEqual({ value: changeTo });
};
