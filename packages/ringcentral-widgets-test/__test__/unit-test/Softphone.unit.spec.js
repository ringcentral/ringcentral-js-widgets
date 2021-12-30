import moduleStatuses from '@ringcentral-integration/commons/enums/moduleStatuses';
import { mockModuleGenerator } from '@ringcentral-integration/commons/test/lib/mockModule';
import { Softphone } from '@ringcentral-integration/commons/modules/Softphone';

describe.skip.each`
  brandCode  | spartanProtocol    | jupiterProtocol              | jupiterUniversalLink
  ${'att'}   | ${'attvr20://'}    | ${'officeathand://'}         | ${'https://app.officeathand.att.com/'}
  ${'bt'}    | ${'rcbtmobile://'} | ${'com.bt.cloudwork.app://'} | ${'http://app.cloudwork.bt.com/'}
  ${'rc'}    | ${'rcmobile://'}   | ${'rcapp://'}                | ${'https://app.ringcentral.com/'}
  ${'telus'} | ${'rctelus://'}    | ${'rctelus://'}              | ${'https://app.businessconnect.telus.com/'}
`(
  'Softphone Unit Test',
  ({ brandCode, spartanProtocol, jupiterProtocol, jupiterUniversalLink }) => {
    const softphone = mockModuleGenerator(
      new Softphone({
        brand: {
          code: brandCode,
        },
      }),
    );

    describe(`[${brandCode}] spartan protocol`, () => {
      it(`should return ${spartanProtocol}`, () => {
        expect(softphone.spartanProtocol).toEqual(spartanProtocol);
      });
    });

    describe(`[${brandCode}] jupiter protocol`, () => {
      it(`should return ${jupiterProtocol}`, () => {
        expect(softphone.jupiterProtocol).toEqual(jupiterProtocol);
      });
    });

    describe(`[${brandCode}] jupiter universal link`, () => {
      it(`should return ${jupiterUniversalLink}`, () => {
        expect(softphone.jupiterUniversalLink).toEqual(jupiterUniversalLink);
      });
    });

    describe(`[${brandCode}] ready`, () => {
      it('should return true', () => {
        expect(softphone.ready).toEqual(true);
      });
    });

    describe(`[${brandCode}] status`, () => {
      it('should return moduleStatuses.ready', () => {
        expect(softphone.status).toEqual(moduleStatuses.ready);
      });
    });
  },
);
