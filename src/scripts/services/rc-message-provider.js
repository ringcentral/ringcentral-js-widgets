import rcMessageService from './rc-message-service';
import { register } from '../service';
var rcMessageProvider = function() {
    
    var messageUpdatedHandlers = [];
    rcMessageService.onMessageUpdated((updatedMessages) => {
        var messageParam = {
            deleted : [],
            updated : []
        };
        updatedMessages.forEach(message => {
            if(message.availability === 'Alive'){
                messageParam.updated.push(message);
            }else{
                messageParam.deleted.push(message);                
            }
        });
        messageUpdatedHandlers.forEach(h => {
            try{
                h(messageParam);
            }catch(e){
                console.error(e);
            }
        });
    });

    return {
        getTextMessages: function() {
            return Promise.resolve(rcMessageService.getMessagesByType('SMS')).then(messages => {
                var results = [];
                messages.forEach(message => {
                    results.push(message);
                });
                return results;
            });
        },
        //Return all messages of type 'VoiceMail' and 'Fax'. For SMS and Pager, only last message in a conversation
        // will be returned.
        getLastMessagesOfAllType: function() {
            return Promise.resolve(rcMessageService.getAllMessages()).then(messages => {
                var results = [];
                var added = {};
                messages.forEach(message => {
                    //Combine SMS/Pager messages in conversation
                    if (message.conversationId) {
                        if (!added[message.conversationId]) {
                            added[message.conversationId] = [];
                        }
                        added[message.conversationId].push(message);
                    }else {
                        results.push(message);
                    }
                });
                for (var key in added) {
                    if (added.hasOwnProperty(key)) {
                        results.push(added[key][0]);
                    }
                }
                return results;
            });
        },
        onMessageUpdated: function(handler){
            messageUpdatedHandlers.push(handler);
        }
    };
}();
register('rcMessageProvider', rcMessageProvider);
export default rcMessageProvider;

