import type { Logger } from '@ringcentral/mfe-logger';
import type JSZip from 'jszip';

export interface AdditionalLogProvider {
  /**
   * Collect additional logs and add them to the archive.
   * @param zip The JSZip instance to which the logs will be added.
   * @param scope Optional array of strings specifying the scope of logs to collect.
   */
  addAdditionalLogs(zip: JSZip, scope?: string[]): Promise<void>;
  /**
   * Collect additional logs and add them to the archive without sanitize.
   *
   * @param zip The JSZip instance to which the logs will be added.
   * @param scope Optional array of strings specifying the scope of logs to collect.
   */
  addAdditionalLogsWithoutSanitize(zip: JSZip, scope?: string[]): Promise<void>;
}

export interface ExtraLogFile {
  name: string;
  base64Url: string;
}

export interface CollectSanitizedLogsOptions {
  /**
   * Scope of additional logs to collect, e.g. `['jupiter', 'ga']`.
   */
  scope?: string[];
  /**
   * Extra files to include in the archive attachments folder.
   */
  extraFiles?: ExtraLogFile[];
}

export interface SanitizedLogArchive {
  content: Blob;
  name: string;
}

export interface BrowserLoggerOptions {
  /**
   * logger name
   */
  name?: string;
  /**
   * enabled logger initial
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * logger
   */
  logger?: Logger;
  /**
   * worker
   */
  worker?: SharedWorker;
  /**
   * Additional log provider for collecting app-specific logs
   * (e.g. Jupiter logs, GA logs, Smart Notes logs).
   */
  additionalLogProvider?: AdditionalLogProvider;
}
