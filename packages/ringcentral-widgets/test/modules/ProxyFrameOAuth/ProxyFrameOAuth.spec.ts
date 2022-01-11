import { mockModuleGenerator } from '@ringcentral-integration/commons/test/lib/mockModule';
import ProxyFrameOAuth from '../../../modules/ProxyFrameOAuth';

const mockFunc = jest.fn();

const deps = {
  alert: {},
  auth: {},
  locale: {},
  brand: {},
  client: {},
  routerInteraction: {},
};

describe('ProxyFrameOAuth', () => {
  it('Check module function works', async () => {
    const instance = new ProxyFrameOAuth(deps);
    const mockModule = mockModuleGenerator({
      _client: {
        service: {
          platform: () => {
            return {
              discovery: () => true,
              loginUrlWithDiscovery: mockFunc,
            };
          },
        },
      },
      oAuthReady: true,
      _clearImplicitRefreshIframe: () => {},
    });
    ProxyFrameOAuth.prototype.openOAuthPage.call(mockModule);
    expect(mockFunc).toBeCalled();
    ProxyFrameOAuth.prototype._createImplicitRefreshIframe.call(mockModule);
    expect(mockModule._implicitRefreshFrame).not.toEqual(null);
    ProxyFrameOAuth.prototype._clearImplicitRefreshIframe.call(mockModule);
    expect(mockModule._implicitRefreshFrame).toEqual(null);
  });
});
