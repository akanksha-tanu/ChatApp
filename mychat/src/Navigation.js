import React from 'react';
import {Image} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import{ createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Display from './pages/Display';
import Chatwindow from './pages/Chatwindow';
import Splash from './pages/Splash';
import Logo from './pages/Logo';

const AuthStackNavigator = createStackNavigator(
{
    Home: {
        screen: Home,
        navigationOptions:{
            headerShown: false,
        },
    },
    Splash: {
        screen: Splash,
        navigationOptions:{
            headerShown: false,
        },
    },
    Register: {
        screen: Register,
        navigationOptions:{
            headerLeft: ()=> <Logo />,
            title:'Sign up',
        },
    },
    Login: {
        screen: Login,
        navigationOptions:{
            headerLeft: ()=> <Logo />,
            title:'Login',
        },
    },
    
},
{
    // headerMode: 'none',
},
);

const AppStackNavigator = createStackNavigator(
{
    Display: {
        screen: Display,
        navigationOptions:{
            headerLeft: ()=> <Logo />,
            title:'Contacts',
            sideMenu: {
                left: {
                  visible: true
                }
              },
              headerShown:false
        },

    },
    Chatwindow:{
        screen: Chatwindow,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#4dc7f7',
            },
        },
    },
});

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading:AuthStackNavigator,
        App:AppStackNavigator
    },
    {
        initialRouteName:'AuthLoading',
    },
);
const Navigation = createAppContainer(SwitchNavigator) ;
export default Navigation ;