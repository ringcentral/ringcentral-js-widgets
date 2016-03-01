import Component from '../component'
// prototypal inheritance, please see: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var DialPad = function(options) {
    Component.call(this, options);
};
DialPad.prototype = Object.create(Component.prototype);
DialPad.prototype.constructor = DialPad;

DialPad.prototype.dialing = function(number) {
    if (!this.dom || !this.dom.number) {
        throw Error('Dial pad need a number input');
    }
    this.dom.number.value += number;
};
DialPad.prototype.callout = function() {
    this.interval = this.loading(this.dom.callout, 'Call');

    var toNumber = this.dom.number;
    if (this.options.actions && this.options.actions.callout) {
        return this.options.actions.callout(this.dom, { toNumber: toNumber })
            .then(countryId => {
                console.log('SIP call to', toNumber, 'from', fromNumber + '\n');
                if (this.interval) {
                    this.interval.cancel('Call');
                    this.interval = null;
                }
            })
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
