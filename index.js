const express= require('express');
const app = express();

require('dotenv').config();
const port= process.env.PORT;

app.use(express.json());

const dbConnect = require('./config/database');
dbConnect();

const routes =require('./routes/route');
app.use("/api/v1",routes);

app.get('/',()=>{
    res.send("hellonddjfne");
});

app.listen(port,()=>{
    console.log(`app is run on port ${port}`);
});