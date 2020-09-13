const express=require("express");
const app=express();
const port=8082;
const usermodel=require('./models/users');
const chatmodel=require('./models/chat');
const connection=require('./config');
const bodyParser=require('body-parser');
const socketio=require('socket.io');
const server=app.listen(port,()=>console.log('App is listening on port '+port));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/loginuser",(req,res)=>{
    usermodel.loginUser(req.body)
    .then(item=>{
        if(item && item.length>0)
        {
            res.status(200).send(item[0]);
        }else{
            res.status(201).send({message:"Invalid Email address or Password"}); 
        }
    })
    .catch(err=>{
        res.status(400).send("Unable to find the user");
    });
})

app.post("/registeruser",(req,res)=>{

    usermodel.registerUser(req.body)
    .then(item=>{
        res.status(200).send(item);
    })
    .catch(err=>{
        res.status(400).send("Error: Could not register ");
    });
})

app.get("/userlist",(req,res)=>{
    usermodel.userList().then(items=>{
        if(items && items.length>0)
        {
            res.status(200).send(items);
        }
        else{
            res.status(201).send({message:"No records found"});
        }
    })
    .catch(err=>{
        res.status(400).send("Error: error fetching recods ");
    });
})


const websocket=socketio(server);

websocket.on('connection',function(socket){
    socket.on('chatMessage',(data)=>{
        chatmodel.chatInsert(data)
    });

    socket.on('getMessage',(data)=>{
        let chatlist =chatmodel.getChatList(data).then(chatlist=>{
            console.log(chatlist,"chatlist")
            socket.emit('receiveMessage',chatlist);
        });
    });
})

