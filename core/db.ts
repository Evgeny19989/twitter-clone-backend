
const mongoose = require('mongoose')

mongoose.Promise = Promise

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true ,
    useCreateIndex: true,
    useFindAndModify:false
}).then(()=>{console.log('connected mongoose')})

const db  = mongoose.connection;

db.on('error' , console.error.bind(console,'connection error'))

export {db,mongoose}