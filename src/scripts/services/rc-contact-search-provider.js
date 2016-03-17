import rcContactService from './rc-contact-service'
import { register } from '../service'
var rcContactSearchProvider = function(){
    return {
        search:function(text){
            var results = [];
            if(text){
                text = text.toLowerCase();
                rcContactService.companyContacts.map(contact => {
                    if((contact.lastName && contact.lastName.toLowerCase().indexOf(text) >= 0) || 
                        (contact.firstName && contact.firstName.toLowerCase().indexOf(text) >= 0)){
                        results.push({
                            name:contact.firstName + ' ' +  contact.lastName,
                            value:contact.extension,
                            type:'rc',
                            id:contact.id
                        });
                        contact.phoneNumber.forEach(phone => {
                            results.push({
                                name:contact.firstName + ' ' +  contact.lastName,
                                value:phone,
                                type:'rc',
                                id:contact.id
                            });    
                        });
                    }
                    else{
                        if(contact.extension && contact.extension.indexOf(text) >= 0){
                            results.push({
                                name:contact.firstName + ' ' +  contact.lastName,
                                value:contact.extension,
                                type:'rc',
                                id:contact.id
                            });  
                        }
                        contact.phoneNumber.forEach(phone => {
                            if(phone.indexOf(text) >= 0){
                                results.push({
                                    name:contact.firstName + ' ' +  contact.lastName,
                                    value:phone,
                                    type:'rc',
                                    id:contact.id
                                }); 
                            }
                        });
                    }
                }); 
            }
            return results; 
        }
    };
}();
register('rcContactSearchProvider', rcContactSearchProvider);
export default rcContactSearchProvider;
