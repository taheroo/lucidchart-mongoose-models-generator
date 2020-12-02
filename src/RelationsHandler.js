var {
  generateManyToOneRelationFieldForModel,
} = require("./RelationsFieldsGenerator");

function handleOneToManyRelation(relation, classesMap) {
  if (relation["Text Area 1"] == "0..*" || relation["Text Area 1"] == "1..*") {
    var model = classesMap.get(relation["Line Destination"]);
    var modelSource = classesMap.get(relation["Line Source"]);
    var relationField = generateManyToOneRelationFieldForModel(
      modelSource["Text Area 1"]
    );
    model.relations.push(relationField);
    classesMap.get(relation["Line Destination"], model);
  } else if (
    relation["Text Area 2"] == "0..*" ||
    relation["Text Area 2"] == "1..*"
  ) {
    var model = classesMap.get(relation["Line Source"]);
    var modelDestination = classesMap.get(relation["Line Destination"]);
    var relationField = generateManyToOneRelationFieldForModel(
      modelDestination["Text Area 1"]
    );
    model.relations.push(relationField);
    classesMap.get(relation["Line Source"], model);
  }
}

module.exports = {
  handleOneToManyRelation,
};
