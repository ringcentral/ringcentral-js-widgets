import { Component, register } from '../component'
var AutoComplete = register({
    afterUpdate: function(action, options) {
        if (action === 'autoComplete') {
            var child;
            while (child = this.props.dom.candidates.firstChild) {
                this.props.dom.candidates.removeChild(child)
            }
            // options === candidates
            console.log(options);
            var candidates = options[0];
            candidates.forEach(can => {
                var btn = document.createElement('button');
                btn.textContent = can;
                btn.addEventListener('click', e => {
                    this.props.dom.input.value = can;
                });
                this.props.dom.candidates.appendChild(btn);
            })
        }
    },
    methods: {
        autoComplete: function(finish) {
            this.props.prefix = this.props.dom.input.value;
            return finish();
        },
        input: function(finish, input) {
            this.props.dom.input.value += input;
            var result = finish();
            // TODO: This autoComplete !== below autoComplete, seems weird for develoeprs
            this.autoComplete();
            return result;
        }
    }
})

export default AutoComplete;
