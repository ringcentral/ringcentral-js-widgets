import { register } from '../service'
import rcContactService from '../services/rc-contact-service'

function ContactDetailObject() {
    this.id = null;
    this.displayName = null;
    this.extension = null;
    this.type = null;
    this.emails = [];
    this.phoneNumbers = [];
}

function getRCContactForContactDetailWidget(contactId) {
    for(var i = 0; i <rcContactService.companyContacts.length; i++){
        var contact = rcContactService.companyContacts[i];
        if(contact.id === contactId){
            var result = new ContactDetailObject();
            result.displayName = contact.displayName;
            result.extension = contact.extension;
            result.id = contact.id;
            result.type = 'rc';
            contact.phoneNumber.forEach(number => {
                result.phoneNumbers.push(number); 
            });
            result.emails.push(contact.email);
            return result;
        }
    }
}

var contactDetailWidgetAdapter = (function() {
    var contactProviders = {};
    
    contactProviders['rc'] = getRCContactForContactDetailWidget;

    return {
        getContact: function(contactId, contactType) {
            var provider = contactProviders[contactType];
            if(provider) {
                return Promise.resolve(provider(contactId)).then(result => {
                    return result;
                });
            }else {
                throw Error("No provider is associated with specified contactType '" + contactType + "'");
            }
        }
    }
})()
register('contactDetailWidgetAdapter', contactDetailWidgetAdapter)
export default contactDetailWidgetAdapter
