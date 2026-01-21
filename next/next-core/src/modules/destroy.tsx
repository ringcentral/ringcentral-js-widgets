import { Subject, takeUntil } from 'rxjs';

export const GLOBAL_DESTROY$ = new Subject<void>();
if (process.env.NODE_ENV === 'test') {
  (global as any)['destroyApp'] = () => {
    GLOBAL_DESTROY$.next();
  };
}

export const takeUntilAppDestroy = takeUntil<any>(GLOBAL_DESTROY$);
