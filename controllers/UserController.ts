import express from 'express';
const  mongoose = require('mongoose')
import {UserModel, UserModelDocumentInterface, UserModelInterface} from "../models/UserModel";
import {validationResult} from "express-validator";
import {generateMD5} from "../utils/generateHash";
import {sendEmail} from '../utils/sendEmail';
import jwt from 'jsonwebtoken';
import { isValidObjectId } from '../utils/isValidObjectId';


class UserController {

    async index(_: any, res: express.Response) {
        try {
            const users = await UserModel.find({}).exec()
            res.json({
                status: 'success',
                data: users
            })


        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }

    async show(req: any, res: express.Response) {
        try {
            const userId = req.params.id
            if(!isValidObjectId(userId)){
                res.status(400).send()
                return
            }

            const user = await UserModel.findOne({_id: userId}).exec()

            res.json({
                status: 'success',
                data: user
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


            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({status: 'error', errors: errors.array()})
                return
            }
            const data: UserModelInterface = {
                email: req.body.email,
                username: req.body.username,
                fullname: req.body.fullname,
                password:  generateMD5(req.body.password  + process.env.SECRET_KEY),
                confirmed_hash: generateMD5(process.env.SECRET_KEY || Math.random().toString())
            }

            const user = await UserModel.create(data)

            res.json({
                status: "success",
                data: user
            })

            sendEmail(
                {
                    emailFrom: 'admin@twitter.com',
                    emailTo: data.email,
                    subject: 'Подтверждение почты Twitter Clone Tutorial',
                    html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${process.env.PORT}/auth/verify?hash=${data.confirmed_hash}">по этой ссылке</a>`,
                },

                (err: Error | null) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: err,
                        });
                    } else {
                        res.status(201).json({
                            status: 'success',
                            data: user,
                        });
                    }
                },
            );


        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }

    async verify(req: any, res: express.Response) {
        try {
            const hash = req.query.hash
            if (!hash) {
                res.status(400).send()
                return
            }
            const user = await UserModel.findOne({confirmed_hash: hash}).exec()

            if (user) {
                user.confirmed = true
                await user.save()
                res.json({
                    status: 'success',
                })

            } else {
                res.status(404.).json({status: 'error', message: 'Пользователь не найден'})
            }


        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });

        }
    }

    async afterLogin(req: express.Request, res: express.Response){
        try {
            const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
            res.json({
                status: 'success',
                data: {
                    ...user,
                    token: jwt.sign({ data: req.user }, process.env.SECRET_KEY || '123', {
                        expiresIn: '30 days',
                    }),
                },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
    async getUserInfo(req: express.Request, res: express.Response) {
        try {
            const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
            res.json({
                status: 'success',
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }


}

export const UserCtrl = new UserController()