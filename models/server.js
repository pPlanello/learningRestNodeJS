const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectDb();

        this.middlewares();

        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Read and parse body
        this.app.use(express.json())

        this.app.use( express.static('public'));
    }

    async connectDb() {
        await dbConnection();
    }

    routes() {
        this.app.use('/api/users', require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port: ', this.port);
        });
    }
}

module.exports = Server;