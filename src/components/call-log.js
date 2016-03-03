import { register, Component } from '../component'
// prototypal inheritance, please see: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var CallLog = function(options) {
    Component.call(this, options);
};
CallLog.prototype = Object.create(Component.prototype);
CallLog.prototype.constructor = CallLog;

CallLog.prototype.beforeUpdate = function(action, props) {
    var defaultAction = Component.prototype.beforeUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'getLog') {
            this.interval = this.loading(this.dom.message, 'Loading call log')
        }
    }
};
CallLog.prototype.afterUpdate = function(action, props) {
    var defaultAction = Component.prototype.afterUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'mount') {
            this.getLog(1, 10);
        } else if (action === 'getLog') {
            // var log = this.props.records;
            // var item = new CallLogItem();
            // ...
            if (this.interval) {
                this.interval.cancel('');
                this.interval = null;
            }
        }
    }
};
CallLog.prototype.getLog = function(page, number) {
    if (this.options.actions && this.options.actions.getLog) {
        this.beforeUpdate.bind(this, 'getLog')
        return this.sdk.platform()
            .get('/account/~/extension/~/call-log', { page: page, perPage: number })
            .then(response => {
                this.props.records = response.json().records;
            })
            .then(this.afterUpdate.bind(this, 'getLog'))
            .catch(function(e) {
                console.error('Recent Calls Error: ' + e.message);
            });
    }
};
CallLog.prototype.loading = function(target, text) {
    var dotCount = 1;
    var interval = window.setInterval(() => {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--)
            dot += '.';
        target.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500)
    return {
        cancel: function(text) {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
                if (typeof text !== 'undefined')
                    target.textContent = text;
            }
        }
    }
};
