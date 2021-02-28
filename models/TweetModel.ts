import {model, Schema, Document} from 'mongoose'


export interface TweetModelInterface {
    _id?: string;
    text: string;
    user: string;


}

export type TweetModelDocumentInterface = TweetModelInterface & Document


const TweetSchema = new Schema({

        text: {
            required: true,
            type: String
        },
    user: {
        required: true,
        ref:'User',
        type: Schema.Types.ObjectId
    }
    }
);

TweetSchema.set('toJSON', {
    transform: function (_, obj) {
        delete obj.password;
        delete obj.confirmed_hash;
        return obj;
    },
});


export const TweetModel = model<TweetModelDocumentInterface>('Tweet', TweetSchema)