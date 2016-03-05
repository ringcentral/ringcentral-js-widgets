import { Component, register } from '../component'
var AutoComplete = register({
    afterUpdate: function(action, options) {
        if (action === 'autoComplete') {
            // options === candidate
            
        }
    },
    methods: {
        autoComplete: function(finish) {
            this.props.prefix = this.props.dom.input.value;
            return finish(this.props);
        },
        input: function(finish, input) {
            this.props.dom.input.value += input;
            var result = finish(this.props);
            // TODO: This autoComplete !== below autoComplete, seems weird for develoeprs
            this.autoComplete();
            return result;
        }
    }
})

export default AutoComplete;
