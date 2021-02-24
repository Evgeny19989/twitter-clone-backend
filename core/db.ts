// @ts-ignore
import mongoose from 'mongoose'

mongoose.Promise = Promise

mongoose.connect(process.env.MONGO_DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology:true ,
    useCreateIndex: true,
    useFindAndModify:true
}).then(()=>{console.log('connected mongoose')})

const db  = mongoose.connection;

db.on('error' , console.error.bind(console,'connection error'))

export {db,mongoose}