import { FAX_ATTACHMENTS_ACCEPT } from './constant';
import { SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST } from './supportedTypes';

describe('FAX_ATTACHMENTS_ACCEPT', () => {
  it('should match the expected snapshot', () => {
    const expectedAttachments = SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST.map(
      (ext) => `.${ext}`,
    ).join(',');
    expect(FAX_ATTACHMENTS_ACCEPT).toEqual(expectedAttachments);
    expect(FAX_ATTACHMENTS_ACCEPT).toMatchSnapshot();
  });
});
