import Component from '../component'
// prototypal inheritance, please see: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var DialPad = function(options) {
    Component.call(this, options);
};
DialPad.prototype = Object.create(Component.prototype);
DialPad.prototype.constructor = DialPad;
DialPad.prototype.beforeUpdate = function(action) {
    var defaultAction = Component.prototype.beforeUpdate.call(this);
    if (defaultAction) {
        if (action === 'dialing') {} else if (action === 'callout') {
            this.interval = this.loading(this.props.dom.callout, 'Call');
        }
    }
};
DialPad.prototype.afterUpdate = function(action) {
    var defaultAction = Component.prototype.afterUpdate.call(this, action, this.props);
    if (defaultAction) {
        if (action === 'dialing') {} else if (action === 'callout') {
            if (this.interval) {
                this.interval.cancel('Call');
                this.interval = null;
            }
        }
    }
};
DialPad.prototype.dialing = function(event, number) {
    if (!this.props.dom || !this.props.dom.number) {
        throw Error('Dial pad need a number input');
    }
    this.beforeUpdate('dialing');
    this.props.dom.number.value += number;
    this.afterUpdate('dialing');
};
DialPad.prototype.callout = function() {
    this.props.toNumber = this.props.dom.number.value;
    // FIXME: other ways to get fromNumber?
    var fromNumber = this.props.fromNumber = localStorage.getItem('username');
    this.beforeUpdate('callout');
    if (this.options.actions && this.options.actions.callout) {
        return this.options.actions.callout(this.props)
            .then(this.afterUpdate.bind(this, 'callout'))
            .catch(err => console.error(err.stack));
    }
};
DialPad.prototype.loading = function(target, text) {
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
export default DialPad;
