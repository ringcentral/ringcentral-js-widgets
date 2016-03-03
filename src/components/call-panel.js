import Component from '../component'
// prototypal inheritance, please see: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var CallPanel = function(options) {
    Component.call(this, options);
};
CallPanel.prototype = Object.create(Component.prototype);
CallPanel.prototype.constructor = CallPanel;
CallPanel.state = {
    'HIDDEN': 0,
    'CALLIN': 1,
    'CALLOUT': 2,
    'ONLINE': 3
}
CallPanel.prototype.beforeUpdate = function(action, props) {
    var defaultAction = Component.prototype.beforeUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'login') {}
    }
};
CallPanel.prototype.afterUpdate = function(action, props) {
    var defaultAction = Component.prototype.afterUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'mount') {} else if (action === 'answer') {
            this.state = CallPanel.state.ONLINE;
            this.triggerView();
        } else if (action === 'ignore') {
            this.state = CallPanel.state.HIDDEN;
            this.triggerView();
        } else if (action === 'cancel') {
            this.state = CallPanel.state.HIDDEN;
            this.triggerView();
        } else if (action === 'hangup') {
            this.state = CallPanel.state.HIDDEN;
            this.triggerView();
        } else if (action === 'record') {

        } else if (action === 'hold') {

        } else if (action === 'mute') {

        }
    }
};
CallPanel.prototype.answer = function() {
    if (this.options.actions && this.options.actions.answer) {
        this.beforeUpdate.bind(this, 'answer')
            // FIXME: The custom login may not be a Promise
        return this.options.actions.answer(this.props)
            .then(this.afterUpdate.bind(this, 'answer'))
            .catch(err => console.error('login error:' + error));
    }
};
CallPanel.prototype.ignore = function() {
    if (this.options.actions && this.options.actions.ignore) {
        this.beforeUpdate.bind(this, 'ignore')
            // FIXME: The custom login may not be a Promise
        return this.options.actions.ignore(this.props)
            .then(this.afterUpdate.bind(this, 'ignore'))
            .catch(err => console.error('login error:' + error));
    }
};
CallPanel.prototype.cancel = function() {
    if (this.options.actions && this.options.actions.cancel) {
        this.beforeUpdate.bind(this, 'cancel')
            // FIXME: The custom login may not be a Promise
        return this.options.actions.cancel(this.props)
            .then(this.afterUpdate.bind(this, 'cancel'))
            .catch(err => console.error('login error:' + error));
    }
};

CallPanel.prototype.hangup = function() {
    if (this.options.actions && this.options.actions.hangup) {
        this.beforeUpdate.bind(this, 'hangup')
            // FIXME: The custom login may not be a Promise
        return this.options.actions.hangup(this.props)
            .then(this.afterUpdate.bind(this, 'hangup'))
            .catch(err => console.error('login error:' + error));
    }
};

CallPanel.prototype.called = function(event) {
    this.state = CallPanel.state.CALLIN;
    this.triggerView();
}

CallPanel.prototype.callStarted = function(event) {
    this.state = CallPanel.state.ONLINE;
    this.triggerView();
}

CallPanel.prototype.callRejected = function(event) {
    console.log('call reject');
    this.state = CallPanel.state.HIDDEN;
    this.triggerView();
}

CallPanel.prototype.callEnded = function(event) {
    console.log('end');
    this.state = CallPanel.state.HIDDEN;
    this.triggerView();
}

CallPanel.prototype.callFailed = function(event) {
    console.log('fail');
    this.state = CallPanel.state.HIDDEN;
    this.triggerView();
}

// CallPanel.prototype.record = function() {
//     if (this.line.isOnRecord()) {
//         return this.line.record(false)
//             .then(() => this.element.panel.onlinePanel.recordButton.textContent = 'Record')
//             .catch(err => {
//                 console.err(err);
//             });
//     } else {
//         return this.line.record(true)
//             .then(() => this.element.panel.onlinePanel.recordButton.textContent = 'Stop Record')
//             .catch(err => {
//                 console.err(err);
//             });
//     }
// };

// CallPanel.prototype.hold = function() {
//     if (this.line.isOnHold()) {
//         return this.line.setHold(false)
//             .then(() => {
//                 console.log(this.line.isOnHold());
//                 this.element.panel.onlinePanel.holdButton.textContent = 'Hold';
//             });
//     } else {
//         return this.line.setHold(true)
//             .then(() => {
//                 console.log(this.line.isOnHold());
//                 this.element.panel.onlinePanel.holdButton.textContent = 'Unhold';
//             });
//     }
// };
// CallPanel.prototype.mute = function() {
//     if (this.line.isOnMute()) {
//         return this.line.setMute(false, false)
//             .then(() => {
//                 console.log(this.line.isOnMute());
//                 this.element.panel.onlinePanel.muteButton.textContent = 'Mute';
//             });
//     } else {
//         return this.line.setMute(true, false)
//             .then(() => {
//                 console.log(this.line.isOnMute());
//                 this.element.panel.onlinePanel.muteButton.textContent = 'Unmute';
//             });
//     }
// };
CallPanel.prototype.triggerView = function() {
    this.props.dom['callin-panel'].style.display = 'none';
    this.props.dom['callout-panel'].style.display = 'none';
    this.props.dom['online-panel'].style.display = 'none';
    if (this.callTimeInterval) {
        this.callTimeInterval.cancel();
        this.callTimeInterval = null;
    }
    if (this.state === CallPanel.state.CALLIN) {
        this.props.dom['callin-panel'].style.display = 'block';
    } else if (this.state === CallPanel.state.CALLOUT) {
        this.props.dom['callout-panel'].style.display = 'block';
    } else if (this.state === CallPanel.state.ONLINE) {
        this.props.dom['online-panel'].style.display = 'block';
        // this.callTimeInterval = this.updateCallTime(this.line.timeCallStarted);
    }
};
CallPanel.prototype.loading = function(target, text) {
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
CallPanel.prototype.updateCallTime = function(startTime) {
    // FIXME: it's not accurate
    if (!startTime)
        return;
    var currentTime = Date.now() - startTime;
    var callPanel = this;
    var callTimeInterval = window.setInterval(() => {
        var sec = currentTime % 60;
        var min = Math.floor(currentTime / 60);
        this.element.panel.onlinePanel.callTime.textContent = min + ":" + sec;
        currentTime++;
    }, 1000);
    return {
        cancel: function() {
            if (!callTimeInterval)
                return;
            window.clearInterval(callTimeInterval);
            callPanel.element.panel.onlinePanel.callTime.textContent = "0:0";
            callTimeInterval = null;
        }
    }
};
export default CallPanel;
