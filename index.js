const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./Routes/AdminRouter');
const config = require('config');
const PORT = process.env.PORT || config.get("port");
const app = express();
const cors = require('cors');

// const filePathMiddleware = require('./Controllers/filepath.middleware');
// const path = require('path');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(express.json());
// app.use(express.static(__dirname + '/media'));
app.use(express.static('media')); 
// app.use('/media', express.static('media'));
// app.use(filePathMiddleware(path.resolve(__dirname, 'media')));
app.use('/admin', adminRouter);

const run = async () => {
    try {
        await mongoose.connect('mongodb+srv://danylom2007m:qXB80aVeGWydNZVM@trykutnykcluster.abvogpn.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, ()=>{
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

run();
