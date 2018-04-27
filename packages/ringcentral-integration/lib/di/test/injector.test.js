import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import {
  Injector
} from '../';
import Registry from '../registry/registry';
import { ClassProvider, ExistingProvider, ValueProvider, FactoryProvider } from '../provider';

chai.use(dirtyChai);

describe('Injector', () => {
  beforeEach(() => Injector.reset());

  describe('#resolveModuleProvider', () => {
    it('should throw when provider class does not exist', () => {
      const invalidParamsFunction = () => {
        const injector = new Injector();
        injector.resolveModuleProvider();
      };
      expect(invalidParamsFunction).to.throw();
    });

    it('should not calculate provider if already exists', () => {
      const injector = new Injector();
      const provider = new ClassProvider('Token', {});
      injector.container.set('Token', provider);
      injector.resolveModuleProvider(provider);
      expect(injector.container._map.size).to.equal(1);
    });

    describe('ExistingProvider', () => {
      it('should support ClassProvider', () => {
        class Provider {}
        Registry.registerModule(Provider);
        const injector = new Injector();
        injector.universalProviders.set(
          'Provider',
          new ClassProvider('Provider', Provider)
        );
        injector.universalProviders.set(
          'Exist',
          new ExistingProvider('Exist', 'Provider')
        );
        injector.resolveModuleProvider(injector.universalProviders.get('Exist'));
        expect(injector.container._map.size).to.equal(2);
        expect(injector.get('Exist')).to.be.an.instanceof(Provider);
      });

      it('shold throw when use existing parent ModuleFactory provider', () => {
        class Provider {}
        Registry.registerModule(Provider);
        const parentInjector = new Injector();
        const injector = new Injector();
        injector.setParent(parentInjector);
        parentInjector.universalProviders.set(
          'Provider',
          new ClassProvider('Provider', Provider)
        );
        injector.universalProviders.set(
          'Exist',
          new ExistingProvider('Exist', 'Provider')
        );
        const func = () => injector.resolveModuleProvider(injector.universalProviders.get('Exist'));
        expect(func).to.throw();
      });

      it('should support ValueProvider', () => {
        const val = { val: 'val' };
        const injector = new Injector();
        injector.universalProviders.set(
          'ValueProvider',
          new ValueProvider('ValueProvider', val)
        );
        injector.universalProviders.set(
          'Exist',
          new ExistingProvider('Exist', 'ValueProvider')
        );
        injector.resolveModuleProvider(injector.universalProviders.get('Exist'));
        expect(injector.container._map.size).to.equal(2);
        expect(injector.get('Exist')).to.equal(val);
      });

      it('should support FactoryProvider', () => {
        const func = () => {};
        const injector = new Injector();
        injector.universalProviders.set(
          'FactoryProvider',
          new ValueProvider('FactoryProvider', func)
        );
        injector.universalProviders.set(
          'Exist',
          new ExistingProvider('Exist', 'FactoryProvider')
        );
        injector.resolveModuleProvider(injector.universalProviders.get('Exist'));
        expect(injector.container._map.size).to.equal(2);
        expect(injector.get('Exist')).to.equal(func);
      });
    });

    describe('hierarchical providers', () => {
      it('should be copied to local container', () => {
        class Provider {}
        Registry.registerModule(Provider);
        const parentInjector = new Injector();
        const injector = new Injector();
        injector.setParent(parentInjector);
        parentInjector.universalProviders.set(
          'Provider',
          new ClassProvider('Provider', Provider)
        );
        injector.resolveModuleProvider(parentInjector.universalProviders.get('Provider'));
        expect(injector.container.localHas('Provider')).to.be.true();
        expect(parentInjector.container.localHas('Provider')).to.be.true();
        expect(
          parentInjector.container.localGet('Provider')
        ).to.equal(
          injector.container.localGet('Provider')
        );
      });
    });

    describe('ValueProvider', () => {
      it('should process ValueProvider correctly', () => {
        const config = { config: 'test' };
        const injector = new Injector();
        const provider = new ValueProvider('Config', config);
        injector.resolveModuleProvider(provider);
        expect(injector.get('Config')).to.equal(config);
      });

      it('should support object type', () => {
        // Support object
        const val = { config: 'test' };
        const injector = new Injector();
        const provider = new ValueProvider('Value', val);
        injector.resolveModuleProvider(provider);
        expect(injector.get('Value')).to.equal(val);
      });

      it('should support number type', () => {
        const val = 10;
        const injector = new Injector();
        const provider = new ValueProvider('Value', val);
        injector.resolveModuleProvider(provider);
        expect(injector.get('Value')).to.equal(val);
      });

      it('should support string type', () => {
        const val = 'string';
        const injector = new Injector();
        const provider = new ValueProvider('Value', val);
        injector.resolveModuleProvider(provider);
        expect(injector.get('Value')).to.equal(val);
      });

      it('should support boolean type', () => {
        const val = true;
        const injector = new Injector();
        const provider = new ValueProvider('Value', val);
        injector.resolveModuleProvider(provider);
        expect(injector.get('Value')).to.equal(val);
      });

      it('should support array type', () => {
        const val = [1, 2, 3];
        const injector = new Injector();
        const provider = new ValueProvider('Value', val);
        injector.resolveModuleProvider(provider);
        expect(injector.get('Value')).to.equal(val);
      });

      it('should recognize spread flag', () => {
        const config = { config: 'test' };
        const injector = new Injector();
        const provider = new ValueProvider('Config', config, true);
        injector.resolveModuleProvider(provider);
        expect(injector.container.get('Config').instance).to.deep.equal({
          spread: true,
          value: config
        });
      });
    });

    describe('FactoryProvider', () => {
      it('should support factory provider', () => {
        const stub = {};
        const injector = new Injector();
        const provider = new FactoryProvider('Factory', () => stub);
        injector.resolveModuleProvider(provider);
        expect(injector.get('Factory')).to.be.equal(stub);
      });

      it('should support deps', () => {
        class Dep {}
        const injector = new Injector();
        Registry.registerModule(Dep);
        injector.universalProviders.set(
          'Factory',
          new FactoryProvider('Factory', dep => ({ dep }), ['Dep'])
        );
        injector.universalProviders.set(
          'Dep',
          new ClassProvider('Dep', Dep)
        );
        injector.resolveModuleProvider(injector.universalProviders.get('Factory'));
        expect(injector.get('Factory').dep.dep).to.equal(
          injector.get('Dep')
        );
      });

      it('should support optional deps', () => {
        class Dep {}
        const injector = new Injector();
        Registry.registerModule(Dep);
        injector.universalProviders.set(
          'Factory',
          new FactoryProvider(
            'Factory',
            dep => ({ dep }),
            ['Dep', { dep: 'OptionalDep', optional: true }]
          )
        );
        injector.universalProviders.set(
          'Dep',
          new ClassProvider('Dep', Dep)
        );
        injector.resolveModuleProvider(injector.universalProviders.get('Factory'));
        expect(injector.get('Factory').dep.dep).to.equal(
          injector.get('Dep')
        );
      });
    });

    describe('ClassProvider', () => {
      it('should support ClassProvider', () => {
        class ClassModule {}
        const injector = new Injector();
        Registry.registerModule(ClassModule);
        const provider = new ClassProvider('Module', ClassModule);
        injector.resolveModuleProvider(provider);
        expect(injector.container._map.size).to.equal(1);
        expect(injector.get('Module')).to.be.instanceof(ClassModule);
      });

      it('should resolve dependent providers when resolving class provider', () => {
        class TestModule {}
        const injector = new Injector();
        Registry.registerModule(TestModule, {
          deps: ['DependentModule1', 'DependentModule2']
        });
        const provider = new ClassProvider('TestModule', TestModule);
        sinon.stub(injector, 'resolveDependencies').callsFake(() => null);
        injector.resolveModuleProvider(provider);
        expect(injector.resolveDependencies.calledOnce).to.be.true();
      });

      it('should resolve dependent providers in ancestor moduleFactory', () => {
        class ModuleProvider {}
        const parentInjector = new Injector();
        const injector = new Injector();
        injector.setParent(parentInjector);

        Registry.registerModuleFactory(ModuleProvider, {
          providers: []
        });

        const provider = new ClassProvider('ModuleProvider', ModuleProvider);
        sinon.stub(injector, 'resolveModuleFactoryProvider').callsFake(() => null);
        injector.resolveModuleProvider(provider);
        expect(injector.resolveModuleFactoryProvider.calledOnce).to.be.true();
      });

      it('should throw when provider can not be resolved', () => {
        class ModuleProvider {}
        const injector = new Injector();
        const provider = new ClassProvider('ModuleProvider', ModuleProvider);
        const throws = () => injector.resolveModuleProvider(provider);
        expect(throws).to.throw();
      });
    });
  });

  describe('#resolveDependencies', () => {
    it('should throw an error when circular dependency is found', () => {
      Injector.pending.add('Test');
      const injector = new Injector();
      const throws = () => injector.resolveDependencies([{ dep: 'Test', optional: false }], Injector.pending);
      expect(throws).to.throw();
    });

    it('should resolve dependent provider when it can not be found', () => {
      class FakeProvider {}
      const provider = new ClassProvider('Test', FakeProvider);
      const injector = new Injector();
      injector.universalProviders.set(
        'Test',
        provider
      );
      sinon.stub(injector, 'resolveModuleProvider').callsFake((p) => {
        expect(p).to.equal(provider);
      });
      try {
        injector.resolveDependencies([{ dep: 'Test', optional: false }], new Set());
      } catch (e) { /* Ignore */ }
      expect(injector.resolveModuleProvider.called).to.be.true();
    });

    it('should resolve dependent moduleFactory provider', () => {
      const injector = new Injector();
      const pInjector = new Injector();
      injector.setParent(pInjector);
      sinon.stub(pInjector, 'resolveModuleProviderForChildren').callsFake(() => {});
      try {
        injector.resolveDependencies([{ dep: 'Test', optional: false }], new Set());
      } catch (e) { /* Ingore */ }
      expect(pInjector.resolveModuleProviderForChildren.called).to.be.true();
    });

    it('should support optional dependency', () => {
      const injector = new Injector();
      const deps = injector.resolveDependencies([{ dep: 'Test', optional: true }], new Set());
      expect(deps).to.deep.equal({
        injector
      });
    });

    it('should support throw an error when dep is not optional and it can not be found', () => {
      const injector = new Injector();
      const throws = () => injector.resolveDependencies([{ dep: 'Test', optional: false }], new Set());
      expect(throws).to.throw();
    });

    it('should resolve optional dependency when it exists', () => {
      class T {}
      const instance = new T();
      const p = new ClassProvider('Test', T);
      p.setInstance(instance);
      const injector = new Injector();
      injector.container.set('Test', p);
      const deps = injector.resolveDependencies([{ dep: 'Test', optional: true }], new Set());
      expect(deps).to.deep.equal({
        injector,
        test: instance
      });
    });

    it('should spread values when it is marked as spread', () => {
      const val = { val: 'val' };
      const p = new ValueProvider('Test', val, true);
      p.setInstance({
        spread: true,
        value: val
      });
      const injector = new Injector();
      injector.container.set('Test', p);
      const deps = injector.resolveDependencies([{ dep: 'Test', optional: false }], new Set());
      expect(deps).to.deep.equal({
        injector,
        val: 'val'
      });
    });

    it('should inject injector instance', () => {
      const injector = new Injector();
      const deps = injector.resolveDependencies([], new Set());
      expect(deps).to.deep.equal({ injector });
    });
  });

  describe('resolveModuleProviderForChildren', () => {
    it('should resolve module provider for child injectors', () => {
      const injector = new Injector();
      sinon.stub(injector, 'resolveModuleProvider').callsFake(() => {});
      injector.universalProviders.set('Test', {});
      injector.resolveModuleProviderForChildren('Test');
      expect(injector.resolveModuleProvider.called).to.be.true();
    });

    it('should resolve module from parent injector', () => {
      const pInjector = new Injector();
      const injector = new Injector();
      sinon.stub(pInjector, 'resolveModuleProviderForChildren').callsFake(() => {});
      injector.setParent(pInjector);
      injector.resolveModuleProviderForChildren('Test');
      expect(pInjector.resolveModuleProviderForChildren.called).to.be.true();
    });
  });

  describe('#resolveModuleFactoryProvider', () => {
    it('should throw an error when try to resolve itself', () => {
      class T {}
      const injector = new Injector();
      injector.targetClass = T;
      const throws = () => {
        injector.resolveModuleFactoryProvider(new ClassProvider('Test', T));
      };
      expect(throws).to.throw();
    });

    it('should bootstrap a new Injector', () => {
      class T {}
      const instance = {};
      const injector = new Injector();
      sinon.stub(Injector, 'bootstrap').callsFake(() => instance);
      injector.resolveModuleFactoryProvider(new ClassProvider('Test', T));
      expect(injector.container.get('Test').getInstance()).to.be.equal(instance);
    });
  });

  describe('#_bootstrap', () => {
    it('should return provider is it has already been resolved', () => {
      class RootClass {}
      const instance = new RootClass();
      const provider = new ClassProvider(RootClass.name, RootClass);
      provider.setInstance(instance);
      const injector = new Injector();
      injector.container.set(RootClass.name, provider);
      const retval = injector._bootstrap(RootClass);
      expect(retval).to.equal(instance);
    });

    describe('provider categorize', () => {
      it('should recognize Value Provider', () => {
        class Test {}
        const val = {};
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'Test', useValue: val }
          ]
        });
        injector._bootstrap(Test);
        expect(injector.universalProviders.size).to.equal(1);
        expect(injector.universalProviders.get('Test')).to.be.instanceof(ValueProvider);
      });

      it('should process Value Provider', () => {
        class Test {}
        const val = {};
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'Test', useValue: val }
          ]
        });
        injector._bootstrap(Test);
        expect(injector.universalProviders.size).to.equal(1);
        expect(injector.universalProviders.get('Test')).to.be.instanceof(ValueProvider);
      });

      it('should process Class Provider', () => {
        class Test {}
        class Klass {}
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'Klass', useClass: Klass }
          ]
        });
        injector._bootstrap(Test);
        expect(injector.universalProviders.size).to.equal(1);
        expect(injector.universalProviders.get('Klass')).to.be.instanceof(ClassProvider);
      });

      it('should process Existing Provider', () => {
        class Test {}
        class Klass {}
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'Klass', useClass: Klass },
            { provide: 'ExistingKlass', useExisting: 'Klass' }
          ]
        });
        injector._bootstrap(Test);
        expect(injector.universalProviders.size).to.equal(2);
        expect(injector.universalProviders.get('ExistingKlass')).to.be.instanceof(ExistingProvider);
      });

      it('should process Factory Provider', () => {
        class Test {}
        const fn = () => {};
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'Factory', useFactory: fn }
          ]
        });
        injector._bootstrap(Test);
        expect(injector.universalProviders.size).to.equal(1);
        expect(injector.universalProviders.get('Factory')).to.be.instanceof(FactoryProvider);
        expect(injector.universalProviders.get('Factory').func).to.equal(fn);
      });

      it('should throw an error when invalid provider is found', () => {
        class Test {}
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'Factory' }
          ]
        });
        const throws = () => injector._bootstrap(Test);
        expect(throws).to.throw();
      });
    });

    describe('resolving provider process', () => {
      it('should not resolve provider when it exists', () => {
        class A {}
        class Test {}
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'A', useClass: A },
            { provide: 'A', useClass: A }
          ]
        });
        injector._bootstrap(Test);
        expect(injector.resolveModuleProvider.calledOnce).to.be.true();
      });

      it('should try to resolve module factory provider', () => {
        class A {}
        class Test {}
        const injector = new Injector();
        sinon.stub(injector, 'resolveModuleFactoryProvider').callsFake(() => null);
        Registry.registerModuleFactory(A, {});
        Registry.registerModuleFactory(Test, {
          providers: [
            { provide: 'A', useClass: A },
          ]
        });
        injector._bootstrap(Test);
        expect(injector.resolveModuleFactoryProvider.called).to.be.true();
      });
    });

    it('inject module providers into root instance', () => {
      class A {}
      class B {}
      class Test {
        constructor(modules) {
          this.modules = modules;
        }
      }
      const p1 = new ClassProvider('A', A);
      p1.setInstance(new A());
      const p2 = new ClassProvider('B', B);
      p2.setInstance(new B());
      const injector = new Injector();
      Registry.registerModule(A);
      Registry.registerModule(B);
      Registry.registerModuleFactory(Test, {
        providers: [
          { provide: 'A', useClass: A },
          { provide: 'B', useClass: B },
        ]
      });
      sinon.stub(injector, 'resolveModuleProvider').callsFake(() => null);
      injector.container.set('A', p1);
      injector.container.set('B', p2);
      const instance = injector._bootstrap(Test);
      expect(instance.modules.a).to.be.instanceof(A);
      expect(instance.modules.b).to.be.instanceof(B);
    });
  });
});
