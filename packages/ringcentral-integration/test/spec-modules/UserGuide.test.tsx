import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { UserGuide, Guides, CarouselState } from '../../modules/UserGuideV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    preLoadImageStatus: false,
    allGuides: {} as Guides,
    carouselState: {
      curIdx: 0,
      entered: false,
      playing: false,
    } as CarouselState,
    firstLogin: false,
  });

@autorun(test)
@title('UserGuide Module "setPreLoadImageStatus" action')
export class SetPreLoadImageStatus extends Step {
  run() {
    return (
      <Scenario desc="UserGuide Module 'setPreLoadImageStatus' action">
        <Given
          desc="Create an UserGuide instance with default value"
          action={(_: any, context: any) => {
            const userGuide = new UserGuide({} as any);
            expect(userGuide.preLoadImageStatus).toBe(false);
            expect(userGuide.allGuides).toEqual({});
            expect(userGuide.carouselState).toEqual({
              curIdx: 0,
              entered: false,
              playing: false,
            });
            expect(userGuide.firstLogin).toBe(false);
            context.instance = userGuide;
          }}
        />
        <When
          desc="Call UserGuide 'setPreLoadImageStatus' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setPreLoadImageStatus.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.preLoadImageStatus).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('UserGuide Module "setGuides" action')
export class SetGuides extends Step {
  run() {
    return (
      <Scenario desc="UserGuide Module 'setGuides' action">
        <Given
          desc="Create an UserGuide instance with default value"
          action={(_: any, context: any) => {
            const userGuide = new UserGuide({} as any);
            expect(userGuide.preLoadImageStatus).toBe(false);
            expect(userGuide.allGuides).toEqual({});
            expect(userGuide.carouselState).toEqual({
              curIdx: 0,
              entered: false,
              playing: false,
            });
            expect(userGuide.firstLogin).toBe(false);
            context.instance = userGuide;
          }}
        />
        <When
          desc="Call UserGuide 'setGuides' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.guides = {
              'en-US': [
                '/images/en-US_0_192b9cd5bd438bd3f9836a7e1bd838d5.png',
                '/images/en-US_1_8440052278de66f6e13d1b8678561c58.png',
                '/images/en-US_2_f7baeb89f589bc5be9fe7357df592af9.png',
                '/images/en-US_3_17c9689851ecd626304d01f9450dc511.png',
                '/images/en-US_4_8645283e97910eb3c2e0e366bf3e642f.png',
                '/images/en-US_5_12437cbc1a8964185ce9e0d6f96bcb45.png',
                '/images/en-US_6_3f3ced4630ac851106756d48d0babae2.png',
                '/images/en-US_7_e1acdd9ffffa87d0943cf7f3d5a2951b.png',
              ],
              'fr-CA': [
                '/images/fr-CA_0_94739d975bf1f4526f20f75be437a9cb.png',
                '/images/fr-CA_1_02e82b2e7f7f083a7fc9dadf21df1788.png',
                '/images/fr-CA_2_c66d6b481b0cbfd88fa0235dd950bccb.png',
                '/images/fr-CA_3_39606dfc7b9611f5a2a94b96df5d573b.png',
                '/images/fr-CA_4_c1eade5630627eb3ee1c2036e808857d.png',
                '/images/fr-CA_5_74675d6a92b9c1bcf5f38ee4e1adb376.png',
                '/images/fr-CA_6_928f7278f45e650ac8147d8ca47ae54c.png',
                '/images/fr-CA_7_2f842467bda69a17ad028d693f2e09ed.png',
              ],
            };
            context.instance.setGuides.call(context.mockModule, context.guides);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.allGuides).toBe(context.guides);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('UserGuide Module "setCarousel" action')
export class SetCarousel extends Step {
  run() {
    return (
      <Scenario desc="UserGuide Module 'setCarousel' action">
        <Given
          desc="Create an UserGuide instance with default value"
          action={(_: any, context: any) => {
            const userGuide = new UserGuide({} as any);
            expect(userGuide.preLoadImageStatus).toBe(false);
            expect(userGuide.allGuides).toEqual({});
            expect(userGuide.carouselState).toEqual({
              curIdx: 0,
              entered: false,
              playing: false,
            });
            expect(userGuide.firstLogin).toBe(false);
            context.instance = userGuide;
          }}
        />
        <When
          desc="Call UserGuide 'setCarousel' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.carouselOptions = {
              curIdx: 1,
              entered: true,
              playing: true,
              firstLogin: true,
            };
            context.instance.setCarousel.call(
              context.mockModule,
              context.carouselOptions,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            const { firstLogin, ...carouselState } = context.carouselOptions;
            expect(context.mockModule.carouselState).toEqual(carouselState);
            expect(context.mockModule.firstLogin).toBe(firstLogin);
          }}
        />
      </Scenario>
    );
  }
}
