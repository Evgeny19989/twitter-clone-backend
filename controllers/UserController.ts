// @ts-ignore
import  express from  'express';
import {UserModel} from "../models/UserModel";
import {validationResult} from "express-validator";

class UserController {
    // @ts-ignore
    async  index(_:any,res:express.Response):Promisse<void> {
        try {
            const users = await  UserModel.find({}).exec()
            res.json({
                status:'success',
                data:users
            })
        } catch(error) {
            res.json({
                status:'error',
                message:JSON.stringify(error)
            })
        }
    }

    // @ts-ignore
    async  create(req:express.Request,res:express.Response):Promisse<void> {
        try {


            const errors = validationResult(req)
            if(!errors.isEmpty()){
                  res.status(400).json( {status:'error',errors:errors.array()})
                return
            }
           const data ={
                email:req.body.email,
                username:req.body.username,
                fullname:req.body.fullname,
                password:req.body.password,
           }

           const user =  await UserModel.create(data)

            res.json({
                status:"success",
                data:user
            })


        } catch(error) {
            res.json({
                status:'error',
                message:JSON.stringify(error)
            })
        }
    }
}

export const UserCtrl =  new UserController()