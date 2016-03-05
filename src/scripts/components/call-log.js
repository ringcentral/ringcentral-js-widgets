import { register, Component } from '../component'
import CallLogItem from './call-log-item'


var CallLog = register({
    methods: {
        
        logUpdated:function(logItems){
            
            var props = this.props;
            logItems.forEach(function(item){
                
                var callLogItem = new CallLogItem({
                    template:'../template/call-log-item.html',
                    beforeUpdate:function(action){
                        
                    },
                    afterUpdate: function(action){
                        if(action === 'mount'){
                            if(item.direction === 'Outbound'){
                                this.props.dom.contact.innerHTML = item.to.name;
                                this.props.dom.location.innerHTML = item.to.location;
                                this.props.dom.time.innerHTML = item.startTime;
                            }
                            else{
                                this.props.dom.contact.innerHTML = item.from.name;
                                //this.props.dom.location.innerHTML = item.from.location;
                                this.props.dom.time.innerHTML = item.startTime;
                            }
                        }
                    }
                    
                });
                
                callLogItem.render(props.dom.logs);
                
            });
            
        }        

    }
});

export default CallLog
