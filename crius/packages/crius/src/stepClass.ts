import { Props, CriusElement } from './step';

interface Step<P = {}> {
  /**
   *
   */
  stepWillStart?(): Promise<void> | void;
  /**
   *
   */
  stepDidEnd?(): Promise<void> | void;
  /**
   *
   */
  defaultProps?: Partial<P>;
}

/**
 *
 */
abstract class Step<P = {}, C = {}> {
  constructor(public props: Props<P>, public context: C) {}

  /**
   *
   */
  get isCriusStep() {
    return true;
  }

  /**
   *
   */
  abstract run(): CriusElement;
}

export interface StepClass<P = {}, C = {}> {
  new (props: P, context: C): Step<P, C>;
}

export { Step };
