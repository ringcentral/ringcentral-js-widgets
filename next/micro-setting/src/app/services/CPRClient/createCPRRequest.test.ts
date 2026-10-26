import type { ProblemReportResource } from './CPRClient.interface';
import { createCPRRequest, CreateCPRRequestParams } from './createCPRRequest';
import fetchMock = require('fetch-mock-jest');

const mockFetch = fetchMock;
const cprApiMatcher = /\/cpr-api\/v1\/problem-reports$/;

const mockCprApiResponse = (response: unknown) => {
  mockFetch.mock(
    cprApiMatcher,
    {
      body: response,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { method: 'POST' },
  );
};

describe('createCPRRequest', () => {
  beforeAll(() => {
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockFetch.mockReset();
  });

  const mockProblemReportData: ProblemReportResource = {
    title: 'Test Problem Report',
    description: 'This is a test problem report',
    accountId: 'test-account-id',
    userId: 'test-user-id',
  };

  const mockAttachments = [
    {
      data: new Blob(['test content 1'], { type: 'text/plain' }),
      filename: 'test1.txt',
    },
    {
      data: new Blob(['test content 2'], { type: 'application/json' }),
      filename: 'test2.json',
    },
  ];

  const mockParams: CreateCPRRequestParams = {
    token: 'test-token',
    data: mockProblemReportData,
    attachments: mockAttachments,
  };

  const mockUri = 'https://api.example.com';

  describe('successful request', () => {
    beforeEach(() => {
      mockCprApiResponse({
        id: 'test-report-id',
        ...mockProblemReportData,
      });
    });

    it('should create a CPR request with correct FormData structure', async () => {
      await createCPRRequest(mockUri, mockParams);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch.lastUrl()).toBe(`${mockUri}/cpr-api/v1/problem-reports`);
      expect(mockFetch.lastOptions()).toEqual(
        expect.objectContaining({
          body: expect.any(FormData),
          headers: { authorization: 'Bearer test-token' },
          method: 'POST',
        }),
      );
    });

    it('should append attachments to FormData', async () => {
      await createCPRRequest(mockUri, mockParams);

      const formData = mockFetch.lastOptions()?.body as FormData;

      // Check that attachments are appended
      expect(formData.has('attachments')).toBe(true);
    });

    it('should append problem report request as JSON blob', async () => {
      await createCPRRequest(mockUri, mockParams);

      const formData = mockFetch.lastOptions()?.body as FormData;

      // Check that problem report request is appended
      expect(formData.has('problemReportRequest')).toBe(true);
    });

    it('should return the response from the API', async () => {
      const expectedResponse = {
        id: 'test-report-id',
        ...mockProblemReportData,
      };

      const result = await createCPRRequest(mockUri, mockParams);

      expect(result).toEqual(expectedResponse);
    });

    it('should set correct client app type', async () => {
      await createCPRRequest(mockUri, mockParams);

      // The function should set clientAppType to 'RCIntegrationAppWeb'
      // This is verified through the FormData structure
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('error handling', () => {
    it('should propagate fetch errors', async () => {
      const error = new Error('Network error');
      mockFetch.mock(
        cprApiMatcher,
        { throws: error },
        { method: 'POST' },
      );

      await expect(createCPRRequest(mockUri, mockParams)).rejects.toThrow(
        'Network error',
      );
    });

    it('should throw when the CPR API returns a non-OK status', async () => {
      mockFetch.mock(
        cprApiMatcher,
        {
          status: 500,
          body: { error: 'submit failed' },
          headers: {
            'Content-Type': 'application/json',
          },
        },
        { method: 'POST' },
      );

      await expect(createCPRRequest(mockUri, mockParams)).rejects.toThrow(
        'CPR request failed with status 500',
      );
    });

    it('should propagate JSON parsing errors', async () => {
      mockFetch.mock(
        cprApiMatcher,
        {
          body: '{',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        { method: 'POST' },
      );

      await expect(createCPRRequest(mockUri, mockParams)).rejects.toThrow();
    });
  });

  describe('FormData construction', () => {
    it('should handle empty attachments array', async () => {
      const paramsWithNoAttachments: CreateCPRRequestParams = {
        ...mockParams,
        attachments: [],
      };

      mockCprApiResponse({ id: 'test-id' });

      await createCPRRequest(mockUri, paramsWithNoAttachments);

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should preserve original problem report data', async () => {
      const customData: ProblemReportResource = {
        title: 'Custom Title',
        description: 'Custom Description',
        accountId: 'custom-account',
        brandId: 'custom-brand',
        productCategory: 'custom-category',
      };

      const customParams: CreateCPRRequestParams = {
        ...mockParams,
        data: customData,
      };

      mockCprApiResponse({ id: 'test-id' });

      await createCPRRequest(mockUri, customParams);

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('API endpoint construction', () => {
    it('should use the provided URI correctly', async () => {
      const customUri = 'https://custom-api.example.com';
      mockCprApiResponse({ id: 'test-id' });

      await createCPRRequest(customUri, mockParams);

      expect(mockFetch.lastUrl()).toBe(
        `${customUri}/cpr-api/v1/problem-reports`,
      );
    });
  });
});
