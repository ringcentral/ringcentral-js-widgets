let stagedState: Record<string, unknown> | undefined;
let stagedModule: string | undefined;

export const getStagedState = () => stagedState;

export const setStagedState = (state?: Record<string, unknown>) => {
  stagedState = state;
};

export const getStagedModule = () => stagedModule;

export const setStagedModule = (module?: string) => {
  stagedModule = module;
};
