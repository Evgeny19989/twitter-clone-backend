import express from "express";



class TweetsController {
    async index(_: any, res: express.Response) {
        try {


        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }

    async show(_: any, res: express.Response) {
        try {

        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }

    async create(_: express.Request, res: express.Response) {
        try {



        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }
    async delete(_: express.Request, res: express.Response) {
        try {



        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }
}

