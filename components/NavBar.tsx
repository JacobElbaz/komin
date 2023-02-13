import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Home from '../screens/Home';
import Conversations from '../screens/Conversations';
import Profile from '../screens/Profile';
import ChatRoom from '../screens/ChatRoom';
import Post from '../screens/AddPost';
import Icon from 'react-native-vector-icons/Ionicons'
import IconA from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'


const NavBar = () => {
    type Nav = {
        navigate: (value: string) => void;
    }
    
    const navigation = useNavigation<Nav>();
    const Tab = createBottomTabNavigator();
    const CustomTabBarButton = ({ children }: any) => {
        return (
            <TouchableOpacity
                style={{
                    top: -30,
                    ...styles.shadow
                }}
                onPress={() => navigation.navigate('Add a new post')}>
                <View
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: '#e32f45',
                        ...styles.shadow
                    }}>
                    {children}
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 80,
                    ...styles.shadow
                }
            }} >
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={'home-outline'} size={25} color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ fontSize: 12, color: focused ? '#e32f45' : '#748c94' }}>HOME</Text>
                        </View>
                    )
                }} />
            <Tab.Screen name='Conversations' component={Conversations}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={'chatbubble-ellipses-outline'} size={25} color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ fontSize: 12, color: focused ? '#e32f45' : '#748c94' }}>CHAT</Text>
                        </View>
                    )
                }} />
            <Tab.Screen name='Add a new post' component={Post}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name={'add-outline'} size={40} color={'#fff'} />
                    ),
                    tabBarButton: (props) => {
                        return <CustomTabBarButton {...props} />;
                    }
                }} />
            <Tab.Screen name='Global Chat' component={ChatRoom}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <IconA name={'globe-americas'} size={25} color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ fontSize: 12, color: focused ? '#e32f45' : '#748c94' }}>GLOBAL</Text>
                        </View>
                    )
                }}
                listeners={{
                    tabPress: e => {
                      e.preventDefault();
                      navigation.navigate('Global Chat');
                    },
                  }}
                />
            <Tab.Screen name='Profile' component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={'person-outline'} size={25} color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ fontSize: 12, color: focused ? '#e32f45' : '#748c94' }}>PROFILE</Text>
                        </View>
                    )
                }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        textShadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default NavBar;