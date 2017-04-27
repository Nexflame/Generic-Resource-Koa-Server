import * as Mongoose from 'mongoose';
import {Schemas} from "./schemas";

export var UserSchema: any = new Mongoose.Schema({
    resourceType: {
        type: String,
        default: 'User'
    },
    id: String,

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    firstname: String,
    lastname: String,
    email: String,
    phone: String
});

UserSchema.pre('save', function(next:any) {
    this.id = this._id;
    next();
});

const UserModel = Mongoose.model(Schemas.User, UserSchema);
export default UserModel
