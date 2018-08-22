import request from "request";

class accountHelper{

  baseReq(method, path, param){
    const BASE_URL = "http://10.32.36.75:7789/env/xmnup/account/";
    let options = {
      headers: {
        charset: 'UTF-8'
      },
      url: BASE_URL + path + "/" + param,
      method: method,
      json: true
    };

    return new Promise(function(resolve, reject) {
      return request(options, function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  }

  async getAccount(scenarioTag) {
    return await this.baseReq('GET', "tag", scenarioTag);
  }

  async getAccountByUUid(uuid) {
    return await this.baseReq('GET',"id", uuid);
  }

  async lockAccount(uuid) {
    return await this.baseReq('PUT',"occupy", uuid);
  }

  async recycleAccount(uuid) {
    return await this.baseReq('PUT',"recycle", uuid)
  }
}

module.exports = new accountHelper()
