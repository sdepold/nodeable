var nodeable = exports

/* define shorter helper methods */
nodeable.H = function(obj) {
  return new nodeable.Hash(obj)
}
/* end of shorter helper methods definition*/


nodeable.Hash = require("./nodeable/hash").Hash