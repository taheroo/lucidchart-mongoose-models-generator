const path = require('path');
const fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');

chai.use(chaiFiles);

var expect = chai.expect;
var file = chaiFiles.file;
var dir = chaiFiles.dir;

var {
  makeModelsDirectory,
  generateModelFile,
} = require('../src/ModelFileGenerator');

describe('ModelFileGenerator', function () {
  describe('#makeModelsDirectory()', function () {
    it('should create models directory', async function () {
      makeModelsDirectory('models');
      expect(dir('models')).to.exist;
    });
  });
});

describe('ModelFileGenerator', function () {
  describe('#generateModelFile()', function () {
    it('should create a mongoose model file', async function () {
      const data = `const mongoose = require("mongoose");const BankSchema = new mongoose.Schema({name: { type: String,}, location: { type: String,},customers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                    ref: 'Customer'
            }
        ],});const Bank = mongoose.model("Bank", BankSchema);module.exports = Bank;`;

      await generateModelFile(data, 'Bank', 'models');
      expect(dir('models')).to.exist;
      expect(file('models/Bank.js')).to.exist;
      expect(file('models/Bank.js')).to.not.be.empty;
      expect(file('models/Bank.js')).to.equal(
        file(path.join(__dirname, '/', 'Bank.test.text'))
      );
    });
  });
});
