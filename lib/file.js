const path = require('path')
const fs = require('fs')

const isDirectory = source => fs.lstatSync(source).isDirectory()

module.exports = {
  getDirectories (source) {
    return fs.readdirSync(source)
      .map(name => path.join(source, name))
      .filter(isDirectory)
  }
}
