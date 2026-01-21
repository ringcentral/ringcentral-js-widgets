import { of, tap } from 'rxjs';

import { waitFlowResponded } from '../../src/lib/rxjs/createTransportFlow';
import { waitSubscribeSuccess } from '../lib/whenStateChange';

describe('waitFlowResponded', () => {
  it('should emit the value passed to next()', async () => {
    const source = waitFlowResponded<string>((obs$) =>
      of(true).pipe(
        tap(() => {
          obs$.next('example');
        }),
      ),
    );

    await waitSubscribeSuccess(source, (val) => {
      expect(val).toBe('example');
    });
  });
});
