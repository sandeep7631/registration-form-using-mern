const express = require('express')  ;
const mongoose = require('mongoose');
const cors = require("cors");
const bcryptjs = require( 'bcryptjs' ) ;
const PORT=3000;
const app= express();
const MONGO_URL = "mongodb+srv://sandeep74:123456sa@cluster0.wcacgdn.mongodb.net/registrationPage"



//middlewares
app.use(cors());

app.use(express.json());
mongoose.connect(MONGO_URL);
const db=mongoose.connection;
db.on("error", (err) =>{ console.log(`Error connecting to database ${err}`);
});
db.once("open", ()=>{
    console.log("Connected with the Database");
});

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String

});
const User=mongoose.model('User',userSchema);
app.post('/register',async(req,res)=>{
try {
    const hashPassword = await bcryptjs.hashSync(req.body.password ,  8 );
        const newUser =new User({
            name : req.body.name ,
            email : req.body.email ,
            password : hashPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
} catch (error) {
    console.log(`Error during registration ${error}`);
    res.status(500).json({message:"Invalid Registration!"})
}
})


app.listen(PORT);