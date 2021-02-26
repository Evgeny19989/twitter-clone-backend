import {model ,Schema, Document} from 'mongoose'


export interface  UserModelInterface{
    _id?: string;
    email: string;
    fullname: string;
    username: string;
    password: string;
    confirmed_hash: string;
    confirmed?: boolean;
    location?: string;
    about?: string;
    website?: string;


}

export type UserModelDocumentInterface = UserModelInterface & Document



const UserSchema = new Schema({
    email: {
        unique: true,
        required: true,
        type: String
    },
    fullname: {
        required: true,
        type: String
    },
    username: {
        unique: true,
        required: true,
        type: String
    },
    location: String,
    password: {
        required: true,
        type: String,

    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmed_hash: {
        required: true,
        type: String,

    },
    about: String,
    website: String
},
{
    timestamps: true,
}

);

UserSchema.set('toJSON', {
    transform: function (_,obj) {
        delete obj.password;
        delete obj.confirmed_hash;
        return obj;
    },
});



export const UserModel = model<UserModelDocumentInterface>('User' ,UserSchema)