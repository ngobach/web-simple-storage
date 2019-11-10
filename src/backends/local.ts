import BackendTypes from './backend-types';
import CommonBackend from './common-backend';

class LocalBackend extends CommonBackend {
  constructor() {
    super(BackendTypes.LOCAL);
  }
}
