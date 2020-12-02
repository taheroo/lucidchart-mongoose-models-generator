const fs = require('fs');

function makeModelsDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
}

async function generateModelFile(data, model, dir) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dir + '\\' + model + '.js', data, function (err) {
      if (err) reject(err);
      resolve(console.log('Completed > ', model));
    });
  });
}

module.exports = {
  makeModelsDirectory,
  generateModelFile,
};
