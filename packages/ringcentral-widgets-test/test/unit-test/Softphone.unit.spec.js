import moduleStatuses from 'ringcentral-integration/enums/moduleStatuses';
import Softphone from 'ringcentral-integration/modules/Softphone';

describe.each`
  brandCode  | spartanProtocol | jupiterProtocol | jupiterUniversalLink
  ${'att'}   | ${'attvr20'}    | ${null}         | ${null}
  ${'bt'}    | ${'rcbtmobile'} | ${null}         | ${null}
  ${'rc'}    | ${'rcmobile'}   | ${'rcapp'}      | ${'https://app.ringcentral.com/r/'}
  ${'telus'} | ${'rctelus'}    | ${null}         | ${null}
`(
  'Softphone Unit Test',
  ({ brandCode, spartanProtocol, jupiterProtocol, jupiterUniversalLink }) => {
    const softphone = new Softphone({
      brand: {
        code: brandCode,
      },
    });

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
