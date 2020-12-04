var {
  convertCsvToJson,
  parseClassesAndRelationsFromCsvFileData,
} = require('./DataExtractorFromCsv');
var {
  formatFields,
  generateMongooseSchema,
} = require('./MongooseSchemaGenerator');
var { generateModel } = require('./MongooseModelGenerator');
var {
  makeModelsDirectory,
  generateModelFile,
} = require('./ModelFileGenerator');
var { handleOneToManyRelation } = require('./RelationsHandler');

async function UMLClassDiagramToMongooseModels(csvFilePath) {
  return new Promise(async (resolve, reject) => {
    var csvData = '';
    try {
      csvData = await convertCsvToJson(csvFilePath);
    } catch (error) {
      reject(error);
    }

    var { classesMap, relations } = parseClassesAndRelationsFromCsvFileData(
      csvData
    );

    for (let relation of relations) {
      handleOneToManyRelation(relation, classesMap);
    }

    for (let [key, value] of classesMap) {
      var fieldsData = formatFields(value['Text Area 2']);
      var schema = generateMongooseSchema(
        fieldsData,
        value['relations'].join('')
      );
      var dirName = 'models';
      try {
        makeModelsDirectory(dirName);
      } catch (error) {
        reject(error);
      }
      var data = generateModel(value['Text Area 1'], schema);
      await generateModelFile(data, value['Text Area 1'], dirName);
    }
    resolve(1);
  });
}

module.exports = {
  UMLClassDiagramToMongooseModels,
};
