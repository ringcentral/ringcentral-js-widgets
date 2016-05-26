import { RC } from './rc-sdk'
import LZString from 'lz-string'

var rcContactService = function() {
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
        return RC.sdk.platform().get('/account/~/extension/', {perPage: 250, page: page})
    }

    function fetchCompanyDirectNumbersByPage(page) {
        return RC.sdk.platform().get('/account/~/phone-number', {perPage: 250, page: page})
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
        get companyContacts() {
            return companyContacts
        },
        accessToken: function() {
            return RC.sdk.platform().auth().accessToken()
        },
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
        },
        cacheContacts: (function() {
            var contact = null
            var data = localStorage.getItem('rc-contacts')
            var fetch
            // FIXME: temp disable it
           
            return function() {
                var fetch
                var fetch = new Promise((resolve, reject) => {
                // Hack for delay the refreshing request
                  setTimeout(() => {
                    rcContactService.completeCompanyContact()
                    .then(data => {
                        if (data)
                            localStorage.setItem('rc-contacts', LZString.compressToUTF16(JSON.stringify(data)))
                        return resolve(data)
                    })
                  }, 100)
                })
                if (contact) {
                    contact.then(value => {
                        completeCompanyContacts = companyContacts = value
                    })
                    return contact
                }
                data && (completeCompanyContacts = companyContacts = JSON.parse(LZString.decompressFromUTF16(data)))
                contact = data? Promise.resolve(JSON.parse(LZString.decompressFromUTF16(data))): fetch
                return contact
            }
        }())
    }
}()

export default rcContactService
