"use strict";

var Row = function Row(_ref) {
  var object = _ref.object;
  return React.createElement(
    "div",
    { id: "table-data" },
    Object.keys(object).map(function (key) {
      return React.createElement(
        "div",
        null,
        object[key]
      );
    })
  );
};