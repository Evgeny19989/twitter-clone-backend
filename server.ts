const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
import {UserCtrl} from "./controllers/UserController";
import {registerValidations} from "./validations/register";

const app  = express()
import './core/db'

app.use(express.json())


app.get('/users', UserCtrl.index)
app.post('/users',registerValidations, UserCtrl.create)
app.get('/users/verify',registerValidations, UserCtrl.verify)
app.get('/users/:id',registerValidations, UserCtrl.show)
/*app.patch('/users', UserCtrl.patch)
app.delete('/users', UserCtrl.delete)*/

app.listen(process.env.PORT , ()=>{
   console.log('Port 8888 ready')
})