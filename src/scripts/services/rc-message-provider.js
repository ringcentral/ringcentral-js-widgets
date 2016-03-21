import rcMessageService from './rc-message-service';
import { register } from '../service';
var rcMessageProvider = function() {
    
    function createResult(message){
        var result = {};
        if(message.direction === 'Outbound'){
            result.contact = message.to[0].phoneNumber;
        }else{
            result.contact = message.from.phoneNumber;            
        }
        if(message.type === 'SMS'){
            result.subject = message.subject;
        }else{
            result.subject = message.type;
        }
        result.readStatus = message.readStatus;
        result.type = message.type;
        result.id = message.id;
        result.time = message.lastModifiedTime;
        return result;
    }
    
    return {
        getTextMessages: function() {
            return Promise.resolve(rcMessageService.getMessagesByType('SMS')).then(messages => {
                var results = [];
                messages.forEach(message => {
                    results.push(createResult(message));
                });
                return results;
            });
        },
        getAllMessages: function() {
            return Promise.resolve(rcMessageService.getAllMessages()).then(messages => {
                var results = [];
                messages.forEach(message => {
                    results.push(createResult(message));
                });
                return results;
            });
        }
    };
}();
register('rcMessageProvider', rcMessageProvider);
export default rcMessageProvider;

