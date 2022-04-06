import { API } from './types';

let Service: API;
if (process.env.REACT_APP_WHOAMI === 'frontend') {
  Service = require('./api-frontend').default as API;
} else {
  Service = require('./api-fullstack').default as API;
}

export default Service;
