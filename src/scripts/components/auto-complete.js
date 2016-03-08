import register from '../component'
var AutoComplete = register({
    actions: {
        init: {
            before: function() {},
            method: function() {},
            after: function() {}
        },
        render: {
            before: function() {},
            method: function(finish) {
                finish();
            },
            after: function() {}
        },
        autoComplete: {
            before: function(d) {
            },
            method: function(finish, d) {
                this.props.prefix = this.props.dom.input.value;
                return finish();
            },
            after: function(candidates) {
                console.log(candidates);
            }
        }
    }

})

export default AutoComplete;
