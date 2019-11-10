import CommonBackend from './common-backend';
import BackendTypes from './backend-types';

class LocalBackend extends CommonBackend {
  constructor() {
    super(BackendTypes.LOCAL);
  }
}
