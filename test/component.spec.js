import test from 'ava';
import 'babel-register';
import {register} from '../src/scripts/component.js';
test('register is exported successfully', t => {
    t.ok(register);
});
test('(register) Components should be registered in normal ways', t => {
    var Man = register({
        actions: {
            climb: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        }
    });
    t.ok(Man);
});
test('(register) Manually create widgets will throw error', t => {
    var Man = register({
        actions: {
            climb: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        }
    });
    t.throws(Man);
});

var Man;
var widgetBefore;
var widgetAfter;
test.beforeEach(t => {
    Man = register({
        actions: {
            climb: {
                before: function() {
                    widgetBefore = 1;
                },
                method: function(finish) {
                    return finish();
                },
                after: function() {
                    widgetAfter = 1;
                }
            }
        }
    });
});
test.afterEach(t => {
    widgetBefore = undefined;
    widgetAfter = undefined;
    Man = undefined;
})
test('(widget) Create widgets with complete defined actions will success', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            climb: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    t.ok(man.climb)
});

test('(widget) Create widgets with missing actions will success', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {},
        logLevel: 0,
        internal: true
    })
    t.ok(man.climb)
});
test('(widget) Create widgets with extra actions will throw error', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            run: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    t.notOk(man.run)
});
test('(widget) before/after action will be execute by default', t => {
    t.plan(2);
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            climb: {
                before: function() {
                    return true;
                },
                method: function() {},
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    man.climb();
    t.is(widgetBefore, 1)
    t.is(widgetAfter, 1)
});
test('(widget) before/after action will not be execute when user return false', t => {
    t.plan(2);
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            climb: {
                before: function() {
                    return false;
                },
                method: function() {},
                after: function() {
                    return false;
                }
            }
        },
        logLevel: 0,
        internal: true
    })
    man.climb();
    t.not(widgetBefore, 1)
    t.not(widgetAfter, 1)
});

test('(widget) User defined value could be returned', t => {
    var Cat = register({
        actions: {
            meow: {
                before: function() {
                    return 1;
                },
                method: function(finish) {
                    return finish();
                },
                after: function() {}
            }
        }
    });

    var cat = new Cat({
        template: document.createDocumentFragment(),
        actions: {
            meow: {
                before: function() {},
                method: function() {
                    return 2;
                },
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    t.is(cat.meow(), 2)
});

test('(widget) User defined action can be disabled', t => {
    var Cat = register({
        actions: {
            meow: {
                before: function() {
                    return 1;
                },
                method: function(finish) {
                    // not call finish
                },
                after: function() {}
            }
        }
    });
    var userDefinedNumber;
    var cat = new Cat({
        template: document.createDocumentFragment(),
        actions: {
            meow: {
                before: function() {},
                method: function() {
                    userDefinedNumber = 2;
                },
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    cat.meow();
    t.not(userDefinedNumber, 2)
});
