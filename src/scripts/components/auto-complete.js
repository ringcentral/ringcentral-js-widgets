import { Component, register } from '../component'
var AutoComplete = register({
    methods: {
        autoComplete: function(finish) {
            this.props.prefix = this.props.dom.input.value;
            return finish(this.props);
        },
        input: function(finish, input) {
            this.props.dom.input.value += input;
            return finish(this.props);
        }
    }
})

export default AutoComplete;
