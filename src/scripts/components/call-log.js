import { register, Component } from '../component'
import CallLogItem from './call-log-item'

function switchTab(tab1, tab2){
    if(tab1.classList.contains('active') === false){
        tab1.classList.add('active');
        tab2.classList.remove('active');
    }
}

function switchTabByClick(){
    var callTab = this.props.dom.callTab;
    var missedCallTab = this.props.dom.missedCallTab;
    callTab.addEventListener('click', function(){
        switchTab.call(this, callTab, missedCallTab);
    });
    
    missedCallTab.addEventListener('click', function(){
        switchTab.call(this, missedCallTab, callTab);
    });
}

var CallLog = register({
    
    afterUpdate:function(action, options){
        if(action === 'mount'){
            switchTabByClick.call(this);
        }
    },
    methods: {
        logUpdated:function(logItems){
            
            var props = this.props;
            logItems.forEach(function(item){
                
                var callLogItem = new CallLogItem({
                    template:'./template/call-log-item.html',
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
