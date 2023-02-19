import React from 'react'
import { SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BubbleMessage from '../components/BubbleMessage';
import ChatHeader from '../components/ChatHeader';

const Chat = ({ route }: any) => {
  const DATA = [
    {
      mine: true,
      text: 'Hello world'
    },
    {
      mine: false,
      text: 'Hi man'
    },
    {
      mine: true,
      text: 'Hello world'
    },
    {
      mine: false,
      text: 'Hi man'
    },
    {
      mine: true,
      text: 'Hello world'
    },
    {
      mine: false,
      text: 'Hi man'
    },
    {
      mine: true,
      text: 'Hello world'
    },
    {
      mine: false,
      text: 'Hi man'
    },
    {
      mine: true,
      text: 'Hello world'
    },
    {
      mine: false,
      text: 'Hi man'
    },
    {
      mine: true,
      text: 'Hello world'
    },
    {
      mine: false,
      text: 'Hi man'
    },
    {
      mine: true,
      text: 'Hello world'
    },
    {
      mine: false,
      text: 'Hi man'
    }
  ]
  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader username={route.params.name} picture={route.params.picture} />
      <FlatList
        data={DATA.reverse()}
        style={styles.scroll}
        renderItem={({ item }) => <BubbleMessage mine={item.mine} text={item.text} sender={route.params.name} />}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder='Type something...'
          style={styles.input}></TextInput>
        <TouchableOpacity style={styles.iconContainer}><Icon name={'send'} style={styles.icon} /></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
  container: {
    height: '100%'
  },
  scroll: {},
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    margin: 10,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    paddingLeft: 10
  },
  iconContainer: {
    backgroundColor: '#e32f45',
    borderRadius: 50,
    padding: 10,
    margin: 5
  },
  icon: {
    color: 'white',
    fontSize: 20
  }
})

export default Chat;