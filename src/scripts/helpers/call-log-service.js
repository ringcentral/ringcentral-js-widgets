import sdk from './rc-sdk'

var CallLogService = (function(sdk){
    
    var callLogUpdatedHandlers = [];
    
    return {
        
        getCallLogs:function(){
            
            sdk.platform()
                .get('/account/~/extension/~/call-log', { dateFrom:'2016-2-28' })
                .then(response => {
                    var records = response.json().records;
                    callLogUpdatedHandlers.forEach(fun => fun(records));                        
                })
                .catch(function(e) {
                    console.error('Recent Calls Error: ' + e.message);
                });
            
        },
        
        registerCallLogUpdatedHandler:function(handler){
            callLogUpdatedHandlers.push(handler);
        }  
    };
    
})(sdk);

export default CallLogService;