import BaseCommand from './base-command'
import {flags} from '@oclif/command' 

class OclifConfigIncluded extends BaseCommand {
  static description = 'describe the command here'

  static flags = {
    // Boilerplate to used extended command
    ...BaseCommand.flags,
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    const {args, flags} = this.parse(OclifConfigIncluded);
    this.log(this._config);
    this._config = 1;
  }
}

export = OclifConfigIncluded
