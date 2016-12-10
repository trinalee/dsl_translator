'use strict'

const fs = require('fs')

class FileParser {

  readLogFile(inputFile, callback) {
    fs.readFile(inputFile, (err, data) => {
      this.fileData = data.toString().trim()
      if (callback){
        callback()
      }

    })
  }

  formatLogData(fileData) {
    return this.fileData.split('\n').map((line)=> {
      return {errorType: line.substring(0,1), dateTime: line.substring(4,30), errorMessage: line.substring(50)}
    })
  }

}

module.exports = FileParser
