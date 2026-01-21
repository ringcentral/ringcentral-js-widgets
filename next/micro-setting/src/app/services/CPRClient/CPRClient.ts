import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import {
  AccountInfo,
  Auth,
  Client,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  BrowserLogger,
  Toast,
  UAParsedInfo,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  delegate,
  inject,
  injectable,
  optional,
  PortManager,
  RcModule,
} from '@ringcentral-integration/next-core';
import JSZip from 'jszip';
import { defaultTo, head } from 'ramda';

import type {
  CPRClientOptions,
  FileMeta,
  ClientAppType,
} from './CPRClient.interface';
import { createCPRRequest } from './createCPRRequest';
import { t } from './i18n';

const APPLICATION_LOGS_NAME = 'applicationLogs.zip';

@injectable({
  name: 'CPRClient',
})
export class CPRClient extends RcModule {
  constructor(
    private _accountInfo: AccountInfo,
    private _auth: Auth,
    private _brand: Brand,
    private _client: Client,
    private _extensionInfo: ExtensionInfo,
    private _portManager: PortManager,
    private _toast: Toast,
    private _browserLogger: BrowserLogger,
    private _UAParsedInfo: UAParsedInfo,
    @inject('SdkConfig') private _sdkConfig: SDKConfig,
    @optional('CPRClientOptions')
    protected _cPRClientOptions?: CPRClientOptions,
  ) {
    super();
  }

  get hasPermission() {
    return !!(
      this._auth.token?.scope?.includes?.('ProblemReportsManagement') &&
      this._auth.token?.scope?.includes?.('SendUsageInfo')
    );
  }

  get logsFilename() {
    return this._cPRClientOptions?.logsFilename || APPLICATION_LOGS_NAME;
  }

  @delegate('server')
  async getEDRInfo() {
    try {
      const resp = await this._client.service.get(
        '/restapi/v1.0/client-info/edr-info?channelId=problemReports',
      );
      const data = await resp.json();
      return data as { cprUri: string; token: string };
    } catch (error) {
      this.logger.error('Error getting EDR info:', error);
      return { cprUri: '', token: '' };
    }
  }

  async sendCPR(description: string, extraFiles: FileMeta[]) {
    try {
      const { cprUri, token } = await this.getEDRInfo();
      if (!cprUri || !token) {
        this._toast.danger({ message: t('ApiFailure') });
        return null;
      }

      const merged = await this.processAndSendToCPR({ extraFiles });

      if (!merged) {
        throw new Error('failed to build log archive');
      }

      // Get client info (app type and details) - includes DP version for MS Teams
      const { clientAppType, clientDetails } = await this.getClientInfo();

      const resp = await createCPRRequest(cprUri, {
        token,
        data: {
          description,
          title: 'Automated Log Submission',
          accountId: String(this._accountInfo.id),
          brandId: this._brand.id,
          clientEndpointId: this._auth.token.endpointId,
          clientId: this._sdkConfig.clientId,
          clientVersion: this._sdkConfig.appVersion || '1.0.0',
          // TODO: Better way to do productCategory and productSubcategory
          productCategory: this._brand.application,
          userId: this._extensionInfo.id.toString(),
          submitterEmail: this._extensionInfo.data?.contact?.email,
          clientAppType,
          clientDetails,
        },
        attachments: [{ data: merged.content, filename: merged.name }],
      });

      return resp;
    } catch (error) {
      this.logger.error('Error submitting CPR Report:', error);
      return false;
    }
  }

  async processAndSendToCPR({ extraFiles = [] }: { extraFiles: FileMeta[] }) {
    const storageTransport = this._browserLogger.storageTransport;
    if (!storageTransport) {
      this.logger.error('StorageTransport not available on Client');
      return;
    }

    try {
      const { name } = this._portManager.portDetector.sharedAppOptions;
      await storageTransport.saveDB();
      const logsData = await storageTransport.getLogs({ name });

      if (!logsData?.content) return;

      const zip = await JSZip.loadAsync(logsData.content);

      // Add additional logs if provider exists (e.g., Jupiter, GA logs)
      if (this._cPRClientOptions?.additionalLogProvider) {
        try {
          await this._cPRClientOptions.additionalLogProvider.addAdditionalLogs(
            zip,
          );
        } catch (error) {
          this.logger.warn('Failed to add additional logs:', error);
        }
      }

      if (extraFiles.length > 0) {
        const attachmentsFolder = zip.folder(`${logsData.name}/attachments`);

        if (attachmentsFolder) {
          for (const { name, base64Url } of extraFiles) {
            // Extract base64 data from data URL
            const base64Data = base64Url.split(',')[1];

            // Add the file to zip
            attachmentsFolder.file(name, base64Data, { base64: true });
          }
        } else {
          this.logger.error('Attachments folder not found');
        }
      }

      const mergedBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9,
        },
      });

      return {
        content: mergedBlob,
        name: this.logsFilename,
      };
    } catch (error) {
      this.logger.error('Error retrieving logs:', error);
    }
  }

  /**
   * Determines the client application type and details for CPR reporting
   * @returns Object containing clientAppType and clientDetails
   */
  private async getClientInfo(): Promise<{
    clientAppType: ClientAppType;
    clientDetails: string;
  }> {
    if (this._cPRClientOptions?.clientInfoProvider) {
      // Get client info from Jupiter
      const clientAppType =
        this._cPRClientOptions.clientInfoProvider.getCprClientAppType() as ClientAppType;

      // Get DP version for MS Teams
      const dpVersion =
        await this._cPRClientOptions.clientInfoProvider?.getDpVersion?.();

      const clientDetails =
        this._cPRClientOptions.clientInfoProvider.getCprClientDetails(
          dpVersion,
        );

      return {
        clientAppType,
        clientDetails,
      };
    } else {
      const osInfo = await this._UAParsedInfo.getOsInfo();
      return {
        clientAppType: 'RCIntegrationAppWeb',
        clientDetails: `${osInfo?.os?.name?.replace(' ', '')}-${
          osInfo?.browser?.name
        }-${defaultTo(
          'Unknown',
          head(osInfo?.browser?.version?.split('.') || []),
        )}`,
      };
    }
  }
}
