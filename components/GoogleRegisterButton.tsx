import React, { useContext } from 'react';
import CustomButton from './CustomButton';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import { UserContext } from './UserContext';

WebBrowser.maybeCompleteAuthSession();

const GoogleRegisterButton = () => {
  const { register, login, setSplashLoading } = useContext(UserContext)
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "970652473586-iidqn4c5cfbmoq98psubsdrcdbeh5f5g.apps.googleusercontent.com",
    expoClientId: "970652473586-6mkn7te3pjs27sedeqmq4vsi82j3h1cd.apps.googleusercontent.com",
    androidClientId: "970652473586-m4jub460l4snsnad0ekga0pq5uupv57a.apps.googleusercontent.com"
  })

  React.useEffect(() => {
    if (response?.type == "success") {
      getUserData(response.authentication?.accessToken)
    }
  }, [response])

  const getUserData = async (access: string | undefined) => {
    try {
      setSplashLoading(true)
      const userInfoResponse = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${access}`
        }
      })
      const user = userInfoResponse.data

      register(user.name, user.email, '12345678', user.picture)
      login(user.email, '12345678')
      setSplashLoading(false)
    } catch (err) {
      console.log('error googleapis ' + err);
    }
  };

  return (
    <>
      <CustomButton
        text="Register with Google"
        onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
        icon="google"
      />
    </>
  );
};

export default GoogleRegisterButton;