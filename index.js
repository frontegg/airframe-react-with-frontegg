const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { frontegg, FronteggPermissions } = require('@frontegg/client');
// var fs = require('fs');

// var http = require('http');
// var https = require('https');
// var privateKey = fs.readFileSync('selfsigned.key', 'utf8');
// var certificate = fs.readFileSync('selfsigned.crt', 'utf8');

// var credentials = { key: privateKey, cert: certificate };

const clientId = process.env.FRONTEGG_CLIENT_ID;
const apiKey = process.env.FRONTEGG_API_KEY;

const tenantId = 'my-tenant-id';
const userId = 'my-user-id';


const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:4100', credentials: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/frontegg', frontegg({
  clientId,
  apiKey,
  contextResolver: async () => {
    const permissions = [
      FronteggPermissions.All,
    ];

    return {
      tenantId,
      userId,
      permissions
    }
  }
}));

app.post('/auth/saml/callback', (req, res) => {
  console.log('got to saml callback');
  res.redirect(`http://localhost:3000/auth/saml/callback?SAMLResponse=${encodeURIComponent(req.body.SAMLResponse)}&RelayState=${encodeURIComponent(req.body.RelayState)}`);
})

app.listen(8080, () => {
  console.log('started listening');
})