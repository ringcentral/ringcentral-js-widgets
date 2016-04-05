import rcMessageService from './rc-message-service'
import { register } from '../service'
var rcMessageProvider = function() {

    var messageUpdatedHandlers = []
    rcMessageService.onMessageUpdated(() => {
        messageUpdatedHandlers.forEach(h => {
            try {
                h()
            }catch (e) {
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
            contact: getNumber(message.type, getDirection(message)),
            subject: message.subject || null,
            convId: message.conversation.id
        }

        function getDirection(message) {
            return message.direction === 'Outbound' ? message.to[0] : message.from
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
                var conversations = {}
                messages.forEach(message => {
                    var result = createResult(message)
                    //Combine SMS/Pager messages in conversation
                    if (message.conversationId) {
                        conversations[message.conversationId] = conversations[message.conversationId] || []
                        conversations[message.conversationId].push(result)
                    } else {
                        conversations['anonymous'] = conversations['anonymous'] || []
                        conversations['anonymous'].push(result)
                    }
                })
                return conversations
            })
        },
        getConversation: function(convId) {
            return rcMessageService.getConversation(convId)
        },

        onMessageUpdated: function(handler) {
            messageUpdatedHandlers.push(handler)
        }
    }
}()
register('rcMessageProvider', rcMessageProvider)
export default rcMessageProvider

