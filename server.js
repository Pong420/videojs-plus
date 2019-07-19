const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static('./'));

app.get('/', function(_, res) {
  res.redirect('/examples');
});

app.listen(port, function() {
  console.log('listening on port:', port);
});
