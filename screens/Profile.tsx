import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Post from '../components/Post';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { create } from "apisauce";
import { IP } from "../ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const { userInfo }: any = React.useContext(UserContext)
    const [posts, setPosts] = React.useState<any | []>()
    const [user, setUser] = React.useState(userInfo)
    type Nav = {
        navigate: (value: string) => void;
        addListener: (value: string, cb: Function) => void;
    }
    const navigation = useNavigation<Nav>();
    const getPosts = async () => {
        const apiClient = create({
            baseURL: `http://${IP}:3000`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'Authorization': `JWT ${userInfo.accessToken}`
            }
        })
        try {
            console.log('fetching data');
            const posts = await apiClient.get(`/post?sender=${userInfo.id}`)
            setPosts(posts.data)
        } catch (err) {
            console.log('fail get posts by id ' + err);
        }
    }
    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', async () => {
            const userFromStorage = await AsyncStorage.getItem('userInfo')
            userFromStorage && setUser(JSON.parse(userFromStorage))
            getPosts();
        })
        return unsuscribe
    })

    return (
        <View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.infoContainer}>
                    <Image
                        source={{ uri: user.picture }}
                        style={styles.profilePic} />
                    <View style={styles.edit}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit Profile')}>
                            <Text style={{ color: '#c7c7c7' }}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.title}>Publications</Text>
                {posts?.map((item: { message: any; photo: any; }) => (
                    <Post key={item.message} userId={user.id} image={item.photo} text={item.message} post={item} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {   
        fontSize: 18,
        fontWeight: '500',
        margin: 10
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        elevation: 10,
        backgroundColor: '#ffff',
        padding: 15
    },
    edit: {
        margin: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    editButton: {
        color: '#fffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        padding: 2,
        borderWidth: 2,
        borderColor: '#c7c7c7'
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 25
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 15
    }
});

export default Profile;