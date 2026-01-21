export function CheckIsCRM(appName: string) {
  return (
    appName === 'Salesforce' ||
    appName === 'HubSpot' ||
    appName === 'Zendesk' ||
    appName === 'Dynamics'
  );
}
