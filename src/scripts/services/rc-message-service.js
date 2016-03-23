import sdk from './rc-sdk';
import rcSubscription from './rc-subscription-service'
import { register } from '../service';

var rcMessageService = function(sdk) {

    var MESSAGES_MAX_AGE_HOURS = 7 * 24;
    var messages = {};
    var fetchingPromise = null;
    var syncToken = null;
    var messageUpdateHandlers = [];
    
    rcSubscription.subscribe('message-store', '/restapi/v1.0/account/~/extension/~/message-store', (msg) => {
        incrementalSyncMessages();
    });    

    function fullSyncMessages() {
        return sdk.platform().get('/account/~/extension/~/message-sync', {
            dateFrom: new Date(Date.now() - MESSAGES_MAX_AGE_HOURS * 3600 * 1000).toISOString(),
            syncType: 'FSync'
        }).then(responses => {
            var jsonResponse = responses.json();
            syncToken = jsonResponse.syncInfo.syncToken;
            var results = jsonResponse.records;
            addMessageToList(results);
            fetchingPromise = null;
        });
    }
    
    function incrementalSyncMessages() {
        if(syncToken){
            return sdk.platform().get('/account/~/extension/~/message-sync', {
                syncType: 'ISync',
                syncToken: syncToken
            }).then(responses => {
                var jsonResponse = responses.json();
                var results = jsonResponse.records;
                updateMessageList(results);
                messageUpdateHandlers.forEach((h) => {
                    h(results);
                });
            });
        }
    }

    function concatMessages() {
        var results = [];
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                results = results.concat(messages[key]);
            }
        }
        return results;
    }
    
    function addMessageToList(results){
        results.forEach(message => {
            if (!messages[message.type]) {
                messages[message.type] = [];
            }
            messages[message.type].push(message);
        });
    }
    
    function updateMessageList(results){
        results.forEach(message => {
            if (!messages[message.type]) {
                messages[message.type] = [];
                messages[message.type].push(message);
            }else{
                var index = 0;
                for(; index < messages[message.type].length; index++){
                    if(messages[message.type][index].id === message.id){
                        messages[message.type][index] = message;
                        break;
                    }
                }
                if(index === messages[message.type].length){
                    messages[message.type].push(message);
                }
            }
        });
    }

    return {
        syncMessages: function() {
            fetchingPromise = fullSyncMessages();
            return fetchingPromise;
        },
        getMessagesByType: function(type) {
            if (!fetchingPromise) {
                if (messages[type]) {
                    return messages[type];
                }else {
                    return [];
                }
            }else {
                return fetchingPromise.then(() => {
                    return messages[type];
                });
            }
        },
        getAllMessages: function() {
            if (!fetchingPromise) {
                return concatMessages();
            }else {
                return fetchingPromise.then(() => {
                    return concatMessages();
                });
            }
        },
        onMessageUpdated: function(handler) {
            if(handler){
                messageUpdateHandlers.push(handler);
            }
        }
    };
}(sdk);

register('rcMessageService', rcMessageService);
export default rcMessageService;
