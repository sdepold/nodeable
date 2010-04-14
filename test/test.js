var $       = require("../lib/nodeable"),
    sys     = require("sys")

var a = {affe:1, banane:2, choco:3}

var hash = $.H(a)
sys.puts(sys.inspect(hash))

hash.each(function(key, value, index) {
  sys.puts(key)
  sys.puts(sys.inspect(value))
})


sys.puts(sys.inspect(hash.map(function(key, value) {
  return key[0]
})))

sys.puts(sys.inspect(hash.select(function(key) {
  return key.indexOf("a") > -1
})))

sys.puts(sys.inspect(hash.reject(function(key) {
  return key.indexOf("a") > -1
})))