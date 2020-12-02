function formatFields(attributesArray) {
  var result = [];
  const SCHEMATYPES = {
    STRING: "String",
    NUMBER: "Number",
    INT: "Number",
    INTEGER: "Number",
    DATE: "Date",
    BUFFER: "Buffer",
    BOOLEAN: "Boolean",
    MIXED: "Mixed",
    OBJECTID: "ObjectId",
    ARRAY: "Array",
    FLOAT: "Number",
    DECIMAL128: "Decimal128",
    MAP: "Map",
    SCHEMA: "Schema",
  };
  for (let x of attributesArray) {
    var y = x.split(":");
    var tmp = {
      field: y[0],
      type: SCHEMATYPES[y[1].toUpperCase().trim()],
    };
    result.push(tmp);
  }

  return result;
}

function generateMongooseSchema(fieldsData, relations) {
  var fields = "";
  var result = "";
  for (let elem of fieldsData) {
    fields += elem.field + `: { type: ` + elem.type + `,},`;
  }
  result = `{` + fields + relations + `}`;
  return result;
}

module.exports = {
  formatFields,
  generateMongooseSchema,
};
