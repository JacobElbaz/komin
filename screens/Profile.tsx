import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Post from '../components/Post';
import pic from '../assets/icon.png'
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { UserContext } from "../components/UserContext";

const Profile = () => {
    const {userInfo} = React.useContext(UserContext)
    
    type Nav = {
        navigate: (value: string) => void;
    }

    const navigation = useNavigation<Nav>(); 
    
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
                            <Text style={{color: '#ffff'}}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.userName}>Publications</Text>
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