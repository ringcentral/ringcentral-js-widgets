import {
  delegate,
  injectable,
  isSharedWorker,
  PortManager,
  PortType,
  RcModule,
} from '@ringcentral-integration/next-core';
import { defer, filter, firstValueFrom, shareReplay, switchMap } from 'rxjs';
import { UAParser } from 'ua-parser-js';

@injectable({
  name: 'UAParsedInfo',
})
export class UAParsedInfo extends RcModule {
  userAgentResult?: UAParser.IResult;

  constructor(private _portManager: PortManager) {
    super();

    this.getClientOsInfo();
  }

  private initOsInfo$ = defer(async () => {
    const result = await this.getOsInfo();
    this.userAgentResult = result;
    return result;
  }).pipe(shareReplay(1));

  private getOsInfoFromMainClient$ = defer(async () => {
    const result = await this.initOsInfoInMainClient();
    this.userAgentResult = result;

    return result;
  }).pipe(shareReplay(1));

  @delegate('mainClient')
  private async initOsInfoInMainClient() {
    const result = await firstValueFrom(this.initOsInfo$);

    return result;
  }

  getClientOsInfo() {
    if (
      this._portManager.shared &&
      this._portManager.isWorkerMode &&
      isSharedWorker
    ) {
      return firstValueFrom(
        this._portManager.portType$.pipe(
          filter((portType) => portType === PortType.Server),
          switchMap(() => this.getOsInfoFromMainClient$),
        ),
      );
    }

    return firstValueFrom(this.initOsInfo$);
  }

  async getOsInfo() {
    try {
      // https://docs.uaparser.dev/api/main/idata/with-feature-check.html
      const featureResult = await UAParser().withFeatureCheck();
      // https://docs.uaparser.dev/guides/how-to-detect-macos-10157-using-javascript.html
      // https://docs.uaparser.dev/api/main/idata/with-client-hints.html

      const withHintsResult = await featureResult.withClientHints();

      return withHintsResult;
    } catch (error) {
      return new UAParser().getResult();
    }
  }
}
