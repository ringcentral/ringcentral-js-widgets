import sdk from './rc-sdk'

var CallLogService = (function(sdk){
    
    var period = 7 * 24 * 3600 * 1000;
    var dateFrom = new Date(Date.now() - (period));
    
    
    return {
        
        
        getCallLogs:function(){
            
            return sdk.platform()
                .get('/account/~/extension/~/call-log', { dateFrom: dateFrom.toISOString() })
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