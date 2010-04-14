var nodeable = exports

/* define shorter helper methods */
nodeable.H = function(obj) {
  return new nodeable.Hash(obj)
}
/* end of shorter helper methods definition*/


nodeable.Hash = function(obj) {
  this.obj = obj
}

nodeable.Hash.prototype.getObject = function() {
  return this.obj
}

nodeable.Hash.prototype.each = function(callback) {
  var index = 0
  for (var key in this.obj) {
    callback(key, this.obj[key], index)
    index++
  }
}

nodeable.Hash.prototype.map = function(callback) {
  var result = []
  this.each(function(key, value, index) {
    result.push(callback(key, value, index))
  })
  return result
}

nodeable.Hash.prototype.select = function(filter) {
  var result = {}
  this.each(function(key,value, index) {
    if(filter(key, value, index))
      result[key] = value
  })
  return result
}

nodeable.Hash.prototype.reject = function(filter) {
  var result = {}
  this.each(function(key,value, index) {
    if(!filter(key, value, index))
      result[key] = value
  })
  return result
}