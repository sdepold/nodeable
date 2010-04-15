var nodeable = exports

/* define shorter helper methods */
nodeable.H = function(obj) {
  return new nodeable.Hash(obj)
}

nodeable.A = function(obj) {
  return new nodeable.Array(obj)
}

/* end of shorter helper methods definition*/

nodeable.isHash = function(obj) {
  return Object.prototype.toString.call(obj) == "[object Object]"
}




nodeable.Hash = require("./nodeable/hash").Hash

arr = require("./nodeable/array")
nodeable.Array = arr.Array
nodeable.isArray = arr.isArray