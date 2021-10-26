import { graphiqlExpress } from 'graphql-server-express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import requestIp from 'request-ip';
import customResponses from './middlewares/responses';
import graphql from './middlewares/graphql';
// import { initMessaging } from './messaging/fcm';
import { propagateHeaders, tokenShouldBeValid } from './middlewares/auth';

dotenv.load();
const app = express();
app.enable('trust proxy');

app.use(cors({
  methods        : ['GET', 'POST'],
  allowedHeaders : ['Content-Type', 'Authorization', 'uuid'],
}));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(requestIp.mw());

app.use(customResponses);

// app.use('/vtt/:uuid/:language', vtt);

app.use(propagateHeaders);
app.use(tokenShouldBeValid);

app.use('/', graphql);

app.use(compression());

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL : '/graphql',
  })
);

export default app;
