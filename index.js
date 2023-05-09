const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const  { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)|| !origin) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  }
}



app.get('/', (req,res) => {
  res.send('hola server en express');
})
app.get('/nueva-ruta', (req,res) => {
  res.send('nueva ruta');
})


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('mi port' + port);
});
