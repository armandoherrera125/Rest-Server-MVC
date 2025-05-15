const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec  = require('./swagger.js');
const userRoutes = require('./routes/user.routes');
const conexion = require('./db/connection');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
require('dotenv').config()

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.database();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
      }
    routes () {
        this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.app.use('/api/v1/auth' , authRoutes);
        this.app.use('/api/v1/users', userRoutes);
        this.app.use('/api/v1/categories' , categoryRoutes);
        this.app.use('/api/v1/products', productRoutes);
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Ruta no encontrada o metodo diferente'
            });
        });
    }
    database () {
        conexion.connection();
    }
    listen(port){
        this.app.listen( port , () => {
            console.log(`Listening in port ${port}`);
        });
    }
}

const server = new App();
server.listen(process.env.PORT);