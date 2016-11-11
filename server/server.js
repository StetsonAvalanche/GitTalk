const express = require('express');
const auth = require('./routes/auth.js');
const app = express();

app.use('/auth', auth);

// app.use('/', express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  // will need to change to serve static file
  res.status(200).end('hello world');
});

const port = process.env.PORT || 8000;
app.listen(port);

console.log(`server listening on port ${port}`);
module.exports = app;
