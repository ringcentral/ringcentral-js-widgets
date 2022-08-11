import { waitUntilTo } from '@ringcentral-integration/commons/utils';
import { p2, it, StepFunction } from '@ringcentral-integration/test-utils';
import bssEnUSData from '../../../../../packages/internal-features-test/test/steps/Mock/data/bssEnUSData.json';
import bssBaseData from '../../../../../packages/internal-features-test/test/steps/Mock/data/bssBaseData.json';
import { MockBssData } from '../../../../../packages/internal-features-test/test/steps/Mock/MockBssData';

import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '../../lib/step';
import { CreateInstance } from '../../steps/CreateInstance';
import { Login } from '../../steps/Login';
import { CreateMock } from '../../steps/Mock';

import { MockClientInfo } from '../../../../../packages/internal-features-test/test/steps/Mock/MockClientInfo';
import clientInfoData from '../../../../../packages/internal-features-test/test/steps/Mock/data/clientInfoData.json';
import { MockReadClientInfoPermission } from '../../../../../packages/internal-features-test/test/steps/Mock/MockReadClientInfoPermission';

/**
 * RCINT-26145: Check Brand Asset Mapping is correct with BrandConfig
 * Precondition:
 *  1. Application with ReadClientInfo permission
 *  2. Application with BrandAssetService module
 */

const {
  provisioning: { assetService: defaultAssetService },
} = clientInfoData;

@autorun(test.skip)
@it
@p2
@title('CheckBrandAssetMapping')
export class CheckBrandAssetMapping extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = Login, CustomCreateMock = CreateMock } = this;
    const mockBrandAssetMappingData: Record<any, string> = {
      displayName: 'test displayName',
      shortDisplayName: 'test shortDisplayName',
      videoProductName: 'test videoProductName',
      mvpProductName: 'test mvpProductName',
    };
    return (
      <Scenario desc="Check Brand Asset Mapping">
        <When
          desc="Create mocks"
          action={[
            CustomCreateMock,
            MockClientInfo,
            () => {
              this.context.rcMock.defaultInitMocks.delete(
                this.context.rcMock.postOauthToken,
              );
            },
            MockReadClientInfoPermission,
            () => (
              <MockBssData
                status={200}
                assetService={defaultAssetService}
                key="base"
                defaultData={bssBaseData}
              />
            ),
            () => (
              <MockBssData
                status={200}
                assetService={defaultAssetService}
                key="en-US"
                defaultData={{
                  ...bssEnUSData,
                  ...mockBrandAssetMappingData,
                }}
              />
            ),
            CreateInstance,
          ]}
        />
        <When desc="User logs in" action={CustomLogin} />
        <Then
          desc="Client info data should be loaded"
          action={async () => {
            const { phone } = global.instance;
            await waitUntilTo(() => {
              expect(phone.clientInfo.ready).toBeTruthy();
            });
            expect(!!phone.clientInfo.data).toBe(true);
          }}
        />
        <Then
          desc="Brand config data should consist with mockBrandAssetMappingData"
          action={async () => {
            const { brand } = global.instance.phone;
            await waitUntilTo(() => {
              expect(brand._dynamicConfig.name).toEqual(
                mockBrandAssetMappingData.displayName,
              );
              expect(brand._dynamicConfig.shortName).toEqual(
                mockBrandAssetMappingData.shortDisplayName,
              );
              expect(brand._dynamicConfig.rcvProductName).toEqual(
                mockBrandAssetMappingData.videoProductName,
              );
              expect(brand._dynamicConfig.callWithJupiter.name).toEqual(
                mockBrandAssetMappingData.mvpProductName,
              );
            });
          }}
        />
      </Scenario>
    );
  }
}
