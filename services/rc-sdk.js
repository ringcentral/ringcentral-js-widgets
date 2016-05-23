import RingCentral from 'ringcentral/build/ringcentral-bundle.js'
import config from './rc-config'
var sdk = new RingCentral({
    appKey: config.key,
    appSecret: config.secret,
    server: 'https://platform.devtest.ringcentral.com'
})
export default sdk
