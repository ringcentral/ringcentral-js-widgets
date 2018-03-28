import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import Registry from '../registry/registry';

chai.use(dirtyChai);

describe('Registry', () => {
  beforeEach(() => {
    Registry.moduleRegistry.reset();
    Registry.providerRegistry.reset();
  });

  describe('#registerModule', () => {
    it('should registry module basically', () => {
      class Module {}
      const metadata = {
        deps: ['A', { dep: 'B', optional: false }, { dep: 'C', optional: true }]
      };
      Registry.registerModule(Module, metadata);
      expect(Registry.moduleRegistry.get(Module)).to.equal(metadata);
    });

    it('should throw when module is not a class', () => {
      let throws = () => Registry.registerModule({});
      expect(throws).to.throw('Expected module to be a Class');

      throws = () => Registry.registerModule(undefined);
      expect(throws).to.throw('Expected module to be a Class');
    });

    it('should throw when metadata is not an Object', () => {
      class Module {}
      const throws = () => Registry.registerModule(Module, []);
      expect(throws).to.throw('Expected parameter of @Module() to be an Object');
    });

    it('should support empty object without deps', () => {
      class Module {}
      Registry.registerModule(Module, {});
      expect(Registry.moduleRegistry.get(Module)).to.be.null();
    });

    it('should throw when deps is not an Array', () => {
      class Module {}
      const throws = () => Registry.registerModule(Module, {
        deps: {}
      });
      expect(throws).to.throw('Expected deps to be an Array');
    });
  });

  describe('#registerModuleProvider', () => {
    it('should registry moduleProvider basically', () => {
      class ModuleFactory {}
      const metadata = {
        providers: []
      };
      Registry.registerModuleFactory(ModuleFactory, metadata);
      expect(Registry.providerRegistry.get(ModuleFactory)).to.equal(metadata);
    });

    it('should throw when moduleFactory is not a class', () => {
      let throws = () => Registry.registerModuleFactory({});
      expect(throws).to.throw('Expected moduleFactory to be a Class');

      throws = () => Registry.registerModule(undefined);
      expect(throws).to.throw('Expected module to be a Class');
    });

    it('should ensure metadata is an Object', () => {
      Registry.registerModuleFactory(class A {}, {});
      const throws = () => Registry.registerModuleFactory(class B {}, []);
      expect(throws).to.throw('Expected parameter of @ModuleFactory() to be an Object');
    });
  });

  describe('moduleFactory inheritance', () => {
    it('should return empty array when no provider is found', () => {
      class A {}
      Registry.registerModuleFactory(A, null);
      const retval = Registry.resolveInheritedModuleFactory(A);
      expect(retval).to.be.an('array');
      expect(retval).to.be.empty();
    });

    it('should return original provider when no parent is found', () => {
      class A {}
      class B {}
      const providers = { providers: [B, { provide: 'A', useClass: A }] };
      Registry.registerModuleFactory(A, { ...providers });
      const retval = Registry.resolveInheritedModuleFactory(A);
      expect(retval).to.deep.equal([
        { provide: 'B', useClass: B },
        { provide: 'A', useClass: A }
      ]);
    });

    it('should cache inheritance computation', () => {
      class A {}
      class B {}
      Registry.registerModuleFactory(A, {
        providers: [
          { provide: 'B', useClass: B }
        ]
      });
      const stub = sinon.stub(Registry, 'mergeProviders').callsFake(() => null);
      Registry.resolveInheritedModuleFactory(A);
      Registry.resolveInheritedModuleFactory(A);
      expect(Registry.mergeProviders.calledOnce).to.be.true();
      stub.restore();
    });

    it('should merge metadata', () => {
      class A {}
      class B extends A {}

      class MA {}
      class MB {}
      class MK {}
      class MJ {}

      Registry.registerModuleFactory(A, {
        providers: [
          MA,
          { provide: 'MK', useClass: MK }
        ]
      });

      Registry.registerModuleFactory(B, {
        providers: [
          MB,
          { provide: 'MJ', useClass: MJ }
        ]
      });
      const retval = Registry.resolveInheritedModuleFactory(B);
      expect(retval).to.have.lengthOf(4);
      expect(retval).to.have.deep.members([
        { provide: 'MB', useClass: MB },
        { provide: 'MA', useClass: MA },
        { provide: 'MK', useClass: MK },
        { provide: 'MJ', useClass: MJ }
      ]);
    });

    it('should support multiple level inheritance', () => {
      class A {}
      class B extends A {}
      class C extends B {}
      class D extends C {}

      class MA {}
      class MB {}
      class MC {}
      class MD {}

      Registry.registerModuleFactory(A, {
        providers: [MA]
      });
      Registry.registerModuleFactory(B, {
        providers: [MB]
      });
      Registry.registerModuleFactory(C, {
        providers: [MC]
      });
      Registry.registerModuleFactory(D, {
        providers: [MD]
      });

      const retval = Registry.resolveInheritedModuleFactory(D);
      expect(retval).to.be.lengthOf(4);
      expect(retval).to.have.deep.members([
        { provide: 'MA', useClass: MA },
        { provide: 'MB', useClass: MB },
        { provide: 'MC', useClass: MC },
        { provide: 'MD', useClass: MD },
      ]);
    });

    it('should support empty provider inheritance', () => {
      class A {}
      class B extends A {}
      class C extends B {}
      class D extends C {}

      class MA {}
      class MB {}
      class MC {}
      class MD {}

      Registry.registerModuleFactory(A, {
        providers: [MA, MB]
      });
      // empty middle
      Registry.registerModuleFactory(B, null);
      Registry.registerModuleFactory(C, {
        providers: [MC, MD]
      });
      // empty head
      Registry.registerModuleFactory(D, null);

      const retval = Registry.resolveInheritedModuleFactory(D);
      expect(retval).to.be.lengthOf(4);
      expect(retval).to.have.deep.members([
        { provide: 'MA', useClass: MA },
        { provide: 'MB', useClass: MB },
        { provide: 'MC', useClass: MC },
        { provide: 'MD', useClass: MD },
      ]);
    });

    it('should also inherit metadata', () => {
      class A {}
      class B extends A {}
      Registry.registerModuleFactory(A, {
        providers: [
          { provide: 'Value', useValue: {}, merge: true, spread: true, private: true }
        ]
      });
      Registry.registerModuleFactory(B, {
        providers: [
          { provide: 'Value', useValue: {}, merge: true, spread: true, private: false }
        ]
      });
      const retval = Registry.resolveInheritedModuleFactory(B);
      expect(retval[0]).to.deep.equal({
        provide: 'Value', useValue: {}, merge: true, spread: true, private: false
      });
    });

    describe('provider overwrite', () => {
      it('should overwrive previously defined provider', () => {
        class A {}
        class MA {}
        class MB {}
        class MC {}

        Registry.registerModuleFactory(A, {
          providers: [
            { provide: 'MC', useClass: MB },
            { provide: 'MA', useClass: MA },
            { provide: 'VA', useValue: { val: 'val1' } },

            MC,
            { provide: 'MA', useClass: MB },
            { provide: 'VA', useValue: { val: 'val2' } },
          ]
        });
        const retval = Registry.resolveInheritedModuleFactory(A);
        expect(retval).to.be.lengthOf(3);
        expect(retval).have.deep.members([
          { provide: 'MA', useClass: MB },
          { provide: 'MC', useClass: MC },
          { provide: 'VA', useValue: { val: 'val2' } },
        ]);
      });

      it('should overwirte parent provider by child provider', () => {
        class A {}
        class B extends A {}

        class MA {}
        class MB {}
        Registry.registerModuleFactory(A, {
          providers: [
            { provide: 'MA', useClass: MA },
            { provide: 'VA', useValue: { val: 'val1' } }
          ]
        });
        Registry.registerModuleFactory(B, {
          providers: [
            { provide: 'MA', useClass: MB },
            { provide: 'VA', useValue: { val: 'val2' } }
          ]
        });
        const retval = Registry.resolveInheritedModuleFactory(B);
        expect(retval).have.deep.members([
          { provide: 'MA', useClass: MB },
          { provide: 'VA', useValue: { val: 'val2' } }
        ]);
      });
    });

    describe('provider merge value', () => {
      it('should be able to merge values', () => {
        class A {}
        class B extends A {}
        Registry.registerModuleFactory(A, {
          providers: [
            { provide: 'val', useValue: { a: 'a' } }
          ]
        });
        Registry.registerModuleFactory(B, {
          providers: [
            { provide: 'val', useValue: { b: 'b' }, merge: true }
          ]
        });
        const retval = Registry.resolveInheritedModuleFactory(B);
        expect(retval).have.deep.members([
          { provide: 'val', useValue: { a: 'a', b: 'b' }, merge: true }
        ]);
      });

      it('should support deep merge values', () => {
        class A {}
        class B extends A {}
        class C extends B {}
        Registry.registerModuleFactory(A, {
          providers: [
            { provide: 'val', useValue: { val: 'val' } }
          ]
        });
        Registry.registerModuleFactory(B, {
          providers: [
            { provide: 'val', useValue: { test: 'test' } }
          ]
        });
        Registry.registerModuleFactory(C, {
          providers: [
            { provide: 'val', useValue: { obj: { test: 'test' } }, merge: true }
          ]
        });
        const retval = Registry.resolveInheritedModuleFactory(C);
        expect(retval[0]).to.deep.equal({
          provide: 'val',
          useValue: {
            test: 'test',
            obj: {
              test: 'test'
            }
          },
          merge: true
        });
      });

      it('should support deep multiple merge values', () => {
        class A {}
        class B extends A {}
        class C extends B {}
        Registry.registerModuleFactory(A, {
          providers: [
            { provide: 'val', useValue: { test: 'val' } }
          ]
        });
        Registry.registerModuleFactory(B, {
          providers: [
            { provide: 'val', useValue: { test: 'test' }, merge: true }
          ]
        });
        Registry.registerModuleFactory(C, {
          providers: [
            { provide: 'val', useValue: { obj: { test: 'test' } }, merge: true }
          ]
        });
        const retval = Registry.resolveInheritedModuleFactory(C);
        expect(retval[0]).to.deep.equal({
          provide: 'val',
          useValue: {
            test: 'test',
            obj: {
              test: 'test'
            }
          },
          merge: true
        });
      });

      it('should throw when parent provider is not a value provider', () => {
        class A {}
        class B extends A {}

        Registry.registerModuleFactory(A, {
          providers: [
            { provide: 'test', useClass: class T {} }
          ]
        });
        Registry.registerModuleFactory(B, {
          providers: [
            { provide: 'test', useValue: { val: 'val' }, merge: true }
          ]
        });
        const throws = () => Registry.resolveInheritedModuleFactory(B);
        expect(throws).to.throw('Expected parent provider of [test] to be a value provider');
      });

      it('should throw when parent provider is not an Object', () => {
        class A {}
        class B extends A {}

        Registry.registerModuleFactory(A, {
          providers: [
            { provide: 'test', useValue: 'value' }
          ]
        });
        Registry.registerModuleFactory(B, {
          providers: [
            { provide: 'test', useValue: { val: 'val' }, merge: true }
          ]
        });
        const throws = () => Registry.resolveInheritedModuleFactory(B);
        expect(throws).to.throw('Expected parent provider of [test] to be an Object');
      });
    });
  });

  describe('module inheritance', () => {
    it('should return empty array when no metadata is found', () => {
      class A {}
      Registry.registerModule(A, null);
      Registry.resolveInheritedDependencies(A);
      const m = Registry.moduleRegistry.get(A);
      expect(m).to.deep.equal({
        deps: []
      });
    });

    it('should return original metadata when parent module is not found', () => {
      class A {}
      const metadata = { deps: ['A', 'C'] };
      Registry.registerModule(A, metadata);
      const deps = Registry.resolveInheritedDependencies(A);
      expect(deps).have.deep.members([
        {
          dep: 'A',
          optional: false
        },
        {
          dep: 'C',
          optional: false
        },
      ]);
    });

    it('cache inheritance computation', () => {
      class A {}
      const metadata = { deps: ['A', 'C'] };
      Registry.registerModule(A, metadata);
      const stub = sinon.stub(Registry, 'mergeDependencies').callsFake(() => null);
      Registry.resolveInheritedDependencies(A);
      Registry.resolveInheritedDependencies(A);
      expect(stub.calledOnce).to.be.true();
      stub.restore();
    });

    it('should merge deps metadata', () => {
      class A {}
      class B extends A {}

      Registry.registerModule(A, { deps: ['A'] });
      Registry.registerModule(B, { deps: ['B'] });

      const deps = Registry.resolveInheritedDependencies(B);
      expect(deps).have.deep.members([
        { dep: 'A', optional: false },
        { dep: 'B', optional: false }
      ]);
    });

    it('should merge multiple layer inheritance', () => {
      class A {}
      class B extends A {}
      class C extends B {}

      Registry.registerModule(A, { deps: ['A'] });
      Registry.registerModule(B, { deps: ['B'] });
      Registry.registerModule(C, { deps: ['C'] });

      const deps = Registry.resolveInheritedDependencies(C);
      expect(deps).have.deep.members([
        { dep: 'A', optional: false },
        { dep: 'B', optional: false },
        { dep: 'C', optional: false }
      ]);
    });

    it('should support empty deps inheritance', () => {
      class A {}
      class B extends A {}
      class C extends B {}
      class D extends C {}

      Registry.registerModule(A, { deps: ['A'] });
      Registry.registerModule(B, null);
      Registry.registerModule(C, { deps: ['C'] });
      Registry.registerModule(D, null);

      const deps = Registry.resolveInheritedDependencies(D);
      expect(deps).have.deep.members([
        { dep: 'A', optional: false },
        { dep: 'C', optional: false },
      ]);
    });

    it('should support multiple layer merge', () => {
      class A {}
      class B extends A {}
      class C extends B {}

      Registry.registerModule(A, { deps: [{ dep: 'A', optional: false }] });
      Registry.registerModule(B, null);
      Registry.registerModule(C, { deps: [{ dep: 'A', optional: true }] });

      const deps = Registry.resolveInheritedDependencies(C);
      expect(deps).have.deep.members([
        { dep: 'A', optional: false }
      ]);
    });

    describe('#mergeDependencies', () => {
      it('should be not optional when parent is not optional', () => {
        let baseDeps = [
          { dep: 'A', optional: true }
        ];
        let parentDeps = [
          { dep: 'A', optional: false }
        ];
        let deps = Registry.mergeDependencies(baseDeps, parentDeps);
        expect(deps).have.deep.members([
          { dep: 'A', optional: false }
        ]);

        baseDeps = [{ dep: 'A', optional: true }];
        parentDeps = ['A'];
        deps = Registry.mergeDependencies(baseDeps, parentDeps);
        expect(deps).have.deep.members([
          { dep: 'A', optional: false }
        ]);
      });

      it('should be not optional when child is not optional', () => {
        let baseDeps = [
          { dep: 'A', optional: false }
        ];
        let parentDeps = [
          { dep: 'A', optional: true }
        ];
        let deps = Registry.mergeDependencies(baseDeps, parentDeps);
        expect(deps).have.deep.members([
          { dep: 'A', optional: false }
        ]);

        baseDeps = ['A'];
        parentDeps = [{ dep: 'A', optional: true }];
        deps = Registry.mergeDependencies(baseDeps, parentDeps);
        expect(deps).have.deep.members([
          { dep: 'A', optional: false }
        ]);
      });

      it('should be not optional when parent and child are both not optional', () => {
        let b = [
          { dep: 'A', optional: false }
        ];
        let p = [
          { dep: 'A', optional: false }
        ];
        let d = Registry.mergeDependencies(b, p);
        expect(d).have.deep.members([
          { dep: 'A', optional: false }
        ]);

        b = ['A'];
        p = ['A'];
        d = Registry.mergeDependencies(b, p);
        expect(d).have.deep.members([
          { dep: 'A', optional: false }
        ]);
      });

      it('should be optional when parent and child are both optional', () => {
        const b = [
          { dep: 'A', optional: true }
        ];
        const p = [
          { dep: 'A', optional: true }
        ];
        const d = Registry.mergeDependencies(b, p);
        expect(d).have.deep.members([
          { dep: 'A', optional: true }
        ]);
      });
    });
  });
});
