const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static('./'));

app.get('/', function (_, res) {
  res.redirect('/docs');
});

app.listen(port, function () {
  // eslint-disable-next-line
  console.log('listening on port:', port);
});
