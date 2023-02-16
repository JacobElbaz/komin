import { StyleSheet, ScrollView, FlatList, RefreshControl, Text } from 'react-native';
import React from 'react'
import Post from '../components/Post';
import { create } from 'apisauce'
import { IP } from '../ip';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  type Nav = {
    navigate: (value: string) => void;
    addListener: (value: string, cb: Function) => void;
  }
  const navigation = useNavigation<Nav>();
  const [posts, setPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getPosts();
    setRefreshing(false);
  }, [refreshing])

  const getPosts = async () => {
    const userInfoJson = await AsyncStorage.getItem('userInfo')
    let user = JSON.parse(userInfoJson)
    const apiClient = create({
      baseURL: `http://${IP}:3000`,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'Authorization': `JWT ${user?.accessToken}`
      },
    })
    let posts = []
    let users = []
    try {
      console.log('fetching data');
      posts = await apiClient.get('/post')
      users = await apiClient.get('/user')
    } catch (err) {
      console.log('fetch posts failed ' + err);
    }
    if (!posts.data.err) {
      posts.data?.forEach(post => {
        const userPicture = users.data.find(user => user._id == post.senderId).picture;
        post.userPicture = userPicture ? userPicture : null;
        setPosts(posts.data)
      })
    } else
      console.log(posts.data);
  }

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      getPosts();
    })
    return unsuscribe
  })

  return (
    <>
      {posts ? (<FlatList data={posts} keyExtractor={post => post._id.toString()} renderItem={({ item }) => (
        <Post user={{ name: item.senderName, picture: item.userPicture }} image={item.photo} text={item.message}></Post>
      )} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } ></FlatList>) : (<Text style={styles.text}>Pull down to refresh</Text>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  text: {
    alignSelf: 'center',
    color: 'dimgray',
    margin: 15
  }
});
