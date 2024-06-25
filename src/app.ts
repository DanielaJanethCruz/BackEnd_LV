import express from 'express';
const app = express();
/*  DotEnv  */
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
