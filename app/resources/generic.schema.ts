import * as Mongoose from 'mongoose';
import {Schemas} from "./schemas";

export let GenericSchema: any = new Mongoose.Schema({
    resourceType: {
        type: String,
        default: 'Generic'
    },
    id: String,

    testField: {
        type: String,
        required: true,
        unique: true
    },
    genericNumber: {
        type: Number,
        required: true
    },

    genericUnk: String
});

GenericSchema.pre('save', function(next:any) {
    this.id = this._id;
    next();
});

const GenericModel = Mongoose.model(Schemas.Generic, GenericSchema);
export default GenericModel
