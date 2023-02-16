import React from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from "../components/CustomButton";
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import axios from "axios";
import { UserContext } from "../components/UserContext";
import FormData from 'form-data'
import { IP } from "../ip";
import { create } from 'apisauce'
import imgPlaceholder from '../assets/default-placeholder.png'

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

const AddPost = () => {
    const [loading, setLoading] = React.useState(false);
    const [photo, setPhoto] = React.useState(null);
    const { userInfo }: any = React.useContext(UserContext)
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
    type Inputs = {
        example: string,
        exampleRequired: string,
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onPostPressed = async (data: any) => {
        if (loading) {
            return;
        }
        setLoading(true);

        const url = await uploadImage(photo.uri)
        console.log(url);
        const body = {
            'message': data.message,
            'senderId': userInfo.id,
            'senderName': userInfo.name,
            'photo': url
        }
        if (body.photo != '') {
            await axios.post(`http://${IP}:3000/post`, body, {
                headers: {
                    'Authorization': `JWT ${userInfo.accessToken}`
                }
            })
                .then(res => {
                    let userInfo = res.data;
                })
                .catch(e => {
                    console.log(`add post error ${e}`);
                });
        } else console.log('not posting');

        setLoading(false);
    };
    return (
        <View style={styles.container}>
            <CustomInput
                name="message"
                placeholder="What's new ?"
                control={control}
                rules={{ required: 'Description is required' }}
            />
            <Image
                source={photo ? { uri: photo.uri } : imgPlaceholder}
                style={{ width: 300, height: 300 }}
            />
            <Button title="Choose Photo" onPress={handleChoosePhoto} />

            <CustomButton
                text={loading ? 'Loading...' : 'POST'}
                onPress={handleSubmit(onPostPressed)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
})

export default AddPost;