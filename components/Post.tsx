import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import pic from '../assets/icon.png'

const Post = ({ user, image=pic, text }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={user.picture ? {uri: user.picture} : pic}
                    style={styles.profilePic} />
                <Text style={styles.userName}>{user.name}</Text>
            </View>
            <TouchableOpacity onPressOut={() => { }}>
                <Icon name='dots-three-vertical' />
            </TouchableOpacity>
            <View style={styles.text}>
                <Text>{text}</Text>
            </View>
            <View>
                <Image source={{uri: image}}
                    style={styles.image} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        elevation: 1,
        backgroundColor: '#ffff',
        marginTop: 10
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
    },
    userName: {
        fontWeight: 'bold'
    },
    profilePic: {
        width: 20,
        height: 20,
        borderRadius: 50,
        marginRight: 10
    },
    text: {
        padding: 5
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        margin: 15
    }
})

export default Post;