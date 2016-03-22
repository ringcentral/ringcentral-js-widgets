import sdk from './rc-sdk';
import { register } from '../service';

var rcMessageService = function(sdk) {

    var MESSAGES_MAX_AGE_HOURS = 7 * 24;
    var messages = {};
    var fetchingPromise = null;
    
    function fetchMessages(){
        return sdk.platform().get('/account/~/extension/~/message-store', {
                    dateFrom: new Date(Date.now() - MESSAGES_MAX_AGE_HOURS * 3600 * 1000).toISOString()
        }).then(responses => {
            var results = responses.json().records;
            results.forEach(message => {
                if(!messages[message.type]){
                    messages[message.type] = [];
                }
                messages[message.type].push(message);
            });
            fetchingPromise = null;
        });
    }
    
    function concatMessages(){
        var results = [];
        for(var key in messages){
            if(messages.hasOwnProperty(key)){
                results = results.concat(messages[key]);
            }
        }
        return results;
    }

    return {
        syncMessages: function() {
            fetchingPromise = fetchMessages();
        },
        getMessagesByType: function(type){
            if(!fetchingPromise){
                if(messages[type]){
                    return messages[type];
                }else{
                    return [];
                }   
            }else{
                return fetchingPromise.then(() => {
                    return messages[type];
                });
            }
        },
        getAllMessages: function() {
            if(!fetchingPromise){
                return concatMessages();
            }else{
                return fetchingPromise.then(() => {
                    return concatMessages();
                });
            }
        }
    };
}(sdk);

register('rcMessageService', rcMessageService);
export default rcMessageService;
