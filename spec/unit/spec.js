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