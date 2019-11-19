import Command from './base-command'
import {flags} from '@oclif/command'
import * as _ from 'lodash'
import * as inquirer from 'inquirer';

class OclifConfigIncluded extends Command {
  static description = 'describe the command here'

  static flags = {
    // Boilerplate to use extended command
    ...Command.flags,
    help: flags.help({char: 'h'}),
    context: flags.string({
      char: 'c',
      description: 'Current config to use. Example: local'
    })
  }

  async run() {
    const { flags } = this.parse(OclifConfigIncluded);
    
    let userSelectedContext: string
    
    if (!flags.context)  {
      const userSelection = await inquirer.prompt([{ 
        name: 'currentContext',
        type: 'list',
        message: 'Select a context:',
        choices: _.map(this.allConfig.contexts, 'name')
      }]);
      userSelectedContext = userSelection.currentContext;
    }
    
    else userSelectedContext = flags.context;

    // Unfortunate need to merge the top level config and the current selection
    // as we can't just update one property of the config as it's currently designed. 
    // I think this is a consequence of using the `set`ter. 
    this.allConfig = {...this.allConfig, ...{currentContext: userSelectedContext}};
    this.log(JSON.stringify(this.activeConfig));
  }
}

export = OclifConfigIncluded
