import Command, {flags} from '@oclif/command';
import * as Conf from 'conf';
import * as _ from 'lodash';

import * as defaultConfig from './default-config-schema';

export default abstract class BaseCommand extends Command {

  private conf = new Conf()
  get _config() { return this.conf.get('application-config'); };
  
  set _config(configToSet: any){ this.conf.set('application-config', configToSet); };

  init_config() {
    this.conf.set('application-config', defaultConfig);
  }

  destroy_config() {
    this.conf.delete('application-config');
  }

  async init() {
    if (!this._config) {
      this.init_config();
    }
  }
}
