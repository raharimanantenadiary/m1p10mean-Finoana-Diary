const mongoose=require('mongoose');
const ATLAS_URI='mongodb+srv://mean:mdpprom13@mean1340.lmu1flv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(ATLAS_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("=> Connected successfully");
}).catch((err) =>console.log(err));