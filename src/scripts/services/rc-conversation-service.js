import sdk from './rc-sdk'
import callLogService from './call-log-service'
import rcMessageService from './rc-message-service'
import { register } from '../service'
var conversationService = (function(sdk) {
    var cachedHour = 24 * 7
    function groupMessageToContact(msgs, contacts) {
        var relatedContacts = contacts.filter(contact => {
            var knownContactsIndex = []
            var contactNums = contact.phoneNumber.concat(contact.extension)
            var contactMsgs = msgs.filter((msg, index) => {
                var msgNumber = msg.direction === 'Inbound'? msg.from: msg.to
                var contain = contactNums.indexOf(msgNumber) > -1
                if (contain) {
                    contact.msg = contact.msg || []
                    contact.msg.push(msg)
                    knownContactsIndex.push(index)
                }
                return contain
            })
            knownContactsIndex.reverse().forEach(index => msgs.splice(index, 1))
            return contactMsgs.length > 0
        })
        // msgs.forEach(msg => {
        //     var msgNumber = msg.direction === 'Inbound'? msg.from: msg.to
        //     var contact = relatedContacts.filter(contact => contact.id === msgNumber)[0]
        //     if (contact) {
        //         contact.msg.push(msg)
        //     } else {
        //         relatedContacts.push(fakeContact(msg))
        //     }
        // })
        return relatedContacts
    }

    function groupContactToMessage(msgs, contacts) {
        return msgs.map(msg => {
            var unknownContact = true
            contacts.forEach(contact => {
                var contactNums = contact.phoneNumber.concat(contact.extension)
                var msgNumber = msg.direction === 'Inbound'? msg.from: msg.to
                var contain = contactNums.indexOf(msgNumber) > -1
                if (contain) {
                    msg.contact = contact
                    unknownContact = false
                }
            })
            unknownContact && (msg.contact = fakeContact(msg))
            return msg
        })
    }

    function combineAdjacentMessage(contents) {
        // group related SMS message
        var savedContent
        var result = []
        for (let i = 0; i < contents.length; ++ i) {
            let content = contents[i]
            // if (content.type !== 'SMS') {
            //     if (savedContent) {
            //         result.push(savedContent)
            //         savedContent = null
            //     }
            //     result.push(content)
            //     continue
            // }
            if (savedContent && 
                savedContent.type === content.type &&
                savedContent.contact.id === content.contact.id) {
                savedContent.others.push(content)
            } else {
                savedContent && result.push(savedContent)
                content.others = []
                savedContent = content
            }
        }
        savedContent && result.push(savedContent)
        return result
    }
    
    function combine(...targets) {
        return targets.reduce((result, target) => result.concat(target), [])
    }

    function sortTime(target) {
        return target.slice().sort((a, b) => 
            Date.parse(b.time) - 
            Date.parse(a.time)
        )
    }
    function containSameVal(array1, array2) {
        return array1.filter(function(n) {
            return array2.indexOf(n) != -1;
        }).length > 0
    }
    function uniqueArray(target) {
         var seen = {};
        return target.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    function fakeContact(msg) {
        var phoneNumber = msg.direction === 'Inbound'? msg.from: msg.to
        return {
            displayName: phoneNumber,
            id: phoneNumber,
            phoneNumber: [phoneNumber],
            extension: null,
            msg: [msg]
        }
    }

    function adaptMessage(msg) {
        return {
            id:                 msg.id,
            from:               msg.from.extensionNumber || 
                                msg.from.phoneNumber,
            to:                 msg.to.phoneNumber || 
                                msg.to.extensionNumber || 
                                msg.to[0].extensionNumber || 
                                msg.to[0].phoneNumber,
            direction:          msg.direction,
            type:               msg.type,
            time:               msg.creationTime || 
                                msg.startTime,
            lastModifiedTime:   msg.lastModifiedTime || 
                                msg.startTime,
            subject:            msg.recording ||
                                msg.subject ||
                                msg.action ||
                                msg.attachments[0]
        }
    }
    function getMessagesByNumber(contact, offset) {
        return Promise.all(contact.phoneNumber.map(
                    number => rcMessageService.getMessagesByNumber(
                        // FIXME
                        number,
                        cachedHour + offset,
                        cachedHour
                    )
                )
        )
        .then(result => combine(...result))
    }
    function getCallLogsByNumber(contact, offset) {
        return Promise.all(contact.phoneNumber.map(
                    number => callLogService.getCallLogsByNumber(
                        // FIXME
                        number,
                        cachedHour + offset,
                        cachedHour
                    )
                )
        )
        .then(result => combine(...result))
    }
    function combineContent(...sources) {
        return sortTime(combine(...sources.map(source => source.map(adaptMessage))))
    }
    return {
        get cachedHour() {
            return cachedHour
        },
        getContent: function(contacts, ...sources) {
            var contents = combineContent(...sources)
            var relatedContacts = groupMessageToContact(contents.slice(), contacts)
            contents = groupContactToMessage(contents, relatedContacts)
            return contents
        },
        organizeContent: function(contacts, ...sources) {
            var contents = combineContent(...sources)
            var relatedContacts = groupMessageToContact(contents.slice(), contacts)
            contents = groupContactToMessage(contents, relatedContacts)
            contents = combineAdjacentMessage(contents)
            return contents
        },
        getConversations: function(contacts, ...sources) {
            var contents = combineContent(...sources)
            var relatedContacts = groupMessageToContact(contents, contacts)
                                .map(contact => {
                                    contact.syncHour = cachedHour
                                    return contact
                                })
                                .map(contact => {
                                    contact.phoneNumber =
                                    uniqueArray(contact.phoneNumber.concat(contact.extension))
                                    return contact
                                })
                                .reduce((map, contact) => {
                                    map[contact.id] = contact
                                    return map
                                }, {})
            return relatedContacts
        },
        syncContent: function(contact, offset) {
            return Promise.all([
                        getCallLogsByNumber(contact, offset),
                        getMessagesByNumber(contact, offset)
                    ])
                    .then(result => combine(...result))
                    .then(msgs => msgs.map(adaptMessage))
                    .then(sortTime)
                    .then(msgs => {
                        cachedHour += offset
                        return msgs
                    })
        },
        onConversationUpdate: function(handler) {
            rcMessageService.onMessageUpdated(msgs => {
                try {
                    var msgs = sortTime(msgs.map(adaptMessage)).reverse()
                    handler(msgs)
                } catch (e) {
                    console.error(e)
                    throw e
                }
            })
        },
        adaptMessage
    }
})(sdk)

register('conversationService', conversationService)
export default conversationService
