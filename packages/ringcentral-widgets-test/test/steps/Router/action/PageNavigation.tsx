import type { StepFunction } from '../../../lib/step';

export const ClickToNavigatePage: StepFunction<{ path: string }> = async (
  { path },
  { phone },
) => {
  const { goTo } = phone.mainViewUI.getUIFunctions();
  goTo(path);
};

export const NavigateTo: StepFunction<{ path: string }> = (
  { path },
  { phone },
) => {
  phone.routerInteraction.push(path);
};
