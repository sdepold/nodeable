describe 'nodeable'
  describe 'isArray'
    it 'should return true if passed obj is an array'
      $.isArray([]).should.be_true()
      $.isArray([1]).should.be_true()
    end
    
    it 'should return false if passed obj is not an array'
      $.isArray({}).should.be_false()
      $.isArray("a").should.be_false()
      $.isArray(1).should.be_false()
    end
    
    it 'should return true if passed obj is an Array obj'
      $.isArray($.A("a")).should.be_true()
    end
  end
  
  describe 'isHash'
    
  end
end

describe 'nodeable.Array'
  before_each
    obj = [1, 2, 3, 4]
    arr = $.A(obj)
  end
  
  describe 'constructor'
    it 'should use the passed array'
      $.A(["foo", "bar"]).to_a().should.eql(["foo", "bar"])
      $.A([]).to_a().should.eql([])
    end
    
    it "should create an array if passed value isn't one"
      $.A("a").to_a().should.eql(["a"])
    end
  end
  
  describe 'clear'
    it 'should clear the array'
      arr.clear().to_a().should.eql([])
    end
  end
  
  describe 'clone'
    it 'should not modify the original'
      var copy = arr.clone()
      copy.clear()
      copy.size().should.be(0)
      arr.size().should.be(4)
    end
  end
  
  describe 'compact'
    it 'should remove undefined and null'
      $.A([1,2,null,3,undefined,4]).compact().to_a().should.eql([1,2,3,4])
    end
  end
  
  describe 'each'
    it 'should iterate 4 times'
      var iterationCount = 0
      arr.each(function(){ iterationCount++ })
      iterationCount.should.be(4)
    end
    
    it 'should pass the value to the iterator function'
      var values = []
      arr.each(function(v){values.push(v)})
      values.should.eql([1,2,3,4])
    end
    
    it 'should pass the index of the current iteration'
      var indexes = []
      arr.each(function(v,i){indexes.push(i)})
      indexes.should.eql([0,1,2,3])
    end
  end
  
  describe 'first'
    it 'should return the first element of the array'
      arr.first().should.eql(1)
    end
    
    it 'should return the _offset_ element if passed'
      arr.first(2).should.eql(3)
    end
    
    it 'should not run out of the index'
      arr.first(4).should.eql(1)
    end
    
    it 'should return undefined if array is empty'
      $.A([]).first(2).should.be_undefined
    end
  end
  
  describe 'flatten'
    it 'should flat correctly'
      obj = [1, [2, 3], 4, [5, [6, 7]]]
      $.A(obj).flatten().toArray().should.eql([1, 2, 3, 4, 5, 6, 7])      
    end
  end
  
  describe 'includes'
    it 'should return true if passed value is in array'
      arr.includes(1).should.be_true()
    end
    
    it 'should return false if not'
      arr.includes(10).should.be_false()
    end
  end
  
  describe 'indexOf/index/find'
    it 'should return the correct index'
      arr.find(2).should.be(1)
    end
    
    it 'should return -1 if not found'
      arr.find(11).should.be(-1)
    end
  end
  
  describe 'last'
    it 'should return the last element'
      arr.last().should.be(4)
    end
    
    it 'should return the _offset_ element'
      arr.last(1).should.be(3)
    end
    
    it 'should not run out if index'
      arr.last(10).should.be(2)
    end
  end
  
  describe 'pass'
    it 'should only return the passed elements'
      arr.pass(1, 3).to_a().should.eql([1,3])
    end
    
    it 'should ignore elements which are not in the array'
      arr.pass(1, 3, 42).to_a().should.eql([1, 3])
    end
  end
  
  describe 'reduce'
    it 'should return an element if array has only one element'
      arr.pass(1).reduce().should.eql(1)
    end
    
    it 'should return an array if array has more elements'
      arr.reduce().should.eql([1,2,3,4])
    end
  end
  
  describe 'reverse'
    it 'should reverse the array'
      arr.reverse().to_a().should.eql([4,3,2,1])
    end
  end
  
  describe 'size'
    it 'should return the correct size'
      arr.size().should.be(4)
    end
  end
  
  describe 'toArray'
    it 'should return the original object'
      arr.toArray().should.be(obj)
    end
  end
  
  describe 'uniq'
    it 'should remove doubled elements'
      $.A([1,1,1,2]).uniq().to_a().should.eql([1,2])
    end
  end
  
  describe 'without'
    it 'should return the array without passed arguments'
      arr.without(3).to_a().should.eql([1,2,4])
      arr.without(2, 3).to_a().should.eql([1,4])
    end
  end
