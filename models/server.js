const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        this.app.use( express.static('public'));
    }


    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'GET'
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'PUT'
            });
        });

        this.app.status(201).post('/api', (req, res) => {
            res.json({
                msg: 'POST'
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'DELETE'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port: ', this.port);
        });
    }
}

module.exports = Server;