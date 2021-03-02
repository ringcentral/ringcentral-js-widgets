import Client from 'ringcentral-client';

import RcModule from '../../lib/RcModule';
import { ClientError } from '../../interfaces/ClientResponse';
import Alert from '../Alert';
import Environment from '../Environment';

declare class AvailabilityMonitor extends RcModule {
  /**
   * @param  {Alert} alert
   * @param  {Client} client
   * @param  {Environment} environment
   * @param  {boolean=false} enabled
   * @param  {any[]} ...options?
   */
  constructor(
    alert: Alert,
    client: Client,
    environment: Environment,
    enabled: boolean,
    ...options: any[]
  );

  initialize(): void;

  _requestErrorHandler(error: ClientError): Promise<void>;

  checkIfHAError(error: ClientError): Promise<boolean>;

  isVoIPOnlyMode: boolean;
}

export default AvailabilityMonitor;
