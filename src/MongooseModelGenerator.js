function generateModel(model, schema) {
  var result = "";
  result += `const mongoose = require("mongoose");`;
  result += `const ` + model + `Schema = new mongoose.Schema(` + schema + `);`;
  result +=
    `const ` +
    model +
    ` = mongoose.model("` +
    model +
    `", ` +
    model +
    `Schema);`;
  result += `module.exports = ` + model + `;`;
  return result;
}

module.exports = {
  generateModel,
};
