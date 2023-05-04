export function lockRefresh(sdk: any) {
  if (!navigator.locks) {
    return sdk;
  }

  const platform = sdk.platform();
  platform._$$refresh = platform._refresh;
  const refreshWithLock = () => {
    return navigator.locks?.request(
      'token_refresh',
      { mode: 'exclusive' },
      async () => {
        const isRefreshed = await platform._auth.accessTokenValid();
        if (isRefreshed) {
          const authData = await platform._auth.data();
          return new Response(authData, {
            status: 200,
          });
        }
        const res = await platform._$$refresh();
        return res;
      },
    );
  };
  platform._refresh = refreshWithLock;
  return sdk;
}
