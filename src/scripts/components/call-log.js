import { register, Component } from '../component'
import CallLogItem from './call-log-item'

var CallLog = register({
    
    afterUpdate:function(action, options){
        var allCallTab = this.props.dom.allCallTab;
        var missedCallTab = this.props.dom.missedCallTab;
        var logs = this.props.dom.logs;
            
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
                    template:'../template/call-log-item.html',
                    afterUpdate: function(action){
                        if(action === 'mount'){
                            if(item.result === "Missed"){
                                this.props.dom.callResult.classList.add('call-missed');
                            }
                            
                            if(item.direction === 'Outbound'){
                                if(item.to.name){
                                    this.props.dom.contact.innerHTML = item.to.name;
                                }else{
                                    this.props.dom.contact.innerHTML = item.to.phoneNumber;
                                }
                                
                                if(item.to.location){
                                    this.props.dom.location.innerHTML = item.to.location;
                                }
                                this.props.dom.time.innerHTML = item.startTime;
                                
                                if(item.result !== "Missed"){
                                    this.props.dom.callResult.classList.add('call-outbound');
                                }
                            }
                            else{
                                if(item.from.name){
                                    this.props.dom.contact.innerHTML = item.from.name;
                                }else{
                                    this.props.dom.contact.innerHTML = item.from.phoneNumber;
                                }
                                this.props.dom.time.innerHTML = item.startTime;
                                
                                if(item.result !== "Missed"){
                                    this.props.dom.callResult.classList.add('call-inbound');
                                }
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
