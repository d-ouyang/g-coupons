import {HTTP} from '../utils/http.js'

class StatisticsModel extends HTTP{
  
  getYear() {
    return new Date().getFullYear()
  }

  getMonth() {
    return new Date().getMonth() + 1
  }

  getDate() {
    return new Date().getDate()
  }

  _returnDate() {
    const date = `${this.getYear()}-${this.getMonth()}-${this.getDate()}`
    return {
      startDate: date,
      endDate: date
    }
  }

  _returnMonth() {
    const date = `${this.getYear()}-${this.getMonth()}-${this.getDate()}`
    return {
      startDate: `${this.getYear()}-${this.getMonth()}-01`,
      endDate: date
    }
  }

  _returnYear() {
    const date = `${this.getYear()}-${this.getMonth()}-${this.getDate()}`
    return {
      startDate: `${this.getYear()}-01-01`,
      endDate: date
    }
  }

  retrunParams(index) {
    switch (index) {
      case 0:
        return this._returnDate()
        break;
      case 1:
        return this._returnMonth()
        break;
      case 2:
        return this._returnYear()
        break;
    }
  }

  getStatisticsDetail(params) {
    params.token = this.getToken()
    return this.request(params)
  }
}

export { StatisticsModel}