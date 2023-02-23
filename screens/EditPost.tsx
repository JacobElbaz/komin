import { ScrollView, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { UserContext } from '../components/UserContext';
import CustomInput from '../components/CustomInput';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { create } from 'apisauce';
import { IP } from '../ip';
import { ImagePickerAsset, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const apiClient = create({
    baseURL: `http://${IP}:3000`,
    headers: { Accept: 'application/vnd.github.v3+json' },
})

const uploadImage = async (imageURI: String) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await apiClient.post('/file/file', body)
        if (!res.ok) {
            console.log("save failed " + res.problem)
        } else {
            if (res.data) {
                const d: any = res.data
                return d.url
            }
        }
    } catch (err) {
        console.log("save failed " + err)
    }
    return ""
}


const EditPost = ({ route }: any) => {
    const [loading, setLoading] = React.useState(false);
    const { userInfo }: any = React.useContext(UserContext)
    const [photoChoosed, setPhotoChoosed] = useState(false)
    const [photo, setPhoto] = useState<ImagePickerAsset | any>({ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' })
    type Inputs = {
        example: string,
        exampleRequired: string,
    };
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    type Nav = {
        goBack(): unknown;
        navigate: (value: string) => void;
        addListener: (value: string, cb: Function) => void;
    }
    const navigation = useNavigation<Nav>();

    useEffect(() => {
        console.log(route.params)
    }, [photo])

    const handleOnConfirm = async (data: any) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const url = photoChoosed ? await uploadImage(photo.uri) : null
        console.log(url);

        const body = {
            message: data.message,
            photo: url ? url : route.params.photo
        }
        try {
            await axios.put(`http://${IP}:3000/post/${route.params._id}`, body, {
                headers: {
                    'Authorization': `JWT ${userInfo.accessToken}`
                }
            })
                .then(async res => {
                    navigation.goBack();
                    Alert.alert('Updated', 'Your post was updated !')
                })
                .catch(e => {
                    console.log(`update post error ${e}`);
                });
        } catch (err) {
            console.log('update fail' + err);

        }
        apiClient.put(`/user/${userInfo.id}`, data)
    }

    const handleChoosePhoto = async () => {
        const response = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (response.assets) {
            setPhoto(response.assets[0]);
            setPhotoChoosed(true)
        };
    }

    const handleDeletePost = async () => {
        try {
            await axios.post(`http://${IP}:3000/post/delete/${route.params._id}`, {}, {
                headers: {
                    'Authorization': `JWT ${userInfo.accessToken}`
                }
            })
                .then(async res => {
                    navigation.goBack();
                    Alert.alert('Updated', 'Your post was deleted !')
                }).catch(e => {
                    console.log(`update post error ${e}`);
                });
        } catch (err) {
            console.log('delete post fail' + err)
        }
    }
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.imgbtn} onPress={handleChoosePhoto}>
                <Image
                    source={photoChoosed ? { uri: photo.uri } : { uri: route.params.photo }}
                    style={styles.picture}
                />
                <Icon name='pencil-square-o' style={styles.icon}/>
            </TouchableOpacity>
            <Text>Text</Text>
            <CustomInput
                name="message"
                placeholder={route.params.message}
                value={route.params.message}
                control={control}
            />
            <TouchableOpacity
                style={styles.confirm}
                onPress={handleSubmit(handleOnConfirm)}>
                <Text
                    style={styles.text}>
                    Confirm changes
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.logout}
                onPress={handleDeletePost}>
                <Text
                    style={styles.text}>
                    Delete this Post
                </Text>
            </TouchableOpacity>
        </ScrollView>)
}


const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    logout: {
        height: 50,
        width: '100%',
        backgroundColor: '#d14b4b',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    disabled: {
        height: 50,
        width: '100%',
        backgroundColor: '#dae4e8',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 5
    },
    confirm: {
        height: 50,
        width: '100%',
        backgroundColor: '#0490d1',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 5
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    picture: {
        alignSelf: 'center',
        height: 250,
        width: 350,
    },
    imgbtn: {
        margin: 15
    },
    icon: {
        position: 'absolute',
        bottom: 200,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        fontSize: 25,
        opacity: 0.8
    }
})

export default EditPost;