end

describe 'nodeable.Hash'
  before_each
    obj = {a:1, b:2, c:3, d:4}
    hash = $.H(obj)
  end

  describe 'toObject'
    it 'should return the original object'
      hash.toObject().should.be(obj)
    end
  end
  
  describe 'get'
    it 'should return the correct key'
      hash.get("a").should.be(1)
    end
  end
  
  describe 'set'
    it 'should correctly set the value'
      hash.set("a", "foo").get("a").should.be("foo")
    end
    
    it 'should modify the original object'
      var modifiedObj = hash.set("a", "foo").toObject()
      modifiedObj.a.should.be("foo")
    end
  end
  
  describe 'unset'
    it 'should decrease key count by 1'
      hash.unset("a").keys().should.have_length(3)
    end
    
    it 'should delete the passed key'
      hash.unset("a").toObject().a.should.be_undefined
    end
  end
  
  describe 'each'
    it 'should run for each element'
      var keys = []
      var values = []
      var indexes = []
      
      hash.each(function(key, value, index) {
        keys.push(key)
        values.push(value)
        indexes.push(index)
      })
      
      keys.should.eql(["a", "b", "c", "d"])
      values.should.eql([1,2,3,4])
      indexes.should.eql([0,1,2,3])
    end
    
    it 'should work with a specified index'
      var result = null
      hash.each(function(k, v, i) {
        if(i == 0) result = v
      })
      
      result.should.be(1)
    end
  end

  describe 'map'
    before_each
      obj = {"anna": 1, "boris": 2, "carmen": 3, "doris": 4}
      hash = $.H(obj)
    end
  
    it 'should collect first char of the keys'
      var filter = function(name) { return name[0] }
      hash.map(filter).should.eql(["a", "b", "c", "d"])
    end
  end
  
  describe 'select'
    before_each
      obj = {"anna": 1, "boris": 2, "carmen": 3, "doris": 4}
      hash = $.H(obj)
    end
  
    it 'should collect all keys including a'
      var filter = function(name) { return (name.indexOf("a") > -1) }
      hash.select(filter).should.eql({"anna": 1, "carmen" : 3})
    end
    
    it 'should return an empty hash if no matches were found'
      hash.select(function(){return false}).should.eql({})
    end
  end
  
  describe 'reject'
    it 'should reject entry with key a'
      hash.reject(function(key){ return key == "a"}).should.eql({b:2, c:3, d:4})
    end
  end
  
  describe 'keys'
    it 'should return the keys of the hash'
      hash.keys().should.eql(["a", "b", "c", "d"])
    end
    
    it 'should return an empty array if original hash is empty'
      $.H({}).keys().should.eql([])
    end
  end
  
  describe 'values'
    it 'should return the keys of the hash'
      hash.values().should.eql([1,2,3,4])
    end
    
    it 'should return an empty array if original hash is empty'
      $.H({}).values().should.eql([])
    end
  end
  
  describe 'clone'
    it 'should return a copy'
      var copy = hash.clone()
      copy.unset("a").toObject().should.eql({b:2, c:3, d:4})
    end
  end
  
  describe 'merge'
    it 'should merge hashes'
      var hashToMerge = {e:5, f:6}
      hash.merge(hashToMerge).toObject().should.eql({a:1, b:2, c:3, d:4, e:5, f:6})
    end

    it 'should not overwrite existing elements'
      var hashToMerge = {a:42, e:5}
      hash.merge(hashToMerge).toObject().should.eql({a:1, b:2, c:3, d:4, e:5})
    end
    
    it 'should overwrite existing elements when forced'
      var hashToMerge = {a:42, e:5}
      hash.merge(hashToMerge, true).toObject().should.eql({a:42, b:2, c:3, d:4, e:5})
    end
  end
  
  describe 'update'
    it 'should overwrite existing items'
      hash.update({a:22, b:33}).toObject().should.eql({a:22, b:33, c:3, d:4})
    end
    
    it 'should not add new items to the hash'
      hash.update({a:22, b:33, foo: 1}).toObject().should.eql({a:22, b:33, c:3, d:4})
    end
  end
  
  describe 'toQueryString'
    it 'should generate a correct query string'
      hash.toQueryString().should.be("a=1&b=2&c=3&d=4")
    end
  end
end