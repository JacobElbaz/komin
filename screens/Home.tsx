import { StyleSheet, ScrollView, FlatList, RefreshControl, Text, View, StatusBar } from 'react-native';
import React from 'react'
import Post from '../components/Post';
import { ApiErrorResponse, ApiOkResponse, create } from 'apisauce'
import { IP } from '../ip';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../components/UserContext';

export default function Home() {
  const { userInfo, logout } = React.useContext(UserContext)
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
    if (userInfo) {
      const apiClient = create({
        baseURL: `http://${IP}:3000`,
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'Authorization': `JWT ${userInfo?.accessToken}`
        },
      })
      let posts = []
      let users = []
      try {
        console.log('fetching data');
        posts = await apiClient.get('/post')
        posts = posts.data
        users = await apiClient.get('/user')
        users = users.data
      } catch (err) {
        console.log('fetch posts failed ' + err);
      }
      if (!posts.err) {
        posts?.forEach( (post: { senderId: any; userPicture: any; }) => {
          const userPicture = users.find(user => user._id == post.senderId);
          if (userPicture.picture) {
            post.userPicture = userPicture.picture;
          }
        })
        setPosts(posts);
      } else {
        logout()
      }
    }
  }

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      await getPosts();
    })
    return unsuscribe
  })

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor={'#e32f45'}/>
      {posts ? (
        <FlatList
          data={posts}
          keyExtractor={post => post._id.toString()}
          renderItem={({ item }) => (
            <Post userId={item.senderId} image={item.photo} text={item.message} post={item}></Post>
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }>
          <Text style={styles.text}>Pull down to refresh</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  text: {
    alignSelf: 'center',
    color: 'dimgray',
    margin: 15,
    height: 500,
    textAlignVertical: 'center'
  }
});
