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
    console.log('bind dom');
    console.log(template.content);
    console.log(template.content.querySelectorAll('[data-info]'));
    [].forEach.call(template.content.querySelectorAll('[data-info]'), doc => {
        var info = doc.getAttribute('data-info');
        this.dom[info] = doc;
    });
    [].forEach.call(template.content.querySelectorAll('[data-event]'), doc => {
        var event = doc.getAttribute('data-event');
        var action = doc.getAttribute('data-action');
        doc.addEventListener(event, this[action].bind(this));
    })
    return template;
}
Component.prototype.action = function() {}
Component.prototype.componentMounted = function() {};
Component.prototype.componentReady = function() {};
Component.prototype.render = function(target) {
    if (this.fetchPromise)
        this.fetchPromise
        .then(template => {
            this.targetDOM = document.querySelector(target);
            this.targetDOM.appendChild(template.content);
        })
        .catch(err => console.error('render err:' + err));
};
export default Component;
