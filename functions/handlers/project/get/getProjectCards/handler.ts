import PackageService from './../../../../src/services/PackageService';
import Endpoint from './../../../../src/Endpoint';

import { ProjectController, ProjectResource } from './../../../../config/components';

const packageService = new PackageService();
const endpoint = new Endpoint('/projects/', 'get');

const dataFlow = {
  controller: ProjectController,
  method: 'getCards',
  target: ProjectResource,
  validationMap: { getCards: 'nullSchema' },
};

packageService.createEndpoint(endpoint);
packageService.addDataFlow(dataFlow);
const handler = packageService.package();
export { handler };
