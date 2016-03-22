import { register } from '../service';
var messageSearchService = function() {
    return {
        getMessages: function(messageProviderFunctions, filter) {
            return Promise.all(messageProviderFunctions).then(messageResults => {
                var results = [];
                messageResults.forEach(messages => {
                    messages.forEach(message => {
                        if(filter){
                            if(filter(message)){
                                results.push(message);
                            }
                        }else{
                            results.push(message);
                        }                    
                    });    
                });
                return results;
            });
        }
    }
}();
register('messageSearchService', messageSearchService);
export default messageSearchService;