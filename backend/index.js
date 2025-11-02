require('app-module-path').addPath(__dirname);
const express = require('express');
const Route = require('route');
const cors = require('cors');
const config = require('config-handler');
const bodyParser = require('body-parser');
const ApiError = require('lib/functional/api-error');
const ValidationError = require('lib/validation-error');
// const { logError } = require('lib/functional/logger');
const fs = require('fs');


const app = express();

const options = {
  key: fs.readFileSync('../SSL/Cert.key'),
  cert: fs.readFileSync('../SSL/Cert.crt')
}

const server = require('http').createServer(app);
// const server = require('https').createServer(options,app);


Route.setApp(app);

app.use(cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public')); 
// const logMiddleware = require('./logMiddleware');
// app.use(logMiddleware);
app.get("/", (req, res) => {
  res.send({
    status: true, message: "successfully fetched default link", entity: {
      app: 'Backend Service(P4U)',
      env: [process.env.NODE_ENV || 'dev']
    }
  })
});


require('./api-routes');

app.use((req, res, next) => {
  const err = new ApiError(404, 'Not Found', 'Resource Not Found!');
  next(err);
});

app.use(express.static('public'));

app.use((error, request, response, next) => {
  if (error.constructor === ApiError) {
    // logError('Failed to execute the operation', { error });
    if (error.code) { response.status(error.code); }

    response.send({
      status: false,
      errorType: 'api',
      message: error.errorMessage
    });
  } else if (error.constructor === ValidationError) {
    // logError('Failed to execute the operation', error.errorMessage);
    response.send({
      status: false,
      errorType: 'validation',
      message: error.errorMessage
    });
  } else {
    response.status(501);
    // logError('Failed to execute the operation', { error });
    response.send({
      status: false,
      errorType: error,
      message: 'Something went wrong!'
    });
  }
});

process.on('unhandledRejection', (error) => {
  // logError('unhandledRejection', { error });
});

process.on('uncaughtException', (error) => {
  // logError('uncaughtException', { error });
});

// app.use(logMiddleware)
console.log(config.port);
server.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});
