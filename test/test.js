import test from 'ava';
import 'babel-register';
import {register} from '../src/scripts/component.js';
test('register is exported successfully', t => {
    t.ok(register);
});
test('(register)Components should be registered in normal ways', t => {
    var Man = register({
        actions: {
            climb: {
                brfore: function() {},
                method: function() {},
                after: function() {}
            }
        }
    });
    t.ok(Man);
});
test('(register)Manually create widgets will throw error', t => {
    var Man = register({
        actions: {
            climb: {
                brfore: function() {},
                method: function() {},
                after: function() {}
            }
        }
    });
    t.throws(Man);
});

var Man;
test.before(t => {
    Man = register({
        actions: {
            climb: {
                brfore: function() {},
                method: function() {},
                after: function() {}
            }
        }
    });
});
test('(widget)Create widgets with complete defined actions will success', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            climb: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        },
        logLevel: 1,
        internal: true
    })
    t.ok(man.climb)
});

test('(widget)Create widgets with missing actions will success', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {},
        logLevel: 1,
        internal: true
    })
    t.ok(man.climb)
});
test('(widget)Create widgets with extra actions will throw error', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            run: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        },
        logLevel: 1,
        internal: true
    })
    t.notOk(man.run)
    t.ok(man.climb)
});
