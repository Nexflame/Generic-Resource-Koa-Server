import Router = require('koa-router');
import {ResourceRouter} from "./resource.router";
import {SpecificResourceRouter} from "./specific.url.resources";

export class PrivateRouter extends Router {
    constructor(args: any) {
        super(args);
        //Private routes goes here
        this.use(new SpecificResourceRouter(null).routes());
        this.use(new ResourceRouter(null).routes());
    }
}
