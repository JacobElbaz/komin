import { ScrollView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UserContext } from '../components/UserContext';
import CustomInput from '../components/CustomInput';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { create } from 'apisauce';
import { IP } from '../ip';
import imgPlaceholder from '../assets/default-placeholder.png'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


const EditProfile = () => {
    const [loading, setLoading] = React.useState(false);
    const { userInfo, logout }: any = React.useContext(UserContext)
    const [user, setUser] = useState(null)
    const [changes, setChanges] = useState(true)
    const [photo, setPhoto] = useState({ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' })
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
        navigate: (value: string) => void;
        addListener: (value: string, cb: Function) => void;
    }
    const navigation = useNavigation<Nav>();
    const getUser = async () => {
        const apiClient = create({
            baseURL: `http://${IP}:3000`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'Authorization': `JWT ${userInfo?.accessToken}`
            },
        })
        try {
            let user = await apiClient.get(`/user/${userInfo.id}`)
            setUser(user.data)
            if (user.data.picture) {
                setPhoto({uri: user.data.picture})
            }
        } catch (err) {
            console.log('fail to fetch user');
        }
    }
    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', async () => {
            getUser();
        })
        return unsuscribe
    })

    const handleOnConfirm = async (data: any) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const url = await uploadImage(photo.uri)
        const body = {
            name: data.name,
            email: data.email,
            picture: url
        }
        try {
            await axios.put(`http://${IP}:3000/user/${userInfo.id}`, body, {
                headers: {
                    'Authorization': `JWT ${userInfo.accessToken}`
                }
            })
                .then(async res => {
                    let user = { accessToken: userInfo.accessToken, id: userInfo.id, name: body.name, refreshToken: userInfo.refreshToken, picture: url, email: body.email };
                    await AsyncStorage.setItem('userInfo', JSON.stringify(user))
                    navigation.navigate('Profile');
                })
                .catch(e => {
                    console.log(`add post error ${e}`);
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
        if (response) {
            setPhoto(response.assets[0]);
        };
    }
    return (
        <>
            {user && (
                <ScrollView style={styles.container}>
                    <TouchableOpacity style={styles.imgbtn} onPress={handleChoosePhoto}>
                        <Image
                            source={{ uri: photo.uri }}
                            style={styles.picture}
                        />
                    </TouchableOpacity>
                    <Text>Name</Text>
                    <CustomInput
                        name="name"
                        placeholder={user?.name}
                        control={control}
                    />
                    <Text>Email</Text>
                    <CustomInput
                        name="email"
                        placeholder={user?.email}
                        control={control}
                    />
                    <TouchableOpacity
                        style={changes ? styles.confirm : styles.disabled}
                        disabled={!changes}
                        onPress={handleSubmit(handleOnConfirm)}>
                        <Text
                            style={styles.text}>
                            Confirm changes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.logout}
                        onPress={logout}>
                        <Text
                            style={styles.text}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </ScrollView>)}
        </>
    );
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
        width: 250,
        borderRadius: 200
    },
    imgbtn: {
        margin: 15
    },
})

export default EditProfile;