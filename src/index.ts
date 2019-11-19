import Command from './base-command'
import {flags} from '@oclif/command'
import cli from 'cli-ux';
import * as _ from 'lodash'

class OclifConfigIncluded extends Command {
  static description = 'describe the command here'

  static flags = {
    // Boilerplate to used extended command
    ...Command.flags,
    help: flags.help({char: 'h'}),
    context: flags.string({
      char: 'c',
      description: 'Current config to use'
    })
  }

  async run() {
    const { flags } = this.parse(OclifConfigIncluded);
    
    let userSelectedContext: string
    
    if (!flags.context)  {
      this.log('Your current contexts are:\n')
      _.forEach(this.allConfig.contexts, (config) => { console.log(config.name) });
      userSelectedContext = await cli.prompt('Which context do you wish to use?')
    }

    else userSelectedContext = flags.context;

    console.log(userSelectedContext);

    // Unfortunate need to merge the top level config and the current selection
    // as we can't just update one property of the config as it's currently designed. 
    // I think this is a consequence of using the `set`ter. 
    this.allConfig = {...this.allConfig, ...{currentContext: userSelectedContext}};
    this.log(JSON.stringify(this.allConfig))
    this.log(JSON.stringify(this.activeConfig));
  }
}

export = OclifConfigIncluded


