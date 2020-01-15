import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SingIn from './screens/SingIn';
import SingUp from './screens/SingUp';

import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';

export default (signed = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sing: createSwitchNavigator({ SingIn, SingUp }),
                App: createBottomTabNavigator(
                    {
                        Dashboard,
                        Profile,
                    },
                    {
                        tabBarOptions: {
                            style: {
                                backgroundColor: '#8d41a8',
                            },
                            activeTintColor: '#fff',
                            inactiveTintColor: 'rgba(255,255,255,0.6)',
                            keyboardHidesTabBar: true,
                        },
                    }
                ),
            },
            {
                initialRouteName: signed ? 'App' : 'Sing',
            }
        )
    );
