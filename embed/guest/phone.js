import { getURLParameter } from './utils'
const firstLevel = getURLParameter('first-level')
const width = getURLParameter('width')
const height = getURLParameter('height')

var phone = w('rc-phone', {
    data: {
        firstLevel: firstLevel,
        width: width,
        originalHeight: height
    }
})

export default phone
