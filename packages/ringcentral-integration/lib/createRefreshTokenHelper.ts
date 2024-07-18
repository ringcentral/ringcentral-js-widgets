import type { SDK, ApiError } from '@ringcentral/sdk';

import validateIsOffline from './validateIsOffline';

type Platform = ReturnType<SDK['platform']>;

export type CheckRefreshTokenResult = {
  refreshTokenValid: boolean;
  isOffline: boolean;
  resStatus: number;
  refreshTokenExpiresTime?: number;
  errorMessage?: string;
};

/**
 * follow the logic in sdk, but more logic to prevent error logout
 */
export const createRefreshTokenHelper = (
  getPlatform: () => Platform,
  logger: Console,
) => {
  const getRefreshTokenState = async (
    error: ApiError,
  ): Promise<CheckRefreshTokenResult> => {
    const isOffline = validateIsOffline(error?.message);
    const resStatus = Number(error?.response?.status);

    const platform = getPlatform();
    const authData = await platform.auth().data();
    const tokenDataValid = await platform.auth().refreshTokenValid();

    logger.log('check platform.auth().refreshTokenValid():', tokenDataValid);

    const refreshTokenValid = Boolean(
      (isOffline || resStatus >= 500) && tokenDataValid,
    );
    return {
      refreshTokenValid,
      isOffline,
      resStatus,
      refreshTokenExpiresTime: authData?.refresh_token_expire_time,
      errorMessage: error?.message?.substring?.(0, 100), // avoid too long msg to be sent to analytics
    };
  };

  const clearExpiredToken = () => {
    const platform = getPlatform();
    try {
      platform
        .auth()
        .setData({ access_token: '', expires_in: '-1', refresh_token: '' });
      logger.log('Expired token data clear');
    } catch (error: any) {
      logger.error('clearExpiredToken|error', error?.message);
    }
  };

  /**
   * almost same as sdk platform.loggedIn(), but with onError callback, and when network not ready should not go into logout state
   * @param onCompleted callback when refresh token completed
   */
  const loggedIn = async (
    onCompleted?: (state: CheckRefreshTokenResult) => void,
  ) => {
    // let refreshDelayMs = 0;
    const platform = getPlatform();
    try {
      // TODO: those will be open in next MR, we ensure all exist be pass.
      // * when use that loggedIn method will set that delay be zero 0, using that to avoid first check loggedIn need delay 100ms
      // in SDK node_modules/@ringcentral/sdk/src/platform/Platform.ts:565 _refresh inner delay
      // refreshDelayMs = platform['_refreshDelayMs'];
      // platform['_refreshDelayMs'] = 0;

      if (platform['_authProxy']) {
        await platform.get('/restapi/v1.0/client-info');
        return true;
      }

      await platform.ensureLoggedIn();
      return true;
    } catch (error) {
      // normal error after logout, skip this
      if (
        !(error instanceof Error) ||
        error?.message === 'Refresh token is missing'
      ) {
        return false;
      }

      logger.error(
        'Auth::ensureLoggedIn',
        error?.message,
        (error as ApiError)?.response?.status,
      );

      const state = await getRefreshTokenState(error);

      logger.log('ensureLoggedIn.State:', state);

      onCompleted?.(state);

      if (error?.message === 'Refresh token has expired') {
        clearExpiredToken();
      }

      return state.refreshTokenValid;
    } finally {
      // * restore the delay
      // platform['_refreshDelayMs'] = refreshDelayMs;
    }
  };

  /**
   * process refresh token error
   * @returns the state of session expired
   */
  const processRefreshError = async ({
    error,
    refreshTokenValid,
    resStatus,
    onSessionExpired,
  }: Partial<CheckRefreshTokenResult> & {
    error: ApiError;
    onSessionExpired: () => void;
  }) => {
    const platform = getPlatform();

    const isAARError =
      resStatus === 403 &&
      (await error.response?.clone().json())?.errors?.some(
        ({ errorCode = '' } = {}) => errorCode === 'OAU-167',
      );

    if (
      !isAARError &&
      !refreshTokenValid &&
      (await platform.auth().data()).access_token !== ''
    ) {
      onSessionExpired();
      // clean the cache so the error doesn't show again
      platform['_cache'].clean();
      return true;
    }
  };

  return {
    getRefreshTokenState,
    clearExpiredToken,
    loggedIn,
    processRefreshError,
  };
};
