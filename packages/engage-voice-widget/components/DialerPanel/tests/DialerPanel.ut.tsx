import type { StepFunction } from '@ringcentral-integration/test-utils';

import { Dialer } from '../Dialer';
import { createDialerPanel } from './createDialerPanel';

interface DialerPanelProps {
  allowManualCalls: boolean;
  displayItems: string[];
}

export const CheckDialerDisplayItem: StepFunction<DialerPanelProps> = async (
  { allowManualCalls, displayItems },
  context,
) => {
  const wrapper = createDialerPanel({ hasDialer: allowManualCalls });
  if (displayItems.length > 0) {
    expect(wrapper.find(Dialer)).toBeDefined();
    expect(wrapper.find('[data-sign="callButton"]')).toBeDefined();
  } else {
    expect(wrapper.text()).toBe('');
  }
  wrapper.unmount();
};
