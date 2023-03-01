import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import CustomButton from './CustomButton';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import { UserContext } from './UserContext';

WebBrowser.maybeCompleteAuthSession();

const GoogleRegisterButton = () => {
  const {setUserInfo, userInfo} = useContext(UserContext)
  const [accessToken, setAccessToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "970652473586-6mkn7te3pjs27sedeqmq4vsi82j3h1cd.apps.googleusercontent.com",
    androidClientId: "970652473586-m4jub460l4snsnad0ekga0pq5uupv57a.apps.googleusercontent.com"
  })

  React.useEffect(()=>{
    if(response?.type == "success"){
      setAccessToken(response.authentication?.accessToken)
      accessToken && fetchUserInfo()
    }
  }, [response, accessToken])

  const fetchUserInfo = async () => {
    let response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const useInfo = await response.json();
    console.log(useInfo)
    setUser(useInfo)
  }
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    promptAsync();
  };

  return (
      <CustomButton
        text="Register with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
  );
};

export default GoogleRegisterButton;