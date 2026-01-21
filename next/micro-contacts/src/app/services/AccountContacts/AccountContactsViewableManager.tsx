import { ExtensionInfo } from '@ringcentral-integration/micro-auth/src/app/services';
import { ViewableManager } from '@ringcentral-integration/micro-core/src/app/services';
import { PortManager } from '@ringcentral-integration/next-core';

interface AccountContactDetails {
  accountId: string;
  extensionId: string;
}

interface AccountContactsViewableManagerOptions {
  onViewable: (distinctMap: [string, string[]][]) => Promise<string[]>;
  presenceTtl: number;
}

export class AccountContactsViewableManager extends ViewableManager<AccountContactDetails> {
  constructor(
    protected override _portManager: PortManager,
    private _extensionInfo: ExtensionInfo,
    private options: AccountContactsViewableManagerOptions,
  ) {
    super(_portManager, {
      viewableManagerOptions: {
        ttl: options.presenceTtl,
        groupKey: 'accountId',
        itemKey: 'extensionId',
        maxBatchRequestCount: 30,
        validate: (data) => +data.extensionId !== this._extensionInfo.id,
      },
      onViewable: (distinctMap) => {
        const result = this.options.onViewable(distinctMap);

        return result;
      },
    });
  }

  link(contact: AccountContactDetails) {
    return this.viewableManager.link(contact);
  }

  unlink(contact: AccountContactDetails) {
    return this.viewableManager.unlink(contact);
  }

  clear() {
    return this.viewableManager.clear();
  }
}
