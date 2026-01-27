import type JSZip from 'jszip';

export type ClientAppType =
  | 'RCAppDesktop'
  | 'RCAppMobile'
  | 'RCPhoneDesktop'
  | 'RCVWeb'
  | 'RCWebinar'
  | 'RCRooms'
  | 'RCSoftphone'
  | 'RCIntegrationAppWeb'
  | 'RCIntegrationAppDesktop'
  | 'RCIntegrationAppMobile'
  | 'RCSoloAppMobile'
  | 'RingCX'
  | 'ExpressSetup';

export interface CPRClientOptions {
  /**
   * The filename of the logs to be attached to the CPR request
   *
   * @default 'applicationLogs.zip'
   */
  logsFilename?: string;
  /**
   * Client info provider for platform-specific client detection
   * Used for MS Teams (with DP version).
   */
  clientInfoProvider?: CPRClientInfoProvider;

  /**
   * Additional log provider for collecting platform-specific logs
   * e.g., Jupiter logs, GA logs
   */
  additionalLogProvider?: AdditionalLogProvider;
}

export type FileMeta = {
  id: string;
  name: string;
  size: number;
  base64Url: string;
};

export interface ProblemReportResource {
  accountId?: string;
  attachments?: {
    content?: {
      expiresIn: number;
      uri: string;
    };
    contentType: string;
    fileName: string;
    id: string;
    size: string;
  }[];
  brandId?: string;
  clientAppType?: ClientAppType;
  clientDetails?: string;
  clientEndpointId?: string;
  clientId?: string;
  clientVersion?: string;
  creationTime?: string;
  deletionTime?: string;
  description: string;
  envName?: string;
  id?: string;
  productCategory?: string;
  productSubcategory?: string;
  submitterEmail?: string;
  title: string;
  userId?: string;
}

export interface AttachmentItem {
  data: Blob;
  filename: string;
  auto?: boolean;
}

export interface CPRClientInfoProvider {
  getCprClientAppType(): ClientAppType;
  getCprClientDetails(dpVersion?: string): string;
  getDpVersion?(): Promise<string | undefined>;
}

export interface AdditionalLogProvider {
  addAdditionalLogs(zip: JSZip): Promise<void>;
}
