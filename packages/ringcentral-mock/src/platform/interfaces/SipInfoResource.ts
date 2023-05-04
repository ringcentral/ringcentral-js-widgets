import { OutboundProxyInfo } from './OutboundProxyInfo';

export interface SipInfoResource {
  /**
   * SIP domain
   */
  domain: string;
  /**
   * List of outbound proxies
   */
  outboundProxies: OutboundProxyInfo[];
  /**
   * User credentials
   */
  userName: string;
  /**
   * User password
   */
  password: string;
  /**
   * Internal identifier for SIP authorization
   */
  authorizationId: string;
}
