import Router = require('koa-router');
import {AuthRouter} from "./auth.router";
import {ROUTES} from "../routes";

export class PublicRouter extends Router {
    constructor(args: any) {
        super(args);
        //public routes goes here
        this.use(ROUTES.AUTH_URL, new AuthRouter(null).routes());
    }
}
