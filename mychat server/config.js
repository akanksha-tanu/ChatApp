const mongoose=require("mongoose");

const connection=mongoose.connect('mongodb://localhost/mychat',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('Connected to MongoDB.....'))
.catch(err=>console.log("Couldn't connect to MongoDB:27017 ",err));
mongoose.set('useCreateIndex',true);

module.exports=[].concat(
    connection
);