import { register } from '../service';
var messageSearchService = function() {

    function createResult(message) {
        var result = {};
        if (message.direction === 'Outbound') {
            if (message.type === 'Pager') {
                result.contact = message.to[0].extensionNumber;
            }else {
                result.contact = message.to[0].phoneNumber;
            }
        }else {
            if (message.type === 'Pager') {
                result.contact = message.from.extensionNumber;
            }else {
                result.contact = message.from.phoneNumber;
            }
        }
        //TODO: Use localization string instead of plain text
        if (message.type === 'SMS' || message.type === 'Pager') {
            result.subject = message.subject;
        }else if (message.type === 'VoiceMail') {
            result.subject = 'Voice Message';
        }else if (message.type === 'Fax') {
            result.subject = 'Fax';
        }
        result.readStatus = message.readStatus;
        result.type = message.type;
        result.id = message.id;
        result.time = message.lastModifiedTime;
        return result;
    }
    
    return {
        getMessages: function(messageProviderFunctions, filter) {
            return Promise.all(messageProviderFunctions).then(messageResults => {
                var results = [];
                messageResults.forEach(messages => {
                    messages.forEach(message => {
                        var result = createResult(message);
                        if (filter) {
                            if (filter(result)) {
                                results.push(result);
                            }
                        }else {
                            results.push(result);
                        }
                    });
                });
                return results;
            });
        }
    };
}();
register('messageSearchService', messageSearchService);
export default messageSearchService;
