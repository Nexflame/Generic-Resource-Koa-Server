import Router = require("koa-router");
import {PublicRouter} from "./public/index";
import {PrivateRouter} from "./private/index";
import {jwtConfig} from "../utils/authenticate";

export * from './private';
export * from './public';
export * from './routes';

const koaJwt:any = require('koa-jwt');
const convert:any = require('koa-convert');

export class MainRouter extends Router {
    constructor(args: any) {
        super(args);

        this.use(new PublicRouter(null).routes());
        this.use(convert(koaJwt(jwtConfig)));
        this.use(new PrivateRouter(null).routes());
    }
}
