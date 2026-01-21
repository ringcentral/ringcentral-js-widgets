import {
  getNodeText,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

interface CheckFromFieldValueProps {
  phoneNumber: string;
  dataSign?: string;
}

export const CheckFromFieldValue: StepFunction<CheckFromFieldValueProps> = ({
  phoneNumber,
  dataSign = 'phoneNumber',
}) => {
  expect(getNodeText(screen.getByTestId(dataSign))).toBe(phoneNumber);
};
