// TODO: use dependency injection
import services from './rc-services'

function extend(base, mixin) {
    for (var action in mixin) {
        if (base[action]) {
            for (var hook in mixin[action]) {
                var origin = base[action][hook]
                base[action][hook] = function(...args) {
                    console.log(this);
                    var result
                    if (origin) {
                        result = origin.call(this, ...args)
                    }
                    mixin[action][hook].call(this)
                    return result
                }
            }
        } else {
            base[action] = mixin[action]
        }
    }
    return base
}

var Factory = function () {
    
}

Factory.prototype.create = function(type, mixin = {}) {
    return extend(services[type], mixin)
}

export default Factory
