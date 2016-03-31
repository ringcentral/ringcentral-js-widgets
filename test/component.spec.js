import test from 'ava'
import 'babel-register'
import {register} from '../src/scripts/component.js'
test('register is exported successfully', t => {
    t.ok(register)
})
test('(register) Components should be registered in normal ways', t => {
    var Man = register({
        actions: {
            climb: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        }
    })
    t.ok(Man)
})
test('(register) Manually create widgets will throw error', t => {
    var Man = register({
        actions: {
            climb: {
                before: function() {},
                method: function() {},
                after: function() {}
            }
        }
    })
    t.throws(Man)
})

var Man
var widgetBefore
var widgetAfter
var fragment
test.beforeEach(t => {
    Man = register({
        data: {
            weight: 100
        },
        actions: {
            climb: {
                before: function() {
                    widgetBefore = 1
                },
                method: function(finish) {
                    return finish()
                },
                after: function() {
                    widgetAfter = 1
                }
            }
        }
    })
    var len = [...document.childNodes].length
    fragment = document.createDocumentFragment()
    var text = document.createElement('div')
    text.textContent = 'test'
    fragment.appendChild(text)
})
test.afterEach(t => {
    widgetBefore = undefined
    widgetAfter = undefined
    Man = undefined
    fragment = undefined
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
})

test('(widget) Create widgets with missing actions will success', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {},
        logLevel: 0,
        internal: true
    })
    t.ok(man.climb)
})
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
})
test('(widget) before/after action will be execute by default', t => {
    t.plan(2)
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            climb: {
                before: function() {
                    return true
                },
                method: function() {},
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    man.climb()
    t.is(widgetBefore, 1)
    t.is(widgetAfter, 1)
})
test('(widget) before/after action will not be execute when user return false', t => {
    t.plan(2)
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {
            climb: {
                before: function() {
                    return false
                },
                method: function() {},
                after: function() {
                    return false
                }
            }
        },
        logLevel: 0,
        internal: true
    })
    man.climb()
    t.not(widgetBefore, 1)
    t.not(widgetAfter, 1)
})

test('(widget) User defined value could be returned', t => {
    var Cat = register({
        actions: {
            meow: {
                before: function() {
                    return 1
                },
                method: function(finish) {
                    return finish()
                },
                after: function() {}
            }
        }
    })

    var cat = new Cat({
        template: document.createDocumentFragment(),
        actions: {
            meow: {
                before: function() {},
                method: function() {
                    return 2
                },
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    t.is(cat.meow(), 2)
})

test('(widget) User defined action can be disabled', t => {
    var Cat = register({
        actions: {
            meow: {
                before: function() {
                    return 1
                },
                method: function(finish) {
                    // not call finish
                },
                after: function() {}
            }
        }
    })
    var userDefinedNumber
    var cat = new Cat({
        template: document.createDocumentFragment(),
        actions: {
            meow: {
                before: function() {},
                method: function() {
                    userDefinedNumber = 2
                },
                after: function() {}
            }
        },
        logLevel: 0,
        internal: true
    })
    cat.meow()
    t.not(userDefinedNumber, 2)
})

test('(widget) data should be register', t => {
    var man = new Man({
        template: document.createDocumentFragment(),
        actions: {},
        logLevel: 0,
        internal: true
    })
    t.is(man.data.weight, 100)
})

test('(widget) can be mounted', t => {
    t.plan(3)
    var len = [...document.childNodes].length

    var man = new Man({
        template: fragment,
        actions: {},
        logLevel: 0,
        internal: true
    })
    man.mount(document)
    t.is(document.lastChild.textContent, 'test')
    t.is([...document.childNodes].length, len + 1)
    t.is(man.target.textContent, 'test')
})

test('(widget) can be unmountd', t => {
    var len = [...document.childNodes].length

    var man = new Man({
        template: fragment,
        actions: {},
        logLevel: 0,
        internal: true
    })
    man.mount(document)
    man.unmount()
    t.is([...document.childNodes].length, len)
})

// The jsdom is buggy
test.skip('(widget) can be mounted and unmountd and mounted', t => {

    var man = new Man({
        template: fragment,
        actions: {},
        logLevel: 0,
        internal: true
    })
    man.mount(document)
    man.unmount()
    man.mount(document)
    t.is([...document.childNodes].length, len + 1)
})

test.skip('(widget) can be destroyed', t => {
    t.plan(3)
    var len = [...document.childNodes].length
    var man = new Man({
        template: fragment,
        actions: {},
        logLevel: 0,
        internal: true
    })
    man.destroy()
    t.notOk(man.target)
    t.notOk(man.props)
    t.notOk(man.data)
})
