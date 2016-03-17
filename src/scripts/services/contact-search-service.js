import { register } from '../service'
var contactSearchService = (function(){
    var searchProviders = [];
    var queryCompletedHandlers = [];
    return {
        addSearchProvider:function(searchProvider){
            if(typeof searchProvider.search  !== 'function'){
                console.error('SearchProvider is invalid!');
            }else{
                searchProviders.push(searchProvider);
            }
        },
        onQueryCompleted:function(handler){
            queryCompletedHandlers.push(handler);
        },
        query:function(text){
            var searchFunctions = searchProviders.map(provider => {
                return provider.search(text);
            });
            Promise.all(searchFunctions).then(results => {
                var searchResults = {};
                results.forEach(result => {
                    result.forEach(item => {
                        var key = item.name + item.value;
                        if(!searchResults[key]){
                            var toAddItem = {
                                name : item.name,
                                value : item.value,
                                type : item.type
                            };
                            searchResults[key] = toAddItem;
                        }
                    });
                });
                queryCompletedHandlers.forEach(h => h(searchResults)); 
            });
        }
    };
})();
register('contactSearchService', contactSearchService);
export default contactSearchService;
