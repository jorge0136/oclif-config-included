import Command from './base-command'
import {flags} from '@oclif/command'
import * as _ from 'lodash'
import * as inquirer from 'inquirer';

class OclifConfigIncluded extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    context: flags.string({
      char: 'c',
      description: 'Current config to use. Example: local'
    })
  }

  async run() {
    const { flags } = this.parse(OclifConfigIncluded);
    
    let userSelectedContext: string
    
    // TODO: What about no config being set at all? 
    // TODO: Add a test for that. 
    if (!flags.context)  {
      const userSelection = await inquirer.prompt([{ 
        name: 'context',
        type: 'list',
        message: 'Select a context:',
        choices: _.map(this.allConfig.contexts, 'name')
      }]);
      userSelectedContext = userSelection.context;
    }
    else {
      userSelectedContext = flags.context;

      // did the user pass an invalid value by flag? 
      if(!_.includes(_.map(this.allConfig.contexts, 'name'), userSelectedContext)){
        
        this.error(
          `No current context set for '${userSelectedContext}'. ` + 
          `Perhaps you want to create a new one with 'config:set'?`,
          { exit: 1 }
        );
      }
    }

    // Unfortunately there is a need to merge the top level config and the current selection
    // as we can't just update one property of the config as it's currently designed. 
    // I think this is a consequence of using the `set`ter. 
    this.allConfig = {...this.allConfig, ...{currentContext: userSelectedContext}};
    this.log(JSON.stringify(this.activeConfig));
  }
}

export = OclifConfigIncluded
