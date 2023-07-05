const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => {
  console.log('mongodb connected');
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/test', async (req, res) => {});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', staticRoute);
app.use('/url', urlRoute);
app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
