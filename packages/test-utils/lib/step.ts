import type { StepFunction as BaseStepFunction } from '@ringcentral-integration/crius';
// TODO: refactor `@ringcentral-integration/mock` and resolve circular dependency
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { RcMock } from '@ringcentral-integration/mock';
import type { App } from 'reactant-share';

/**
 * use for apps projects
 *
 * if you still in old project, please import from project scope instead
 */
export interface Context<T = any> {
  app: App<T, any, any>;
  rcMock: RcMock;
  example?: any;
  payload: Record<string, any>;
}

export * from '@ringcentral-integration/crius';

export interface StepFunction<P = {}, C = {}>
  extends BaseStepFunction<P, C & Context> {}
