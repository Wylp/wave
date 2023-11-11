'use strict';
const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-ui-express');
const express = require('express');
const handlers  = require('./modules');
const port = process.env.PORT;
const { decodeToken } = require('./common/decode-token/decode-token');

const app = express();

const swaggerConfig = {
  appRoot: __dirname,
  swaggerFile: `./src/config/swagger.yml`,
};

const onSwaggerCreated = (error, swaggerExpress) => {
  if (error) throw error;

  const swaggerDocument = swaggerExpress.runner.swagger;
  app.use('/api/v1/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
  app.use((req, res, next) => decodeToken()(req, res, next));
  swaggerExpress.register(app); // register middlewares
  app.listen(port, () => console.info(`Server running on port ${port}`));
};

SwaggerExpress.create(swaggerConfig, onSwaggerCreated);

module.exports = {
  app,
  ...handlers
};

