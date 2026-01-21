import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  screen,
  userEvent,
  within,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

interface ClickItemByDataSignProps {
  dataSign: string;
  containerDataSign?: string;
  index?: number;
}

export const ClickItemByDataSign: StepFunction<
  ClickItemByDataSignProps
> = async ({ dataSign, containerDataSign, index }) => {
  let container: HTMLElement | undefined;
  if (containerDataSign) {
    container = screen.getByTestId(containerDataSign);
  }

  let element: HTMLElement | undefined;
  const queryRoot = container ? within(container) : screen;

  if (typeof index === 'number') {
    if (index < 0) {
      throw new Error('"index" must be >= 0');
    }
    await whenStateChange(() => {
      element = queryRoot.queryAllByTestId(dataSign)[index];
      expect(element).toBeInTheDocument();
    });
  } else {
    await whenStateChange(() => {
      element = queryRoot.getByTestId(dataSign);
      expect(element).toBeInTheDocument();
    });
  }

  userEvent.click(element!);
};
