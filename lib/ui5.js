const request = require('axios')
const chalk = require('chalk')

module.exports = {
  async versions () {
    const url = 'https://sapui5.hana.ondemand.com/versionoverview.json'
    const response = await request.get(url)
    return response.data.versions
  }
}

