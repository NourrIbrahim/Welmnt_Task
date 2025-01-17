const express = require('express');
const payload = require('payload');
const apiRoutes = require('./src/api');
const path = require('path');

const app = express();
app.use(express.json());
app.use(apiRoutes);
const corsOptions = {
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};
app.use(cors(corsOptions));
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.DATABASE_URI,
  express: app,
}).then(() => {
  app.listen(3000, () => {
    console.log('Payload CMS running on http://localhost:3000');
  });
}).catch((err) => {
  console.error('Error starting Payload CMS:', err);
});
