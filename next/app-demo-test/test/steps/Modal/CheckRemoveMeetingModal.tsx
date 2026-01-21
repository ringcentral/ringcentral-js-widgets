import { StepFunction } from '@ringcentral-integration/test-utils';

import { CheckModalValue } from './CheckModalValue';

export const CheckRemoveMeetingModal: StepFunction = async () => {
  return (
    <CheckModalValue
      title={'Remove meeting?'}
      confirmButtonText={'Remove'}
      cancelButtonText={'Cancel'}
      childrenContent={'Would you like to remove the meeting?'}
    />
  );
};
