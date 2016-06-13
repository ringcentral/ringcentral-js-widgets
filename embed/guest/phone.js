import { getURLParameter } from './utils'
const firstLevel = getURLParameter('first-level')
const width = getURLParameter('width')
const height = getURLParameter('height')
const key = getURLParameter('key')
const secret = getURLParameter('secret')
const sandbox = getURLParameter('sandbox')
const TARGET_TAG = 'rc-phone-incontact'
var phone = w('rc-phone-incontact', {
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
