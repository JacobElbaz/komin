import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { IP } from '../ip';

export const UserContext = createContext({});

export const Context = ({children} : any) => {
  const [userInfo, setUserInfo] = useState({ accessToken : null, refreshToken: null});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name: string, email: string, password: string, picture: string = '') => {
    setIsLoading(true);

    axios
      .post(`http://${IP}:3000/auth/register`, {
        name,
        email,
        password,
        picture
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email: any, password: any) => {
    setIsLoading(true);

    axios
      .post(`http://${IP}:3000/auth/login`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .get(
        `http://${IP}:3000/auth/logout`,
        {

          headers: {'Authorization': `JWT ${userInfo.refreshToken}`},
        },
      )
      .then(res => {
        AsyncStorage.removeItem('userInfo');
        setUserInfo({accessToken: null, refreshToken: null});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo : any = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  const refreshContext= async () => {
    
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};