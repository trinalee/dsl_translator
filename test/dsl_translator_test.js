'use strict'

const expect = require('chai').expect
const FileParser = require('../fileparser')
const DslTranslator = require('../dsltranslator')
const sinon = require('sinon')

describe('Given a log file', ()=> {
  describe('When the file is parsed', ()=> {
    it('Then return a string of the file contents', (done)=> {
      const fileParser = new FileParser()
      fileParser.readLogFile('test-log.log', () => {
        expect(fileParser.fileData).to.equal('D, [2014-05-10T14:48:19.093626 #85971] DEBUG -- : maximize proactive e-business\nD, [2014-05-10T14:48:19.093626 #85971] DEBUG -- : maximize proactive e-business')
        done()
      })
    })
    it('formats the contents of the file into objects', (done) => {
      const fileParser = new FileParser()
      fileParser.readLogFile('test-log.log', () => {
        console.log('***', fileParser.fileData)
          let formattedData = fileParser.formatLogData(fileParser.fileData)
          console.log('###', formattedData)
          expect(formattedData).to.eql([
            { errorType: 'D',
            dateTime: '2014-05-10T14:48:19.093626',
            errorMessage: 'maximize proactive e-business' }, { errorType: 'D',
            dateTime: '2014-05-10T14:48:19.093626',
            errorMessage: 'maximize proactive e-business' }])
          done()
      })
    })
  })

  describe('When the getFormattedData method is called ', ()=> {
    it('Then it returns an array of objects with line information', (done)=> {
      const fileParser = new FileParser()
      const dslTranslator = new DslTranslator(fileParser)
      const inputFile = 'test-log.log'

      dslTranslator.getFormattedData(inputFile, () => {
        expect(dslTranslator.formattedData).to.eql([
          { errorType: 'D',
          dateTime: '2014-05-10T14:48:19.093626',
          errorMessage: 'maximize proactive e-business' }, { errorType: 'D',
          dateTime: '2014-05-10T14:48:19.093626',
          errorMessage: 'maximize proactive e-business' }])
        done()
      })
    })
  })

  describe('When the getFormattedData method is called with fileParser stubbed ', ()=> {
    it('Then it returns an array of objects with line information', (done)=> {
      const fileParser = new FileParser()
      const methodName1 = 'readLogFile'
      const methodName2 = 'formatLogData'
      // const readLogFileStubConfig = sinon.stub(fileParser, methodName1)
      const formatLogDataStubConfig = sinon.stub(fileParser, methodName2)

      // readLogFileStubConfig.onCall().returns(['W, [2014-05-10T14:48:19.093626 #85971]  WARN -- : maximize proactive e-business'])
      formatLogDataStubConfig.onCall(0).returns([{errorType: 'D',
      dateTime: '2014-05-10T14:48:19.093626',
      errorMessage: 'maximize proactive e-business' }])

      const dslTranslator = new DslTranslator(fileParser)
      const inputFile = 'test-log.log'

      dslTranslator.getFormattedData(inputFile, () => {
        expect(dslTranslator.formattedData).to.eql([
          { errorType: 'D',
          dateTime: '2014-05-10T14:48:19.093626',
          errorMessage: 'maximize proactive e-business' }])
        done()
      })

    })
  })

  describe('When the sumOfErrors method is called without a range', ()=> {
    it('Then it returns the sum of all errors', (done)=> {
      const fileParser = new FileParser()
      const inputFile = 'test-log.log'

      const methodName = 'formatLogData'
      const formatLogDataStubConfig = sinon.stub(fileParser, methodName)

      formatLogDataStubConfig.onCall(0).returns([{errorType: 'D',
      dateTime: '2014-05-10T14:48:19.093626',
      errorMessage: 'maximize proactive e-business' }])

      const dslTranslator = new DslTranslator(fileParser)

      dslTranslator.getFormattedData(inputFile, () => {
        expect(dslTranslator.getSumOfErrorsWithinRange()).to.equal(1)
        done()
      })
    })
  })

  describe('When the sumOfErrors method is called with a range', ()=> {
    it('Then it returns the sum of all errors within the range', (done)=> {
      const fileParser = new FileParser()
      const inputFile = 'test-log.log'

      const methodName = 'formatLogData'
      const formatLogDataStubConfig = sinon.stub(fileParser, methodName)

      formatLogDataStubConfig.onCall(0).returns([{errorType: 'D',
      dateTime: '2014-05-10T14:48:19.093626',
      errorMessage: 'maximize proactive e-business' }])

      const dslTranslator = new DslTranslator(fileParser)

      dslTranslator.getFormattedData(inputFile, () => {
        expect(dslTranslator.getSumOfErrorsWithinRange('2014-05-10T14:48:19', '2014-05-10T15:48:19')).to.equal(1)
        done()
      })
    })
  })

})
