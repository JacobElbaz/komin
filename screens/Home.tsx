import { StyleSheet, ScrollView } from 'react-native';
import pic from '../assets/icon.png'
import Post from '../components/Post';


export default function Home() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Post user={{name: 'Jacob Elbaz', picture: pic}} image={pic} text={'This is a new post.'}></Post>
      <Post user={{name: 'Jacob Elbaz', picture: pic}} image={pic} text={'This is a new post.'}></Post>
      <Post user={{name: 'Jacob Elbaz', picture: pic}} image={pic} text={'This is a new post.'}></Post>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
});
