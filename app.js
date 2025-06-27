const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

require('dotenv').config()

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');
const conexion = require('./db/connection');

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const searchRoutes = require('./routes/search.routes.js');
const uploadRoutes = require('./routes/upload.routes.js');
const userRoutes = require('./routes/user.routes');

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
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }
    routes() {
        this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.app.use('/api/v1/auth', authRoutes);
        this.app.use('/api/v1/users', userRoutes);
        this.app.use('/api/v1/categories', categoryRoutes);
        this.app.use('/api/v1/products', productRoutes);
        this.app.use('/api/v1/search', searchRoutes);
        this.app.use('/api/v1/upload', uploadRoutes);

        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Ruta no encontrada o metodo diferente'
            });
        });
    }
    database() {
        conexion.connection();
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`Listening in port ${port}`);
        });
    }
}

const server = new App();
server.listen(process.env.PORT);