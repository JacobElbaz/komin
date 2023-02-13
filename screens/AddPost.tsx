import React from "react";
import { Button, Image, View } from "react-native";
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from "../components/CustomButton";
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import axios from "axios";
import { UserContext } from "../components/UserContext";
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
        const body = {
            'message' : data.message,
            'sender' : userInfo.id,
            'photo' : photo.base64
        }

        await axios.post('http://192.168.1.15:3000/post', body, {
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
                        source={{  uri: 'data:image/jpeg;base64,' + photo.base64  }}
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