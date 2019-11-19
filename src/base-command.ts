import Command from '@oclif/command';
import * as Conf from 'conf';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

import * as defaultConfig from './base-config';

export default abstract class extends Command {

  private conf = new Conf({
    fileExtension: 'yaml',
    serialize: yaml.safeDump,
    deserialize: yaml.safeLoad
  })

  get allConfig() { return this.conf.get('application-config'); };
  set allConfig(configToSet: any){ this.conf.set('application-config', configToSet); };

  destroyAllConfig() {
    this.conf.delete('application-config');
  }

  initAllConfigDefault() {
    this.conf.set('application-config', defaultConfig.default);
  }

  get activeConfig() { 
    return _.find(this.allConfig.contexts, ['name', this.allConfig.currentContext])
  }

  async init() {
    if (!this.allConfig) {
      this.initAllConfigDefault();
    }
  }
}
