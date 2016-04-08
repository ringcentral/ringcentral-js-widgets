import rcContactService from './rc-contact-service'
import { register } from '../service'
var rcContactSearchProvider = function() {
    return {
        search: function(text) {
            var results = []
            if (text) {
                text = text.toLowerCase()
                rcContactService.companyContacts.map(contact => {
                    if (contact.displayName && contact.displayName.toLowerCase().indexOf(text) >= 0) {
                        results.push({
                            name: contact.displayName,
                            value: contact.extension,
                            type: 'rc',
                            id: contact.id,
                        })
                        contact.phoneNumber.forEach(phone => {
                            results.push({
                                name: contact.displayName,
                                value: phone,
                                type: 'rc',
                                id: contact.id,
                            })
                        })
                    } else {
                        if (contact.extension && contact.extension.indexOf(text) >= 0) {
                            results.push({
                                name: contact.displayName,
                                value: contact.extension,
                                type: 'rc',
                                id: contact.id,
                            })
                        }

                        contact.phoneNumber.forEach(phone => {
                            if (phone.indexOf(text) >= 0) {
                                results.push({
                                    name: contact.displayName,
                                    value: phone,
                                    type: 'rc',
                                    id: contact.id,
                                })
                            }
                        })
                    }
                })
            }

            return results
        },
        searchAll: function() {
            return rcContactService.asyncGetCompanyContact().then(companyContacts => {
                return companyContacts.map(contact => {
                    return {
                        name: contact.displayName,
                        type: 'rc',
                        id: contact.id,
                    }
                });
            });
        }
    }
}()

register('rcContactSearchProvider', rcContactSearchProvider)
export default rcContactSearchProvider
