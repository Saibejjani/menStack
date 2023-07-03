const express = require('express');

const { connectMongoDb } = require('./connection');

const { logReqRes } = require('./middlewares');
const userRouter = require('./routes/user');

const app = express();
const port = 8000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

//connection
connectMongoDb('mongodb://127.0.0.1:27017/project-1').then(() => {
  console.log('MogoDB connected');
});

//Routes
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`server started at http:localhost:${port}`);
});
