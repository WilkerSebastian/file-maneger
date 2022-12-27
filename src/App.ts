import express from "express";
import { resolve } from "path";
import { router } from "./router";
import ejs from "express-ejs-layouts"

export default class App {

    public server: express.Application;

    constructor() {

        this.server = express();
        this.middleware();
        this.router();

    }

    private middleware() {

        this.server.use(ejs)
        this.server.set('views', resolve("./src/app/views"));
        this.server.set('view engine', 'ejs');

        this.server.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
        this.server.use('/public', express.static('./src/app/public'))

        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());

    }

    private router() {
        this.server.use(router);
    }

}