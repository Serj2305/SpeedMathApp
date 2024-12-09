import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { gstyle } from '../gstyle'
import { BackButton } from '../components/BackButton'
import { StackParamList } from '../Navigate'
import { CustomButton } from '../components/CustomButton'
import { StackScreenProps } from '@react-navigation/stack'

export const ProfileGuest = ({navigation}: StackScreenProps<StackParamList, 'ProfileGuest'>) => {
  return (
    <View style={gstyle.container}>
      <SafeAreaView>
        <BackButton onPressButton={() => navigation.navigate('Home')}/>
        <View style={styles.content}>
          <Text style={styles.title}>Добро пожаловать!</Text>
          <Text style={styles.text}>Зарегистрируйтесь или войдите, чтобы следить за своим прогрессом</Text>
          <View style={styles.buttonContainer}>
            <CustomButton backgroundColor='#47A76A' text='Войти' onPressButton={() => navigation.navigate('Login')}/>
            <CustomButton backgroundColor='#4C76C3' text='Регистрация' onPressButton={() => navigation.navigate('Registration')}/>
          </View>
          <Text style={styles.text}>Ментальный счёт — тренируйтесь и отслеживайте свои успехи!</Text>
        </View>
      </SafeAreaView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'semibold',
    marginBottom: 16
  },
  text: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#8A8A8A',
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    gap: 20,
    width: '100%',
    alignItems: 'center'
  }
})
