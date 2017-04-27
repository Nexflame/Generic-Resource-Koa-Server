import * as mongoose from 'mongoose'
import {HTTP_STATUS} from "../utils/http.utils";

/**
 * Dynamic Module Loading
 */
export var DB: any = {
    model: (name: string) => {
        try {
            require(`./${name.toLowerCase()}.schema`);
            return mongoose.model(name);
        } catch (error) {
            throw {status: HTTP_STATUS.NOT_FOUND, message: `Unknown resource ${name}`, error: error}
        }
    }
};
