export const trackWindowType =
  (trackEvent: string) => (_: any, isStandAlone: boolean) =>
    [
      trackEvent,
      { windowType: isStandAlone ? 'standalone' : 'floating window' },
    ] as [string, (object | undefined)?];
