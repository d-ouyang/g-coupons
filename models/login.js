import {HTTP} from '../utils/http.js'

class LoginModel extends HTTP {
    login (params) {
      this.request(params)
    }
}

export { LoginModel}