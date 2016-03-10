import sdk from './rc-sdk'

var CallLogService = (function(sdk){
    return {
        
        getCallLogs:function(){
            
            return sdk.platform()
                .get('/account/~/extension/~/call-log', { dateFrom:'2016-2-28' })
                .then(response => {
                    return response.json().records;
                })
                .catch(function(e) {
                    console.error('Recent Calls Error: ' + e.message);
                });
            
        } 
    };
    
})(sdk);

export default CallLogService;