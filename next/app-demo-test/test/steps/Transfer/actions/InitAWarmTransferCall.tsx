import type { StepFunction } from '@ringcentral-integration/test-utils';

import { TypingWordingInSearch } from '../../Messages';
import { NavigateToTransferPage } from '../../Navigate';

import { ClickMoreButton } from './ClickMoreButton';
import { ClickWarmTransferButton } from './ClickWarmTransferButton';

interface InitAWarmTransferCallParams {
  phoneNumber: string;
}

const InitAWarmTransferCall: StepFunction<
  InitAWarmTransferCallParams
> = async ({ phoneNumber }) => (
  <>
    <ClickMoreButton />
    <NavigateToTransferPage />
    <TypingWordingInSearch
      chars={phoneNumber}
      wait={false}
      dataSign="recipientsInput"
    />
    <ClickWarmTransferButton />
  </>
);

export { InitAWarmTransferCall };
