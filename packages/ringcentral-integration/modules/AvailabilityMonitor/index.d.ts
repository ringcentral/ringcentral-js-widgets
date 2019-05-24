export declare class AvailabilityMonitor extends RcModule {
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
    enabled: boolean = false,
    ...options: any[]
  );

  initialize(): void;

  _requestErrorHandler(error: ClientError): void;

  checkIfHAError(error: ClientError): boolean;
}
