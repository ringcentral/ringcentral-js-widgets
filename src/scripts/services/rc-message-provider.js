import rcMessageService from './rc-message-service'
import { register } from '../service'
var rcMessageProvider = function() {
    var messageUpdatedHandlers = []
    var conversations = {}

    rcMessageService.onMessageUpdated(results => {
        messageUpdatedHandlers.forEach(h => {
            try {
                h(results)
            } catch (e) {
                console.error(e)
            }
        })
    })

    function createResult(message) {
        return {
            id: message.id,
            time: message.lastModifiedTime,
            readStatus: message.readStatus,
            type: getType(message),
            contact: getNumber(message.type, getDirection(message, 'Outbound')),
            subject: message.subject || null,
            convId: message.conversation.id,
            author: getNumber(message, getDirection(message, 'Inbound'))
        }

        function getDirection(message, dir) {
            return message.direction === dir ? message.to[0] : message.from
        }

        function getNumber(message, info) {
            return message.type === 'Pager' ? info.extensionNumber : info.phoneNumber
        }

        function getType(message) {
            return (message.type === 'Fax' || message.type === 'VoiceMail') ? 'Text' : message.type
        }
    }

    return {
        getTextMessages: function() {
            return Promise.resolve(rcMessageService.getMessagesByType('SMS')).then(messages => {
                var results = []
                messages.forEach(message => {
                    results.push(createResult(message))
                })
                return results
            })
        },

        getLastMessagesOfAllType: function() {
            var results = []
            return this.getMessagesOfAllType()
                        .then(msgs => {
                            for (var key in msgs) {
                                if (msgs.hasOwnProperty(key)) {
                                    if (key === 'anonymous')
                                        results = results.concat(msgs.single[0])
                                    else
                                        results.push(msgs[key][0])
                                }
                            }
                            return results
                        })
        },
        // Return all messages of type 'VoiceMail' and 'Fax'. For SMS and Pager, only last message in a conversation
        // will be returned.
        getMessagesOfAllType: function() {
            return Promise.resolve(rcMessageService.getAllMessages()).then(messages => {
                var results = []
                var target = {}
                messages.forEach(message => {
                    var result = createResult(message)
                    //Combine SMS/Pager messages in conversation
                    if (message.conversation && message.conversation.id) {
                        target[message.conversation.id] = target[message.conversation.id] || []
                        target[message.conversation.id].push(result)
                        conversations[message.conversation.id] = conversations[message.conversation.id] || []
                        conversations[message.conversation.id].push(message)
                    } else {
                        target['anonymous'] = target['anonymous'] || []
                        target['anonymous'].push(result)
                    }
                })
                return target
            })
        },
        getConversation: function(convId) {
            console.log(conversations);
            console.log(convId);
            if (conversations[convId]) {
                console.log('hit cache');
                console.log(conversations[convId]);
                return Promise.resolve(conversations[convId].reverse())
            }
            else
                return rcMessageService.getConversation(convId)
        },

        onMessageUpdated: function(handler) {
            messageUpdatedHandlers.push(handler)
        }
    }
}()
register('rcMessageProvider', rcMessageProvider)
export default rcMessageProvider

