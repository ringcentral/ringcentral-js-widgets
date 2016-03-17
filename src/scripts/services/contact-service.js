import { register } from '../service';

var contactService = function() {

    var keysToSet = ['type', 'firstName', 'lastName', 'middleName', 'company'];

    function Contact(type) {

        this.type = type;

        this.uri = null;
        this.id = null;
        this.trackingId = null;
        this.availability = null;
        this.firstName = null;
        this.lastName = null;
        this.middleName = null;
        this.nickName = null;
        this.company = null;
        this.jobTitle = null;

        this.extensionNumber = null;

        this.phoneNumber = [];
        this.phoneNumberType = {};

        this.email = null;
        this.email2 = null;
        this.email3 = null;

        this.homeAddress = null;
        this.businessAddress = null;
        this.otherAddress = null;

        this.avatarUrl = null;
    }

    function createContact(rawContactsObj) {
        var contact = {};

        contact = Object.assign(contact, rawContactsObj);

        return contact;
    }

    return {

        contacts: [],

        search: function(queryText) {

        },

        addNewContacts: function(rawContactsObj) {
            var contactObj = createContact(rawContactsObj);
            this.contacts.push(contactObj);
        },
    };

}();

register('contactService', contactService);
export default contactService;
