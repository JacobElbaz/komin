import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity, FlatList } from "react-native";
import Post from '../components/Post';
import pic from '../assets/icon.png'
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { create } from "apisauce";
import { IP } from "../ip";

const Profile = () => {
    const { userInfo }: any = React.useContext(UserContext)
    const [posts, setPosts] = React.useState()
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
            },
            params: { sender: userInfo.id }
        })
        try {
            console.log('fetching data');
            const posts = await apiClient.get('/post')
            setPosts(posts.data)
        } catch (err) {
            console.log('fail get posts by id ' + err);
        }
    }
    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', async () => {
            getPosts();
        })
        return unsuscribe
    })

    return (
        <View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.infoContainer}>
                    <Image
                        source={pic}
                        style={styles.profilePic} />
                    <View style={styles.edit}>
                        <Text style={styles.userName}>{userInfo.name}</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit Profile')}>
                            <Text style={{ color: '#ffff' }}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.userName}>Publications</Text>
                {posts?.map((item) => (
                    <Post key={item.message} user={{ name: item.senderName, picture: item.userPicture }} image={item.photo} text={item.message} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 15
    },
    edit: {
        margin: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    editButton: {
        backgroundColor: '#c7c7c7',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        borderRadius: 3
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 22
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 50,
        marginRight: 15
    }
});

export default Profile;