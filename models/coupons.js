import { HTTP } from '../utils/http.js'

class CouponsModel extends HTTP {
  getCoupons(params) {
    params.token = this.getToken()
    console.log(params.token)
    return this.request(params)
  }
}

export { CouponsModel }