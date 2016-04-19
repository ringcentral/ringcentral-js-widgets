import sdk from './rc-sdk'
import callLogService from './call-log-service'
import rcMessageService from './rc-message-service'
import { register } from '../service'
var conversationService = (function(sdk) {
    var cachedHour = 24 * 7
    function mapContactMessage(msgs, contacts) {
        return contacts.filter(contact => {
            var contactNums = contact.phoneNumber.concat(contact.extension)
            return msgs.filter(msg => {
                var contain = containSameVal([msg.from, msg.to], contactNums)
                if (contain) {
                    contact.msg = contact.msg || []
                    contact.msg.push(msg)
                }
                return contain
            }).length > 0
        })
    }
    
    function combine(...targets) {
        return targets.reduce((result, target) => result.concat(target), [])
    }

    function sortTime(target) {
        return target.sort((a, b) => 
            Date.parse(b.lastModifiedTime) - 
            Date.parse(a.lastModifiedTime)
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
    return {
        get cachedHour() {
            return cachedHour
        },
        getConversations: function(contacts, ...sources) {
            var contents = sortTime(combine(...sources.map(source => source.map(adaptMessage))))
            var relatedContacts = mapContactMessage(contents, contacts)
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
        }
    }
})(sdk)

register('conversationService', conversationService)
export default conversationService
