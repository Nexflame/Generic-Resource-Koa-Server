import Router = require("koa-router");
import {HTTP_STATUS} from "../../utils/http.utils";

export class SpecificResourceRouter extends Router {
    constructor(args?: any) {
        super(args);

        this.get(`/URL`, async(ctx: any) => {
            ctx.status = HTTP_STATUS.OK;

            ctx.body = "CONTENT"
        });

    }
}
