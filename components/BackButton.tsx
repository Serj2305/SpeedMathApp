import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

interface IBackButton {
    onPressButton: () => void
}

export const BackButton = ({onPressButton} : IBackButton) => {
  return (
    <TouchableOpacity onPress={onPressButton}>
        <Image
            source={require('../assets/back-button-icon.png')}
        />
    </TouchableOpacity>
  )
}
