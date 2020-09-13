const Users=require("../schemas/users");


//function to fetch the user details based on email and password
let loginUser=async(request)=>{
    const userinfo= await Users.find({email:request.email,password:request.password}).exec();
    return userinfo;
}
//function to enter user details for registration
let registerUser=async(request)=>{
    const query={name:request.name,email:request.email,password:request.password}
    const addquery=new Users(query);

    const userinfo= await addquery.save(); 
    return userinfo;
}

//display the list of users
let userList=async()=>{
    const userinfo =await Users.find()
    return userinfo
}

module.exports={
    loginUser,
    registerUser,
    userList
};