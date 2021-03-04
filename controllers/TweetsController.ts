// @ts-ignore
import express from "express";
import {TweetModel} from "../models/TweetModel";
import {isValidObjectId} from "../utils/isValidObjectId";
import {UserModelInterface} from "../models/UserModel";
import {validationResult} from "express-validator";


class TweetsController {
    async index(_: any, res: express.Response) {
        try {
            const tweets = await TweetModel.find({}).populate('user').sort({'createdAt':'-1'}).exec()
            res.json({
                    status: "success",
                    data: tweets
                }
            )

        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error
            })
        }
    }

    async show(req: any, res: express.Response) {
        try {
            const tweetId = req.params.id
            if (!isValidObjectId(tweetId)) {
                res.status(400).send()
                return
            }

            const tweet = await TweetModel.findOne({_id: tweetId}).populate('user').exec()

            res.json({
                status: 'success',
                data: tweet
            })


        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {

            const user = req.user as UserModelInterface
            if (user?._id) {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        status: "error", errors: errors.array()
                    })
                    return
                }
                const data: any = {
                    text: req.body.text,
                    images:req.body.images,
                    user: user._id
                }


                const tweet = await TweetModel.create(data)
                res.json({
                    status: 'success',
                    data: await tweet.populate('user').execPopulate()
                })
            }

        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }

    async delete(req: express.Request, res: express.Response) {
        const user = req.user as UserModelInterface
        try {
            if (user) {
                const  tweetId = req.params.id
                if(!isValidObjectId(tweetId)){
                    res.status(400).send()
                    return
                }
                const tweet = await TweetModel.findById(tweetId)
                if(tweet){
                    if(String(tweet.user._id) === String(user._id)){
                        tweet.remove()
                        res.send()
                    }else{
                        res.status(400).send()
                    }
                }else{
                    res.status(404).send();
                }




            }

        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error
            })
        }
    }

    async update(req: express.Request, res: express.Response) {
        const user = req.user as UserModelInterface
        try {
            if (user) {
                const  tweetId = req.params.id
                if(!isValidObjectId(tweetId)){
                    res.status(400).send()
                    return
                }
                const tweet = await TweetModel.findById(tweetId)
                if(tweet){
                    if(String(tweet.user._id) === String(user._id)){
                        const text = req.body.text
                        tweet.text = text
                        tweet.save()
                        res.send()
                    }else{
                        res.status(403).send()
                    }
                }else{
                    res.status(404).send();
                }




            }

        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error
            })
        }
    }
}

export const TweetsCntl = new TweetsController()