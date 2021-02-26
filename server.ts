import {passport} from "./core/passport";

const dotenv = require('dotenv')
dotenv.config()
import {UserCtrl} from "./controllers/UserController";
import {registerValidations} from "./validations/register";
import './core/db'
const express = require('express')
const app  = express()

app.use(express.json())
app.use(passport.initialize())

app.get('/users', UserCtrl.index)
app.post('/auth/register',registerValidations, UserCtrl.create)
app.get('/auth/verify',registerValidations, UserCtrl.verify)
app.get('/users/:id',registerValidations, UserCtrl.show)
app.post('/auth/login',
    passport.authenticate('local'), function(req, res) {
     res.json(req.user)
    });
/*app.patch('/users', UserCtrl.patch)
app.delete('/users', UserCtrl.delete)*/

app.listen(process.env.PORT , ()=>{
   console.log('Port 8888 ready')
})