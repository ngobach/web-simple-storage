import BackendTypes from './backend-types';
import CommonBackend from './common-backend';

class SessionBackend extends CommonBackend {
  constructor() {
    super(BackendTypes.LOCAL);
  }
}
