const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).end('hello world');
});

const port = process.env.PORT || 8000;
app.listen(port);

console.log(`server listening on port ${port}`);
module.exports = app;
