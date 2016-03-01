var DialPad = function(options) {
    // TODO: choose a template engine
    if (!options.target) {
        throw new Error('need specifiy a target for dial pad');
    }
    this.options = options || {};
    this.targetDOM = document.querySelector(options.target);
    this.bindDOM();
};
DialPad.prototype.bindDOM = function() {
    this.dom = {
        dial1: document.querySelector('[data-action=dial-1]'),
        dial2: document.querySelector('[data-action=dial-2]'),
        dial3: document.querySelector('[data-action=dial-3]'),
        dial4: document.querySelector('[data-action=dial-4]'),
        dial5: document.querySelector('[data-action=dial-5]'),
        dial6: document.querySelector('[data-action=dial-6]'),
        dial7: document.querySelector('[data-action=dial-7]'),
        dial8: document.querySelector('[data-action=dial-8]'),
        dial9: document.querySelector('[data-action=dial-9]'),
        dial0: document.querySelector('[data-action=dial-0]'),
        callout: document.querySelector('[data-action=callout]'),
        number: document.querySelector('[data-info=number]')
    }
    Object.keys(this.dom).forEach(index => {
        console.log(index);
        if (index.indexOf('dial') > -1) {
            var dial = this.dom[index];
            var number = dial.getAttribute('data-value');
            dial.addEventListener('click', this.dialing.bind(this, number));
        }
        if (index === 'callout') {
            var callout = this.dom[index];
            callout.addEventListener('click', this.callout.bind(this));
        }
    })
};

DialPad.prototype.dialing = function(number) {
    if (!this.dom || !this.dom.number) {
        throw Error('Dial pad need a number input');
    }
    this.dom.number.value += number;
};
DialPad.prototype.callout = function() {
    console.log('call out from ui');
    var toNumber = this.dom.number;
    if (this.options.actions && this.options.actions.callout) {
        this.options.actions.callout(this.dom, { toNumber: toNumber })
            .then(countryId => {
                console.log('SIP call to', toNumber, 'from', fromNumber + '\n');
                if (this.interval) {
                    this.interval.cancel('Call');
                    this.interval = null;
                }
            })
    }
    this.interval = this.loading(this.dom.callout, 'Call');

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
