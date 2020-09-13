import React, {Component} from 'react';
import {View,KeyboardAvoidingView, Text,Image,ImageBackground,Button, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { userRegister,userAuth } from '../actions/userAction';
import { connect } from 'react-redux';


// const image = { uri: ".\chat.png" };

class Register extends Component{
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            errors:{},
        };

        this.validateForm=this.validateForm.bind(this);
    }

    handleName=(text)=>{
        this.setState({name:text})
    }
    handleEmail=(text)=>{
        this.setState({email:text})
    }
    handlePassword=(text)=>{
        this.setState({password: text})
    }

    componentDidMount(){
        this.props.userAuth()
    }
    
    validateForm=()=>{
        const {errors}=this.state;
        const emailadd=this.state.email;
        const pass=this.state.password;
        const nameadd=this.state.name;
        const reg=/^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        // const reg=/w/;

        if(nameadd===''){
            errors.name="Name can't be blank";
        }
        else{
            errors.name='';
        }

        if(emailadd === ''){
            errors.email="Email cannot be empty";
        }else if(emailadd.length>0 && !reg.test(emailadd)){
            errors.email="Please provide correct email address";
        }else{
            errors.email='';
        }

        if(pass===''){
            errors.pass="Password can't be empty";
        }else if(pass && pass.length<5){
            errors.pass="please provide a stronger password";
        }else{
            errors.pass='';
        }

        this.setState({errors})
        if(errors.email==='' && errors.pass==='' && errors.name===''){
             //this.submitForm();
            const userinfo={
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
            }
            this.props.onRegister(userinfo);
            
        }
    }


    componentDidUpdate(nextProps){
        if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true){
           this.props.navigation.navigate('Display');
        }
    }
    

    render(){
        const {errors}=this.state;
        return(
            <View style ={styles.container}>
                    <ImageBackground source={require('./image/img30.png')} style={styles.back}>
                
                    {/* <View style={styles.box}>
                        <Image source={require('./image/logo.png')} style={styles.image}></Image>
                        <Text style={styles.text}>SIGN UP</Text>
                    </View> */}


                    <KeyboardAvoidingView style ={styles.container2} behavior="padding">

                        <Image source={require('./image/users.png')} style={styles.user} ></Image>

                        <TextInput style = {styles.input}
                            underlineColorAndroid ="transparent"
                            placeholder ="Name"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            onChangeText ={this.handleName}/>
                            <Text style={styles.errorstyle}>{errors.name}</Text>

                        <TextInput style = {styles.input}
                            underlineColorAndroid ="transparent"
                            placeholder ="Email"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            onChangeText ={this.handleEmail}/>
                            <Text style={styles.errorstyle}>{errors.email}</Text>

                        <TextInput secureTextEntry={true} style = {styles.input}
                            underlineColorAndroid ="transparent"
                            placeholder ="Password"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            onChangeText ={this.handlePassword}/>
                            <Text style={styles.errorstyle}>{errors.pass}</Text>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={()=> this.validateForm()}
                            >
                            <Text style={styles.submitButtonText}>SIGN UP</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>

                    <View style={styles.container3}>
                        <Text style={styles.text2}>Already Registered?</Text>
                        <Button title="Login" style = {styles.submitButton}
                            onPress={() => this.props.navigation.navigate('Login')} 
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

function mapStateToProps(state){
    return{
        userReducer:state.userReducer
    };
}

function mapDispatchToProps(dispatch){
    return{
        onRegister: (userinfo) => dispatch(userRegister(userinfo)),
        userAuth:()=>dispatch(userAuth())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

// export default Register;

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width:'100%',
        

    },
    container2:{
        justifyContent:'center',
        alignItems:'center',
        // flex:1,
        width:'100%',
        height:445,
        

    },
    container3:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'25%',
        // paddingTop:'5%'
    },
    input:{
        margin:'2%',
        height:40,
        borderColor:'#000',
        borderWidth:1.2,
        width:'70%',
        padding:10,
        fontSize:16,
        lineHeight:20,
        color:'#000',
        backgroundColor:'rgba(255,255,255,0.6)',
        // backgroundColor:'rgba(0,128,255,0.2)',
        // backgroundColor:'rgba(255,73,225,0.1)',
        borderRadius:5,
    },
    submitButton:{
        backgroundColor:'#000',
        padding:10,
        margin:5,
        height:40
    },
    submitButtonText:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    },
    box:{
        marginLeft:5,
        marginRight:5,
        paddingTop:8,
        marginTop:10,
        height:50,
        width:'97%',
        justifyContent:'space-around',
        alignItems:'flex-start',
        flexDirection:'row',
        elevation:5,
        // borderWidth:0.5,
        borderRadius:10,
        backgroundColor:'white'
    },
    image: {
        height:'90%',
        width:'20%',
        resizeMode:'contain',
        // paddingRight:0
        // backgroundColor:'red'
    },
    linearGradient:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height:'100%',
        width: '100%',
    },
    user:{
        height:'12%',
        width:'12%',
        resizeMode:'contain'
    },
    text:{
        fontWeight:'bold',
        width:'80%',
        height:'65%',
        alignSelf:'center',
    },
    back:{
        resizeMode:'contain',
        height:'100%',
        width:'100%',
        // paddingTop:10,
    
      
    },
    text2:{
        fontWeight:'bold',
        padding:'1%',
    },
    errorstyle:{
        color:'red',
        fontSize:10,
    }
    // "@media (max-device-height: 200)": {
    //     image: {
    //         height:0
    //     }
    // }
})