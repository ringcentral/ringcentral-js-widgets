import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  screen,
  userEvent,
  waitForRenderReady,
  within,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

interface ClickItemByDataSignProps {
  dataSign: string;
  containerDataSign?: string;
  index?: number;
}

const getClickTarget = (element: HTMLElement) =>
  (element.closest('button,input,[role="button"]') as HTMLElement | null) ??
  element;

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
    await whenStateOrTimerChange(() => {
      element = queryRoot.queryAllByTestId(dataSign)[index];
      expect(element).toBeInTheDocument();
      expect(getClickTarget(element!)).not.toBeDisabled();
      expect(getClickTarget(element!)).not.toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  } else {
    await whenStateOrTimerChange(() => {
      element = queryRoot.getByTestId(dataSign);
      expect(element).toBeInTheDocument();
      expect(getClickTarget(element!)).not.toBeDisabled();
      expect(getClickTarget(element!)).not.toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  }

  await userEvent.click(getClickTarget(element!));
  await waitForRenderReady();
};
