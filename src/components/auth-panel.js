import Component from '../component'
// prototypal inheritance, please see: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var AuthPanel = function(options) {
    Component.call(this, options);
};
AuthPanel.prototype = Object.create(Component.prototype);
AuthPanel.prototype.constructor = AuthPanel;
AuthPanel.prototype.beforeUpdate = function(action, props) {
    var defaultAction = Component.prototype.beforeUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'login') {
            this.props.dom.login.disabled = true;
            this.props.dom.error.textContent = '';
            this.interval = this.loading(this.props.dom.login, 'login');
        }
    }
};
AuthPanel.prototype.afterUpdate = function(action, props) {
    var defaultAction = Component.prototype.afterUpdate.call(this, action, props);
    if (defaultAction) {
        if (action === 'mount') {
            this.props.dom.key.value = localStorage.getItem('key');
            this.props.dom.secret.value = localStorage.getItem('secret');
            this.props.dom.username.value = localStorage.getItem('username');
            this.props.dom.extension.value = localStorage.getItem('extension');
            this.props.dom.password.value = localStorage.getItem('password');
        } else if (action === 'login') {
            this.props.dom.login.disabled = false;
            // stop loading animation
            if (this.interval) {
                this.interval.cancel();
                this.interval = null;
            }
            localStorage.setItem('server', this.props.dom.server.value || '');
            localStorage.setItem('key', this.props.dom.key.value || '');
            localStorage.setItem('secret', this.props.dom.secret.value || '');
            localStorage.setItem('username', this.props.dom.username.value || '');
            localStorage.setItem('extension', this.props.dom.extension.value || '');
            localStorage.setItem('password', this.props.dom.password.value || '');
        }
    }
};
AuthPanel.prototype.login = function() {
    this.beforeUpdate('login');
    if (this.options.actions && this.options.actions.login) {
        // FIXME: The custom login may not be a Promise
        return this.options.actions.login(this.props)
            .then(this.afterUpdate.bind(this, 'login'))
            .catch(err => console.error('login error:' + error));
    }
};
AuthPanel.prototype.loading = function(target, text) {
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
export default AuthPanel;
