
import React, {Component} from 'react';
import {View, Text,ImageBackground,StyleSheet,Button} from 'react-native';
import { DotIndicator } from 'react-native-indicators';


export default class Splash extends Component {
        constructor(props){
            super(props);
            setTimeout(()=>{
                this.props.navigation.goBack(null)
            },500)
        }
render(){
    
    return(
        <ImageBackground source={require('./image/grad.jpg')} style={styles.back }>
        <View style ={styles.container}>
            <DotIndicator color='#004C99'/>
            <Text text="Loading" />
        </View>
        </ImageBackground>
    ); 
}
}

// export default Splash;

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width:'100%',
        // backgroundColor:"white"
        // paddingTop:'2%',

    },
    back:{
        resizeMode:'contain',
        height:'100%',
        width:'100%'
    },
})