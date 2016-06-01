// TODO: use dependency injection
import services from './rc-services'

function extend(base, mixin) {
    // FIXME: avoid create function in for loop
    Object.keys(mixin).forEach(action => {
        if (base[action]) {
            Object.keys(mixin[action]).forEach(hook => {
                var origin = base[action][hook]
                var mix = mixin[action][hook]
                base[action][hook] = function(...args) {
                    var result
                    if (origin) {
                        result = origin.call(this, ...args)
                    }
                    mix.call(this)
                    return result
                }
            })
        } else {
            base[action] = mixin[action]
        }
    })
    return base
}

var Factory = function () {
    
}

Factory.prototype.create = function(type, mixin = {}) {
    return extend(services[type], mixin)
}

export default Factory
