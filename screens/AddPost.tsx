import React from "react";
import { Button, Image, View } from "react-native";
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from "../components/CustomButton";
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import axios from "axios";
import { UserContext } from "../components/UserContext";
import FormData from 'form-data'
import { IP } from "../ip";

const uploadImage = async (imageURI: String) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await axios.post(`http://${IP}:3000/file/file`, body)
        console.log("save passed");
        const url = res.data
        console.log("got res: " + res.data[url]);
        return url
    } catch (err) {
        console.log("save failed" + err);
    }
    return "url"
}
type Inputs = {
    example: string,
    exampleRequired: string,
};

const AddPost = () => {
    const [loading, setLoading] = React.useState(false);
    const [photo, setPhoto] = React.useState(null);
    const { userInfo } = React.useContext(UserContext)
    const handleChoosePhoto = async () => {
        const response = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (response) {
            setPhoto(response.assets[0]);
        };
    }

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
        console.log(photo.uri);
        
        const url = await uploadImage(photo.uri)
        console.log(url);
        const body = {
            'message': data.message,
            'sender': userInfo.id,
            'photo': url
        }
        if (body.photo != 'url'){
        await axios.post(`http://${IP}:3000/post`, body, {
            headers: {
                'Authorization': `JWT ${userInfo.accessToken}`
            }
        })
            .then(res => {
                let userInfo = res.data;
                console.log(`userInfo: ${userInfo}`);
            })
            .catch(e => {
                console.log(`add post error ${e}`);
            });
        } else console.log('not posting');
        
        setLoading(false);
    };
    return (
        <View>
            <CustomInput
                name="message"
                placeholder="What's new ?"
                control={control}
                rules={{ required: 'Description is required' }}
            />
            {photo && (
                <>
                    <Image
                        source={{ uri: 'data:image/jpeg;base64,' + photo.base64 }}
                        style={{ width: 300, height: 300 }}
                    />
                </>
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />

            <CustomButton
                text={loading ? 'Loading...' : 'POST'}
                onPress={handleSubmit(onPostPressed)}
            />
        </View>
    );
}

export default AddPost;