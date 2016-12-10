'use strict'

const FileParser = require('./fileparser')

class DslTranslator {
  constructor(fileParser) {
    this.fileParser = fileParser
    this.formattedData = []
  }

  getFormattedData(inputFile, callback) {
    this.fileParser.readLogFile(inputFile, (data) => {
      this.formattedData = this.fileParser.formatLogData(data)
      if (callback) {
        callback()
      }
    })
  }


  //incomplete
  getSumOfErrorsWithinRange (startTime, endTime) {
    if (!startTime && !endTime) {
      return this.formattedData.length
    }
    let startTime = new Date(startTime)
    let endTime = new Date(endTime)
    this.formattedDate.filter(function(element) {
      let currentElementDate = new Date(element.dateTime)
      return element.dateTime.valueOf() >= startTime
    })

  }
}

module.exports = DslTranslator
