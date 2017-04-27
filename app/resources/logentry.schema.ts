import * as Mongoose from 'mongoose';
import {Schemas} from "./schemas";

export var LogEntrySchema: any = new Mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    res: {
        type: Object
    },
    req: {
        type: Object
    }
});

const LogEntryModel = Mongoose.model(Schemas.LogEntry, LogEntrySchema);
export default LogEntryModel
