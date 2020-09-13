import React, {Component} from 'react';
import {GiftedChat ,Bubble} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {View,StatusBar,StyleSheet,ImageBackground} from 'react-native';
import {chatInsert,chatList} from '../actions/chatAction';
import SocketIOClient from 'socket.io-client';
import {SERVERURL,SERVER} from '../../config';

// type Props ={
//     name?: string,
// };

// class Chatwindow extends React.Component<Props>{
class Chatwindow extends React.Component{
    
    static navigationOptions=({navigation})=>({
        title:(navigation.state.params||{}).name|| 'Chat!',
    });

    state={
        userid:this.props.navigation.state.params.userid,
        messages:[],
    }

    componentDidMount(){
        this.socket=SocketIOClient(SERVER);
        const data={
            receiver_id: this.props.navigation.state.params.userid,
            sender_id: this.props.userReducer.userAuth._id,
        };
        this.socket.emit('getMessage',data);
        this.socket.on('receiveMessage',(chatlist)=>{
            if(chatlist){
                console.log(chatlist)
                this.setState({messages:chatlist});
            }
        });
    
    }

    componentDidUpdate(nextProps){
        if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true)
        {
            console.log(this.props.chatReducer.chatList)
            this.setState({
                messages:this.props.chatReducer.chatList
            })
        }
    }

    onSend=(messages=[])=>{
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages,messages),
        }))
    }

    submitChatMessage(messages=[]){
        const date=new Date();
        this.onSend(messages)
        let details={
            user:{
                _id: this.props.userReducer.userAuth._id
            },
            receiver_id: this.state.userid,
            sender_id: this.props.userReducer.userAuth._id,
            chatdate: date,
            text: messages && messages[0] && messages[0].text
        }
        // this.props.onChatMessage(details);
        this.socket.emit('chatMessage',details);
    }

    renderBubble=(props)=>{
        return( <Bubble {...props}
                textStyle={{
                    right:{
                        color:'rgb(0,0,0)'
                    },
                    left:{
                        color:'rgb(0,0,0)'
                    },
                }}
                timeTextStyle={{
                    right:{
                        color:'rgb(0,0,0)'
                    },
                    left:{
                        color:'rgb(0,0,0)'
                    },
                }}
                wrapperStyle={{
                    right:{
                        backgroundColor:'#4dc7f7'
                    },
                    left:{
                        backgroundColor:'#f3edfc',
                        left:-40
                    },

                }}
            />

        );
    }

    render(){
        return(
            // <ImageBackground source={require('./image/img30.jpg')} style={styles.back}>
            <ImageBackground source={require('./image/img35.jpg')} style={styles.back}>
            <View style={{flex:1,marginTop:10}}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = '#d5d8db' translucent = {true}/>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages=>this.submitChatMessage(messages)}
                    renderBubble={this.renderBubble}
                    user={{
                        _id: this.props.userReducer.userAuth._id,
                    }}
                    // showAvatar={true}
                    // showAvatarForEveryMessage={true}
                    alwaysShowSend
                    scrollToBottom={true}
                    isTyping={true}

                />

            </View>
            </ImageBackground>
        )
    }
}

function mapStateToProps(state){
    // console.log(state.chatReducer)
    return{
        chatReducer: state.chatReducer,
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch){
    return{
        onChatMessage:(chatMessage)=>dispatch(chatInsert(chatMessage)),
        onGetMessage:(data)=>dispatch(chatList(data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chatwindow);

const styles=StyleSheet.create({
    back:{
        resizeMode:'contain',
        height:'100%',
        width:'100%',
        // opacity:0.2
    }
})