var nodeable  = exports,
    sys       = require("sys")

nodeable.Hash = function(obj) {
  this.obj = obj
}

nodeable.Hash.prototype.toObject = function() {
  return this.obj
}

nodeable.Hash.prototype.get = function(key) {
  return this.obj[key]
}

nodeable.Hash.prototype.set = function(key, value) {
  this.obj[key] = value
  return this
}

nodeable.Hash.prototype.unset = function(key) {
  var value = this.obj[key]
  delete this.obj[key]
  return this
}

nodeable.Hash.prototype.each = function(iterator) {
  var index = 0
  for (var key in this.obj) {
    iterator(key, this.obj[key], index)
    index++
  }
  return this
}

nodeable.Hash.prototype.map = function(iterator) {
  var result = []
  this.each(function(key, value, index) {
    result.push(iterator(key, value, index))
  })
  return result
}

nodeable.Hash.prototype.select = function(iterator) {
  var result = {}
  this.each(function(key,value, index) {
    if(iterator(key, value, index))
      result[key] = value
  })
  return result
}

nodeable.Hash.prototype.reject = function(iterator) {
  var result = {}
  this.each(function(key,value, index) {
    if(!iterator(key, value, index))
      result[key] = value
  })
  return result
}

nodeable.Hash.prototype.keys = function() {
  return this.map(function(key){ return key })
}

nodeable.Hash.prototype.values = function() {
  return this.map(function(key, value) { return value })
}

nodeable.Hash.prototype.clone = function() {
  var result =  new nodeable.Hash({})
  this.each(function(k, v) { result.set(k, v) })
  return result
}

nodeable.Hash.prototype.merge = function(obj, force) {
  force = force || false
  var result = this.clone()

  new nodeable.Hash(obj).each(function(k,v) {
    if(!result.get(k) || force) result.set(k, v)
  })
  
  return result
}

nodeable.Hash.prototype.inspect = function() {
  return sys.inspect(this.obj)
}

nodeable.Hash.prototype.update = function(obj) {
  var _this = this
  var updateHash = new nodeable.Hash(obj)
  updateHash = updateHash.select(function(key) { return !!_this.get(key) })
  return this.merge(updateHash, true)
}

nodeable.Hash.prototype.toQueryString = function() {
  return this.map(function(key, value) {
    return key + "=" + value
  }).join("&")
}