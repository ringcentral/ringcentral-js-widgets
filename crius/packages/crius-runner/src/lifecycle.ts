import { Step, CriusElement } from 'crius';

export const runWithLifecycle = async (step: Step) => {
  let nextStep: CriusElement;
  if (typeof step.stepWillStart == 'function') {
    await step.stepWillStart();
  }
  if (typeof step.run === 'function') {
    nextStep = await step.run();
  }
  return [
    nextStep,
    async () => {
      if (typeof step.stepDidEnd == 'function') {
        await step.stepDidEnd();
      }
    },
  ];
};
