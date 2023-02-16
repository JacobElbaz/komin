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
    const { userInfo, logout }: any = React.useContext(UserContext)
    const [user, setUser] = useState(null)
    const [changes, setChanges] = useState(true)
    const [photo, setPhoto] = useState({uri: imgPlaceholder})
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
        } catch (err) {
            console.log('fail to fetch user');
        }
    }
    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', async () => {
            getUser();
            console.log(user);
        })
        return unsuscribe
    })

    const handleOnConfirm = async (data : any) => {
        const apiClient = create({
            baseURL: `http://${IP}:3000`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'Authorization': `JWT ${userInfo?.accessToken}`
            },
        })
        const body = {
            name: data.name,
            email: data.email
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
                            source={user?.picture ? { uri: user.picture } : photo.uri}
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