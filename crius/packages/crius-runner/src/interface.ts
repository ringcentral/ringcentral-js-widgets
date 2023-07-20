import { Props, StepType } from 'crius';

export interface Hooks<P = {}, C = {}> {
  beforeEach?(
    props: Props<P>,
    context: Context<P, C>,
    step: StepType,
  ): Promise<void> | void;
  afterEach?(
    props: Props<P>,
    context: Context<P, C>,
    step: StepType,
  ): Promise<void> | void;
}

export type Context<P, C> = Hooks<P, C> & C;
