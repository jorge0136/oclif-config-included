import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('BaseCommand', () => {

  // proxyquire conf
  
  // construct instance of the class.

  //  init_default_config()
  //  get _config
  //  set _config
  test
    .stdout()
    .do(() => cmd.run(['--name', 'jeff']))
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
