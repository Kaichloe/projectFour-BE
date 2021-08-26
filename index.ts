import express from 'express';
import rootRouter from './routes/api/index';

const app = express();
const port = process.env.port || 3000;

//middleware to allow express to read incoming request object as a JSON object
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes will began with /api/
app.use('/api', rootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});