import {IRouterContext} from "koa-router";
import {getLogger} from "./logger";
import {DATABASE_STATUS, getDatabaseStatus} from "./db.mongoose";
import {HTTP_STATUS} from "./http.utils";

const logger = getLogger('Error Handler');

export function errorHandler() {
    return async(ctx: IRouterContext, next: any) => {
        try {
            //check database status
            let connected = false;

            if (getDatabaseStatus() === DATABASE_STATUS.CONNECTED)
                connected = true;

            if (!connected)
                ctx.throw(HTTP_STATUS.INTERNAL_SERVER_ERROR, "Database connection is down!");

            await next();

            // Handle 404 upstream.
            let status = ctx.status || HTTP_STATUS.NOT_FOUND;
            if (status === HTTP_STATUS.NOT_FOUND)
                ctx.throw(HTTP_STATUS.NOT_FOUND, "Uh-Oh! That page is in /dev/null");

        } catch (error) {
            logger.debug(error);
            ctx.status = error.status;
            ctx.body = error.message;
        }
    }
}
