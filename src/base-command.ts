import Command, {flags} from '@oclif/command';
import * as Conf from 'conf';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

import * as defaultConfig from './default-config-schema';

export default abstract class extends Command {

  private conf = new Conf({
    fileExtension: 'yaml',
    serialize: yaml.safeDump,
    deserialize: yaml.safeLoad
  })
  
  get _config() { return this.conf.get('application-config'); };
  
  set _config(configToSet: any){ this.conf.set('application-config', configToSet); };

  init_default_config() {
    this.conf.set('application-config', defaultConfig);
  }

  destroy_config() {
    this.conf.delete('application-config');
  }

  async init() {
    if (!this._config) {
      this.init_default_config();
    }
  }
}
