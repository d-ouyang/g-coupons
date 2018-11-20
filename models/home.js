import {HTTP} from '../utils/http.js'

class HomeModel extends HTTP {
  getUserInfo(params) {
    params.token = this.getToken()
    console.log(params.token)
    return this.request(params)
  }
}

export { HomeModel}