import sdk from './rc-sdk'
import { register } from '../service'

var rcContactService = function(sdk) {
    var companyContacts = []
    var completeCompanyContacts = null
    
    var fetchingCompanyContacts = null
    var fetchingCompleteCompanyContacts = null

    function Contact() {
        this.firstName = null
        this.lastName = null
        this.displayName = null
        this.extension = null
        this.email = null
        this.type = null
        this.id = null
        this.phoneNumber = []
    }

    function createContact(extension) {
        var contact = new Contact()
        contact.extension = extension.extensionNumber
        contact.firstName = extension.contact.firstName
        contact.lastName = extension.contact.lastName
        contact.displayName = contact.firstName + ' ' + contact.lastName
        contact.email = extension.contact.email
        contact.type = 'rc'
        contact.id  = extension.id
        contact.profileImage = extension.profileImage.uri
        return contact
    }

    function addToCompanyContact(response) {
        var records = response.json().records
           .filter(extension =>
                extension.status === 'Enabled' &&
                ['DigitalUser', 'User'].indexOf(extension.type) >= 0)
           .map(extension => createContact(extension))
        companyContacts.push.apply(companyContacts, records)
    }

    function fetchCompanyContactByPage(page) {
        return sdk.platform().get('/account/~/extension/', {perPage: 250, page: page})
    }

    function fetchCompanyDirectNumbersByPage(page) {
        return sdk.platform().get('/account/~/phone-number', {perPage: 250, page: page})
    }

    function fetchCompanyContacts() {
        var page = 1
        fetchingCompanyContacts = fetchCompanyContactByPage(page)
            .then(function(response) {
                var respObj = response.json()
                if (respObj.paging && respObj.paging.totalPages > page) {
                    var promises = []
                    while (respObj.paging.totalPages > page) {
                        page++
                        promises.push(fetchCompanyContactByPage(page))
                    }

                    return Promise.all(promises).then(responses=> {
                        responses.forEach(function(response) {
                            addToCompanyContact(response)
                        })
                        fetchingCompanyContacts = null
                        return companyContacts
                    })
                }else {
                    addToCompanyContact(response)
                    return companyContacts
                }
            }).catch(function(e) {
                console.error(e)
            })
        return fetchingCompanyContacts
    }

    function fetchCompanyDirectNumbers() {
        var page = 1
        return fetchCompanyDirectNumbersByPage(page)
        .then(response => {
            var respObj = response.json()
            if (respObj.paging && respObj.paging.totalPages > page) {
                var promises = []
                while (respObj.paging.totalPages > page) {
                    page++
                    promises.push(fetchCompanyDirectNumbersByPage(page))
                }

                return Promise.all(promises).then(responses => {
                    var numbers = {}
                    responses.forEach(response => {
                        var resp = response.json()
                        resp.records.forEach(el => {
                            if (el.extension && el.extension.extensionNumber) {
                                if (!numbers[el.extension.extensionNumber]) {
                                    numbers[el.extension.extensionNumber] = []
                                }

                                numbers[el.extension.extensionNumber].push(el)
                            }
                        })
                    })
                    companyContacts.forEach(contact => {
                        var phones = numbers[contact.extension]
                        if (phones) {
                            phones.forEach(phone => {
                                contact.phoneNumber.push(phone.phoneNumber)
                            })
                        }
                    })
                })
            }
        })
    }

    return {
        companyContacts: companyContacts,
        asyncGetCompanyContact: function() {
            if (fetchingCompanyContacts) {
                return fetchingCompanyContacts
            }else {
                return Promise.resolve(companyContacts)
            }
        },
        syncCompanyContact: function() {
            companyContacts.length = 0
            fetchCompanyContacts()
            fetchCompanyDirectNumbers()
        },
        completeCompanyContact: function() {
            if (completeCompanyContacts) 
                return Promise.resolve(completeCompanyContacts)
            if (fetchingCompleteCompanyContacts)
                return fetchingCompleteCompanyContacts
            fetchingCompleteCompanyContacts = fetchCompanyContacts().then(fetchCompanyDirectNumbers)
            return fetchingCompleteCompanyContacts.then(() => {
                completeCompanyContacts = companyContacts
                fetchingCompleteCompanyContacts = null
                return companyContacts
            })
        }
    }
}(sdk)

register('rcContactService', rcContactService)
export default rcContactService
