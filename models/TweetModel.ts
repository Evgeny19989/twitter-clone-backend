import {model, Schema, Document} from 'mongoose'
import { UserModelInterface} from "./UserModel";


export interface TweetModelInterface {
    _id?: string;
    text: string;
    user: UserModelInterface;


}

export type TweetModelDocumentInterface = TweetModelInterface & Document


const TweetSchema = new Schema({

        text: {
            required: true,
            type: String,
            maxlength:280

        },
    user: {
        required: true,
        ref:'User',
        type: Schema.Types.ObjectId
    },
    images:[
        {
            type:String
        }
    ]
    },
    {
        timestamps: true,
    }
);


export const TweetModel = model<TweetModelDocumentInterface>('Tweet', TweetSchema)