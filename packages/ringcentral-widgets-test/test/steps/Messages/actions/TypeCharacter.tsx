import { screen, fireEvent } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface ITypeCharacter {
  searchText: string;
}
export const TypeCharacter: StepFunction<ITypeCharacter> = ({ searchText }) => {
  const searchItem = screen.getByTestId('conversationSearch');
  fireEvent.change(searchItem, { target: { value: searchText } });
};
