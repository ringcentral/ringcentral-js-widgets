import { onUpdateEntry, getStorageEntry } from '@ringcentral/mfe-react';

/**
 * Sync MFE entry to locale storage
 *
 * @param appShellName - the mfe app shell name
 */
export const syncMfeEntryToLocale = async (
  appShellName: string,
  dependencies: string[],
) => {
  if (!globalThis.localStorage) return;
  const storageKey = `rc-mfe:storage:${appShellName}`;
  const update = (name: string, newValue: any) => {
    try {
      const data = JSON.parse(
        globalThis.localStorage.getItem(storageKey) ?? '{}',
      );
      globalThis.localStorage.setItem(
        storageKey,
        JSON.stringify({ ...data, [name]: newValue }),
      );
    } catch (error) {
      console.error('SyncMfeEntryToLocale error:', error);
      throw error;
    }
  };
  dependencies.forEach(async (dependency) => {
    const dependencyInfo = await getStorageEntry(dependency);
    console.log('🐞 ~ dependencyInfo:', dependency, dependencyInfo);
    if (dependencyInfo) {
      update(dependency, dependencyInfo);
    }
  });
  onUpdateEntry((name, newValue, oldValue) => {
    console.log('🐞 ~ onUpdateEntry', storageKey, { name, newValue, oldValue });
    update(name, newValue);
  });
};
