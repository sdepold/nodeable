var nodeable  = exports,
    sys       = require("sys")

nodeable.Array = function(obj) {
  this.obj = nodeable.isArray(obj) ? obj : [obj]
}

nodeable.isArray = function(obj) {
  if(obj.toString().indexOf("nodeable.Array") > -1) return true
    
  return Object.prototype.toString.call(obj) == "[object Array]"
}

nodeable.Array.prototype.clear = function() {
  this.obj = []
  return this
}

nodeable.Array.prototype.clone = function() {
  var result = []
  this.each(function(value) {
    result.push(value)
  })
  return new nodeable.Array(result)
}

nodeable.Array.prototype.compact = function() {
  var result = []
  this.each(function(value) {
    if((value != null) && (value != undefined))
      result.push(value)
  })
  return new nodeable.Array(result)
}

nodeable.Array.prototype.each = function(iterator) {
  for(var i = 0, len = this.obj.length; i < len; i++)
    iterator(this.obj[i], i)
    
  return this
}

nodeable.Array.prototype.first = function(offset) {
  offset = (offset % this.size()) || 0
  return this.obj[offset]
}

nodeable.Array.prototype.flatten = function() {
  var result = []
  this.each(function(value) {
    if(nodeable.isArray(value)) {
      new nodeable.Array(value).flatten().each(function(v) {
        result.push(v)
      })
    } else {
      result.push(value)
    }
  })
  return new nodeable.Array(result)
}

nodeable.Array.prototype.includes = nodeable.Array.prototype.contains = function(element) {
  return (this.indexOf(element) > -1)
}

nodeable.Array.prototype.indexOf = nodeable.Array.prototype.index =  nodeable.Array.prototype.find = function(element) {
  for(var i = 0, len = this.obj.length; i < len; i++)
    if(this.obj[i] === element) return i
    
  return -1
}

nodeable.Array.prototype.inspect = function() {
  return sys.inspect(this.obj)
}

nodeable.Array.prototype.last = function(offset) {
  offset = (offset % this.size()) || 0
  return this.obj[this.size() - offset - 1]
}

nodeable.Array.prototype.pass = function() {
  var result = new nodeable.Array([])
  var passArray = []
  for(var key in arguments) passArray.push(arguments[key])
  var passArray = new nodeable.Array(passArray)
  this.each(function(value) {
    if(passArray.includes(value)) result.push(value)
  })
  return result
}

nodeable.Array.prototype.push = function(_obj) {
  this.obj.push(_obj)
}

nodeable.Array.prototype.reduce = function() {
  return (this.size() == 1) ? this.first() : this.to_a()
}

nodeable.Array.prototype.reverse = function() {
  var result = new nodeable.Array([])
  for(var i = this.size() - 1; i >= 0; i--)
    result.push(this.obj[i])
  return result
}

nodeable.Array.prototype.size = function() {
  return this.obj.length
}

nodeable.Array.prototype.uniq = function() {
  var result = new nodeable.Array([])
  this.each(function(value) {
    if(!result.includes(value)) result.push(value)
  })
  return result
}

nodeable.Array.prototype.toArray = nodeable.Array.prototype.toA = nodeable.Array.prototype.to_a = function() {
  return this.obj
}

nodeable.Array.prototype.toString = function() {
  return "<nodeable.Array>: " + this.inspect()
}

nodeable.Array.prototype.without = nodeable.Array.prototype.block = function(args) {
  var result = new nodeable.Array([])
  var blockArray = []
  for(var key in arguments) blockArray.push(arguments[key])
  var blockArray = new nodeable.Array(blockArray)
  this.each(function(value) {
    if(!blockArray.includes(value)) result.push(value)
  })
  return result
}