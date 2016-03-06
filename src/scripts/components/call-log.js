import { register, Component } from '../component'
import CallLogItem from './call-log-item'

var CallLog = register({
    
    afterUpdate:function(action, options){
        var allCallTab = this.props.dom.allCallTab;
        var missedCallTab = this.props.dom.missedCallTab;
            
        if(action === 'enableAllCallTab'){
            if(allCallTab.classList.contains('active') === false){
                allCallTab.classList.add('active');
                missedCallTab.classList.remove('active');
            }
        }else if(action === 'enableMissedCallTab'){
            
            if(missedCallTab.classList.contains('active') === false){
                missedCallTab.classList.add('active');
                allCallTab.classList.remove('active');
            }
        }
    },
    methods: {
        
        enableAllCallTab: function(finish, event){
             
             return finish();          
        },
        enableMissedCallTab: function(finish, event){
             
             return finish();          
        },
        logUpdated:function(logItems){
            
            var props = this.props;
            logItems.forEach(function(item){
                
                var callLogItem = new CallLogItem({
                    template:'./template/call-log-item.html',
                    beforeUpdate:function(action){
                        
                    },
                    afterUpdate: function(action){
                        if(action === 'mount'){
                            //TODO: How to manipulate dom style
                            if(item.direction === 'Outbound'){
                                this.props.dom.contact.innerHTML = item.to.name;
                                this.props.dom.location.innerHTML = item.to.location;
                                this.props.dom.time.innerHTML = item.startTime;
                            }
                            else{
                                if(item.from.name){
                                    this.props.dom.contact.innerHTML = item.from.name;
                                }else{
                                    this.props.dom.contact.innerHTML = item.from.phoneNumber;
                                }
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
