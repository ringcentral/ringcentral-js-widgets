import { fireEvent } from '@testing-library/react';

export const ClickDialButton = () => {
  fireEvent.click(document.querySelector('.callBtn circle'));
};
