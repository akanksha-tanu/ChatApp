import React, {Component} from 'react';
import {View, Text,Image, ImageBackground, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import AsyncStorage from '@react-native-community/async-storage';
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

class Home extends Component{
   constructor(props){
       super(props);
    
        setTimeout(()=>{
        this.props.navigation.navigate('Login');
        }, 3000);
    }
    

    componentDidUpdate() {
        if (this.view !== undefined && this.view !== null) {
          this.view.fadeInLeft(500);
        }
      }

    render(){
        return(
            <View style ={styles.container} animation="fadeInLeft" easing="ease-in" duration="1000" iterationCount='1'>
                <ImageBackground source={require('./image/grad.jpg')} style={styles.back }>

                <Animatable.View style ={styles.slide}ref={ref => (this.view = ref)}
                    animation="fadeInLeft"
                    easing="ease-in">

                    <View style ={styles.container1}>
                        <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite" source={require('./image/logo.png')} style={styles.logo} ></Animatable.Image>
                    </View>

                    <View style ={styles.container2}>
                        <Text style={styles.text,styles.title}> CHAT ROOM </Text>
                    </View>
                    

                </Animatable.View>
                {/* <View style ={styles.container2}>
                    <Image source={require('./image/chatgroup.png')} style={styles.Image} ></Image>
                </View> */}
                </ImageBackground>
            </View>

            
        );
    }


}


export default Home;

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    container1:{
        paddingTop:10,
        justifyContent:'flex-end',
        alignItems:'center',
        flex:1,
        width:'100%',
        // height:'70%',
        // paddingTop:200

    },
    container2:{
        // paddingTop:10,
        justifyContent:'flex-start',
        alignItems:'center',
        flex:1,
        width:'100%',
        
    },
    slide:{
        // backgroundColor:'rgba(255,255,255,0.85)',
        marginTop:'70%',
        height:'30%',
        marginRight:50,
        marginLeft:50,
        borderRadius:50,
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
        // borderWidth:2
        // elevation:50
    },
    // Image:{
    //     height:220,
    //     width:'50%',
    //     resizeMode:'contain'
    // },
    text:{
        fontSize:20,
        fontWeight:'bold',
        justifyContent:'center'
    },
    title:{
        color:'#0289c3',
        fontSize:30,
        fontWeight:'bold',
        borderRadius:10,
    },
    back:{
        resizeMode:'contain',
        height:'100%',
        width:'100%'
    },
    logo:{
        height:120,
        width:'40%',
        resizeMode:'contain',
        alignItems:'center',
    
    },
    
})


