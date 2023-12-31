const connectDB=require('./db/connect')
const express=require('express');
const app=express();
const tasks=require('./routes/tasks')
require('dotenv').config()
const bodyParser = require('body-parser');
const notFound=require('./middlewares/not-found');
const errorHandlerMiddleware=require('./middlewares/error-handler');


//middlewares
app.use(bodyParser.json());
app.use('/api/v1/tasks',tasks);
app.use(express.static('./public/homePage'));
app.use(express.static('./public/singleTaskPage'))
app.use(notFound);
app.use(errorHandlerMiddleware);



//starting the app
const port=process.env.PORT || 5000;

const start=async()=>{
    try{
        await connectDB(process.env.mongoURI)
        app.listen(port,console.log(`server is listening on port ${port}...`))

    }catch (error)
    {
        console.log(error)
    }
}
start()