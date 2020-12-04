const fs = require('fs');
const csv = require('csv-parser');

async function convertCsvToJson(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    if (!fs.existsSync(filePath)) {
      reject('File does not exist!');
    }
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function parseClassesAndRelationsFromCsvFileData(csvData) {
  var result = {
    classesMap: new Map(),
    relations: [],
  };
  result.classesMap = parseClassesFromCsvFileData(csvData);
  result.relations = parseRelationsFromCsvFileData(csvData);
  return result;
}

function parseClassesFromCsvFileData(csvData) {
  var result = new Map();
  for (let elem of csvData) {
    if (elem['Name'] == 'Class') {
      var tmp = {
        Id: elem['Id'],
        'Text Area 1': elem['Text Area 1'],
        'Text Area 2': extractFields(elem['Text Area 2']),
      };
      result.set(tmp['Id'], { ...tmp, relations: [] });
    }
  }
  return result;
}

function parseRelationsFromCsvFileData(csvData) {
  var result = [];
  for (let elem of csvData) {
    if (elem['Name'] == 'Line') {
      var tmp = {
        Id: elem['Id'],
        'Line Source': elem['Line Source'],
        'Line Destination': elem['Line Destination'],
        'Text Area 1': elem['Text Area 1'],
        'Text Area 2': elem['Text Area 2'],
      };
      result.push(tmp);
    }
  }
  return result;
}

function extractFields(textArea) {
  var result = '';
  result = textArea
    .replace('- ', ' ')
    .replace('+ ', ' ')
    .replace(/\n/g, ' ')
    .trim()
    .replace(/\+/g, ' ')
    .replace(/\-/g, ' ')
    .replace(/\s/g, ',')
    .split(',')
    .filter(function (elem) {
      return elem != '';
    });
  return result;
}

module.exports = {
  convertCsvToJson,
  parseClassesAndRelationsFromCsvFileData,
};
