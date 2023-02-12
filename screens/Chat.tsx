import React from 'react'
import { SafeAreaView, FlatList } from 'react-native';
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
    }
  ]
  return (
    <SafeAreaView>
      <ChatHeader username={route.params.name} picture={route.params.picture} />
    <FlatList 
    data={DATA}
    renderItem={({item}) => <BubbleMessage mine={item.mine} text={item.text} sender={route.params.name}/>}
    />
    </SafeAreaView>
  )
}

export default Chat;