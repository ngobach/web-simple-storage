import CommonBackend from './common-backend';
import BackendTypes from './backend-types';

class SessionBackend extends CommonBackend {
  constructor() {
    super(BackendTypes.LOCAL);
  }
}
