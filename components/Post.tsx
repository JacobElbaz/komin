import { useNavigation } from '@react-navigation/native';
import { create } from 'apisauce';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import pic from '../assets/icon.png'
import { IP } from '../ip';
import { UserContext } from './UserContext';

const Post = ({ userId, image = pic, text, post }: any) => {
    type Nav = {
        navigate: (value: string, params: any) => void;
        addListener: (value: string, cb: Function) => void;
    }
    const navigation = useNavigation<Nav>();
    const { userInfo } = useContext(UserContext)
    const [user, setUser] = useState(null)
    const getUser = async () => {
        const apiClient = create({
            baseURL: `http://${IP}:3000`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'Authorization': `JWT ${userInfo?.accessToken}`
            },
        })
        try {
            const user = await apiClient.get(`/user/${userId}`)
            setUser(user.data)
        } catch (err) {
            console.log('fail to fetch user');
        }
    }
    useEffect(() => {
            getUser();
            console.log(post);
            
    }, [post])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={user?.picture ? { uri: user.picture } : pic}
                        style={styles.profilePic} />
                    <Text style={styles.userName}>{user?.name}</Text>
                </View>
                {userInfo.id == userId &&
                    <TouchableOpacity style={styles.treedot} onPress={()=>navigation.navigate('Edit Post', post)}>
                        <Icon style={{fontSize: 15}} name='dots-three-vertical' />
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.text}>
                <Text>{text}</Text>
            </View>
            <View>
                <Image source={{ uri: image }}
                    style={styles.image} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        backgroundColor: '#ffff',
        marginTop: 10,
        padding: 5
    },
    header: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
    },
    userName: {
        fontWeight: 'bold'
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'grey'
    },
    text: {
        padding: 5,
        marginLeft: 5
    },
    image: {
        width: 350,
        height: 250,
        alignSelf: 'center',
        marginBottom: 30
    },
    treedot: {
        justifyContent: 'center'
    }
})

export default Post;