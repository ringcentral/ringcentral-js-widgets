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

CallPanel.prototype.bindPhoneListener = function() {
    this.webPhone.ua.on('sipIncomingCall', e => {
        console.log('call incoming');
        this.line = e;
        this.state = CallPanel.state.CALLIN;
        this.triggerView();
    });
    this.webPhone.ua.on('outgoingCall', e => {
        console.log('call outgoing');
        this.line = e;
        this.state = CallPanel.state.CALLOUT;
        this.triggerView();
    });
    this.webPhone.ua.on('callStarted', e => {
        console.log('call start');
        this.state = CallPanel.state.ONLINE;
        this.triggerView();
        this.afterCallStart();
    });
    this.webPhone.ua.on('callRejected', e => {
        console.log('reject');
        this.state = CallPanel.state.HIDDEN;
        this.triggerView();
        this.afterCallEnd();
    });
    this.webPhone.ua.on('callEnded', e => {
        console.log('end');
        this.state = CallPanel.state.HIDDEN;
        this.triggerView();
        this.afterCallEnd();
    });
    this.webPhone.ua.on('callFailed', e => {
        console.log('end');
        this.state = CallPanel.state.HIDDEN;
        this.triggerView();
        this.afterCallEnd();
    });
};
CallPanel.prototype.answer = function() {
    return this.webPhone
        .answer(this.line)
        .then(() => {
            this.state = CallPanel.state.ONLINE;
            this.triggerView();
        })
        .catch(function(e) { console.error(e) });
};
CallPanel.prototype.ignore = function() {
    this.state = CallPanel.state.HIDDEN;
    this.triggerView();
};
CallPanel.prototype.cancel = function() {
    if (!this.line)
        return;
    return this.line
        .cancel()
        .then(() => {
            this.state = CallPanel.state.HIDDEN;
            this.triggerView();
        })
        .catch(err => console.error(err));
};
CallPanel.prototype.hangup = function() {
    if (!this.line)
        return;

    return this.webPhone
        .hangup(this.line)
        .then(() => {
            this.state = CallPanel.state.HIDDEN;
            this.triggerView();
        })
        .catch(err => console.error(err));
};
CallPanel.prototype.record = function() {
    if (this.line.isOnRecord()) {
        return this.line.record(false)
            .then(() => this.element.panel.onlinePanel.recordButton.textContent = 'Record')
            .catch(err => {
                console.err(err);
            });
    } else {
        return this.line.record(true)
            .then(() => this.element.panel.onlinePanel.recordButton.textContent = 'Stop Record')
            .catch(err => {
                console.err(err);
            });
    }
};

CallPanel.prototype.hold = function() {
    if (this.line.isOnHold()) {
        return this.line.setHold(false)
            .then(() => {
                console.log(this.line.isOnHold());
                this.element.panel.onlinePanel.holdButton.textContent = 'Hold';
            });
    } else {
        return this.line.setHold(true)
            .then(() => {
                console.log(this.line.isOnHold());
                this.element.panel.onlinePanel.holdButton.textContent = 'Unhold';
            });
    }
};
CallPanel.prototype.mute = function() {
    if (this.line.isOnMute()) {
        return this.line.setMute(false, false)
            .then(() => {
                console.log(this.line.isOnMute());
                this.element.panel.onlinePanel.muteButton.textContent = 'Mute';
            });
    } else {
        return this.line.setMute(true, false)
            .then(() => {
                console.log(this.line.isOnMute());
                this.element.panel.onlinePanel.muteButton.textContent = 'Unmute';
            });
    }
};
CallPanel.prototype.answerIncomingCall = function() {
    return webPhone.answer(this.line)
        .then(() => {
            this.state = CallPanel.state.ONLINE;
            this.triggerView();
        })
        .catch(e => console.error(e));
};
CallPanel.prototype.triggerView = function() {
    this.element.panel.style.display = 'block';
    this.element.panel.callinPanel.style.display = 'none';
    this.element.panel.calloutPanel.style.display = 'none';
    this.element.panel.onlinePanel.style.display = 'none';
    if (this.callTimeInterval) {
        this.callTimeInterval.cancel();
        this.callTimeInterval = null;
    }
    if (this.state === CallPanel.state.CALLIN) {
        this.element.panel.callinPanel.callinNumber.textContent = this.line.contact.number;
        this.element.panel.callinPanel.style.display = 'block';
    } else if (this.state === CallPanel.state.CALLOUT) {
        this.element.panel.calloutPanel.style.display = 'block';
    } else if (this.state === CallPanel.state.ONLINE) {
        this.element.panel.onlinePanel.style.display = 'block';
        this.callTimeInterval = this.updateCallTime(this.line.timeCallStarted);
    } else if (this.state === CallPanel.state.HIDDEN) {
        this.element.panel.style.display = 'none';
    }
};
CallPanel.prototype.loading = function(target, text) {
    if (this.interval)
        return;
    var dotCount = 1;
    this.interval = window.setInterval(() => {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--)
            dot += '.';
        console.log(this.element.loginButton);
        target.loginButton.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500)
};
CallPanel.prototype.stopLoading = function() {
    if (this.interval) {
        window.clearInterval(this.interval);
        this.interval = null;
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
