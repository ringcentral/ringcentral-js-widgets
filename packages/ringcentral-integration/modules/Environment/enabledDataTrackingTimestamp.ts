const DATA_TRACKING_TIMESTAMP_STORAGE_KEY =
  'environment.enabledDataTrackingTimestamp';

/**
 * Local storage for data tracking timestamp
 *
 * use local storage to get state be `synchronously`
 */
export const localStorageDataTrackingTimestamp = {
  get: () => {
    if (typeof localStorage === 'undefined') return null;

    const value = localStorage.getItem(DATA_TRACKING_TIMESTAMP_STORAGE_KEY);
    return value ? +value : null;
  },
  set: (timestamp: number | null) => {
    if (typeof localStorage === 'undefined') return null;

    if (timestamp === null) {
      localStorage.removeItem(DATA_TRACKING_TIMESTAMP_STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      DATA_TRACKING_TIMESTAMP_STORAGE_KEY,
      timestamp.toString(),
    );
  },
};
