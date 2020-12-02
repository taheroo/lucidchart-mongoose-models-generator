#!/usr/bin/env node
const argv = require('yargs').argv;
const { exec } = require('child_process');
var { UMLClassDiagramToMongooseModels } = require('./src/main');

async function main(csvFilePath) {
  return new Promise(async (resolve, reject) => {
    if (csvFilePath === undefined) {
      console.log(
        'Missing Informations! Please read application documentation.'
      );
      //process.exit(1);
    } else {
      try {
        await UMLClassDiagramToMongooseModels(csvFilePath);
      } catch (error) {
        reject(error);
      }

      exec('npx prettier --write ./models', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
    resolve(1);
  });
}

main(argv.csvFilePath).catch((e) => {
  console.log('Error', e);
});
