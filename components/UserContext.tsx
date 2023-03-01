import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { IP } from '../ip';
import Client from "socket.io-client";

export const UserContext = createContext({});

export const Context = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState({ accessToken: null, refreshToken: null });
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  //socket
  function clientSocketConnect(clientSocket: { on: (arg0: string, arg1: () => void) => void; }): Promise<string> {
    return new Promise((resolve) => {
      clientSocket.on("connect", () => {
        resolve("1")
      });
    })
  }

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
        const socket = Client(`http://${IP}:3000`, {
          auth: {
            token: 'barrer ' + userInfo.accessToken
          }
        })
        clientSocketConnect(socket)
        userInfo.socket = socket
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

          headers: { 'Authorization': `JWT ${userInfo.refreshToken}` },
        },
      )
      .then(res => {
        AsyncStorage.removeItem('userInfo');
        setUserInfo({ accessToken: null, refreshToken: null });
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

      let userInfo: any = await AsyncStorage.getItem('userInfo');
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

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        userInfo,
        setUserInfo,
        splashLoading,
        register,
        login,
        logout,
        setSplashLoading
      }}>
      {children}
    </UserContext.Provider>
  );
};