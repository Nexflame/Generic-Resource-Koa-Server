import Router = require("koa-router");
import {HTTP_STATUS} from "../../utils/http.utils";
import {DB} from "../../resources/ensure.schemas";

/*
    Generic Router for crud operations on resources.
 */
export class ResourceRouter extends Router {
    constructor(args?: any) {
        super(args);
        /*
         Get a specific resource (by id)
         method: get
         full Url: localhost:3000/ResourceName/id
         ex: localhost:3000/User/584bda4a3530553ef4d20b5a
         */
        this.get('/:resourceType/:id', async(ctx: any) => {
            ctx.status = HTTP_STATUS.OK;
                ctx.body = await DB.model(ctx.params.resourceType).findOne({_id: ctx.params.id});
        });
        /*
         Get all resources for a specific type
         method: get
         full Url: localhost:3000/ResourceName
         ex: localhost:3000/Role
         */
        this.get('/:resourceType', async(ctx: any) => {
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(ctx.params.resourceType).find({});
        });
        /*
         Create a resource on server base on request`s body
         method: post
         full Url: localhost:3000/ResourceName
         ex: localhost:3000/Role
         */
        this.post('/:resourceType', async(ctx: any) => {
            let Model = DB.model(ctx.params.resourceType);
            let request = ctx.request;
            ctx.status = HTTP_STATUS.CREATED;
            ctx.body = await new Model(request.fields).save();
        });
        /*
         Update a resource on server base on request`s body
         method: put
         full Url: localhost:3000/ResourceName
         ex: localhost:3000/Organization
         */
        this.put('/:resourceType/:id', async(ctx: any) => {
            let request = ctx.request;
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(ctx.params.resourceType).findOneAndUpdate({id: ctx.params.id}, request.fields, {new: true});
            // ctx.status = httpStatus.CREATED; // TODO: set this if created
        });
        /*
         Delete a resource on server base on id provided in url.
         method: delete
         full Url: localhost:3000/ResourceName/id
         ex: localhost:3000/Organization/584bda4a3530553ef4d20b5a
         */
        this.delete('/:resourceType/:id', async(ctx: any) => {
            ctx.status = HTTP_STATUS.OK;// if 204 no content returned, body will be empty on client side...
            ctx.body = await DB.model(ctx.params.resourceType).findOneAndRemove({id: ctx.params.id});
        })
    }
}
