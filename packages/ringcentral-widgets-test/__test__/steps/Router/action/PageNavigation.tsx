import { StepFunction } from '../../';

export const ClickToNavigatePage: StepFunction<{ path: string }> = async (
  { path },
  { phone },
) => {
  const { goTo } = phone.mainViewUI.getUIFunctions();
  goTo(path);
};
