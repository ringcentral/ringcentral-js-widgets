import sdk from './rc-sdk';
import { register } from '../service';

var rcConferenceSerivce = function() {
    var fetchingConferenceInfo = null;
    
    function fetchConferenceInfo() {
        fetchingConferenceInfo = sdk.platform().get('/account/~/extension/~/conferencing')
            .then(responses => {
                var jsonResponse = responses.json();
                var conferenceInfo = {};
                conferenceInfo.hostCode = jsonResponse.hostCode;
                conferenceInfo.phoneNumber = jsonResponse.phoneNumber;
                conferenceInfo.participantCode = jsonResponse.participantCode;
                fetchingConferenceInfo = null;
                return conferenceInfo;
            });
        return fetchingConferenceInfo;
    }
    
    return {
        getConferenceInfo: function() {
            if(fetchingConferenceInfo){
                return fetchingConferenceInfo;
            }else{
                return fetchConferenceInfo();
            }
        }
    };
}();

register('rcConferenceSerivce', rcConferenceSerivce);
export default rcConferenceSerivce;
