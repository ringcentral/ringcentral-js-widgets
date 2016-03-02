var Component = function(options) {
    if (!options.template) {
        // TODO: maybe use default template
        throw new Error('need specifiy a template');
    }
    // TODO: use Object.extend or somewhat (es6) for default option setting
    this.options = options || {};
    this.fetchPromise = null;
    this.fetchTemplate(options.template)
        .then(template => this.bindDOM(template))
        .then(template => this.componentMounted(template))
        .catch(err => console.error(err.stack))
};
Component.prototype.fetchTemplate = function(src) {
    this.fetchPromise = fetch(src)
        .then(response => response.text())
        .then(body => {
            console.log('fetch');
            var template = document.createElement('template');
            template.innerHTML = body;
            return template;
        })
        .catch(err => console.error(err.stack))
    return this.fetchPromise;
};
Component.prototype.bindDOM = function(template) {
    this.dom = {};
    [].forEach.call(template.content.querySelectorAll('[data-info]'), doc => {
        var info = doc.getAttribute('data-info');
        this.dom[info] = doc;
    });
    [].forEach.call(template.content.querySelectorAll('[data-action]'), doc => {
        var event = doc.getAttribute('data-event');
        var action = doc.getAttribute('data-action'); // for example: dialing(5)
        // FIXME: The split is buggy
        var method = action.split('(')[0];
        var remain = action.split('(')[1];
        var parameters = remain ? remain.substring(0, remain.length - 1).split(',') : [];
        if (!this[method])
            console.warn('some actions cannot be bound to the DOM tag');
        // For '...' spread operator, please see:
        // http://exploringjs.com/es6/ch_parameter-handling.html#sec_spread-operator
        doc.addEventListener(event, this[method].bind(this, ...parameters));
    })
    return template;
}
Component.prototype.action = function() {}
Component.prototype.componentMounted = function() {};
Component.prototype.componentReady = function() {};
Component.prototype.remove = function() {
    while (this.targetDOM.firstChild) {
        this.targetDOM.removeChild(this.targetDOM.firstChild);
    }
};
Component.prototype.render = function(target, callback) {
    if (this.fetchPromise)
        return this.fetchPromise
            .then(template => {
                this.targetDOM = document.querySelector(target);
                this.targetDOM.appendChild(template.content);
            })
            .then(() => {
                if (callback && typeof callback === 'function')
                    callback.call(this);
            })
            .catch(err => console.error('render err:' + err));
};
export default Component;
