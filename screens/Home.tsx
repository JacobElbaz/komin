import { StyleSheet, ScrollView, FlatList } from 'react-native';
import pic from '../assets/icon.png'
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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      const userInfoJson = await AsyncStorage.getItem('userInfo')
      const userInfo = JSON.parse(userInfoJson)
      const apiClient = create({
        baseURL: `http://${IP}:3000`,
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'Authorization': `JWT ${userInfo.accessToken}`
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
      posts.data.forEach(post => {
        const userPicture = users.data.find(user => user._id == post.senderId).picture;
        post.userPicture = userPicture ? userPicture : null; 
      })
      console.log(posts.data);
      setPosts(posts.data)
    })
    return unsuscribe
  })

  return (
    <FlatList data={posts} keyExtractor={post => post._id.toString()} renderItem={({item}) => (
      <Post user={{ name: item.senderName, picture: item.userPicture}} image={item.photo} text={item.message}></Post>
    )}></FlatList>
    //<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    //  <Post user={{ name: 'Jacob Elbaz', picture: pic }} image={pic} text={'This is a new post.'}></Post>
    //  <Post user={{ name: 'Jacob Elbaz', picture: pic }} image={pic} text={'This is a new post.'}></Post>
    //  <Post user={{ name: 'Jacob Elbaz', picture: pic }} image={pic} text={'This is a new post.'}></Post>
    //</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
});
