import { HomeModel } from './home.js'

class PersonalModel extends HomeModel {
  getTotalCouponCount(params) {
    params.token = this.getToken()
    console.log(params.token)
    return this.request(params)
  }
}

export { PersonalModel }