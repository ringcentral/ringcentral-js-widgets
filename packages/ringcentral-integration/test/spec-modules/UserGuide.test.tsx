import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CarouselState,
  Guides,
  SUPPORTED_LOCALES,
  UserGuide,
} from '../../modules/UserGuideV2';
import { mockModuleGenerator } from '../lib/mockModule';

const brandCode = 'rc';
const startFn = jest.fn();
const guides = Object.keys(SUPPORTED_LOCALES).reduce((obj, key) => {
  obj[key] = ['/images/fake.png'];
  return obj;
}, {} as Guides);

const getMockModule = () =>
  mockModuleGenerator({
    _deps: { brand: { code: brandCode } },
    preLoadImageStatus: false,
    allGuides: { ...guides },
    carouselState: {
      curIdx: 0,
      entered: false,
      playing: false,
    } as CarouselState,
    firstLogin: false,
    start: startFn,
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
            context.guides = { ...guides };
            context.instance.setGuides.call(context.mockModule, context.guides);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(startFn).toBeCalledTimes(1);
            expect(startFn.mock.calls[0][0]).toEqual({ firstLogin: true });
            expect(context.mockModule.allGuides[brandCode]).toBe(
              context.guides,
            );
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

@autorun(test)
@title('UserGuide Module "_migrateGuides" action')
export class MigrateGuides extends Step {
  run() {
    return (
      <Scenario desc="UserGuide Module '_migrateGuides' action">
        <Given
          desc="Create an UserGuide instance with default value"
          action={(_: any, context: any) => {
            const userGuide = new UserGuide({} as any);
            context.instance = userGuide;
          }}
        />
        <When
          desc="Call UserGuide '_migrateGuides' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._migrateGuides.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            Object.keys(SUPPORTED_LOCALES).forEach((locale) => {
              expect(context.mockModule.allGuides[locale]).toBeUndefined();
            });
            expect(context.mockModule.allGuides[brandCode]).toEqual(guides);
          }}
        />
      </Scenario>
    );
  }
}
