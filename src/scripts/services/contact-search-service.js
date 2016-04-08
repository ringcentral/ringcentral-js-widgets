import { register } from '../service'
var contactSearchService = (function() {
    var searchProviders = []
    var queryCompletedHandlers = []

    function createResult(item) {
        return {
            name: item.name,
            value: item.value,
            type: item.type,
        }
    }
    return {
        query: function(searchFunctions, filter) {
            return Promise.all(searchFunctions).then(results => {
                var searchResultsKeys = {}
                var searchResults = []
                results.forEach(result => {
                    result.forEach(item => {
                        if (filter) {
                            if (filter(item)) {
                                var key = item.name + item.value
                                if (!searchResultsKeys[key]) {
                                    var toAddItem = createResult(item)
                                    searchResultsKeys[key] = toAddItem
                                    searchResults.push(toAddItem)
                                }
                            }
                        } else {
                            var key = item.name + item.value
                            if (!searchResultsKeys[key]) {
                                var toAddItem = createResult(item)
                                searchResultsKeys[key] = toAddItem
                                searchResults.push(toAddItem)
                            }
                        }
                    })
                })
                return searchResults
            })
        },
    }
})()
register('contactSearchService', contactSearchService)
export default contactSearchService
