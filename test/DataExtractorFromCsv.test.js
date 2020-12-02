const path = require("path");
const fs = require("fs");
var chai = require("chai");
var expect = chai.expect;

var {
  convertCsvToJson,
  parseClassesFromCsvFileData,
  parseRelationsFromCsvFileData,
} = require("../src/DataExtractorFromCsv");

describe("DataExtractorFromCsv", function () {
  describe("#convertCsvToJson()", function () {
    it("should return an array of JSON Objects", async function () {
      var result = await convertCsvToJson(
        path.join(__dirname, "/", "ClassDiagram.test.csv")
      );
      expect(result).to.be.an("array").that.is.not.empty;
      expect(result[0]).to.be.an("object");
      expect(result[0]).to.have.property("Id");
      expect(result[0]).to.have.property("Name");
      expect(result[0]).to.have.property("Text Area 1");
      expect(result[0]).to.have.property("Text Area 2");
      expect(result[0]).to.have.property("Line Source");
      expect(result[0]).to.have.property("Line Destination");
      // fs.writeFile(
      //   path.join(__dirname, "/", "csvData.test.json"),
      //   JSON.stringify(result),
      //   function (err) {
      //     if (err) return console.log(err);
      //     console.log("completed convertCsvToJson");
      //   }
      // );
    });
  });
});

describe("DataExtractorFromCsv", function () {
  describe("#parseClassesFromCsvFileData()", function () {
    it("should return an array of JSON Objects which Name property equals Class", function () {
      const csvData = require("./csvData.test.json");
      var result = parseClassesFromCsvFileData(csvData);
      expect(result).to.be.a("Map").that.is.not.empty;
    });
  });
});

describe("DataExtractorFromCsv", function () {
  describe("#parseRelationsFromCsvFileData()", function () {
    it("should return an array of JSON Objects which Name property equals Line", function () {
      const csvData = require("./csvData.test.json");
      var result = parseRelationsFromCsvFileData(csvData);
      expect(result).to.be.an("array").that.is.not.empty;
      expect(result[0]).to.be.an("object");
      expect(result[0]).to.have.property("Id");
      expect(result[0]).to.have.property("Text Area 1");
      expect(result[0]).to.have.property("Text Area 2");
      expect(result[0]).to.have.property("Line Source");
      expect(result[0]).to.have.property("Line Destination");
    });
  });
});
