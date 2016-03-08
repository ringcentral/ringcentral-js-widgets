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
            before: function() {},
            method: function(finish) {
                this.props.prefix = this.props.dom.input.value;
                return finish();
            },
            after: function(flow) {
                console.log(flow);
                
            }
        }
    }

})

export default AutoComplete;
