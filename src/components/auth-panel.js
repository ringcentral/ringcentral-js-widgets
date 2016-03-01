import Component from '../component'
// prototypal inheritance, please see: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
var AuthPanel = function(options) {
    Component.call(this, options);
};
AuthPanel.prototype = Object.create(Component.prototype);
AuthPanel.prototype.constructor = AuthPanel;

AuthPanel.prototype.componentMounted = function() {
    Component.prototype.componentMounted.call(this);
    this.dom.key.value = localStorage.getItem('key');
    this.dom.secret.value = localStorage.getItem('secret');
    this.dom.username.value = localStorage.getItem('username');
    this.dom.extension.value = localStorage.getItem('extension');
    this.dom.password.value = localStorage.getItem('password');
};
AuthPanel.prototype.beforeLogin = function() {
    localStorage.setItem('server', this.dom.server.value || '');
    localStorage.setItem('key', this.dom.key.value || '');
    localStorage.setItem('secret', this.dom.secret.value || '');
    localStorage.setItem('username', this.dom.username.value || '');
    localStorage.setItem('extension', this.dom.extension.value || '');
    localStorage.setItem('password', this.dom.password.value || '');
    this.dom.login.disabled = true;
    this.dom.error.textContent = '';
    this.interval = this.loading(this.dom.login, 'login');
    if (this.options.listeners.beforeLogin) {
        this.options.listeners.beforeLogin();
        // if (!this.options.listeners.afterLogin) {
        //     console.warn('you may encounter UI problems because you overrided one of login lifecycle.');
        // }
    }
};


AuthPanel.prototype.afterLogin = function() {
    this.dom.login.disabled = false;
    // stop loading animation
    if (this.interval) {
        this.interval.cancel();
        this.interval = null;
    }
    if (this.options.listeners.afterLogin) {
        this.options.listeners.afterLogin();
        // if (!this.options.listeners.beforeLogin) {
        //     console.warn('you may encounter UI problems because you overrided one of login lifecycle.');
        // }
    }
};

AuthPanel.prototype.login = function() {
    this.beforeLogin();
    if (this.options.actions && this.options.actions.login) {
        // FIXME: The custom login may not be a Promise
        return this.options.actions.login(this.dom)
            // bind the lexical env to the function, otherwise will be 'window' scope
            .then(this.afterLogin.bind(this))
            .catch(err => console.error('login error:' + error));
    }
};
AuthPanel.prototype.signup = function() {
    this.options.actions && this.options.signup && this.options.signup();
};
AuthPanel.prototype.close = function() {};
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
