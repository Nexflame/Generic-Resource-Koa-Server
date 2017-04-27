import * as Koa from "koa";
import {MainRouter} from "./routes";
import {getConfig} from "./config/server-config";
import {getLogger} from "./utils/logger";
import {connectToDatabase, dbConnectionDefaultURL} from "./utils/db.mongoose";
import {errorHandler} from "./utils/error.handler";
import {addMocksToDB} from "./utils/temp.import.resources";

const logger = getLogger('Main');
const cors: any = require("koa-cors");
const body: any = require('koa-better-body');

class MainServer {
    app: any;
    port: number;

    constructor() {
        logger.info('Start creating KOA Server');

        this.app = new Koa();
        this.port = getConfig().port;

        this.configMiddlewares();
        this.configRoutes();
    }

    private configMiddlewares() {
        logger.info('Config Middlewares');

        this.logRequestTime();

        this.app.use(body());
        this.app.use(cors());
        this.app.use(errorHandler());
    }

    private logRequestTime() {
        this.app.use(async(ctx: any, next: any) => {
            const start: any = new Date();
            await next();
            logger.info(`${ctx.method} ${ctx.url} - ${+new Date() - start}ms`);
        });
    }

    private configRoutes() {
        let mainRouter = new MainRouter(null);
        this.app.use(mainRouter.routes())
            .use(mainRouter.allowedMethods());
    }

    async start() {
        let server = require('http').Server(this.app.callback());
        await server.listen(this.port);
        logger.info(`Server started on port: ${this.port}`);

        await connectToDatabase(dbConnectionDefaultURL);
        // await addMocksToDB();
    }
}

new MainServer().start();
