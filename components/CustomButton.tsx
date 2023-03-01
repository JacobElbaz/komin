import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor, icon = null }: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}>
      {icon && <Icon name={icon} style={{marginRight: 15, fontSize: 22, color: fgColor}}/>}
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;