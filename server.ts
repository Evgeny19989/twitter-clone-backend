// @ts-ignore
import  express from  'express';
import {UserCtrl} from "./controllers/UserController";
import {registerValidations} from "./validations/register";


const app  = express()
app.use(express.json())


app.get('/users', UserCtrl.index)
app.post('/users',registerValidations, UserCtrl.create)
/*app.patch('/users', UserCtrl.patch)
app.delete('/users', UserCtrl.delete)*/

app.listen(8888 , ()=>{
   console.log('Port 8888 ready')
})