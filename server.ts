


const dotenv = require('dotenv')
dotenv.config()
import {TweetsCntl} from "./controllers/TweetsController";
import {UserCtrl} from "./controllers/UserController";
import {UploadFileCntl} from "./controllers/UploadFileController";
import {registerValidations} from "./validations/register";
import './core/db'
const  multer  = require('multer')
import {passport} from "./core/passport";
import {createTweetsValidations} from "./validations/createTweets";
const express = require('express')
const app  = express()
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.use(express.json())
app.use(passport.initialize())

app.get('/tweets', TweetsCntl.index)
app.get('/tweets/:id', TweetsCntl.show)
app.delete('/tweets/:id', passport.authenticate('jwt'),TweetsCntl.delete)
app.post('/tweets', passport.authenticate('jwt'), createTweetsValidations,TweetsCntl.create)
app.patch('/tweets/:id', passport.authenticate('jwt'), createTweetsValidations,TweetsCntl.update)



app.get('/users', UserCtrl.index)
app.post('/auth/register',registerValidations, UserCtrl.create)
app.get('/auth/verify',registerValidations, UserCtrl.verify)
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);
app.get('/users/:id',registerValidations, UserCtrl.show)
app.post('/auth/login',
    passport.authenticate('local'),  UserCtrl.afterLogin)
/*app.patch('/users', UserCtrl.patch)
app.delete('/users', UserCtrl.delete)*/

app.post('/upload',upload.single('image'), UploadFileCntl.upload)

app.listen(process.env.PORT , ()=>{
   console.log('Port 8888 ready')
})