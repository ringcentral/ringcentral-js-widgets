import { getURLParameter } from './utils'
const firstLevel = getURLParameter('first-level')
const width = getURLParameter('width')
const height = getURLParameter('height')
const key = getURLParameter('key')
const secret = getURLParameter('secret')
const sandbox = getURLParameter('sandbox')
var phone = w('rc-phone', {
    data: {
        firstLevel,
        width,
        originalHeight: height,
        key,
        secret,
        sandbox
    }
})

export default phone
