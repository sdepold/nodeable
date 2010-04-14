require.paths.unshift('spec', 'spec/jspec/lib', 'lib')

require('jspec')
require('unit/spec.helper')
$ = require('nodeable')

JSpec
  .exec('spec/unit/spec.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
  .report()
