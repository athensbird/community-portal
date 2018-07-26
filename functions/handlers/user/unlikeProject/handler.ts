import { Request, Response } from './../../../config/Types';

import PackageService from './../../../src/services/PackageService';
import Endpoint from './../../../src/Endpoint';
import {
  ProjectController,
  UserController,
  ProjectResource,
  UserResource,
} from './../../../config/Components';

// need to specify data dependencies for the first dataFlow
// in order to retrieve user_id from authorization context
// note that user_id is not sent in request body
const dataflows = [
  {
    controller: UserController,
    method: 'removeUpvotedProject',
    target: UserResource,
    validationMap: { removeUpvotedProject: 'projectIdOnlySchema' },
    authDataDependencies: ['user_id'],
  },
  {
    controller: ProjectController,
    method: 'removeUpvoter',
    target: ProjectResource,
    dataDependencies: ['project_id', 'user_id'],
  },
  {
    controller: ProjectController,
    method: 'downvote',
    target: ProjectResource,
    dataDependencies: ['project_id'],
  },
];

const endpoint = new Endpoint('/user/unlikeProject', 'post');
endpoint.configure((req: Request, res: Response) => {
  new PackageService(dataflows).package(req, res);
});
export const handler = endpoint.execute();
