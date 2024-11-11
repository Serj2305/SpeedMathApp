import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface ICustomButton {
  backgroundColor: string,
  onPressButton: () => void,
  text: string
}

export const CustomButton = ({backgroundColor, onPressButton, text} : ICustomButton) => {
  return (
    <Pressable
      onPress={onPressButton}
      style={({pressed}) => [
        {
          opacity: pressed ?  0.7 : 1,
          backgroundColor: backgroundColor
        },
        styles.button
      ]}
    >
      <Text style={styles.textButton}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10
  },
  textButton: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'semibold'
  }
})