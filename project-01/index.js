const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const port = 8000;

//Routes

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`server started at http:localhost:${port}`);
});
