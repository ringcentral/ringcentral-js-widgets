import {
  waitForRenderReady,
  type StepFunction,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckRecipientsInput: StepFunction = async () => {
  const recipientsInput = screen.getByTestId('recipientsInput') as HTMLElement;

  expect(recipientsInput.value).toEqual(new Array(31).join('0'));
  expect(recipientsInput.value.length).toBe(30);
};

export const CheckRecipientsItems: StepFunction<{
  nameList: string[];
}> = async ({ nameList }) => {
  await waitForRenderReady();
  const recipientsItems = screen.queryAllByTestId('recipientsChip');
  const res = recipientsItems.map((item) => item?.textContent?.trim());

  expect(res).toEqual(nameList);
};

export const CheckRecipientsInputDeleteButton: StepFunction = async () => {
  expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
};

export const CheckRecipientsInputRemoveButton: StepFunction = async () => {
  expect(screen.getByTestId('removeBtn')).toBeInTheDocument();
};
