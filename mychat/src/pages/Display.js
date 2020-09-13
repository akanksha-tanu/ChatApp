import React, {Component} from 'react';
import {FlatList,TouchableWithoutFeedback,Button,View,StatusBar,ScrollView,Text,TouchableOpacity,StyleSheet,Image,ImageBackground,TouchableHighlight, TouchableWithoutFeedbackComponent} from 'react-native';
import { userList} from '../actions/userAction';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';


class Display extends Component{
    constructor(props){
        super(props);
        // this.props.navigation.navigate('Splash'),
        this.state={
            users:[],
            showAlert: false,
            show:false,
            menu:false,
        };
        this.goToChat=this.goToChat.bind(this);
    }

    showAlert = () => {
        this.setState({
          showAlert: true
        });
    
    };
     
    hideAlert = () => {
        this.setState({
          showAlert: false
        });
    };

    componentDidMount(){
        // this.props.navigation.navigate('Splash'),
        this.props.onUserList();
    }

    goToChat=(userid,name) =>{
        this.props.navigation.navigate('Chatwindow',{userid:userid,name:name});
    }

    componentDidUpdate(nextProps){
        
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true){
            this.setState({users:this.props.userReducer.userList});
        }
    }

    handleViewRef = ref => this.view = ref;
    
    fading = () =>{ 
        const that=this;
        this.setState({
            menu: true,
        })
        !this.state.show?that.view.fadeInRight(800):that.view.fadeOutRight(800);
        this.setState({
            show: !this.state.show,
        })
    };

    onClose = () => this.setState({ modalVisible: false});
    

    render(){
        
        const {showAlert} = this.state;
        let username=this.props.userReducer.userAuth.name;
            // const {users}=this.state;
            return(
            
                <ImageBackground source={require('./image/img35.jpg')} style={styles.back}>
                    <Animatable.View style={styles.container}>
                    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = '#38a1f2' translucent = {true}/>
                    
                                <View style = {styles.upperbox}>

                                        <Image source={require('./image/img29.jpg')} style={styles.topimg}></Image>
                                        <View><Text style = {styles.hello}> Hello, {username}</Text></View>
                                        
                                        
                                            <Animatable.View  style={styles.menu}>
                                                <TouchableOpacity onPress={this.fading}>
                                                        <ImageBackground source={require('./image/menu2.png')} style={styles.back}>
                                                        </ImageBackground>
                                               </TouchableOpacity>

                                            </Animatable.View>
                                        
                                        
                                       
                                </View>
                                
                                    <Animatable.View style ={this.state.menu?styles.slide:styles.blank} ref={this.handleViewRef} >

                                            <Button  title="LOG OUT" style = {styles.logout}
                                                    onPress={() => {
                                                    this.showAlert();
                                                }} 
                                             />
                                        

                                    </Animatable.View>
                                
                                
                                        <AwesomeAlert
                                            show={showAlert}
                                            showProgress={false}
                                            title="LOG OUT"
                                            message="Are you sure you want to log out?"
                                            closeOnTouchOutside={false}
                                            closeOnHardwareBackPress={false}
                                            showCancelButton={true}
                                            showConfirmButton={true}
                                            cancelText="    NO   "
                                            confirmText="   YES   "
                                            cancelButtonColor="#009900"
                                            confirmButtonColor="#FF0000"
                                            onCancelPressed={() => {
                                                this.fading();
                                                this.hideAlert();
                                                
                                            }}
                                            onConfirmPressed={() => {
                                                this.hideAlert();
                                                AsyncStorage.clear();
                                                this.props.navigation.navigate('Login')
                                            }}
                                        />                                      
                                
                            
                        <View style={styles.container1} onPress={this.fadeout}>
                            
                                {this.state.users && this.state.users.length>0  ?  
                                 <FlatList
                                    
                                    data={this.state.users}
                                    renderItem={({item}) => {
                                        if(item.name!==username)
                                        {
                                            return(
                                            <TouchableOpacity disabled ={this.state.show?true:false} onPress={()=>this.goToChat(item._id,item.name)} >
                                                <Text style={styles.item} key={item._id}> {item.name} </Text>
                                            </TouchableOpacity>)
                                        }
                                    }
                                }
                                keyExtractor={(item,index)=>index.toString()}
                                />:null}
                             
                                {/* <View style ={styles.container2}>
                                    <Image source={require('./image/chatgroup.png')} style={styles.Image} ></Image>
                                </View> */}
                        </View>

                        
                    </Animatable.View>
                </ImageBackground>
            
            )
    }

}

function mapStateToProps(state){
    return{
        userReducer:state.userReducer
    };
}

function mapDispatchToProps(dispatch){
    return{
        onUserList: () => dispatch(userList())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Display);


const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width:'100%',
    },
    
    container1:{
        height:'80%',
        width:'90%',
        marginTop:15,
        bottom:10,
        position:"relative"

    },
    
    container2:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        width:'100%',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    item:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight:'bold',
        letterSpacing:1.5,
        textTransform:'uppercase',
        padding:12,
        borderWidth:0.8,
        borderRadius:5,
        margin:8,
        elevation:5,
        backgroundColor:'rgba(255,255,255,0.85)',
        // backgroundColor:'rgba(51,204,255,0.3)'
        // backgroundColor:'rgba(255,73,225,0.2)'

    },
    Image:{
            height:120,
            width:'45%',
            resizeMode:'contain',
            
    },
    image: {
        height:'90%',
        width:'20%',
        resizeMode:'contain',
    },  
    text:{
        // fontSize:14,
        fontWeight:'bold',
        width:'90%',
        height:'65%',
        alignSelf:'center',
        color:'#0289c3'
        // backgroundColor:'yellow'
    },  
   
    back:{
        resizeMode:'contain',
        height:'100%',
        width:'100%',
        // opacity:0.2
    },
    logout:{
        elevation:10,
        fontWeight:'bold',
        zIndex:1
    },
    hello:{
        fontSize:20,
        color:'white',
        letterSpacing:1,
        textTransform:"capitalize",
        fontWeight:"bold"
    },
    upperbox:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:'row',
        width:"100%",
        margin:0,
        paddingHorizontal:20,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
        // backgroundColor:"black",
        height:"20%",
    },
    topimg:{
        position: 'absolute',
        resizeMode:"contain",
        bottom: 0,
        borderRadius:20,
        opacity: 0.8
    },
    menu:{
        right:0,
        height:"35%",
        width:"10%",
        left:0,
    },
    slide:{
        position:"absolute",
        zIndex:1,
        width:"50%",
        backgroundColor:"white",
        height:"100%",
        right:0,
        top:"12%",
        elevation:10,
        display:"flex",
        padding:20,
        borderTopLeftRadius:30,
        // alignItems:"center"
    },
    blank:{
        width:0,
        height:0
    },
    
})




