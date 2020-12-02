const pluralize = require("pluralize");

function generateManyToOneRelationFieldForModel(model) {
  var result = "";
  var pluralizeModel = pluralize(model).toLowerCase();
  result +=
    pluralizeModel +
    `: [
      {
          type: mongoose.Schema.Types.ObjectId,
              ref: '` +
    model +
    `'
      }
  ],`;
  return result;
}

module.exports = {
  generateManyToOneRelationFieldForModel,
};
