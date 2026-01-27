import type { ProblemReportResource } from './CPRClient.interface';

export interface CreateCPRRequestParams {
  token: string;
  data: ProblemReportResource;
  attachments: { data: Blob; filename: string }[];
}

/**
 * Creates a CPR (Customer Problem Report) request by building FormData with attachments
 * and problem report metadata, then sending it to the CPR API.
 *
 * @param params - The parameters required to create the CPR request
 * @returns Promise<ProblemReportResource> - The response from the CPR API
 */
export async function createCPRRequest(
  uri: string,
  { token, data, attachments }: CreateCPRRequestParams,
): Promise<ProblemReportResource> {
  const body = new FormData();

  // Add attachments to FormData
  for (const attachment of attachments) {
    body.append('attachments', attachment.data, attachment.filename);
  }

  // Create the problem report request JSON blob
  const problemReportData = {
    creationTime: new Date().toISOString(),
    ...data,
  };

  body.append(
    'problemReportRequest',
    new Blob([JSON.stringify(problemReportData)], {
      type: 'application/json',
    }),
    'problemReportRequest.json',
  );

  // Send the request to CPR API
  const response = await fetch(`${uri}/cpr-api/v1/problem-reports`, {
    body,
    headers: { authorization: `Bearer ${token}` },
    method: 'POST',
  });

  return await response.json();
}
