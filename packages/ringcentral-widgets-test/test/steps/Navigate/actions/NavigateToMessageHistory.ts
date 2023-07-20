import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

interface NavigateToMessageHistoryProps {
  tabName: 'Fax' | 'Text' | 'All' | 'Voice';
}

export const NavigateToMessageHistory: StepFunction<NavigateToMessageHistoryProps> =
  async ({ tabName = 'All' }) => {
    fireEvent.click(screen.getByText(tabName));
  };
