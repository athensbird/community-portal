import express = require('express');

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const app = express();
const { dynamodb } = require('./../../../lib/utils');
const { createProjectValidator } = require('./../../../lib/validators');
const PROJECTS_TABLE = process.env.PROJECTS_TABLE;

app.use(bodyParser.json({ strict: false }));

// Create Project endpoint
app.post('/project/create/', (req:express.Request, res:express.Response) => {
  const data = req.body;

  // validate input
  const valid = createProjectValidator.validate('createProjectSchema', data);

  if (!valid) {
    res.status(400).json({ errors: createProjectValidator.errors });
    return;
  }

  // append additional data
  data.status = 'open';
  data.upvotes = 0;

  const params = {
    TableName: PROJECTS_TABLE,
    Item: data,
  };

  const request = dynamodb.put(params).promise();

  request
    .then((response: any) => {
      res.json({ message: 'Project created successfully', project_id: data.project_id });
    })
    .catch((error: Error) => {
      res.status(400).json({ error: 'Could not create projects' });
    });
});

module.exports.handler = serverless(app);

export {}; // for TypeScript to recognize local scoping
