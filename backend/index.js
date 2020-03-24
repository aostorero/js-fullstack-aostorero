if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
console.log("Running in " + process.env.NODE_ENV + " mode");
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
//Inicializaciones

const app = express(); //"app" es el servidor y la app en sí

//propiedades

app.set('port', process.env.PORT || 3000); //pone que se usa el puerto 3000
require('./databse');

//middlewares (todos los middleware de express son funciones)

app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        //usamos una funcion que nos devuelve un numero dependiendo del tiempo en el que se sube
        //y le añadimos su tipo (onda .png) usando el metodo extname de path
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false})); //para interpretar datos de formulario como si fuera json
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/books', require('./routes/books'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//iniciar el servidor

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})