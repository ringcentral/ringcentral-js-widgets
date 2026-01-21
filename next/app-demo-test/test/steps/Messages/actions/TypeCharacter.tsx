import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

interface ITypeCharacter {
  searchText: string;
}
export const TypeCharacter: StepFunction<ITypeCharacter> = ({ searchText }) => {
  const searchItem = screen.getByTestId('conversationSearch');
  fireEvent.change(searchItem, { target: { value: searchText } });
};
