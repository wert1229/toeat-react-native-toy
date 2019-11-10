import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Home from './home';
import Items from './items'
import Item from './item';
import Intro from './intro'
import Info from './info';

//This is where navigations should be placed

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,

            navigationOptions: ({ navigation }) => ({ })
        },
        Items: {
            screen: Items,

            navigationOptions: ({ navigation }) => ({ })
        },
        Item: {
            screen: Item,

            navigationOptions: ({ navigation }) => ({ })
        }
    },
    {
        initialRouteName: "Home"
    }
);

const InfoStack = createStackNavigator(
    {
        Info,
    },
    {
        initialRouteName: "Info",
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Info',
        })
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Info: InfoStack,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let icon = "▲";

                if(routeName === 'Home'){
                    icon = "🌈";
                } else if(routeName === 'Info'){
                    icon = "🌙"
                } 

                return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
            }
        }),
        lazy: false,
        tabBarOptions: {
            activeTintColor: "#46c3ad",
            inactiveTintColor: "#888",
        },
    }
);

const AppStack = createStackNavigator(
    {
        Intro: {
            screen: Intro,
            navigationOptions: ({navigation}) => ({
                header: null,
            })
        },
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: ({navigation}) => ({
                header: null,
            })
        }
    }
);

export default createAppContainer(AppStack);